import React, { useEffect } from 'react'
import { styled } from '../../stitches.config'
import { useStore } from '../store'
import { Box } from './box'
import { InputWithColor } from './input'
import { Text } from './text'

const OuterColor = styled('div', {
  height: '80px',
  width: '80px',
  borderRadius: '100%',
  border: '1px solid $gray900',
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'end',
  paddingRight: '4px',
})

const InnerColor = ({ color }) => (
  <svg
    width="36"
    height="72"
    viewBox="0 0 36 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 72C19.8823 72 36 55.8823 36 36C36 16.1177 19.8823 0 0 0V72Z"
      fill={`#${color}`}
    />
  </svg>
)

const Preview = ({ foregroundColor, backgroundColor }) => (
  <OuterColor css={{ backgroundColor: `#${backgroundColor}` }}>
    <InnerColor color={foregroundColor} />
  </OuterColor>
)

function MainPanel() {
  const backgroundColor = useStore(state => state.backgroundColor)
  const foregroundColor = useStore(state => state.foregroundColor)
  const contrast = useStore(state => state.contrast)
  const setContrast = useStore(state => state.setContrast)
  const changeBackground = useStore(state => state.changeBackground)
  const changeForeground = useStore(state => state.changeForeground)

  useEffect(() => {
    if (typeof parent !== undefined) {
      console.log('called ')

      parent?.postMessage?.(
        {
          pluginMessage: {
            type: 'getApcaContrast',
            foregroundColor,
            backgroundColor,
          },
        },
        '*'
      )
    }
  }, [backgroundColor, foregroundColor])

  useEffect(() => {
    window.onmessage = evt => {
      const message = evt.data?.pluginMessage
      if (message.type === 'apcaContrastCalculated') {
        setContrast(message.contrast)
      }
    }
  }, [])

  return (
    <Box justifyContent="center" css={{ p: '$2' }}>
      <Box
        css={{ gridTemplateColumns: '1fr auto 1fr' }}
        direction="horizontal"
        justifySelf="center"
        alignItems="center"
      >
        <InputWithColor
          position="background"
          value={backgroundColor}
          onChange={changeBackground}
        />
        <Preview
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
        />
        <InputWithColor
          position="foreground"
          value={foregroundColor}
          onChange={changeForeground}
        />
      </Box>
      <Box justifySelf="center">
        <Text size="8" weight="bold">
          {contrast}
        </Text>
      </Box>
    </Box>
  )
}

export default MainPanel
