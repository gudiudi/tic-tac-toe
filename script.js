const GameBoard = (function() {
  const rows = 4;
  const columns = 4;
  const board = [...Array(rows)].map(() => new Array(columns).fill(null));

  const getBoard = () => board.map((row) => [...row]);

  const markBoard = (marker, row, column) => {
    if (
      row >= rows ||
      column >= columns ||
      board[row][column] !== null
    ) return;
    
    board[row][column] = marker;
  };

  return { getBoard, markBoard };
})();

const createPlayer = (name, marker) => {
  return { name, marker };
};

const GameController = (function() {
  const player1 = createPlayer('Steve', 'X');
  const player2 = createPlayer('Computer', 'O');

  let activePlayer = player1;

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => (activePlayer === player1) ? activePlayer = player2 : activePlayer = player1;

  const horizontalCheck = (board) => {
    for (let row = 0; row < board.length; row++) {
      let matches = 0;
      const first = board[row][0];
      if (first === null) continue;
      for (let col = 0; col < board.length - 1; col++) {
        if (board[row][col + 1] !== first) break;
        matches++;
      }
      if (matches === board.length - 1) return true;
    }
    return false;
  };

  const verticalCheck = (board) => {
    for (let col = 0; col < board.length; col++) {
      let matches = 0;
      const first = board[0][col];
      if (first === null) continue;
      for (let row = 0; row < board.length - 1; row++) {
        if (board[row + 1][col] !== first) break;
        matches++;
      }
      if (matches === board.length - 1) return true;
    }
    return false;
  };

  const diagonalCheck = (board) => {
    for (let col = 0; col <= board.length; col += board.length - 1) {
      let matches = 0;
      const first = board[0][col];
      if (first === null) continue;
      for (let row = 0; row < board.length - 1; row++) {
        let direction = col - (row + 1);
        if (col === 0) direction = row + 1;
        if (board[row + 1][direction] !== first) break;
        matches++;
      }
      if (matches === board.length - 1) return true;
    }
    return false;
  };

  const checkWin = (board) => {
    return (horizontalCheck(board) || verticalCheck(board) || diagonalCheck(board));
  };

  const playRound = () => {
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 0, 3);
    switchActivePlayer();
    
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 1, 0);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 1, 2);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 2, 0);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 2, 1);

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 3, 0);

    console.log(GameBoard.getBoard());
    
    const isWin = checkWin(GameBoard.getBoard());
    if (isWin) console.log(`${getActivePlayer().name} win!`);

    switchActivePlayer();
  };

  return { getActivePlayer, playRound };
})();

GameController.playRound();