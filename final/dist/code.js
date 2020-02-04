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

let foregroundColor = [0, 0, 0] // black
let backgoundColor = [255, 255, 255] // whites
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZmluYWwvc3JjL2NvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUIsS0FBSztBQUNMO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2ZpbmFsL3NyYy9jb2RlLmpzXCIpO1xuIiwibGV0IGZvcmVncm91bmRDb2xvciA9IFswLCAwLCAwXSAvLyBibGFja1xubGV0IGJhY2tnb3VuZENvbG9yID0gWzI1NSwgMjU1LCAyNTVdIC8vIHdoaXRlc1xubGV0IGZvcmVncm91bmRBbHBoYSA9IDFcbmxldCBiYWNrZ3JvdW5kQWxwaGEgPSAxXG5cbmZ1bmN0aW9uIGNvbnZlcnRSZ2JUb0hleChjb2xvcikge1xuICBjb25zdCBoZXggPSBjb2xvclxuICAgIC5tYXAoY29sID0+IHtcbiAgICAgIGNvbnN0IGhleENvbG9yID0gY29sLnRvU3RyaW5nKDE2KVxuICAgICAgcmV0dXJuIGAwJHtoZXhDb2xvcn1gLnNsaWNlKC0yKVxuICAgIH0pXG4gICAgLmpvaW4oJycpXG4gIHJldHVybiBgIyR7aGV4fWBcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTHVtaW5hbmNlKGNvbG9yKSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2xvciA9IGNvbG9yLm1hcChjaGFubmVsID0+IGNoYW5uZWwgLyAyNTUpXG4gIGNvbnN0IGdhbW1hQ29ycmVjdGVkUkdCID0gbm9ybWFsaXplZENvbG9yLm1hcChjaGFubmVsID0+XG4gICAgY2hhbm5lbCA8PSAwLjAzOTI4XG4gICAgICA/IGNoYW5uZWwgLyAxMi45MlxuICAgICAgOiBNYXRoLnBvdygoY2hhbm5lbCArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gIClcbiAgY29uc3QgbHVtaW5hbmNlID1cbiAgICBnYW1tYUNvcnJlY3RlZFJHQlswXSAqIDAuMjEyNiArXG4gICAgZ2FtbWFDb3JyZWN0ZWRSR0JbMV0gKiAwLjcxNTIgK1xuICAgIGdhbW1hQ29ycmVjdGVkUkdCWzJdICogMC4wNzIyXG4gIHJldHVybiBsdW1pbmFuY2Vcbn1cblxuZnVuY3Rpb24gZ2V0UkdCKHsgciwgZywgYiB9KSB7XG4gIGNvbnN0IHJnYkNvbG9yQXJyYXkgPSBbciwgZywgYl0ubWFwKGNoYW5uZWwgPT4gTWF0aC5yb3VuZChjaGFubmVsICogMjU1KSlcbiAgcmV0dXJuIHJnYkNvbG9yQXJyYXlcbn1cblxuZnVuY3Rpb24gb3ZlcmxheShmb3JlZ3JvdW5kLCBhbHBoYSwgYmFja2dvdW5kKSB7XG4gIGlmIChhbHBoYSA+PSAxKSB7XG4gICAgcmV0dXJuIGZvcmVncm91bmRcbiAgfVxuICBjb25zdCBvdmVybGFpZCA9IGZvcmVncm91bmQubWFwKChjaGFubmVsLCBpKSA9PlxuICAgIE1hdGgucm91bmQoY2hhbm5lbCAqIGFscGhhICsgYmFja2dvdW5kW2ldICogKDEgLSBhbHBoYSkpXG4gIClcbiAgcmV0dXJuIG92ZXJsYWlkXG59XG5cbmZ1bmN0aW9uIGdldENvbnRyYXN0U2NvcmVzKGNvbnRyYXN0KSB7XG4gIGxldCBsYXJnZVRleHRcbiAgbGV0IG5vcm1hbFRleHRcbiAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSBjb250cmFzdCA+IDc6XG4gICAgICBsYXJnZVRleHQgPSAnQUFBJ1xuICAgICAgbm9ybWFsVGV4dCA9ICdBQUEnXG4gICAgICBicmVha1xuICAgIGNhc2UgY29udHJhc3QgPiA0LjU6XG4gICAgICBsYXJnZVRleHQgPSAnQUFBJ1xuICAgICAgbm9ybWFsVGV4dCA9ICdBQSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSBjb250cmFzdCA+IDM6XG4gICAgICBsYXJnZVRleHQgPSAnQUEnXG4gICAgICBub3JtYWxUZXh0ID0gJ0ZBSUwnXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBsYXJnZVRleHQgPSAnRkFJTCdcbiAgICAgIG5vcm1hbFRleHQgPSAnRkFJTCdcbiAgICAgIGJyZWFrXG4gIH1cbiAgcmV0dXJuIHsgbGFyZ2VUZXh0LCBub3JtYWxUZXh0IH1cbn1cblxuZnVuY3Rpb24gc2VuZENvbnRyYXN0SW5mbyhjb250cmFzdCwgZm9yZWdyb3VuZCwgYmFja2dvdW5kKSB7XG4gIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICB0eXBlOiAnc2VsZWN0aW9uQ2hhbmdlJyxcbiAgICBmb3JlZ3JvdW5kOiBjb252ZXJ0UmdiVG9IZXgoZm9yZWdyb3VuZCksXG4gICAgYmFja2dyb3VuZDogY29udmVydFJnYlRvSGV4KGJhY2tnb3VuZCksXG4gICAgY29udHJhc3QsXG4gICAgc2NvcmVzOiBnZXRDb250cmFzdFNjb3Jlcyhjb250cmFzdCksXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUFuZFNlbmRDb250cmFzdChmb3JlZ3JvdW5kLCBhbHBoYSwgYmFja2dvdW5kKSB7XG4gIGlmIChhbHBoYSA8IDEpIHtcbiAgICBmb3JlZ3JvdW5kID0gb3ZlcmxheShmb3JlZ3JvdW5kLCBhbHBoYSwgYmFja2dvdW5kKVxuICB9XG4gIGNvbnN0IGZvcmVncm91bmRMdW1pbmFuY2UgPSBjYWxjdWxhdGVMdW1pbmFuY2UoZm9yZWdyb3VuZCkgKyAwLjA1XG4gIGNvbnN0IGJhY2tncm91bmRMdW1pbmFuY2UgPSBjYWxjdWxhdGVMdW1pbmFuY2UoYmFja2dvdW5kKSArIDAuMDVcbiAgbGV0IGNvbnRyYXN0ID0gZm9yZWdyb3VuZEx1bWluYW5jZSAvIGJhY2tncm91bmRMdW1pbmFuY2VcbiAgaWYgKGJhY2tncm91bmRMdW1pbmFuY2UgPiBmb3JlZ3JvdW5kTHVtaW5hbmNlKSB7XG4gICAgY29udHJhc3QgPSAxIC8gY29udHJhc3RcbiAgfVxuICBjb250cmFzdCA9IE1hdGguZmxvb3IoY29udHJhc3QgKiAxMDApIC8gMTAwXG4gIHJldHVybiBzZW5kQ29udHJhc3RJbmZvKGNvbnRyYXN0LCBmb3JlZ3JvdW5kLCBiYWNrZ291bmQpXG59XG5cbmZ1bmN0aW9uIGZpbmRGaWxscyhub2Rlcykge1xuICBjb25zdCBub2Rlc1dpdGhGaWxscyA9IG5vZGVzLmZpbHRlcihcbiAgICBub2RlID0+XG4gICAgICBub2RlLmZpbGxzICYmIG5vZGUuZmlsbHMubGVuZ3RoID4gMCAmJiBub2RlLmZpbGxzWzBdLnR5cGUgPT09ICdTT0xJRCdcbiAgKVxuICBpZiAobm9kZXNXaXRoRmlsbHMubGVuZ3RoIDw9IDApIHtcbiAgICByZXR1cm4gZmlnbWEubm90aWZ5KCdQbGVhc2Ugc2VsZWN0IGEgbGF5ZXIgdGhhdCBoYXMgYSBzb2xpZCBmaWxsJywge1xuICAgICAgdGltZW91dDogMTAwMCxcbiAgICB9KVxuICB9XG4gIGNvbnN0IGZpbGxzID0gbm9kZXNXaXRoRmlsbHMubWFwKG5vZGUgPT4gbm9kZS5maWxsc1swXSlcbiAgcmV0dXJuIGZpbGxzXG59XG5cbmZpZ21hLm9uKCdzZWxlY3Rpb25jaGFuZ2UnLCAoKSA9PiB7XG4gIGNvbnN0IGZpbGxzID0gZmluZEZpbGxzKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbilcbiAgaWYgKGZpbGxzLmxlbmd0aCA+IDEpIHtcbiAgICBmb3JlZ3JvdW5kQ29sb3IgPSBnZXRSR0IoZmlsbHNbMF0uY29sb3IpXG4gICAgZm9yZWdyb3VuZEFscGhhID0gZmlsbHNbMF0ub3BhY2l0eVxuICAgIGJhY2tnb3VuZENvbG9yID0gZ2V0UkdCKGZpbGxzWzFdLmNvbG9yKVxuICAgIGJhY2tncm91bmRBbHBoYSA9IGZpbGxzWzFdLm9wYWNpdHlcbiAgICBjYWxjdWxhdGVBbmRTZW5kQ29udHJhc3QoZm9yZWdyb3VuZENvbG9yLCBmb3JlZ3JvdW5kQWxwaGEsIGJhY2tnb3VuZENvbG9yKVxuICB9XG5cbiAgaWYgKGZpbGxzLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IGZpbGxzID0gZmluZEZpbGxzKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbilcbiAgICBmb3JlZ3JvdW5kQ29sb3IgPSBnZXRSR0IoZmlsbHNbMF0uY29sb3IpXG4gICAgZm9yZWdyb3VuZEFscGhhID0gZmlsbHNbMF0ub3BhY2l0eVxuICAgIGNhbGN1bGF0ZUFuZFNlbmRDb250cmFzdChmb3JlZ3JvdW5kQ29sb3IsIGZvcmVncm91bmRBbHBoYSwgYmFja2dvdW5kQ29sb3IpXG4gIH1cbn0pXG5cbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gIGlmIChtc2cudHlwZSA9PT0gJ3N3YXAnKSB7XG4gICAgO1tmb3JlZ3JvdW5kQ29sb3IsIGJhY2tnb3VuZENvbG9yLCBmb3JlZ3JvdW5kQWxwaGEsIGJhY2tncm91bmRBbHBoYV0gPSBbXG4gICAgICBiYWNrZ291bmRDb2xvcixcbiAgICAgIGZvcmVncm91bmRDb2xvcixcbiAgICAgIGJhY2tncm91bmRBbHBoYSxcbiAgICAgIGZvcmVncm91bmRBbHBoYSxcbiAgICBdXG4gICAgY2FsY3VsYXRlQW5kU2VuZENvbnRyYXN0KGZvcmVncm91bmRDb2xvciwgZm9yZWdyb3VuZEFscGhhLCBiYWNrZ291bmRDb2xvcilcbiAgfVxufVxuLy8gY2FsbCBvbiBwbHVnaW4gc3RhcnRcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB3aWR0aDogMzQwLCBoZWlnaHQ6IDQwNSB9KVxuY2FsY3VsYXRlQW5kU2VuZENvbnRyYXN0KGZvcmVncm91bmRDb2xvciwgZm9yZWdyb3VuZEFscGhhLCBiYWNrZ291bmRDb2xvcilcbiJdLCJzb3VyY2VSb290IjoiIn0=