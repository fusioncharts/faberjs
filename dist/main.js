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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _mason__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mason */ "./src/mason.js");
/* harmony import */ var _track_sizing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./track-sizing */ "./src/grid/track-sizing.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");





var parseTemplete = function parseTemplete(template) {
  return template.map(function (size, index) {
    return {
      size: size,
      start: index + 1,
      end: index + 2
    };
  });
},
    withinBounds = function withinBounds(rowStart, rowEnd, colStart, colEnd, templateRows, templateColumns) {
  return rowStart - 1 >= 0 && rowStart - 1 < templateRows.length && rowEnd - 2 >= 0 && rowEnd - 2 < templateRows.length && colStart - 1 >= 0 && colStart - 1 < templateColumns.length && colEnd - 2 >= 0 && colEnd - 2 < templateColumns.length;
},
    addCoordinatesToCells = function addCoordinatesToCells(gridMatrix, children, containerStyles) {
  var i,
      j,
      item,
      usedX = 0,
      usedY = 0,
      cell = {},
      alignedBounds = {};

  for (i = 0; i < gridMatrix.length; i++) {
    usedX = 0; // usedY = null;

    for (j = 0; j < gridMatrix[i].length; j++) {
      item = gridMatrix[i][j];
      item.startX = usedX;
      item.endX = usedX + item.columnSize;
      usedX = item.endX;
      item.startY = usedY;
      item.endY = usedY + item.rowSize;

      if (j == gridMatrix[i].length - 1) {
        usedY = usedY + item.rowSize;
      }
    }
  }

  children.forEach(function (child) {
    cell = gridMatrix[child.matrixPosition.row][child.matrixPosition.column];
    child.layout = {};
    child.layout.width = child.style.width;
    child.layout.height = child.style.height;
    child.layout.startX = cell.startX;
    child.layout.startY = cell.startY;
    child.layout.endX = cell.endX;
    child.layout.endY = cell.endY;

    if (containerStyles.justifyItems === _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_CENTER"] || child.style.justifySelf == _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_CENTER"]) {
      if (!Number.isNaN(child.style.width)) {
        alignedBounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["centerify"])(cell.startX, cell.endX, child.layout.startX, child.layout.width);
        child.layout.startX = alignedBounds.start;
        child.layout.endX = alignedBounds.end;
      }
    }

    if (containerStyles.alignItems === _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_CENTER"] || child.style.alignSelf == _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_CENTER"]) {
      if (!Number.isNaN(child.style.height)) {
        alignedBounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["centerify"])(cell.startY, cell.endY, cell.startY, child.layout.height);
        child.layout.startY = alignedBounds.start;
        child.layout.endY = alignedBounds.end;
      }
    }

    if (containerStyles.justifyItems === _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_END"] || child.style.justifySelf == _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_END"]) {
      if (!Number.isNaN(child.style.width)) {
        alignedBounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["endify"])(cell.startX, cell.endX, child.layout.startX, child.layout.width);
        child.layout.startX = alignedBounds.start;
        child.layout.endX = alignedBounds.end;
      }
    }

    if (containerStyles.alignItems === _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_END"] || child.style.alignSelf == _utils_constants__WEBPACK_IMPORTED_MODULE_3__["JUSTIFY_ALIGN_END"]) {
      if (!Number.isNaN(child.style.height)) {
        alignedBounds = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["endify"])(cell.startY, cell.endY, cell.startY, child.layout.height);
        child.layout.startY = alignedBounds.start;
        child.layout.endY = alignedBounds.end;
      }
    }
  });
},
    placeChildrenInGrid = function placeChildrenInGrid(children, gridMatrix, templateRows, templateColumns) {
  children.forEach(function (child) {
    var _child$style = child.style,
        gridRowStart = _child$style.gridRowStart,
        gridRowEnd = _child$style.gridRowEnd,
        gridColumnStart = _child$style.gridColumnStart,
        gridColumnEnd = _child$style.gridColumnEnd;

    if (withinBounds(gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd, templateRows, templateColumns)) {
      gridMatrix[gridRowStart - 1][gridColumnStart - 1].item = child;
      child.matrixPosition = {
        row: gridRowStart - 1,
        column: gridColumnStart - 1
      }; // TODO:  consider spanning items
    }
  });
},
    inflateGridCells = function inflateGridCells(tsa, children, columns, rows, containerHeight, containerWidth, gridMatrix) {
  var i, j;
  columns = tsa.set('tracks', columns).set('items', children.map(function (c) {
    return {
      start: c.style.gridColumnStart,
      end: c.style.gridColumnEnd,
      size: c.style.width
    };
  })).set('containerSize', containerHeight).resolveTracks();
  rows = tsa.set('tracks', rows).set('items', children.map(function (r) {
    return {
      start: r.style.gridRowStart,
      end: r.style.gridRowEnd,
      size: r.style.height
    };
  })).set('containerSize', containerWidth).resolveTracks();

  for (i = 0; i < rows.length; i++) {
    for (j = 0; j < rows.length; j++) {
      gridMatrix[i][j].rowSize = rows[i].baseSize;
      gridMatrix[i][j].columnSize = columns[j].baseSize;
    }
  }
},
    computeGridLayout = function computeGridLayout(domTree) {
  var gridMatrix = [],
      containerStyles = domTree.style || {},
      children = domTree.children || [],
      templateRows = containerStyles.templateRows,
      templateColumns = containerStyles.templateColumns,
      width = containerStyles.width,
      height = containerStyles.height,
      tsa = new _track_sizing__WEBPACK_IMPORTED_MODULE_2__["default"](),
      createGridMatrix = function createGridMatrix() {
    var i;

    for (i = 0; i < formattedRows.length; i++) {
      gridMatrix.push(formattedColumns.map(function (c) {
        return {
          columnSize: +c.size,
          rowSize: +formattedRows[i].size
        };
      }));
    }
  };

  var i,
      formattedRows = parseTemplete(templateRows),
      formattedColumns = parseTemplete(templateColumns);

  for (i = 0; i < children.length; i++) {
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDisplayProperty"])(children[i])) {
      children[i] = Object(_mason__WEBPACK_IMPORTED_MODULE_1__["computeLayout"])(children[i]);
    }
  } // Create the grid matrix


  createGridMatrix(); // Allocate children to grid matrix

  placeChildrenInGrid(children, gridMatrix, templateRows, templateColumns); // Size the rows and tracks

  inflateGridCells(tsa, children, formattedColumns, formattedRows, height, width, gridMatrix); // Calling this second time to ensure that if some item's min-content-contribution has changed

  inflateGridCells(tsa, children, formattedColumns, formattedRows, height, width, gridMatrix); // Adds x,y coordinates to each cell depending on position and dimensions

  addCoordinatesToCells(gridMatrix, children, containerStyles);
  return domTree;
};

