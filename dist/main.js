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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/grid/index.js":
/*!***************************!*\
  !*** ./src/grid/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.js\");\n/* harmony import */ var _mason__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mason */ \"./src/mason.js\");\n/* harmony import */ var _track_sizing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./track-sizing */ \"./src/grid/track-sizing.js\");\n\n\n\n\nvar computeGridLayout = function computeGridLayout(domTree) {\n  var gridMatrix = [],\n      styles = domTree.style || {},\n      children = domTree.children || [],\n      templateRows = styles.templateRows,\n      templateColumns = styles.templateColumns,\n      tsa = new _track_sizing__WEBPACK_IMPORTED_MODULE_2__[\"default\"](),\n      withinBounds = function withinBounds(rowStart, rowEnd, colStart, colEnd) {\n    return rowStart >= 0 && rowStart < templateRows.length && rowEnd >= 0 && rowEnd < templateRows.length && colStart >= 0 && colStart < templateColumns.length && colEnd >= 0 && colEnd < templateColumns.length;\n  },\n      inflateGridCells = function inflateGridCells() {\n    var rowsWithSize, columnsWithSize, i;\n    tsa.set('tracks', templateRows);\n    rowsWithSize = tsa.resolveTracks(templateRows);\n    tsa.set('tracks', templateColumns);\n    columnsWithSize = tsa.resolveTracks(templateColumns);\n\n    for (i = 0; i < rowsWithSize.length; i++) {\n      gridMatrix.push(columnsWithSize.map(function (c) {\n        return {\n          width: c.width,\n          height: c.height,\n          bounds: c.bounds\n        };\n      }));\n    }\n  }; // if (getDisplayProperty(domTree)) {\n  //   //TODO: fix me\n  //   return computeLayout(domTree);\n  // }\n  // Size the rows and tracks\n  // Create the grid matrix\n\n\n  inflateGridCells(); // Allocate children to grid matrix\n\n  children.forEach(function (child) {\n    var gridRowStart = child.gridRowStart,\n        gridRowEnd = child.gridRowEnd,\n        gridColumnStart = child.gridColumnStart,\n        gridColumnEnd = child.gridColumnEnd;\n\n    if (withinBounds(gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd)) {\n      // array of cells this child occupies\n      child.matrixPosition = [{\n        row: gridRowStart - 1,\n        column: gridColumnStart - 1\n      }];\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (computeGridLayout);\n\n//# sourceURL=webpack:///./src/grid/index.js?");

/***/ }),

