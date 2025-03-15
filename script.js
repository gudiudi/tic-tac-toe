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

const createAI = (name, marker) => {
  const makeMove = (board) => {
    const unoccupiedCells = [];
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === null) {
          unoccupiedCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    return unoccupiedCells[Math.floor(Math.random() * unoccupiedCells.length)];
  };
  return { name, marker, makeMove };
};

const GameController = (function() {
  const player1 = createPlayer('Steve', 'X');
  const player2 = createAI('Computer', 'O');

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

  const handleTurn = () => {
    console.log(GameBoard.getBoard());

    const playerMove = {row: 0, col: 3};
    GameBoard.markBoard(getActivePlayer().marker, playerMove.row, playerMove.col);

    console.log(GameBoard.getBoard());

    if (checkWin(GameBoard.getBoard())) console.log(`${getActivePlayer().name} win!`);

    switchActivePlayer();

    const AIMove = player2.makeMove(GameBoard.getBoard());
    GameBoard.markBoard(getActivePlayer().marker, AIMove.row, AIMove.col);

    console.log(GameBoard.getBoard());

    if (checkWin(GameBoard.getBoard())) console.log(`${getActivePlayer().name} win!`);
    
    switchActivePlayer();
  };

  return { getActivePlayer, handleTurn };
})();

const ScreenController = (function() {
  const turnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = (board, activePlayer) => {
    turnDiv.textContent = activePlayer;
    createCellDiv(board)
  };

  const createCellDiv = (board) => {
    for (let cell = 0; cell < board.length * board.length; cell++) {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.dataset.row = Math.floor(cell / board.length);
      cellDiv.dataset.col = cell % board.length;
      boardDiv.appendChild(cellDiv);
    }
  }

  return { updateScreen }
})();

const init = (function() {
  const board = GameBoard.getBoard();
  GameController.handleTurn();
  ScreenController.updateScreen(board, GameController.getActivePlayer());
})();
