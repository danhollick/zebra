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
      gray0: '#f9f9fb',
      gray50: '#f2f2f5',
      gray100: '#eff0f3',
      gray200: '#e7e8eb',
      gray300: '#dadbde',
      gray400: '#c8c8cc',
      gray500: '#afafb2',
      gray600: '#8e8e91',
      gray700: '#656568',
      gray800: '#363638',
      gray900: '#050505',
      black: '#000000',
      // blue
      blue0: '#f3f4fc',
      blue50: '#dee1fc',
      blue100: '#c9cffc',
      blue200: '#a1aafc',
      blue300: '#7e8afc',
      blue400: '#6070fc',
      blue500: '#485afa',
      blue600: '#364af8',
      blue700: '#283df3',
      blue800: '#1e32e9',
      blue900: '#162ad8',
      blue1000: '#1123bf',
      blue1100: '#0415A6',
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

      yellow700: '#FFA800',
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
      2: '13px',
      3: '15px',
      4: '17px',
      5: '19px',
      6: '21px',
      7: '27px',
      8: '35px',
      9: '59px',
    },
    radii: {
      0: '2px',
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
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
    p: (value) => ({
      padding: value,
    }),
    pt: (value) => ({
      paddingTop: value,
    }),
    pr: (value) => ({
      paddingRight: value,
    }),
    pb: (value) => ({
      paddingBottom: value,
    }),
    pl: (value) => ({
      paddingLeft: value,
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value) => ({
      margin: value,
    }),
    mt: (value) => ({
      marginTop: value,
    }),
    mr: (value) => ({
      marginRight: value,
    }),
    mb: (value) => ({
      marginBottom: value,
    }),
    ml: (value) => ({
      marginLeft: value,
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),

    // A property for applying width/height together
    size: (value) => ({
      width: value,
      height: value,
    }),

    // Shorthand for specifying rows and columns
    rows: (value) => ({
      gridTemplateRows: value,
    }),
    cols: (value) => ({
      gridTemplateColumns: value,
    }),
    // I never remember border radius
    corners: (value) => ({
      borderRadius: value,
    }),
  },
})
