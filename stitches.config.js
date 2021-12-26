import React from 'react'
import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      white: '#ffffff',
      gray50: '#fafafa',
      gray100: '#f4f4f5',
      gray200: '#e4e4e7',
      gray300: '#d4d4d8',
      gray400: '#a1a1aa',
      gray500: '#71717a',
      gray600: '#52525b',
      gray700: '#3f3f46',
      gray800: '#27272a',
      gray900: '#18181b',
      black: '#000000',

      // red
      red0: '#fcf3f3',
      red50: '#fcdede',
      red100: '#fcc9c9',
      red200: '#fca1a1',
      red300: '#fc7e7e',
      red400: '#fc6060',
      red500: '#fa4848',
      red600: '#f83636',
      red700: '#f32828',
      red900: '#d81616',
      red1000: '#bf1111',
      // green
      green0: '#F3FCF8',
      green50: '#DDFCEC',
      green100: '#C8FBE1',
      green200: '#9FF8CB',
      green300: '#7AF4B7',
      green400: '#5BEEA4',
      green500: '#42E694',
      green600: '#30DB86',
      green700: '#22CE78',
      green800: '#18BE6B',
      green900: '#12AC5F',
      green1000: '#0E9953',
    },
    space: {
      0: '4px',
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      11: '88px',
      12: '96px',
      13: '104px',
      14: '112px',
      15: '120px',
    },
    sizes: {
      0: '4px',
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      11: '88px',
      12: '96px',
      13: '104px',
      14: '112px',
      15: '120px',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '20px',
      6: '24px',
      7: '32px',
      8: '40px',
      9: '48px',
    },
    radii: {
      0: '2px',
      1: '1px',
      2: '2px',
      3: '4px',
      4: '8px',
      5: '16px',
      6: '32px',
      round: '50%',
      pill: '9999px',
    },
  },

  fonts: {
    sans: 'apple-system, sans-serif',
    mono: 'monospace',
  },
  fontWeights: {},
  media: {
    bp1: '(min-width: 480px)',
  },
  utils: {
    p: value => ({
      padding: value,
    }),
    pt: value => ({
      paddingTop: value,
    }),
    pr: value => ({
      paddingRight: value,
    }),
    pb: value => ({
      paddingBottom: value,
    }),
    pl: value => ({
      paddingLeft: value,
    }),
    px: value => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: value => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: value => ({
      margin: value,
    }),
    mt: value => ({
      marginTop: value,
    }),
    mr: value => ({
      marginRight: value,
    }),
    mb: value => ({
      marginBottom: value,
    }),
    ml: value => ({
      marginLeft: value,
    }),
    mx: value => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: value => ({
      marginTop: value,
      marginBottom: value,
    }),

    // A property for applying width/height together
    size: value => ({
      width: value,
      height: value,
    }),

    // Shorthand for specifying rows and columns
    rows: value => ({
      gridTemplateRows: value,
    }),
    cols: value => ({
      gridTemplateColumns: value,
    }),
    // I never remember border radius
    corners: value => ({
      borderRadius: value,
    }),
  },
})
