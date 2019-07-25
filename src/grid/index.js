import { getDisplayProperty, centerify, endify } from "../utils";
import { computeLayoutHelper } from "../mason";
import TrackResolver from "./track-sizing";
import { JUSTIFY_ALIGN_CENTER, JUSTIFY_ALIGN_END } from "../utils/constants";

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
      { domTree } = this.props,
      tsa = new TrackResolver();

    sizedTracks = tsa.clear()
      .set('tracks', colTracks)
      .set('items', sanitizedItems.map(item => ({
        start: item.colStart,
        end: item.colEnd,
        size: (item.style && item.style.width) || 'auto'
      })))
      .set('containerSize', (domTree.style && domTree.style.width) || 'auto')
      .resolveTracks();

    colTracks.forEach((track, index) => track.calculatedStyle = sizedTracks[index]);

    sizedTracks = tsa.clear()
      .set('tracks', rowTracks)
      .set('items', sanitizedItems.map(item => ({
        start: item.rowStart,
        end: item.rowEnd,
        size: (item.style && item.style.height) || 'auto'
      })))
      .set('containerSize', (domTree.style && domTree.style.height) || 'auto')
      .resolveTracks();

    rowTracks.forEach((track, index) => track.calculatedStyle = sizedTracks[index]);
    return this;
  }

  _assignCoordinatesToCells (_domTree) {
    let domTree = _domTree || this.props.domTree,
      { sanitizedItems, rowTracks, colTracks } = this._config,
      item,
      len,
      i,
      containerStyles = domTree.style,
      alignedBounds = {},
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
        y2: rowTrackdp[item.rowEnd - 1],
        width: child.style.width,
        height: child.style.height
      };
      if (containerStyles.justifyItems === JUSTIFY_ALIGN_CENTER || child.style.justifySelf == JUSTIFY_ALIGN_CENTER) {
        if (!Number.isNaN(child.style.width)) {
          alignedBounds = centerify(cell.startX, cell.endX, child.layout.startX, child.layout.width);
          child.layout.startX = alignedBounds.start;
          child.layout.endX = alignedBounds.end;
        }
      }
      if (containerStyles.alignItems === JUSTIFY_ALIGN_CENTER || child.style.alignSelf == JUSTIFY_ALIGN_CENTER) {
        if (!Number.isNaN(child.style.height)) {
          alignedBounds = centerify(cell.startY, cell.endY, cell.startY, child.layout.height);
          child.layout.startY = alignedBounds.start;
          child.layout.endY = alignedBounds.end;
        }
      }
      if (containerStyles.justifyItems === JUSTIFY_ALIGN_END || child.style.justifySelf == JUSTIFY_ALIGN_END) {
        if (!Number.isNaN(child.style.width)) {
          alignedBounds = endify(cell.startX, cell.endX, child.layout.startX, child.layout.width);
          child.layout.startX = alignedBounds.start;
          child.layout.endX = alignedBounds.end;
        }
      }
      if (containerStyles.alignItems === JUSTIFY_ALIGN_END || child.style.alignSelf == JUSTIFY_ALIGN_END) {
        if (!Number.isNaN(child.style.height)) {
          alignedBounds = endify(cell.startY, cell.endY, cell.startY, child.layout.height);
          child.layout.startY = alignedBounds.start;
          child.layout.endY = alignedBounds.end;
        }
      }
    });
  }
}

const replaceWithAbsValue = (styleTrack, calculatedTrack) => {
    let trackSplitAr = styleTrack.split(' '),
      trackWithAbsValue = '',
      counter = 1;

    trackSplitAr.forEach(track => {
      if (validSizes.indexOf(track) > -1 || !isNaN(track) || /[0-9]fr/.test(track)) {
        trackWithAbsValue += calculatedTrack[counter].calculatedStyle.baseSize + ' ';
        counter++;
      } else {
        trackWithAbsValue += track + ' ';
      }
    });

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

    for (i = 0, len = domTree.children.length; i < len; i++) {
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
  },
  computeGridLayout = (domTree, count = 1) => {
    let i,
      len,
      child,
      grid;

    if (!domTree || !domTree.style) {
      return;
    }

    if (!domTree.userGivenStyles) {
      domTree.style.width = isNaN(domTree.style.width) ? 'auto' : domTree.style.width;
      domTree.style.height = isNaN(domTree.style.height) ? 'auto' : domTree.style.height;
      domTree.userGivenStyles = {
        gridTemplateColumns: domTree.style.gridTemplateColumns,
        gridTemplateRows: domTree.style.gridTemplateRows,
        width: domTree.style.width,
        height: domTree.style.height
      };
    }

    for (i = 0, len = (domTree.children && domTree.children.length); i < len; i++) {
      child = domTree.children[i];
      if (getDisplayProperty(child)) {
        computeLayoutHelper(child, domTree);
      }
    }

    grid = new Grid();
    grid.set('domTree', domTree)
      .compute();

    if (count < 2) {
      computeGridLayout(updateDomTreeWithResolvedValues(domTree, grid), 2);
    }

    return domTree;
  };

export {
  computeGridLayout
};
