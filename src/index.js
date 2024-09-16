import { initApp } from './app';
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
    container.appendChild(app.canvas);
})(); 

window.addEventListener('resize', () => {
    app.resize();
})
