import { getDisplayProperty } from "../utils";
import { computeLayout } from "../mason";
import TrackResolver from "./track-sizing";

const computeGridLayout = (domTree) => {
  const gridMatrix = [],
    styles = domTree.style || {},
    children = domTree.children || [],
    { templateRows, templateColumns, width, height } = styles,
    parseTemplete = (template) => template.map((size, index) => ({ size, start: index + 1, end: index + 2 })),
    tsa = new TrackResolver(),
    withinBounds = (rowStart, rowEnd, colStart, colEnd) => {
      return rowStart - 1 >= 0
        && rowStart - 1 < templateRows.length
        && rowEnd - 2 >= 0
        && rowEnd - 2 < templateRows.length
        && colStart - 1 >= 0
        && colStart - 1 < templateColumns.length
        && colEnd - 2 >= 0
        && colEnd - 2 < templateColumns.length;
    },
    addCoordinatesToCells = () => {
      let i, j, item, usedX = 0, usedY = 0, cell = {};
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
        child.startX = cell.startX;
        child.startY = cell.startY;
        child.endX = cell.endX;
        child.endY = cell.endY;
      });
    },
    createGridMatrix = () => {
      let i;
      for (i = 0; i < formattedRows.length; i++) {
        gridMatrix.push(formattedColumns.map(c => ({
          columnSize: +c.size,
          rowSize: +formattedRows[i].size
        })));
      }
    },
    placeChildrenInGrid = () => {
      children.forEach(child => {
        const { gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd } = child.style;
        if (withinBounds(gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd)) {
          gridMatrix[gridRowStart - 1][gridColumnStart - 1].item = child;
          child.matrixPosition = {
            row: gridRowStart - 1,
            column: gridColumnStart - 1
          };
          // TODO:  consider spanning items
        }
      });
    },
    inflateGridCells = () => {
      let rowsWithSize,
        columnsWithSize,
        i,
        j;

      columnsWithSize = tsa.set('tracks', formattedColumns)
        .set('items', children.map(c => ({ start: c.style.gridColumnStart, end: c.style.gridColumnEnd, size: c.style.width })))
        .set('containerSize', height)
        .resolveTracks();
      formattedColumns = columnsWithSize;

      rowsWithSize = tsa.set('tracks', formattedRows)
        .set('items', children.map(r => ({ start: r.style.gridRowStart, end: r.style.gridRowEnd, size: r.style.height })))
        .set('containerSize', width)
        .resolveTracks();
      formattedRows = rowsWithSize;

      for (i = 0; i < rowsWithSize.length; i++) {
        for (j = 0; j < rowsWithSize.length; j++) {
          gridMatrix[i][j].rowSize = rowsWithSize[i].baseSize;
          gridMatrix[i][j].columnSize = columnsWithSize[j].baseSize;
        }
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
  placeChildrenInGrid();
  // Size the rows and tracks
  inflateGridCells();
  // Calling this second time to ensure that if some item's min-content-contribution has changed
  inflateGridCells();
  // Adds x,y coordinates to each cell depending on position and dimensions
  addCoordinatesToCells();

  return domTree;
};

export default computeGridLayout;