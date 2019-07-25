import {computeGridLayout} from "./grid";
import { DISPLAY_GRID, DISPLAY_FLEX } from "./utils/constants";
import { getDisplayProperty } from "./utils";

const getComputeFn = (display) => {
  switch(display) {
    case DISPLAY_GRID: return computeGridLayout;
    case DISPLAY_FLEX: return computeGridLayout;
    default:
    // Probably throw unsupported error?
    return computeGridLayout;
  }
},
computeLayout = (domTree = {}, parent) => {
  return getComputeFn(getDisplayProperty(domTree))(domTree, parent);
};

export {
  computeLayout
};
