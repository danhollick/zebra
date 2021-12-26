import { APCAcontrast, sRGBtoY, displayP3toY, colorParsley } from 'apca-w3'

export const getApcaContrast = ({ foregroundColor, backgroundColor }) => {
  //   console.log(colorParsley(foregroundColor), backgroundColor)
  const foregroundRGBArray = colorParsley(foregroundColor)
  const backgroundRGBArray = colorParsley(backgroundColor)

  const contrastLc = APCAcontrast(
    sRGBtoY(foregroundRGBArray),
    sRGBtoY(backgroundRGBArray),
    1
  )
  console.log(foregroundRGBArray, backgroundRGBArray, contrastLc)
  return contrastLc
}
