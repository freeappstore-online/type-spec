export interface Pairing {
  id: string
  heading: string
  body: string
  description: string
}

/**
 * 12 curated heading + body font pairings.
 * `heading` and `body` MUST match a `FontDef.name` in fonts.ts.
 */
export const PAIRINGS: readonly Pairing[] = [
  {
    id: 'fraunces-manrope',
    heading: 'Fraunces',
    body: 'Manrope',
    description: 'Warm modern serif with a clean geometric sans. Editorial yet contemporary.',
  },
  {
    id: 'playfair-source-sans',
    heading: 'Playfair Display',
    body: 'Source Sans 3',
    description: 'High-contrast display serif paired with a neutral workhorse sans.',
  },
  {
    id: 'bebas-open-sans',
    heading: 'Bebas Neue',
    body: 'Open Sans',
    description: 'Bold condensed display next to a humanist sans. Magazine cover energy.',
  },
  {
    id: 'merriweather-montserrat',
    heading: 'Merriweather',
    body: 'Montserrat',
    description: 'Sturdy reading serif with a geometric sans. A classic editorial combo.',
  },
  {
    id: 'oswald-lora',
    heading: 'Oswald',
    body: 'Lora',
    description: 'Tall condensed sans paired with a calligraphic serif. Strong, readable.',
  },
  {
    id: 'space-grotesk-inter',
    heading: 'Space Grotesk',
    body: 'Inter',
    description: 'Quirky geometric headlines with the most reliable UI sans there is.',
  },
  {
    id: 'cormorant-work-sans',
    heading: 'Cormorant Garamond',
    body: 'Work Sans',
    description: 'Elegant high-contrast serif with a friendly grotesque sans.',
  },
  {
    id: 'archivo-ibm-plex-serif',
    heading: 'Archivo',
    body: 'IBM Plex Serif',
    description: 'Industrial sans heading with a literary serif body. Tech meets long-form.',
  },
  {
    id: 'dm-sans-eb-garamond',
    heading: 'DM Sans',
    body: 'EB Garamond',
    description: 'Friendly geometric sans with a classical garalde serif. Approachable.',
  },
  {
    id: 'playfair-karla',
    heading: 'Playfair Display',
    body: 'Karla',
    description: 'Stately display serif balanced by a low-contrast, narrow sans.',
  },
  {
    id: 'oswald-nunito',
    heading: 'Oswald',
    body: 'Nunito',
    description: 'Industrial display with a rounded humanist sans. Punchy and warm.',
  },
  {
    id: 'jetbrains-mono-inter',
    heading: 'JetBrains Mono',
    body: 'Inter',
    description: 'Monospace headings for technical docs, paired with a clear UI sans.',
  },
] as const
