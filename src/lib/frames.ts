// Hero scroll sequence, built from frames-source/ by scripts/build-frames.sh (`npm run frames`).
// The files are cached for a year as immutable, so bump FRAME_VERSION (and VERSION in the script)
// whenever the frames change.
export const FRAME_VERSION = "v2";
export const TOTAL_FRAMES = 445;

export type FrameVariant = "desktop" | "mobile";

export const FRAME_SIZE: Record<FrameVariant, { width: number; height: number }> = {
  desktop: { width: 1600, height: 900 },
  // Portrait crop of the 16:9 source around each scene's subject, so phones don't download pixels they never show
  mobile: { width: 720, height: 1080 },
};

/** Screens matching this get the mobile frames. Shared by the poster <picture> and the loader. */
export const MOBILE_MEDIA = "(max-aspect-ratio: 9/10)";

const pad = (index: number) => String(index).padStart(3, "0");

export const framePath = (variant: FrameVariant, index: number) =>
  `/sequence/${FRAME_VERSION}/${variant}/${pad(index)}.avif`;

/** JPEG copies of the scene keyframes, for browsers that can't decode AVIF. */
export const stillPath = (variant: FrameVariant, index: number) =>
  `/sequence/${FRAME_VERSION}/${variant}/still-${pad(index)}.jpg`;

/** A 2×2 AVIF, used to check AVIF support before choosing which files to load. */
export const AVIF_PROBE =
  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAE1pUHJhdmlmbWlhZm1pZjEAAAFebWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAAOcGl0bQAAAAAAAQAAADhpaW5mAAAAAAACAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAFWluZmUCAAABAAIAAEV4aWYAAAAAGmlyZWYAAAAAAAAADmNkc2MAAgABAAEAAACBaXBycAAAAGBpcGNvAAAAE2NvbHJuY2x4AAIAAgAGgAAAAAxjbGxpAMsAQAAAABRpc3BlAAAAAAAAAAIAAAACAAAACWlyb3QAAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABlpcG1hAAAAAAAAAAEAAQaBAgMFhoQAAAAsaWxvYwAAAABEAAACAAEAAAABAAACAAAAACEAAgAAAAEAAAGOAAAAcgAAAAFtZGF0AAAAAAAAAKMAAAAGRXhpZgAATU0AKgAAAAgABAESAAMAAAABAAEAAAFCAAQAAAABAAACAAFDAAQAAAABAAACAIdpAAQAAAABAAAAPgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAAqADAAQAAAABAAAAAgAAAAASAAoMAAAAAAZ//AgQEDQgMg8QAb4ASSSSIADh1HmUokA=";
