import { Application, Assets, Graphics, Sprite, Loader } from 'pixi.js';
import { Square } from './Square';
import { Piece } from './Piece';
import { Requests } from "./Game";
import { cp } from 'fs';



export class Board 
{
    public Container: HTMLElement;
    public readonly Size: number;
    protected DefaultColors: [number, number];
    protected Squares: Square[][];
    protected requests = new Requests();
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
    }

    public flip() {
        this.Squares.reverse();
        // [this.DefaultColors[0], this.DefaultColors[1]] = [this.DefaultColors[1], this.DefaultColors[0]];
    }

    public PopulateBoard(pieces: (string | null)[][]) { 

        for(let row = 0; row < this.Size; row++) {
            for(let col = 0; col < this.Size; col++) {
                
                var string = pieces[row][col];
                
                if (string != null) {
                    // 7 - row flips board upsidedown to render properly (for white side).
                    let new_piece = new Piece(string);
                    this.Squares[row][7 - col].addPiece(new_piece);
                }

            }
        }
        
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

    public async initApp(): Promise<void> 
    {
        // Create the PixiJS application and pass in the options directly
        await this.App.init({
            backgroundColor: 0x1099bb,  // Optional background color: Handy to have, it indicates if we're rendering something incorrectly
            resizeTo: this.Container,
        });
        this.Container.appendChild(this.App.canvas);
    }

    public initDraw() {
        const square_size = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;
        
        for (let row = 0; row < this.Size; row++) {
            for (let col = 0; col < this.Size; col++) {
                this.Squares[row][col].initDraw(this.App, square_size, row, col);
            }
        }  
    }

    public draw(): void { // Iterate over all squares, calling their draw() method.

        const square_size = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;
        
        for (let row = 0; row < this.Size; row++) {
            for (let col = 0; col < this.Size; col++) {
                this.Squares[row][col].draw(this.App, square_size, row, col);
            }
        }
    }
}

    /*
    TODO:
    0. Call info endpoint to figure out if black or white. -- not implemented yet
    1. Do code that moves pieces around (can be hardcoded)
    3. Send a move.
            When the opponent makes a move, you need to update the other sides client as well by poking their
            endpoint.
            Tells them to get the status again.
    4. Request the new board upon valid move.

    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    
    http request /board
    http request /moves?square=a2

    to send made move
            move = {
        from: "a2",
        to: "a4",
        promotion: "q" // optional, only used for pawn promotion
        }
    
    if i get the reply that its all good, fetch a new board with the updated states

    */
