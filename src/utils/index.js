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
  };

export {
  cloneObject,
  getDisplayProperty
};