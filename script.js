const GameBoard = (function() {
  const rows = 3;
  const columns = 3;
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

  const checkWin = () => {
    const board = GameBoard.getBoard();
    
    // Horizontal check
    for (let i = 0; i < board.length; i++) {
      const first = board[i][0];
      if (first === null) continue;
      let isWin = true;
      for (let j = 1; j < board[i].length; j++) {
        if (board[i][j] !== first) {
          isWin = false;
          break;
        }
      }
      if (isWin) return true;
    }

    // Vertical
    for (let i = 0; i < board.length; i++) {
      const first = board[0][0];
    }

    return false;
  };

  const playRound = () => {
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 0, 0);
    switchActivePlayer();
    
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 1, 0);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 0, 1);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 1, 1);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 0, 2);

    console.log(GameBoard.getBoard());
    
    const isWin = checkWin();
    if (isWin) console.log(`${getActivePlayer().name} win!`);

    switchActivePlayer();

    
  };

  return { getActivePlayer, playRound };
})();

GameController.playRound();