/**
 * High-performance Progressive Frame Loader with LRU Texture Eviction,
 * Concurrency Throttling, Keyframe Pinning, and Directional Priority Preloading.
 */

export class ProgressiveFrameLoader {
  private urls: readonly string[];
  private cache = new Map<number, HTMLImageElement>();
  private loadingSet = new Set<number>();
  private failedSet = new Set<number>();
  private loadQueue: number[] = [];
  private activeLoads = 0;
  private maxCacheSize: number;
  private maxConcurrent: number;
  private pinnedIndices = new Set<number>([0]);
  private onFrameReadyCallbacks: Array<(index: number) => void> = [];
  private destroyed = false;

  constructor(
    urls: readonly string[],
    pinnedKeyframes: readonly number[] = [0, 234, 438, 666, 886],
    maxCacheSize = 140,
    maxConcurrent = 6
  ) {
    this.urls = urls;
    this.maxCacheSize = maxCacheSize;
    this.maxConcurrent = maxConcurrent;

    pinnedKeyframes.forEach((idx) => {
      if (idx >= 0 && idx < urls.length) {
        this.pinnedIndices.add(idx);
      }
    });

    if (this.urls.length > 0) {
      // 1. Immediately load frame 0 as permanent baseline
      this.loadSingleFrame(0);

      // 2. Queue all keyframe stopping points so they are ready before user arrives
      for (const kf of this.pinnedIndices) {
        if (kf !== 0 && !this.loadQueue.includes(kf)) {
          this.loadQueue.push(kf);
        }
      }

      // 3. Queue the initial scrub window (frames 1..15)
      const initialBatch = Math.min(15, this.urls.length);
      for (let i = 1; i < initialBatch; i++) {
        if (!this.loadQueue.includes(i)) {
          this.loadQueue.push(i);
        }
      }

      this.processQueue();
    }
  }

  public subscribe(callback: (index: number) => void): () => void {
    this.onFrameReadyCallbacks.push(callback);
    return () => {
      this.onFrameReadyCallbacks = this.onFrameReadyCallbacks.filter(
        (cb) => cb !== callback
      );
    };
  }

  public has(index: number): boolean {
    return this.cache.has(index);
  }

  public get(index: number): HTMLImageElement | undefined {
    const img = this.cache.get(index);
    if (img && img.complete && img.naturalWidth > 0) {
      // Re-insert to refresh LRU order unless pinned
      if (!this.pinnedIndices.has(index)) {
        this.cache.delete(index);
        this.cache.set(index, img);
      }
      return img;
    }
    return undefined;
  }

  /**
   * Returns the exact frame if ready, or the closest loaded neighbor with verified valid dimensions.
   * Frame 0 and pinned keyframes ensure the canvas NEVER renders blank.
   */
  public getClosestLoaded(targetIndex: number): HTMLImageElement | null {
    // 1. Exact match
    if (this.cache.has(targetIndex)) {
      const exact = this.get(targetIndex);
      if (exact) return exact;
    }

    if (this.cache.size === 0) {
      return null;
    }

    // 2. Nearest valid loaded neighbor in cache
    let closestDist = Infinity;
    let closestImg: HTMLImageElement | null = null;

    for (const [idx, img] of this.cache.entries()) {
      if (img.complete && img.naturalWidth > 0) {
        const dist = Math.abs(idx - targetIndex);
        if (dist < closestDist) {
          closestDist = dist;
          closestImg = img;
          if (dist === 1) break; // Adjacent neighbor found
        }
      }
    }

    // 3. Fallback to frame 0
    if (!closestImg && this.cache.has(0)) {
      const f0 = this.cache.get(0);
      if (f0 && f0.complete && f0.naturalWidth > 0) {
        return f0;
      }
    }

    return closestImg;
  }

