import chroma from 'chroma-js'
import { getApcaContrast } from './getApcaContrast'

let foregroundColor = [52, 45, 53] // off black
let backgoundColor = [255, 255, 255] // white
let foregroundAlpha = 1
let backgroundAlpha = 1

let selectionMode = 'none'

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

function findFills(nodes) {
  const nodesWithFills = nodes.filter(
    node =>
      node.fills && node.fills.length > 0 && node.fills[0].type === 'SOLID'
  )
  if (nodesWithFills.length <= 0) {
    return figma.notify('Please select a layer that has a solid fill', {
      timeout: 1000,
    })
  }
  const fills = nodesWithFills.map(node => node.fills[0])
  return fills
}

figma.on('selectionchange', () => {
  if (selectionMode !== 'none') {
    const fills = findFills(figma.currentPage.selection)
    console.log('selectionchange')
    if (fills[0] && fills[0].color) {
      const { r, g, b } = fills[0].color
      const selectionColor = chroma(r, g, b, 'gl')
      console.log('fills', fills, selectionColor.hex())

      figma.ui.postMessage({
        type: 'selectionChange',
        selectionColor: selectionColor.hex(),
      })
    }
  }
})

figma.ui.onmessage = msg => {
  if (msg.type === 'swap') {
    ;[foregroundColor, backgoundColor, foregroundAlpha, backgroundAlpha] = [
      backgoundColor,
      foregroundColor,
      backgroundAlpha,
      foregroundAlpha,
    ]
    calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor)
  }

  if (msg.type === 'getApcaContrast') {
    console.log(msg)
    const apcaContrast = getApcaContrast({
      foregroundColor: msg.foregroundColor,
      backgroundColor: msg.backgroundColor,
    })

    console.log(apcaContrast)
    figma.ui.postMessage({
      type: 'apcaContrastCalculated',
      contrast: apcaContrast,
    })
  }

  if (msg.type === 'toggleExpand') {
    console.log(msg)
    if (msg.expanded === true) {
      figma.ui.resize(480, 624)
    } else {
      figma.ui.resize(480, 195)
    }
  }

  if (msg.type === 'selectionModeChange') {
    console.log(msg)
    selectionMode = msg.selectionMode
  }
}

// const styles = figma.getLocalPaintStyles()
// console.log('styles', styles)
// call on plugin start
figma.showUI(__html__, { width: 480, height: 195 })
// calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor)
