// tile placements (node list)
let board = ["", "", "", "", "", "", "", "", ""];
// connects to the whole grid
let tile = document.querySelectorAll(".grid");
let currentPlayer = "X";
let gameActive = true;
setHoverSymbol();

// have the pop up appear when game ends
function showMessage(text) {
  // find the classes 
  const msg = document.querySelector(".message");
  const spanMsg = document.querySelector(".message-text");
  // make the pop up visible and put the winning text into the pop up
  spanMsg.innerText = text;
  msg.style.display = "block";
}

// closes pop up
function hideMessage() {
  //find the pop up and hide it
  const msg = document.querySelector(".message");
  msg.style.display = "none";
  // find the text in the pop up and remove it so it refreshes
  const text = document.querySelector(".message-text");
  text.innerText = "";
}

// event for when player clicks the x button
const button = document.querySelector(".message-close");
// link the close button to the hide function
button.addEventListener("click", hideMessage);

// game functionality for when player's click a tile
function tileClicked(e) {
  // ignore clicks if game is over
  if (!gameActive) return;
  let clickedTile = e.target;

  // find the index of the clicked tile inside the node list
  let index = Array.from(tile).indexOf(clickedTile);
  // only allow x/o to be placed on an empty tile
  if (clickedTile.innerText === "") {
    // place the symbol of the current player, mark occupied and store in the board array
    clickedTile.innerText = currentPlayer;
    clickedTile.classList.add("occupied");
    board[index] = currentPlayer;
    // color the symbol
    clickedTile.style.color = currentPlayer === "X"
    ? "rgb(170, 120, 200)"
    : "rgb(125, 145, 220)";
    // check if there's a winner
    let result = checkWinner();
   
    if (result) {
      // if x wins, add the winner class properties to highlight tiles 
      if (result.winner === "X") {
        result.combo.forEach(i => tile[i].classList.add('winner-x'));
        gameActive = false;  // stop game
        showMessage("X wins!");  // put message in pop up
        return;  // stop game
      } 
      // same as above but for O
      else if (result.winner === "O") {
        result.combo.forEach(i => tile[i].classList.add('winner-o'));
        gameActive = false;
        showMessage("O wins!");
        return;
      }
    }    
    // in case of draw
    let isDraw = true;
    for (let i = 0 ; i < board.length; i++) {
      // if any tile is empty, it is not a draw
      if (board[i] === "") {
        isDraw = false;
        break;
      }
    }
    // if draw, stop game and populate pop up
    if (isDraw) {
      gameActive = false;
      showMessage("It's a draw!");
      return;
    }
    

    // if (currentPlayer === "X") {
    //   clickedTile.style.color = "rgb(255, 212, 252)";
    // }

    // if (currentPlayer === "O") {
    //   clickedTile.style.color = "rgb(210, 241, 255)";
    // }

    if (currentPlayer === "X") {
      currentPlayer = "O";
    }
    else {
      currentPlayer = "X";
    }
    setHoverSymbol();
  }
  
}


for (let i = 0; i < tile.length; i++) {
  tile[i].addEventListener("click", tileClicked);
}

function setHoverSymbol() {
  document.documentElement.style.setProperty('--hover-symbol', '"' + currentPlayer + '"');
}

let clearButton = document.querySelector(".restart");
let startingPlayer = "X";

function clearBoard() {

  board = Array(9).fill("");
  
  for (let i = 0; i < tile.length; i++) {
    tile[i].innerText = "";
    tile[i].classList.remove("occupied", "winner-x", "winner-o");
    tile[i].style.color = "";
  }

  gameActive = true;
  
  currentPlayer = startingPlayer;
  startingPlayer = startingPlayer === "X" ? "O" : "X"; //alternate starting player
  setHoverSymbol();
  hideMessage();
}

clearButton.addEventListener("click", clearBoard);

// winning functionality
const winningCombos = [
  //rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //diagonals
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    let combo = winningCombos[i]
    let win1 = combo[0];
    let win2 = combo[1];
    let win3 = combo[2];

    if (board[win1] !== "" && board[win1] === board[win2] &&  board[win1] === board[win3]) {
      return { winner: board[win1], combo: combo };
    }
  }

  return null;
}



