let addSheetIcon = document.querySelector(".add-sheet");
let sheetsContainer = document.querySelector(".sheets-container");

addSheetIcon.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheets = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheets.length);

  sheet.innerHTML = `<div class="sheet">Sheet${allSheets.length + 1}</div>`;

  sheetsContainer.appendChild(sheet);
  // Creating Database Storage
  createSheetDB();
  createGraphForCycleValidation();

  // Sheet activation
  activateSheet(sheet);
  handleRemoveSheet(sheet);
  sheet.click();
});

/**
 * Creates a new Database for every new sheet
 */
const createSheetDB = () => {
  let storage = [];
  for (let i = 0; i < rows; i++) {
    eachRow = [];
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
        value: "", // To store the cell's value
        formula: "", // Store the formula
        children: [],
      };
      eachRow.push(cell);
    }
    storage.push(eachRow);
  }
  // Add this new sheet database to the collection
  allSheetsContainer.push(storage);
};

/**
 * Creates a new graph database for every sheet for cycle validation
 */
const createGraphForCycleValidation = () => {
  let graph = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push([]);
    }
    graph.push(row);
  }
  graphsContainer.push(graph);
};

/**
 * Access the current sheet using its index
 * @param {*} id The current sheet's index
 */
const accessSheet = (id) => {
  // Use the current sheet's DB
  // 'storage' is the array that holds all the cells data in functionality.js
  storage = allSheetsContainer[id];

  // Use this particular sheet's graph for cycle detection
  // 'graph' is the array that holds all the cells data for cycle detection in cycleValidation.js
  graph = graphsContainer[id];
};

/**
 * Activate the properties of each cell in the sheet by forcing click on each cell
 */
const activateSheetProperties = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(
        `.grid-cell[row_id="${i}"][col_id="${j}"]`,
      );
      cell.click();
    }
  }
  // Set the first cell as the default - QuerySelector will give the first cell
  const firstCell = document.querySelector(".grid-cell");
  firstCell.click();
};

/**
 * Modify the grid's data as per current selected sheet
 * @param {*} sheet The selected sheet
 */
const activateSheet = (sheet) => {
  sheet.addEventListener("click", (e) => {
    // Access sheet's ID
    let sheetID = Number(sheet.getAttribute("id"));
    // Access this particular sheet's database from the collection
    accessSheet(sheetID);
    activateSheetProperties();
    // Update UI - Get all current sheets and remove colors from all
    let currentSheets = document.querySelectorAll(".sheet-folder");
    for (let i = 0; i < currentSheets.length; i++) {
      currentSheets[i].style.backgroundColor = "transparent";
      currentSheets[i].style.color = "#000";
    }
    // Add activation color to the activated sheet
    sheet.style.backgroundColor = "#e1e9f7";
    sheet.style.color = "#0957d0";
  });
};

const handleRemoveSheet = (sheet) => {
  sheet.addEventListener("mousedown", (e) => {
    // 0 - left, 1 - scroll, 2 - right
    if (e.button !== 2) return;
    let currentSheets = document.querySelectorAll(".sheet-folder");
    if (currentSheets.length == 1) {
      return;
    }
    // Access sheet's ID
    let deleteConfirmation = confirm("Delete sheet?");
    if (!deleteConfirmation) return;
    let sheetID = Number(sheet.getAttribute("id"));
    // Delete databases
    allSheetsContainer.splice(sheetID, 1);
    graphsContainer.splice(sheetID, 1);
    // Remove sheet from UI
    sheet.remove();
    // Activate previous sheet by default
    allSheetsContainer[0];
    graphsContainer[0];
    activateSheet(allSheetsContainer[0]);
  });
};
