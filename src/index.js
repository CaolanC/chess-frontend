"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChessFrontend_1 = require("./ChessFrontend");
const board_size = 26;
const parent_container_id = 'game-container';
const parent_container = document.getElementById(parent_container_id);
if (!parent_container) {
    throw new Error(`Parent container '${parent_container_id}' not found.`);
}
const board = new ChessFrontend_1.Board(board_size, parent_container, [0xf7faf9, 0x1c1c1c]);
board.initApp();
board.draw();
