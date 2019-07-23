import { getDisplayProperty } from "../utils";
import { computeLayout } from "../mason";

export default function computeGridLayout (domTree) {
  if(getDisplayProperty(domTree)) {
    //TODO: fix me
    return computeLayout(domTree);
  }
}