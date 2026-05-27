export type FontCategory = 'sans' | 'serif' | 'mono' | 'display'

export interface FontDef {
  /** Display name */
  name: string
  /** Google Fonts URL family token, e.g. "Source+Sans+3" */
  family: string
  /** CSS font-family value, e.g. "Source Sans 3" */
  cssFamily: string
  category: FontCategory
  /** Available weights (numeric values supported by Google Fonts) */
  weights: number[]
  /** Whether the font has true italic styles */
  italic?: boolean
}

/**
 * 25 curated Google Fonts. Each entry maps to a single Google Fonts family.
 * `family` matches the `family=` parameter in the Google Fonts CSS URL.
 */
export const FONTS: readonly FontDef[] = [
  // Sans
  { name: 'Manrope', family: 'Manrope', cssFamily: 'Manrope', category: 'sans', weights: [200, 300, 400, 500, 600, 700, 800] },
  { name: 'Inter', family: 'Inter', cssFamily: 'Inter', category: 'sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: 'Roboto', family: 'Roboto', cssFamily: 'Roboto', category: 'sans', weights: [100, 300, 400, 500, 700, 900], italic: true },
  { name: 'Open Sans', family: 'Open+Sans', cssFamily: 'Open Sans', category: 'sans', weights: [300, 400, 500, 600, 700, 800], italic: true },
  { name: 'Montserrat', family: 'Montserrat', cssFamily: 'Montserrat', category: 'sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'Source Sans 3', family: 'Source+Sans+3', cssFamily: 'Source Sans 3', category: 'sans', weights: [200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'Space Grotesk', family: 'Space+Grotesk', cssFamily: 'Space Grotesk', category: 'sans', weights: [300, 400, 500, 600, 700] },
  { name: 'Work Sans', family: 'Work+Sans', cssFamily: 'Work Sans', category: 'sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'DM Sans', family: 'DM+Sans', cssFamily: 'DM Sans', category: 'sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'IBM Plex Sans', family: 'IBM+Plex+Sans', cssFamily: 'IBM Plex Sans', category: 'sans', weights: [100, 200, 300, 400, 500, 600, 700], italic: true },
  { name: 'Archivo', family: 'Archivo', cssFamily: 'Archivo', category: 'sans', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'Karla', family: 'Karla', cssFamily: 'Karla', category: 'sans', weights: [200, 300, 400, 500, 600, 700, 800], italic: true },
  { name: 'Nunito', family: 'Nunito', cssFamily: 'Nunito', category: 'sans', weights: [200, 300, 400, 500, 600, 700, 800, 900], italic: true },

  // Serif
  { name: 'Fraunces', family: 'Fraunces', cssFamily: 'Fraunces', category: 'serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'Playfair Display', family: 'Playfair+Display', cssFamily: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900], italic: true },
  { name: 'Lora', family: 'Lora', cssFamily: 'Lora', category: 'serif', weights: [400, 500, 600, 700], italic: true },
  { name: 'Merriweather', family: 'Merriweather', cssFamily: 'Merriweather', category: 'serif', weights: [300, 400, 700, 900], italic: true },
  { name: 'Crimson Pro', family: 'Crimson+Pro', cssFamily: 'Crimson Pro', category: 'serif', weights: [200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'EB Garamond', family: 'EB+Garamond', cssFamily: 'EB Garamond', category: 'serif', weights: [400, 500, 600, 700, 800], italic: true },
  { name: 'IBM Plex Serif', family: 'IBM+Plex+Serif', cssFamily: 'IBM Plex Serif', category: 'serif', weights: [100, 200, 300, 400, 500, 600, 700], italic: true },
  { name: 'Cormorant Garamond', family: 'Cormorant+Garamond', cssFamily: 'Cormorant Garamond', category: 'serif', weights: [300, 400, 500, 600, 700], italic: true },

  // Mono
  { name: 'Source Code Pro', family: 'Source+Code+Pro', cssFamily: 'Source Code Pro', category: 'mono', weights: [200, 300, 400, 500, 600, 700, 800, 900], italic: true },
  { name: 'JetBrains Mono', family: 'JetBrains+Mono', cssFamily: 'JetBrains Mono', category: 'mono', weights: [100, 200, 300, 400, 500, 600, 700, 800], italic: true },

  // Display
  { name: 'Oswald', family: 'Oswald', cssFamily: 'Oswald', category: 'display', weights: [200, 300, 400, 500, 600, 700] },
  { name: 'Bebas Neue', family: 'Bebas+Neue', cssFamily: 'Bebas Neue', category: 'display', weights: [400] },
] as const

export const FONT_BY_NAME: Record<string, FontDef> = Object.fromEntries(
  FONTS.map((f) => [f.name, f]),
)

export function getFont(name: string): FontDef | undefined {
  return FONT_BY_NAME[name]
}

export const CATEGORIES: { key: FontCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'sans', label: 'Sans' },
  { key: 'serif', label: 'Serif' },
  { key: 'mono', label: 'Mono' },
  { key: 'display', label: 'Display' },
]
