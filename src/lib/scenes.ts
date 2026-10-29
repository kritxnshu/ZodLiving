export interface ScenePlacement {
  /**
   * Tailwind utility classes for container positioning on desktop
   */
  desktopContainerClass: string;
  /**
   * Tailwind utility classes for container positioning on mobile
   */
  mobileContainerClass: string;
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
      desktopContainerClass: "left-[8%] bottom-[15%] text-left items-start",
      mobileContainerClass: "left-[6%] bottom-[12%] text-left items-start",
      align: "left",
    },
  },
  {
    id: "scene-2",
    number: 2,
    label: "Lobby",
    keyframe: 234,
    pStart: 0.26,
    pEnd: 0.34,
    eyebrow: "MORE THAN A PLACE TO STAY",
    heading: "Come home to ZOD.",
    supportingText: "Stay. Relax. Unwind.",
    placement: {
      desktopContainerClass: "left-1/2 -translate-x-1/2 bottom-[11%] text-center items-center",
      mobileContainerClass: "left-1/2 -translate-x-1/2 bottom-[10%] text-center items-center",
      align: "center",
    },
  },
  {
    id: "scene-3",
    number: 3,
    label: "Reception",
    keyframe: 438,
    pStart: 0.54,
    pEnd: 0.62,
    eyebrow: "THOUGHTFUL HOSPITALITY",
    heading: "Every detail, considered.",
    supportingText: "A warm welcome. A smoother everyday.",
    placement: {
      desktopContainerClass: "left-[8%] bottom-[14%] text-left items-start",
      mobileContainerClass: "left-[6%] bottom-[12%] text-left items-start",
      align: "left",
    },
  },
  {
    id: "scene-4",
    number: 4,
    label: "Double Sharing",
    keyframe: 666,
    pStart: 0.78,
    pEnd: 0.86,
    eyebrow: "DOUBLE SHARING",
    heading: "Your space. Your comfort.",
    supportingText: "Room to rest, recharge, and focus.",
    placement: {
      desktopContainerClass: "right-[8%] bottom-[14%] text-right items-end",
      mobileContainerClass: "right-[6%] bottom-[12%] text-right items-end",
      align: "right",
    },
  },
  {
    id: "scene-5",
    number: 5,
    label: "Triple Sharing",
    keyframe: 886,
    pStart: 0.94,
    pEnd: 1.00,
    eyebrow: "SHARED LIVING",
    heading: "Better together.",
    supportingText: "Shared spaces. Room to grow.",
    placement: {
      desktopContainerClass: "left-[8%] bottom-[15%] text-left items-start",
      mobileContainerClass: "left-[6%] bottom-[12%] text-left items-start",
      align: "left",
    },
  },
] as const;

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * Maps scroll progress (0..1) to target frame index (0..889) continuously,
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
