#!/bin/bash
# Builds the hero scroll sequence from the original PNG frames.
#
#   npm run frames
#
# Reads   frames-source/frame1..frame4/*.png   890 frames, 1920×1080 (gitignored, ~1 GB)
# Writes  public/sequence/<VERSION>/desktop/NNN.avif         1600×900
#         public/sequence/<VERSION>/mobile/NNN.avif          720×1080 crop for portrait screens, centred
#                                                            on each scene's subject (see SCENES)
#         public/sequence/<VERSION>/<variant>/still-NNN.jpg  scene keyframes as JPEG, for browsers
#                                                            without AVIF support
#
# Only every STEP-th source frame is kept. Uses macOS `sips`, so run it on a Mac.
# Whenever the output changes, bump VERSION here and FRAME_VERSION in src/lib/frames.ts: the frames
# are served with a one-year immutable cache, so a new folder is the only way browsers pick them up.
set -euo pipefail

VERSION=v2
STEP=2
QUALITY=60
STILL_QUALITY=80
# keyframe:focus for each scene. Keyframes must match src/lib/scenes.ts. Focus is where the subject
# sits across the source frame (0 = left edge, 1 = right edge): the mobile crop is centred on it at
# each keyframe and pans smoothly between them.
SCENES="0:0.514 117:0.5 219:0.57 333:0.57 443:0.56"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/frames-source"
OUT="$ROOT/public/sequence/$VERSION"

command -v sips >/dev/null || { echo "sips not found: this script needs macOS" >&2; exit 1; }
[ -d "$SRC" ] || { echo "Missing $SRC" >&2; exit 1; }

rm -rf "$OUT"
mkdir -p "$OUT/desktop" "$OUT/mobile"

LIST="$(mktemp)"
trap 'rm -f "$LIST"' EXIT

# Source frames in playback order (folder by folder, file names sorted), keeping every STEP-th.
i=0
n=0
for dir in "$SRC/frame1" "$SRC/frame2" "$SRC/frame3" "$SRC/frame4"; do
  for f in $(ls "$dir"/*.png | sort); do
    if [ $((i % STEP)) -eq 0 ]; then
      printf '%03d %s\n' "$n" "$f" >>"$LIST"
      n=$((n + 1))
    fi
    i=$((i + 1))
  done
done
echo "Encoding $n of $i frames into $OUT"

# Third column: left edge of the 720px mobile crop, interpolated between the scene focus points.
# Clamped to 1..1200 because sips reads a cropOffset of 0 as "centre".
awk -v scenes="$SCENES" '
  BEGIN { n = split(scenes, s, " "); for (j = 1; j <= n; j++) { split(s[j], kv, ":"); k[j] = kv[1]; f[j] = kv[2] } }
  {
    i = $1 + 0; focus = f[n]
    for (j = 1; j < n; j++) if (i <= k[j + 1]) { focus = f[j] + (f[j + 1] - f[j]) * (i - k[j]) / (k[j + 1] - k[j]); break }
    x = int(focus * 1920 - 360 + 0.5); if (x < 1) x = 1; if (x > 1200) x = 1200
    print $1, $2, x
  }' "$LIST" >"$LIST.crop"
mv "$LIST.crop" "$LIST"

encode() {
  sips -s format avif -s formatOptions "$QUALITY" --resampleWidth 1600 "$2" --out "$OUT/desktop/$1.avif" >/dev/null
  sips -s format avif -s formatOptions "$QUALITY" -c 1080 720 --cropOffset 0 "$3" "$2" --out "$OUT/mobile/$1.avif" >/dev/null
}
export -f encode
export OUT QUALITY
xargs -P 8 -n 3 bash -c 'encode "$0" "$1" "$2"' <"$LIST"

for scene in $SCENES; do
  num="$(printf '%03d' "${scene%%:*}")"
  read -r _ src x <<<"$(awk -v n="$num" '$1 == n' "$LIST")"
  sips -s format jpeg -s formatOptions "$STILL_QUALITY" --resampleWidth 1600 "$src" --out "$OUT/desktop/still-$num.jpg" >/dev/null
  sips -s format jpeg -s formatOptions "$STILL_QUALITY" -c 1080 720 --cropOffset 0 "$x" "$src" --out "$OUT/mobile/still-$num.jpg" >/dev/null
done

du -sh "$OUT/desktop" "$OUT/mobile"
