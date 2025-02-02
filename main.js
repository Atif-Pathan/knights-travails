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

const [minDistance, path] = knightMoves([0, 0], [7, 7]);
console.log(`Shortest distance is: ${minDistance}`);
console.log(path);


 