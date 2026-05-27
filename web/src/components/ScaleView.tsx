import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { getFont } from '../data/fonts'
import { useFontLoader } from '../hooks/useFontLoader'
import {
  BASE_SIZES,
  SCALE_RATIOS,
  SCALE_STEPS,
  sizeForStep,
  type ScaleRatio,
} from '../data/scales'
import { FontPicker } from './FontPicker'

interface Props {
  font: string
  onFontChange: (name: string) => void
}

const SAMPLE_FOR_STEP: Record<number, string> = {
  '-2': 'Caption — small print and metadata.',
  '-1': 'Secondary body — sidebars, footnotes.',
  '0': 'Body text — the foundation of any reading experience.',
  '1': 'Lead — slightly elevated paragraph.',
  '2': 'Subheading — section openers.',
  '3': 'Heading — chapter titles, prominent UI.',
  '4': 'Display — hero blocks and feature openers.',
  '5': 'Hero — the loudest voice on the page.',
}

function buildCss(font: string, base: number, ratio: ScaleRatio): string {
  const def = getFont(font)
  const family = def ? `'${def.cssFamily}', system-ui, sans-serif` : 'system-ui, sans-serif'
  const lines: string[] = [':root {']
  lines.push(`  --type-scale-ratio: ${ratio.value};`)
  for (const s of SCALE_STEPS) {
    const size = sizeForStep(base, ratio.value, s.step)
    lines.push(`  ${s.cssVar}: ${size}px;`)
  }
  lines.push('}')
  lines.push('')
  lines.push(`body {`)
  lines.push(`  font-family: ${family};`)
  lines.push(`  font-size: var(--fs-base);`)
  lines.push(`  line-height: 1.55;`)
  lines.push(`}`)
  for (const s of SCALE_STEPS) {
    if (s.step <= 0) continue
    lines.push('')
    lines.push(`.text-${s.label} { font-size: var(${s.cssVar}); }`)
  }
  return lines.join('\n')
}

export function ScaleView({ font, onFontChange }: Props) {
  const [base, setBase] = useState<number>(16)
  const [ratioId, setRatioId] = useState<string>('major-third')
  const ratio = useMemo(
    () => SCALE_RATIOS.find((r) => r.id === ratioId) ?? SCALE_RATIOS[1]!,
    [ratioId],
  )

  useFontLoader([font])
  const def = getFont(font)
  const family = def ? `'${def.cssFamily}', system-ui, sans-serif` : 'system-ui, sans-serif'

  const css = useMemo(() => buildCss(font, base, ratio), [font, base, ratio])
  const [copied, setCopied] = useState(false)

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch { /* noop */ }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <aside className="surface p-4 flex flex-col gap-4">
        <div>
          <h2 className="display-font text-xl mb-3">Font</h2>
          <FontPicker value={font} onChange={onFontChange} compact />
        </div>

        <Group label="Base size">
          <div className="flex gap-1.5">
            {BASE_SIZES.map((b) => (
              <button
                key={b}
                type="button"
                className={`chip ${base === b ? 'chip-active' : ''}`}
                onClick={() => setBase(b)}
              >
                {b}px
              </button>
            ))}
          </div>
        </Group>

        <Group label="Scale ratio">
          <select
            className="select"
            value={ratio.id}
            onChange={(e) => setRatioId(e.target.value)}
          >
            {SCALE_RATIOS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} ({r.value})
              </option>
            ))}
          </select>
        </Group>

        <Group label="Generated CSS">
          <pre
            className="surface-soft text-[0.7rem] leading-relaxed overflow-x-auto p-3 max-h-72"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
{css}
          </pre>
          <button type="button" className="btn-primary btn mt-2 w-full" onClick={copyCss}>
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </Group>
      </aside>

      <section className="surface p-6 flex flex-col gap-6">
        <header>
          <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            {ratio.label} · base {base}px · ratio {ratio.value}
          </p>
          <h1 className="display-font text-3xl mt-1">Type scale</h1>
        </header>

        <ol className="flex flex-col gap-4">
          {SCALE_STEPS.map((s) => {
            const size = sizeForStep(base, ratio.value, s.step)
            const sample = SAMPLE_FOR_STEP[s.step] ?? 'Sample text at this step.'
            return (
              <li
                key={s.step}
                className="grid items-baseline gap-3 sm:grid-cols-[5.5rem_4.5rem_minmax(0,1fr)]"
              >
                <span className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] tabular-nums">
                  {s.label} · {s.step >= 0 ? `+${s.step}` : s.step}
                </span>
                <span className="text-[0.7rem] text-[var(--muted)] tabular-nums">{size}px</span>
                <span
                  style={{
                    fontFamily: family,
                    fontSize: `${size}px`,
                    lineHeight: s.step >= 3 ? 1.1 : 1.45,
                    fontWeight: s.step >= 3 ? 700 : 400,
                  }}
                >
                  {sample}
                </span>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">{label}</span>
      {children}
    </div>
  )
}
