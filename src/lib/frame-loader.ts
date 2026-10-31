/**
 * Streams the hero image sequence in two layers:
 *
 * - Files: every frame is fetched once and kept in memory as a Blob URL. The whole sequence is only
 *   ~15–25 MB, so once the frames around the playhead are in, the rest download in the background.
 * - Bitmaps: only frames near the playhead are decoded, and at most `maxDecoded` are kept (a decoded
 *   1600×900 frame is ~5.8 MB), so memory stays bounded even on phones.
 *
 * Both queues are ordered around the playhead, favouring the direction the visitor is scrolling.
 */

export type FrameImage = ImageBitmap | HTMLImageElement;

interface LoaderOptions {
  /** Frames to fetch and decode early and never evict, e.g. scene keyframes. */
  pinned?: readonly number[];
  maxDecoded?: number;
  fetchConcurrency?: number;
  decodeConcurrency?: number;
}

const DECODE_AHEAD = 24;
const DECODE_BEHIND = 8;
// Frames behind the scroll direction count as this many times further away
const BEHIND_COST = 3;
// Pinned frames are fetched as if they were never further than this from the playhead
const PINNED_MAX_COST = 30;
const MAX_FETCH_ATTEMPTS = 3;

const release = (image: FrameImage) => {
  if ("close" in image) image.close();
};

export class FrameSequenceLoader {
  private readonly urls: readonly (string | null)[];
  private readonly pinned: ReadonlySet<number>;
  private readonly maxDecoded: number;
  private readonly fetchConcurrency: number;
  private readonly decodeConcurrency: number;

  private readonly files = new Map<number, string>();
  private readonly fetching = new Set<number>();
  private readonly fetchAttempts = new Map<number, number>();
  private readonly failed = new Set<number>();
  private readonly decoded = new Map<number, FrameImage>();
  private readonly decoding = new Set<number>();
  private fetchQueue: number[] = [];
  private decodeQueue: number[] = [];

  private playhead = -1;
  private direction: 1 | -1 = 1;
  private readonly listeners = new Set<(index: number) => void>();
  private readonly abort = new AbortController();
  private destroyed = false;

  /** `urls[i]` is frame i's file, or null for frames this loader should skip. Nothing loads until setPlayhead(). */
  constructor(urls: readonly (string | null)[], options: LoaderOptions = {}) {
    this.urls = urls;
    this.pinned = new Set((options.pinned ?? []).filter((i) => urls[i]));
    this.maxDecoded = options.maxDecoded ?? 48;
    this.fetchConcurrency = options.fetchConcurrency ?? 6;
    this.decodeConcurrency = options.decodeConcurrency ?? 3;
  }

