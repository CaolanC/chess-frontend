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
exports.Board = void 0;
const pixi_js_1 = require("pixi.js");
const Square_1 = require("./Square");
class Board {
    constructor(size, 
    // squares: Square[][],
    container, default_colors) {
        this.App = new pixi_js_1.Application();
        this.Size = size;
        // this.Squares = squares;
        this.Container = container;
        this.DefaultColors = default_colors;
        this.Squares = this._EmptyBoard();
    }
    _EmptyBoard() {
        const squares = [];
        let color;
        for (let row = 0; row < this.Size; row++) {
            squares.push([]);
            for (let col = 0; col < this.Size; col++) {
                color = this.DefaultColors[0];
                if ((row + col) % 2) {
                    color = this.DefaultColors[1];
                }
                squares[row].push(new Square_1.Square([row, col], color));
            }
        }
        return squares;
    }
    initApp() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create the PixiJS application and pass in the options directly
            yield this.App.init({
                backgroundColor: 0x1099bb, // Optional background color: Handy to have, it indicates if we're rendering something incorrectly
                // resizeTo: container,
                width: 600,
                height: 600
            });
            this.Container.appendChild(this.App.canvas);
        });
    }
    draw() {
        return __awaiter(this, void 0, void 0, function* () {
            const square_size = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;
            for (let row = 0; row < this.Size; row++) {
                for (let col = 0; col < this.Size; col++) {
                    this.Squares[row][col].draw(this.App, square_size, row, col);
                }
            }
        });
    }
}
exports.Board = Board;
