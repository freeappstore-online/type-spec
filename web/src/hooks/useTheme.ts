import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'type-spec:theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const v = localStorage.getItem(KEY)
      return v === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.dataset['theme'] = 'dark'
    } else {
      delete document.documentElement.dataset['theme']
    }
    try { localStorage.setItem(KEY, theme) } catch { /* noop */ }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
