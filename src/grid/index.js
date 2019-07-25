import { getDisplayProperty } from "../utils";
import { computeLayout } from "../mason";
import TrackResolver from "./track-sizing";


// const parseTemplete = (template) => template.map((size, index) => ({ size, start: index + 1, end: index + 2 })),
//   withinBounds = (rowStart, rowEnd, colStart, colEnd, templateRows, templateColumns) => {
//     return rowStart - 1 >= 0
//       && rowStart - 1 < templateRows.length
//       && rowEnd - 2 >= 0
//       && rowEnd - 2 < templateRows.length
//       && colStart - 1 >= 0
//       && colStart - 1 < templateColumns.length
//       && colEnd - 2 >= 0
//       && colEnd - 2 < templateColumns.length;
//   },
//   addCoordinatesToCells = (gridMatrix, children) => {
//     let i, j, item, usedX = 0, usedY = 0, cell = {};
//     for (i = 0; i < gridMatrix.length; i++) {
//       usedX = 0;
//       // usedY = null;
//       for (j = 0; j < gridMatrix[i].length; j++) {
//         item = gridMatrix[i][j];

//         item.startX = usedX;
//         item.endX = usedX + item.columnSize;
//         usedX = item.endX;

//         item.startY = usedY;
//         item.endY = usedY + item.rowSize;

//         if (j == gridMatrix[i].length - 1) {
//           usedY = usedY + item.rowSize;
//         }
//       }
//     }

//     children.forEach(child => {
//       cell = gridMatrix[child.matrixPosition.row][child.matrixPosition.column];
//       child.layout = {};
//       child.layout.width = child.style.width;
//       child.layout.height = child.style.height;
//       child.layout.startX = cell.startX;
//       child.layout.startY = cell.startY;
//       child.layout.endX = cell.endX;
//       child.layout.endY = cell.endY;
//     });
//   },
//   placeChildrenInGrid = (children, gridMatrix, templateRows, templateColumns) => {
//     children.forEach(child => {
//       const { gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd } = child.style;
//       if (withinBounds(gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd, templateRows, templateColumns)) {
//         gridMatrix[gridRowStart - 1][gridColumnStart - 1].item = child;
//         child.matrixPosition = {
//           row: gridRowStart - 1,
//           column: gridColumnStart - 1
//         };
//         // TODO:  consider spanning items
//       }
//     });
//   },
//   inflateGridCells = (tsa, children, columns, rows, containerHeight, containerWidth, gridMatrix) => {
//     let i,
//       j;

//     columns = tsa.set('tracks', columns)
//       .set('items', children.map(c => ({ start: c.style.gridColumnStart, end: c.style.gridColumnEnd, size: c.style.width })))
//       .set('containerSize', containerHeight)
//       .resolveTracks();

//     rows = tsa.set('tracks', rows)
//       .set('items', children.map(r => ({ start: r.style.gridRowStart, end: r.style.gridRowEnd, size: r.style.height })))
//       .set('containerSize', containerWidth)
//       .resolveTracks();

//     for (i = 0; i < rows.length; i++) {
//       for (j = 0; j < rows.length; j++) {
//         gridMatrix[i][j].rowSize = rows[i].baseSize;
//         gridMatrix[i][j].columnSize = columns[j].baseSize;
//       }
//     }
//   },
//   _computeGridLayout = (domTree) => {
//     const gridMatrix = [],
//       styles = domTree.style || {},
//       children = domTree.children || [],
//       { templateRows, templateColumns, width, height } = styles,
//       tsa = new TrackResolver(),
//       createGridMatrix = () => {
//         let i;
//         for (i = 0; i < formattedRows.length; i++) {
//           gridMatrix.push(formattedColumns.map(c => ({
//             columnSize: +c.size,
//             rowSize: +formattedRows[i].size
//           })));
//         }
//       };

//     let i,
//       formattedRows = parseTemplete(templateRows),
//       formattedColumns = parseTemplete(templateColumns);

//     for (i = 0; i < children.length; i++) {
//       if (getDisplayProperty(children[i])) {
//         children[i] = computeLayout(children[i]);
//       }
//     }

//     // Create the grid matrix
//     createGridMatrix();
//     // Allocate children to grid matrix
//     placeChildrenInGrid(children, gridMatrix, templateRows, templateColumns);
//     // Size the rows and tracks
//     inflateGridCells(tsa, children, formattedColumns, formattedRows, height, width, gridMatrix);
//     // Calling this second time to ensure that if some item's min-content-contribution has changed
//     inflateGridCells(tsa, children, formattedColumns, formattedRows, height, width, gridMatrix);
//     // Adds x,y coordinates to each cell depending on position and dimensions
//     addCoordinatesToCells(gridMatrix, children);

//     return domTree;
//   };

