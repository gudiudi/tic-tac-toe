const GameBoard = (function() {
  let rows = null;
  let columns = null;
  let board = [];

  const createBoard = (cell) => {
    if (cell <= 1 && cell > 16) return;
    rows = cell;
    columns = cell;
    board = [...Array(rows)].map(() => new Array(columns).fill(null));
  }

  const getBoard = () => board.map((row) => [...row]);

  const markBoard = (marker, row, column) => {
    if (
      row >= rows ||
      column >= columns ||
      board[row][column] !== null
    ) return false;
    
    return board[row][column] = marker;
  };

  return { createBoard, getBoard, markBoard };
})();

const createPlayer = (name, marker) => {
  return { name, marker };
};

const createAI = (name, marker) => {
  const makeMove = (board) => {
    const unmarkedCells = [];
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === null) {
          unmarkedCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    return unmarkedCells[Math.floor(Math.random() * unmarkedCells.length)];
  };
  return { name, marker, makeMove };
};

const GameController = (function() {
  const player1 = createPlayer('Steve', 'X');
  const player2 = createAI('Computer', 'O');

  let play = true;
  let activePlayer = player1;

  const getActivePlayer = () => activePlayer;

  const switchActivePlayer = () => {
    if (activePlayer === player1) {
      activePlayer = player2;
      const AIMove = player2.makeMove(GameBoard.getBoard());
      
      setTimeout(() => {
        handleTurn(AIMove.row, AIMove.col);
      }, 300);
    } else {
      activePlayer = player1;
    }
  };

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

  const checkWin = () => {
    const board = GameBoard.getBoard();
    return (horizontalCheck(board) || verticalCheck(board) || diagonalCheck(board));
  };

  const checkDraw = () => {
    const board = GameBoard.getBoard();
    return !board.some(row => row.includes(null));
  }

  const handleTurn = (row, col) => {
    if (!play) return;

    const marked = GameBoard.markBoard(getActivePlayer().marker, row, col);
    if (!marked) return;

    const isWin = checkWin();
    if (isWin) {
      play = false;
      return ScreenController.updateScreen(`${getActivePlayer().marker} win!`);
    }

    const isDraw = checkDraw();
    if (isDraw) {
      play = false;
      return ScreenController.updateScreen("It's a draw!");
    }
    
    switchActivePlayer();
    ScreenController.updateScreen();
  };

  return { getActivePlayer, handleTurn };
})();

const ScreenController = (function() {
  const turnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = (msg) => {
    const board = GameBoard.getBoard();
    const activePlayer = GameController.getActivePlayer();

    turnDiv.textContent = (msg) ? msg : `${activePlayer.marker}'s turn`;
    boardDiv.style.setProperty('--cell-count', board.length);
    boardDiv.innerHTML = '';
    createCellDiv(board)
  };

  const createCellDiv = (board) => {
    for (let cell = 0; cell < board.length * board.length; cell++) {
      const row = Math.floor(cell / board.length);
      const col = cell % board.length;
      const cellDiv = document.createElement('div');
      cellDiv.textContent = board[row][col];
      cellDiv.className = 'cell';
      cellDiv.dataset.row = row;
      cellDiv.dataset.col = col;
      boardDiv.appendChild(cellDiv);
    }
  }

  return { updateScreen }
})();

const init = (function() {
  GameBoard.createBoard(3);
  ScreenController.updateScreen();

  const boardDiv = document.querySelector('.board');
  boardDiv.addEventListener('click', (e) => {
    if (e.target.className === 'cell') {
      const selectedCell = { ...e.target.dataset };
      if (GameController.getActivePlayer().name !== 'Computer') GameController.handleTurn(selectedCell.row, selectedCell.col);
    }
  });
})();


/*
TODO
Stop when the game is over (win, draw)
Change cell count
*/