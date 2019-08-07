import { getDisplayProperty, cloneObject, attachLayoutInformation } from './utils';
import { DISPLAY_GRID, DISPLAY_FLEX } from './utils/constants';
import { computeGridLayout } from './grid';

class LayoutEngine {
  constructor () {
    this.gridLayoutEngine = computeGridLayout;
  }

  compute (domTree) {
    switch (getDisplayProperty(domTree)) {
    case DISPLAY_GRID: return this.gridLayoutEngine(domTree);
    case DISPLAY_FLEX: return this.gridLayoutEngine(domTree);
    default:
      // Probably throw unsupported error?
      return this.gridLayoutEngine(domTree);
    }
  }
}

/**
 * Public API used externally to provide input to layout engine
 *
 * @param {Object} domTree Object containing the layout node information
 */
const computeLayout = (domTree) => {
  const mason = new LayoutEngine();
  let clonedDomTree = cloneObject(domTree),
    calculatedTree;

  clonedDomTree.root = true;
  calculatedTree = mason.compute(clonedDomTree);
  attachLayoutInformation(domTree, calculatedTree);

  return domTree;
};

export {
  computeLayout
};
