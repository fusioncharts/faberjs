import {computeGridLayout} from "./grid";
import { DISPLAY_GRID, DISPLAY_FLEX } from "./utils/constants";
import { getDisplayProperty, cloneObject, attachLayoutInformation } from "./utils";

const getComputeFn = (display) => {
    switch(display) {
    case DISPLAY_GRID: return computeGridLayout;
    case DISPLAY_FLEX: return computeGridLayout;
    default:
      // Probably throw unsupported error?
      return computeGridLayout;
    }
  },
  computeLayoutHelper = domTree => {
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
