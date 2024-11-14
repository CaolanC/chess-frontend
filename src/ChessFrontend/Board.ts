import { Application, Assets, Graphics, Sprite } from 'pixi.js';
import { Square } from './Square';
import { Piece } from './Piece';
import {  rotate180 } from "2d-array-rotation";

export class Board 
{
    public Container: HTMLElement;
    public readonly Size: number;
    protected DefaultColors: [number, number];
    protected Squares: Square[][];
    protected Pieces: Piece[][];
    protected readonly App: Application = new Application();

    constructor(
            size: number,
            // squares: Square[][],
            container: HTMLElement,
            default_colors: [number, number]
    ) {
        this.Size = size;
        // this.Squares = squares;
        this.Container = container;
        this.DefaultColors = default_colors;
        this.Squares = this._EmptyBoard();
        this.Pieces = this._PopulatePieces();
    }

    protected _EmptyBoard(): Square[][] { // Returns a 2d array equal to the Board's size filled with null values

        const squares: Square[][] = [];
        let color: number;

        for(let row = 0; row < this.Size; row++) {
            squares.push([]);
            for(let col = 0; col < this.Size; col++) {
                
                color = this.DefaultColors[0];

                if ((row + col) % 2) {
                    color = this.DefaultColors[1];
                }
                
                squares[row].push(new Square([row, col], color));
                
            }
        }

        return squares;
    }
    
    // protected _PopulatePieces(): Piece[][] { 
    //     const pieces: Piece[][] = [];

    //     for(let col = 0; col < this.Size; col++) {
    //         pieces.push([]);
    //         for(let row = 0; row < this.Size; row++) {
                
    //             if (row == 0 || row == 1) {
    //                 pieces[col].push(new Piece(false, "p"));
    //             }
    //             else if (row == 6 || row == 7) {
    //                 pieces[col].push(new Piece(true,"P"));
    //             }
    //             else {
    //                 pieces[col].push(new Piece(true, ""));
    //             }
    //         }
    //     }
    //     console.log(pieces);
    //     return pieces;
    
    // }

    protected _PopulatePieces(): Piece[][] { 
        const pieces: Piece[][] = [];

        for(let row = 0; row < this.Size; row++) {
            pieces.push([]);
            for(let col = 0; col < this.Size; col++) {
                
                if (row == 0 || row == 1) {
                    pieces[row].push(new Piece(false, "p"));
                }
                else if (row == 6 || row == 7) {
                    pieces[row].push(new Piece(true,"P"));
                }
                else {
                    pieces[row].push(new Piece(true, ""));
                }
            }
        }
        return pieces;
    
    }

    isBlack() : boolean {
        var cookie = document.cookie.split("=");
        if (cookie[0] == "black") {
            return true;
        }
        else {
            return false;
        }
    }




    public async initApp(): Promise<void> 
    {
        // Create the PixiJS application and pass in the options directly
        await this.App.init({
            backgroundColor: 0x1099bb,  // Optional background color: Handy to have, it indicates if we're rendering something incorrectly
            resizeTo: this.Container,
        });
        this.Container.appendChild(this.App.canvas);

    }

    public async draw(): Promise<void> { // Iterate over all squares, calling their draw() method.
        
        if (this.isBlack() == true) {
            this.Pieces = rotate180(this.Pieces);
            console.log(this.Pieces);
        }



        const square_size = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;
        console.log(this.Container.clientHeight, this.Container.clientWidth);
        // TBA TBA Assets.load("/images/pawn-chess-piece-dfa935.png"); TBA ____________
        for (let row = 0; row < this.Size; row++) {
            for (let col = 0; col < this.Size; col++) {
            
                this.Squares[row][col].draw(this.App, square_size, row, col, this.Pieces[col][row]);
                this.Pieces[col][row].drawPiece(this.App, square_size, row, col);

                
            }
        }
    }
}