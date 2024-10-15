"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ChessFrontend_1 = require("./ChessFrontend");
const board_size = 26;
const parent_container_id = 'game-container';
const parent_container = document.getElementById(parent_container_id);
if (!parent_container) {
    throw new Error(`Parent container '${parent_container_id}' not found.`);
}
const board = new ChessFrontend_1.Board(board_size, parent_container, [0xFFCAD4, 0xC5D6D8]);
board.initApp();
board.draw();
(_a = document.getElementById('create-session-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('o no');
    fetch('/create-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
        window.location.href = data.gameUrl;
    })
        .catch(error => {
        console.error('Error creating game:', error);
    });
});
