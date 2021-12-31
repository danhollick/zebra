import { fontSizeLookupTable, fontStyleLookupTable } from '../data/fontTable'

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
