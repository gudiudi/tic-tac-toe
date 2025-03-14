const GameBoard = (function() {
  const rows = 3;
  const columns = 3;
  const board = [...Array(rows)].map(() => new Array(columns).fill(null));

  const get = () => board.map((row) => [...row]);

  const mark = (marker, row, column) => {
    if (
      row >= rows ||
      column >= columns ||
      board[row][column] !== null
    ) return;
    
    board[row][column] = marker;
  };

  return { get, mark };
})();

console.log(GameBoard.get());
GameBoard.mark('X', 0, 2);
console.log(GameBoard.get());