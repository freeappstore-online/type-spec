/** Common sample copy used across specimen views. */

export const ALPHABET_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const ALPHABET_LOWER = 'abcdefghijklmnopqrstuvwxyz'
export const NUMBERS = '0123456789 ! ? & @ # $ % * + = / \\'
export const LIGATURES = 'fi fl ff ffi ffl Th st ct → ← ⇒ ≠ ≈ ©®™'

export const PARAGRAPH =
  'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. ' +
  'How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow. ' +
  'Typography is the craft of endowing human language with a durable visual form.'

export const SHORT_PARAGRAPH =
  'Typography is what language looks like. The voice of the text.'

export const HEADING_SAMPLES: readonly string[] = [
  'Designing with type',
  'The shape of language',
  'A specimen for every voice',
  'Words on a page',
] as const

export const PANGRAMS: readonly string[] = [
  'The quick brown fox jumps over the lazy dog.',
  'Sphinx of black quartz, judge my vow.',
  'Pack my box with five dozen liquor jugs.',
  'How vexingly quick daft zebras jump!',
] as const
