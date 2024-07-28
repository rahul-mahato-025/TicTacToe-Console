import Board from "./Board.js";
import prompt from "prompt-sync";

class Game {
  constructor() {
    this.playerO = "playerO";
    this.playerX = "playerX";
    this.lastPlayer = "";
    this.status = "idle"; // A game can have status as - idle, inProgress, draw, won.
  }

  play() {
    console.log("Pelase enter board size ");
    let boardSize = prompt()();
    // initializing a board of size n * n.
    this.board = new Board(boardSize);
    this.board.print();
    // Start the game
    this.status = "inProgress";
    this.lastPlayer = this.playerX;
    // While the game is not drawn or won, keep playing.
    while (this.status === "inProgress") {
      let { curPlayer, value } = this.getCurPlayer();
      const { rowPosition, colPosition } = this.takeInput(curPlayer);
      //   If the move is inValid - either out of bounds or already used position, ask for new position
      if (!this.makeMove(rowPosition, colPosition, value)) continue;
      //   check if the cur player has won  and update the game status to won.
      if (this.board.hasWinningConfiguration(rowPosition, colPosition, value))
        this.status = "won";
      //   check if all the cells are exhausted and update the game status to draw.
      if (this.board.isFull()) this.status = "draw";

      this.board.print();
      this.lastPlayer = curPlayer;
    }
    this.result();
  }

  getCurPlayer() {
    const curPlayer =
      this.lastPlayer === this.playerX ? this.playerO : this.playerX;
    const value = curPlayer === this.playerO ? "O" : "X";

    return { curPlayer, value };
  }

  takeInput(curPlayer) {
    console.log(`${curPlayer}, please enter your position `);
    let rowPosition = prompt()();
    let colPosition = prompt()();
    return { rowPosition, colPosition };
  }

  makeMove(rowPosition, colPosition, value) {
    return this.board.set(rowPosition, colPosition, value);
  }

  result() {
    if (this.status === "draw") console.log("Game Drawn.");
    else console.log(`${this.lastPlayer} has Won.`);
  }
}

const game = new Game();
game.play();
