export const ANIMATION_DURATIONS = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  smooth: 0.3,
} as const;

export const EASING = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  spring: [0.175, 0.885, 0.32, 1.275],
} as const;
