import React from 'react'
import { styled } from '../../stitches.config'

const OuterColor = styled('div', {
  height: '80px',
  width: '80px',
  borderRadius: '100%',
  border: '1px solid $gray900',
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'end',
  paddingRight: '4px',
})

const InnerColor = ({ color }) => (
  <svg
    width="36"
    height="72"
    viewBox="0 0 36 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 72C19.8823 72 36 55.8823 36 36C36 16.1177 19.8823 0 0 0V72Z"
      fill={`#${color}`}
    />
  </svg>
)

export const ContrastPreview = ({ foregroundColor, backgroundColor }) => (
  <OuterColor css={{ backgroundColor: `#${backgroundColor}` }}>
    <InnerColor color={foregroundColor} />
  </OuterColor>
)
