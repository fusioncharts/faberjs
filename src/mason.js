import computeGridLayout from "./grid";
import { DISPLAY_GRID, DISPLAY_FLEX } from "./constants";

const getComputeFn = (display) => {
  switch(display) {
    case DISPLAY_GRID: return computeGridLayout;
    case DISPLAY_FLEX: return computeGridLayout;
    default:
    // Probably throw unsupported error?
    return computeGridLayout;
  }
},
computeLayout = domTree => {
  return getComputeFn(domTree.display)(domTree);
};

export {
  computeLayout
};
