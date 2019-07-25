const getDisplayProperty = (domTree) => {
    return domTree.style && domTree.style.display;
  },
  centerify = (axisStart, axisEnd, itemStart, itemSize) => {
    const itemFreeSpaceStart = itemStart - axisStart,
      itemEnd = itemStart + itemSize,
      itemFreeSpaceEnd = axisEnd - itemEnd,
      totalFreeSpace = itemFreeSpaceStart + itemFreeSpaceEnd;

    // Item's revised bounds along block axis
    return {
      start: axisStart + (totalFreeSpace / 2),
      end: axisEnd - (totalFreeSpace / 2)
    };
  },
  endify = (axisStart, axisEnd, itemStart, itemSize) => {
    const itemFreeSpaceStart = itemStart - axisStart,
      itemEnd = itemStart + itemSize,
      itemFreeSpaceEnd = axisEnd - itemEnd,
      totalFreeSpace = itemFreeSpaceStart + itemFreeSpaceEnd;

    // Item's revised bounds along block axis
    return {
      start: axisStart + (totalFreeSpace),
      end: axisStart + totalFreeSpace + itemSize
    };
  };

export {
  getDisplayProperty,
  centerify,
  endify
};