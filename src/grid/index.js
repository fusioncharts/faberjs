import { getDisplayProperty, pluckNumber } from '../utils';
import TrackResolver from './track-sizing';
import { CENTER, END, STRETCH } from '../utils/constants';
import { repeatResolver } from './helpers/repeatResolver';

const validSizes = ['auto', 'none'],
  minmaxRegex = /minmax/,
  // repeatFunctionRegex = /repeat\(/g,
  // templateSplitRegex = /\s(\[.*\])*(\(.*\))*/g,
  templateSplitRegex  = /(?:[^\s[\]()]+|\[[^[\]]*\]|\([^()]*\))+/g,
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
      };
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
  resolveItemStyle = (itemStyle, mapping) => {
    let {gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd} = itemStyle;
    if(itemStyle.gridColumn){
      [gridColumnStart, gridColumnEnd] = itemStyle.gridColumn.split("/").map(line => line.trim());
      gridColumnStart = mapping ? mapping.col.nameToLineMap[gridColumnStart] : 1;
      if(/span\s+\d+/g.test(gridColumnEnd)){
        gridColumnEnd = gridColumnStart + +gridColumnEnd.match(/span\s+(\d+)/)[1];
      }
      gridColumnEnd = mapping ? mapping.col.nameToLineMap[gridColumnEnd] : 1;
    }
    if(itemStyle.gridRow){
      [gridRowStart, gridRowEnd] = itemStyle.gridRow.split("/").map(line => line.trim());
      gridRowStart = mapping ? mapping.row.nameToLineMap[gridRowStart] : 1;
      if(/span\s\d+/g.test(gridRowEnd)){
        gridRowEnd = gridRowStart + +gridRowEnd.match(/span\s(\d+)/)[1];
      }
      gridRowEnd = mapping ? mapping.row.nameToLineMap[gridRowEnd] : 1;
    }
    return {
      gridRowStart,
      gridRowEnd,
      gridColumnStart,
      gridColumnEnd
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
  getMaxRowColumn = items => {
    let maxRow = 1, maxColumn = 1, itemStyle;
    items.forEach((item) => {
      itemStyle = resolveItemStyle(item.style);
      maxColumn = Math.max(isNaN(+itemStyle.gridColumnStart) ? 0 : +itemStyle.gridColumnStart, maxColumn, isNaN(+itemStyle.gridColumnEnd - 1) ? 0 : +itemStyle.gridColumnEnd - 1);
      maxRow = Math.max(isNaN(+itemStyle.gridRowStart) ? 0 : +itemStyle.gridRowStart, maxRow, isNaN(+itemStyle.gridRowEnd - 1) ? 0 : +itemStyle.gridRowEnd - 1);
    });
    return {
      maxRow,
      maxColumn
    };
  };
class Grid {
  /**
   * Creates an instance of Grid. Initializes the props and _config object.
   * @memberof Grid
   */
  constructor () {
    this.setup();
  }

  /**
   * Initializes _config, props objects. Also initializes and stores a new instance of TrackResolver.
   *
   * @returns {Grid}
   *          Reference of the class instance.
   * @memberof Grid
   */
  setup () {
    this._tsa = new TrackResolver();
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
  set (key, value) {
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
  getProps (key) {
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
  getConfig (key) {
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
  compute (_domTree) {
    let domTree = _domTree || this.props.domTree;

    this._sanitizeTracks(domTree)
      ._sanitizeItems(domTree)
      ._inflateTracks()
      ._assignCoordinatesToCells(domTree);
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
  _sanitizeTracks (_domTree = {}) {
    let style = _domTree.style,
      { gridTemplateRows, gridTemplateColumns } = style,
      config = this._config,
      trackInfo,
      { maxColumn, maxRow } = getMaxRowColumn(_domTree.children);

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
  _fetchTrackInformation (tracks = 'none') {
    let i,
      len,
      splittedTrackInfo = tracks.match(templateSplitRegex),
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
    if (tracks === 'none') {
      len = this.getProps('maxTracks');
    }

    for (i = 0; i < len; i++) {
      startLineNames = (nameList[i] && nameList[i].replace(/\[|\]/g, '').split(' ').filter(name => name.length).map(name => name.trim())) || [i + 1 + ''];
      endLineNames = (nameList[i + 1] && nameList[i + 1].replace(/\[|\]/g, '').split(' ').filter(name => name.length).map(name => name.trim())) || [i + 2 + ''];

      sanitizedTracks.push({
        start: i + 1,
        end: i + 2,
        size: sizeList[i] || 'auto'
      });

      // A line can have multiple names but a name can only be assigned to a single line
      lineToNameMap[i + 1] = startLineNames;
      lineToNameMap[i + 2] = endLineNames;
      startLineNames.forEach(name => (nameToLineMap[name] = i + 1));
      endLineNames.forEach(name => (nameToLineMap[name] = i + 2));
      nameToLineMap[i + 1] = i + 1;
      nameToLineMap[i + 2] = i + 2;
    }

    return {
      tracks: sanitizedTracks,
      nameToLineMap,
      lineToNameMap
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
      len;

    for (i = 1; i <= rowNum; i++) {
      gridMatrix.push([]);
    }
    for (i = 0, len = items.length; i < len; i++) {
      itemStyle = resolveItemStyle(items[i].style, mapping);

      sanitizedItems.push({
        ...items[i],
        rowStart: mapping.row.nameToLineMap[itemStyle.gridRowStart],
        rowEnd: mapping.row.nameToLineMap[itemStyle.gridRowEnd],
        colStart: mapping.col.nameToLineMap[itemStyle.gridColumnStart],
        colEnd: mapping.col.nameToLineMap[itemStyle.gridColumnEnd]
      });
      item = sanitizedItems[i];
      updateMatrix(gridMatrix, {x: item.rowStart, y: item.colStart}, {x: item.rowEnd, y: item.colEnd});
    }

    autoFlowItems = sanitizedItems.filter(sanitizedItem => (!sanitizedItem.colStart || !sanitizedItem.rowStart));

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

      trackWidth = colTrackDp[colEnd - 1] - colTrackDp[colStart - 1];
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

    return this;
  }

  /**
   * After the grid is resolved, the items and the container should receive their dimensions(width, height) and positions(x, y).
   * This values are calculated after considering the justifyItem and alignItem attributes.
   *
   * @param {Object} _domTree
   * @memberof Grid
   */
  _assignCoordinatesToCells (_domTree) {
    let domTree = _domTree || this.props.domTree,
      { sanitizedItems, rowTracks, colTracks } = this._config,
      item,
      len,
      i,
      { justifyItems, alignItems, paddingStart, paddingTop } = domTree.style,
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

    return this;
  }
}

const replaceWithAbsValue = (styleTrack = '', calculatedTrack) => {
    let trackSplitAr = (styleTrack.match(templateSplitRegex) || []).filter(track => track && !!track.trim()),
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
