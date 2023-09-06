
// Get references to important elements
const board = document.querySelector(".game-container");
const button = document.querySelector(".button");
const winMessage = document.querySelector(".winner");

// Define type for the current turn
let turn = "X";

// Listen to click events on the board
function listenBoard() {
  board.addEventListener("click", runGame);
}

// Initialize the game
function main() {
  createBoard(); // Create the game board
  listenBoard(); // Listen for clicks on the board
}

// Function to handle a player's move
function runGame(e) {
  const boxId = e.target.id;
  console.log(boxId);
  if (boxId === null) return;
  const box = document.querySelector(`#${boxId}`);
  if (box === null || box.textContent !== "") return;
  box.textContent = turn;
  changeBoxBackground(box);
  const winner = checkWinner();
  if (!winner) {
    const isBoardFull = checkBoardFull();
    if (isBoardFull) {
      endGame(); // If board is full and no winner, end the game
    } else {
      switchPlayer(); // Continue the game
    }
  } else {
    endGame(); // If there's a winner, end the game
  }
}

function checkBoardFull() {
  const boxes = getBoxes();
  return boxes.every(box => box !== "");
}

// Function to change the box background based on the player's turn
function changeBoxBackground(box) {
  if (turn === "X") box.classList.replace("box", "x");
  else box.classList.replace("box", "o");
}

// Function to handle the end of the game
function endGame() {
  board.removeEventListener("click", runGame);
  button.addEventListener("click", resetGame);
  if (winMessage === null) return;

  if (checkBoardFull()) {
    winMessage.textContent = "It's a draw!"; // Display draw message
  } else {
    winMessage.textContent = `Winner is ${turn}`;
  }

  winMessage.style.display = "block";
  button.style.visibility = "visible";
}

// Function to reset the game
function resetGame() {
  turn = "X";
  resetBoxes();
  button.style.visibility = "hidden";
  winMessage.textContent = "";
  board.addEventListener("click", runGame);
}

// Function to reset the boxes to their initial state
function resetBoxes() {
  for (let i = 0; i <= 8; i++) {
    const box = document.querySelector(`#box-${i}`);
    box.textContent = "";
    const boxClass = box.className;
    box.classList.remove(boxClass);
    void box.offsetWidth;
    box.classList.add("box");
  }
}

// Function to check if there is a winner
function checkWinner() {
  const boxes = getBoxes();
  return (
    (boxes[0] === boxes[1] && boxes[1] === boxes[2] && boxes[0] !== "") ||
    (boxes[3] === boxes[4] && boxes[4] === boxes[5] && boxes[3] !== "") ||
    (boxes[6] === boxes[7] && boxes[7] === boxes[8] && boxes[6] !== "") ||
    (boxes[0] === boxes[4] && boxes[4] === boxes[8] && boxes[0] !== "") ||
    (boxes[2] === boxes[4] && boxes[4] === boxes[6] && boxes[2] !== "") ||
    (boxes[1] === boxes[4] && boxes[4] === boxes[7] && boxes[1] !== "") ||
    (boxes[0] === boxes[3] && boxes[3] === boxes[6] && boxes[0] !== "") ||
    (boxes[2] === boxes[5] && boxes[5] === boxes[8] && boxes[2] !== "")
  );
}

// Function to get the content of each box
function getBoxes() {
  const boxesContent = [];
  for (let i = 0; i < 9; i++) {
    const box = document.querySelector(`#box-${i}`);
    const boxContent = box.textContent;
    if (boxContent === null) boxesContent.push("");
    else {
      boxesContent.push(boxContent);
    }
  }
  return boxesContent;
}

// Function to switch players
function switchPlayer() {
  turn = turn === "X" ? "O" : "X";
}

// Function to create the game board
function createBoard() {
  for (let i = 0; i < 9; i++) {
    makeBox(i);
  }
}

function makeBox(i) {
  const box = document.createElement("div");
  box.className = "box";
  box.id = `box-${i}`;
  box.textContent = "";
  board.append(box);
}

main();
