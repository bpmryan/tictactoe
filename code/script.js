// console.log("script loaded");

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
    createPlayer("Player 2", "0"),
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
    return Gameboard.getBoard().every(cell => cell !== "");
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
      alert(`${activePlayer.name} wins!`);
      Gameboard.reset();
    }
    if (isTie()) {
      gameOver = true;
      alert("There is a draw");
      return Gameboard.reset();
    }
    // If no win, switchPlayerTurn() (continue game)
    else {
      switchPlayerTurn();
    }
  };

  return { playRound };
})();

const checkWin = () => {
  const board = Gameboard.getBoard();

  // check any win conditions
  return winConditions.some((combination) => {
    return combination.every((index) => {
      return board[index] === activePlayer.mark;
    });
  });
};
