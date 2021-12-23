import './ui.css'

function updateScores(id, score) {
  const element = document.getElementById(id)
  element.className = score
  element.textContent = score
  return element
}

function changeText(id, text) {
  const element = document.getElementById(id)
  element.textContent = text
  return element
}

function changeColor(classname, color) {
  const elements = document.getElementsByClassName(classname)
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].localName === 'div') {
      elements[i].style = `background-color: ${color};`
    } else {
      elements[i].style = `color: ${color};`
    }
  }
}

function changeSVGFIll(classname, color) {
  const fills = document.getElementsByClassName(classname)
  for (let i = 0; i < fills.length; i++) {
    fills[i].style = `fill: ${color};`
  }
}

window.onmessage = async event => {
  const message = event.data.pluginMessage
  if (message.type === 'selectionChange') {
    changeColor('background-color', message.background)
    changeColor('foreground-color', message.foreground)
    changeText('contrast', message.contrast)
    changeText('fgValue', message.foreground)
    changeText('bgValue', message.background)
    updateScores('normalTextScore', message.scores.normalText)
    updateScores('largeTextScore', message.scores.largeText)
    changeSVGFIll('Stripe', message.foreground)
    changeSVGFIll('Base', message.background)
  }
}
document.getElementById('swap').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'swap' } }, '*')
}
