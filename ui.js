const rows = 100;
const cols = 26;
const rowsCont = document.querySelector(".address-rows");
const colsCont = document.querySelector(".address-columns");
const cellsGrid = document.querySelector(".cells");
const cell = document.querySelector(".grid-cell");
const cellAddressBar = document.querySelector(".address-bar");

// Add cells to this row container
for (let i = 0; i < rows; i++) {
  let rowCell = document.createElement("div");
  rowCell.setAttribute("class", "address-row-cell");
  rowCell.innerText = i + 1;
  rowsCont.appendChild(rowCell);
}

// Add cells to this column container
for (let i = 0; i < cols; i++) {
  let colCell = document.createElement("div");
  colCell.setAttribute("class", "address-col-cell");
  colCell.innerText = String.fromCharCode(65 + i);
  colsCont.appendChild(colCell);
}

// Add grid cells
for (let i = 0; i < rows; i++) {
  let row = document.createElement("div");
  row.setAttribute("class", "grid-rows");
  for (let j = 0; j < cols; j++) {
    let gridCell = document.createElement("div");
    gridCell.setAttribute("class", "grid-cell");
    // Make the cells editable
    gridCell.setAttribute("contenteditable", true);
    gridCell.setAttribute("row_id", i);
    gridCell.setAttribute("col_id", j);
    gridCell.setAttribute("spellcheck", false);
    row.appendChild(gridCell);
    // Add event listener to update address bar on selection
    gridCell.addEventListener("click", (e) => {
      let row = i + 1;
      let col = String.fromCharCode(65 + j);
      cellAddressBar.value = `${col}${row}`;
    });
  }
  cellsGrid.appendChild(row);
}
