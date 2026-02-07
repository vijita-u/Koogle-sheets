# Google-sheets

## Overview

This project is a web-based spreadsheet application inspired by Google Sheets. It was created as a learning project to practice front-end development and apply graph traversal algorithms in a real scenario. After learning about graph algorithms (like Depth-First Search) in university, I was motivated by my professor's lessons to implement those concepts in a practical project. The result is a simplified spreadsheet clone built with HTML, CSS, and vanilla JavaScript, mimicking core features of Google Sheets.

## Features

1. **Spreadsheet Grid Interface**: An interactive grid of cells with column labels (A, B, C, ...) and row numbers, similar to Google Sheets. Each cell can be clicked to edit its content or to enter a formula.

2. **Cell Formatting Options**: Toolbar buttons allow basic text formatting:
   - Bold, Italic, Underline: Toggle these styles on the selected cell’s text.
   - Font Family & Size: Choose among fonts (Monospace, Arial, Times New Roman) and set font size (12, 14, 16, 18, 20px).
   - Text Color & Cell Background: Pick text color and fill color for cells.
   - Text Alignment: Align cell content to left, center, or right.

3. **Formula Bar & Cell Referencing**: A formula bar (with a small fx icon) lets you enter formulas starting with cell references. For example, you can enter a formula like A1 + B2 to have a cell compute the sum of values from cell A1 and B2. The computed result displays in the cell, while the formula itself is stored.

4. **Reactive Formula Updates**: If you change the value of any cell that is referenced in other cells' formulas, all dependent cells update automatically. The app maintains a dependency graph of cells to recalculate values whenever an upstream cell changes.

5. **Cycle Detection (Graph Traversal)**: The project uses a graph traversal algorithm (Depth-First Search) to detect circular references in formulas. If you create a formula that would cause a cyclic dependency (for example, A1 depends on B2, and B2 depends on A1), the app will detect the cycle and prevent it, avoiding infinite loops in calculation.

6. **Multiple Sheets Support**: You can create multiple sheets within the workbook: Click the “+” (Add Sheet) button at the bottom to add a new sheet. Each sheet has its own independent data storage. And you can switch between them by clicking the sheet tabs.

7. **Remove Sheets**: Right-click on a sheet tab to get an option to delete that sheet (a confirmation is shown to prevent accidental deletion). Note that at least one sheet will always remain (you cannot delete the last sheet).

## Getting Started

You can try out the project in either of the following ways:

**Live Demo**: The project is hosted via GitHub Pages. Click here to open the live demo and start playing with the spreadsheet in your browser.

**Run Locally**: Clone or download this repository and open the index.html file (located in the public folder) in your web browser. No build process or server setup is required since it's plain HTML/CSS/JS.
Tip: If the formatting icons (like the Google icon or toolbar icons) don’t show up properly when opening the file directly, you might want to serve the files using a simple static server (or use VSCode Live Server extension) to ensure all resources load correctly.

## Project Structure

```
Google-sheets/
├── public/
│   ├── index.html        # Main HTML file for the spreadsheet UI
│   ├── style.css         # CSS styling for the UI, making it look like Google Sheets
│   └── icons8-google-48.png  # Icon image used in the header (Google logo)
├── functionality.js      # Handles cell formatting toolbar logic and cell selection
├── formula.js            # Handles formula input, evaluation, and dependency management
├── cycleValidation.js    # Implements cycle detection in the formula dependency graph
├── sheetsHandling.js     # Manages adding/removing sheets and switching between them
└── README.md             # Project documentation (you're reading it!)

```

## Future Improvements
While the clone covers the basics, there are many ways it could be extended or improved in the future:

1. **More Formula Functions**: Support common spreadsheet functions (SUM, AVG, etc.) and a better formula parser instead of using eval.
2. **Persistence**: Implement saving and loading of sheet data (possibly via localStorage or a backend) so that data isn’t lost on refresh.
3. **UI Enhancements**: Allow renaming of sheets or double-click to edit cell content (currently you have to start typing or use formula bar).
4. **Performance Optimization**: Optimize the update cycle for very large numbers of cells and complex dependency chains (the current approach might get slow with hundreds of formulas due to recursive updates).
