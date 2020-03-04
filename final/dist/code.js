/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./final/src/code.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./final/src/code.js":
/*!***************************!*\
  !*** ./final/src/code.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

let foregroundColor = [52, 45, 53] // off black
let backgoundColor = [251, 251, 251] // off white
let foregroundAlpha = 1
let backgroundAlpha = 1

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
  const fills = findFills(figma.currentPage.selection)
  if (fills.length > 1) {
    foregroundColor = getRGB(fills[0].color)
    foregroundAlpha = fills[0].opacity
    backgoundColor = getRGB(fills[1].color)
    backgroundAlpha = fills[1].opacity
    calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor)
  }

  if (fills.length === 1) {
    const fills = findFills(figma.currentPage.selection)
    foregroundColor = getRGB(fills[0].color)
    foregroundAlpha = fills[0].opacity
    calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor)
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
}
// call on plugin start
figma.showUI(__html__, { width: 340, height: 405 })
calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor)


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZmluYWwvc3JjL2NvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUIsS0FBSztBQUNMO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2ZpbmFsL3NyYy9jb2RlLmpzXCIpO1xuIiwibGV0IGZvcmVncm91bmRDb2xvciA9IFs1MiwgNDUsIDUzXSAvLyBvZmYgYmxhY2tcbmxldCBiYWNrZ291bmRDb2xvciA9IFsyNTEsIDI1MSwgMjUxXSAvLyBvZmYgd2hpdGVcbmxldCBmb3JlZ3JvdW5kQWxwaGEgPSAxXG5sZXQgYmFja2dyb3VuZEFscGhhID0gMVxuXG5mdW5jdGlvbiBjb252ZXJ0UmdiVG9IZXgoY29sb3IpIHtcbiAgY29uc3QgaGV4ID0gY29sb3JcbiAgICAubWFwKGNvbCA9PiB7XG4gICAgICBjb25zdCBoZXhDb2xvciA9IGNvbC50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBgMCR7aGV4Q29sb3J9YC5zbGljZSgtMilcbiAgICB9KVxuICAgIC5qb2luKCcnKVxuICByZXR1cm4gYCMke2hleH1gXG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUx1bWluYW5jZShjb2xvcikge1xuICBjb25zdCBub3JtYWxpemVkQ29sb3IgPSBjb2xvci5tYXAoY2hhbm5lbCA9PiBjaGFubmVsIC8gMjU1KVxuICBjb25zdCBnYW1tYUNvcnJlY3RlZFJHQiA9IG5vcm1hbGl6ZWRDb2xvci5tYXAoY2hhbm5lbCA9PlxuICAgIGNoYW5uZWwgPD0gMC4wMzkyOFxuICAgICAgPyBjaGFubmVsIC8gMTIuOTJcbiAgICAgIDogTWF0aC5wb3coKGNoYW5uZWwgKyAwLjA1NSkgLyAxLjA1NSwgMi40KVxuICApXG4gIGNvbnN0IGx1bWluYW5jZSA9XG4gICAgZ2FtbWFDb3JyZWN0ZWRSR0JbMF0gKiAwLjIxMjYgK1xuICAgIGdhbW1hQ29ycmVjdGVkUkdCWzFdICogMC43MTUyICtcbiAgICBnYW1tYUNvcnJlY3RlZFJHQlsyXSAqIDAuMDcyMlxuICByZXR1cm4gbHVtaW5hbmNlXG59XG5cbmZ1bmN0aW9uIGdldFJHQih7IHIsIGcsIGIgfSkge1xuICBjb25zdCByZ2JDb2xvckFycmF5ID0gW3IsIGcsIGJdLm1hcChjaGFubmVsID0+IE1hdGgucm91bmQoY2hhbm5lbCAqIDI1NSkpXG4gIHJldHVybiByZ2JDb2xvckFycmF5XG59XG5cbmZ1bmN0aW9uIG92ZXJsYXkoZm9yZWdyb3VuZCwgYWxwaGEsIGJhY2tnb3VuZCkge1xuICBpZiAoYWxwaGEgPj0gMSkge1xuICAgIHJldHVybiBmb3JlZ3JvdW5kXG4gIH1cbiAgY29uc3Qgb3ZlcmxhaWQgPSBmb3JlZ3JvdW5kLm1hcCgoY2hhbm5lbCwgaSkgPT5cbiAgICBNYXRoLnJvdW5kKGNoYW5uZWwgKiBhbHBoYSArIGJhY2tnb3VuZFtpXSAqICgxIC0gYWxwaGEpKVxuICApXG4gIHJldHVybiBvdmVybGFpZFxufVxuXG5mdW5jdGlvbiBnZXRDb250cmFzdFNjb3Jlcyhjb250cmFzdCkge1xuICBsZXQgbGFyZ2VUZXh0XG4gIGxldCBub3JtYWxUZXh0XG4gIHN3aXRjaCAodHJ1ZSkge1xuICAgIGNhc2UgY29udHJhc3QgPiA3OlxuICAgICAgbGFyZ2VUZXh0ID0gJ0FBQSdcbiAgICAgIG5vcm1hbFRleHQgPSAnQUFBJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlIGNvbnRyYXN0ID4gNC41OlxuICAgICAgbGFyZ2VUZXh0ID0gJ0FBQSdcbiAgICAgIG5vcm1hbFRleHQgPSAnQUEnXG4gICAgICBicmVha1xuICAgIGNhc2UgY29udHJhc3QgPiAzOlxuICAgICAgbGFyZ2VUZXh0ID0gJ0FBJ1xuICAgICAgbm9ybWFsVGV4dCA9ICdGQUlMJ1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgbGFyZ2VUZXh0ID0gJ0ZBSUwnXG4gICAgICBub3JtYWxUZXh0ID0gJ0ZBSUwnXG4gICAgICBicmVha1xuICB9XG4gIHJldHVybiB7IGxhcmdlVGV4dCwgbm9ybWFsVGV4dCB9XG59XG5cbmZ1bmN0aW9uIHNlbmRDb250cmFzdEluZm8oY29udHJhc3QsIGZvcmVncm91bmQsIGJhY2tnb3VuZCkge1xuICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgdHlwZTogJ3NlbGVjdGlvbkNoYW5nZScsXG4gICAgZm9yZWdyb3VuZDogY29udmVydFJnYlRvSGV4KGZvcmVncm91bmQpLFxuICAgIGJhY2tncm91bmQ6IGNvbnZlcnRSZ2JUb0hleChiYWNrZ291bmQpLFxuICAgIGNvbnRyYXN0LFxuICAgIHNjb3JlczogZ2V0Q29udHJhc3RTY29yZXMoY29udHJhc3QpLFxuICB9KVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVBbmRTZW5kQ29udHJhc3QoZm9yZWdyb3VuZCwgYWxwaGEsIGJhY2tnb3VuZCkge1xuICBpZiAoYWxwaGEgPCAxKSB7XG4gICAgZm9yZWdyb3VuZCA9IG92ZXJsYXkoZm9yZWdyb3VuZCwgYWxwaGEsIGJhY2tnb3VuZClcbiAgfVxuICBjb25zdCBmb3JlZ3JvdW5kTHVtaW5hbmNlID0gY2FsY3VsYXRlTHVtaW5hbmNlKGZvcmVncm91bmQpICsgMC4wNVxuICBjb25zdCBiYWNrZ3JvdW5kTHVtaW5hbmNlID0gY2FsY3VsYXRlTHVtaW5hbmNlKGJhY2tnb3VuZCkgKyAwLjA1XG4gIGxldCBjb250cmFzdCA9IGZvcmVncm91bmRMdW1pbmFuY2UgLyBiYWNrZ3JvdW5kTHVtaW5hbmNlXG4gIGlmIChiYWNrZ3JvdW5kTHVtaW5hbmNlID4gZm9yZWdyb3VuZEx1bWluYW5jZSkge1xuICAgIGNvbnRyYXN0ID0gMSAvIGNvbnRyYXN0XG4gIH1cbiAgY29udHJhc3QgPSBNYXRoLmZsb29yKGNvbnRyYXN0ICogMTAwKSAvIDEwMFxuICByZXR1cm4gc2VuZENvbnRyYXN0SW5mbyhjb250cmFzdCwgZm9yZWdyb3VuZCwgYmFja2dvdW5kKVxufVxuXG5mdW5jdGlvbiBmaW5kRmlsbHMobm9kZXMpIHtcbiAgY29uc3Qgbm9kZXNXaXRoRmlsbHMgPSBub2Rlcy5maWx0ZXIoXG4gICAgbm9kZSA9PlxuICAgICAgbm9kZS5maWxscyAmJiBub2RlLmZpbGxzLmxlbmd0aCA+IDAgJiYgbm9kZS5maWxsc1swXS50eXBlID09PSAnU09MSUQnXG4gIClcbiAgaWYgKG5vZGVzV2l0aEZpbGxzLmxlbmd0aCA8PSAwKSB7XG4gICAgcmV0dXJuIGZpZ21hLm5vdGlmeSgnUGxlYXNlIHNlbGVjdCBhIGxheWVyIHRoYXQgaGFzIGEgc29saWQgZmlsbCcsIHtcbiAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgfSlcbiAgfVxuICBjb25zdCBmaWxscyA9IG5vZGVzV2l0aEZpbGxzLm1hcChub2RlID0+IG5vZGUuZmlsbHNbMF0pXG4gIHJldHVybiBmaWxsc1xufVxuXG5maWdtYS5vbignc2VsZWN0aW9uY2hhbmdlJywgKCkgPT4ge1xuICBjb25zdCBmaWxscyA9IGZpbmRGaWxscyhmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pXG4gIGlmIChmaWxscy5sZW5ndGggPiAxKSB7XG4gICAgZm9yZWdyb3VuZENvbG9yID0gZ2V0UkdCKGZpbGxzWzBdLmNvbG9yKVxuICAgIGZvcmVncm91bmRBbHBoYSA9IGZpbGxzWzBdLm9wYWNpdHlcbiAgICBiYWNrZ291bmRDb2xvciA9IGdldFJHQihmaWxsc1sxXS5jb2xvcilcbiAgICBiYWNrZ3JvdW5kQWxwaGEgPSBmaWxsc1sxXS5vcGFjaXR5XG4gICAgY2FsY3VsYXRlQW5kU2VuZENvbnRyYXN0KGZvcmVncm91bmRDb2xvciwgZm9yZWdyb3VuZEFscGhhLCBiYWNrZ291bmRDb2xvcilcbiAgfVxuXG4gIGlmIChmaWxscy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBmaWxscyA9IGZpbmRGaWxscyhmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pXG4gICAgZm9yZWdyb3VuZENvbG9yID0gZ2V0UkdCKGZpbGxzWzBdLmNvbG9yKVxuICAgIGZvcmVncm91bmRBbHBoYSA9IGZpbGxzWzBdLm9wYWNpdHlcbiAgICBjYWxjdWxhdGVBbmRTZW5kQ29udHJhc3QoZm9yZWdyb3VuZENvbG9yLCBmb3JlZ3JvdW5kQWxwaGEsIGJhY2tnb3VuZENvbG9yKVxuICB9XG59KVxuXG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICBpZiAobXNnLnR5cGUgPT09ICdzd2FwJykge1xuICAgIDtbZm9yZWdyb3VuZENvbG9yLCBiYWNrZ291bmRDb2xvciwgZm9yZWdyb3VuZEFscGhhLCBiYWNrZ3JvdW5kQWxwaGFdID0gW1xuICAgICAgYmFja2dvdW5kQ29sb3IsXG4gICAgICBmb3JlZ3JvdW5kQ29sb3IsXG4gICAgICBiYWNrZ3JvdW5kQWxwaGEsXG4gICAgICBmb3JlZ3JvdW5kQWxwaGEsXG4gICAgXVxuICAgIGNhbGN1bGF0ZUFuZFNlbmRDb250cmFzdChmb3JlZ3JvdW5kQ29sb3IsIGZvcmVncm91bmRBbHBoYSwgYmFja2dvdW5kQ29sb3IpXG4gIH1cbn1cbi8vIGNhbGwgb24gcGx1Z2luIHN0YXJ0XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDM0MCwgaGVpZ2h0OiA0MDUgfSlcbmNhbGN1bGF0ZUFuZFNlbmRDb250cmFzdChmb3JlZ3JvdW5kQ29sb3IsIGZvcmVncm91bmRBbHBoYSwgYmFja2dvdW5kQ29sb3IpXG4iXSwic291cmNlUm9vdCI6IiJ9