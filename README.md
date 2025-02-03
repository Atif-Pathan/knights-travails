# Knight's Travails

---

## [Try It Out Live!](https://atif-pathan.github.io/knights-travails/) ⚔️♞

## 📌 Overview
**Knight's Travails** is an interactive application that demonstrates the classic “Knight's Travails” problem—finding the shortest path a knight can take on an 8×8 chessboard. It uses the Breadth‑First Search (BFS) algorithm on an implicit graph representation of the board and employs the HTML5 Drag & Drop API to let you select start and end positions visually.

## ⚡ Features
- **BFS Shortest Path Calculation:** Uses BFS to guarantee the minimum number of moves.
- **Implicit Graph Representation:** The board is treated as a graph without constructing an explicit data structure.
- **Interactive Drag & Drop:** The knight is made draggable via the HTML5 Drag & Drop API.
- **Smooth Animation:** The knight animates along the computed shortest path with a real-time move counter.
- **Reset Functionality:** Easily start over with one click.

## 🔧 Technologies Used
- **JavaScript (ES6+)**
- **HTML & CSS**
- **HTML5 Drag & Drop API**
- **BFS Graph Traversal**

## 🎯 What I Learned
- **BFS vs. DFS:** BFS is ideal for shortest-path problems because it explores nodes level by level, ensuring the minimum moves are found—unlike DFS.
- **Implicit Graphs:** By generating legal knight moves on the fly rather than building a full graph, the implementation remains efficient and concise.
- **Drag & Drop API:** I enhanced user interactivity by employing HTML5 Drag & Drop—making the knight draggable while maintaining control over its appearance.
- **Algorithm Complexity:** For an 8×8 board, BFS operates efficiently (O(V + E) time complexity) while keeping space requirements minimal.

## 💡 How It Works
- **Drag & Drop Interaction:**  
  The knight is draggable using the HTML5 Drag & Drop API. You drag it to a selected cell to set the start location and later pick an end location—all using intuitive mouse interactions.
  
- **BFS Path Computation:**  
  Once start and end positions are chosen, BFS explores all valid moves (edges) from each cell (vertex) to determine the shortest sequence of moves.
  
- **Animation:**  
  The knight animates along the computed path cell-by-cell with its move count updated in real time.

## 🔮 Future Enhancements
- **Enhanced Animations:** Implement smoother transitions and additional visual cues for each move.
- **Tutorial Mode:** Provide step-by-step visual explanations of BFS in action.
- **Extended Analysis:** Compare BFS with other search algorithms on larger boards.

---

Enjoy exploring how the knight journeys across the board, and dive into the magic of BFS and interactive web APIs! ⚔️🤓

---