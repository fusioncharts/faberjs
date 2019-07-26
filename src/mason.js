import { getDisplayProperty, cloneObject, getComputeFn, attachLayoutInformation } from "./utils";

const computeLayoutHelper = domTree => {
    return getComputeFn(getDisplayProperty(domTree))(domTree);
  },
  computeLayout = (domTree = {}) => {
    let clonedDomTree = cloneObject(domTree),
      calculatedTree;

    clonedDomTree.root = true;
    calculatedTree = computeLayoutHelper(clonedDomTree);
    attachLayoutInformation(domTree, calculatedTree);

    return domTree;
  };

export {
  computeLayout,
  computeLayoutHelper
};
