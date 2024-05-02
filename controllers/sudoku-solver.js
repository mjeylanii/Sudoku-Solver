class SudokuSolver {
  validate(puzzleString) {

    if (puzzleString.length != 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    }

    if (!/^[1-9.]*$/.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }

    

    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[i][column] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[row][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let boxStartRow = row - (row % 3);
    let boxStartCol = column - (column % 3);

    for (let i = boxStartRow; i < boxStartRow + 3; i++) {
      for (let j = boxStartCol; j < boxStartCol + 3; j++) {
        if (puzzleString[i][j] == value) {
          return false;
        }
      }
    }

    return true;
  }

  solve(puzzleString) {
    let puzzle = puzzleString.split("");
    let array = [];

    for (let i = 0; i < 9; i++) {
      array.push(puzzle.slice(i * 9, i * 9 + 9));
    }

    if (this.solveSudoku(array, 0, 0)) {
      return array;
    }
    return false;
  }

  solveSudoku(board, row, col) {
    //Base case
    if (row == 9 - 1 && col == 9) {
      return true;
    }

    //Move to the next row if the column is 9
    if (col == 9) {
      row++;
      col = 0;
    }
    //Skip the cell if it is not empty
    if (board[row][col] != ".") {
      //Move to the next column
      return this.solveSudoku(board, row, col + 1);
    }

    //Try placing a number in the cell
    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = `${num}`;

        if (this.solveSudoku(board, row, col + 1)) {
          return true;
        }
      }
      //Backtrack
      board[row][col] = ".";
    }
    return false;
  }

  isSafe(board, row, col, num) {
    return (
      this.checkRowPlacement(board, row, col, num) &&
      this.checkColPlacement(board, row, col, num) &&
      this.checkRegionPlacement(board, row, col, num)
    );
  }
}

module.exports = SudokuSolver;
