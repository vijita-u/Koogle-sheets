// Store the entire grid as a 2D Matrix
// Each cell will be a JS object containing the cell properties
let storage = [];
for (let i = 0; i < rows; i++) {
  each_row = [];
  for (let j = 0; j < cols; j++) {
    let cell = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "14",
      fontColor: "#000",
      bgColor: "#fff",
    };
    each_row.push(cell);
  }
  storage.push(each_row);
}

// Selectors for cell properites
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
const address_bar = document.querySelector(".address-bar");

// Attach listeners to properties
bold.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.bold = !cell_prop.bold;
  cell.style.fontWeight = cell_prop.bold ? "bold" : "normal";
  bold.style.backgroundColor = cell_prop.bold ? activeBtnBg : inactiveBg;
  bold.style.color = cell_prop.bold ? activeBtnText : "#000";
});

italic.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.italic = !cell_prop.italic;
  cell.style.fontStyle = cell_prop.italic ? "italic" : "normal";
  italic.style.backgroundColor = cell_prop.italic ? activeBtnBg : inactiveBg;
  italic.style.color = cell_prop.italic ? activeBtnText : "#000";
});

underlined.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.underline = !cell_prop.underline;
  cell.style.textDecoration = cell_prop.underline ? "underline" : "none";
  underlined.style.backgroundColor = cell_prop.underline
    ? activeBtnBg
    : inactiveBg;
  underlined.style.color = cell_prop.underline ? activeBtnText : "#000";
});

fontSize.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.fontSize = fontSize.value;
  cell.style.fontSize = cell_prop.fontSize + "px";
  fontSize.value = cell_prop.fontSize;
});

fontFamily.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.fontFamily = fontFamily.value;
  cell.style.fontFamily = cell_prop.fontFamily;
  fontFamily.value = cell_prop.fontFamily;
});

fontColor.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];
  cell_prop.fontColor = fontColor.value;
  cell.style.color = cell_prop.fontColor;
  fontColor.value = cell_prop.fontColor;
});

bgColor.addEventListener("change", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  // Access the cell and its properties from storage
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];
  cell_prop.bgColor = bgColor.value;
  cell.style.backgroundColor = cell_prop.bgColor;
  bgColor.value = cell_prop.bgColor;
});

leftAlign.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.alignment = "left";
  cell.style.textAlign = "left";
  leftAlign.style.backgroundColor = activeBtnBg;
  centerAlign.style.backgroundColor = inactiveBg;
  rightAlign.style.backgroundColor = inactiveBg;
});

centerAlign.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.alignment = "center";
  cell.style.textAlign = "center";
  leftAlign.style.backgroundColor = inactiveBg;
  centerAlign.style.backgroundColor = activeBtnBg;
  rightAlign.style.backgroundColor = inactiveBg;
});

rightAlign.addEventListener("click", (e) => {
  let [row, column] = decodeAddress(address_bar.value);
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cell_prop = storage[row][column];

  cell_prop.alignment = "right";
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
    let [row, column] = decodeAddress(address_bar.value);
    let cell = document.querySelector(
      `.grid-cell[row_id="${row}"][col_id="${column}"]`,
    );
    let cell_prop = storage[row][column];

    // Apply all the cell's properties
    cell.style.fontWeight = cell_prop.bold ? "bold" : "normal";
    cell.style.fontStyle = cell_prop.italic ? "italic" : "normal";
    cell.style.textDecoration = cell_prop.underline ? "underline" : "none";
    cell.style.fontSize = cell_prop.fontSize + "px";
    cell.style.fontFamily = cell_prop.fontFamily;
    cell.style.color = cell_prop.fontColor;
    cell.style.backgroundColor = cell_prop.bgColor;

    // Apply properties to icons
    bold.style.backgroundColor = cell_prop.bold ? activeBtnBg : inactiveBg;
    bold.style.color = cell_prop.bold ? activeBtnText : "#000";
    italic.style.backgroundColor = cell_prop.italic ? activeBtnBg : inactiveBg;
    italic.style.color = cell_prop.italic ? activeBtnText : "#000";
    underlined.style.backgroundColor = cell_prop.underline
      ? activeBtnBg
      : inactiveBg;
    fontColor.value = cell_prop.fontColor;
    bgColor.value = cell_prop.bgColor;
    fontSize.value = cell_prop.fontSize;
    fontFamily.value = cell_prop.fontFamily;

    switch (cell_prop.alignment) {
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
  });
};

// Map cells to their current property state
let cells = document.querySelectorAll(".grid-cell");
for (let i = 0; i < cells.length; i++) {
  mapToProp(cells[i]);
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
