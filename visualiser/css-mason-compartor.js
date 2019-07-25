
const chart = {
  style: {
    display: 'grid',
    width: 300,
    height: 300,
    templateRows: ['50', '1fr', '100'],
    templateRowsHTML: ['50px', '1fr', '100px'],
    templateColumns: ['50', '1fr', '100'],
    templateColumnsHTML: ['50px', '1fr', '100px']
  },
  children: [
    {
      style: {
        width: 50,
        height: 50,
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
        display: 'grid',
        templateRows: ['50'],
        templateRowsHTML: ['50px'],
        templateColumns: ['auto', 'auto'],
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
        width: 100,
        height: 50,
        gridRowStart: 1,
        gridRowEnd: 2,
        gridColumnStart: 3,
        gridColumnEnd: 4
      }
    },
    {
      style: {
        width: 50,
        height: 150,
        gridRowStart: 2,
        gridRowEnd: 3,
        gridColumnStart: 1,
        gridColumnEnd: 2
      }
    },
    {
      style: {
        width: 150,
        height: 150,
        gridRowStart: 2,
        gridRowEnd: 3,
        gridColumnStart: 2,
        gridColumnEnd: 3
      }
    },
    {
      style: {
        width: 100,
        height: 150,
        gridRowStart: 2,
        gridRowEnd: 3,
        gridColumnStart: 3,
        gridColumnEnd: 4
      }
    },
    {
      style: {
        width: 50,
        height: 100,
        gridRowStart: 3,
        gridRowEnd: 4,
        gridColumnStart: 1,
        gridColumnEnd: 2
      }
    },
    {
      style: {
        width: 150,
        height: 100,
        gridRowStart: 3,
        gridRowEnd: 4,
        gridColumnStart: 2,
        gridColumnEnd: 3
      }
    },
    {
      style: {
        width: 'auto',
        height: 'auto',
        gridRowStart: 3,
        gridRowEnd: 4,
        gridColumnStart: 3,
        gridColumnEnd: 4
      }
    }
  ],
};

Mason.computeLayout(chart);
console.log(chart);

function getHTMLCSSInlined () {
  const htmlContainerEl = document.getElementsByClassName('html')[0];
  const masonContainerEl = document.getElementsByClassName('mason')[0];
  htmlContainerEl.style.display = 'grid';
  htmlContainerEl.style.gridTemplateColumns = chart.style.templateColumnsHTML.join(" ");
  htmlContainerEl.style.gridTemplateRows = chart.style.templateRowsHTML.join(" ");

  masonContainerEl.style.width = chart.style.width;
  masonContainerEl.style.height = chart.style.height;
  masonContainerEl.style.position = 'relative';

  chart.children.forEach(child => {
    const childEl = document.createElement('div');
    childEl.classList.add('bordered');
    childEl.style.width = child.style.width;
    childEl.style.height = child.style.height;
    childEl.style.position = 'absolute';
    childEl.style.left = child.startX;
    childEl.style.top = child.startY;
    masonContainerEl.appendChild(childEl);
  });

  chart.children.forEach(child => {
    const childEl = document.createElement('div');
    childEl.classList.add('bordered');
    childEl.style.width = child.style.width;
    childEl.style.height = child.style.height;
    htmlContainerEl.appendChild(childEl);
  });
}
