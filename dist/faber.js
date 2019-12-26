(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["faber"] = factory();
	else
		root["faber"] = factory();
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

/***/ "./src/faber.js":
/*!**********************!*\
  !*** ./src/faber.js ***!
  \**********************/
/*! exports provided: computeLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeLayout", function() { return computeLayout; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid */ "./src/grid/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var LayoutEngine =
/*#__PURE__*/
function () {
  function LayoutEngine() {
    _classCallCheck(this, LayoutEngine);

    this.gridLayoutEngine = _grid__WEBPACK_IMPORTED_MODULE_2__["computeGridLayout"];
  }

  _createClass(LayoutEngine, [{
    key: "compute",
    value: function compute(domTree) {
      switch (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDisplayProperty"])(domTree)) {
        case _utils_constants__WEBPACK_IMPORTED_MODULE_1__["DISPLAY_GRID"]:
          return this.gridLayoutEngine(domTree);

        case _utils_constants__WEBPACK_IMPORTED_MODULE_1__["DISPLAY_FLEX"]:
          return this.gridLayoutEngine(domTree);

        default:
          // Probably throw unsupported error?
          return this.gridLayoutEngine(domTree);
      }
    }
  }]);

  return LayoutEngine;
}();
/**
 * Public API used externally to provide input to layout engine
 *
 * @param {Object} domTree Object containing the layout node information
 */


var computeLayout = function computeLayout(domTree) {
  var faber = new LayoutEngine();
  var clonedDomTree = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["cloneObject"])(domTree),
      calculatedTree;
  clonedDomTree.root = true;
  calculatedTree = faber.compute(clonedDomTree);
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attachLayoutInformation"])(domTree, calculatedTree);
  return domTree;
};



/***/ }),

/***/ "./src/grid/helpers/repeatResolver.js":
/*!********************************************!*\
  !*** ./src/grid/helpers/repeatResolver.js ***!
  \********************************************/
/*! exports provided: repeatResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeatResolver", function() { return repeatResolver; });
/**
 * Resolve repeat configurations if provided in gridTemplateRows or gridTemplateColumns.
 * Based on the size provided by the parent, this method re-defines the gridTemplateRows and/or
 * gridTemplateColumns attributes of the grid container.
 *
 * @param   {Object} domTree
 *          Object representing the node. The value of gridTemplateColumns and gridTemplateRows are taken from the style
 *          object of node
 * @param   {Object} parentInfo
 *          Object containing the following properties
 *          {
 *            itemWidth: width of item
 *            width: width of track
 *          }
 * @returns {Object}
 *          {
 *            gridTemplateColumns: resolved gridTemplateColumns
 *            gridTemplateRows: resolved gridTemplateRows
 *          }
 */
function repeatResolver(domTree, parentInfo) {
  var children = domTree.children,
      rowWidth = 0,
      numOfRows,
      itemInARow = 0,
      repeatStyle = 'auto-fit',
      newGridTemplateColumns = '',
      newGridTemplateRows = '',
      i,
      len,
      height = 0,
      itemWidth = parentInfo.itemWidth,
      width = parentInfo.width;
  width = isNaN(+width) ? 0 : +width;
  children.forEach(function (child) {
    return height = Math.max(height, +child.style.height || 0);
  }); // [repeatStyle, itemWidth] = parseRepeatFunction(gridTemplateColumns);

  itemWidth = +itemWidth;

  if (repeatStyle === 'auto-fit') {
    rowWidth += itemWidth;
    newGridTemplateColumns += itemWidth + ' ';
    itemInARow = 1;

    for (i = 1, len = children.length; i < len; i++) {
      if (rowWidth + itemWidth > width) {
        break;
      }

      rowWidth += itemWidth;
      newGridTemplateColumns += itemWidth + ' ';
    }

    itemInARow = i;
    numOfRows = Math.ceil(len / itemInARow);

    while (numOfRows--) {
      newGridTemplateRows += height + ' ';
    }
  }

  return {
    gridTemplateColumns: newGridTemplateColumns.trim(),
    gridTemplateRows: newGridTemplateRows.trim()
  };
}



/***/ }),

/***/ "./src/grid/index.js":
/*!***************************!*\
  !*** ./src/grid/index.js ***!
  \***************************/
/*! exports provided: computeGridLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeGridLayout", function() { return computeGridLayout; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _track_sizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./track-sizing */ "./src/grid/track-sizing.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _helpers_repeatResolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/repeatResolver */ "./src/grid/helpers/repeatResolver.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var validSizes = ['auto', 'none'],
    minmaxRegex = /minmax/,
    // repeatFunctionRegex = /repeat\(/g,
