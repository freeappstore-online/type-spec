import { useMemo } from 'react'
import { getFont } from '../data/fonts'
import { PAIRINGS } from '../data/pairings'
import { useFontLoader } from '../hooks/useFontLoader'

interface Props {
  favFonts: Set<string>
  favPairings: Set<string>
  onToggleFont: (name: string) => void
  onTogglePairing: (id: string) => void
  onOpenFont: (name: string) => void
  onOpenPairing: (heading: string, body: string) => void
}

export function FavoritesView({
  favFonts,
  favPairings,
  onToggleFont,
  onTogglePairing,
  onOpenFont,
  onOpenPairing,
}: Props) {
  const fonts = useMemo(() => Array.from(favFonts), [favFonts])
  const pairings = useMemo(
    () => PAIRINGS.filter((p) => favPairings.has(p.id)),
    [favPairings],
  )

  const allFonts = useMemo(() => {
    const set = new Set(fonts)
    for (const p of pairings) {
      set.add(p.heading)
      set.add(p.body)
    }
    return Array.from(set)
  }, [fonts, pairings])
  useFontLoader(allFonts)

  return (
    <div className="flex flex-col gap-7">
      <section className="surface p-6">
        <header className="flex items-baseline justify-between mb-4">
          <h2 className="display-font text-2xl">Saved fonts</h2>
          <span className="text-xs text-[var(--muted)]">{fonts.length} saved</span>
        </header>

        {fonts.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Tap a star next to any font to bookmark it here.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {fonts.map((name) => {
              const def = getFont(name)
              const family = def ? `'${def.cssFamily}', system-ui, sans-serif` : 'system-ui, sans-serif'
              return (
                <li key={name} className="surface-soft px-3 py-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="text-left flex-1 flex flex-col"
                    onClick={() => onOpenFont(name)}
                  >
                    <span className="text-lg" style={{ fontFamily: family, fontWeight: 600 }}>
                      {name}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">
                      {def?.category ?? 'font'}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Remove favorite"
                    className="text-lg"
                    style={{ color: 'var(--accent)' }}
                    onClick={() => onToggleFont(name)}
                  >
                    ★
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="surface p-6">
        <header className="flex items-baseline justify-between mb-4">
          <h2 className="display-font text-2xl">Saved pairings</h2>
          <span className="text-xs text-[var(--muted)]">{pairings.length} saved</span>
        </header>

        {pairings.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Tap a star on a pairing card to bookmark it here.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {pairings.map((p) => {
              const h = getFont(p.heading)
              const b = getFont(p.body)
              const headingFamily = h ? `'${h.cssFamily}', serif` : 'serif'
              const bodyFamily = b ? `'${b.cssFamily}', sans-serif` : 'sans-serif'
              return (
                <li key={p.id} className="surface-soft p-4 flex flex-col gap-2">
                  <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                    {p.heading} + {p.body}
                  </p>
                  <h3
                    className="text-2xl leading-tight"
                    style={{ fontFamily: headingFamily, fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    Designing with intention
                  </h3>
                  <p
                    className="text-sm"
                    style={{ fontFamily: bodyFamily, fontWeight: 400, lineHeight: 1.55 }}
                  >
                    Good typography is invisible.
                  </p>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => onOpenPairing(p.heading, p.body)}
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => onTogglePairing(p.id)}
                    >
                      ★ Remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
