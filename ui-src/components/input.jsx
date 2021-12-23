import React, { useState } from 'react'
import { styled } from '@stitches/react'

const StyledInput = styled('input', {
  all: 'unset',
  height: '$4',
  paddingLeft: '$1',
  borderRadius: '$1',
  outline: '1px solid $gray200',
  fontSize: '$2',
  color: '$gray900',
  '&:placeholder': {
    color: '$gray700',
  },
  '&:focus': {
    outline: '1px solid $gray700',
  },
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
