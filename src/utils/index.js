const ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'],
  getDisplayProperty = (domTree) => {
    return domTree.style && domTree.style.display;
  },
  cloneObject = (arg) => {
    if ((ATOMIC_DATA_TYPE.indexOf(typeof arg) > -1) || arg === null) {
      return arg;
    }

    if (Array.isArray(arg)) {
      let i,
        len,
        arr = [];

      for (i = 0, len = arg.length; i < len; i++) {
        arr.push(cloneObject(arg[i]));
      }

      return arr;
    } else if (typeof arg === 'object') {
      let cloneObj = {},
        key;

      for (key in arg) {
        cloneObj[key] = cloneObject(arg[key]);
      }

      return cloneObj;
    }
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
  cloneObject,
  getDisplayProperty,
  centerify,
  endify
};