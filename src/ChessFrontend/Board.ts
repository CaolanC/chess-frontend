import { Application, Assets, Graphics, Sprite, Loader } from 'pixi.js';
import { Square } from './Square';
import { Piece } from './Piece';
import { Requests } from "./Game";
import { Position } from "./Utils";


export class Board 
{
    public Container: HTMLElement;
    public readonly Size: number;
    public turn: string = "w";
    protected DefaultColors: [number, number];
    protected Squares: Square[][];
    protected requests = new Requests();
    protected readonly App: Application = new Application();
    protected moveResolver: ((move: { from: [number, number]; to: [number, number] }) => void) | null = null;
    private clickPositions: [number, number][] = [];
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
        this.Squares.map(a => a.reverse());
        this.Squares.reverse();
        // [this.DefaultColors[0], this.DefaultColors[1]] = [this.DefaultColors[1], this.DefaultColors[0]];
    }

    public PopulateBoard(pieces: (string | null)[][]) { 
        this.clearBoard();
        for(let row = 0; row < this.Size; row++) {
            for(let col = 0; col < this.Size; col++) {
                
                var string = pieces[row][col];
                
                if (string != null) {
                    // 7 - row flips board upsidedown to render properly (for white side).
                    let new_piece = this._charToPiece(string);
                    this.Squares[row][7 - col].addPiece(new_piece);
                }

            }
        }
        
    }

    protected _charToPiece(char: string) : Piece {
        return new Piece(char);
    }

    // Add this method
    public awaitMove(): Promise<{ from: [number, number]; to: [number, number] }> {
        return new Promise((resolve) => {
            this.moveResolver = resolve; // Set resolver for the move
        });
    }

    private handleSquareClick(position: [number, number]): void { // This is so much spaghetti, but tbh I'm so done with this.
        if (this.clickPositions.length === 0) {
            // First click: Select 'from_square'
            this.clickPositions.push(position);
            console.log("first click");
            console.log(this.clickPositions);
        } else if (this.clickPositions.length === 1) {
            console.log(this.turn);
            if (this.turn != this.Squares[position[0]][position[1]].Piece?.color) {
                this.clickPositions.push(position);
                console.log(this.clickPositions);
                if (this.moveResolver) {
                    console.log("move resolver");
                    this.moveResolver({
                        from: this.clickPositions[0],
                        to: this.clickPositions[1],
                    });
                }
            }
        }
            // this.moveResolver = null;
    }

    public clearBoard(): void {
        this.Squares.map(a => a.map(b => b.Piece?.deleteSprite(this.App)));
    }

    // Update _EmptyBoard to register square clicks with Board
    protected _EmptyBoard(): Square[][] {

        const squares: Square[][] = [];
        let color: number;

        for (let row = 0; row < this.Size; row++) {
            squares.push([]);
            for (let col = 0; col < this.Size; col++) {
                color = this.DefaultColors[(row + col) % 2];
                const newSquare = new Square([row, col], color);

                // Register the click handler to inform Board
                newSquare.onClick((position: [number, number]) => this.handleSquareClick(position));
                squares[row].push(newSquare);
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

    public async draw(): Promise<void> { // Iterate over all squares, calling their draw() method.

        const square_size = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;
        
        for (let row = 0; row < this.Size; row++) {
            for (let col = 0; col < this.Size; col++) {
                await this.Squares[row][col].draw(this.App, square_size, row, col);
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
