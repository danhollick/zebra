// Original font lookup table

//  const apcaFluentGrid = [
//   ['min', 'min', 'min', 'min', 'min', 'min', 'min', 'min', 'min'],
//   ['min', 'min', 'min', 'min', 'min', 'min', 'min', 'min', 'min'],
//   ['min', 'min', 'min', 95, 90, 85, 80, 'min', 'min'],
//   ['min', 'min', 'min', 90, 85, 80, 75, 'min', 'min'],
//   ['min', 'min', 95, 80, 75, 65, 60, 55, 'min'],
//   ['min', 'min', 90, 75, 65, 60, 55, 50, 45],
//   ['min', 95, 85, 65, 60, 55, 50, 45, 40],
//   ['min', 90, 75, 60, 55, 50, 45, 40, 35],
//   ['min', 85, 70, 55, 50, 45, 40, 35, 30],
//   [90, 75, 60, 50, 45, 40, 35, 30, 'max'],
//   [85, 70, 55, 45, 40, 35, 30, 'max', 'max'],
//   [75, 60, 50, 40, 35, 30, 'max', 'max', 'max'],
//   [70, 55, 45, 35, 30, 'max', 'max', 'max', 'max'],
//   [60, 45, 40, 30, 'max', 'max', 'max', 'max', 'max'],
// ]

export const fontStyleLookupTable = {
  200: ['min', 'min', 'min', 'min', 95, 90, 85, 75, 70, 60],
  300: ['min', 'min', 95, 90, 85, 75, 70, 60, 55, 50],
  400: [95, 90, 80, 75, 65, 60, 55, 50, 45, 40],
  500: [90, 85, 75, 65, 60, 55, 50, 45, 40, 35],
  600: [85, 80, 65, 60, 55, 50, 45, 40, 35, 30],
  700: [80, 75, 60, 55, 50, 45, 40, 35, 30, 'max'],
}

export const fontSizeLookupTable = {
  0: 14,
  1: 16,
  2: 18,
  3: 21,
  4: 24,
  6: 42,
  5: 32,
  7: 56,
  8: 72,
  9: 96,
}
