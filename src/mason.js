import { getDisplayProperty, cloneObject, getComputeFn } from "./utils";

const computeLayoutHelper = domTree => {
    return getComputeFn(getDisplayProperty(domTree))(domTree);
  },
  computeLayout = (domTree = {}) => {
    let clonedDomTree = cloneObject(domTree);

    return computeLayoutHelper(clonedDomTree);
  };

export {
  computeLayout,
  computeLayoutHelper
};
