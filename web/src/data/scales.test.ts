import { describe, it, expect } from 'vitest'
import { SCALE_RATIOS, SCALE_STEPS, sizeForStep } from './scales'

describe('sizeForStep', () => {
  it('returns base size at step 0', () => {
    expect(sizeForStep(16, 1.25, 0)).toBe(16)
  })

  it('scales up by ratio for positive steps', () => {
    expect(sizeForStep(16, 1.5, 1)).toBe(24)
    expect(sizeForStep(16, 2, 2)).toBe(64)
  })

  it('scales down by ratio for negative steps', () => {
    expect(sizeForStep(16, 2, -1)).toBe(8)
    expect(sizeForStep(16, 2, -2)).toBe(4)
  })

  it('rounds to 2 decimal places', () => {
    const v = sizeForStep(16, 1.333, 1)
    expect(Number.isFinite(v)).toBe(true)
    // 16 * 1.333 = 21.328 → 21.33
    expect(v).toBe(21.33)
  })
})

describe('SCALE_RATIOS / SCALE_STEPS', () => {
  it('contains 6 ratios', () => {
    expect(SCALE_RATIOS.length).toBe(6)
  })

  it('contains 8 steps from -2 to +5', () => {
    expect(SCALE_STEPS.length).toBe(8)
    expect(SCALE_STEPS[0]?.step).toBe(-2)
    expect(SCALE_STEPS[SCALE_STEPS.length - 1]?.step).toBe(5)
  })
})
