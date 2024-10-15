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

document.getElementById('create-session-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('o no');
  fetch('/create-game', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(data => {
    window.location.href = data.gameUrl;
  })
  .catch(error => {
    console.error('Error creating game:', error);
  })
})
