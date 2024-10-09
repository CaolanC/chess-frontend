import { ChessFrontend } from './board';

const board_size = 26;
const parent_container_id = 'game-container'
const parent_container = document.getElementById(parent_container_id);

if (!parent_container) {
    throw new Error(`Parent container '${parent_container_id}' not found.`);
}

const board = new ChessFrontend.Board(board_size, parent_container);
board.initApp();
board.draw();