  /** Calls `listener` with the index of every frame that finishes decoding. */
  subscribe(listener: (index: number) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Re-orders loading around `index`. Call it whenever the target frame changes. */
  setPlayhead(index: number, direction: 1 | -1) {
    const rounded = Math.round(index);
    if (this.destroyed || (rounded === this.playhead && direction === this.direction)) return;
    this.playhead = rounded;
    this.direction = direction;

    this.fetchQueue = [];
    for (let i = 0; i < this.urls.length; i++) {
      if (this.urls[i] && !this.files.has(i) && !this.fetching.has(i) && !this.failed.has(i)) {
        this.fetchQueue.push(i);
      }
    }
    const fetchCost = (i: number) =>
      this.pinned.has(i) ? Math.min(this.cost(i), PINNED_MAX_COST) : this.cost(i);
    this.fetchQueue.sort((a, b) => fetchCost(a) - fetchCost(b));

    this.refreshDecodeQueue();
    this.pumpFetch();
    this.pumpDecode();
  }

  /**
   * Returns the decoded frame to draw for `target`, never stepping back past `from` (the frame on
   * screen now): the decoded frame between the two that is closest to `target`. Returns null when
   * nothing in that range is decoded yet, so the canvas keeps its current picture. Pass `from = -1`
   * to take the closest decoded frame anywhere.
   */
  getFrame(target: number, from: number): { index: number; image: FrameImage } | null {
    const exact = this.decoded.get(target);
    if (exact) return { index: target, image: exact };

    const lo = from < 0 ? -Infinity : Math.min(from, target);
    const hi = from < 0 ? Infinity : Math.max(from, target);
    let best = -1;
    for (const index of this.decoded.keys()) {
      if (index < lo || index > hi) continue;
      if (best === -1 || Math.abs(index - target) < Math.abs(best - target)) best = index;
    }
    return best === -1 ? null : { index: best, image: this.decoded.get(best)! };
  }

  destroy() {
    this.destroyed = true;
    this.abort.abort();
    for (const image of this.decoded.values()) release(image);
    for (const url of this.files.values()) URL.revokeObjectURL(url);
    this.decoded.clear();
    this.files.clear();
    this.fetchQueue = [];
    this.decodeQueue = [];
    this.listeners.clear();
  }

  private cost(index: number) {
    const offset = (index - this.playhead) * this.direction;
    return offset >= 0 ? offset : -offset * BEHIND_COST;
  }

  private refreshDecodeQueue() {
    const ahead = this.direction === 1 ? DECODE_AHEAD : DECODE_BEHIND;
    const behind = this.direction === 1 ? DECODE_BEHIND : DECODE_AHEAD;
    const wanted = (i: number) =>
      this.files.has(i) && !this.decoded.has(i) && !this.decoding.has(i) && !this.failed.has(i);

    const queue: number[] = [];
    const lo = Math.max(0, this.playhead - behind);
    const hi = Math.min(this.urls.length - 1, this.playhead + ahead);
    for (let i = lo; i <= hi; i++) {
      if (wanted(i)) queue.push(i);
    }
    for (const i of this.pinned) {
      if ((i < lo || i > hi) && wanted(i)) queue.push(i);
    }
    this.decodeQueue = queue.sort((a, b) => this.cost(a) - this.cost(b));
  }

  private pumpFetch() {
    while (this.fetching.size < this.fetchConcurrency && this.fetchQueue.length > 0) {
      const index = this.fetchQueue.shift()!;
      if (this.files.has(index) || this.fetching.has(index) || this.failed.has(index)) continue;
      void this.fetchFrame(index);
    }
  }

  private async fetchFrame(index: number) {
    this.fetching.add(index);
    try {
      const response = await fetch(this.urls[index]!, { signal: this.abort.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      if (this.destroyed) return;
      this.files.set(index, URL.createObjectURL(blob));
    } catch {
      if (this.destroyed) return;
      const attempts = (this.fetchAttempts.get(index) ?? 0) + 1;
      this.fetchAttempts.set(index, attempts);
      if (attempts >= MAX_FETCH_ATTEMPTS) {
        this.failed.add(index);
      } else {
        // Flaky mobile connections: try again a little later, at the back of the queue
        setTimeout(() => {
          if (this.destroyed) return;
          this.fetchQueue.push(index);
          this.pumpFetch();
        }, 1000 * attempts);
      }
    } finally {
      this.fetching.delete(index);
    }
    if (this.destroyed) return;
    this.refreshDecodeQueue();
    this.pumpDecode();
    this.pumpFetch();
  }

  private pumpDecode() {
    while (this.decoding.size < this.decodeConcurrency && this.decodeQueue.length > 0) {
      const index = this.decodeQueue.shift()!;
      if (this.decoded.has(index) || this.decoding.has(index) || !this.files.has(index)) continue;
      void this.decodeFrame(index);
    }
  }

  private async decodeFrame(index: number) {
    this.decoding.add(index);
    let image: FrameImage | null = null;
    try {
      const img = new Image();
      img.src = this.files.get(index)!;
      await img.decode();
      image = img;
      // An ImageBitmap stays decoded (an <img> can be silently discarded) and can be freed with close()
      if (typeof createImageBitmap === "function") {
        try {
          image = await createImageBitmap(img);
        } catch {
          // Keep the <img>; drawImage accepts both
        }
      }
    } catch {
      if (!this.destroyed) this.failed.add(index);
    } finally {
      this.decoding.delete(index);
    }

    if (this.destroyed) {
      if (image) release(image);
      return;
    }
    if (image) {
      this.decoded.set(index, image);
      this.evict();
      for (const listener of this.listeners) listener(index);
    }
    this.pumpDecode();
  }

  /** Drops the decoded frames furthest from the playhead once over budget. Pinned frames stay. */
  private evict() {
    if (this.decoded.size <= this.maxDecoded) return;
    const candidates = [...this.decoded.keys()]
      .filter((i) => !this.pinned.has(i))
      .sort((a, b) => this.cost(b) - this.cost(a));
    for (const index of candidates) {
      if (this.decoded.size <= this.maxDecoded) break;
      release(this.decoded.get(index)!);
      this.decoded.delete(index);
    }
  }
}
