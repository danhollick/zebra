(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/apca-w3/dist/apca-w3-v.0.0.98g-4g.4.min.js
  var require_apca_w3_v_0_0_98g_4g_4_min = __commonJS({
    "node_modules/apca-w3/dist/apca-w3-v.0.0.98g-4g.4.min.js"(exports, module) {
      function APCAcontrast2(a, c, e) {
        e = e === void 0 ? -1 : e;
        var d = [0, 1.1];
        if (isNaN(a) || isNaN(c) || Math.min(a, c) < d[0] || Math.max(a, c) > d[1])
          return 0;
        a = 0.022 < a ? a : a + Math.pow(0.022 - a, 1.414);
        c = 0.022 < c ? c : c + Math.pow(0.022 - c, 1.414);
        if (5e-4 > Math.abs(c - a))
          return 0;
        c > a ? (a = 1.14 * (Math.pow(c, 0.56) - Math.pow(a, 0.57)), a = 0.1 > a ? 0 : a - 0.027) : (a = 1.14 * (Math.pow(c, 0.65) - Math.pow(a, 0.62)), a = -0.1 < a ? 0 : a + 0.027);
        if (0 > e)
          return 100 * a;
        if (e == 0)
          return Math.round(100 * Math.abs(a)) + "<sub>N</sub>";
        if (Number.isInteger(e))
          return (100 * a).toFixed(e);
        throw "Err-3";
      }
      function sRGBtoY2(a) {
        a = a === void 0 ? [0, 0, 0, 1] : a;
        return 0.2126729 * Math.pow(a[0] / 255, 2.4) + 0.7151522 * Math.pow(a[1] / 255, 2.4) + 0.072175 * Math.pow(a[2] / 255, 2.4);
      }
      function displayP3toY2(a) {
        a = a === void 0 ? [0, 0, 0, 1] : a;
        return 0.228982959480578 * Math.pow(a[0] / 255, 2.4) + 0.691749262585238 * Math.pow(a[1] / 255, 2.4) + 0.0792677779341829 * Math.pow(a[2] / 255, 2.4);
      }
      function colorParsley2(a) {
        if (typeof a === "string")
          return parseString(a);
        if (typeof a === "number")
          return [(a & 16711680) >> 16, (a & 65280) >> 8, a & 255, 1];
        if (typeof a === "object")
          return Array.isArray(a) ? a : [a.r, a.g, a.b, a.a];
        throw "Err-1";
      }
      function parseString(a) {
        a = (a === void 0 ? "#abcdef" : a).replace(/[\s `~!@#$%^&*<>?{}:;"'+=_]/g, "");
        a = a.toLowerCase();
        var c = {
          aliceblue: "f0f8ff",
          antiquewhite: "faebd7",
          aqua: "00ffff",
          aquamarine: "7fffd4",
          azure: "f0ffff",
          beige: "f5f5dc",
          bisque: "ffe4c4",
          black: "000000",
          blanchedalmond: "ffebcd",
          blue: "0000ff",
          blueviolet: "8a2be2",
          brown: "a52a2a",
          burlywood: "deb887",
          cadetblue: "5f9ea0",
          chartreuse: "7fff00",
          chocolate: "d2691e",
          coral: "ff7f50",
          cornflowerblue: "6495ed",
          cornsilk: "fff8dc",
          crimson: "dc143c",
          cyan: "00ffff",
          darkblue: "00008b",
          darkcyan: "008b8b",
          darkgoldenrod: "b8860b",
          darkgray: "a9a9a9",
          darkgreen: "006400",
          darkgrey: "a9a9a9",
          darkkhaki: "bdb76b",
          darkmagenta: "8b008b",
          darkolivegreen: "556b2f",
          darkorange: "ff8c00",
          darkorchid: "9932cc",
          darkred: "8b0000",
          darksalmon: "e9967a",
          darkseagreen: "8fbc8f",
          darkslateblue: "483d8b",
          darkslategray: "2f4f4f",
          darkslategrey: "2f4f4f",
          darkturquoise: "00ced1",
          darkviolet: "9400d3",
          deeppink: "ff1493",
          deepskyblue: "00bfff",
          dimgray: "696969",
          dimgrey: "696969",
          dodgerblue: "1e90ff",
          firebrick: "b22222",
          floralwhite: "fffaf0",
          forestgreen: "228b22",
          fuchsia: "ff00ff",
          gainsboro: "dcdcdc",
          ghostwhite: "f8f8ff",
          gold: "ffd700",
          goldenrod: "daa520",
          gray: "808080",
          green: "008000",
          greenyellow: "adff2f",
          grey: "808080",
          honeydew: "f0fff0",
          hotpink: "ff69b4",
          indianred: "cd5c5c",
          indigo: "4b0082",
          ivory: "fffff0",
          khaki: "f0e68c",
          lavender: "e6e6fa",
          lavenderblush: "fff0f5",
          lawngreen: "7cfc00",
          lemonchiffon: "fffacd",
          lightblue: "add8e6",
          lightcoral: "f08080",
          lightcyan: "e0ffff",
          lightgoldenrodyellow: "fafad2",
          lightgray: "d3d3d3",
          lightgreen: "90ee90",
          lightgrey: "d3d3d3",
          lightpink: "ffb6c1",
          lightsalmon: "ffa07a",
          lightseagreen: "20b2aa",
          lightskyblue: "87cefa",
          lightslategray: "778899",
          lightslategrey: "778899",
          lightsteelblue: "b0c4de",
          lightyellow: "ffffe0",
          lime: "00ff00",
          limegreen: "32cd32",
          linen: "faf0e6",
          magenta: "ff00ff",
          maroon: "800000",
          mediumaquamarine: "66cdaa",
          mediumblue: "0000cd",
          mediumorchid: "ba55d3",
          mediumpurple: "9370db",
          mediumseagreen: "3cb371",
          mediumslateblue: "7b68ee",
          mediumspringgreen: "00fa9a",
          mediumturquoise: "48d1cc",
          mediumvioletred: "c71585",
          midnightblue: "191970",
          mintcream: "f5fffa",
          mistyrose: "ffe4e1",
          moccasin: "ffe4b5",
          navajowhite: "ffdead",
          navy: "000080",
          oldlace: "fdf5e6",
          olive: "808000",
          olivedrab: "6b8e23",
          orange: "ffa500",
          orangered: "ff4500",
          orchid: "da70d6",
          palegoldenrod: "eee8aa",
          palegreen: "98fb98",
          paleturquoise: "afeeee",
          palevioletred: "db7093",
          papayawhip: "ffefd5",
          peachpuff: "ffdab9",
          peru: "cd853f",
          pink: "ffc0cb",
          plum: "dda0dd",
          powderblue: "b0e0e6",
          purple: "800080",
          rebeccapurple: "663399",
          red: "ff0000",
          rosybrown: "bc8f8f",
          royalblue: "4169e1",
          saddlebrown: "8b4513",
          salmon: "fa8072",
          sandybrown: "f4a460",
          seagreen: "2e8b57",
          seashell: "fff5ee",
          sienna: "a0522d",
          silver: "c0c0c0",
          skyblue: "87ceeb",
          slateblue: "6a5acd",
          slategray: "708090",
          slategrey: "708090",
          snow: "fffafa",
          springgreen: "00ff7f",
          steelblue: "4682b4",
          tan: "d2b48c",
          teal: "008080",
          thistle: "d8bfd8",
          tomato: "ff6347",
          turquoise: "40e0d0",
          violet: "ee82ee",
          wheat: "f5deb3",
          white: "ffffff",
          whitesmoke: "f5f5f5",
          yellow: "ffff00",
          yellowgreen: "9acd32",
          gray1: "111111",
          gray2: "222222",
          gray3: "333333",
          gray4: "444444",
          gray5: "555555",
          gray6: "666666",
          gray7: "777777",
          gray8: "888888",
          gray9: "999999",
          graya: "aaaaaa",
          grayb: "bbbbbb",
          grayc: "cccccc",
          grayd: "dddddd",
          graye: "eeeeee",
          grey1: "111111",
          grey2: "222222",
          grey3: "333333",
          grey4: "444444",
          grey5: "555555",
          grey6: "666666",
          grey7: "777777",
          grey8: "888888",
          grey9: "999999",
          greya: "aaaaaa",
          greyb: "bbbbbb",
          greyc: "cccccc",
          greyd: "dddddd",
          greye: "eeeeee"
        };
        for (e in c)
          if (a == e) {
            a = c[e];
            break;
          }
        c = [{ rex: /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i, parseStr: function(b) {
          return [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])];
        } }, {
          rex: /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3})\),([01]?[0.1]\d{0,42})\)$/i,
          parseStr: function(b) {
            return [parseInt(b[1]), parseInt(b[2]), parseInt(b[3]), parseInt(b[4])];
          }
        }, { rex: /^([0-9|a-f])([0-9|a-f])([0-9|a-f])$/i, parseStr: function(b) {
          return [parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16)];
        } }, { rex: /^([0-9|a-f])([0-9|a-f])([0-9|a-f])([0-9|a-f])$/i, parseStr: function(b) {
          return [parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16), parseInt(b[4] + b[4], 16)];
        } }, { rex: /^([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})$/i, parseStr: function(b) {
          return [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)];
        } }, { rex: /^([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})$/i, parseStr: function(b) {
          return [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16), parseInt(b[4], 16)];
        } }];
        var e = c.length;
        var d = 1;
        for (d = 0; d < e; d++) {
          var f = c[d].rex;
          if (f = f.exec(a))
            return d = c[d].parseStr(f), a = d[0] & 255, c = d[1] & 255, e = d[2] & 255, d = isNaN(d[3]) ? 1 : Math.min(Math.max(d[3], 0), 1), [a, c, e, d];
        }
        return a;
      }
      module.exports = { APCAcontrast: APCAcontrast2, sRGBtoY: sRGBtoY2, displayP3toY: displayP3toY2, colorParsley: colorParsley2 };
    }
  });

  // plugin-src/getApcaContrast.js
  var import_apca_w3 = __toModule(require_apca_w3_v_0_0_98g_4g_4_min());
  var getApcaContrast = ({ foregroundColor: foregroundColor2, backgroundColor }) => {
    const foregroundRGBArray = (0, import_apca_w3.colorParsley)(foregroundColor2);
    const backgroundRGBArray = (0, import_apca_w3.colorParsley)(backgroundColor);
    const contrastLc = (0, import_apca_w3.APCAcontrast)((0, import_apca_w3.sRGBtoY)(foregroundRGBArray), (0, import_apca_w3.sRGBtoY)(backgroundRGBArray), 1);
    console.log(foregroundRGBArray, backgroundRGBArray, contrastLc);
    return contrastLc;
  };

  // plugin-src/code.js
  var foregroundColor = [52, 45, 53];
  var backgoundColor = [255, 255, 255];
  var foregroundAlpha = 1;
  var backgroundAlpha = 1;
  function convertRgbToHex(color) {
    const hex = color.map((col) => {
      const hexColor = col.toString(16);
      return `0${hexColor}`.slice(-2);
    }).join("");
    return `#${hex}`;
  }
  function calculateLuminance(color) {
    const normalizedColor = color.map((channel) => channel / 255);
    const gammaCorrectedRGB = normalizedColor.map((channel) => channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4));
    const luminance = gammaCorrectedRGB[0] * 0.2126 + gammaCorrectedRGB[1] * 0.7152 + gammaCorrectedRGB[2] * 0.0722;
    return luminance;
  }
  function getRGB({ r, g, b }) {
    const rgbColorArray = [r, g, b].map((channel) => Math.round(channel * 255));
    return rgbColorArray;
  }
  function overlay(foreground, alpha, backgound) {
    if (alpha >= 1) {
      return foreground;
    }
    const overlaid = foreground.map((channel, i) => Math.round(channel * alpha + backgound[i] * (1 - alpha)));
    return overlaid;
  }
  function getContrastScores(contrast) {
    let largeText;
    let normalText;
    switch (true) {
      case contrast > 7:
        largeText = "AAA";
        normalText = "AAA";
        break;
      case contrast > 4.5:
        largeText = "AAA";
        normalText = "AA";
        break;
      case contrast > 3:
        largeText = "AA";
        normalText = "FAIL";
        break;
      default:
        largeText = "FAIL";
        normalText = "FAIL";
        break;
    }
    return { largeText, normalText };
  }
  function sendContrastInfo(contrast, foreground, backgound) {
    figma.ui.postMessage({
      type: "selectionChange",
      foreground: convertRgbToHex(foreground),
      background: convertRgbToHex(backgound),
      contrast,
      scores: getContrastScores(contrast)
    });
  }
  function calculateAndSendContrast(foreground, alpha, backgound) {
    if (alpha < 1) {
      foreground = overlay(foreground, alpha, backgound);
    }
    const foregroundLuminance = calculateLuminance(foreground) + 0.05;
    const backgroundLuminance = calculateLuminance(backgound) + 0.05;
    let contrast = foregroundLuminance / backgroundLuminance;
    if (backgroundLuminance > foregroundLuminance) {
      contrast = 1 / contrast;
    }
    contrast = Math.floor(contrast * 100) / 100;
    return sendContrastInfo(contrast, foreground, backgound);
  }
  function findFills(nodes) {
    const nodesWithFills = nodes.filter((node) => node.fills && node.fills.length > 0 && node.fills[0].type === "SOLID");
    if (nodesWithFills.length <= 0) {
      return figma.notify("Please select a layer that has a solid fill", {
        timeout: 1e3
      });
    }
    const fills = nodesWithFills.map((node) => node.fills[0]);
    return fills;
  }
  figma.on("selectionchange", () => {
    const fills = findFills(figma.currentPage.selection);
    if (fills.length > 1) {
      foregroundColor = getRGB(fills[0].color);
      foregroundAlpha = fills[0].opacity;
      backgoundColor = getRGB(fills[1].color);
      backgroundAlpha = fills[1].opacity;
      calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor);
    }
    if (fills.length === 1) {
      const fills2 = findFills(figma.currentPage.selection);
      foregroundColor = getRGB(fills2[0].color);
      foregroundAlpha = fills2[0].opacity;
      calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor);
    }
  });
  figma.ui.onmessage = (msg) => {
    if (msg.type === "swap") {
      ;
      [foregroundColor, backgoundColor, foregroundAlpha, backgroundAlpha] = [
        backgoundColor,
        foregroundColor,
        backgroundAlpha,
        foregroundAlpha
      ];
      calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor);
    }
    if (msg.type === "getApcaContrast") {
      console.log(msg);
      const apcaContrast = getApcaContrast({
        foregroundColor: msg.foregroundColor,
        backgroundColor: msg.backgroundColor
      });
      console.log(apcaContrast);
      figma.ui.postMessage({
        type: "apcaContrastCalculated",
        contrast: apcaContrast
      });
    }
  };
  figma.showUI(__html__, { width: 480, height: 195 });
  calculateAndSendContrast(foregroundColor, foregroundAlpha, backgoundColor);
})();
