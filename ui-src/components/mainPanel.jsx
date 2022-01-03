import {
  CaretSortIcon,
  CircleIcon,
  CursorArrowIcon,
  Half2Icon,
  UpdateIcon,
} from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { useStore } from '../lib/store'
import { Box } from './Box'
import { ContrastPreview } from './ContrastPreview'
import { InputWithColor } from './Input'
import { Text } from './Text'
import { TooltipWrapper } from './Tooltip'

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
  const setSelectionColor = useStore(state => state.setSelectionColor)
  const setSelectionMode = useStore(state => state.setSelectionMode)
  const selectionMode = useStore(state => state.selectionMode)

  useEffect(() => {
    if (typeof parent !== undefined) {
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
    if (typeof parent !== undefined) {
      parent?.postMessage?.(
        {
          pluginMessage: {
            type: 'selectionModeChange',
            selectionMode,
          },
        },
        '*'
      )
    }
  }, [selectionMode])

  useEffect(() => {
    window.onmessage = evt => {
      const message = evt.data?.pluginMessage
      if (message.type === 'apcaContrastCalculated') {
        setContrast(message.contrast)
      }
      if (message.type === 'selectionChange') {
        setSelectionColor(message.selectionColor)
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
          <Box onClick={() => setSelectionMode('background')}>
            {selectionMode === 'background' ? (
              <TooltipWrapper content="Toggle off background selection">
                <CursorArrowIcon />
              </TooltipWrapper>
            ) : (
              <TooltipWrapper content="Background">
                <CircleIcon />
              </TooltipWrapper>
            )}
          </Box>
          <InputWithColor
            position="background"
            value={backgroundColor}
            onChange={changeBackground}
          />
        </Box>
        <ContrastPreview
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
        />
        <Box justifyItems="center" gap="x-tight" css={{ marginBottom: '$2' }}>
          <Box onClick={() => setSelectionMode('foreground')}>
            {selectionMode === 'foreground' ? (
              <TooltipWrapper content="Toggle off foreground selection">
                <CursorArrowIcon />
              </TooltipWrapper>
            ) : (
              <TooltipWrapper content="Foreground">
                <Half2Icon />
              </TooltipWrapper>
            )}
          </Box>
          <InputWithColor
            position="foreground"
            value={foregroundColor}
            onChange={changeForeground}
          />
        </Box>
      </Box>
      <Box justifySelf="center" gap="none" justifyItems="center">
        <TooltipWrapper content={sentiment}>
          <Text css={{ lineHeight: '100%' }} size="8" weight="bold">
            {contrast}
          </Text>
        </TooltipWrapper>
        {/* <Text size="2" light>
          {sentiment}
        </Text> */}
      </Box>
      <Box
        onClick={toggleExpand}
        css={{ position: 'absolute', right: '16px', bottom: '16px' }}
      >
        <TooltipWrapper content="Expand/Collapse UI">
          <CaretSortIcon />
        </TooltipWrapper>
      </Box>

      <Box
        onClick={swapColors}
        css={{ position: 'absolute', left: '16px', bottom: '16px' }}
      >
        <TooltipWrapper content="Swap foreground and background">
          <UpdateIcon />
        </TooltipWrapper>
      </Box>
    </Box>
  )
}

export default MainPanel
