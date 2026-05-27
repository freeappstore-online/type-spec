import { useState } from 'react'
import { getFont } from '../data/fonts'
import { useFontLoader } from '../hooks/useFontLoader'
import { FontPicker } from './FontPicker'

interface ElementStyle {
  font: string
  size: number
  weight: number
  letterSpacing: number
  lineHeight: number
}

interface Props {
  initialHeading: string
  initialBody: string
}

export function PlaygroundView({ initialHeading, initialBody }: Props) {
  const [heading, setHeading] = useState<ElementStyle>({
    font: initialHeading,
    size: 48,
    weight: 700,
    letterSpacing: -2,
    lineHeight: 1.1,
  })
  const [body, setBody] = useState<ElementStyle>({
    font: initialBody,
    size: 17,
    weight: 400,
    letterSpacing: 0,
    lineHeight: 1.6,
  })
  const [headingText, setHeadingText] = useState('Designing with intention')
  const [bodyText, setBodyText] = useState(
    'Typography is the craft of endowing human language with a durable visual form. ' +
      'Every choice — typeface, size, leading, tracking — shapes how the reader feels the text.',
  )
  const [editing, setEditing] = useState<'heading' | 'body'>('heading')

  useFontLoader([heading.font, body.font])

  const target = editing === 'heading' ? heading : body
  const setTarget = editing === 'heading' ? setHeading : setBody

  const headingDef = getFont(heading.font)
  const bodyDef = getFont(body.font)
  const headingFamily = headingDef ? `'${headingDef.cssFamily}', serif` : 'serif'
  const bodyFamily = bodyDef ? `'${bodyDef.cssFamily}', sans-serif` : 'sans-serif'

  const targetDef = editing === 'heading' ? headingDef : bodyDef
  const availableWeights = targetDef?.weights ?? [400, 700]

  return (
    <div className="grid gap-5 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <aside className="surface p-4 flex flex-col gap-4">
        <div className="flex gap-1.5">
          <button
            type="button"
            className={`chip ${editing === 'heading' ? 'chip-active' : ''}`}
            onClick={() => setEditing('heading')}
          >
            Heading
          </button>
          <button
            type="button"
            className={`chip ${editing === 'body' ? 'chip-active' : ''}`}
            onClick={() => setEditing('body')}
          >
            Body
          </button>
        </div>

        <FontPicker
          value={target.font}
          onChange={(name) => setTarget({ ...target, font: name })}
          compact
        />

        <Slider
          label="Size"
          unit="px"
          min={editing === 'heading' ? 20 : 10}
          max={editing === 'heading' ? 120 : 36}
          step={1}
          value={target.size}
          onChange={(v) => setTarget({ ...target, size: v })}
        />

        <div className="flex flex-col gap-1">
          <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            Weight
          </span>
          <select
            className="select"
            value={target.weight}
            onChange={(e) => setTarget({ ...target, weight: Number(e.target.value) })}
          >
            {availableWeights.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <Slider
          label="Letter spacing"
          unit="px"
          min={-5}
          max={10}
          step={0.5}
          value={target.letterSpacing}
          onChange={(v) => setTarget({ ...target, letterSpacing: v })}
        />

        <Slider
          label="Line height"
          unit=""
          min={0.9}
          max={2.2}
          step={0.05}
          value={target.lineHeight}
          onChange={(v) => setTarget({ ...target, lineHeight: v })}
        />
      </aside>

      <section className="surface p-6 flex flex-col gap-6">
        <div className="surface-soft p-5">
          <input
            type="text"
            value={headingText}
            onChange={(e) => setHeadingText(e.target.value)}
            className="w-full bg-transparent outline-none border-0"
            style={{
              fontFamily: headingFamily,
              fontSize: `${heading.size}px`,
              fontWeight: heading.weight,
              letterSpacing: `${heading.letterSpacing / 100}em`,
              lineHeight: heading.lineHeight,
              color: 'var(--ink)',
            }}
            onFocus={() => setEditing('heading')}
          />
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            rows={4}
            className="w-full bg-transparent outline-none border-0 mt-4 resize-y"
            style={{
              fontFamily: bodyFamily,
              fontSize: `${body.size}px`,
              fontWeight: body.weight,
              letterSpacing: `${body.letterSpacing / 100}em`,
              lineHeight: body.lineHeight,
              color: 'var(--ink)',
            }}
            onFocus={() => setEditing('body')}
          />
        </div>

        <SummaryCard heading={heading} body={body} headingDef={headingDef} bodyDef={bodyDef} />
      </section>
    </div>
  )
}

function Slider({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string
  unit: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
        <span>{label}</span>
        <span className="tabular-nums text-[var(--ink)]">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </div>
  )
}

function SummaryCard({
  heading,
  body,
  headingDef,
  bodyDef,
}: {
  heading: ElementStyle
  body: ElementStyle
  headingDef: ReturnType<typeof getFont>
  bodyDef: ReturnType<typeof getFont>
}) {
  return (
    <div className="surface-soft p-4 text-xs text-[var(--muted)] grid gap-1 sm:grid-cols-2">
      <div>
        <p className="font-semibold text-[var(--ink)]">Heading</p>
        <p>
          {headingDef?.name ?? heading.font} · {heading.weight} · {heading.size}px ·{' '}
          tracking {heading.letterSpacing / 100}em · lh {heading.lineHeight}
        </p>
      </div>
      <div>
        <p className="font-semibold text-[var(--ink)]">Body</p>
        <p>
          {bodyDef?.name ?? body.font} · {body.weight} · {body.size}px ·{' '}
          tracking {body.letterSpacing / 100}em · lh {body.lineHeight}
        </p>
      </div>
    </div>
  )
}
