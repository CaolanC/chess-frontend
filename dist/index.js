"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app"); //because this is typescript I don't understand how it can have a warning for relative imports pre compilation. This is either a bug, or it just works anyway lol
const pixi_js_1 = require("pixi.js");
const app = new pixi_js_1.Application();
// Asynchronous IIFE
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Create a PixiJS application.
    yield (0, app_1.initApp)(app);
    // Intialize the application.
    //await app.init({ background: '#1099bb', resizeTo: window });
    // Then adding the application's canvas to the DOM body.
    let container = document.getElementById('game-container');
    if (!container) {
        throw new Error("game-container element not found");
    }
    container.appendChild(app.canvas);
}))();
window.addEventListener('resize', () => {
    app.resize();
});
