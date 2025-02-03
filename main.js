// Global flag used to know when the knight is being dragged.
let knightIsDragging = false;

document.addEventListener("DOMContentLoaded", () => {
  const knight = document.getElementById("knight");
  const board = document.querySelector(".board");

  // Attach drag event listeners only to the knight.
  knight.addEventListener("dragstart", handleDragStart);
  knight.addEventListener("dragend", handleDragEnd);

  // Create 64 cells (8 x 8) and attach drop listeners to each.
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "dropzone");
      // Ensure cells are not draggable.
      cell.setAttribute("draggable", "false");

      // Save position as data attributes.
      cell.dataset.row = row;
      cell.dataset.col = col;

      // Set alternating colors.
      cell.style.backgroundColor = (row + col) % 2 === 0 ? "#a8dadc" : "#5b90b1";

      // Attach drop-related event listeners.
      cell.addEventListener("dragover", handleOver);
      cell.addEventListener("dragenter", handleEnter);
      cell.addEventListener("dragleave", handleLeave);
      cell.addEventListener("drop", handleDrop);

      board.appendChild(cell);
    }
  }

  // Place the knight in an initial cell (for example, cell at row 0, col 0).
  const initialCell = board.querySelector(".dropzone[data-row='4'][data-col='2']");
  initialCell.appendChild(knight);
});

function handleDragStart(ev) {
  knightIsDragging = true;
  ev.dataTransfer.effectAllowed = "move";
  // Set a token "knight" so that the drop handler knows what is being dragged.
  ev.dataTransfer.setData("text/plain", "knight");
  setTimeout(function() {
    knight.style.visibility = "hidden";
  }, 1);
}
  
function handleDragEnd(ev) {
  knightIsDragging = false;
  ev.target.style.visibility = "visible";
}

function handleOver(ev) {
  ev.preventDefault(); // Necessary to allow drop.
  if (!knightIsDragging) return; // Only process if the knight is being dragged.
  ev.dataTransfer.dropEffect = "move";
//   ev.target.style.cursor = "grabbing";
}

function handleEnter(ev) {
  ev.preventDefault();
  // Ensure this only applies when the knight is being dragged.
  if (!knightIsDragging) return;
  const cell = ev.currentTarget; // currentTarget is the cell.
  cell.classList.add("over");
}

function handleLeave(ev) {
  ev.preventDefault();
  const cell = ev.currentTarget;
  cell.classList.remove("over");
}

function handleDrop(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  
  const cell = ev.currentTarget; // Get the drop target cell.
  cell.classList.remove("over");

  // Verify the dragged data is from the knight.
  const draggedToken = ev.dataTransfer.getData("text/plain");
  if (draggedToken !== "knight") return;
  
  // Obtain the knight element.
  const knight = document.getElementById("knight");
  if (!knight) return;

  // If the cell already contains the knight, do nothing.
  if (cell.contains(knight)) return;
  
  // Append the knight to the cell (this moves the knight from its previous parent).
  cell.appendChild(knight);
  
  // Extract and log the cell's row and column from its data attributes.
  const row = cell.dataset.row;
  const col = cell.dataset.col;
  console.log(`Knight dropped in cell at row ${row}, col ${col}`);
}


const validKnightMoves = [
    [2, 1], 
    [2, -1], 
    [-2, 1],  
    [-2, -1],
    [1, 2],   
    [1, -2],  
    [-1, 2], 
    [-1, -2]  
];
  
