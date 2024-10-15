import { Board } from './ChessFrontend';

const board_size = 26;
const parent_container_id = 'game-container'
const parent_container = document.getElementById(parent_container_id);

if (!parent_container) {
    throw new Error(`Parent container '${parent_container_id}' not found.`);
}

const board = new Board(board_size, parent_container, [0xFFCAD4, 0xC5D6D8]);
board.initApp();
board.draw();
