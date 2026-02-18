console.log("script loaded");

// module pattern for gameboard (only need one)
const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  const setMark = (index, mark) => {
    board[index] = mark;
  };
  const reset = () => board.fill("");

  return { getBoard, setMark, reset };
})();

// factory for players (need multiple)
const createPlayer = (name, mark) => {
  return { name, mark };
};

// module pattern for game controller
const GameController = (function () {
  // game logic
  const players = [
    createPlayer("Player 1", "X"),
    createPlayer("Player 2", "O"),
  ];

  let activePlayer = players[0];
  let gameOver = false;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical
    [0, 4, 8],
    [2, 4, 6], // Diagonal
  ];

  // Helper variables
  // alternate between players once one places their piece
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  // check if any players have won
  const checkWin = () => {
    const board = Gameboard.getBoard();
    return winConditions.some((combination) => {
      return combination.every((index) => {
        return board[index] === activePlayer.mark;
      });
    });
  };

  // if there is a tie
  const isTie = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  const playRound = (index) => {
    // if gameOver is true, return
    if (gameOver || Gameboard.getBoard()[index] !== "") {
      return;
    }

    // player actions
    Gameboard.setMark(index, activePlayer.mark);

    // game conditions to end/continue game
    if (checkWin()) {
      gameOver = true;
      return `${activePlayer.name} wins!`;
    }
    if (isTie()) {
      gameOver = true;
      return;
    }
    // If no win, switchPlayerTurn() (continue game)
    else {
      switchPlayerTurn();
    }
  };

  // set the status of the game
  const getGameOver = () => gameOver;

  const resetGame = () => {
    gameOver = false;
    activePlayer = players[0];
  };
  return { playRound, getGameOver, resetGame };
})();

// display logic
const DisplayController = (function () {
  const squares = document.querySelectorAll(".square");

  const updateScreen = () => {
    const board = Gameboard.getBoard();
    squares.forEach((square, index) => {
      // set the text of the div to X or O
      square.textContent = board[index];
    });
  };

  // interact with GameController
  squares.forEach((square) => {
    square.addEventListener("click", (e) => {
      // e.target is the specific div clicked
      // .dataset.index pulls the html divs
      const selectedIndex = e.target.dataset.index;

      // tell the controller to play
      GameController.playRound(selectedIndex);

      // update screen so that user sees the mark
      updateScreen();

      // check if the game has ended to show the popup
      if (GameController.getGameOver()) {
        setTimeout(() => {
          const restart = confirm("Game over! Do you want to play again?");
          if (restart) {
            Gameboard.reset();
            GameController.resetGame();
            updateScreen();
          }
        }, 100);
      }
    });
  });
  return { updateScreen };
})();
