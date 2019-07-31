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

/***/ "./src/grid/helpers/repeatResolver.js":
/*!********************************************!*\
  !*** ./src/grid/helpers/repeatResolver.js ***!
  \********************************************/
/*! exports provided: repeatResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeatResolver", function() { return repeatResolver; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var repeatDetectionRegex = /repeat\(/g,
    parseRepeatFunction = function parseRepeatFunction(repeatStr) {
  return repeatStr.split(/\(|\)/g)[1].split(',').map(function (arg) {
    return arg && arg.trim();
  });
};

function repeatResolver(domTree) {
  var style = domTree.style,
      children = domTree.children,
      rowWidth = 0,
      numOfRows,
      itemInARow = 0,
      itemWidth,
      repeatStyle,
      newGridTemplateColumns = '',
      newGridTemplateRows = '',
      i,
      len,
      gridTemplateColumns = style.gridTemplateColumns,
      gridTemplateRows = style.gridTemplateRows,
      width = style.width,
      height = style.height;
  width = isNaN(+width) ? 0 : +width;

  var _parseRepeatFunction = parseRepeatFunction(gridTemplateColumns);

  var _parseRepeatFunction2 = _slicedToArray(_parseRepeatFunction, 2);

  repeatStyle = _parseRepeatFunction2[0];
  itemWidth = _parseRepeatFunction2[1];
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
      newGridTemplateRows += 'auto ';
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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var validSizes = ['auto'],
    minmaxRegex = /minmax/,
    // templateSplitRegex = /\s(\[.*\])*(\(.*\))*/g,
templateSplitRegex = ' ',
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
    updateMatrix = function updateMatrix(grid, start, end) {
  var i, j;

  for (i = start.x; i < end.x; i++) {
    for (j = start.y; j < end.y; j++) {
      grid[i][j] = true;
    }
  }
};

