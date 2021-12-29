import {
  CaretSortIcon,
  CircleIcon,
  Half2Icon,
  UpdateIcon,
} from '@radix-ui/react-icons'
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
  const sentiment = useStore(state => state.sentiment)
  const setContrast = useStore(state => state.setContrast)
  const swapColors = useStore(state => state.swapColors)
  const toggleExpand = useStore(state => state.toggleExpand)
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
    // console.log(window)
    window.onmessage = evt => {
      const message = evt.data?.pluginMessage
      if (message.type === 'apcaContrastCalculated') {
        setContrast(message.contrast)
      }
    }
  }, [])

  return (
    <Box
      justifyContent="center"
      css={{
        p: '$2',
        border: '1px solid $gray900',
        position: 'relative',
        height: '192px',
      }}
    >
      <Box
        css={{ gridTemplateColumns: '1fr auto 1fr', paddingTop: '$1' }}
        direction="horizontal"
        justifySelf="center"
        alignItems="center"
      >
        <Box justifyItems="center" gap="x-tight" css={{ marginBottom: '$2' }}>
          <CircleIcon />
          <InputWithColor
            position="background"
            value={backgroundColor}
            onChange={changeBackground}
          />
        </Box>
        <Preview
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
        />
        <Box justifyItems="center" gap="x-tight" css={{ marginBottom: '$2' }}>
          <Half2Icon />
          <InputWithColor
            position="foreground"
            value={foregroundColor}
            onChange={changeForeground}
          />
        </Box>
      </Box>
      <Box justifySelf="center" gap="none" justifyItems="center">
        <Text css={{ lineHeight: '100%' }} size="8" weight="bold">
          {Math.round(contrast)}
        </Text>
        {/* <Text size="2" light>
          {sentiment}
        </Text> */}
      </Box>
      <Box
        onClick={toggleExpand}
        css={{ position: 'absolute', right: '16px', bottom: '16px' }}
      >
        <CaretSortIcon />
      </Box>
      <Box
        onClick={swapColors}
        css={{ position: 'absolute', left: '16px', bottom: '16px' }}
      >
        <UpdateIcon />
      </Box>
    </Box>
  )
}

export default MainPanel
