import React from 'react'
import { useStore } from '../store'
import { Box } from './Box'
import { comparision } from '../data/comparision'
import { ColorDot } from './Input'
import { Text } from './Text'

function Comparison() {
  const contrast = useStore(state => state.contrast)
  const currentWCAG = useStore(state => state.wcag)

  return (
    <Box
      css={{ py: '$4', px: '$4', userSelect: 'none', height: '100%' }}
      gap="tight"
    >
      <Box direction="horizontal" css={{ gridTemplateColumns: '1fr 24px 1fr' }}>
        <Text css={{ textAlign: 'center' }}>WCAG 2 </Text>
        <Box justifySelf="center">
          <ColorDot
            css={{
              backgroundColor: '$contrast0',
              height: '24px',
              width: '24px',
            }}
          />
        </Box>
        <Text css={{ textAlign: 'center' }}>APCA</Text>
      </Box>
      {comparision.map(({ wcag, color, apca }, i) => (
        <Box
          alignItems="center"
          key={i}
          direction="horizontal"
          css={{ gridTemplateColumns: '1fr 24px 1fr', height: '24px' }}
        >
          {(currentWCAG >= wcag && currentWCAG < comparision[i + 1]?.wcag) ||
          (currentWCAG >= comparision[comparision.length - 1].wcag &&
            i === comparision.length - 1) ? (
            <Text
              size="7"
              weight="bold"
              css={{ textAlign: 'center', lineHeight: '24px' }}
            >
              {currentWCAG}
            </Text>
          ) : (
            <Text light css={{ textAlign: 'center' }}>
              {wcag}
            </Text>
          )}
          <Box justifySelf="center">
            <ColorDot
              css={{ backgroundColor: color, height: '24px', width: '24px' }}
            />
          </Box>
          {(contrast >= apca && contrast < comparision[i + 1]?.apca) ||
          (contrast >= comparision[comparision.length - 1].apca &&
            i === comparision.length - 1) ? (
            <Text
              size="7"
              weight="bold"
              css={{ textAlign: 'center', lineHeight: '24px' }}
            >
              {contrast}
            </Text>
          ) : (
            <Text light css={{ textAlign: 'center' }}>
              {apca}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Comparison
