let board = ["", "", "", "", "", "", "", "", ""];
let tile = document.querySelectorAll(".grid");
let currentPlayer = "X";
let gameActive = true;
setHoverSymbol();

function showMessage(text) {
  const msg = document.querySelector(".message");
  const spanMsg = document.querySelector(".message-text");

  spanMsg.innerText = text;
  msg.style.display = "block";
}

function hideMessage() {
  const msg = document.querySelector(".message");
  msg.style.display = "none";

  const text = document.querySelector(".message-text");
  text.innerText = "";
}

const button = document.querySelector(".message-close");

button.addEventListener("click", hideMessage);

function tileClicked(e) {
  if (!gameActive) return;
  let clickedTile = e.target;

  let index = Array.from(tile).indexOf(clickedTile);
  
  if (clickedTile.innerText === "") {
    clickedTile.innerText = currentPlayer;
    clickedTile.classList.add("occupied");
    board[index] = currentPlayer;

    clickedTile.style.color = currentPlayer === "X"
    ? "rgb(170, 120, 200)"
    : "rgb(125, 145, 220)";

    let result = checkWinner();
   
    if (result) {

      if (result.winner === "X") {
        result.combo.forEach(i => tile[i].classList.add('winner-x'));
        gameActive = false;
        showMessage("X wins!");
        return;
      } 
      else if (result.winner === "O") {
        result.combo.forEach(i => tile[i].classList.add('winner-o'));
        gameActive = false;
        showMessage("O wins!");
        return;
      }
    }    
  
    let isDraw = true;
    for (let i = 0 ; i < board.length; i++) {
      if (board[i] === "") {
        isDraw = false;
        break;
      }
    }

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



