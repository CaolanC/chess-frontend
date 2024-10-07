import { Graphics } from 'pixi.js';
import { Application } from 'pixi.js';

export async function drawBoard(app: Application, boardSize: number) {
    const squareSize = app.canvas.width / boardSize;

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const square = new Graphics();
            let color = 0xebeae8;
            
            if ((row + col) % 2) {
                color = 0xc2b4a1;
            }
            square.rect(squareSize * row,squareSize * col, squareSize, squareSize).fill(color);

            square.interactive = true;
            // square.buttonMode = true; // Changes cursor on hover

            // Add event listeners to the square
            square.on('pointerdown', () => {
                console.log(`Square clicked: Row ${row}, Col ${col}`);
                square.clear();
                square.fill(0xff1c3e);
                // Add any further actions you want to perform when a square is clicked 
            });

            app.stage.addChild(square);
        }
    }
}
