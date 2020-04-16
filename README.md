# FaberJS [![Build Status](https://travis-ci.org/fusioncharts/faberjs.svg?branch=develop)](https://travis-ci.org/fusioncharts/faberjs)

FaberJS is an open-source layouting engine currently supporting CSS Grid like declarations. Unlike HTML element which can leverage the power of CSS for Grid layouts, objects like SVG or custom objects cannot do that. Hence this library tries to solve that problem.
For example, we have an object storing drawing information like dimensions and styles and then for laying itself in a parent container, FaberJS can be used.

## Introduction to CSS Grid
CSS Grid Layout is one of the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system. You work with Grid Layout by applying CSS rules both to a parent element (which becomes the Grid Container) and to that element's children (which become Grid Items).

For more details about CSS grids, refer to this awesome guide:
https://css-tricks.com/snippets/css/complete-guide-grid/

## Usage Guide

### Installation


```bash
git clone git@github.com:fusioncharts/faberjs.git
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
        }
    },
    {
        style: {
            width: 100,
            height: 100,
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 1,
            gridRowEnd: 2
        }
    },
    {
        style: {
            width: 100,
            height: 100,
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 2,
            gridRowEnd: 3
        }
    },
    {
        style: {
            width: 100,
            height: 100,
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 2,
            gridRowEnd: 3
        }
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
            "style": {
                "x": 10,
                "y": 10,
                "x2": 110,
                "y2": 110,
                "width": 100,
                "height": 100
            }
        },
        {
            "style": {
                "x": 110,
                "y": 10,
                "x2": 210,
                "y2": 110,
                "width": 100,
                "height": 100
            }
        },
        {
            "style": {
                "x": 10,
                "y": 110,
                "x2": 110,
                "y2": 210,
                "width": 100,
                "height": 100
            }
        },
        {
            "style": {
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
Each node will receive a layout object containing the following information.
```js
{
    layout: {
        x,
        y,
        x2,
        y2,
        width,
        height
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

Refer the [CONTRIBUTING.md](contributing.md) before starting any contribution.

## License
Copyright 2020 FusionCharts, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.