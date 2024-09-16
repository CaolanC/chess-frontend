import { Graphics } from 'pixi.js';

export async function drawBoard(app) {
    const boardSize = 8;
    const squareSize = app.view.width / boardSize;
    const graphics = new Graphics();

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            
            let color = 0xd496c6;
            
            if ((row + col) % 2) {
                color = 0x34eb52;
            }
            graphics.rect(squareSize * row,squareSize * col, squareSize, squareSize).fill(color);
        }
    }
    app.stage.addChild(graphics);
}
