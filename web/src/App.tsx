import { useState } from 'react'
import { Shell } from './components/Shell'
import { SpecimenView } from './components/SpecimenView'
import { ScaleView } from './components/ScaleView'
import { PairingsView } from './components/PairingsView'
import { PlaygroundView } from './components/PlaygroundView'
import { CompareView } from './components/CompareView'
import { WeightsView } from './components/WeightsView'
import { TextPlaygroundView } from './components/TextPlaygroundView'
import { FavoritesView } from './components/FavoritesView'
import { useTheme } from './hooks/useTheme'
import { useFavorites } from './hooks/useFavorites'
import type { ViewKey } from './types'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { favFonts, favPairings, toggleFont, togglePairing } = useFavorites()

  const [view, setView] = useState<ViewKey>('specimen')
  const [focusFont, setFocusFont] = useState('Fraunces')
  const [compareA, setCompareA] = useState('Fraunces')
  const [compareB, setCompareB] = useState('Manrope')
  const [playgroundHeading, setPlaygroundHeading] = useState('Fraunces')
  const [playgroundBody, setPlaygroundBody] = useState('Manrope')

  // Bumped to re-mount the Playground when a new pairing is picked, so
  // its internal state picks up the new initial fonts.
  const [playgroundKey, setPlaygroundKey] = useState(0)

  const handlePickPair = (heading: string, body: string) => {
    setPlaygroundHeading(heading)
    setPlaygroundBody(body)
    setPlaygroundKey((k) => k + 1)
    setView('playground')
  }

  const handleOpenFont = (name: string) => {
    setFocusFont(name)
    setView('specimen')
  }

  return (
    <Shell view={view} onViewChange={setView} theme={theme} onToggleTheme={toggleTheme}>
      {view === 'specimen' && (
        <SpecimenView
          font={focusFont}
          onFontChange={setFocusFont}
          favFonts={favFonts}
          onToggleFavorite={toggleFont}
        />
      )}

      {view === 'scale' && (
        <ScaleView font={focusFont} onFontChange={setFocusFont} />
      )}

      {view === 'pairings' && (
        <PairingsView
          favPairings={favPairings}
          onToggleFavorite={togglePairing}
          onPickPair={handlePickPair}
        />
      )}

      {view === 'playground' && (
        <PlaygroundView
          key={playgroundKey}
          initialHeading={playgroundHeading}
          initialBody={playgroundBody}
        />
      )}

      {view === 'compare' && (
        <CompareView initialA={compareA} initialB={compareB} />
      )}

      {view === 'weights' && (
        <WeightsView font={focusFont} onFontChange={setFocusFont} />
      )}

      {view === 'text' && (
        <TextPlaygroundView font={focusFont} onFontChange={setFocusFont} />
      )}

      {view === 'favorites' && (
        <FavoritesView
          favFonts={favFonts}
          favPairings={favPairings}
          onToggleFont={toggleFont}
          onTogglePairing={togglePairing}
          onOpenFont={handleOpenFont}
          onOpenPairing={(h, b) => {
            setCompareA(h)
            setCompareB(b)
            handlePickPair(h, b)
          }}
        />
      )}
    </Shell>
  )
}
