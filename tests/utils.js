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

export {
  basicTwoCrossTwoNodeWithFourChildren,
  testUndeclearedTracklines,
  testTwoCrossTwoNodesFillParent
};
