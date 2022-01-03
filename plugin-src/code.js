import chroma from 'chroma-js'
import { getApcaContrast } from './getApcaContrast'

let selectionMode = 'none'

// function getContrastScores(contrast) {
//   let largeText
//   let normalText
//   switch (true) {
//     case contrast > 7:
//       largeText = 'AAA'
//       normalText = 'AAA'
//       break
//     case contrast > 4.5:
//       largeText = 'AAA'
//       normalText = 'AA'
//       break
//     case contrast > 3:
//       largeText = 'AA'
//       normalText = 'FAIL'
//       break
//     default:
//       largeText = 'FAIL'
//       normalText = 'FAIL'
//       break
//   }
//   return { largeText, normalText }
// }

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
    // console.log('selectionchange')
    if (fills[0] && fills[0].color) {
      const { r, g, b } = fills[0].color
      const selectionColor = chroma(r, g, b, 'gl')
      // console.log('fills', fills, selectionColor.hex())

      figma.ui.postMessage({
        type: 'selectionChange',
        selectionColor: selectionColor.hex(),
      })
    }
  }
})

figma.ui.onmessage = msg => {
  if (msg.type === 'getApcaContrast') {
    // console.log('msg', msg)
    const apcaContrast = getApcaContrast({
      foregroundColor: msg.foregroundColor,
      backgroundColor: msg.backgroundColor,
    })
    // console.log('apcaContrast', apcaContrast)

    figma.ui.postMessage({
      type: 'apcaContrastCalculated',
      contrast: apcaContrast,
    })
  }

  if (msg.type === 'toggleExpand') {
    // console.log('msg', msg)
    if (msg.expanded === true) {
      figma.ui.resize(480, 624)
    } else {
      figma.ui.resize(480, 195)
    }
  }

  if (msg.type === 'selectionModeChange') {
    // console.log(msg)
    selectionMode = msg.selectionMode
  }
}

figma.showUI(__html__, { width: 480, height: 195 })
