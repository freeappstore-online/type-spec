import type { ReactNode } from 'react'
import type { Theme } from '../hooks/useTheme'
import { VIEWS, type ViewKey } from '../types'

interface ShellProps {
  children: ReactNode
  view: ViewKey
  onViewChange: (v: ViewKey) => void
  theme: Theme
  onToggleTheme: () => void
}

export function Shell({ children, view, onViewChange, theme, onToggleTheme }: ShellProps) {
  return (
    <div className="relative min-h-[100dvh]">
      <div className="mx-auto max-w-[1540px] px-3 pt-4 pb-10 sm:px-5 lg:px-8 lg:py-8">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="grid place-items-center rounded-xl"
              style={{
                width: 36,
                height: 36,
                background: 'var(--accent)',
                color: 'white',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              T
            </div>
            <div className="flex flex-col leading-tight">
              <span className="display-font text-xl">Type Spec</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                Specimen · scale · pairings
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? '☀︎ Light' : '☾ Dark'}
          </button>
        </header>

        {/* Tabs */}
        <nav
          className="surface flex gap-1 overflow-x-auto p-1 mb-5"
          aria-label="Views"
        >
          {VIEWS.map((v) => {
            const active = v.key === view
            return (
              <button
                key={v.key}
                type="button"
                onClick={() => onViewChange(v.key)}
                className={`flex-shrink-0 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap ${
                  active
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--ink)] hover:bg-[var(--glass-strong)]'
                }`}
                aria-pressed={active}
                title={v.hint}
              >
                {v.label}
              </button>
            )
          })}
        </nav>

        <main>{children}</main>

        <footer className="mt-10 text-center text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
          Free · MIT · part of FreeAppStore
        </footer>
      </div>
    </div>
  )
}
