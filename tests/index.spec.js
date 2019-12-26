import { computeLayout } from "../src/faber";
import { basicTwoCrossTwoNodeWithFourChildren, testUndeclearedTracklines, testTwoCrossTwoNodesFillParent, testMultiNameTrackLines, testGridColumnGridRowProperties, isCloseTo } from "./utils";

describe('Grid Sizing test', () => {
  it('Grid should return layout with x,x2,y,y2,width and height', () => {
    const result = computeLayout(basicTwoCrossTwoNodeWithFourChildren);

    result.children.forEach(c => {
      expect(c.hasOwnProperty('layout')).toBe(true);
      expect(c.layout.hasOwnProperty('x')).toBe(true);
      expect(c.layout.hasOwnProperty('x2')).toBe(true);
      expect(c.layout.hasOwnProperty('y')).toBe(true);
      expect(c.layout.hasOwnProperty('y2')).toBe(true);
      expect(c.layout.hasOwnProperty('width')).toBe(true);
      expect(c.layout.hasOwnProperty('height')).toBe(true);
    });

  });

  it('A 2 X 2 grid with 4 children and 100 100 100 100 tracks', () => {
    const result = computeLayout(basicTwoCrossTwoNodeWithFourChildren),
      expectedGrid = [{
        x: 0,
        x2: 100,
        y: 0,
        y2: 100
      },
      {
        x: 100,
        x2: 200,
        y: 0,
        y2: 100
      },
      {
        x: 0,
        x2: 100,
        y: 100,
        y2: 200
      },
      {
        x: 100,
        x2: 200,
        y: 100,
        y2: 200
      }];

    result.children.forEach((c, index) => {
      expect(c.layout.height).toBe(100);
      expect(c.layout.width).toBe(100);

      expect(c.layout.x).toBe(expectedGrid[index].x);
      expect(c.layout.x2).toBe(expectedGrid[index].x2);
      expect(c.layout.y).toBe(expectedGrid[index].y);
      expect(c.layout.y2).toBe(expectedGrid[index].y2);
    });

  });

  it('A 2X2 grid with 4 children without gridTemplateColumns gridTemplateRows engine should work', () => {
    const result = computeLayout(testUndeclearedTracklines);

    result.children.forEach(c => {
      expect(c.hasOwnProperty('layout')).toBe(true);
      expect(c.layout.hasOwnProperty('x')).toBe(true);
      expect(c.layout.hasOwnProperty('x2')).toBe(true);
      expect(c.layout.hasOwnProperty('y')).toBe(true);
      expect(c.layout.hasOwnProperty('y2')).toBe(true);
      expect(c.layout.hasOwnProperty('width')).toBe(true);
      expect(c.layout.hasOwnProperty('height')).toBe(true);
    });
  });

  it('A 2X2 grid with 4 children 200 200 200 200 without gridTemplateColumns gridTemplateRows', () => {
    const result = computeLayout(testTwoCrossTwoNodesFillParent),
    expectedGrid = [{
      x: 0,
      x2: 200,
      y: 0,
      y2: 200
    },
    {
      x: 200,
      x2: 400,
      y: 0,
      y2: 200
    },
    {
      x: 0,
      x2: 200,
      y: 200,
      y2: 400
    },
    {
      x: 200,
      x2: 400,
      y: 200,
      y2: 400
    }];

    result.children.forEach((c, index) => {
      expect(c.layout.height).toBe(200);
      expect(c.layout.width).toBe(200);

      expect(c.layout.x).toBe(expectedGrid[index].x);
      expect(c.layout.x2).toBe(expectedGrid[index].x2);
      expect(c.layout.y).toBe(expectedGrid[index].y);
      expect(c.layout.y2).toBe(expectedGrid[index].y2);
    });
  });

  it('Grid container containing track line identified with multiple track names', () => {
    const result = computeLayout(testMultiNameTrackLines),
    expectedGrid = [{
      x: 150,
      x2: 250,
      y: 150,
      y2: 250
    },
    {
      x: 250,
      x2: 350,
      y: 50,
      y2: 150
    },
    {
      x: 50,
      x2: 150,
      y: 250,
      y2: 350
    },
    {
      x: 250,
      x2: 350,
      y: 250,
      y2: 350
    }];

    result.children.forEach((c, index) => {
      expect(c.layout.height).toBe(100);
      expect(c.layout.width).toBe(100);

      expect(c.layout.x).toBe(expectedGrid[index].x);
      expect(c.layout.x2).toBe(expectedGrid[index].x2);
      expect(c.layout.y).toBe(expectedGrid[index].y);
      expect(c.layout.y2).toBe(expectedGrid[index].y2);
    });
  });

  it('Grid children with grid-column grid-row property', () => {
    const result = computeLayout(testGridColumnGridRowProperties),
    expectedGrid = [{
      x: 150,
      x2: 250,
      y: 150,
      y2: 250
    },
    {
      x: 250,
      x2: 350,
      y: 50,
      y2: 150
    },
    {
      x: 50,
      x2: 150,
      y: 250,
      y2: 350
    },
    {
      x: 250,
      x2: 350,
      y: 250,
      y2: 350
    }];

    result.children.forEach((c, index) => {
      expect(c.layout.height).toBe(100);
      expect(c.layout.width).toBe(100);

      expect(c.layout.x).toBe(expectedGrid[index].x);
      expect(c.layout.x2).toBe(expectedGrid[index].x2);
      expect(c.layout.y).toBe(expectedGrid[index].y);
      expect(c.layout.y2).toBe(expectedGrid[index].y2);
    });
  });
});

