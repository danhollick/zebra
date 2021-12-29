import React from 'react'
import { Text } from './text'
import { getFontRanges } from '../data/fontTable'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'
import { styled } from '../../stitches.config'

const Bar = styled('div', {
  height: '24px',
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
})

export const BarGraph = ({ weight, contrast }) => {
  const {
    minFontSize,
    minPercentage,
    preferredFontSize,
    preferredPercentage,
  } = getFontRanges({
    weight,
    contrast,
    fontRangeLowerLimit: 14,
    fontRangeUpperLimit: 96,
  })
  return (
    <Container>
      <Tooltip>
        <TooltipTrigger asChild>
          <Bar
            css={{
              width: `${minPercentage}%`,
              backgroundColor: '$red400',
              borderRight: '1px solid $gray900',
            }}
          />
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>14px - {minFontSize}px</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Bar
            css={{
              width: `${preferredPercentage - minPercentage}%`,
              backgroundColor: '$yellow300',
              borderRight: '1px solid $gray900',
            }}
          />
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          {minFontSize}px - {preferredFontSize}px
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Bar
            css={{
              width: `${100 - preferredPercentage}%`,
              backgroundColor: '$green300',
            }}
          >
            <Text css={{ marginLeft: '$1' }} size="1" weight="bold">
              {preferredFontSize < 96 && `${preferredFontSize}px`}
            </Text>
          </Bar>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={5}
        >{`> ${preferredFontSize}px`}</TooltipContent>
      </Tooltip>
    </Container>
  )
}
