function generateSudoku(level) {
    clearGrid();
    let fillCount;
    if (level === 'easy') fillCount = 30;
    else if (level === 'medium') fillCount = 20;
    else fillCount = 10;
    const board = Array.from(Array(9), () => Array(9).fill(0));
    generateSolution(board);
    let removedCount = 81 - fillCount;
    while (removedCount > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removedCount--;
        }
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            if (board[i][j] !== 0) {
                cell.value = board[i][j];
                cell.disabled = true; 
            } else {
                cell.value = '';
                cell.disabled = false; 
            }
        }
    }
}
function generateSolution(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (generateSolution(board)) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true; 
}
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}
function clearGrid() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.value = '';
            cell.disabled = false; 
        }
    }
}
function solveSudoku() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const cellValue = document.getElementById(`cell-${i}-${j}`).value;
            row.push(cellValue ? parseInt(cellValue, 10) : 0);
        }
        board.push(row);
    }
    if (solve(board)) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                document.getElementById(`cell-${i}-${j}`).value = board[i][j];
            }
        }
    } else {
        alert("No solution found.");
    }
}
function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (solve(board)) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
