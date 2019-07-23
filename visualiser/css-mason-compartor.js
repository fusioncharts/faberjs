// import computeLayout from '../dist/main';

function getChild (width = 50, height = 50) {
  return { width, height };
}

const sampleChildren = [
  getChild(),
  getChild(),
  getChild(),
  getChild(),
  getChild(),
  getChild(),
  getChild(),
  getChild(),
  getChild()
];

function getHTMLCSSInlined (masonContainerEl, htmlContainerEl, templateColumns, templateRows, children = sampleChildren) {
  htmlContainerEl.style.display = 'grid';
  htmlContainerEl.style.gridTemplateColumns = templateColumns.map(x => (`${x}px`)).join(" ");
  htmlContainerEl.style.gridTemplateRows = templateRows.map(x => (`${x}px`)).join(" ");

  children.forEach(c => { 
    const childEl = document.createElement('div');
    childEl.classList.add('bordered');
    childEl.style.width = c.width;
    childEl.style.height = c.height;
    htmlContainerEl.appendChild(childEl);
  });

  const computedStyle = getComputedStyle(htmlContainerEl);
  masonContainerEl.style.width = computedStyle.width;
  masonContainerEl.style.height = computedStyle.height;

  masonContainerEl.innerHTML = `
    Template Row: ${computedStyle.gridTemplateRows}
    <br><br>
    Template Columns: ${computedStyle.gridTemplateColumns}
  `;
}

