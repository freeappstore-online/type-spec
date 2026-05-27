import { useCallback, useEffect, useState } from 'react'

const FONTS_KEY = 'type-spec:fav-fonts'
const PAIRINGS_KEY = 'type-spec:fav-pairings'

function readSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((v): v is string => typeof v === 'string'))
    }
    return new Set()
  } catch {
    return new Set()
  }
}

function writeSet(key: string, set: Set<string>): void {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)))
  } catch { /* noop */ }
}

export function useFavorites() {
  const [favFonts, setFavFonts] = useState<Set<string>>(() => readSet(FONTS_KEY))
  const [favPairings, setFavPairings] = useState<Set<string>>(() => readSet(PAIRINGS_KEY))

  useEffect(() => { writeSet(FONTS_KEY, favFonts) }, [favFonts])
  useEffect(() => { writeSet(PAIRINGS_KEY, favPairings) }, [favPairings])

  const toggleFont = useCallback((name: string) => {
    setFavFonts((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  const togglePairing = useCallback((id: string) => {
    setFavPairings((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return { favFonts, favPairings, toggleFont, togglePairing }
}
