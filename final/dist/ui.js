!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){"use strict";t.r(e);t(1);function r(n,e){const t=document.getElementById(n);return t.className=e,t.textContent=e,t}function o(n,e){const t=document.getElementById(n);return t.textContent=e,t}function a(n,e){const t=document.getElementsByClassName(n);for(let n=0;n<t.length;n++)"div"===t[n].localName?t[n].style=`background-color: ${e};`:t[n].style=`color: ${e};`}function i(n,e){const t=document.getElementsByClassName(n);for(let n=0;n<t.length;n++)t[n].style=`fill: ${e};`}window.onmessage=async n=>{const e=n.data.pluginMessage;"selectionChange"===e.type&&(a("background-color",e.background),a("foreground-color",e.foreground),o("contrast",e.contrast),o("fgValue",e.foreground),o("bgValue",e.background),r("normalTextScore",e.scores.normalText),r("largeTextScore",e.scores.largeText),i("Stripe",e.foreground),i("Base",e.background))},document.getElementById("swap").onclick=()=>{parent.postMessage({pluginMessage:{type:"swap"}},"*")}},function(n,e,t){var r=t(2),o=t(3);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[n.i,o,""]]);var a={insert:"head",singleton:!1},i=(r(o,a),o.locals?o.locals:{});n.exports=i},function(n,e,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},a=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),i=[];function c(n){for(var e=-1,t=0;t<i.length;t++)if(i[t].identifier===n){e=t;break}return e}function s(n,e){for(var t={},r=[],o=0;o<n.length;o++){var a=n[o],s=e.base?a[0]+e.base:a[0],u=t[s]||0,l="".concat(s," ").concat(u);t[s]=u+1;var d=c(l),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==d?(i[d].references++,i[d].updater(f)):i.push({identifier:l,updater:h(f,e),references:1}),r.push(l)}return r}function u(n){var e=document.createElement("style"),r=n.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(n){e.setAttribute(n,r[n])})),"function"==typeof n.insert)n.insert(e);else{var i=a(n.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var l,d=(l=[],function(n,e){return l[n]=e,l.filter(Boolean).join("\n")});function f(n,e,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(n.styleSheet)n.styleSheet.cssText=d(e,o);else{var a=document.createTextNode(o),i=n.childNodes;i[e]&&n.removeChild(i[e]),i.length?n.insertBefore(a,i[e]):n.appendChild(a)}}function p(n,e,t){var r=t.css,o=t.media,a=t.sourceMap;if(o?n.setAttribute("media",o):n.removeAttribute("media"),a&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}var g=null,m=0;function h(n,e){var t,r,o;if(e.singleton){var a=m++;t=g||(g=u(e)),r=f.bind(null,t,a,!1),o=f.bind(null,t,a,!0)}else t=u(e),r=p.bind(null,t,e),o=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var t=s(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var r=0;r<t.length;r++){var o=c(t[r]);i[o].references--}for(var a=s(n,e),u=0;u<t.length;u++){var l=c(t[u]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}t=a}}}},function(n,e,t){(e=t(4)(!1)).push([n.i,"* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n\n  p,\n  h4,\n  h3,\n  h2, \n  h5 {\n    font-family: Arial, Helvetica, sans-serif;\n  }\n\n  .FAIL {\n    color: #F34242;\n  }\n\n  .AA {\n    color: #6BBE96;\n  }\n\n  .AAA {\n    color: #00DA71;\n  }\n\n  #container {\n    width: 100vw;\n    height: 100vh;\n    background-color: #FBFBFB;\n    display: grid;\n    row-gap: 16px;\n    padding: 16px;\n    justify-items: center;\n    align-content: start;\n  }\n\n  #background-container {\n    display: grid;\n    width: 100%;\n    row-gap: 8px;\n    padding: 24px;\n    border-radius: 16px;\n    justify-items: center;\n    align-items: center;\n  }\n\n  .shadow {\n    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);\n  }\n\n  #colorGrid {\n    width: 100%;\n    padding: 8px;\n    display: grid;\n    column-gap: 8px;\n    grid-template-columns: auto 1fr auto;\n    align-items: center;\n    justify-self: center;\n  }\n\n  .colorBox {\n    height: 16px;\n    width: 16px;\n    border-radius: 4px;\n  }\n\n  .color {\n    display: grid;\n    column-gap: 8px;\n    grid-template-columns: auto auto;\n    font-size: 12px;\n    align-items: center;\n  }\n\n  #swap {\n    cursor: pointer;\n    justify-self: center;\n  }\n\n  #swap:hover {\n    stroke: #000000;\n  }",""]),n.exports=e},function(n,e,t){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=function(n,e){var t=n[1]||"",r=n[3];if(!r)return t;if(e&&"function"==typeof btoa){var o=(i=r,c=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(s," */")),a=r.sources.map((function(n){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(n," */")}));return[t].concat(a).concat([o]).join("\n")}var i,c,s;return[t].join("\n")}(e,n);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,r){"string"==typeof n&&(n=[[null,n,""]]);var o={};if(r)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var c=0;c<n.length;c++){var s=[].concat(n[c]);r&&o[s[0]]||(t&&(s[2]?s[2]="".concat(t," and ").concat(s[2]):s[2]=t),e.push(s))}},e}}]);