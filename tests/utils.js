const basicTwoCrossTwoNodeWithFourChildren = {
  style: {
    display: 'grid',
    width: 400,
    height: 400,
    justifyItems: 'center',
    gridTemplateRows: '[one] 100 [two] 100 [three]',
    gridTemplateColumns: '[one] 100 [two] 100 [three]',
  },
  children: [
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: 'one',
        gridRowEnd: 'two',
        gridColumnStart: 'one',
        gridColumnEnd: 'two'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: 'one',
        gridRowEnd: 'two',
        gridColumnStart: 'two',
        gridColumnEnd: '3'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '2',
        gridRowEnd: '3',
        gridColumnStart: '1',
        gridColumnEnd: '2'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: 'two',
        gridRowEnd: 'three',
        gridColumnStart: 'two',
        gridColumnEnd: 'three'
      }
    }
  ]
};

const testUndeclearedTracklines = {
  style: {
    display: 'grid',
    width: 400,
    height: 400,
    justifyItems: 'center'
  },
  children: [
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '1',
        gridRowEnd: '2',
        gridColumnStart: '1',
        gridColumnEnd: '2'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: 'one',
        gridRowEnd: 'two',
        gridColumnStart: 'two',
        gridColumnEnd: '3'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '2',
        gridRowEnd: '3',
        gridColumnStart: '1',
        gridColumnEnd: '2'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: 'two',
        gridRowEnd: 'three',
        gridColumnStart: 'two',
        gridColumnEnd: 'three'
      }
    }
  ]
};

const testTwoCrossTwoNodesFillParent = {
  style: {
    display: 'grid',
    width: 400,
    height: 400,
    justifyItems: 'center'
  },
  children: [
    {
      style: {
        width: 200,
        height: '200',
        gridRowStart: '1',
        gridRowEnd: '2',
        gridColumnStart: '1',
        gridColumnEnd: '2'
      }
    },
    {
      style: {
        width: 200,
        height: '200',
        gridRowStart: '1',
        gridRowEnd: '2',
        gridColumnStart: '2',
        gridColumnEnd: '3'
      }
    },
    {
      style: {
        width: 200,
        height: '200',
        gridRowStart: '2',
        gridRowEnd: '3',
        gridColumnStart: '1',
        gridColumnEnd: '2'
      }
    },
    {
      style: {
        width: 200,
        height: '200',
        gridRowStart: '2',
        gridRowEnd: '3',
        gridColumnStart: '2',
        gridColumnEnd: '3'
      }
    }
  ]
};

const testMultiNameTrackLines = {
  style: {
    display: 'grid',
    width: 400,
    height: 400,
    justifyItems: 'center',
    alignItems: 'center',
    gridTemplateRows: '[one] 200px [two] 200px [three three-dash]',
    gridTemplateColumns: '[one] 200px [two] 200px [three three-dash]',
    templateRowsHTML: ['[one]', '200px', '[two]', '200px', '[three]'],
    templateColumnsHTML: ['[one]', '200px', '[two]', '200px', '[three three-dash]']
  },
  children: [
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '1',
        gridRowEnd: 'three',
        gridColumnStart: '1',
        gridColumnEnd: 'three-dash'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '1',
        gridRowEnd: '2',
        gridColumnStart: '2',
        gridColumnEnd: '3'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '2',
        gridRowEnd: '3',
        gridColumnStart: '1',
        gridColumnEnd: '2'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '2',
        gridRowEnd: '3',
        gridColumnStart: '2',
        gridColumnEnd: '3'
      }
    }
  ]
};

const testGridColumnGridRowProperties = {
  style: {
    display: 'grid',
    width: 400,
    height: 400,
    justifyItems: 'center',
    alignItems: 'center',
    gridTemplateRows: '[one] 200px [two] 200px [three three-dash]',
    gridTemplateColumns: '[one] 200px [two] 200px [three three-dash]',
    templateRowsHTML: ['[one]', '200px', '[two]', '200px', '[three three-dash]'],
    templateColumnsHTML: ['[one]', '200px', '[two]', '200px', '[three three-dash]']
  },
  children: [
    {
      style: {
        width: 100,
        height: '100',
        gridRow: '1 / span 2',
        gridColumn: '1 / three-dash'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRow: '1 / 2',
        gridColumnStart: '2',
        gridColumnEnd: '3'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRowStart: '2',
        gridRowEnd: '3',
        gridColumn: '1 / 2'
      }
    },
    {
      style: {
        width: 100,
        height: '100',
        gridRow: '2 / three',
        gridColumn: 'two / 3'
      }
    }
  ]
};

const isCloseTo = (arg1, arg2, maxBuffer = 0) => {
  if (Math.abs(arg1 - arg2) <= maxBuffer) {
    return true;
  }
  return false;
};

export {
  basicTwoCrossTwoNodeWithFourChildren,
  testUndeclearedTracklines,
  testTwoCrossTwoNodesFillParent,
  testMultiNameTrackLines,
  testGridColumnGridRowProperties,
  isCloseTo
};
