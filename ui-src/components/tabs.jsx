import {
  ColumnSpacingIcon,
  FontStyleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { styled } from '../../stitches.config'
import { Box } from './Box'
import Scale from './Scale'
import Comparison from './Comparison'
import Info from './Info'
import { TooltipWrapper } from './Tooltip'

const tabs = [
  {
    name: 'Info',
    icon: <InfoCircledIcon />,
    slug: 'info',
    tooltip: 'APCA levels',
  },
  {
    name: 'Comparison',
    icon: <ColumnSpacingIcon />,
    slug: 'comparison',
    tooltip: 'Compare APCA and WCAG 2',
  },
  {
    name: 'Font Scale',
    icon: <FontStyleIcon />,
    slug: 'scale',
    tooltip: 'Min font sizes',
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
  // moved these styles to the Box below
  // '&:first-child': { borderRight: '1px solid $gray900' },
  // '&:last-child': { borderLeft: '1px solid $gray900' },
  '&[data-state="active"]': {
    backgroundColor: '$gray50',
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

function Tabs() {
  return (
    <Box css={{ border: '1px solid $gray900', borderTop: 'none' }}>
      <TabsPrimitive.Tabs defaultValue="info">
        <StyledTabList>
          {tabs.map(({ icon, tooltip, slug }, i) => (
            <TooltipWrapper key={i} content={tooltip}>
              {/* need to put a wrapper between the tooltip wrapper and the tab trigger -> otherwise active state isn't triggered */}
              <Box
                css={{
                  '&:first-child': { borderRight: '1px solid $gray900' },
                  '&:last-child': { borderLeft: '1px solid $gray900' },
                }}
              >
                <StyledTabTrigger tabIndex="0" value={slug}>
                  {React.cloneElement(icon)}
                </StyledTabTrigger>
              </Box>
            </TooltipWrapper>
          ))}
        </StyledTabList>
        <StyledTabContent tabindex="-1" value="scale">
          <Scale />
        </StyledTabContent>
        <StyledTabContent tabindex="-1" value="comparison">
          <Comparison />
        </StyledTabContent>
        <StyledTabContent tabindex="-1" value="info">
          <Info />
        </StyledTabContent>
      </TabsPrimitive.Tabs>
    </Box>
  )
}

export default Tabs
