import React from 'react'
import { styled } from '@stitches/react'

import * as TabsPrimitive from '@radix-ui/react-tabs'

export const BarTabs = styled(TabsPrimitive.TabsList, {
  display: 'grid',
  alignItems: 'center',
  gridAutoFlow: 'column',
  justifyContent: 'center',
})

export const BarTabItem = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  height: '16px',
  width: '40px',
  border: '1px solid $gray900',
  '&:hover': { opacity: 0.9 },
  '&[data-state="active"]': {
    height: '24px',
    width: '231px',
    zIndex: '99',
  },
})
