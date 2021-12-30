import React from 'react'
import { useStore } from '../store'
import { Box } from './box'
import { ColorDot } from './input'
import { Text } from './text'

const scales = [
  {
    wcag: 1.25,
    color: '#D8D8D8',
    apca: 15,
  },
  {
    wcag: 1.5,
    color: '#BBBBBB',
    apca: 30,
  },
  {
    wcag: 3,
    color: '#A0A0A0',
    apca: 45,
  },
  {
    wcag: 4.5,
    color: '#808080',
    apca: 60,
  },
  {
    wcag: 7,
    color: '#5F5F5F',
    apca: 75,
  },
  {
    wcag: 10,
    color: '#3A3A3A',
    apca: 90,
  },
  {
    wcag: 19,
    color: '#060606',
    apca: 100,
  },
]

function Comparison(props) {
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
            css={{ backgroundColor: '$gray100', height: '24px', width: '24px' }}
          />
        </Box>
        <Text css={{ textAlign: 'center' }}>APCA</Text>
      </Box>
      {scales.map(({ wcag, color, apca }, i) => (
        <Box
          alignItems="center"
          key={i}
          direction="horizontal"
          css={{ gridTemplateColumns: '1fr 24px 1fr', height: '24px' }}
        >
          {(currentWCAG >= wcag && currentWCAG < scales[i + 1]?.wcag) ||
          (currentWCAG >= scales[scales.length - 1].wcag &&
            i === scales.length - 1) ? (
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
          {(contrast >= apca && contrast < scales[i + 1]?.apca) ||
          (contrast >= scales[scales.length - 1].apca &&
            i === scales.length - 1) ? (
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
