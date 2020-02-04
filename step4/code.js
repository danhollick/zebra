figma.showUI(__html__, { width: 340, height: 405 })

let foregroundColor
let backgoundColor
let foregroundAlpha
let backgroundAlpha

function convertRgbToHex(color) {
  const hex = color
    .map(col => {
      const hexColor = col.toString(16)
      return `0${hexColor}`.slice(-2)
    })
    .join('')
  return `#${hex}`
}

function calculateLuminance(color) {
  const normalizedColor = color.map(channel => channel / 255)
  const gammaCorrectedRGB = normalizedColor.map(channel =>
    channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4)
  )
  const luminance =
    gammaCorrectedRGB[0] * 0.2126 +
    gammaCorrectedRGB[1] * 0.7152 +
    gammaCorrectedRGB[2] * 0.0722
  return luminance
}

function getRGB({ r, g, b }) {
  const rgbColorArray = [r, g, b].map(channel => Math.round(channel * 255))
  return rgbColorArray
}

function overlay(foreground, alpha, backgound) {
  if (alpha >= 1) {
    return foreground
  }
  const overlaid = foreground.map((channel, i) =>
    Math.round(channel * alpha + backgound[i] * (1 - alpha))
  )
  return overlaid
}

function getContrastScores(contrast) {
  let largeText
  let normalText
  switch (true) {
    case contrast > 7:
      largeText = 'AAA'
      normalText = 'AAA'
      break
    case contrast > 4.5:
      largeText = 'AAA'
      normalText = 'AA'
      break
    case contrast > 3:
      largeText = 'AA'
      normalText = 'FAIL'
      break
    default:
      largeText = 'FAIL'
      normalText = 'FAIL'
      break
  }
  return { largeText, normalText }
}

function sendContrastInfo(contrast, foreground, backgound) {
  figma.ui.postMessage({
    type: 'selectionChange',
    foreground: convertRgbToHex(foreground),
    background: convertRgbToHex(backgound),
    contrast,
    scores: getContrastScores(contrast),
  })
}

function calculateAndSendContrast(foreground, alpha, backgound) {
  if (alpha < 1) {
    foreground = overlay(foreground, alpha, backgound)
  }
  const foregroundLuminance = calculateLuminance(foreground) + 0.05
  const backgroundLuminance = calculateLuminance(backgound) + 0.05
  let contrast = foregroundLuminance / backgroundLuminance
  if (backgroundLuminance > foregroundLuminance) {
    contrast = 1 / contrast
  }
  contrast = Math.floor(contrast * 100) / 100
  return sendContrastInfo(contrast, foreground, backgound)
}

figma.on('selectionchange', () => {
  if (figma.currentPage.selection.length > 1) {
    const selection = figma.currentPage.selection.filter(
      node => node.fills.length > 0 && node.fills[0].type === 'SOLID'
    )
    const fills = selection.map(node => node.fills[0])
    foregroundColor = getRGB(fills[0].color)
    foregroundAlpha = fills[0].opacity
    backgoundColor = getRGB(fills[1].color)
    backgroundAlpha = fills[1].opacity
    calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor)
  }
  console.log('Select at least 2 layers')
})

figma.ui.onmessage = msg => {
  if (msg.type === 'swap') {
    if (figma.currentPage.selection.length > 1) {
      ;[foregroundColor, backgoundColor, foregroundAlpha, backgroundAlpha] = [
        backgoundColor,
        foregroundColor,
        backgroundAlpha,
        foregroundAlpha,
      ]
      calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor)
    }
  }
}
