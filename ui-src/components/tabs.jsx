import {
  BarChartIcon,
  ColumnSpacingIcon,
  LetterCaseCapitalizeIcon,
} from '@radix-ui/react-icons'
import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { styled } from '../../stitches.config'
import { Box } from './box'
import Scale from './scale'

const tabs = [
  {
    name: 'Font Scale',
    icon: <BarChartIcon />,
    slug: 'scale',
  },
  {
    name: 'Comparison',
    icon: <ColumnSpacingIcon />,
    slug: 'comparison',
  },
  {
    name: 'Chart',
    icon: <LetterCaseCapitalizeIcon />,
    slug: 'chart',
  },
]

const StyledTabTrigger = styled(TabsPrimitive.Trigger, {
  unset: 'all',
  outline: 'none',
  border: '1px solid transparent',
  width: '100%',
  borderBottom: '1px solid $gray900',
  padding: '$2',
  alignItems: 'center',
  justifyItems: 'center',
  display: 'grid',
  backgroundColor: '$gray200',
  userSelect: 'none',
  '&:first-child': { borderRight: '1px solid $gray900' },
  '&:last-child': { borderLeft: '1px solid $gray900' },
  '&[data-state="active"]': {
    backgroundColor: '$gray50',
    // border: '1px inset $gray900',
  },
  '&:focus': { backgroundColor: 'white' },
})

const StyledTabList = styled(TabsPrimitive.TabsList, {
  display: 'grid',
  gridAutoFlow: 'column',
})

const StyledTabContent = styled(TabsPrimitive.TabsContent, {
  height: '379px',
})

function Tabs(props) {
  return (
    <Box css={{ border: '1px solid $gray900', borderTop: 'none' }}>
      <TabsPrimitive.Tabs defaultValue="scale">
        <StyledTabList>
          {tabs.map((tab, i) => (
            <StyledTabTrigger key={i} tabIndex="0" value={tab.slug}>
              {React.cloneElement(tab.icon)}
            </StyledTabTrigger>
          ))}
        </StyledTabList>
        <StyledTabContent tabindex="-1" value="scale">
          <Scale />
        </StyledTabContent>
        <StyledTabContent tabindex="-1" value="comparison">
          Comparison
        </StyledTabContent>
        <StyledTabContent tabindex="-1" value="chart">
          Chart
        </StyledTabContent>
      </TabsPrimitive.Tabs>
    </Box>
  )
}

export default Tabs
