figma.showUI(__html__)

function calculateLuminance(color) {
  return 1
}

function calculateContrast(foregroundColor, backgoundColor) {
  // console.log(foregroundColor, backgoundColor)
  const foregroundLuminance = calculateLuminance(foregroundColor)
  const backgroundLuminance = calculateLuminance(backgoundColor)
  return foregroundLuminance / backgroundLuminance
}

function sendContrastInfo(contrast, foregroundColor, backgroundColor) {
  figma.ui.postMessage({
    type: 'selectionChange',
    foreground: foregroundColor,
    background: backgroundColor,
    contrast,
  })
}

figma.on('selectionchange', () => {
  if (figma.currentPage.selection.length > 1) {
    // find nodes with fills that are of type SOLID
    const selection = figma.currentPage.selection.filter(
      node => node.fills.length > 0 && node.fills[0].type === 'SOLID'
    )
    // filter out the first fills of each layer
    const fills = selection.map(node => node.fills[0])
    const contrast = calculateContrast(fills[0].color, fills[1].color)
    sendContrastInfo(contrast, fills[0].color, fills[1].color)
  } else {
    console.log('Select at least 2 layers')
  }
})
