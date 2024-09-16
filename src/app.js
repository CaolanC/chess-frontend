import { Application } from 'pixi.js';
import { drawBoard } from './chessBoard';

export async function initApp(app) {
    // Create the PixiJS application and pass in the options directly
    await app.init({
        resizeTo: document.getElementById("game-container"),
        backgroundColor: 0x1099bb,  // Optional background color
    });

    // Optionally, draw your chessboard or other elements on the app's stage
    drawBoard(app);

    // Optionally, you can load assets here using PixiJS's asset loader if needed
    // await app.loadAssets(); // Example if you have a loadAssets function

    //consoled.log(app);  // Log the app object to ensure it's properly initialized

    // Return the app so that the calling function can use it
    return app;
}
