figma.showUI(__html__, { width: 340, height: 405 })

let foreground
let background

function calculateLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}
function calculateContrast(rgb1, rgb2) {
  let result =
    (calculateLuminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05) /
    (calculateLuminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  if (result < 1) {
    result = 1 / result
  }
  return result
}

function rgbToHex(r, g, b) {
  return [r, g, b]
    .map(color => {
      const normalizedColor = Math.max(0, Math.min(255, color))
      const hexColor = normalizedColor.toString(16)

      return `0${hexColor}`.slice(-2)
    })
    .join('')
}

function sendContrastInfo(foregroundElement, backgroundElement) {
  //   console.log(backgroundElement, foregroundElement)
  let largeTextStatus
  let normalTextStatus
  const foregroundColor = [
    Math.round(foregroundElement.color.r * 255),
    Math.round(foregroundElement.color.g * 255),
    Math.round(foregroundElement.color.b * 255),
    //   foreground.opacity,
  ]
  const backgroundColor = [
    Math.round(backgroundElement.color.r * 255),
    Math.round(backgroundElement.color.g * 255),
    Math.round(backgroundElement.color.b * 255),
    //   background.opacity,
  ]
  const contrast = calculateContrast(backgroundColor, foregroundColor)
  switch (true) {
    case contrast > 7:
      largeTextStatus = 'AAA'
      normalTextStatus = 'AAA'
      break
    case contrast > 4.5:
      largeTextStatus = 'AAA'
      normalTextStatus = 'AA'
      break
    case contrast > 3:
      largeTextStatus = 'AA'
      normalTextStatus = 'FAIL'
      break
    default:
      largeTextStatus = 'FAIL'
      normalTextStatus = 'FAIL'
      break
  }

  figma.ui.postMessage({
    type: 'selectionChange',
    foreground: rgbToHex(...foregroundColor),
    background: rgbToHex(...backgroundColor),
    contrast: Math.round((contrast + Number.EPSILON) * 100) / 100,
    largeTextStatus,
    normalTextStatus,
  })
}

figma.on('selectionchange', () => {
  if (figma.currentPage.selection.length === 1) {
    background = figma.currentPage.selection[0].fills[0]
    foreground = { color: { r: 1, g: 1, b: 1 } }
    sendContrastInfo(foreground, background)
  }
  if (figma.currentPage.selection.length > 1) {
    background = figma.currentPage.selection[0].fills[0]
    foreground = figma.currentPage.selection[1].fills[0]
    sendContrastInfo(foreground, background)
  }
})
// dont' need this now, but might if use opacity
figma.ui.onmessage = msg => {
  if (msg.type === 'swap') {
    if (figma.currentPage.selection.length > 1) {
      // ugly variable swapping here
      const tempForeground = foreground
      const tempBackground = background
      foreground = tempBackground
      background = tempForeground
      sendContrastInfo(foreground, background)
    }
  }
  //   figma.closePlugin()
}
