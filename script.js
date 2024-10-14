// script.js

const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
const gridSize = 10;
let boardState = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

// Tạo các ô trên bảng
function createBoard() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
}

// Xử lý khi người chơi click vào ô
function handleCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (boardState[row][col] !== '' || !gameActive) {
        return;
    }

    boardState[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin(row, col)) {
        gameActive = false;
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    } else if (boardState.flat().every(cell => cell !== '')) {
        statusDisplay.textContent = 'Game is a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Kiểm tra thắng
function checkWin(row, col) {
    const directions = [
        { x: 1, y: 0 },  // Ngang
        { x: 0, y: 1 },  // Dọc
        { x: 1, y: 1 },  // Chéo xuống phải
        { x: 1, y: -1 }  // Chéo xuống trái
    ];

    for (const direction of directions) {
        let count = 1;

        for (let i = 1; i <= 4; i++) {
            const newRow = parseInt(row) + direction.y * i;
            const newCol = parseInt(col) + direction.x * i;
            if (isValid(newRow, newCol) && boardState[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        for (let i = 1; i <= 4; i++) {
            const newRow = parseInt(row) - direction.y * i;
            const newCol = parseInt(col) - direction.x * i;
            if (isValid(newRow, newCol) && boardState[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

// Kiểm tra xem tọa độ có hợp lệ không
function isValid(row, col) {
    return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
}

// Khởi động lại game
function restartGame() {
    board.innerHTML = '';
    boardState = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

restartButton.addEventListener('click', restartGame);

// Bắt đầu game
createBoard();
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
