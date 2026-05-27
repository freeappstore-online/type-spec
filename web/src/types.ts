export type ViewKey =
  | 'specimen'
  | 'scale'
  | 'pairings'
  | 'playground'
  | 'compare'
  | 'weights'
  | 'text'
  | 'favorites'

export interface ViewDef {
  key: ViewKey
  label: string
  hint: string
}

export const VIEWS: readonly ViewDef[] = [
  { key: 'specimen', label: 'Specimen', hint: 'Preview a single font' },
  { key: 'scale', label: 'Scale', hint: 'Generate a type scale' },
  { key: 'pairings', label: 'Pairings', hint: 'Curated font duos' },
  { key: 'playground', label: 'Playground', hint: 'Tune heading + body' },
  { key: 'compare', label: 'Compare', hint: 'Two fonts side by side' },
  { key: 'weights', label: 'Weights', hint: 'All weights of a font' },
  { key: 'text', label: 'Text', hint: 'Custom text at every scale' },
  { key: 'favorites', label: 'Favorites', hint: 'Saved fonts and pairs' },
] as const
