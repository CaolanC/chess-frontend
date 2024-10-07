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
exports.initApp = initApp;
const chessBoard_1 = require("./chessBoard");
function initApp(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.getElementById('game-container');
        if (!container) {
            throw new Error("game-container element not found");
        }
        // Create the PixiJS application and pass in the options directly
        yield app.init({
            backgroundColor: 0x1099bb, // Optional background color
            resizeTo: container
        });
        // Optionally, draw your chessboard or other elements on the app's stage
        let board = (0, chessBoard_1.drawBoard)(app, 8);
        // Optionally, you can load assets here using PixiJS's asset loader if needed
        // await app.loadAssets(); // Example if you have a loadAssets function
        //consoled.log(app);  // Log the app object to ensure it's properly initialized
        // Return the app so that the calling function can use it
        return app;
    });
}
