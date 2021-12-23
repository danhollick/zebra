import React, { useEffect } from 'react'
import { Box } from './components/box'
import { Input } from './components/input'
import MainPanel from './components/mainPanel'

function App() {
  useEffect(() => {
    if (typeof parent !== undefined) {
      parent?.postMessage?.({ pluginMessage: 'hello' }, '*')
    }
  }, [])

  return (
    <Box className="App">
      <h1>Hello</h1>
      <Input />
      <button
        onClick={() => {
          parent?.postMessage?.({ pluginMessage: 'close' }, '*')
        }}
      >
        Close
      </button>
    </Box>
  )
}

export default App
