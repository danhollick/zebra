import React, { useState } from 'react'
import { styled } from '@stitches/react'
import { Box } from './box'
import { useStore } from '../store'

const StyledInput = styled('input', {
  all: 'unset',
  fontSize: '$3',
  width: '6ch',
  // textAlign: 'center',
})

export const Input = ({
  value,
  type = 'text',
  name,
  placeholder,
  onChange,
}) => (
  <StyledInput
    onChange={onChange}
    name={name}
    value={value}
    type={type}
    placeholder={placeholder}
  />
)

const ColorDot = styled('div', {
  height: '20px',
  width: '20px',
  borderRadius: '100%',
  border: '1px solid $gray900',
})

export const InputWithColor = ({
  position = 'foreground',
  value,
  onChange,
}) => (
  <Box
    alignItems="center"
    direction="horizontal"
    gap="none"
    css={{
      px: '$1',
      height: '$4',
      width: '125px',
      backgroundColor: 'white',
      border: '1px solid $gray900',
      borderRadius: '$1',
    }}
  >
    {position === 'foreground' && (
      <ColorDot css={{ backgroundColor: `#${value}` }} />
    )}
    <Box justifySelf="center" gap="none" direction="horizontal">
      <p>#</p>
      <Input value={value} onChange={onChange} />
    </Box>
    {position === 'background' && (
      <ColorDot css={{ backgroundColor: `#${value}` }} />
    )}
  </Box>
)
