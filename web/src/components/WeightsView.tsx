import { getFont } from '../data/fonts'
import { useFontLoader } from '../hooks/useFontLoader'
import { FontPicker } from './FontPicker'

interface Props {
  font: string
  onFontChange: (name: string) => void
}

const WEIGHT_LABEL: Record<number, string> = {
  100: 'Thin',
  200: 'Extra light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
  800: 'Extra bold',
  900: 'Black',
}

export function WeightsView({ font, onFontChange }: Props) {
  const def = getFont(font)
  useFontLoader([font])
  const family = def ? `'${def.cssFamily}', system-ui, sans-serif` : 'system-ui, sans-serif'

  return (
    <div className="grid gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <aside className="surface p-4">
        <h2 className="display-font text-xl mb-3">Font</h2>
        <FontPicker value={font} onChange={onFontChange} compact />
      </aside>

      <section className="surface p-6 flex flex-col gap-5">
        <header>
          <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            All weights
          </p>
          <h1
            className="text-3xl mt-1"
            style={{ fontFamily: family, fontWeight: 700 }}
          >
            {def?.name ?? font}
          </h1>
        </header>

        <ol className="flex flex-col gap-3">
          {(def?.weights ?? []).map((w) => (
            <li
              key={w}
              className="surface-soft px-4 py-3 grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)]"
            >
              <span className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] tabular-nums">
                {w} · {WEIGHT_LABEL[w] ?? '—'}
              </span>
              <span
                style={{
                  fontFamily: family,
                  fontWeight: w,
                  fontSize: '1.75rem',
                  lineHeight: 1.2,
                }}
              >
                Words shape the way we think.
              </span>
            </li>
          ))}
          {(!def || def.weights.length === 0) && (
            <li className="text-xs text-[var(--muted)]">No weight data available for this font.</li>
          )}
        </ol>
      </section>
    </div>
  )
}
