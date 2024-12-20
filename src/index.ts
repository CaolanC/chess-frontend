import { Game, Board, Square } from './ChessFrontend/index.js';

const board_size = 8;
const parent_container_id = 'game-container';
const parent_container = document.getElementById(parent_container_id);

if (!parent_container) {
    throw new Error(`Parent container '${parent_container_id}' not found.`);
}

// Fixes the color array syntax error
let colors: [number, number] = [0xf8eac9, 0xb27c66];

// Ensure Board is instantiated correctly
let board: Board = new Board(board_size, parent_container, colors);
// board.initApp();
// board.draw();
// Provide necessary arguments for Game
let game: Game = new Game(board);

game.startGameLoop();