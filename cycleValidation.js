let graphsContainer = [];

// Store the graph as a 2D Matrix
// Each cell represents a node
// Each node is an array of its dependencies in the form [rowID, colID]

// Create graph DS
let graph = [];

/**
 * Detects cycle in the graph
 * @params Graph that stores only parent-child relationship
 * @returns true if cyclic, else false
 */
const isCyclic = (graph) => {
  // Cycle detection 2D Arrays - Default value: false
  let visited = [];
  let onStack = []; // Currently on the stack
  for (let i = 0; i < rows; i++) {
    let visitedRow = [];
    let onStackRow = [];
    for (let j = 0; j < cols; j++) {
      visitedRow.push(false);
      onStackRow.push(false);
    }
    visited.push(visitedRow);
    onStack.push(onStackRow);
  }
  // Check for cycles in this cycle detection 2D Array
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j]) {
        if (cycleDetection(graph, i, j, visited, onStack)) return true;
      }
    }
  }
  return false;
};

/**
 * If the node has both been visited already and is already on the stack, return True
 * @param {*} graph Graph that stores only parent-child relationship
 * @param {*} i Row number
 * @param {*} j Column number
 * @param {*} visited Keeps track of nodes already explored before
 * @param {*} onStack Keeps track on nodes currently on the stack being explored
 * @returns true if cyclic, else false
 */
const cycleDetection = (graph, i, j, visited, onStack) => {
  visited[i][j] = true;
  onStack[i][j] = true;
  // DFS on children
  for (let child = 0; child < graph[i][j].length; child++) {
    let [r, c] = graph[i][j][child]; // Coordinates of each child
    if (visited[r][c] && onStack[r][c]) {
      // Cycle found
      return true;
    }
    // Check if not already visited
    if (!visited[r][c]) {
      let isCyclic = cycleDetection(graph, r, c, visited, onStack);
      if (isCyclic) {
        return true;
      }
    }
  }
  // Once explored, remove the node from the stack if no cycle
  onStack[i][j] = false;
  return false;
};
