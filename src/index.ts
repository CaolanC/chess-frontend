import { initApp } from './app'; //because this is typescript I don't understand how it can have a warning for relative imports pre compilation. This is either a bug, or it just works anyway lol
import { Application } from 'pixi.js';

const app = new Application();

// Asynchronous IIFE
(async () =>
{
    // Create a PixiJS application.
    await initApp(app);
    // Intialize the application.
    //await app.init({ background: '#1099bb', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    let container = document.getElementById('game-container');

    if (!container) {
        throw new Error("game-container element not found");
    }

    container.appendChild(app.canvas);
})(); 

// window.addEventListener('resize', () => {
//     app.resize();
// })
