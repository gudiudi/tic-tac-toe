const GameBoard = (function() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(null);
    }
  }

  const getBoard = () => board.map((row) => [...row]);

  const mark = (marker, row, column) => {
    if (
      row >= rows ||
      column >= columns ||
      board[row][column] !== null
    ) return;
    
    board[row][column] = marker;
  };

  return { getBoard, mark };
})();

GameBoard.getBoard();
console.log(GameBoard.getBoard());
GameBoard.mark('X', 0, 2);
console.log(GameBoard.getBoard());