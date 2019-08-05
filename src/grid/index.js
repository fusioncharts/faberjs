import { getDisplayProperty, pluckNumber } from "../utils";
import TrackResolver from "./track-sizing";
import { CENTER, END, STRETCH } from "../utils/constants";
import { repeatResolver } from "./helpers/repeatResolver";

const validSizes = ['auto'],
  minmaxRegex = /minmax/,
  // repeatFunctionRegex = /repeat\(/g,
  // templateSplitRegex = /\s(\[.*\])*(\(.*\))*/g,
  templateSplitRegex = ' ',
  getUCFirstString = str => (str.charAt(0).toUpperCase() + str.slice(1)),
  validNestedGrid = tree => {
    let { gridTemplateColumns, gridTemplateRows } = tree.style || {};

    if (/repeat\(/g.test(gridTemplateColumns) || /repeat\(/g.test(gridTemplateRows)) {
      return false;
    }
    return true;
  },
  parseRepeatFunction = repeatStr => {
    return repeatStr.split(/\(|\)/g)[1].split(',').map(arg => arg && arg.trim());
  },
  getCleanSize = size => {
    size = size.trim();
    if (size === 'auto') return size;
    if (!isNaN(+size)) return +size;

    if (minmaxRegex.test(size)) {
      let sizeAr = size.split(/\(|\)/g)[1].split(',');

      return [
        sizeAr[0].trim(),
        sizeAr[1].trim()
      ];
    }

    return size;
  },
  getItemSize = (items, dimension) => {
    let filteredItems,
      templateCol,
      parsedDim = getUCFirstString(dimension),
      size,
      trackDir = dimension === 'width' ? 'col' : 'row';

    filteredItems = items.map(item => {
      templateCol = item.style['gridTemplate' + getUCFirstString(trackDir === 'col' ? 'columns' : 'rows')];
      if (getDisplayProperty(item) === 'grid' && /repeat\(/g.test(templateCol)) {
        size = parseRepeatFunction(templateCol)[1];
      } else {
        size = item.style['min' + parsedDim + 'Contribution'] || item.style[dimension] || 'auto';
      }

      return {
        start: item[trackDir + 'Start'],
        end: item[trackDir + 'End'],
        size
      }
    });
    return filteredItems;
  },
  updateMatrix = (grid, start, end) => {
    let i,
      j;

    for (i = start.x; i < end.x; i++) {
      for (j = start.y; j < end.y; j++) {
        grid[i][j] = true;
      }
    }
  },
  getMaxRowColumn = (items) =>{
    let maxRow = 0, maxColumn = 0;
    items.forEach((item, itemIndex) => {
      maxColumn = Math.max(isNaN(item.style.gridColumnStart) ? 0 : item.style.gridColumnStart, maxColumn, isNaN(item.style.gridColumnEnd * 1 - 1) ? 0 : item.style.gridColumnEnd*1 - 1);
      maxRow = Math.max(isNaN(item.style.gridRowStart) ? 0 : item.style.gridRowStart, maxRow, isNaN(item.style.gridRowEnd * 1 - 1) ? 0 : item.style.gridRowEnd*1 - 1);
    });
    return {
      maxRow,
      maxColumn
    };
  };
class Grid {
  constructor () {
    this.setup();
  }

  setup () {
    this._tsa = new TrackResolver();
    this.props = {};
    this._config = {
      mapping: {}
    };

    return this;
  }

  set (key, value) {
    this.props[key] = value;

    return this;
  }

  getProps (key) {
    return this.props[key];
  }

  getConfig (key) {
    return this._config[key];
  }

  compute (_domTree) {
    let domTree = _domTree || this.props.domTree;

    this._sanitizeTracks(domTree)
      ._sanitizeItems(domTree)
      ._inflateTracks()
      ._assignCoordinatesToCells(domTree);
  }

  _sanitizeTracks (_domTree = {}) {
    let style = _domTree.style,
      { gridTemplateRows, gridTemplateColumns } = style,
      repeatResolvedTracks,
      config = this._config,
      trackInfo;

    let {maxColumn, maxRow} = getMaxRowColumn(_domTree.children);
    this.set("maxTracks", maxRow);

    trackInfo = this._fetchTrackInformation(gridTemplateRows);
    config.mapping.row = {
      nameToLineMap: trackInfo.nameToLineMap,
      lineToNameMap: trackInfo.lineToNameMap
    };
    config.rowTracks = trackInfo.tracks;

    this.set("maxTracks", maxColumn);
    trackInfo = this._fetchTrackInformation(gridTemplateColumns);
    config.mapping.col = {
      nameToLineMap: trackInfo.nameToLineMap,
      lineToNameMap: trackInfo.lineToNameMap
    };
    config.colTracks = trackInfo.tracks;

    return this;
  }

  _fetchTrackInformation (tracks = 'auto') {
    let i,
      len,
      splittedTrackInfo = tracks.split(templateSplitRegex),
      nameList,
      sizeList,
      sanitizedTracks = [{}],
      startLineNames,
      endLineNames,
      nameToLineMap = {},
      lineToNameMap = {};

    nameList = splittedTrackInfo.filter(track => {
      if (track && typeof track === 'string' && track.length) {
        len = track.length;
        if (track[0] === '[' && track[len - 1] === ']') {
          return true;
        }
        return false;
      }
      return true;
    });

    sizeList = splittedTrackInfo.filter(size => {
      if (!size) return false;

      len = (size + '').toLowerCase().replace(/px|fr/, '');
      if (validSizes.indexOf(len) >= 0 || minmaxRegex.test(len) || !isNaN(len)) {
        return true;
      }
      return false;
    }).map(size => getCleanSize(size));

    len = sizeList.length;
    if(tracks === "auto"){
      len = this.getProps("maxTracks");
      console.log(len);
      sizeList = 'auto,'.repeat(len).split(",");
      sizeList.pop();
    }

    for (i = 0; i < len; i++) {
      startLineNames = (nameList[i] && nameList[i].replace(/\[|\]/g, '').split(' ').filter(name => name.length).map(name => name.trim())) || [i + 1 + ''];
      endLineNames = (nameList[i + 1] && nameList[i + 1].replace(/\[|\]/g, '').split(' ').filter(name => name.length).map(name => name.trim())) || [i + 2 + ''];

      //getMaxRowColumn();
      sanitizedTracks.push({
        start: i + 1,
        end: i + 2,
        size: sizeList[i]
      });
      //console.log(sanitizedTracks);

      // A line can have multiple names but a name can only be assigned to a single line
      lineToNameMap[i + 1] = startLineNames;
      lineToNameMap[i + 2] = endLineNames;
      startLineNames.forEach(name => nameToLineMap[name] = i + 1);
      endLineNames.forEach(name => nameToLineMap[name] = i + 2);
      nameToLineMap[i + 1] = i + 1;
      nameToLineMap[i + 2] = i + 2;
    }

    return {
      tracks: sanitizedTracks,
      nameToLineMap,
      lineToNameMap
    };
  }

  _sanitizeItems (_domTree) {
    let domTree = (_domTree || this.props.domTree),
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
      len,
      maxColumns,
      maxRows;

    for (i = 1; i <= rowNum; i++) {
      gridMatrix.push([]);
    }
    for (i = 0, len = items.length; i < len; i++) {
      itemStyle = items[i].style;

      sanitizedItems.push({
        ...items[i],
        rowStart: mapping.row.nameToLineMap[itemStyle.gridRowStart],
        rowEnd: mapping.row.nameToLineMap[itemStyle.gridRowEnd],
        colStart: mapping.col.nameToLineMap[itemStyle.gridColumnStart],
        colEnd: mapping.col.nameToLineMap[itemStyle.gridColumnEnd]
      });
      item = sanitizedItems[i];
      updateMatrix(gridMatrix, {x: item.colStart, y: item.rowStart}, {x: item.colEnd, y: item.rowEnd});
    }

    autoFlowItems = sanitizedItems.filter(item => (!item.colStart || !item.rowStart));

    /**
     * @todo: Scope to improve code here.
     */
    if (autoFlowItems) {
      if (gridAutoFlow === 'row') {
        for (i = 1; i < rowNum; i++) {
          for (j = 1; j < colNum; j++) {
            if (!gridMatrix[i][j]) {
              freeCells.push({row: i, col: j});
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
                freeCells.push({row: i, col: j});
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

  _expandTracksIfRequired () {
    return this;
  }

  _inflateTracks () {
    let { sanitizedItems, colTracks, rowTracks } = this._config,
      sizedTracks,
      minHeightContribution = 0,
      minWidthContribution = 0,
      { domTree } = this.props,
      { paddingStart, paddingEnd, paddingTop, paddingBottom, width, height } = domTree.style || {},
      tsa = new TrackResolver();

    if (!isNaN(+width)) {
      width -= (paddingStart + paddingEnd);
    }
    sizedTracks = tsa.clear()
      .set('tracks', colTracks)
      .set('items', getItemSize(sanitizedItems, 'width'))
      .set('containerSize', width || 'auto')
      .resolveTracks();

    colTracks.forEach((track, index) => {
      track.calculatedStyle = sizedTracks[index];
      minWidthContribution += sizedTracks[index].baseSize || 0;
    });

    this._solveUnresolvedChildren();

    if (!isNaN(+height)) {
      height -= (paddingTop + paddingBottom);
    }
    sizedTracks = tsa.clear()
      .set('tracks', rowTracks)
      .set('items', getItemSize(sanitizedItems, 'height'))
      .set('containerSize', height || 'auto')
      .resolveTracks();

    rowTracks.forEach((track, index) => {
      track.calculatedStyle = sizedTracks[index];
      minHeightContribution += sizedTracks[index].baseSize || 0;
    });

    domTree.style.minHeightContribution = minHeightContribution;
    domTree.style.minWidthContribution = minWidthContribution;
    return this;
  }

  _solveUnresolvedChildren (_domTree) {
    let domTree = _domTree || this.props.domTree,
      childrenWithRepeatConfiguration = (domTree.unResolvedChildren || []).filter(child => /repeat\(/g.test(child.style.gridTemplateColumns)
      || /repeat\(/g.test(child.style.gridTemplateRows)),
      { colTracks, mapping } = this._config,
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

    childrenWithRepeatConfiguration.forEach(child => {
      // if (repeatFunctionRegex.test(child.style.gridTemplateColumns)) {
      parsedWidthOfItem = parseRepeatFunction(child.style.gridTemplateColumns)[1];
      colStart = mapping.col.nameToLineMap[child.style.gridColumnStart];
      colEnd = mapping.col.nameToLineMap[child.style.gridColumnEnd];

      trackWidth = colTrackDp[colEnd - 1 ] - colTrackDp[colStart - 1];
      parentInfo = {
        itemWidth: parsedWidthOfItem,
        width: trackWidth
      };

      resolvedTracks = repeatResolver(child, parentInfo);

      child.style.gridTemplateColumns = resolvedTracks.gridTemplateColumns;
      child.style.gridTemplateRows = resolvedTracks.gridTemplateRows;

      parentReference.gridLayoutEngine(child);
      // }
    });
  }

  _assignCoordinatesToCells (_domTree) {
    let domTree = _domTree || this.props.domTree,
      { sanitizedItems, rowTracks, colTracks } = this._config,
      item,
      len,
      i,
      { justifyItems, alignItems, paddingStart, paddingEnd, paddingTop, paddingBottom } = domTree.style,
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
    (domTree.children || []).forEach((child, index) => {
      item = sanitizedItems[index];
      trackWidth = colTrackdp[item.colEnd - 1] - colTrackdp[item.colStart - 1];
      trackHeight = rowTrackdp[item.rowEnd - 1] - rowTrackdp[item.rowStart - 1];

      width = isNaN(+child.style.width) ? trackWidth : +child.style.width;
      height = isNaN(+child.style.height) ? trackHeight : +child.style.height;

      switch (justifyItems || child.style.justifySelf) {
      case CENTER:
        x = colTrackdp[item.colStart - 1] + (trackWidth / 2) - (width / 2); break;
      case END:
        x = colTrackdp[item.colEnd - 1] - width; break;
      case STRETCH:
        width = trackWidth;
        x = colTrackdp[item.colStart - 1]; break;
      default:
        x = colTrackdp[item.colStart - 1];
      }

      switch (alignItems || child.style.alignSelf) {
      case CENTER:
        y = rowTrackdp[item.rowStart - 1] + (trackHeight / 2) - (height / 2); break;
      case END:
        y = rowTrackdp[item.rowEnd - 1] - height; break;
      case STRETCH:
        height = trackHeight;
        y = rowTrackdp[item.rowStart - 1]; break;
      default:
        y = rowTrackdp[item.rowStart - 1];
      }

      x += pluckNumber(item.style.paddingStart, item.style.padding, 0);
      y += pluckNumber(item.style.paddingTop, item.style.padding, 0);

      child.layout = {
        x,
        y,
        x2: x + width,
        y2: y + height,
        width,
        height
      };
    });
  }
}

const replaceWithAbsValue = (styleTrack = '', calculatedTrack) => {
    let trackSplitAr = styleTrack.split(templateSplitRegex).filter(track => track && !!track.trim()),
      trackWithAbsValue = '',
      counter = 1;

    if (trackSplitAr.length && !(/repeat\(/.test(styleTrack))) {
      trackSplitAr.forEach(track => {
        if (validSizes.indexOf(track) > -1 || /[0-9]fr/.test(track) || minmaxRegex.test(track) || !isNaN(track)) {
          trackWithAbsValue += calculatedTrack[counter].calculatedStyle.baseSize + ' ';
          counter++;
        } else {
          trackWithAbsValue += track + ' ';
        }
      });
    } else {
      calculatedTrack.forEach(track => {
        if (isNaN(track.calculatedStyle.baseSize)) return;

        trackWithAbsValue += (track.calculatedStyle.baseSize + ' ');
      });
    }

    return trackWithAbsValue.trim();
  },
  updateDomTreeWithResolvedValues = (domTree, grid) => {
    let containerStyle = domTree.style,
      rowTracks = grid.getConfig('rowTracks'),
      colTracks = grid.getConfig('colTracks'),
      mapping = grid.getConfig('mapping'),
      { gridTemplateRows, gridTemplateColumns } = containerStyle,
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
      if (getDisplayProperty(child)) {
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

function computeGridLayout (domTree, count = 1) {
  let i,
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

    style.paddingStart = pluckNumber(style.paddingStart, style.padding, 0);
    style.paddingEnd = pluckNumber(style.paddingEnd, style.padding, 0);
    style.paddingTop = pluckNumber(style.paddingTop, style.padding, 0);
    style.paddingBottom = pluckNumber(style.paddingBottom, style.padding, 0);

    domTree.userGivenStyles = {
      gridTemplateColumns: domTree.style.gridTemplateColumns,
      gridTemplateRows: domTree.style.gridTemplateRows,
      width: domTree.style.width,
      height: domTree.style.height
    };
  }

  domTree.unResolvedChildren = [];
  for (i = 0, len = (domTree.children && domTree.children.length); i < len; i++) {
    child = domTree.children[i];
    if (getDisplayProperty(child)) {
      if (validNestedGrid(child)) {
        this.compute(child);
      } else {
        domTree.unResolvedChildren.push(child);
      }
    }
  }

  grid = new Grid();
  grid.set('domTree', domTree)
    .set('parent', this)
    .compute();

  if (count < 2) {
    this.gridLayoutEngine(updateDomTreeWithResolvedValues(domTree, grid), 2);
  }

  return domTree;
}

export {
  computeGridLayout
};