/***/ "./src/grid/track-sizing.js":
/*!**********************************!*\
  !*** ./src/grid/track-sizing.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar getMultiplierOfFr = function getMultiplierOfFr(size) {\n  return +size.replace(/fr/, '');\n},\n    _frSpaceDistributorHelper = function _frSpaceDistributorHelper(tracks, totalSpaceUsed, containerSize) {\n  var freeSpace,\n      spacePerFrTrack,\n      eligibleTracks,\n      totalFrTrackRatio = 0;\n\n  if (!tracks.length) {\n    return;\n  }\n\n  tracks.forEach(function (track) {\n    return totalFrTrackRatio += track.multiplier;\n  });\n  freeSpace = containerSize - totalSpaceUsed;\n  spacePerFrTrack = freeSpace / totalFrTrackRatio;\n  eligibleTracks = tracks.filter(function (track) {\n    return track.baseSize <= track.multiplier * spacePerFrTrack;\n  });\n\n  if (eligibleTracks.length < tracks.length) {\n    tracks.filter(function (track) {\n      return track.baseSize > track.multiplier * spacePerFrTrack;\n    }).forEach(function (track) {\n      return totalSpaceUsed += track.baseSize;\n    });\n    return _frSpaceDistributorHelper(eligibleTracks, totalSpaceUsed, containerSize);\n  } else {\n    eligibleTracks.forEach(function (track) {\n      return track.baseSize = track.multiplier * spacePerFrTrack;\n    });\n  }\n},\n    _intrinsicSpaceDistributorHelper = function _intrinsicSpaceDistributorHelper(tracks, totalSpaceUsed, containerSize) {\n  var freeSpace, spacePerIntrinsicTrack;\n\n  if (!tracks.length) {\n    return;\n  }\n\n  freeSpace = containerSize - totalSpaceUsed;\n  spacePerIntrinsicTrack = freeSpace / tracks.length;\n  tracks.forEach(function (track) {\n    return track.baseSize += spacePerIntrinsicTrack;\n  });\n};\n\nvar TrackResolver =\n/*#__PURE__*/\nfunction () {\n  function TrackResolver() {\n    var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n    var containerSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;\n\n    _classCallCheck(this, TrackResolver);\n\n    this.props = {};\n    this._config = {\n      frTracks: [],\n      intrinsicTracks: []\n    };\n    this.set('tracks', tracks);\n    this.set('items', items);\n    this.set('containerSize', containerSize);\n    return this;\n  }\n\n  _createClass(TrackResolver, [{\n    key: \"set\",\n    value: function set(key, info) {\n      this.props[key] = info;\n\n      switch (key) {\n        case 'tracks':\n          this._initTrackSize();\n\n          break;\n\n        case 'items':\n          this._initItems();\n\n          break;\n      }\n\n      return this;\n    }\n  }, {\n    key: \"get\",\n    value: function get(key) {\n      return this.props[key];\n    }\n  }, {\n    key: \"_initTrackSize\",\n    value: function _initTrackSize(_tracks) {\n      var tracks = _tracks || this.props.tracks || [],\n          config = this._config,\n          trackAr = [],\n          i,\n          len,\n          size,\n          type,\n          multiplier,\n          baseSize,\n          growthLimit;\n      config.frTracks = [];\n      config.intrinsicTracks = [];\n\n      for (i = 0, len = tracks.length; i < len; i++) {\n        size = tracks[i].size;\n        multiplier = 1;\n\n        if (!isNaN(+size)) {\n          baseSize = growthLimit = +size;\n          type = 'fixed';\n        } else if (size.indexOf('fr') > 0) {\n          baseSize = growthLimit = 0;\n          config.frTracks.push(i);\n          type = 'flex';\n          multiplier = getMultiplierOfFr(size);\n        } else {\n          baseSize = 0;\n          growthLimit = Infinity;\n          type = 'intrinsic';\n          config.intrinsicTracks.push(i);\n        }\n\n        trackAr.push({\n          size: size,\n          type: type,\n          multiplier: multiplier,\n          baseSize: baseSize,\n          growthLimit: growthLimit\n        });\n      }\n\n      return config.sanitizedTracks = trackAr;\n    }\n  }, {\n    key: \"_initItems\",\n    value: function _initItems(_items) {\n      var items = _items || this.props.items || [],\n          sanitizedItems = [],\n          item,\n          i,\n          len;\n\n      for (i = 0, len = items.length; i < len; i++) {\n        sanitizedItems.push(_objectSpread({}, items[i]));\n        item = sanitizedItems[i];\n        item.size = isNaN(item.size) ? this._getParentSize(item) : +item.size;\n      }\n\n      sanitizedItems.sort(function (a, b) {\n        var gap1 = a.end - a.start,\n            gap2 = b.end - b.start;\n\n        if (gap1 === gap2) {\n          return a.start < b.start;\n        } else return gap1 < gap2;\n      });\n      return this._config.sanitizedItems = sanitizedItems;\n    }\n  }, {\n    key: \"_getParentSize\",\n    value: function _getParentSize(item) {\n      var sanitizedTracks = this._config.sanitizedTracks,\n          parentTracks,\n          widthOfParentTracks = 0;\n      parentTracks = sanitizedTracks.filter(function (track) {\n        return track.start >= item.start && track.end <= item.end;\n      });\n      parentTracks.forEach(function (track) {\n        return widthOfParentTracks += track.baseSize;\n      });\n      return widthOfParentTracks || 0;\n    }\n  }, {\n    key: \"resolveTracks\",\n    value: function resolveTracks() {\n      this._placeNonSpanningItems()._placeSpanningItems()._distributeFreeSpace();\n\n      return this._config.sanitizedTracks;\n    }\n  }, {\n    key: \"_placeNonSpanningItems\",\n    value: function _placeNonSpanningItems() {\n      var _this$_config = this._config,\n          sanitizedItems = _this$_config.sanitizedItems,\n          sanitizedTracks = _this$_config.sanitizedTracks,\n          nonSpanningItems = sanitizedItems.filter(function (item) {\n        return item.end - item.start === 1;\n      }),\n          track,\n          trackIndex;\n      nonSpanningItems.forEach(function (item) {\n        trackIndex = item.start - 1;\n        track = sanitizedTracks[trackIndex];\n\n        if (track.type !== 'fixed') {\n          track.baseSize = Math.max(track.baseSize, item.size);\n          track.growthLimit = Math.max(track.growthLimit, track.baseSize);\n        }\n      });\n      return this;\n    }\n  }, {\n    key: \"_placeSpanningItems\",\n    value: function _placeSpanningItems() {\n      return this;\n    }\n  }, {\n    key: \"_distributeFreeSpace\",\n    value: function _distributeFreeSpace() {\n      var _this$_config2 = this._config,\n          frTracks = _this$_config2.frTracks,\n          intrinsicTracks = _this$_config2.intrinsicTracks,\n          sanitizedTracks = _this$_config2.sanitizedTracks,\n          containerSize = this.props.containerSize,\n          totalSpaceUsed = 0;\n      sanitizedTracks.forEach(function (track) {\n        return totalSpaceUsed += track.baseSize;\n      });\n\n      if (totalSpaceUsed < containerSize) {\n        if (frTracks.length) {\n          frTracks.forEach(function (trackId, index) {\n            frTracks[index] = sanitizedTracks[trackId];\n          });\n          frTracks.forEach(function (track) {\n            return totalSpaceUsed -= track.baseSize;\n          });\n\n          _frSpaceDistributorHelper(frTracks, totalSpaceUsed, containerSize);\n        } else if (intrinsicTracks.length) {\n          intrinsicTracks.forEach(function (trackId, index) {\n            intrinsicTracks[index] = sanitizedTracks[trackId];\n          });\n\n          _intrinsicSpaceDistributorHelper(intrinsicTracks, totalSpaceUsed, containerSize);\n        }\n      }\n\n      return this;\n    }\n  }]);\n\n  return TrackResolver;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TrackResolver);\n\n//# sourceURL=webpack:///./src/grid/track-sizing.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: computeLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mason__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mason */ \"./src/mason.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"computeLayout\", function() { return _mason__WEBPACK_IMPORTED_MODULE_0__[\"computeLayout\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mason.js":
/*!**********************!*\
  !*** ./src/mason.js ***!
  \**********************/
/*! exports provided: computeLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"computeLayout\", function() { return computeLayout; });\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./src/grid/index.js\");\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants */ \"./src/utils/constants.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n\n\n\n\nvar getComputeFn = function getComputeFn(display) {\n  switch (display) {\n    case _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"DISPLAY_GRID\"]:\n      return _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n    case _utils_constants__WEBPACK_IMPORTED_MODULE_1__[\"DISPLAY_FLEX\"]:\n      return _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n    default:\n      // Probably throw unsupported error?\n      return _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n  }\n},\n    computeLayout = function computeLayout() {\n  var domTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return getComputeFn(Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"getDisplayProperty\"])(domTree))(domTree);\n};\n\n\n\n//# sourceURL=webpack:///./src/mason.js?");

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: DISPLAY_GRID, DISPLAY_FLEX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_GRID\", function() { return DISPLAY_GRID; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DISPLAY_FLEX\", function() { return DISPLAY_FLEX; });\nvar DISPLAY_GRID = 'grid';\nvar DISPLAY_FLEX = 'flex';\n\n//# sourceURL=webpack:///./src/utils/constants.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: getDisplayProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDisplayProperty\", function() { return getDisplayProperty; });\nvar getDisplayProperty = function getDisplayProperty(domTree) {\n  return domTree.style && domTree.style.display;\n};\n\n\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ })

/******/ });