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
exports.drawBoard = drawBoard;
const pixi_js_1 = require("pixi.js");
function drawBoard(app, boardSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const squareSize = app.canvas.width / boardSize;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const square = new pixi_js_1.Graphics();
                let color = 0xebeae8;
                if ((row + col) % 2) {
                    color = 0xc2b4a1;
                }
                square.rect(squareSize * row, squareSize * col, squareSize, squareSize).fill(color);
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
    });
}
