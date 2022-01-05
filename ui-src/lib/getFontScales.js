import {
  // altContrastLookup,
  fontSizeLookupTable,
  fontStyleLookupTable,
} from '../data/fontTable'

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
  const index = fontStyleLookupTable[weight].findIndex(item => {
    // If the indicated contrast is lower that Lc 75, then add lc 15 to this minimum, OR increase up to Lc 75.
    // https://github.com/Myndex/SAPC-APCA/discussions/30
    if (item < 75 - 15) {
      item += 15
    } else if (item < 75) {
      item = 75
    }
    console.log(item <= contrast)
    return item <= contrast
  })
  let size
  if (index === -1) {
    size = fontRangeUpperLimit
    return size
  }
  size = fontSizeLookupTable[index]
  console.log('pref', size)
  return size
}

const findMinFontSize = ({ weight, contrast, fontRangeUpperLimit }) => {
  // crude method until we can get a separate lookup table for spot text
  const index = fontStyleLookupTable[weight].findIndex(
    item => item <= contrast + 15
  )

  // const index = fontStyleLookupTable[weight].findIndex(item => {
  //   if (item < 60 - 15) {
  //     item += 15
  //   } else if (item < 60) {
  //     item = 60
  //   }
  //   console.log(item <= contrast)
  //   return item <= contrast + 15
  // })
  let size
  if (index === -1) {
    size = fontRangeUpperLimit
    return size
  }
  size = fontSizeLookupTable[index]
  console.log('minFontSize', size)
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

  const fontScales = [
    {
      // not suitable
      type: 'not-suitable',
      isVisible: minFontSize - fontRangeLowerLimit > 0,
      min: fontRangeLowerLimit,
      max: minFontSize,
      width: `${minPercentage}%`,
      color: '$red400',
    },
    {
      // minimum
      type: 'minimum',
      isVisible: preferredFontSize - minFontSize > 0,
      min: minFontSize,
      max: preferredFontSize,
      width: `${preferredPercentage - minPercentage}%`,
      color: '$yellow300',
    },
    {
      // preferred
      type: 'preferred',
      isVisible: fontRangeUpperLimit - preferredFontSize > 0,
      min: preferredFontSize,
      max: fontRangeUpperLimit,
      width: `${100 - preferredPercentage}%`,
      color: '$green400',
    },
  ]

  return fontScales.filter(scale => scale.isVisible)
}
