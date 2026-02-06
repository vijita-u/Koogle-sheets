// Holds all the sheets
let allSheetsContainer = [];

// Store the entire grid as a 2D Matrix
// Each cell will be a JS object containing the cell properties
let storage = [];

{
  // Create one sheet by default
  let addSheetIcon = document.querySelector(".add-sheet");
  addSheetIcon.click();
}

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underlined = document.querySelector(".underlined");
let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let fontColor = document.querySelector(".font-color");
let bgColor = document.querySelector(".fill-color");
let alignment = document.querySelectorAll(".text-format");
let leftAlign = alignment[0].children[0];
let centerAlign = alignment[0].children[1];
let rightAlign = alignment[0].children[2];
let activeBtnBg = "#d3e3fd";
let activeBtnText = "#041e49";
let inactiveBg = "#f0f4f9";

// Access the cell address
const addressBar = document.querySelector(".address-bar");

// Attach listeners to properties
bold.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProp.bold ? activeBtnBg : inactiveBg;
  bold.style.color = cellProp.bold ? activeBtnText : "#000";
});

italic.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic ? activeBtnBg : inactiveBg;
  italic.style.color = cellProp.italic ? activeBtnText : "#000";
});

underlined.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underlined.style.backgroundColor = cellProp.underline
    ? activeBtnBg
    : inactiveBg;
  underlined.style.color = cellProp.underline ? activeBtnText : "#000";
});

fontSize.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];
  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

bgColor.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];
  cellProp.bgColor = bgColor.value;
  cell.style.backgroundColor = cellProp.bgColor;
  bgColor.value = cellProp.bgColor;
});

leftAlign.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.alignment = "left";
  cell.style.textAlign = "left";
  leftAlign.style.backgroundColor = activeBtnBg;
  centerAlign.style.backgroundColor = inactiveBg;
  rightAlign.style.backgroundColor = inactiveBg;
});

centerAlign.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.alignment = "center";
  cell.style.textAlign = "center";
  leftAlign.style.backgroundColor = inactiveBg;
  centerAlign.style.backgroundColor = activeBtnBg;
  rightAlign.style.backgroundColor = inactiveBg;
});

rightAlign.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(addressBar.value);
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  cellProp.alignment = "right";
  cell.style.textAlign = "right";
  leftAlign.style.backgroundColor = inactiveBg;
  centerAlign.style.backgroundColor = inactiveBg;
  rightAlign.style.backgroundColor = activeBtnBg;
});

/**
 * Map each cell to their distinct properties
 * @param {*} cell Cell in the grid
 */
const mapToProp = (cell) => {
  cell.addEventListener("click", (e) => {
    let [row, column] = decodeAddress(addressBar.value);
    let cell = document.querySelector(
      `.grid-cell[row_id="${row}"][col_id="${column}"]`,
    );
    let cellProp = storage[row][column];

    // Apply all the cell's properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.bgColor;

    // Apply properties to icons
    bold.style.backgroundColor = cellProp.bold ? activeBtnBg : inactiveBg;
    bold.style.color = cellProp.bold ? activeBtnText : "#000";
    italic.style.backgroundColor = cellProp.italic ? activeBtnBg : inactiveBg;
    italic.style.color = cellProp.italic ? activeBtnText : "#000";
    underlined.style.backgroundColor = cellProp.underline
      ? activeBtnBg
      : inactiveBg;
    fontColor.value = cellProp.fontColor;
    bgColor.value = cellProp.bgColor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;

    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeBtnBg;
        centerAlign.style.backgroundColor = inactiveBg;
        rightAlign.style.backgroundColor = inactiveBg;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveBg;
        centerAlign.style.backgroundColor = activeBtnBg;
        rightAlign.style.backgroundColor = inactiveBg;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveBg;
        centerAlign.style.backgroundColor = inactiveBg;
        rightAlign.style.backgroundColor = activeBtnBg;
        break;
    }

    // Update formula bar
    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    // Update cell value
    cell.innerText = cellProp.value;
  });
};

// Map cells to their current property state
let cellsCollection = document.querySelectorAll(".grid-cell");
for (let i = 0; i < cellsCollection.length; i++) {
  mapToProp(cellsCollection[i]);
}

/**
 * Decodes the address to individual row and column numbers
 * @param {*} address The input element that holds a cell's address
 * @returns
 */
const decodeAddress = (address) => {
  let column = address[0].charCodeAt(0) - 65;
  let row = Number(address.slice(1)) - 1; // convert to 0-based index

  return [row, column];
};
