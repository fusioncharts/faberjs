const getDisplayProperty = (domTree) => {
  return domTree.style && domTree.style.display;
};

export {
  getDisplayProperty
};