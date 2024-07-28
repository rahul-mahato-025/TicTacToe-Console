class Board {
  #usedCells;
  #arr;
  constructor(size) {
    this.size = size;
    this.#arr = [];
    this.#usedCells = 0;
    for (let row = 0; row < this.size; row++) {
      this.#arr[row] = [];
      for (let col = 0; col < this.size; col++) {
        this.#arr[row][col] = ".";
      }
    }
  }

  set(row, col, value) {
    if (!this.#isValid(row, col)) {
      console.log("Please enter a valid position.");
      return false;
    }

    if (this.#arr[row - 1][col - 1] !== ".") {
      console.log(
        "The position is already used, please select a different position."
      );
      return false;
    }
    this.#arr[row - 1][col - 1] = value;
    this.#usedCells++;
    return true;
  }

  get(row, col) {
    return this.#arr[row - 1][col - 1];
  }

  #isValid(row, col) {
    return (
      row - 1 >= 0 && row - 1 < this.size && col - 1 >= 0 && col - 1 < this.size
    );
  }

  isFull() {
    return this.#usedCells === this.size * this.size;
  }

  #checkConfiguration(row, col, value, dirRow, dirCol) {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      return true;
    }

    if (this.#arr[row][col] !== value) return false;

    return this.#checkConfiguration(
      row + dirRow,
      col + dirCol,
      value,
      dirRow,
      dirCol
    );
  }

  hasWinningConfiguration(row, col, value) {
    // for 1 based indexing
    row -= 1;
    col -= 1;

    let win = false;
    // In the given row, move column wise from 0 to n.
    win |= this.#checkConfiguration(row, 0, value, 0, 1);
    // In the given column, move row wise from 0 to n.
    win |= this.#checkConfiguration(0, col, value, 1, 0);
    // move diagnolly right from top-left
    win |= this.#checkConfiguration(0, 0, value, 1, 1);
    // move diagnolly left from top-right
    win |= this.#checkConfiguration(
      this.size - 1,
      this.size - 1,
      value,
      -1,
      -1
    );

    return win;
  }

  print() {
    const formatter = (char) => {
      for (let j = 0; j < this.size; j++) {
        if (char === "-") process.stdout.write("------");
        else process.stdout.write(`|     `);
      }
      let lastChar = char === "-" ? "-" : "|";
      process.stdout.write(lastChar);
      console.log();
    };

    for (let row = 0; row < this.size; row++) {
      formatter("-");
      formatter();
      for (let j = 0; j < this.#arr.length; j++) {
        let item = this.#arr[row][j];
        process.stdout.write(`|  ${item}  `);
      }
      process.stdout.write(`|`);
      console.log();
      formatter();
    }
    formatter("-");
  }
}

export default Board;
