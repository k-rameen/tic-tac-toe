let tile = document.querySelectorAll(".grid");
let currentPlayer = "X";
setHoverSymbol();

function tileClicked(e) {
  let clickedTile = e.target;
  console.log(clickedTile);
  
  if (clickedTile.innerText === "") {
    clickedTile.innerText = currentPlayer;
    clickedTile.classList.add("occupied");

    if (currentPlayer === "X") {
      clickedTile.style.color = "rgb(255, 212, 252)";
    }

    if (currentPlayer === "O") {
      clickedTile.style.color = "rgb(210, 241, 255)";
    }

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
  document.documentElement.style.setProperty('--hover-symbol', '"' + currentPlayer + '""');
}

let clearButton = document.querySelector(".restart");
let startingPlayer = "X";

function clearBoard() {
  for (let i = 0; i < tile.length; i++) {
    tile[i].innerText = "";
    tile[i].classList.remove("occupied");
  }
  currentPlayer = startingPlayer;
  setHoverSymbol();
  startingPlayer = startingPlayer === "X" ? "O" : "X"; //alternate starting player
  setHoverSymbol();
}

clearButton.addEventListener("click", clearBoard);


