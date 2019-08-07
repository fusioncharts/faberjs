# MASON
Mason is an open-source CSS Grid implementation. Unlike HTML element which can leverage the power of CSS for Grid layouts, objects like SVG or custom objects cannot do that. Hence this library tries to solve that problem.
For example, we have an object storing drawing information like dimensions and styles and then for laying itself in a parent container, Mason can be used.

## Introduction to CSS Grid
CSS Grid Layout is one of the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system. You work with Grid Layout by applying CSS rules both to a parent element (which becomes the Grid Container) and to that element's children (which become Grid Items).

For more details about CSS grids, refer to this awesome guide:
https://css-tricks.com/snippets/css/complete-guide-grid/

## Usage Guide

### Installation

```bash
git clone git@github.com:fusioncharts/mason.git

npm install
npm start 
```

**Define a Grid with template and items**
```js
const parent = {
    style: {
        display: 'grid',
        height: 400,
        width: 500,
        gridTemplateColumns: '100 100',
        gridTemplateRows: '100 100',
        justifyItems: 'center',
        alignItems: 'center',
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 10,
        paddingBottom: 10,
    }
};
const children = [
    {
        style: {
            width: 100,
            height: 100,
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 2
        },
        layout: {}
    },
    {
        style: {
            width: 100,
            height: 100,
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 1,
            gridRowEnd: 2
        },
        layout: {}
    },
    {
        style: {
            width: 100,
            height: 100,
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 2,
            gridRowEnd: 3
        },
        layout: {}
    },
    {
        style: {
            width: 100,
            height: 100,
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 2,
            gridRowEnd: 3
        },
        layout: {}
    }
];
```
**Compute layout**
```js
const layout = computeLayout({
    ...parent,
    children
})

/*
    {
    ...

    "children": [
        {
            "layout": {
                "x": 10,
                "y": 10,
                "x2": 110,
                "y2": 110,
                "width": 100,
                "height": 100
            }
        },
        {
            "layout": {
                "x": 110,
                "y": 10,
                "x2": 210,
                "y2": 110,
                "width": 100,
                "height": 100
            }
        },
        {
            "layout": {
                "x": 10,
                "y": 110,
                "x2": 110,
                "y2": 210,
                "width": 100,
                "height": 100
            }
        },
        {
            "layout": {
                "x": 110,
                "y": 110,
                "x2": 210,
                "y2": 210,
                "width": 100,
                "height": 100
            }
        }
    ]
}
*/
```

### Structure of input
```js
{
    style: {
        height: required,
        width: required,
        display: grid,
        gridTemplateColumns: 'space speparated track sizes',
        gridTemplateRows: 'space speparated track sizes'
    },
    children: [] // Array of grid items which will be laid out
}
```

### Structure of output
```js
{
    layout: {
        x,
        y,
        x2,
        y2
    },
}
```

### Template with line names

```
gridTemplateColumns: '[col-1] 100 [col-2] 100'
gridTemplateRows: '[row-1] 100 [row-2] 100'
```

### Alignments
Standard justification and alignment properties are supported, like justify-items, align-items, justify-self, align-self


## Contribution Guide
Refer the [contributing.md](contributing.md) for more details
