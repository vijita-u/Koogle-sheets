// Apply event listener to all the cells
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(
      `.grid-cell[row_id="${i}"][col_id="${j}"]`,
    );
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [row, column] = decodeAddress(address);
      let cell = document.querySelector(
        `.grid-cell[row_id="${row}"][col_id="${column}"]`,
      );
      let cellProp = storage[row][column];
      let dataInCell = cell.innerText;

      // On NO data change
      if (dataInCell == cellProp.value) return;
      cellProp.value = dataInCell;

      // On data change
      // Remove parent child relationship, if any
      removeChild(cellProp.formula);
      // Remove old formula
      cellProp.formula = "";
      // Update children
      updateChildren(address);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  // Check for empty value
  formula = formulaBar.value;
  if (e.key == "Enter" && formula) {
    let evaluatedVal = evaluateFormula(formula);

    // Check for change in formula
    let address = addressBar.value;
    let [row, column] = decodeAddress(address);
    let cellProp = storage[row][column];
    if (formula !== cellProp.formula) removeChild(cellProp.formula);

    // Add edges for the new formula, then validate for cycles. If cyclic, revert.
    addChildToParentCell(formula);
    if (isCyclic(graph)) {
      console.log("Cycle detected");
      // Revert added edges
      removeChild(formula);
      console.log("Removed added parent-child relationship");
      return;
    }

    updateUIAndStorage(evaluatedVal, formula, address);
    addChildToParentCell(formula);
    updateChildren(address);
  }
});

/**
 * Using Depth-First-Search (DFS), update all the children of the parent
 * @param {*} parentAddress The parent cell's address
 */
const updateChildren = (parentAddress) => {
  let [row, column] = decodeAddress(parentAddress);
  let parentCellProp = storage[row][column];
  let children = parentCellProp.children;

  // DFS
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [row, column] = decodeAddress(childAddress);
    let childCellProp = storage[row][column];
    let childFormula = childCellProp.formula;

    let evaluatedVal = evaluateFormula(childFormula);
    updateUIAndStorage(evaluatedVal, childFormula, childAddress);
    updateChildren(childAddress); // DFS
  }
};

/**
 * Remove edges with previous parent on change in formula
 * @param {*} oldFormula Old cell formula
 */
const removeChild = (oldFormula) => {
  let childAddress = addressBar.value;
  let encodedFormula = oldFormula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [row, column] = decodeAddress(encodedFormula[i]);
      let ParentCellProp = storage[row][column];
      let index = ParentCellProp.children.indexOf(childAddress);
      ParentCellProp.children.splice(index, 1); // Remove the child at that index in the children array
    }
  }
};

/**
 * Derive parent from formula and add the current cell as the parent's child
 * @param {*} formula The current cell's formula
 */
const addChildToParentCell = (formula) => {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      let [row, column] = decodeAddress(encodedFormula[i]);
      let ParentCellProp = storage[row][column];
      ParentCellProp.children.push(childAddress);

      // Add this dependency to the 2D Matrix also
      graph[row][column].push(decodeAddress(childAddress));
    }
  }
};

/**
 * Evaluate and return the result of the given formula
 * @param {*} formula The formula mentioned in the formula bar
 * @returns
 */
const evaluateFormula = (formula) => {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiVal = encodedFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      // Check if it is a dependency expression or not
      let [row, column] = decodeAddress(encodedFormula[i]);
      let cellProp = storage[row][column];
      encodedFormula[i] = cellProp.value; // Replace the dependency with its value
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
};

/**
 * Updates both the UI and database
 * @param {*} evaluatedVal The value evaluated from the formula
 * @param {*} formula The formula of that cell
 */
const updateUIAndStorage = (evaluatedVal, formula, address) => {
  let [row, column] = decodeAddress(address);
  let cell = document.querySelector(
    `.grid-cell[row_id="${row}"][col_id="${column}"]`,
  );
  let cellProp = storage[row][column];

  // Update UI
  cell.innerText = evaluatedVal;
  // Update storage
  cellProp.value = evaluatedVal;
  cellProp.formula = formula;
};
