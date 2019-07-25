(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mason"] = factory();
	else
		root["Mason"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/grid/index.js":
/*!***************************!*\
  !*** ./src/grid/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/nilarnabmookherjee/code/mason/src/grid/index.js: Unexpected token (7:0)\n\n\u001b[0m \u001b[90m  5 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m  6 | \u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m  7 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m  8 | \u001b[39m\u001b[36mconst\u001b[39m parseTemplete \u001b[33m=\u001b[39m (template) \u001b[33m=>\u001b[39m template\u001b[33m.\u001b[39mmap((size\u001b[33m,\u001b[39m index) \u001b[33m=>\u001b[39m ({ size\u001b[33m,\u001b[39m start\u001b[33m:\u001b[39m index \u001b[33m+\u001b[39m \u001b[35m1\u001b[39m\u001b[33m,\u001b[39m end\u001b[33m:\u001b[39m index \u001b[33m+\u001b[39m \u001b[35m2\u001b[39m }))\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m  9 | \u001b[39m  withinBounds \u001b[33m=\u001b[39m (rowStart\u001b[33m,\u001b[39m rowEnd\u001b[33m,\u001b[39m colStart\u001b[33m,\u001b[39m colEnd\u001b[33m,\u001b[39m templateRows\u001b[33m,\u001b[39m templateColumns) \u001b[33m=>\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 10 | \u001b[39m    \u001b[36mreturn\u001b[39m rowStart \u001b[33m-\u001b[39m \u001b[35m1\u001b[39m \u001b[33m>=\u001b[39m \u001b[35m0\u001b[39m\u001b[0m\n    at Parser.raise (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:6325:17)\n    at Parser.unexpected (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:7642:16)\n    at Parser.parseExprAtom (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:8841:20)\n    at Parser.parseExprSubscripts (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:8412:23)\n    at Parser.parseMaybeUnary (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:8392:21)\n    at Parser.parseExprOps (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:8267:23)\n    at Parser.parseMaybeConditional (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:8240:23)\n    at Parser.parseMaybeAssign (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:8187:21)\n    at Parser.parseExpression (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:8135:23)\n    at Parser.parseStatementContent (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:9958:23)\n    at Parser.parseStatement (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:9829:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:10405:25)\n    at Parser.parseBlockBody (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:10392:10)\n    at Parser.parseTopLevel (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:9758:10)\n    at Parser.parse (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:11270:17)\n    at parse (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/parser/lib/index.js:11306:38)\n    at parser (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\n    at normalizeFile (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\n    at runSync (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/core/lib/transformation/index.js:44:43)\n    at runAsync (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/core/lib/transformation/index.js:35:14)\n    at process.nextTick (/Users/nilarnabmookherjee/code/mason/node_modules/@babel/core/lib/transform.js:34:34)\n    at processTicksAndRejections (internal/process/next_tick.js:74:9)");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: computeLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mason__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mason */ "./src/mason.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeLayout", function() { return _mason__WEBPACK_IMPORTED_MODULE_0__["computeLayout"]; });




/***/ }),

/***/ "./src/mason.js":
/*!**********************!*\
  !*** ./src/mason.js ***!
  \**********************/
/*! exports provided: computeLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeLayout", function() { return computeLayout; });
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ "./src/grid/index.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");




var getComputeFn = function getComputeFn(display) {
  switch (display) {
    case _utils_constants__WEBPACK_IMPORTED_MODULE_1__["DISPLAY_GRID"]:
      return _grid__WEBPACK_IMPORTED_MODULE_0__["computeGridLayout"];

    case _utils_constants__WEBPACK_IMPORTED_MODULE_1__["DISPLAY_FLEX"]:
      return _grid__WEBPACK_IMPORTED_MODULE_0__["computeGridLayout"];

    default:
      // Probably throw unsupported error?
      return _grid__WEBPACK_IMPORTED_MODULE_0__["computeGridLayout"];
  }
},
    computeLayout = function computeLayout() {
  var domTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var parent = arguments.length > 1 ? arguments[1] : undefined;
  return getComputeFn(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getDisplayProperty"])(domTree))(domTree, parent);
};



/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: DISPLAY_GRID, DISPLAY_FLEX, JUSTIFY_ALIGN_CENTER, JUSTIFY_ALIGN_START, JUSTIFY_ALIGN_END */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_GRID", function() { return DISPLAY_GRID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_FLEX", function() { return DISPLAY_FLEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JUSTIFY_ALIGN_CENTER", function() { return JUSTIFY_ALIGN_CENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JUSTIFY_ALIGN_START", function() { return JUSTIFY_ALIGN_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JUSTIFY_ALIGN_END", function() { return JUSTIFY_ALIGN_END; });
var DISPLAY_GRID = 'grid';
var DISPLAY_FLEX = 'flex';
var JUSTIFY_ALIGN_CENTER = 'center';
var JUSTIFY_ALIGN_START = 'start';
var JUSTIFY_ALIGN_END = 'end';

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: getDisplayProperty, centerify, endify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDisplayProperty", function() { return getDisplayProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centerify", function() { return centerify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endify", function() { return endify; });
var getDisplayProperty = function getDisplayProperty(domTree) {
  return domTree.style && domTree.style.display;
},
    centerify = function centerify(axisStart, axisEnd, itemStart, itemSize) {
  var itemFreeSpaceStart = itemStart - axisStart,
      itemEnd = itemStart + itemSize,
      itemFreeSpaceEnd = axisEnd - itemEnd,
      totalFreeSpace = itemFreeSpaceStart + itemFreeSpaceEnd; // Item's revised bounds along block axis

  return {
    start: axisStart + totalFreeSpace / 2,
    end: axisEnd - totalFreeSpace / 2
  };
},
    endify = function endify(axisStart, axisEnd, itemStart, itemSize) {
  var itemFreeSpaceStart = itemStart - axisStart,
      itemEnd = itemStart + itemSize,
      itemFreeSpaceEnd = axisEnd - itemEnd,
      totalFreeSpace = itemFreeSpaceStart + itemFreeSpaceEnd; // Item's revised bounds along block axis

  return {
    start: axisStart + totalFreeSpace,
    end: axisStart + totalFreeSpace + itemSize
  };
};



/***/ })

/******/ });
});
//# sourceMappingURL=main.js.map