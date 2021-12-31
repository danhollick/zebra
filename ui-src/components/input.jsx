import React, { useState } from 'react'
import { styled } from '@stitches/react'
import { HexColorPicker } from 'react-colorful'
import { Box } from './Box'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { useStore } from '../lib/store'

const StyledInput = styled('input', {
  all: 'unset',
  fontSize: '$3',
  width: '7ch',
  textTransform: 'uppercase',
  textAlign: 'center',
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

export const ColorDot = styled('div', {
  height: '20px',
  width: '20px',
  borderRadius: '100%',
  border: '1px solid $gray900',
})

const ColorDotWithPicker = ({ color, onChange, position }) => {
  const toggleExpand = useStore(state => state.toggleExpand)
  const expanded = useStore(state => state.expanded)

  const onOpenChange = () => {
    if (!expanded) {
      toggleExpand()
    }
  }

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <ColorDot css={{ backgroundColor: `#${color}` }} />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={6}
        avoidCollisions={false}
        align={position === 'foreground' ? 'start' : 'end'}
        alignOffset={-30}
        css={{
          '.react-colorful': {
            width: '160px',
            height: '160px',
            borderRadius: '0px',
          },
          '.react-colorful__pointer': {
            border: '1px solid $gray900',
            width: '20px',
            height: '20px',
          },
          '.react-colorful__saturation': {
            borderRadius: '0px',
          },
          '.react-colorful__hue': {
            borderRadius: '0px',
          },
        }}
      >
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}

export const InputWithColor = ({
  position = 'foreground',
  value,
  onChange,
}) => {
  const changeBGFromPicker = useStore(state => state.changeBackgroundFromPicker)
  const changeFGFromPicker = useStore(state => state.changeForegroundFromPicker)
  return (
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
        <ColorDotWithPicker
          color={value}
          onChange={changeFGFromPicker}
          position={position}
        />
      )}
      <Box justifySelf="center" gap="none" direction="horizontal">
        <Input value={value} onChange={onChange} />
      </Box>

      {position === 'background' && (
        <ColorDotWithPicker
          color={value}
          onChange={changeBGFromPicker}
          position={position}
        />
      )}
    </Box>
  )
}
