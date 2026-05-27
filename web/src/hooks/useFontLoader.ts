import { useEffect } from 'react'
import { getFont } from '../data/fonts'

const LINK_ID_PREFIX = 'type-spec-font-'
const loaded = new Set<string>()

/**
 * Build the Google Fonts CSS2 URL for a single family, requesting every
 * available weight in roman (and italic when supported).
 */
function buildHref(fontName: string): string | null {
  const f = getFont(fontName)
  if (!f) return null
  const weights = f.weights.slice().sort((a, b) => a - b)
  const params: string[] = []
  if (f.italic) {
    // ital,wght@0,400;0,500;1,400;1,500 …
    const pairs: string[] = []
    for (const w of weights) pairs.push(`0,${w}`)
    for (const w of weights) pairs.push(`1,${w}`)
    params.push(`family=${f.family}:ital,wght@${pairs.join(';')}`)
  } else {
    params.push(`family=${f.family}:wght@${weights.join(';')}`)
  }
  params.push('display=swap')
  return `https://fonts.googleapis.com/css2?${params.join('&')}`
}

function injectFont(fontName: string): void {
  if (loaded.has(fontName)) return
  const href = buildHref(fontName)
  if (!href) return
  const id = LINK_ID_PREFIX + fontName.replace(/\s+/g, '-').toLowerCase()
  if (document.getElementById(id)) {
    loaded.add(fontName)
    return
  }
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
  loaded.add(fontName)
}

/**
 * Ensure each font in `fontNames` has its `<link rel="stylesheet">` injected.
 * Safe to call from multiple components — each font is injected once.
 */
export function useFontLoader(fontNames: readonly string[]): void {
  useEffect(() => {
    for (const name of fontNames) {
      if (name) injectFont(name)
    }
  }, [fontNames])
}

/** Imperative version for one-off loads (e.g. inside event handlers). */
export function loadFont(fontName: string): void {
  injectFont(fontName)
}
