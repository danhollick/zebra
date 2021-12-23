import React, { useEffect } from 'react'
import { Box } from './components/box'
import { Input, InputWithColor } from './components/input'
import MainPanel from './components/mainPanel'
import { globalCss } from '../stitches.config'

function App() {
  useEffect(() => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: 'hello' }, '*')
    }
  }, [])

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
      border: '2px solid $gray900',
    },
  })

  globalStyles()

  return (
    <Box className="App">
      <MainPanel />
      {/* <button
        onClick={() => {
          parent?.postMessage?.({ pluginMessage: 'close' }, '*')
        }}
      >
        Close
      </button> */}
    </Box>
  )
}

export default App
