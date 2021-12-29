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

const fontStyleLookupTable = {
  200: ['min', 'min', 'min', 'min', 95, 90, 85, 75, 70, 60],
  300: ['min', 'min', 95, 90, 85, 75, 70, 60, 55, 50],
  400: [95, 90, 80, 75, 65, 60, 55, 50, 45, 40],
  500: [90, 85, 75, 65, 60, 55, 50, 45, 40, 35],
  600: [85, 80, 65, 60, 55, 50, 45, 40, 35, 30],
  700: [80, 75, 60, 55, 50, 45, 40, 35, 30, 'max'],
}

const fontSizeLookupTable = {
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

const mapRanges = (n, start1, stop1, start2, stop2, withinBounds) => {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
  if (!withinBounds) {
    return newval
  }

  if (start2 < stop2) {
    return Math.max(Math.min(newval, stop2), start2)
  }
  return Math.max(Math.min(newval, start2), stop2)
}

const findPreferredFontSize = ({ weight, contrast, fontRangeUpperLimit }) => {
  const index = fontStyleLookupTable[weight].findIndex(item => item <= contrast)
  let size
  if (index === -1) {
    size = fontRangeUpperLimit
    return size
  }
  size = fontSizeLookupTable[index]
  return size
}

const findMinFontSize = ({ weight, contrast, fontRangeUpperLimit }) => {
  const index = fontStyleLookupTable[weight].findIndex(
    item => item <= contrast + 5
  )
  let size
  if (index === -1) {
    size = fontRangeUpperLimit
    return size
  }
  size = fontSizeLookupTable[index]
  return size
}

export const getFontRanges = ({
  fontRangeLowerLimit,
  fontRangeUpperLimit,
  weight,
  contrast,
}) => {
  const preferredFontSize = findPreferredFontSize({
    weight,
    contrast,
    fontRangeUpperLimit,
  })
  const minFontSize = findMinFontSize({ weight, contrast, fontRangeUpperLimit })

  const preferredPercentage = mapRanges(
    preferredFontSize,
    fontRangeLowerLimit,
    fontRangeUpperLimit,
    0,
    100,
    true
  )

  const minPercentage = mapRanges(
    minFontSize,
    fontRangeLowerLimit,
    fontRangeUpperLimit,
    0,
    100,
    true
  )
  console.log(
    preferredFontSize,
    preferredPercentage,
    minFontSize,
    minPercentage
  )
  return {
    minFontSize,
    preferredFontSize,
    preferredPercentage: Math.round(preferredPercentage),
    minPercentage: Math.round(minPercentage),
  }
}
