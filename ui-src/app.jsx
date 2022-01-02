import React, { useEffect } from 'react'
import { Box } from './components/Box'
import MainPanel from './components/MainPanel'
import { globalCss } from '../stitches.config'
import { useStore } from './lib/store'
import Tabs from './components/Tabs'
import { Provider } from './components/Tooltip'

function App() {
  const expanded = useStore(state => state.expanded)
  useEffect(() => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.(
        {
          pluginMessage: {
            type: 'toggleExpand',
            expanded,
          },
        },
        '*'
      )
    }
  }, [expanded])

  const globalStyles = globalCss({
    '*': {
      margin: 0,
      padding: 0,
      fontFamily: 'Inter, sans-serif',
      boxSizing: 'border-box',
    },
    body: {
      margin: 0,
      padding: 0,
      background: '$gray100',
      // border: '2px solid $gray900',
      // height: '100vh',
      // overflow: 'none',
    },
  })

  globalStyles()

  return (
    <Provider>
      <Box className="App" gap="none" css={{ border: '1px solid $gray900' }}>
        <MainPanel />
        {expanded && <Tabs />}
      </Box>
    </Provider>
  )
}

export default App
