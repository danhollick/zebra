import { styled } from '../../stitches.config'

export const Text = styled('span', {
  // Reset
  lineHeight: 'auto',
  margin: '0',
  fontWeight: 400,
  //   fontVariantNumeric: 'tabular-nums',
  display: 'block',
  variants: {
    size: {
      1: {
        fontSize: '$1',
      },
      2: {
        fontSize: '$2',
      },
      3: {
        fontSize: '$3',
      },
      4: {
        fontSize: '$4',
      },
      5: {
        fontSize: '$5',
      },
      6: {
        fontSize: '$6',
      },
      7: {
        fontSize: '$7',
      },
      8: {
        fontSize: '$8',
      },
      9: {
        fontSize: '$9',
      },
    },
    weight: {
      medium: { fontWeight: 500 },
      'semi-bold': { fontWeight: 600 },
      bold: { fontWeight: 700 },
      heavy: { fontWeight: 900 },
    },
    leading: {
      single: { lineHeight: '100%' },
      normal: { lineHeight: 'normal' },
      paragraph: { lineHeight: '140%' },
    },
    light: {
      true: {
        color: '$gray700',
      },
    },
    dark: {
      true: {
        color: '$gray900',
      },
    },
  },
  defaultVariants: {
    size: '3',
  },
})
