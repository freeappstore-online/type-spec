import { useMemo, useState } from 'react'
import { CATEGORIES, FONTS, type FontCategory } from '../data/fonts'
import { useFontLoader } from '../hooks/useFontLoader'

interface FontPickerProps {
  value: string
  onChange: (name: string) => void
  /** When true, show the inline category filter chips. Default true. */
  showFilter?: boolean
  /** Optional set of favorite font names for the star toggle. */
  favorites?: Set<string>
  onToggleFavorite?: (name: string) => void
  /** Tighter list height for embedded use. */
  compact?: boolean
}

export function FontPicker({
  value,
  onChange,
  showFilter = true,
  favorites,
  onToggleFavorite,
  compact = false,
}: FontPickerProps) {
  const [filter, setFilter] = useState<FontCategory | 'all'>('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FONTS.filter((f) => {
      if (filter !== 'all' && f.category !== filter) return false
      if (q && !f.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [filter, query])

  // Preload the visible fonts so each row renders in its own face.
  useFontLoader(visible.map((f) => f.name))

  return (
    <div className="flex flex-col gap-3">
      {showFilter && (
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`chip ${filter === c.key ? 'chip-active' : ''}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <input
        type="text"
        className="input"
        placeholder="Search fonts…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul
        className={`flex flex-col gap-1 overflow-y-auto pr-1 ${compact ? 'max-h-64' : 'max-h-[28rem]'}`}
      >
        {visible.map((f) => {
          const active = f.name === value
          const fav = favorites?.has(f.name) ?? false
          return (
            <li key={f.name}>
              <div
                className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                  active
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-[var(--line)] bg-[var(--glass)] hover:bg-[var(--glass-strong)]'
                }`}
              >
                <button
                  type="button"
                  className="flex flex-1 flex-col items-start text-left"
                  onClick={() => onChange(f.name)}
                >
                  <span
                    className="text-lg leading-tight"
                    style={{ fontFamily: `'${f.cssFamily}', system-ui, sans-serif` }}
                  >
                    {f.name}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">
                    {f.category} · {f.weights.length} weight{f.weights.length === 1 ? '' : 's'}
                  </span>
                </button>
                {onToggleFavorite && (
                  <button
                    type="button"
                    aria-label={fav ? 'Remove favorite' : 'Save favorite'}
                    className="ml-2 px-2 text-lg leading-none"
                    style={{ color: fav ? 'var(--accent)' : 'var(--muted)' }}
                    onClick={(e) => { e.stopPropagation(); onToggleFavorite(f.name) }}
                  >
                    {fav ? '★' : '☆'}
                  </button>
                )}
              </div>
            </li>
          )
        })}
        {visible.length === 0 && (
          <li className="text-xs text-[var(--muted)] px-2 py-3">No fonts match that filter.</li>
        )}
      </ul>
    </div>
  )
}
