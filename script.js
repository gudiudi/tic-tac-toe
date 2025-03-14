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
    let matches = 0;
    
    // Horizontal check
    for (let row = 0; row < board.length; row++) {
      const first = board[row][0];
      if (first === null) continue;
      for (let col = 0; col < board.length - 1; col++) {
        if (board[row][col + 1] !== first) {
          matches = 0;
          break;
        }
        matches++;
      }
      if (matches === board.length - 1) return true;
    }

    // Vertical check
    for (let col = 0; col < board.length; col++) {
      const first = board[0][col];
      if (first === null) continue;
      for (let row = 0; row < board.length - 1; row++) {
        if (board[row + 1][col] !== first) {
          matches = 0;
          break;
        }
        matches++;
      }
      if (matches === board.length - 1) return true;
    }

    // Diagonal check
    

    return false;
  };

  const playRound = () => {
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 0, 1);
    switchActivePlayer();
    
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 2, 0);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 1, 1);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 2, 2);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 2, 1);

    console.log(GameBoard.getBoard());
    
    const isWin = checkWin();
    if (isWin) console.log(`${getActivePlayer().name} win!`);

    switchActivePlayer();
  };

  return { getActivePlayer, playRound };
})();

GameController.playRound();