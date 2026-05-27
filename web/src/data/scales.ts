export interface ScaleRatio {
  id: string
  label: string
  value: number
}

export const SCALE_RATIOS: readonly ScaleRatio[] = [
  { id: 'minor-second', label: 'Minor second', value: 1.125 },
  { id: 'major-third', label: 'Major third', value: 1.25 },
  { id: 'perfect-fourth', label: 'Perfect fourth', value: 1.333 },
  { id: 'augmented-fourth', label: 'Augmented fourth', value: 1.414 },
  { id: 'perfect-fifth', label: 'Perfect fifth', value: 1.5 },
  { id: 'golden-ratio', label: 'Golden ratio', value: 1.618 },
] as const

export const BASE_SIZES: readonly number[] = [16, 18, 20] as const

/**
 * Step labels used in the scale generator.
 * Steps run -2 through +5 (8 sizes), with semantic labels mapped 1:1.
 */
export interface ScaleStep {
  step: number
  label: string
  cssVar: string
}

export const SCALE_STEPS: readonly ScaleStep[] = [
  { step: -2, label: 'xs', cssVar: '--fs-xs' },
  { step: -1, label: 'sm', cssVar: '--fs-sm' },
  { step: 0, label: 'base', cssVar: '--fs-base' },
  { step: 1, label: 'lg', cssVar: '--fs-lg' },
  { step: 2, label: 'xl', cssVar: '--fs-xl' },
  { step: 3, label: '2xl', cssVar: '--fs-2xl' },
  { step: 4, label: '3xl', cssVar: '--fs-3xl' },
  { step: 5, label: '4xl', cssVar: '--fs-4xl' },
] as const

/**
 * Returns size in pixels for `base * ratio^step`, rounded to 2 decimals.
 */
export function sizeForStep(base: number, ratio: number, step: number): number {
  return Math.round(base * Math.pow(ratio, step) * 100) / 100
}