  /**
   * Signals the current playback position and direction to prioritize preloading.
   */
  public updatePriority(currentIndex: number, direction: 1 | -1 | 0 = 0) {
    if (this.destroyed) return;

    const total = this.urls.length;
    const priorityList: number[] = [];

    // The current target frame has top priority
    if (
      !this.cache.has(currentIndex) &&
      !this.loadingSet.has(currentIndex) &&
      !this.failedSet.has(currentIndex)
    ) {
      priorityList.push(currentIndex);
    }

    // Directional preloading window: lookahead in direction of scroll
    const aheadCount = direction === 0 ? 30 : direction === 1 ? 50 : 20;
    const behindCount = direction === 0 ? 30 : direction === 1 ? 20 : 50;

    if (direction >= 0) {
      for (let i = 1; i <= aheadCount; i++) {
        const idx = currentIndex + i;
        if (
          idx < total &&
          !this.cache.has(idx) &&
          !this.loadingSet.has(idx) &&
          !this.failedSet.has(idx)
        ) {
          priorityList.push(idx);
        }
      }
      for (let i = 1; i <= behindCount; i++) {
        const idx = currentIndex - i;
        if (
          idx >= 0 &&
          !this.cache.has(idx) &&
          !this.loadingSet.has(idx) &&
          !this.failedSet.has(idx)
        ) {
          priorityList.push(idx);
        }
      }
    } else {
      for (let i = 1; i <= behindCount; i++) {
        const idx = currentIndex - i;
        if (
          idx >= 0 &&
          !this.cache.has(idx) &&
          !this.loadingSet.has(idx) &&
          !this.failedSet.has(idx)
        ) {
          priorityList.push(idx);
        }
      }
      for (let i = 1; i <= aheadCount; i++) {
        const idx = currentIndex + i;
        if (
          idx < total &&
          !this.cache.has(idx) &&
          !this.loadingSet.has(idx) &&
          !this.failedSet.has(idx)
        ) {
          priorityList.push(idx);
        }
      }
    }

    // Drop orphaned items outside active window except pinned keyframes
    const windowMaxDist = Math.max(aheadCount, behindCount) + 40;
    const filteredExistingQueue = this.loadQueue.filter((idx) => {
      return (
        !this.cache.has(idx) &&
        !this.loadingSet.has(idx) &&
        !this.failedSet.has(idx) &&
        (this.pinnedIndices.has(idx) || Math.abs(idx - currentIndex) <= windowMaxDist)
      );
    });

    const newPrioritySet = new Set(priorityList);
    this.loadQueue = [
      ...priorityList,
      ...filteredExistingQueue.filter((idx) => !newPrioritySet.has(idx)),
    ];

    // Evict distant frames if cache exceeds limit
    this.evictDistantFrames(currentIndex);

    // Pump work
    this.processQueue();
  }

  private processQueue() {
    if (this.destroyed) return;

    while (this.activeLoads < this.maxConcurrent && this.loadQueue.length > 0) {
      const nextIndex = this.loadQueue.shift()!;
      if (
        this.cache.has(nextIndex) ||
        this.loadingSet.has(nextIndex) ||
        this.failedSet.has(nextIndex)
      ) {
        continue;
      }
      this.loadSingleFrame(nextIndex);
    }
  }

  private loadSingleFrame(index: number) {
    if (index < 0 || index >= this.urls.length) return;
    if (
      this.cache.has(index) ||
      this.loadingSet.has(index) ||
      this.failedSet.has(index)
    ) {
      return;
    }

    this.loadingSet.add(index);
    this.activeLoads++;

    const img = new Image();
    let settled = false;

    const onComplete = (success: boolean) => {
      if (settled) return;
      settled = true;

      this.loadingSet.delete(index);
      this.activeLoads--;

      if (this.destroyed) return;

      if (success) {
        this.cache.set(index, img);
        for (const cb of this.onFrameReadyCallbacks) {
          cb(index);
        }
      } else {
        this.failedSet.add(index);
      }

      this.processQueue();
    };

    img.onload = () => {
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => onComplete(true))
          .catch(() => onComplete(true));
      } else {
        onComplete(true);
      }
    };

    img.onerror = () => {
      onComplete(false);
    };

    img.src = this.urls[index];
  }

  private evictDistantFrames(centerIndex: number) {
    if (this.cache.size <= this.maxCacheSize) return;

    // Never evict pinned keyframes
    const entries: Array<{ index: number; dist: number }> = [];
    for (const key of this.cache.keys()) {
      if (this.pinnedIndices.has(key)) continue;
      entries.push({ index: key, dist: Math.abs(key - centerIndex) });
    }

    entries.sort((a, b) => b.dist - a.dist);

    const toRemoveCount = this.cache.size - this.maxCacheSize;
    for (let i = 0; i < toRemoveCount && i < entries.length; i++) {
      const idx = entries[i].index;
      this.cache.delete(idx);
    }
  }

  public destroy() {
    this.destroyed = true;
    this.loadQueue = [];
    this.cache.clear();
    this.loadingSet.clear();
    this.failedSet.clear();
    this.onFrameReadyCallbacks = [];
  }
}
