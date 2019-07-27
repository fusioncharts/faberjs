import { computeLayout } from "../src/mason";
import { basicTwoCrossTwoNodeWithFourChildren } from "./utils";

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
});