function knightMoves (startNode, endNode) {
    // create 8x8 array to keep track of visited nodes
    const visited = Array(8)
    .fill(0) // Initialize with `0` initially
    .map(() => Array(8).fill(false)); // Fill all with false

    // create a prev 8x8 array to store the previous node visited for each node
    const prev = Array(8)
    .fill(0) // Initialize with `0` initially
    .map(() => Array(8).fill(null)); // Fill all with null

    // Make a queue to keep track of which nodes to visit next
    const queue = [startNode]; // Add start node to the q
    visited[startNode[0]][startNode[1]] = true // Assign start node as visited

    let minDistance = 0; // Keep counter for min distance
    
    // BFS loop:
    while(queue.length) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            let currentNode = queue.shift();

            // If we find the endNode, stop the search and return shortest distance
            if (currentNode[0] === endNode[0] && currentNode[1] === endNode[1]){
                const path = reconstructPath(prev, startNode, endNode)
                return [minDistance, path];
            }

            // For the current node, get all the valid moves from that node
            const nextNodes = getValidMovesToNodes(currentNode);
            nextNodes.forEach(node => {
                // Each move will take us to a new node
                if (!visited[node[0]][node[1]]) {
                    // If the node is NOT visited, visit it and add to queue to be explored 
                    // in the next level of the BFS
                    visited[node[0]][node[1]] = true;
                    // Record that the current node is actually a parent/predecessor to this nextNode
                    prev[node[0]][node[1]] = currentNode;
                    queue.push(node);
                }
            });
        }
        // After going through a level, increment the shortest distance by 1
        // as each of the nodes visited so far were one move from the previous level
        // and this is it the shortest distance to any node in that level
        minDistance++;
    }  

    // If no path found to the endNode, although this should never trigger as all end nodes can be
    // reached from all start nodes and so there must akways be a solution
    return [-1, []];
}

function getValidMovesToNodes(node) {
    const validMoves = [];
    for (const [x, y] of validKnightMoves) {
        const newX = x + node[0];
        const newY = y + node[1];
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            validMoves.push([newX, newY]);
        }
    }
    return validMoves;
}

function reconstructPath(prev, startNode, endNode) {
    const path = [];
    // Start from endNode
    let currentNode = endNode;
    // And work backwards
    while (currentNode[0] !== startNode[0] || currentNode[1] !== startNode[1]) {
        path.push(currentNode);
        currentNode = prev[currentNode[0]][currentNode[1]]
    }

    // Now add the start node to finish the path list
    path.push(startNode);
    // Return the reversed path as we were building the path from end to start
    return path.reverse();
}

// const [minDistance, path] = knightMoves([0, 0], [7, 7]);
// console.log(`Shortest distance is: ${minDistance}`);
// console.log(path);

/***************** NEW UI MODULE CODE (Do not change your existing code) *****************/

