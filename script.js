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

  const playRound = () => {
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 0, 2);
    switchActivePlayer();
    
    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 0, 1);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, 2, 0);
    switchActivePlayer();

    console.log(GameBoard.getBoard());
  };

  return { getActivePlayer, playRound };
})();

GameController.playRound();