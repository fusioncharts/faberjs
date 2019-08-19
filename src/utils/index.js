import { ATOMIC_DATA_TYPE } from './constants';

let UNDEF;

const getDisplayProperty = (domTree) => {
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
  attachLayoutInformation = (baseTree = {}, calculatedTree = {}) => {
    let i,
      len;

    baseTree.layout = calculatedTree.layout;

    for (i = 0, len = (baseTree.children || []).length; i < len; i++) {
      attachLayoutInformation(baseTree.children[i], calculatedTree.children[i]);
    }
  },
  pluckNumber = function () {
    var arg,
      i,
      l;

    for (i = 0, l = arguments.length; i < l; i += 1) {
      arg = arguments[i];
      if (!arg && arg !== false && arg !== 0) {
        continue;
      } else if (isNaN(arg = Number(arg))) {
        continue;
      }
      return arg;
    }
    return UNDEF;
  };

export {
  cloneObject,
  attachLayoutInformation,
  getDisplayProperty,
  pluckNumber
};
