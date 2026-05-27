import type { ReactNode } from 'react'
import { getFont } from '../data/fonts'
import { useFontLoader } from '../hooks/useFontLoader'
import { ALPHABET_LOWER, ALPHABET_UPPER, LIGATURES, NUMBERS, PARAGRAPH } from '../data/samples'
import { FontPicker } from './FontPicker'

interface Props {
  font: string
  onFontChange: (name: string) => void
  favFonts: Set<string>
  onToggleFavorite: (name: string) => void
}

export function SpecimenView({ font, onFontChange, favFonts, onToggleFavorite }: Props) {
  const def = getFont(font)
  useFontLoader([font])
  const family = def ? `'${def.cssFamily}', system-ui, sans-serif` : 'system-ui, sans-serif'

  return (
    <div className="grid gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <aside className="surface p-4">
        <h2 className="display-font text-xl mb-3">Choose a font</h2>
        <FontPicker
          value={font}
          onChange={onFontChange}
          favorites={favFonts}
          onToggleFavorite={onToggleFavorite}
        />
      </aside>

      <section className="surface p-6 flex flex-col gap-7">
        <header className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
              {def?.category ?? 'font'}
            </p>
            <h1
              className="text-5xl sm:text-6xl leading-none mt-1"
              style={{ fontFamily: family, fontWeight: 700 }}
            >
              {def?.name ?? font}
            </h1>
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => onToggleFavorite(font)}
            aria-pressed={favFonts.has(font)}
          >
            {favFonts.has(font) ? '★ Saved' : '☆ Save'}
          </button>
        </header>

        <Block label="Uppercase">
          <p style={{ fontFamily: family, fontWeight: 500, fontSize: '2rem', lineHeight: 1.2 }}>
            {ALPHABET_UPPER}
          </p>
        </Block>

        <Block label="Lowercase">
          <p style={{ fontFamily: family, fontWeight: 400, fontSize: '2rem', lineHeight: 1.2 }}>
            {ALPHABET_LOWER}
          </p>
        </Block>

        <Block label="Numbers & punctuation">
          <p style={{ fontFamily: family, fontWeight: 400, fontSize: '1.75rem', lineHeight: 1.3 }}>
            {NUMBERS}
          </p>
        </Block>

        <Block label="Ligatures & symbols">
          <p style={{ fontFamily: family, fontWeight: 400, fontSize: '1.75rem', lineHeight: 1.3 }}>
            {LIGATURES}
          </p>
        </Block>

        <Block label="Sample paragraph">
          <p
            style={{
              fontFamily: family,
              fontWeight: 400,
              fontSize: '1.125rem',
              lineHeight: 1.6,
              maxWidth: '60ch',
            }}
          >
            {PARAGRAPH}
          </p>
        </Block>
      </section>
    </div>
  )
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">{label}</span>
      <div className="surface-soft px-4 py-3 overflow-x-auto">{children}</div>
    </div>
  )
}
