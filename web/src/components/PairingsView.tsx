import { useMemo } from 'react'
import { PAIRINGS, type Pairing } from '../data/pairings'
import { getFont } from '../data/fonts'
import { useFontLoader } from '../hooks/useFontLoader'

interface Props {
  favPairings: Set<string>
  onToggleFavorite: (id: string) => void
  onPickPair?: (heading: string, body: string) => void
}

export function PairingsView({ favPairings, onToggleFavorite, onPickPair }: Props) {
  const names = useMemo(() => {
    const set = new Set<string>()
    for (const p of PAIRINGS) {
      set.add(p.heading)
      set.add(p.body)
    }
    return Array.from(set)
  }, [])
  useFontLoader(names)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PAIRINGS.map((p) => (
        <PairCard
          key={p.id}
          pair={p}
          favorited={favPairings.has(p.id)}
          onToggleFavorite={() => onToggleFavorite(p.id)}
          onPick={onPickPair ? () => onPickPair(p.heading, p.body) : undefined}
        />
      ))}
    </div>
  )
}

function PairCard({
  pair,
  favorited,
  onToggleFavorite,
  onPick,
}: {
  pair: Pairing
  favorited: boolean
  onToggleFavorite: () => void
  onPick?: () => void
}) {
  const h = getFont(pair.heading)
  const b = getFont(pair.body)
  const headingFamily = h ? `'${h.cssFamily}', serif` : 'serif'
  const bodyFamily = b ? `'${b.cssFamily}', sans-serif` : 'sans-serif'

  return (
    <article className="surface p-5 flex flex-col gap-3">
      <header className="flex items-start justify-between gap-2">
        <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
          {pair.heading} <span className="text-[var(--accent)]">+</span> {pair.body}
        </p>
        <button
          type="button"
          aria-label={favorited ? 'Remove favorite' : 'Save favorite'}
          className="text-lg leading-none"
          style={{ color: favorited ? 'var(--accent)' : 'var(--muted)' }}
          onClick={onToggleFavorite}
        >
          {favorited ? '★' : '☆'}
        </button>
      </header>

      <h3
        className="text-3xl leading-tight"
        style={{ fontFamily: headingFamily, fontWeight: 700, letterSpacing: '-0.02em' }}
      >
        Designing with intention
      </h3>

      <p
        className="text-[0.95rem] leading-relaxed text-[var(--ink)]"
        style={{ fontFamily: bodyFamily, fontWeight: 400 }}
      >
        Good typography is invisible — it lets the reader focus on the words.
        Great typography is unforgettable — it gives those words a voice.
      </p>

      <p className="text-xs text-[var(--muted)]">{pair.description}</p>

      {onPick && (
        <button type="button" className="btn mt-1 w-fit" onClick={onPick}>
          Open in playground →
        </button>
      )}
    </article>
  )
}