const validSizes = ['auto'];
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

  compute (_domTree) {
    let domTree = _domTree || this.props.domTree;

    this._clearLayoutOfChildren(domTree)
      ._sanitizeTracks(domTree)
      ._sanitizeItems(domTree)
      ._inflateTracks()
      ._assignCoordinatesToCells(domTree);
  }

  _clearLayoutOfChildren(_domTree) {
    let domTree = _domTree || this.props.domTree;

    if (domTree.children && domTree.children.length) {
      domTree.children.forEach(child => delete child.layout);
    }

    return this;
  }
  _sanitizeTracks (_domTree = {}) {
    let style = _domTree.style,
      config = this._config,
      trackInfo;

    trackInfo = this._fetchTrackInformation(style.gridTemplateRows);
    // trackInfo = this._considerTrackInfoFromChildren(_domTree, trackInfo, 'row');
    config.mapping.row = {
      nameToLineMap: trackInfo.nameToLineMap,
      lineToNameMap: trackInfo.lineToNameMap
    };
    config.rowTracks = trackInfo.tracks;

    trackInfo = this._fetchTrackInformation(style.gridTemplateColumns);
    config.mapping.col = {
      nameToLineMap: trackInfo.nameToLineMap,
      lineToNameMap: trackInfo.lineToNameMap
    };
    config.colTracks = trackInfo.tracks;

    return this;
  }

  _fetchTrackInformation (tracks) {
    let i,
      len,
      splittedTrackInfo = tracks.split(' '),
      nameList,
      sizeList,
      sanitizedTracks = [{}],
      startLineNames,
      endLineNames,
      nameToLineMap = {},
      lineToNameMap = {};

    nameList = splittedTrackInfo.filter(track => {
      if (typeof track === 'string' && track.length) {
        len = track.length;
        if (track[0] === '['  && track[len - 1] === ']') {
          return true;
        }
        return false;
      }
      return true;
    });

    sizeList = splittedTrackInfo.filter(size => {
      if (!size) return false;

      len = (size + '').toLowerCase().replace(/px|fr/, '');
      if (validSizes.indexOf(len) >= 0 || !isNaN(len)) {
        return true;
      }
      return false;
    });

    for (i = 0, len = sizeList.length; i < len; i++) {
      startLineNames = (nameList[i] && nameList[i].replace(/\[|\]/g, '').split(' ').filter(name => name.length).map(name => name.trim())) || [i + 1 + ''];
      endLineNames = (nameList[i + 1] && nameList[i + 1].replace(/\[|\]/g, '').split(' ').filter(name => name.length).map(name => name.trim())) || [i + 2 + ''];

      sanitizedTracks.push({
        start: i + 1,
        end: i + 2,
        size: sizeList[i],
      });

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
    let items = (_domTree || this.props.domTree).children || [],
      mapping = this._config.mapping,
      sanitizedItems = [],
      itemStyle,
      i,
      len;

    for (i = 0, len = items.length; i < len; i++) {
      itemStyle = items[i].style;
      
      sanitizedItems.push({
        ...items[i],
        rowStart: mapping.row.nameToLineMap[itemStyle.gridRowStart],
        rowEnd: mapping.row.nameToLineMap[itemStyle.gridRowEnd],
        colStart: mapping.col.nameToLineMap[itemStyle.gridColumnStart],
        colEnd: mapping.col.nameToLineMap[itemStyle.gridColumnEnd]
      });
    }

    this._config.sanitizedItems = sanitizedItems;
    return this;
  }

  _inflateTracks () {
    let { sanitizedItems, colTracks, rowTracks } = this._config,
      sizedTracks,
      { parent, domTree } = this.props,
      tsa = new TrackResolver();

    sizedTracks = tsa.clear()
      .set('tracks', colTracks)
      .set('items', sanitizedItems.map(item => ({
        start: item.colStart,
        end: item.colEnd,
        size: (item.style && item.style.width) || 'auto'
      })))
      .set('containerSize', (parent.layout && parent.layout.width) || (domTree.style && domTree.style.width) || 'auto')
      .resolveTracks();

    colTracks.forEach((track,index) => track.calculatedStyle = sizedTracks[index]);

    sizedTracks = tsa.clear()
      .set('tracks', rowTracks)
      .set('items', sanitizedItems.map(item => ({
        start: item.rowStart,
        end: item.rowEnd,
        size: (item.style && item.style.height) || 'auto'
      })))
      .set('containerSize', (parent.layout && parent.layout.height) || (domTree.style && domTree.style.height) || 'auto')
      .resolveTracks();

    rowTracks.forEach((track,index) => track.calculatedStyle = sizedTracks[index]);
    return this;
  }

  _assignCoordinatesToCells (_domTree) {
    let domTree = _domTree || this.props.domTree,
      { sanitizedItems, rowTracks, colTracks } = this._config,
      item,
      len,
      i,
      rowTrackdp = [0],
      colTrackdp = [0];

    for (i = 1, len = rowTracks.length; i < len; i++) {
      rowTrackdp[i] = rowTrackdp[i - 1] + rowTracks[i].calculatedStyle.baseSize;
    }

    for (i = 1, len = colTracks.length; i < len; i++) {
      colTrackdp[i] = colTrackdp[i - 1] + colTracks[i].calculatedStyle.baseSize;
    }
    domTree.layout = {
      width: isNaN(domTree.width) ? colTrackdp[colTrackdp.length - 1] : domTree.width,
      height: isNaN(domTree.height) ? rowTrackdp[rowTrackdp.length - 1] : domTree.height
    };
    domTree.children.forEach((child, index) => {
      item = sanitizedItems[index];
      child.layout = {
        x: colTrackdp[item.colStart - 1],
        y: rowTrackdp[item.rowStart - 1],
        x2: colTrackdp[item.colEnd - 1],
        y2: rowTrackdp[item.rowEnd - 1]
      };
    });
  }
}

// const computeGridLayout = (domTree, parent = {}) => {
//   computeGridLayoutHelper(domTree, parent);
//   computeGridLayoutHelper(domTree, parent);
// };

const computeGridLayout = (domTree, parent, count = 1) => {
  let i,
    len,
    child,
    grid;

  if (!domTree || !domTree.style) {
    return;
  }

  for (i = 0, len = (domTree.children && domTree.children.length); i < len; i++) {
    child = domTree.children[i];
    if (getDisplayProperty(child)) {
      computeLayout(child, domTree);
    }
  }

  grid = new Grid();
  grid.set('domTree', domTree)
    .set('parent', parent || {})
    .compute();

  if (count < 2) {
    computeGridLayout(domTree, parent, 2);
  }
};

export {
  computeGridLayout
};