var Grid =
/*#__PURE__*/
function () {
  function Grid() {
    _classCallCheck(this, Grid);

    this.setup();
  }

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
  }, {
    key: "set",
    value: function set(key, value) {
      this.props[key] = value;
      return this;
    }
  }, {
    key: "getProps",
    value: function getProps(key) {
      return this.props[key];
    }
  }, {
    key: "getConfig",
    value: function getConfig(key) {
      return this._config[key];
    }
  }, {
    key: "compute",
    value: function compute(_domTree) {
      var domTree = _domTree || this.props.domTree;

      this._sanitizeTracks(domTree)._sanitizeItems(domTree)._inflateTracks()._assignCoordinatesToCells(domTree);
    }
  }, {
    key: "_sanitizeTracks",
    value: function _sanitizeTracks() {
      var _domTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var style = _domTree.style,
          gridTemplateRows = style.gridTemplateRows,
          gridTemplateColumns = style.gridTemplateColumns,
          repeatResolvedTracks,
          config = this._config,
          trackInfo;

      if (/repeat\(/.test(style.gridTemplateColumns)) {
        repeatResolvedTracks = Object(_helpers_repeatResolver__WEBPACK_IMPORTED_MODULE_3__["repeatResolver"])(_domTree);
        gridTemplateColumns = repeatResolvedTracks.gridTemplateColumns;
        gridTemplateRows = repeatResolvedTracks.gridTemplateRows;
      }

      trackInfo = this._fetchTrackInformation(gridTemplateRows);
      config.mapping.row = {
        nameToLineMap: trackInfo.nameToLineMap,
        lineToNameMap: trackInfo.lineToNameMap
      };
      config.rowTracks = trackInfo.tracks;
      trackInfo = this._fetchTrackInformation(gridTemplateColumns);
      config.mapping.col = {
        nameToLineMap: trackInfo.nameToLineMap,
        lineToNameMap: trackInfo.lineToNameMap
      };
      config.colTracks = trackInfo.tracks;
      return this;
    }
  }, {
    key: "_fetchTrackInformation",
    value: function _fetchTrackInformation() {
      var tracks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
      var i,
          len,
          splittedTrackInfo = tracks.split(templateSplitRegex),
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

      for (i = 0, len = sizeList.length; i < len; i++) {
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
          size: sizeList[i]
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
        itemStyle = items[i].style;
        sanitizedItems.push(_objectSpread({}, items[i], {
          rowStart: mapping.row.nameToLineMap[itemStyle.gridRowStart],
          rowEnd: mapping.row.nameToLineMap[itemStyle.gridRowEnd],
          colStart: mapping.col.nameToLineMap[itemStyle.gridColumnStart],
          colEnd: mapping.col.nameToLineMap[itemStyle.gridColumnEnd]
        }));
        item = sanitizedItems[i];
        updateMatrix(gridMatrix, {
          x: item.colStart,
          y: item.rowStart
        }, {
          x: item.colEnd,
          y: item.rowEnd
        });
      }

      autoFlowItems = sanitizedItems.filter(function (item) {
        return !item.colStart || !item.rowStart;
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
  }, {
    key: "_expandTracksIfRequired",
    value: function _expandTracksIfRequired() {
      return this;
    }
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
          _ref = domTree.style || {},
          paddingStart = _ref.paddingStart,
          paddingEnd = _ref.paddingEnd,
          paddingTop = _ref.paddingTop,
          paddingBottom = _ref.paddingBottom,
          width = _ref.width,
          height = _ref.height,
          tsa = new _track_sizing__WEBPACK_IMPORTED_MODULE_1__["default"]();

      if (!isNaN(+width)) {
        width -= paddingStart + paddingEnd;
      }

      sizedTracks = tsa.clear().set('tracks', colTracks).set('items', sanitizedItems.map(function (item) {
        return {
          start: item.colStart,
          end: item.colEnd,
          size: item.style && (item.style.minWidthContribution || item.style.width) || 'auto'
        };
      })).set('containerSize', width || 'auto').resolveTracks();
      colTracks.forEach(function (track, index) {
        track.calculatedStyle = sizedTracks[index];
        minWidthContribution += sizedTracks[index].baseSize || 0;
      });

      if (!isNaN(+height)) {
        height -= paddingTop + paddingBottom;
      }

      sizedTracks = tsa.clear().set('tracks', rowTracks).set('items', sanitizedItems.map(function (item) {
        return {
          start: item.rowStart,
          end: item.rowEnd,
          size: item.style && (item.style.minHeightContribution || item.style.height) || 'auto'
        };
      })).set('containerSize', height || 'auto').resolveTracks();
      rowTracks.forEach(function (track, index) {
        track.calculatedStyle = sizedTracks[index];
        minHeightContribution += sizedTracks[index].baseSize || 0;
      });
      domTree.style.minHeightContribution = minHeightContribution;
      domTree.style.minWidthContribution = minWidthContribution;
      return this;
    }
  }, {
    key: "_assignCoordinatesToCells",
    value: function _assignCoordinatesToCells(_domTree) {
      var domTree = _domTree || this.props.domTree,
          _this$_config2 = this._config,
          sanitizedItems = _this$_config2.sanitizedItems,
          rowTracks = _this$_config2.rowTracks,
          colTracks = _this$_config2.colTracks,
          item,
          len,
          i,
          _domTree$style = domTree.style,
          justifyItems = _domTree$style.justifyItems,
          alignItems = _domTree$style.alignItems,
          paddingStart = _domTree$style.paddingStart,
          paddingEnd = _domTree$style.paddingEnd,
          paddingTop = _domTree$style.paddingTop,
          paddingBottom = _domTree$style.paddingBottom,
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
    }
  }, {
    key: "_updatePositioWRTRoot",
    value: function _updatePositioWRTRoot(_domTree) {
      var _this = this;

      var domTree = _domTree || this.props.domTree,
          children = domTree.children || [];
      domTree.layout.x = domTree.layout.x || 0;
      domTree.layout.y = domTree.layout.y || 0;
      children.forEach(function (child) {
        child.layout.x = (child.layout.x || 0) + domTree.layout.x;
        child.layout.x2 = (child.layout.x2 || 0) + domTree.layout.x;
        child.layout.y = (child.layout.y || 0) + domTree.layout.y;
        child.layout.y2 = (child.layout.y2 || 0) + domTree.layout.y;

        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDisplayProperty"])(child) === 'grid') {
          _this._updatePositioWRTRoot(child);
        }
      });
    }
  }]);

  return Grid;
}();

var replaceWithAbsValue = function replaceWithAbsValue() {
  var styleTrack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var calculatedTrack = arguments.length > 1 ? arguments[1] : undefined;
  var trackSplitAr = styleTrack.split(templateSplitRegex).filter(function (track) {
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

  for (i = 0, len = domTree.children && domTree.children.length; i < len; i++) {
    child = domTree.children[i];

    if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getDisplayProperty"])(child)) {
      this.compute(child);
    }
  }

  grid = new Grid();
  grid.set('domTree', domTree).compute();

  if (count < 2) {
    this.gridLayoutEngine(updateDomTreeWithResolvedValues(domTree, grid), 2);
    domTree.root && grid._updatePositioWRTRoot(domTree);
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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
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
        } else return gap1 - gap2;
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

var computeLayout = function computeLayout(domTree) {
  var mason = new LayoutEngine();
  var clonedDomTree = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["cloneObject"])(domTree),
      calculatedTree;
  clonedDomTree.root = true;
  calculatedTree = mason.compute(clonedDomTree);
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attachLayoutInformation"])(domTree, calculatedTree);
  return domTree;
};



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
var DISPLAY_GRID = 'grid';
var DISPLAY_FLEX = 'flex';
var CENTER = 'center';
var START = 'start';
var END = 'end';
var STRETCH = 'stretch';
var ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'];

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
//# sourceMappingURL=main.js.map