describe('Grid with non-spanning items test', () => {
  it('Space should be distributed equally among all auto tracks when none of the items provided any dimension', () => {
    let nodeTree = {
      style: {
        display: 'grid',
        width: 700,
        height: 500,
        gridTemplateColumns: 'auto auto auto',
        gridTemplateRows: 'auto auto auto'
      },
      children: [
        {
          style: {
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 2,
          }
        },
        {
          style: {
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 2,
            gridRowEnd: 3,
          }
        },
        {
          style: {
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 2,
          }
        },
        {
          style: {
            gridColumnStart: 3,
            gridColumnEnd: 4,
            gridRowStart: 3,
            gridRowEnd: 4,
          }
        }
      ]
    };

    computeLayout(nodeTree);
    nodeTree.children.forEach(child => {
      expect(isCloseTo(child.layout.width, 233, 0.35)).toBe(true);
      expect(isCloseTo(child.layout.height, 167, 0.35)).toBe(true);
    });
  });

  it('Tracks should consider min-content contribution of its item before deciding its size', () => {
    let nodeTree = {
      style: {
        display: 'grid',
        width: 700,
        height: 500,
        gridTemplateColumns: 'auto auto auto',
        gridTemplateRows: 'auto auto auto'
      },
      children: [
        {
          style: {
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 2,
            width: 400
          }
        },
        {
          style: {
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 1,
            gridRowEnd: 2,
            width: 100
          }
        },
        {
          style: {
            gridColumnStart: 3,
            gridColumnEnd: 4,
            gridRowStart: 1,
            gridRowEnd: 2,
            width: 140
          }
        },
        {
          style: {
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        },
        {
          style: {
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        },
        {
          style: {
            gridColumnStart: 3,
            gridColumnEnd: 4,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        }
      ]
    },
    expectedOutput = [400, 100, 140, 420, 120, 160];

    computeLayout(nodeTree);
    nodeTree.children.forEach((child, index) => {
      expect(isCloseTo(child.layout.width, expectedOutput[index])).toBe(true);
    });
  });
});

describe('Grid autoFlow test', () => {
  it('GridMatrix should create proper no of rows and columns and should not throw error', () => {
    let nodeTree = {
      style: {
        display: 'grid',
        width: 700,
        height: 500
      },
      children: [
        {
          style: {
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        },
        {
          style: {
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        },
        {
          style: {
            gridColumnStart: 3,
            gridColumnEnd: 4,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        },
        {
          style: {
            gridColumnStart: 4,
            gridColumnEnd: 5,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        },
        {
          style: {
            gridColumnStart: 5,
            gridColumnEnd: 6,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        },
        {
          style: {
            gridColumnStart: 6,
            gridColumnEnd: 7,
            gridRowStart: 1,
            gridRowEnd: 2
          }
        }
      ]
    };
    computeLayout(nodeTree);
  });
});
