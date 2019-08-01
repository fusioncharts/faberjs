const repeatDetectionRegex = /repeat\(/g,
  parseRepeatFunction = repeatStr => {
    return repeatStr.split(/\(|\)/g)[1].split(',').map(arg => arg && arg.trim());
  };

function repeatResolver (domTree, parentInfo) {
  let { style, children } = domTree,
    rowWidth = 0,
    numOfRows,
    itemInARow = 0,
    // itemWidth,
    repeatStyle = 'auto-fit',
    newGridTemplateColumns = '',
    newGridTemplateRows = '',
    i,
    len,
    { itemWidth, width, height } = parentInfo;

  width = isNaN(+width) ? 0 : +width;

  // [repeatStyle, itemWidth] = parseRepeatFunction(gridTemplateColumns);
  itemWidth = +itemWidth;

  if (repeatStyle === 'auto-fit') {
    rowWidth += itemWidth;
    newGridTemplateColumns += (itemWidth + ' ');
    itemInARow = 1;
    for (i = 1, len = children.length; i < len; i++) {
      if (rowWidth + itemWidth > width) {
        break;
      }
      rowWidth += itemWidth;
      newGridTemplateColumns += (itemWidth + ' ');
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
  }
}

export {
  repeatResolver
};
