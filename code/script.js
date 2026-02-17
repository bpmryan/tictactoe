// module pattern for gameboard (only need one)
const gameboard = (function(){
    const board = ['', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const setMark = (index, mark) => {
        board[index] = mark;
    };
    const reset = () => board.fill('');

    return{ getBoard, setMark, reset };
})();

// factory for players (need multiple)
const createPlayer = (name, mark) => {
    return { name, mark };
};

// module pattern for game controller 
const GameController = (function() {
    // game logic
})


