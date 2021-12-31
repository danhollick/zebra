import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { BarTabs, BarTabItem } from './BarTabGroup'
import { Box } from './Box'
import { Text } from './Text'
import { useStore } from '../lib/store'
import { TooltipWrapper } from './Tooltip'
import { apcaInfo } from '../data/apcaInfo'

function Info() {
  const contrast = useStore(state => state.contrast)
  const defaultTab = apcaInfo.filter(
    item => item.rangeMin <= contrast && contrast < item.rangeMax
  )
  // console.log(defaultTab[0].rangeMin, contrast)
  return (
    <Box justifyContent="center" css={{ px: '$2', py: '$4' }}>
      <TabsPrimitive.Root
        defaultValue={defaultTab[0]?.rangeMin || apcaInfo[0].rangeMin}
      >
        <BarTabs>
          {apcaInfo.map(({ rangeMin, rangeMax, color }, i) => (
            <TooltipWrapper key={i} content={`${rangeMin} - ${rangeMax}`}>
              {/* need to put a wrapper between the tooltip wrapper and the tab trigger -> otherwise active state isn't triggered */}
              <Box css={{ marginLeft: -1, '&:first-child': { marginLeft: 0 } }}>
                <BarTabItem
                  key={i}
                  css={{ backgroundColor: color }}
                  value={rangeMin}
                />
              </Box>
            </TooltipWrapper>
          ))}
        </BarTabs>
        {apcaInfo.map(({ rangeMin, rangeMax, heading, body }) => (
          <TabsPrimitive.TabsContent value={rangeMin}>
            <Box css={{ p: '$1', marginTop: '$3', marginRight: '$2' }}>
              <Box gap="xx-tight">
                <Text size="8" weight="bold">
                  {rangeMin} - {rangeMax}
                </Text>
                <Text size="5">{heading}</Text>
              </Box>
              <Text css={{ marginTop: '$2' }}>{body}</Text>
            </Box>
          </TabsPrimitive.TabsContent>
        ))}
      </TabsPrimitive.Root>
    </Box>
  )
}

export default Info
