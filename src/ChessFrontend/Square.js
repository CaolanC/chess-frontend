"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = void 0;
const pixi_js_1 = require("pixi.js");
class Square // Represents a square in the board
 {
    constructor(position, default_color) {
        this.States = []; // A list of extensible UI states that the square can take on
        this.Piece = null;
        this.Graphic = new pixi_js_1.Graphics();
        this.Position = position;
        this.DefaultColor = default_color;
    }
    draw(// Squares are responsible for drawing themselves. The board iterates over all squares calling this method.
    app, square_size, row, col) {
        this.Graphic.rect(square_size * row, square_size * col, square_size, square_size).fill(this.DefaultColor);
        app.stage.addChild(this.Graphic);
    }
}
exports.Square = Square;
