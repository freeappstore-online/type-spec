import { useState } from 'react'
import { getFont } from '../data/fonts'
import { useFontLoader } from '../hooks/useFontLoader'
import { FontPicker } from './FontPicker'
import { PARAGRAPH } from '../data/samples'

interface Props {
  initialA: string
  initialB: string
}

export function CompareView({ initialA, initialB }: Props) {
  const [a, setA] = useState(initialA)
  const [b, setB] = useState(initialB)
  const [text, setText] = useState(PARAGRAPH)
  const [size, setSize] = useState(20)

  useFontLoader([a, b])

  const aDef = getFont(a)
  const bDef = getFont(b)
  const aFamily = aDef ? `'${aDef.cssFamily}', serif` : 'serif'
  const bFamily = bDef ? `'${bDef.cssFamily}', sans-serif` : 'sans-serif'

  return (
    <div className="flex flex-col gap-5">
      <div className="surface p-4 flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            Test text
          </label>
          <textarea
            className="textarea mt-1"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="lg:w-48">
          <label className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            Size: {size}px
          </label>
          <input
            type="range"
            min={12}
            max={64}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full mt-3 accent-[var(--accent)]"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Pane
          title="Font A"
          label={aDef?.name ?? a}
          family={aFamily}
          size={size}
          text={text}
          font={a}
          onFontChange={setA}
        />
        <Pane
          title="Font B"
          label={bDef?.name ?? b}
          family={bFamily}
          size={size}
          text={text}
          font={b}
          onFontChange={setB}
        />
      </div>
    </div>
  )
}

function Pane({
  title,
  label,
  family,
  size,
  text,
  font,
  onFontChange,
}: {
  title: string
  label: string
  family: string
  size: number
  text: string
  font: string
  onFontChange: (name: string) => void
}) {
  const [picking, setPicking] = useState(false)
  return (
    <section className="surface p-5 flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">{title}</p>
          <h3 className="display-font text-2xl mt-0.5">{label}</h3>
        </div>
        <button type="button" className="btn" onClick={() => setPicking((v) => !v)}>
          {picking ? 'Done' : 'Change'}
        </button>
      </header>

      {picking ? (
        <FontPicker value={font} onChange={(n) => { onFontChange(n); setPicking(false) }} compact />
      ) : (
        <p
          style={{
            fontFamily: family,
            fontSize: `${size}px`,
            lineHeight: 1.55,
          }}
        >
          {text}
        </p>
      )}
    </section>
  )
}