/* harmony default export */ __webpack_exports__["default"] = (computeGridLayout);

/***/ }),

/***/ "./src/grid/track-sizing.js":
/*!**********************************!*\
  !*** ./src/grid/track-sizing.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getMultiplierOfFr = function getMultiplierOfFr(size) {
  return +size.replace(/fr/, '');
},
    _frSpaceDistributorHelper = function _frSpaceDistributorHelper(tracks, totalSpaceUsed, containerSize) {
  var freeSpace,
      spacePerFrTrack,
      eligibleTracks,
      totalFrTrackRatio = 0;

  if (!tracks.length) {
    return;
  }

  tracks.forEach(function (track) {
    return totalFrTrackRatio += track.multiplier;
  });
  freeSpace = containerSize - totalSpaceUsed;
  spacePerFrTrack = freeSpace / totalFrTrackRatio;
  eligibleTracks = tracks.filter(function (track) {
    return track.baseSize <= track.multiplier * spacePerFrTrack;
  });

  if (eligibleTracks.length < tracks.length) {
    tracks.filter(function (track) {
      return track.baseSize > track.multiplier * spacePerFrTrack;
    }).forEach(function (track) {
      return totalSpaceUsed += track.baseSize;
    });
    return _frSpaceDistributorHelper(eligibleTracks, totalSpaceUsed, containerSize);
  } else {
    eligibleTracks.forEach(function (track) {
      return track.baseSize = track.multiplier * spacePerFrTrack;
    });
  }
},
    _intrinsicSpaceDistributorHelper = function _intrinsicSpaceDistributorHelper(tracks, totalSpaceUsed, containerSize) {
  var freeSpace, spacePerIntrinsicTrack;

  if (!tracks.length) {
    return;
  }

  freeSpace = containerSize - totalSpaceUsed;
  spacePerIntrinsicTrack = freeSpace / tracks.length;
  tracks.forEach(function (track) {
    return track.baseSize += spacePerIntrinsicTrack;
  });
};

var TrackResolver =
/*#__PURE__*/
function () {
  function TrackResolver() {
    var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var containerSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;

    _classCallCheck(this, TrackResolver);

    this.props = {};
    this._config = {
      frTracks: [],
      intrinsicTracks: []
    };
    this.set('tracks', tracks);
    this.set('items', items);
    this.set('containerSize', containerSize);
    return this;
  }

  _createClass(TrackResolver, [{
    key: "set",
    value: function set(key, info) {
      this.props[key] = info;

      switch (key) {
        case 'tracks':
          this._initTrackSize();

          break;

        case 'items':
          this._initItems();

          break;
      }

      return this;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.props[key];
    }
  }, {
    key: "_initTrackSize",
    value: function _initTrackSize(_tracks) {
      var tracks = _tracks || this.props.tracks || [],
          config = this._config,
          trackAr = [],
          i,
          len,
          size,
          type,
          multiplier,
          baseSize,
          growthLimit;
      config.frTracks = [];
      config.intrinsicTracks = [];

      for (i = 0, len = tracks.length; i < len; i++) {
        size = tracks[i].size;
        multiplier = 1;

        if (!isNaN(+size)) {
          baseSize = growthLimit = +size;
          type = 'fixed';
        } else if (size.indexOf('fr') > 0) {
          baseSize = growthLimit = 0;
          config.frTracks.push(i);
          type = 'flex';
          multiplier = getMultiplierOfFr(size);
        } else {
          baseSize = 0;
          growthLimit = Infinity;
          type = 'intrinsic';
          config.intrinsicTracks.push(i);
        }

        trackAr.push(_objectSpread({}, tracks[i], {
          type: type,
          multiplier: multiplier,
          baseSize: baseSize,
          growthLimit: growthLimit
        }));
      }

      return config.sanitizedTracks = trackAr;
    }
  }, {
    key: "_initItems",
    value: function _initItems(_items) {
      var items = _items || this.props.items || [],
          sanitizedItems = [],
          item,
          i,
          len;

      for (i = 0, len = items.length; i < len; i++) {
        sanitizedItems.push(_objectSpread({}, items[i]));
        item = sanitizedItems[i];
        item.size = isNaN(item.size) ? this._getParentSize(item) : +item.size;
      }

      sanitizedItems.sort(function (a, b) {
        var gap1 = a.end - a.start,
            gap2 = b.end - b.start;

        if (gap1 === gap2) {
          return a.start < b.start;
        } else return gap1 < gap2;
      });
      return this._config.sanitizedItems = sanitizedItems;
    }
  }, {
    key: "_getParentSize",
    value: function _getParentSize(item) {
      var sanitizedTracks = this._config.sanitizedTracks,
          parentTracks,
          widthOfParentTracks = 0;
      parentTracks = sanitizedTracks.filter(function (track) {
        return track.start >= item.start && track.end <= item.end;
      });
      parentTracks.forEach(function (track) {
        return widthOfParentTracks += track.baseSize;
      });
      return widthOfParentTracks || 0;
    }
  }, {
    key: "resolveTracks",
    value: function resolveTracks() {
      this._placeNonSpanningItems()._placeSpanningItems()._distributeFreeSpace();

      return this._config.sanitizedTracks;
    }
  }, {
    key: "_placeNonSpanningItems",
    value: function _placeNonSpanningItems() {
      var _this$_config = this._config,
          sanitizedItems = _this$_config.sanitizedItems,
          sanitizedTracks = _this$_config.sanitizedTracks,
          nonSpanningItems = sanitizedItems.filter(function (item) {
        return item.end - item.start === 1;
      }),
          track,
          trackIndex;
      nonSpanningItems.forEach(function (item) {
        trackIndex = item.start - 1;
        track = sanitizedTracks[trackIndex];

        if (track.type !== 'fixed') {
          track.baseSize = Math.max(track.baseSize, item.size);
          track.growthLimit = Math.max(track.growthLimit, track.baseSize);
        }
      });
      return this;
    }
  }, {
    key: "_placeSpanningItems",
    value: function _placeSpanningItems() {
      return this;
    }
  }, {
    key: "_distributeFreeSpace",
    value: function _distributeFreeSpace() {
      var _this$_config2 = this._config,
          frTracks = _this$_config2.frTracks,
          intrinsicTracks = _this$_config2.intrinsicTracks,
          sanitizedTracks = _this$_config2.sanitizedTracks,
          containerSize = this.props.containerSize,
          totalSpaceUsed = 0;
      sanitizedTracks.forEach(function (track) {
        return totalSpaceUsed += track.baseSize;
      });

      if (totalSpaceUsed < containerSize) {
        if (frTracks.length) {
          frTracks.forEach(function (trackId, index) {
            frTracks[index] = sanitizedTracks[trackId];
          });
          frTracks.forEach(function (track) {
            return totalSpaceUsed -= track.baseSize;
          });

          _frSpaceDistributorHelper(frTracks, totalSpaceUsed, containerSize);
        } else if (intrinsicTracks.length) {
          intrinsicTracks.forEach(function (trackId, index) {
            intrinsicTracks[index] = sanitizedTracks[trackId];
          });

          _intrinsicSpaceDistributorHelper(intrinsicTracks, totalSpaceUsed, containerSize);
        }
      }

      return this;
    }
  }]);

  return TrackResolver;
}();

/* harmony default export */ __webpack_exports__["default"] = (TrackResolver);

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
      return _grid__WEBPACK_IMPORTED_MODULE_0__["default"];

    case _utils_constants__WEBPACK_IMPORTED_MODULE_1__["DISPLAY_FLEX"]:
      return _grid__WEBPACK_IMPORTED_MODULE_0__["default"];

    default:
      // Probably throw unsupported error?
      return _grid__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
},
    computeLayout = function computeLayout() {
  var domTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return getComputeFn(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getDisplayProperty"])(domTree))(domTree);
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