const rows = 100;
const cols = 26;
const rows_cont = document.querySelector(".address-rows");
const cols_cont = document.querySelector(".address-columns");
const cells_grid = document.querySelector(".cells");
const cell = document.querySelector(".grid-cell");
const cell_address_bar = document.querySelector(".address-bar");

// Add cells to this row container
for (let i = 0; i < rows; i++) {
  let row_cell = document.createElement("div");
  row_cell.setAttribute("class", "address-row-cell");
  row_cell.innerText = i + 1;
  rows_cont.appendChild(row_cell);
}

// Add cells to this column container
for (let i = 0; i < cols; i++) {
  let col_cell = document.createElement("div");
  col_cell.setAttribute("class", "address-col-cell");
  col_cell.innerText = String.fromCharCode(65 + i);
  cols_cont.appendChild(col_cell);
}

// Add grid cells
for (let i = 0; i < rows; i++) {
  let row = document.createElement("div");
  row.setAttribute("class", "grid-rows");
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "grid-cell");
    // Make the cells editable
    cell.setAttribute("contenteditable", true);
    cell.setAttribute("row_id", i);
    cell.setAttribute("col_id", j);
    cell.setAttribute("spellcheck", false);
    row.appendChild(cell);
    // Add event listener to update address bar on selection
    cell.addEventListener("click", (e) => {
      let row = i + 1;
      let col = String.fromCharCode(65 + j);
      cell_address_bar.value = `${col}${row}`;
    });
  }
  cells_grid.appendChild(row);
}

// Set the first cell as the default - QuerySelector will give the first cell
const first_cell = document.querySelector(".grid-cell");
first_cell.click();
