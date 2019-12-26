const chart = {
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

const chart2 = {
  style: {
    display: 'grid',
    width: 700,
    height: 400,
    justifyItems: 'center',
    // gridTemplateRows: ['50', '1fr', '100'],
    //gridTemplateRows: '[one] auto [two] auto [three]',
    templateRowsHTML: ['50px', '1fr', '100px'],
    // gridTemplateColumns: ['50', '1fr', '100'],
    //gridTemplateColumns: '[one] auto [two] auto [three] auto [four]',
    templateColumnsHTML: ['50px', '1fr', '100px']
  },
  children: [
    {
      style: {
        width: 100,
        height: 'auto',
        gridRowStart: 'one',
        gridRowEnd: 'two',
        gridColumnStart: 'one',
        gridColumnEnd: 'two'
      }
    },
    {
      style: {
        width: 'auto',
        height: 'auto',
        display: 'grid',
        gridTemplateRows: '50',
        templateRowsHTML: ['50px'],
        gridTemplateColumns: 'auto auto',
        templateColumnsHTML: ['50px', '100px'],
        gridRowStart: 1,
        gridRowEnd: 2,
        gridColumnStart: 2,
        gridColumnEnd: 3,
      },
      children: [
        {
          style: {
            width: 'auto',
            height: 'auto',
            gridRowStart: 1,
            gridRowEnd: 2,
            gridColumnStart: 1,
            gridColumnEnd: 2
          }
        },
        {
          style: {
            width: 'auto',
            height: 'auto',
            gridRowStart: 1,
            gridRowEnd: 2,
            gridColumnStart: 2,
            gridColumnEnd: 3
          }
        }
      ]
    },
    {
      style: {
        width: 'auto',
        height: 50,
        gridRowStart: 2,
        gridRowEnd: 'three',
        gridColumnStart: 3,
        gridColumnEnd: 4
      }
    },
    // {
    //   style: {
    //     width: 50,
    //     height: 150,
    //     gridRowStart: 2,
    //     gridRowEnd: 3,
    //     gridColumnStart: 1,
    //     gridColumnEnd: 2
    //   }
    // },
    // {
    //   style: {
    //     width: 150,
    //     height: 150,
    //     gridRowStart: 2,
    //     gridRowEnd: 3,
    //     gridColumnStart: 2,
    //     gridColumnEnd: 3
    //   }
    // },
    // {
    //   style: {
    //     width: 100,
    //     height: 150,
    //     gridRowStart: 2,
    //     gridRowEnd: 3,
    //     gridColumnStart: 3,
    //     gridColumnEnd: 4
    //   }
    // },
    // {
    //   style: {
    //     width: 50,
    //     height: 100,
    //     gridRowStart: 3,
    //     gridRowEnd: 4,
    //     gridColumnStart: 1,
    //     gridColumnEnd: 2
    //   }
    // },
    // {
    //   style: {
    //     width: 150,
    //     height: 100,
    //     gridRowStart: 3,
    //     gridRowEnd: 4,
    //     gridColumnStart: 2,
    //     gridColumnEnd: 3
    //   }
    // },
    // {
    //   style: {
    //     width: 'auto',
    //     height: 'auto',
    //     gridRowStart: 3,
    //     gridRowEnd: 4,
    //     gridColumnStart: 3,
    //     gridColumnEnd: 4
    //   }
    // }
  ],
};

console.log(faber.computeLayout(chart));

function getHTMLCSSInlined () {
  const htmlContainerEl = document.getElementsByClassName('html')[0];
  const faberContainerEl = document.getElementsByClassName('faber')[0];
  htmlContainerEl.style.display = 'grid';
  htmlContainerEl.style.gridTemplateColumns = chart.style.templateColumnsHTML.join(" ");
  htmlContainerEl.style.gridTemplateRows = chart.style.templateRowsHTML.join(" ");
  htmlContainerEl.style.justifyItems = chart.style.justifyItems;
  htmlContainerEl.style.alignItems = chart.style.alignItems;
  htmlContainerEl.style.width = chart.style.width;
  htmlContainerEl.style.height = chart.style.height;

  faberContainerEl.style.width = chart.style.width;
  faberContainerEl.style.height = chart.style.height;
  faberContainerEl.style.position = 'relative';

  chart.children.forEach(child => {
    const childEl = document.createElement('div');
    childEl.classList.add('bordered');
    childEl.style.width = child.style.width;
    childEl.style.height = child.style.height;
    childEl.style.position = 'absolute';
    childEl.style.left = child.layout.x;
    childEl.style.top = child.layout.y;
    faberContainerEl.appendChild(childEl);
  });

  chart.children.forEach(child => {
    const childEl = document.createElement('div');
    childEl.classList.add('bordered');
    childEl.style.width = child.style.width;
    childEl.style.height = child.style.height;
    if(child.style.gridColumnStart) {
      childEl.style.gridColumnStart = child.style.gridColumnStart;
      childEl.style.gridColumnEnd = child.style.gridColumnEnd;
    }else if(child.style.gridColumn){
      childEl.style.gridColumn = child.style.gridColumn;
    }
    if(child.style.gridRowStart) {
      childEl.style.gridRowStart = child.style.gridRowStart;
      childEl.style.gridRowEnd = child.style.gridRowEnd;
    }else if(child.style.gridRow){
      childEl.style.gridRow = child.style.gridRow;
    }
    htmlContainerEl.appendChild(childEl);
  });
}
