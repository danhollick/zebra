import React from 'react'
import { Text } from './Text'
import { getFontRanges } from '../lib/getFontScales'
import { TooltipWrapper } from './Tooltip'
import { styled } from '../../stitches.config'

const Bar = styled('div', {
  height: '100%',
  display: 'grid',
  alignItems: 'center',
  '&:hover': {
    opacity: 0.8,
  },
})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  border: '1px solid $gray900',
  width: '100%',
  height: '$3',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

export const BarGraph = ({ weight, contrast }) => {
  const bars = getFontRanges({
    weight,
    contrast,
    fontRangeLowerLimit: 12,
    fontRangeUpperLimit: 96,
  })

  return (
    <Container>
      {bars.map(({ isVisible, min, max, color, width, type }, i) => (
        <>
          {isVisible && (
            <TooltipWrapper content={`${min}px - ${max}px`}>
              <Bar
                css={{
                  width,
                  backgroundColor: color,
                  borderRight:
                    i < bars.length - 1 ? '1px solid $gray900' : 'none',
                }}
              >
                {type === 'preferred' && (
                  <Text css={{ marginLeft: '$1' }} size="1" weight="bold">
                    {min}px
                  </Text>
                )}
              </Bar>
            </TooltipWrapper>
          )}
        </>
      ))}
    </Container>
  )
}
