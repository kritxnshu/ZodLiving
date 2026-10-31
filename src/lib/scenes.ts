export interface ScenePlacement {
  /**
   * Tailwind utility classes positioning the text from the `sm` breakpoint up, so every class needs
   * the `sm:` prefix. Below it (phones) all scenes share a centred layout set in CinematicScrollCanvas.
   */
  desktopContainerClass: string;
  /**
   * Text alignment
   */
  align: "left" | "center" | "right";
}

export interface SceneMarker {
  id: string;
  number: number;
  label: string;
  keyframe: number;
  pStart: number;
  pEnd: number;
  eyebrow: string;
  heading: string;
  supportingText: string;
  placement: ScenePlacement;
}

// Keyframes are indices into the frame sequence (src/lib/frames.ts) and must match SCENES in
// scripts/build-frames.sh. Each transition's share of the scroll (gap between one pEnd and the next
// pStart) is proportional to the number of frames it crosses, so every transition plays at the same speed.
export const SCENE_MARKERS: readonly SceneMarker[] = [
  {
    id: "scene-1",
    number: 1,
    label: "Exterior",
    keyframe: 0,
    pStart: 0.00,
    pEnd: 0.06,
    eyebrow: "ZOD LIVING",
    heading: "A place to feel at home.",
    supportingText: "Comfort begins the moment you arrive.",
    placement: {
      desktopContainerClass: "sm:left-[8%] sm:bottom-[15%] sm:text-left sm:items-start",
      align: "left",
    },
  },
  {
    id: "scene-2",
    number: 2,
    label: "Lobby",
    keyframe: 117,
    pStart: 0.229,
    pEnd: 0.309,
    eyebrow: "MORE THAN A PLACE TO STAY",
    heading: "Come home to ZOD.",
    supportingText: "Stay. Relax. Unwind.",
    placement: {
      desktopContainerClass: "sm:left-1/2 sm:-translate-x-1/2 sm:bottom-[11%] sm:text-center sm:items-center",
      align: "center",
    },
  },
  {
    id: "scene-3",
    number: 3,
    label: "Reception",
    keyframe: 219,
    pStart: 0.456,
    pEnd: 0.536,
    eyebrow: "THOUGHTFUL HOSPITALITY",
    heading: "Every detail, considered.",
    supportingText: "A warm welcome. A smoother everyday.",
    placement: {
      desktopContainerClass: "sm:left-[8%] sm:bottom-[14%] sm:text-left sm:items-start",
      align: "left",
    },
  },
  {
    id: "scene-4",
    number: 4,
    label: "Double Sharing",
    keyframe: 333,
    pStart: 0.701,
    pEnd: 0.781,
    eyebrow: "DOUBLE SHARING",
    heading: "Your space. Your comfort.",
    supportingText: "Room to rest, recharge, and focus.",
    placement: {
      desktopContainerClass: "sm:right-[8%] sm:bottom-[14%] sm:text-right sm:items-end",
      align: "right",
    },
  },
  {
    id: "scene-5",
    number: 5,
    label: "Triple Sharing",
    keyframe: 443,
    pStart: 0.94,
    pEnd: 1.00,
    eyebrow: "SHARED LIVING",
    heading: "Better together.",
    supportingText: "Shared spaces. Room to grow.",
    placement: {
      desktopContainerClass: "sm:left-[8%] sm:bottom-[15%] sm:text-left sm:items-start",
      align: "left",
    },
  },
] as const;

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * Maps scroll progress (0..1) to target frame index (0..TOTAL_FRAMES-1) continuously,
 * with natural plateaus at the five checkpoints.
 */
export function progressToFrame(p: number): number {
  if (p <= SCENE_MARKERS[0].pEnd) return SCENE_MARKERS[0].keyframe;
  if (p >= SCENE_MARKERS[4].pStart) return SCENE_MARKERS[4].keyframe;

  for (let i = 0; i < SCENE_MARKERS.length - 1; i++) {
    const curr = SCENE_MARKERS[i];
    const next = SCENE_MARKERS[i + 1];

    if (p >= curr.pStart && p <= curr.pEnd) {
      return curr.keyframe;
    }

    if (p > curr.pEnd && p < next.pStart) {
      const t = smoothstep(curr.pEnd, next.pStart, p);
      return curr.keyframe + (next.keyframe - curr.keyframe) * t;
    }
  }

  return SCENE_MARKERS[4].keyframe;
}

export interface SceneOverlayState {
  activeSceneNumber: number | null;
  opacity: number;
}

/**
 * Evaluates whether text should be displayed for a scene checkpoint.
 * Text only appears near/at checkpoints, fading out cleanly during camera travel.
 */
export function getSceneOverlayState(p: number): SceneOverlayState {
  const fadeBuffer = 0.03; // Smooth 3% progress fade buffer

  for (let i = 0; i < SCENE_MARKERS.length; i++) {
    const cp = SCENE_MARKERS[i];
    const lower = cp.pStart - fadeBuffer;
    const upper = cp.pEnd + fadeBuffer;

    if (p >= lower && p <= upper) {
      let op = 1;
      if (p < cp.pStart) {
        op = (p - lower) / fadeBuffer;
      } else if (p > cp.pEnd) {
        op = (upper - p) / fadeBuffer;
      }
      return {
        activeSceneNumber: cp.number,
        opacity: Math.max(0, Math.min(1, op)),
      };
    }
  }

  return { activeSceneNumber: null, opacity: 0 };
}
