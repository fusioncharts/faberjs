import { getDisplayProperty, centerify, endify } from "../utils";
import { computeLayout } from "../mason";
import TrackResolver from "./track-sizing";
import { JUSTIFY_ALIGN_CENTER, JUSTIFY_ALIGN_END } from "../utils/constants";


const parseTemplete = (template) => template.map((size, index) => ({ size, start: index + 1, end: index + 2 })),
  withinBounds = (rowStart, rowEnd, colStart, colEnd, templateRows, templateColumns) => {
    return rowStart - 1 >= 0
      && rowStart - 1 < templateRows.length
      && rowEnd - 2 >= 0
      && rowEnd - 2 < templateRows.length
      && colStart - 1 >= 0
      && colStart - 1 < templateColumns.length
      && colEnd - 2 >= 0
      && colEnd - 2 < templateColumns.length;
  },
  addCoordinatesToCells = (gridMatrix, children, containerStyles) => {
    let i, j, item, usedX = 0, usedY = 0, cell = {}, alignedBounds = {};
    for (i = 0; i < gridMatrix.length; i++) {
      usedX = 0;
      // usedY = null;
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

    children.forEach(child => {
      cell = gridMatrix[child.matrixPosition.row][child.matrixPosition.column];
      child.layout = {};

      child.layout.width = child.style.width;
      child.layout.height = child.style.height;
      child.layout.startX = cell.startX;
      child.layout.startY = cell.startY;
      child.layout.endX = cell.endX;
      child.layout.endY = cell.endY;

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
  },
  placeChildrenInGrid = (children, gridMatrix, templateRows, templateColumns) => {
    children.forEach(child => {
      const { gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd } = child.style;
      if (withinBounds(gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd, templateRows, templateColumns)) {
        gridMatrix[gridRowStart - 1][gridColumnStart - 1].item = child;
        child.matrixPosition = {
          row: gridRowStart - 1,
          column: gridColumnStart - 1
        };
        // TODO:  consider spanning items
      }
    });
  },
  inflateGridCells = (tsa, children, columns, rows, containerHeight, containerWidth, gridMatrix) => {
    let i,
      j;

    columns = tsa.set('tracks', columns)
      .set('items', children.map(c => ({ start: c.style.gridColumnStart, end: c.style.gridColumnEnd, size: c.style.width })))
      .set('containerSize', containerHeight)
      .resolveTracks();

    rows = tsa.set('tracks', rows)
      .set('items', children.map(r => ({ start: r.style.gridRowStart, end: r.style.gridRowEnd, size: r.style.height })))
      .set('containerSize', containerWidth)
      .resolveTracks();

    for (i = 0; i < rows.length; i++) {
      for (j = 0; j < rows.length; j++) {
        gridMatrix[i][j].rowSize = rows[i].baseSize;
        gridMatrix[i][j].columnSize = columns[j].baseSize;
      }
    }
  },
  computeGridLayout = (domTree) => {
    const gridMatrix = [],
      containerStyles = domTree.style || {},
      children = domTree.children || [],
      { templateRows, templateColumns, width, height } = containerStyles,
      tsa = new TrackResolver(),
      createGridMatrix = () => {
        let i;
        for (i = 0; i < formattedRows.length; i++) {
          gridMatrix.push(formattedColumns.map(c => ({
            columnSize: +c.size,
            rowSize: +formattedRows[i].size
          })));
        }
      };

    let i,
      formattedRows = parseTemplete(templateRows),
      formattedColumns = parseTemplete(templateColumns);

    for (i = 0; i < children.length; i++) {
      if (getDisplayProperty(children[i])) {
        children[i] = computeLayout(children[i]);
      }
    }

    // Create the grid matrix
    createGridMatrix();
    // Allocate children to grid matrix
    placeChildrenInGrid(children, gridMatrix, templateRows, templateColumns);
    // Size the rows and tracks
    inflateGridCells(tsa, children, formattedColumns, formattedRows, height, width, gridMatrix);
    // Calling this second time to ensure that if some item's min-content-contribution has changed
    inflateGridCells(tsa, children, formattedColumns, formattedRows, height, width, gridMatrix);
    // Adds x,y coordinates to each cell depending on position and dimensions
    addCoordinatesToCells(gridMatrix, children, containerStyles);

    return domTree;
  };

export default computeGridLayout;