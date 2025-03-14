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

  return { getBoard };
})();

GameBoard.getBoard();
console.log(GameBoard.getBoard())