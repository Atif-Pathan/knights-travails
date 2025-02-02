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

    // Make a queue to keep track of which nodes to visit next
    const queue = [startNode]; // Add start node to the q
    visited[startNode[0]][startNode[1]] = true // Assign start node as visited

    let minDistance = 0; // Keep counter for min distance
    
    // BFS loop:
    while(queue.length) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            let currentNode = queue.shift();

            // if we find the endNode, stop the search and return shortest distance
            if (JSON.stringify(currentNode) === JSON.stringify(endNode)){
                return minDistance;
            }

            const nextNodes = getValidMovesToNodes(currentNode);
            nextNodes.forEach(node => {
                if (!visited[node[0]][node[1]]) {
                    visited[node[0]][node[1]] = true;
                    queue.push(node);
                }
            });
                
        }
        minDistance++;
    }  

    return -1;
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

console.log(knightMoves([0,0], [3,3]));
 