// templateSplitRegex = /\s(\[.*\])*(\(.*\))*/g,
templateSplitRegex = /(?:[^\s[\]()]+|\[[^[\]]*\]|\([^()]*\))+/g,
    getUCFirstString = function getUCFirstString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    validNestedGrid = function validNestedGrid(tree) {
  var _ref = tree.style || {},
      gridTemplateColumns = _ref.gridTemplateColumns,
      gridTemplateRows = _ref.gridTemplateRows;

  if (/repeat\(/g.test(gridTemplateColumns) || /repeat\(/g.test(gridTemplateRows)) {
    return false;
  }

  return true;
},
    parseRepeatFunction = function parseRepeatFunction(repeatStr) {
  return repeatStr.split(/\(|\)/g)[1].split(',').map(function (arg) {
    return arg && arg.trim();
  });
},
    getCleanSize = function getCleanSize(size) {
  size = size.trim();
  if (size === 'auto') return size;
  if (!isNaN(+size)) return +size;

  if (minmaxRegex.test(size)) {
    var sizeAr = size.split(/\(|\)/g)[1].split(',');
    return [sizeAr[0].trim(), sizeAr[1].trim()];
  }

  return size;
},
    getItemSize = function getItemSize(items, dimension) {
  var filteredItems,
      templateCol,
      parsedDim = getUCFirstString(dimension),
      size,
      trackDir = dimension === 'width' ? 'col' : 'row';
  filteredItems = items.map(function (item) {
    templateCol = item.style['gridTemplate' + getUCFirstString(trackDir === 'col' ? 'columns' : 'rows')];

    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDisplayProperty"])(item) === 'grid' && /repeat\(/g.test(templateCol)) {
      size = parseRepeatFunction(templateCol)[1];
    } else {
      size = item.style['min' + parsedDim + 'Contribution'] || item.style[dimension] || 'auto';
    }

    return {
      start: item[trackDir + 'Start'],
      end: item[trackDir + 'End'],
      size: size
    };
  });
  return filteredItems;
},
    updateMatrix = function updateMatrix(grid, start, end) {
  var i, j;

  for (i = start.x; i < end.x; i++) {
    for (j = start.y; j < end.y; j++) {
      grid[i][j] = true;
    }
  }
},

/**
* Converts gridColumn and gridRow attribute values into numeric grid lines.
* This function is added to extend support for gridColumn and gridRow properties
*
* @param   {object} itemStyle
*          itemStyle holds the user given style attributes.
* @param   {object} mapping
*          mapping hold the references from grid line names to grid line number
* @returns {object} resolvedItemStyle
*          returns resolvedItemStyle which contains numeric grid lines
*/
resolveItemStyle = function resolveItemStyle(itemStyle, mapping) {
  var gridRowStart = itemStyle.gridRowStart,
      gridRowEnd = itemStyle.gridRowEnd,
      gridColumnStart = itemStyle.gridColumnStart,
      gridColumnEnd = itemStyle.gridColumnEnd;

  if (itemStyle.gridColumn) {
    var _itemStyle$gridColumn = itemStyle.gridColumn.split("/").map(function (line) {
      return line.trim();
    });

    var _itemStyle$gridColumn2 = _slicedToArray(_itemStyle$gridColumn, 2);

    gridColumnStart = _itemStyle$gridColumn2[0];
    gridColumnEnd = _itemStyle$gridColumn2[1];
    gridColumnStart = mapping ? mapping.col.nameToLineMap[gridColumnStart] : 1;

    if (/span\s+\d+/g.test(gridColumnEnd)) {
      gridColumnEnd = gridColumnStart + +gridColumnEnd.match(/span\s+(\d+)/)[1];
    }

    gridColumnEnd = mapping ? mapping.col.nameToLineMap[gridColumnEnd] : 1;
  }

  if (itemStyle.gridRow) {
    var _itemStyle$gridRow$sp = itemStyle.gridRow.split("/").map(function (line) {
      return line.trim();
    });

    var _itemStyle$gridRow$sp2 = _slicedToArray(_itemStyle$gridRow$sp, 2);

    gridRowStart = _itemStyle$gridRow$sp2[0];
    gridRowEnd = _itemStyle$gridRow$sp2[1];
    gridRowStart = mapping ? mapping.row.nameToLineMap[gridRowStart] : 1;

    if (/span\s\d+/g.test(gridRowEnd)) {
      gridRowEnd = gridRowStart + +gridRowEnd.match(/span\s(\d+)/)[1];
    }

    gridRowEnd = mapping ? mapping.row.nameToLineMap[gridRowEnd] : 1;
  }

  return {
    gridRowStart: gridRowStart,
    gridRowEnd: gridRowEnd,
    gridColumnStart: gridColumnStart,
    gridColumnEnd: gridColumnEnd
  };
},

/**
* Extracts maximum number of tracklines required when gridTemplateRows / gridTemplateColumns value is 'none' or not given
*
* @param   {Array} items
*          items holds the list of grid container children.
* @returns {object} 
*          returns maximum number of track lines required
*/
getMaxRowColumn = function getMaxRowColumn(items) {
  var maxRow = 1,
      maxColumn = 1,
      itemStyle;
  items.forEach(function (item) {
    itemStyle = resolveItemStyle(item.style);
    maxColumn = Math.max(isNaN(+itemStyle.gridColumnStart) ? 0 : +itemStyle.gridColumnStart, maxColumn, isNaN(+itemStyle.gridColumnEnd - 1) ? 0 : +itemStyle.gridColumnEnd - 1);
    maxRow = Math.max(isNaN(+itemStyle.gridRowStart) ? 0 : +itemStyle.gridRowStart, maxRow, isNaN(+itemStyle.gridRowEnd - 1) ? 0 : +itemStyle.gridRowEnd - 1);
  });
  return {
    maxRow: maxRow,
    maxColumn: maxColumn
  };
};

var Grid =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of Grid. Initializes the props and _config object.
   * @memberof Grid
   */
  function Grid() {
    _classCallCheck(this, Grid);

    this.setup();
  }
  /**
   * Initializes _config, props objects. Also initializes and stores a new instance of TrackResolver.
   *
   * @returns {Grid}
   *          Reference of the class instance.
   * @memberof Grid
   */


  _createClass(Grid, [{
    key: "setup",
    value: function setup() {
      this._tsa = new _track_sizing__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.props = {};
      this._config = {
        mapping: {}
      };
      return this;
    }
    /**
     * Setter method to set props.
     *
     * @param   {string} key
     *          key represents the name by which the value is to be stored in props object.
     * @param   {any} value
     *          value is the information(can be anything) that has to be stored against the key.
     * @returns {Grid}
     *          Reference of the class instance.
     * @memberof Grid
     */

  }, {
    key: "set",
    value: function set(key, value) {
      this.props[key] = value;
      return this;
    }
    /**
     * Getter method to fetch props.
     *
     * @param   {string} key
     *          key of the value which has to be fetched.
     * @returns {any}
     *          value corresponding to the key in props object
     * @memberof Grid
     */

  }, {
    key: "getProps",
    value: function getProps(key) {
      return this.props[key];
    }
    /**
     * Getter method to fetch config.
     *
     * @param   {string} key
     *          key of the value which has to be fetched.
     * @returns {any}
     *          alue corresponding to the key in _config object
     * @memberof Grid
     */

  }, {
    key: "getConfig",
    value: function getConfig(key) {
      return this._config[key];
    }
    /**
     * compute method is called to calculate the layout. This is the driver API.
     * 1. Tracks(rows and columns) are sanitized. Sanitization of tracks consists of going through the child nodes to get an overall estimate
     *    regarding the number of tracks that are required.
     * 2. Items(child nodes) are sanitized. Any item without any proper gridStart and gridEnd values gets sanitized here.
     * 3. Track solving algrithm is run for both columns and rows to calculate the size each track will get.
     * 4. Once tracks are resolved and all tracks have their size, all the grid items are assigned their width, height, x and y(when applicable)
     *
     * @param {Object} _domTree
     *        Full node tree consisting of grid container and grid items.
     * @memberof Grid
     */

  }, {
    key: "compute",
    value: function compute(_domTree) {
      var domTree = _domTree || this.props.domTree;

      this._sanitizeTracks(domTree)._sanitizeItems(domTree)._inflateTracks()._assignCoordinatesToCells(domTree);
    }
    /**
     * Rows and columns are refered as tracks in css-grid terminology.
     * Track sanitization is required to account for any changes in the number of tracks by considering the grid items.
     * Items are iterated to check if all the times can be accomodated within the user-defined grid cells. If not, tracks will
     * be increased.
     *
     * @param   {Object} [_domTree={}]
     *          Full node tree consisting of grid container and grid items.
     * @returns {Grid}
     *          Reference of the class instance.
     * @memberof Grid
     */

  }, {
    key: "_sanitizeTracks",
    value: function _sanitizeTracks() {
      var _domTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var style = _domTree.style,
          gridTemplateRows = style.gridTemplateRows,
          gridTemplateColumns = style.gridTemplateColumns,
          config = this._config,
          trackInfo,
          _getMaxRowColumn = getMaxRowColumn(_domTree.children),
          maxColumn = _getMaxRowColumn.maxColumn,
          maxRow = _getMaxRowColumn.maxRow;

      this.set('maxTracks', maxRow);
      trackInfo = this._fetchTrackInformation(gridTemplateRows);
      config.mapping.row = {
        nameToLineMap: trackInfo.nameToLineMap,
        lineToNameMap: trackInfo.lineToNameMap
      };
      config.rowTracks = trackInfo.tracks;
      this.set('maxTracks', maxColumn);
      trackInfo = this._fetchTrackInformation(gridTemplateColumns);
      config.mapping.col = {
        nameToLineMap: trackInfo.nameToLineMap,
        lineToNameMap: trackInfo.lineToNameMap
      };
      config.colTracks = trackInfo.tracks;
      return this;
    }
    /**
     * Any track is bounded by two lines, which are called grid lines. A grid line can have multiple names.
     * To make calculations more easier, a map is maintained between line names and line numbers.
     *
     * @param   {string} [tracks='none']
     *          gridTemplateRows or gridTemplateColumns(user provided values)
     * @returns {Object}
     *          tracks: Array of tracks where track has it's start, end and size(provided by user) specified
     *          nameToLineMap: Object where key is the name and the value is the line number
     *          lineToNameMap: Object where key is the number and the value is the name
     * @memberof Grid
     */

  }, {
    key: "_fetchTrackInformation",
    value: function _fetchTrackInformation() {
      var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'none';
      var i,
          len,
          splittedTrackInfo = tracks.match(templateSplitRegex),
          nameList,
          sizeList,
          sanitizedTracks = [{}],
          startLineNames,
          endLineNames,
          nameToLineMap = {},
          lineToNameMap = {};
      nameList = splittedTrackInfo.filter(function (track) {
        if (track && typeof track === 'string' && track.length) {
          len = track.length;

          if (track[0] === '[' && track[len - 1] === ']') {
            return true;
          }

          return false;
        }

        return true;
      });
      sizeList = splittedTrackInfo.filter(function (size) {
        if (!size) return false;
        len = (size + '').toLowerCase().replace(/px|fr/, '');

        if (validSizes.indexOf(len) >= 0 || minmaxRegex.test(len) || !isNaN(len)) {
          return true;
        }

        return false;
      }).map(function (size) {
        return getCleanSize(size);
      });
      len = sizeList.length;

      if (tracks === 'none') {
        len = this.getProps('maxTracks');
      }

      for (i = 0; i < len; i++) {
        startLineNames = nameList[i] && nameList[i].replace(/\[|\]/g, '').split(' ').filter(function (name) {
          return name.length;
        }).map(function (name) {
          return name.trim();
        }) || [i + 1 + ''];
        endLineNames = nameList[i + 1] && nameList[i + 1].replace(/\[|\]/g, '').split(' ').filter(function (name) {
          return name.length;
        }).map(function (name) {
          return name.trim();
        }) || [i + 2 + ''];
        sanitizedTracks.push({
          start: i + 1,
          end: i + 2,
          size: sizeList[i] || 'auto'
        }); // A line can have multiple names but a name can only be assigned to a single line

        lineToNameMap[i + 1] = startLineNames;
        lineToNameMap[i + 2] = endLineNames;
        startLineNames.forEach(function (name) {
          return nameToLineMap[name] = i + 1;
        });
        endLineNames.forEach(function (name) {
          return nameToLineMap[name] = i + 2;
        });
        nameToLineMap[i + 1] = i + 1;
        nameToLineMap[i + 2] = i + 2;
      }

      return {
        tracks: sanitizedTracks,
        nameToLineMap: nameToLineMap,
        lineToNameMap: lineToNameMap
      };
    }
    /**
     * Sanitization of grid items. The gridRowStart and gridColumnStart values are replaced by the line numbers. Also,
     * if any item do not have any gridRowStart and/or gridColumnEnd values mentioned, they are placed accordingly in
     * empty cells in rowwise or columnwise manner, based on the value of gridAutoFlow.
     *
     * @param   {Object} _domTree
     *          Full node tree consisting of grid container and grid items.
     * @returns {Grid}
     *          Reference of the class instance.
     * @memberof Grid
     */

  }, {
    key: "_sanitizeItems",
    value: function _sanitizeItems(_domTree) {
      var domTree = _domTree || this.props.domTree,
          items = domTree.children || [],
          mapping = this._config.mapping,
          gridAutoFlow = domTree.style.gridAutoFlow || 'row',
          rowNum = Object.keys(mapping.row.lineToNameMap).length,
          colNum = Object.keys(mapping.col.lineToNameMap).length,
          sanitizedItems = [],
          autoFlowItems = [],
          itemStyle,
          gridMatrix = [[]],
          freeCells = [],
          cell,
          item,
          extraRows,
          i,
          j,
          len;

      for (i = 1; i <= rowNum; i++) {
        gridMatrix.push([]);
      }

      for (i = 0, len = items.length; i < len; i++) {
        itemStyle = resolveItemStyle(items[i].style, mapping);
        sanitizedItems.push(_objectSpread({}, items[i], {
          rowStart: mapping.row.nameToLineMap[itemStyle.gridRowStart],
          rowEnd: mapping.row.nameToLineMap[itemStyle.gridRowEnd],
          colStart: mapping.col.nameToLineMap[itemStyle.gridColumnStart],
          colEnd: mapping.col.nameToLineMap[itemStyle.gridColumnEnd]
        }));
        item = sanitizedItems[i];
        updateMatrix(gridMatrix, {
          x: item.rowStart,
          y: item.colStart
        }, {
          x: item.rowEnd,
          y: item.colEnd
        });
      }

      autoFlowItems = sanitizedItems.filter(function (sanitizedItem) {
        return !sanitizedItem.colStart || !sanitizedItem.rowStart;
      });
      /**
       * @todo: Scope to improve code here.
       */

      if (autoFlowItems) {
        if (gridAutoFlow === 'row') {
          for (i = 1; i < rowNum; i++) {
            for (j = 1; j < colNum; j++) {
              if (!gridMatrix[i][j]) {
                freeCells.push({
                  row: i,
                  col: j
                });
              }
            }
          }

          while (autoFlowItems.length && freeCells.length) {
            item = autoFlowItems.shift();
            cell = freeCells.shift();
            item.rowStart = cell.row;
            item.colStart = cell.col;
            item.rowEnd = cell.row + 1;
            item.colEnd = cell.col + 1;
          }

          extraRows = Math.ceil(autoFlowItems.length / colNum);

          if (extraRows) {
            while (extraRows--) {
              domTree.style.gridTemplateRows += 'auto ';
              mapping.row.nameToLineMap[rowNum + 1] = rowNum + 1;
              mapping.row.nameToLineMap[rowNum + 2] = rowNum + 2;
              rowNum++;
              gridMatrix.push([]);
            }

            domTree.style.gridTemplateRows = domTree.style.gridTemplateRows.trim();
            freeCells = [];

            for (i = 1; i <= rowNum; i++) {
              for (j = 1; j <= colNum; j++) {
                if (!gridMatrix[i][j]) {
                  freeCells.push({
                    row: i,
                    col: j
                  });
                }
              }
            }

            while (autoFlowItems.length) {
              item = autoFlowItems.shift();
              cell = freeCells.shift();
              item.rowStart = cell.row;
              item.colStart = cell.col;
              item.rowEnd = cell.row + 1;
              item.colEnd = cell.col + 1;
            }
          }
        }
      }

      this._config.sanitizedItems = sanitizedItems;
      return this;
    }
    /**
     * Track solving algorithm is used to calculate the size of each track. First the column tracks are resolved, then the
     * row tracks. For track solving algorithm to run, it is important to resolve all the nested grids. Solving the nested
     * grids allows to consider their min-content contribution while solving tracks of parent grid.
     *
     * An exception arises if a nested grid has repeat in either of the gridTemplateColumns or gridTemplateRows property.
     * In that case, the nested grid is solved once the column tracks of the parent grid is solved.
     *
     * @returns {Grid}
     *          Reference of the class instance.
     * @memberof Grid
     */

  }, {
    key: "_inflateTracks",
    value: function _inflateTracks() {
      var _this$_config = this._config,
          sanitizedItems = _this$_config.sanitizedItems,
          colTracks = _this$_config.colTracks,
          rowTracks = _this$_config.rowTracks,
          sizedTracks,
          minHeightContribution = 0,
          minWidthContribution = 0,
          domTree = this.props.domTree,
          _ref2 = domTree.style || {},
          paddingStart = _ref2.paddingStart,
          paddingEnd = _ref2.paddingEnd,
          paddingTop = _ref2.paddingTop,
          paddingBottom = _ref2.paddingBottom,
          width = _ref2.width,
          height = _ref2.height,
          tsa = new _track_sizing__WEBPACK_IMPORTED_MODULE_1__["default"]();

      if (!isNaN(+width)) {
        width -= paddingStart + paddingEnd;
      }

      sizedTracks = tsa.clear().set('tracks', colTracks).set('items', getItemSize(sanitizedItems, 'width')).set('containerSize', width || 'auto').resolveTracks();
      colTracks.forEach(function (track, index) {
        track.calculatedStyle = sizedTracks[index];
        minWidthContribution += sizedTracks[index].baseSize || 0;
      });

      this._solveUnresolvedChildren();

      if (!isNaN(+height)) {
        height -= paddingTop + paddingBottom;
      }

      sizedTracks = tsa.clear().set('tracks', rowTracks).set('items', getItemSize(sanitizedItems, 'height')).set('containerSize', height || 'auto').resolveTracks();
      rowTracks.forEach(function (track, index) {
        track.calculatedStyle = sizedTracks[index];
        minHeightContribution += sizedTracks[index].baseSize || 0;
      });
      domTree.style.minHeightContribution = minHeightContribution;
      domTree.style.minWidthContribution = minWidthContribution;
      return this;
    }
    /**
     * The grid items which are also grid containers(nested grids) and has repeat() configuration in either of
     * gridTenplateColumns or gridTemplateRows attribute are solved after the column tracks of the parents are solved.
     *
     * @param   {Object} _domTree
     *          Full node tree consisting of grid container and grid items.
     * @returns {Grid}
     *          Reference of the class instance.
     * @memberof Grid
     */

  }, {
    key: "_solveUnresolvedChildren",
    value: function _solveUnresolvedChildren(_domTree) {
      var domTree = _domTree || this.props.domTree,
          childrenWithRepeatConfiguration = (domTree.unResolvedChildren || []).filter(function (child) {
        return /repeat\(/g.test(child.style.gridTemplateColumns) || /repeat\(/g.test(child.style.gridTemplateRows);
      }),
          _this$_config2 = this._config,
          colTracks = _this$_config2.colTracks,
          mapping = _this$_config2.mapping,
          parentReference = this.getProps('parent'),
          colTrackDp = [0],
          resolvedTracks,
          i,
          len,
          trackWidth,
          parentInfo,
          parsedWidthOfItem,
          colStart,
          colEnd;

      if (!childrenWithRepeatConfiguration.length) {
        return this;
      }

      for (i = 1, len = colTracks.length; i < len; i++) {
        colTrackDp[i] = colTrackDp[i - 1] + colTracks[i].calculatedStyle.baseSize;
      }

      childrenWithRepeatConfiguration.forEach(function (child) {
        // if (repeatFunctionRegex.test(child.style.gridTemplateColumns)) {
        parsedWidthOfItem = parseRepeatFunction(child.style.gridTemplateColumns)[1];
        colStart = mapping.col.nameToLineMap[child.style.gridColumnStart];
        colEnd = mapping.col.nameToLineMap[child.style.gridColumnEnd];
        trackWidth = colTrackDp[colEnd - 1] - colTrackDp[colStart - 1];
        parentInfo = {
          itemWidth: parsedWidthOfItem,
          width: trackWidth
        };
        resolvedTracks = Object(_helpers_repeatResolver__WEBPACK_IMPORTED_MODULE_3__["repeatResolver"])(child, parentInfo);
        child.style.gridTemplateColumns = resolvedTracks.gridTemplateColumns;
        child.style.gridTemplateRows = resolvedTracks.gridTemplateRows;
        parentReference.gridLayoutEngine(child); // }
      });
      return this;
    }
    /**
     * After the grid is resolved, the items and the container should receive their dimensions(width, height) and positions(x, y).
     * This values are calculated after considering the justifyItem and alignItem attributes.
     *
     * @param {Object} _domTree
     * @memberof Grid
     */

  }, {
    key: "_assignCoordinatesToCells",
    value: function _assignCoordinatesToCells(_domTree) {
      var domTree = _domTree || this.props.domTree,
          _this$_config3 = this._config,
          sanitizedItems = _this$_config3.sanitizedItems,
          rowTracks = _this$_config3.rowTracks,
          colTracks = _this$_config3.colTracks,
          item,
          len,
          i,
          _domTree$style = domTree.style,
          justifyItems = _domTree$style.justifyItems,
          alignItems = _domTree$style.alignItems,
          paddingStart = _domTree$style.paddingStart,
          paddingTop = _domTree$style.paddingTop,
          trackWidth,
          trackHeight,
          width,
          height,
          x,
          y,
          rowTrackdp = [paddingStart],
          colTrackdp = [paddingTop];

      for (i = 1, len = rowTracks.length; i < len; i++) {
        rowTrackdp[i] = rowTrackdp[i - 1] + rowTracks[i].calculatedStyle.baseSize;
      }

      for (i = 1, len = colTracks.length; i < len; i++) {
        colTrackdp[i] = colTrackdp[i - 1] + colTracks[i].calculatedStyle.baseSize;
      }

      domTree.layout = {
        x: 0,
        y: 0,
        width: isNaN(domTree.style.width) ? colTrackdp[colTrackdp.length - 1] : domTree.style.width,
        height: isNaN(domTree.style.height) ? rowTrackdp[rowTrackdp.length - 1] : domTree.style.height
      };
      (domTree.children || []).forEach(function (child, index) {
        item = sanitizedItems[index];
        trackWidth = colTrackdp[item.colEnd - 1] - colTrackdp[item.colStart - 1];
        trackHeight = rowTrackdp[item.rowEnd - 1] - rowTrackdp[item.rowStart - 1];
        width = isNaN(+child.style.width) ? trackWidth : +child.style.width;
        height = isNaN(+child.style.height) ? trackHeight : +child.style.height;

        switch (justifyItems || child.style.justifySelf) {
          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["CENTER"]:
            x = colTrackdp[item.colStart - 1] + trackWidth / 2 - width / 2;
            break;

          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["END"]:
            x = colTrackdp[item.colEnd - 1] - width;
            break;

          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["STRETCH"]:
            width = trackWidth;
            x = colTrackdp[item.colStart - 1];
            break;

          default:
            x = colTrackdp[item.colStart - 1];
        }

        switch (alignItems || child.style.alignSelf) {
          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["CENTER"]:
            y = rowTrackdp[item.rowStart - 1] + trackHeight / 2 - height / 2;
            break;

          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["END"]:
            y = rowTrackdp[item.rowEnd - 1] - height;
            break;

          case _utils_constants__WEBPACK_IMPORTED_MODULE_2__["STRETCH"]:
            height = trackHeight;
            y = rowTrackdp[item.rowStart - 1];
            break;

          default:
            y = rowTrackdp[item.rowStart - 1];
        }

        x += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pluckNumber"])(item.style.paddingStart, item.style.padding, 0);
        y += Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pluckNumber"])(item.style.paddingTop, item.style.padding, 0);
        child.layout = {
          x: x,
          y: y,
          x2: x + width,
          y2: y + height,
          width: width,
          height: height
        };
      });
      return this;
    }
  }]);

  return Grid;
}();

var replaceWithAbsValue = function replaceWithAbsValue() {
  var styleTrack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var calculatedTrack = arguments.length > 1 ? arguments[1] : undefined;
  var trackSplitAr = (styleTrack.match(templateSplitRegex) || []).filter(function (track) {
    return track && !!track.trim();
  }),
      trackWithAbsValue = '',
      counter = 1;

  if (trackSplitAr.length && !/repeat\(/.test(styleTrack)) {
    trackSplitAr.forEach(function (track) {
      if (validSizes.indexOf(track) > -1 || /[0-9]fr/.test(track) || minmaxRegex.test(track) || !isNaN(track)) {
        trackWithAbsValue += calculatedTrack[counter].calculatedStyle.baseSize + ' ';
        counter++;
      } else {
        trackWithAbsValue += track + ' ';
      }
    });
  } else {
    calculatedTrack.forEach(function (track) {
      if (isNaN(track.calculatedStyle.baseSize)) return;
      trackWithAbsValue += track.calculatedStyle.baseSize + ' ';
    });
  }

  return trackWithAbsValue.trim();
},
    updateDomTreeWithResolvedValues = function updateDomTreeWithResolvedValues(domTree, grid) {
  var containerStyle = domTree.style,
      rowTracks = grid.getConfig('rowTracks'),
      colTracks = grid.getConfig('colTracks'),
      mapping = grid.getConfig('mapping'),
      gridTemplateRows = containerStyle.gridTemplateRows,
      gridTemplateColumns = containerStyle.gridTemplateColumns,
      child,
      i,
      j,
      len,
      rowTrackSum,
      colTrackSum,
      rowStart,
      rowEnd,
      colStart,
      colEnd;
  domTree.style.gridTemplateRows = replaceWithAbsValue(gridTemplateRows, rowTracks);
  domTree.style.gridTemplateColumns = replaceWithAbsValue(gridTemplateColumns, colTracks);

  for (i = 0, len = (domTree.children || []).length; i < len; i++) {
    child = domTree.children[i];

    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDisplayProperty"])(child)) {
      child.style.gridTemplateColumns = child.userGivenStyles.gridTemplateColumns;
      child.style.gridTemplateRows = child.userGivenStyles.gridTemplateRows;

      if (isNaN(child.userGivenStyles.width)) {
        colStart = child.style.gridColumnStart;
        colEnd = child.style.gridColumnEnd;
        colStart = mapping.col.nameToLineMap[colStart];
        colEnd = mapping.col.nameToLineMap[colEnd];

        for (j = colStart, colTrackSum = 0; j < colEnd; j++) {
          colTrackSum += colTracks[j].calculatedStyle.baseSize;
        }

        child.style.width = colTrackSum;
      }

      if (isNaN(child.userGivenStyles.height)) {
        rowStart = child.style.gridRowStart;
        rowEnd = child.style.gridRowEnd;
        rowStart = mapping.row.nameToLineMap[rowStart];
        rowEnd = mapping.row.nameToLineMap[rowEnd];

        for (j = rowStart, rowTrackSum = 0; j < rowEnd; j++) {
          rowTrackSum += rowTracks[j].calculatedStyle.baseSize;
        }

        child.style.height = rowTrackSum;
      }
    }
  }

  return domTree;
};

function computeGridLayout(domTree) {
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var i,
      len,
      style = domTree.style,
      child,
      grid;

  if (!domTree || !domTree.style) {
    return;
  }

  if (!domTree.userGivenStyles) {
    domTree.style.width = isNaN(domTree.style.width) ? 'auto' : domTree.style.width;
    domTree.style.height = isNaN(domTree.style.height) ? 'auto' : domTree.style.height;
    style.paddingStart = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pluckNumber"])(style.paddingStart, style.padding, 0);
    style.paddingEnd = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pluckNumber"])(style.paddingEnd, style.padding, 0);
    style.paddingTop = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pluckNumber"])(style.paddingTop, style.padding, 0);
    style.paddingBottom = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pluckNumber"])(style.paddingBottom, style.padding, 0);
    domTree.userGivenStyles = {
      gridTemplateColumns: domTree.style.gridTemplateColumns,
      gridTemplateRows: domTree.style.gridTemplateRows,
      width: domTree.style.width,
      height: domTree.style.height
    };
  }

  domTree.unResolvedChildren = [];

  for (i = 0, len = domTree.children && domTree.children.length; i < len; i++) {
    child = domTree.children[i];

    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDisplayProperty"])(child)) {
      if (validNestedGrid(child)) {
        this.compute(child);
      } else {
        domTree.unResolvedChildren.push(child);
      }
    }
  }

  grid = new Grid();
  grid.set('domTree', domTree).set('parent', this).compute();

  if (count < 2) {
    this.gridLayoutEngine(updateDomTreeWithResolvedValues(domTree, grid), 2);
  }

  return domTree;
}



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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getMultiplierOfFr = function getMultiplierOfFr(size) {
  return +size.replace(/fr/, '');
},

/**
 * Helper function to distribute extra space among all the flexible tracks.
 */
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

/**
 * Helper function to distribute extra space among all the intrinsic tracks.
 */
_intrinsicSpaceDistributorHelper = function _intrinsicSpaceDistributorHelper(tracks, totalSpaceUsed, containerSize) {
  var freeSpace,
      spacePerIntrinsicTrack,
      i,
      len,
      frozenTrack = 0,
      minMaxTracks,
      growthLimit,
      baseSize;

  if (!tracks.length) {
    return;
  }

  minMaxTracks = tracks.filter(function (track) {
    return track.type === 'minmax' && track.growthLimit !== Infinity;
  });
  freeSpace = containerSize - totalSpaceUsed;
  minMaxTracks.sort(function (a, b) {
    var gap1 = a.growthLimit - a.baseSize,
        gap2 = b.growthLimit - b.baseSize;
    return gap1 - gap2;
  });
  len = minMaxTracks.length;

  while (frozenTrack < len && freeSpace) {
    spacePerIntrinsicTrack = freeSpace / (minMaxTracks.length - frozenTrack || 1);
    /**
     * @todo: remove the frozen tracks.
     */

    for (i = 0, len = minMaxTracks.length; i < len; i++) {
      growthLimit = minMaxTracks[i].growthLimit;
      baseSize = Math.min(spacePerIntrinsicTrack + minMaxTracks[i].baseSize, growthLimit);
      freeSpace -= baseSize - minMaxTracks[i].baseSize;
      minMaxTracks[i].baseSize = baseSize;

      if (growthLimit === baseSize && !minMaxTracks[i].frozen) {
        minMaxTracks[i].frozen = true;
        frozenTrack++;
      }
    }
  }

  tracks = tracks.filter(function (track) {
    return track.type === 'minmax' && track.growthLimit === Infinity || track.type !== 'minmax';
  });
  spacePerIntrinsicTrack = freeSpace / tracks.length;
  tracks.forEach(function (track) {
    return track.baseSize += spacePerIntrinsicTrack;
  });
};
/**
 * TrackResolver implements the standard track solving algorithm of CSS grid.
 * Refer https://www.w3.org/TR/css-grid-1/#algo-track-sizing
 *
 * @class TrackResolver
 */


var TrackResolver =
/*#__PURE__*/
function () {
  function TrackResolver() {
    var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var containerSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;

    _classCallCheck(this, TrackResolver);

    this.clear();
    this.set('tracks', tracks);
    this.set('items', items);
    this.set('containerSize', containerSize);
    return this;
  }
  /**
   * setter method to set props
   *
   * @param   {string} key
   *          key represents the name by which the value is to be stored in props object.
   * @param   {any} info
   *          info is the information(can be anything) that has to be stored against the key.
   * @returns {TrackResolver}
   *          Reference of the class instance.
   * @memberof TrackResolver
   */


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

        case 'containerSize':
          this.props[key] = isNaN(+info) ? 0 : +info;
      }

      return this;
    }
    /**
     * Getter method to fetch the props
     *
     * @param   {string} key
     *          key of the value which has to be fetched.
     * @returns {any}
     *          alue corresponding to the key in props object
     * @memberof TrackResolver
     */

  }, {
    key: "get",
    value: function get(key) {
      return this.props[key];
    }
    /**
     * Initializes the tracks. Both rows and columns in grid are tracks in TrackResolver.
     * Each track is assigned a baseSize and growthLimit. BaseSize is the minimum size that a track can take,
     * while growthLimit is the max size.
     *
     * Terminology:
     * FrTracks: Tracks which have a size definition in terms of fr(free space)
     * Intrinsic Tracks: Tracks which have a size definition of auto.
     *
     * @param   {Array} _tracks
     *          Array containing information about the tracks.
     * @returns {Array}
     *          Array of sanitized tracks. A sanitized track consists of the following information
     *          {
     *              type: minmax | fixed | flex | intrinsic
     *                    minmax: track has size definition in minmax format
     *                    fixed: a fixed numeric value is provided as size definition
     *                    flex: size definition is provided in terms of fr
     *                    intrinsic: auto size definition
     *              multiplier: Prefix of fr(2 in case of 2fr). default 1.
     *              baseSize: lower size limit of track.
     *              growthLimit: upper size limit of track.
     *          }
     * @memberof TrackResolver
     */

  }, {
    key: "_initTrackSize",
    value: function _initTrackSize(_tracks) {
      var tracks = _tracks || this.props.tracks || [],
          config = this._config,
          trackAr = [{}],
          i,
          len,
          size,
          type,
          multiplier,
          baseSize,
          growthLimit;
      config.frTracks = [];
      config.intrinsicTracks = [];

      for (i = 1, len = tracks.length; i < len; i++) {
        size = tracks[i].size;
        multiplier = 1;

        if (Array.isArray(size)) {
          baseSize = +size[0] || 0;

          if (size[1].indexOf('fr') > 0 || size[0].indexOf('fr') > 0) {
            growthLimit = Infinity;
            config.frTracks.push(i);
            type = 'minmax';
          } else if (size[1] === 'auto' || size[0] === 'auto') {
            growthLimit = Infinity;
            config.intrinsicTracks.push(i);
            type = 'minmax';
          } else if (!isNaN(+size[0]) && !isNaN(+size[1])) {
            growthLimit = Math.max(+size[0], +size[1]);
            baseSize = Math.min(+size[0], +size[1]);
            config.intrinsicTracks.push(i);
            type = 'minmax';
          }
        } else if (!isNaN(+size)) {
          baseSize = growthLimit = +size;
          type = 'fixed';
        } else if (size.indexOf('fr') > 0) {
          baseSize = 0;
          growthLimit = Infinity;
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
    /**
     * The size of grid items are sanitized in this method. In case the items do not have a valid size, they
     * take up size of the tracks
     *
     * @param   {Array} _items
     *          Array of grid items
     * @returns {Array}
     *          Array of items where each item has valid size
     * @memberof TrackResolver
     */

  }, {
    key: "_initItems",
    value: function _initItems(_items) {
      var items = _items || this.props.items || [],
          config = this._config,
          sanitizedItems = [],
          nonSpanningItemStartIndex,
          item,
          validItems = 0,
          i,
          len;

      for (i = 0, len = items.length; i < len; i++) {
        if (isNaN(items[i].start) || isNaN(items[i].end)) {
          config.autoFlow.push(items[i]);
          continue;
        }

        sanitizedItems.push(_objectSpread({}, items[i]));
        item = sanitizedItems[validItems];
        validItems++;
        item.size = isNaN(item.size) ? this._getParentSize(item) : +item.size;
      }

      sanitizedItems.sort(function (a, b) {
        var gap1 = a.end - a.start,
            gap2 = b.end - b.start;

        if (gap1 === gap2) {
          return a.start - b.start;
        } else {
          return gap1 - gap2;
        }
      });

      for (i = 0, nonSpanningItemStartIndex = len = sanitizedItems.length; i < len; i++) {
        if (sanitizedItems[i].end - sanitizedItems[i].start > 1) {
          nonSpanningItemStartIndex = i;
          break;
        }
      }

      this._config.nonSpanningItemStartIndex = nonSpanningItemStartIndex;
      return this._config.sanitizedItems = sanitizedItems;
    }
    /**
     * If any grid item do not have a valid size, then it takes up the size of the track.
     *
     * @param   {Object} item
     *          The item which do not have a proper size and will take up the size of the track.
     * @returns {number}
     *          size of the track(s) which will be assigned to the grid item.
     * @memberof TrackResolver
     */

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
    /**
     * resolveTracks method is called to resolve the tracks.
     *
     * Terminology:
     * Non-spanning items - items which is contained in a single track.
     * Spanning items -  items which is spread across multiple tracks.
     *
     * 1. At first all the non-spanning items are placed. The tracks containing non-spanning gets a minimum size.
     * 2. Then the spanning items are placed. If total size of all the tracks over which the spanning items are spread is less than
     *  the size of the spanning items, then the extra space required by the item is accomodated equally by the non-fixed tracks.
     * 3. Afer all the items are placed, if any free space remains, they get distributed among the non-fixed tracks.
     *
     * @returns {Array}
     *          Array of objects where each object is a track with resolved size.
     * @memberof TrackResolver
     */

  }, {
    key: "resolveTracks",
    value: function resolveTracks() {
      this._placeNonSpanningItems()._placeSpanningItems()._distributeFreeSpace();

      return this._config.sanitizedTracks;
    }
    /**
     * Placing a non-spanning item. After placing the item if the containing track has a non-fixed size, it is increased to
     * accomodate the item.
     *
     * @returns {TrackResolver}
     *          Reference of the class instance.
     * @memberof TrackResolver
     */

  }, {
    key: "_placeNonSpanningItems",
    value: function _placeNonSpanningItems() {
      var _this$_config = this._config,
          sanitizedItems = _this$_config.sanitizedItems,
          sanitizedTracks = _this$_config.sanitizedTracks,
          nonSpanningItemStartIndex = _this$_config.nonSpanningItemStartIndex,
          nonSpanningItems = sanitizedItems.slice(0, nonSpanningItemStartIndex),
          track,
          trackIndex;
      nonSpanningItems.forEach(function (item) {
        trackIndex = item.start;
        track = sanitizedTracks[trackIndex];

        if (track.type !== 'fixed') {
          track.baseSize = Math.max(track.baseSize, item.size);
          track.growthLimit = Math.max(track.growthLimit, track.baseSize);
        }
      });
      return this;
    }
    /**
     * Place the non-spanning items. If the total size of all tracks on which the item is spread is less than
     * the size of the item, then the extra size required is accomodated by equally increasing the size of
     * all the non-fixed containing tracks.
     *
     * @returns {TrackResolver}
     *          Reference of the class instance.
     * @memberof TrackResolver
     */

  }, {
    key: "_placeSpanningItems",
    value: function _placeSpanningItems() {
      var _this$_config2 = this._config,
          sanitizedItems = _this$_config2.sanitizedItems,
          sanitizedTracks = _this$_config2.sanitizedTracks,
          nonSpanningItemStartIndex = _this$_config2.nonSpanningItemStartIndex,
          frTracks = _this$_config2.frTracks,
          spanningItems = sanitizedItems.slice(nonSpanningItemStartIndex),
          trackSizedp = [0],
          sizeConsumed,
          sizeLeft,
          sizePerTrack,
          availableTracks,
          hasFrTrack,
          i,
          len;
      if (!spanningItems.length) return this;

      for (i = 1, len = sanitizedTracks.length; i < len; i++) {
        trackSizedp[i] = trackSizedp[i - 1] + (sanitizedTracks[i].baseSize || 0);
      }

      spanningItems.forEach(function (item) {
        sizeConsumed = trackSizedp[item.end - 1] - trackSizedp[item.start - 1];
        sizeLeft = Math.max(0, item.size - sizeConsumed);
        if (!sizeLeft) return;

        for (i = item.start, hasFrTrack = false, availableTracks = 0; i < item.end; i++) {
          if (frTracks.indexOf(i) >= 0) {
            hasFrTrack = true;
          }

          if (sanitizedTracks[i].type !== 'fixed') {
            availableTracks++;
          }
        }

        if (!availableTracks || hasFrTrack) return;
        sizePerTrack = sizeLeft / availableTracks;

        for (i = item.start; i < item.end; i++) {
          if (sanitizedTracks[i].type !== 'fixed') {
            sanitizedTracks[i].baseSize += sizePerTrack;
          }
        }
      });
      return this;
    }
    /**
     * After all the items are placed and if any free space remains, it is distributed among the tracks.
     * Distribution strategy depends on the track configurations.
     * If there are tracks with flexible size
     * definition(fr), then all the free space is allocated to those tracks.
     * If there are no tracks with flexible size definiton, then the free space is distributed
     * evenly among the intrinsic tracks.
     * If all the tracks are fixed(ie, have fixed size), then the free space is not distributed.
     *
     * @returns {TrackResolver}
     *          Reference of the class instance.
     * @memberof TrackResolver
     */

  }, {
    key: "_distributeFreeSpace",
    value: function _distributeFreeSpace() {
      var _this$_config3 = this._config,
          frTracks = _this$_config3.frTracks,
          intrinsicTracks = _this$_config3.intrinsicTracks,
          sanitizedTracks = _this$_config3.sanitizedTracks,
          containerSize = this.props.containerSize,
          totalSpaceUsed = 0;
      sanitizedTracks.forEach(function (track) {
        return totalSpaceUsed += track.baseSize || 0;
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
    /**
     * clears the props and configuration of TrackResolver. This method is called before using
     * TrackResolver with different set of input.
     *
     * @returns {TrackResolver}
     *          Reference of the class instance.
     * @memberof TrackResolver
     */

  }, {
    key: "clear",
    value: function clear() {
      this.props = {};
      this._config = {
        frTracks: [],
        intrinsicTracks: [],
        autoFlow: []
      };
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
/* harmony import */ var _faber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./faber */ "./src/faber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "computeLayout", function() { return _faber__WEBPACK_IMPORTED_MODULE_0__["computeLayout"]; });




/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: DISPLAY_GRID, DISPLAY_FLEX, CENTER, START, END, STRETCH, ATOMIC_DATA_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_GRID", function() { return DISPLAY_GRID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_FLEX", function() { return DISPLAY_FLEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CENTER", function() { return CENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START", function() { return START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "END", function() { return END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRETCH", function() { return STRETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATOMIC_DATA_TYPE", function() { return ATOMIC_DATA_TYPE; });
var DISPLAY_GRID = 'grid',
    DISPLAY_FLEX = 'flex',
    CENTER = 'center',
    START = 'start',
    END = 'end',
    STRETCH = 'stretch',
    ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'];


/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: cloneObject, attachLayoutInformation, getDisplayProperty, pluckNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneObject", function() { return cloneObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attachLayoutInformation", function() { return attachLayoutInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDisplayProperty", function() { return getDisplayProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pluckNumber", function() { return pluckNumber; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var UNDEF;

var getDisplayProperty = function getDisplayProperty(domTree) {
  return domTree.style && domTree.style.display;
},
    cloneObject = function cloneObject(arg) {
  if (_constants__WEBPACK_IMPORTED_MODULE_0__["ATOMIC_DATA_TYPE"].indexOf(_typeof(arg)) > -1 || arg === null) {
    return arg;
  }

  if (Array.isArray(arg)) {
    var i,
        len,
        arr = [];

    for (i = 0, len = arg.length; i < len; i++) {
      arr.push(cloneObject(arg[i]));
    }

    return arr;
  } else if (_typeof(arg) === 'object') {
    var cloneObj = {},
        key;

    for (key in arg) {
      cloneObj[key] = cloneObject(arg[key]);
    }

    return cloneObj;
  }
},
    attachLayoutInformation = function attachLayoutInformation() {
  var baseTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var calculatedTree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var i, len;
  baseTree.layout = calculatedTree.layout;

  for (i = 0, len = (baseTree.children || []).length; i < len; i++) {
    attachLayoutInformation(baseTree.children[i], calculatedTree.children[i]);
  }
},
    pluckNumber = function pluckNumber() {
  var arg, i, l;

  for (i = 0, l = arguments.length; i < l; i += 1) {
    arg = arguments[i];

    if (!arg && arg !== false && arg !== 0) {
      continue;
    } else if (isNaN(arg = Number(arg))) {
      continue;
    }

    return arg;
  }

  return UNDEF;
};



/***/ })

/******/ });
});
//# sourceMappingURL=faber.js.map