// Global state to track UI selections and progress.
const appState = {
    phase: "select-start", // can be: "select-start", "select-end", "running", "done"
    startPos: null, // [row, col]
    endPos: null,   // [row, col]
    movesCount: 0,
    path: []
  };
  
  // Define selectEndHandler globally so it can be referenced during setup and reset.
  function selectEndHandler(e) {
    if (appState.phase !== "select-end") return;
    // Remove any previous selection highlighting.
    const prev = document.querySelector(".dropzone.over");
    if (prev) prev.classList.remove("over");
    // Mark the clicked cell as the selected end.
    const cell = e.currentTarget;
    cell.classList.add("over");
    appState.endPos = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
    // Update instruction to advance to next step.
    document.getElementById("instruction").innerHTML =
      "<strong><u>Step 3:</u></strong> Click 'Run' to animate the knight along the shortest path.";
    // Reveal the Run button.
    document.getElementById("run").style.display = "inline-block";
  }
  
  // Create the UI controls once the DOM is loaded.
  document.addEventListener("DOMContentLoaded", () => {
    // Create a controls container inside the existing ".instruct" container.
    const instruct = document.querySelector(".instruct");
    const controlsDiv = document.createElement("div");
    controlsDiv.id = "controls";
    controlsDiv.innerHTML = `
      <p id="instruction">
        <strong><u>Step 1:</u></strong> Drag the knight to your desired start cell and click 'Lock Start'.
      </p>
      <button id="lockStart">Lock Start</button>
      <button id="run" style="display: none;">Run</button>
      <p id="result" style="display: none;">Shortest moves: <span id="moveCount"></span></p>
      <button id="reset" style="display: none;">Reset</button>
    `;
    instruct.appendChild(controlsDiv);
  
    // Lock Start: record the current cell as the start.
    document.getElementById("lockStart").addEventListener("click", () => {
      const knight = document.getElementById("knight");
      const parentCell = knight.parentElement;
      if (!parentCell || !parentCell.classList.contains("dropzone")) {
        alert("Please drop the knight onto a valid cell before locking the start location.");
        return;
      }
      appState.startPos = [
        parseInt(parentCell.dataset.row),
        parseInt(parentCell.dataset.col)
      ];
      appState.phase = "select-end";
      // Update instructions to prompt for end selection.
      document.getElementById("instruction").innerHTML =
        "<strong><u>Step 2:</u></strong> Click on a cell to select the end location.";
      document.getElementById("lockStart").style.display = "none";
  
      // Attach click listeners for end selection.
      const dropzones = document.querySelectorAll(".dropzone");
      dropzones.forEach(cell => {
        cell.addEventListener("click", selectEndHandler);
      });
    });
  
    // Run: compute path and animate the knight.
    document.getElementById("run").addEventListener("click", () => {
      if (!appState.startPos || !appState.endPos) {
        alert("Both start and end locations must be selected.");
        return;
      }
      // Hide the Run button.
      document.getElementById("run").style.display = "none";
      appState.phase = "running";
      // Update instructions.
      document.getElementById("instruction").innerHTML =
        "<strong><u>Step 3:</u></strong> Animating knight, please wait...";
      // Compute the shortest path using your knightMoves function.
      const [minDistance, path] = knightMoves(appState.startPos, appState.endPos);
      console.log("Computed Path:", path);
      appState.path = path;
      appState.movesCount = 0;
      animateKnightPath(path);
    });
  
    // Reset: clear state and restore initial UI.
    document.getElementById("reset").addEventListener("click", () => {
      resetApp();
    });
  });
  
  // Animate the knight moving along the computed path.
  // For each move, the cell gets the "over" class so you can see it highlighted,
  // and the move counter is updated in real time.
  function animateKnightPath(path) {
    let i = 1; // Knight is already at path[0].
    const interval = setInterval(() => {
      if (i >= path.length) {
        clearInterval(interval);
        // Remove all "over" classes.
        document.querySelectorAll(".dropzone.over").forEach(cell => cell.classList.remove("over"));
        appState.phase = "done";
        document.getElementById("result").style.display = "block";
        document.getElementById("moveCount").textContent = appState.movesCount;
        document.getElementById("reset").style.display = "inline-block";
        document.getElementById("instruction").innerHTML =
          `<strong><u>Animation complete.</u></strong> Shortest moves: ${appState.movesCount}`;
        return;
      }
      // Get the dropzone corresponding to the next step.
      const board = document.querySelector(".board");
      const cell = board.querySelector(
        `.dropzone[data-row="${path[i][0]}"][data-col="${path[i][1]}"]`
      );
      if (cell) {
        // Animate: Append the knight to the cell and mark it with "over" (highlight).
        const knight = document.getElementById("knight");
        cell.appendChild(knight);
        cell.classList.add("over");
        appState.movesCount++;
        // Update the counter display in real time.
        document.getElementById("moveCount").textContent = appState.movesCount;
      }
      i++;
    }, 500); // Using 500ms between moves for a smoother feel.
  }
    
  // Reset the UI and state.
  function resetApp() {
    appState.phase = "select-start";
    appState.startPos = null;
    appState.endPos = null;
    appState.movesCount = 0;
    appState.path = [];
    
    // Reset the instructions in the controls area.
    document.getElementById("instruction").innerHTML =
      "<strong><u>Step 1:</u></strong> Drag the knight to your desired start location and click 'Lock Start'.";
    document.getElementById("lockStart").style.display = "inline-block";
    document.getElementById("run").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("reset").style.display = "none";
    
    // Remove any highlighting from dropzones.
    const dropzones = document.querySelectorAll(".dropzone");
    dropzones.forEach(cell => {
      cell.classList.remove("over");
      cell.removeEventListener("click", selectEndHandler);
    });
    
    // Move the knight back to its original initial cell (for example, row 4, col 2).
    const board = document.querySelector(".board");
    const initialCell = board.querySelector(".dropzone[data-row='4'][data-col='2']");
    const knight = document.getElementById("knight");
    initialCell.appendChild(knight);
  }
  
  /***************** END NEW UI MODULE CODE *****************/
  
  