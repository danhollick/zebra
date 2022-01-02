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
      red50: '#fef2f2',
      red100: '#fef2f2',
      red200: '#fecaca',
      red300: '#fca5a5',
      red400: '#f87171',
      red500: '#ef4444',
      red600: '#dc2626',
      red700: '#b91c1c',
      red800: '#991b1b',
      red900: '#7f1d1d',
      // green
      green50: '#ecfdf5',
      green100: '#d1fae5',
      green200: '#a7f3d0',
      green300: '#6ee7b7',
      green400: '#34d399',
      green500: '#34d399',
      green600: '#059669',
      green700: '#047857',
      green800: '#065f46',
      green900: '#064e3b',
      // yellow
      yellow50: '#fefce8',
      yellow100: '#fef9c3',
      yellow200: '#fef08a',
      yellow300: '#fde047',
      yellow400: '#facc15',
      yellow500: '#eab308',
      yellow600: '#ca8a04',
      yellow700: '#a16207',
      yellow800: '#854d0e',
      yellow900: '#713f12',

      // contrast styles
      contrast0: '#F4F4F5',
      contrast15: '#D8D8D8',
      contrast30: '#BBBBBB',
      contrast45: '#A0A0A0',
      contrast60: '#808080',
      contrast75: '#5F5F5F',
      contrast90: '#3A3A3A',
      contrast100: '#060606',
      contrast106: '#000000',
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
