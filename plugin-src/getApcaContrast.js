import { APCAcontrast, sRGBtoY, displayP3toY, colorParsley } from 'apca-w3'
import chroma from 'chroma-js'

export const getApcaContrast = ({ foregroundColor, backgroundColor }) => {
  //   console.log(colorParsley(foregroundColor), backgroundColor)
  const foregroundRGBArray = colorParsley(foregroundColor)
  const backgroundRGBArray = colorParsley(backgroundColor)
  let sentiment

  let contrastLc = APCAcontrast(
    sRGBtoY(foregroundRGBArray),
    sRGBtoY(backgroundRGBArray),
    1
  )
  const wcag = chroma.contrast(`#${foregroundColor}`, `#${backgroundColor}`)

  contrastLc = Math.abs(contrastLc)
  switch (true) {
    case contrastLc > 90:
      sentiment = 'Very High'
      break

    case contrastLc > 75:
      sentiment = 'High'
      break

    case contrastLc > 65:
      sentiment = 'Medium'
      break

    case contrastLc > 50:
      sentiment = 'Weak'
      break

    case contrastLc > 35:
      sentiment = 'Low'
      break

    default:
      sentiment = 'Extremely Low'
      break
  }
  // console.log(foregroundRGBArray, backgroundRGBArray, contrastLc)
  return {
    score: Math.round(contrastLc),
    sentiment,
    wcag: Math.round((wcag + Number.EPSILON) * 10) / 10,
  }
}
