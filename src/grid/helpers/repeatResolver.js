function repeatResolver (domTree, parentInfo) {
  let { children } = domTree,
    rowWidth = 0,
    numOfRows,
    itemInARow = 0,
    // itemWidth,
    repeatStyle = 'auto-fit',
    newGridTemplateColumns = '',
    newGridTemplateRows = '',
    i,
    len,
    height = 0,
    { itemWidth, width } = parentInfo;

  width = isNaN(+width) ? 0 : +width;

  children.forEach(child => (height = Math.max(height, +child.style.height || 0)));
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
      newGridTemplateRows += height + ' ';
    }
  }

  return {
    gridTemplateColumns: newGridTemplateColumns.trim(),
    gridTemplateRows: newGridTemplateRows.trim()
  };
}

export {
  repeatResolver
};
