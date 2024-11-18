import { Application, Assets, Graphics, Sprite, Loader } from 'pixi.js';
import { Square } from './Square';
import { Piece } from './Piece';
import { Requests } from "./Game";
import { Position, ColumnTranslate, RowTranslate } from "./Utils";


type Color = "w" | "b";

interface Info {
    color: Color,
    opponent: string | null
}

type StrSquare = 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' | 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1';


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

    public async PopulateBoard(pieces: (string | null)[][]) { 
        await this.clearBoard();
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

    private async handleSquareClick(position: [number, number]): Promise<void> { // This is so much spaghetti, but tbh I'm so done with this.
        if (this.clickPositions.length === 0) {
            // let possible_moves: boolean[][] = await this.pingMoves();
            // console.log(possible_moves);
            // First click: Select 'from_square'
            this.highlightPossibleMoves(position);
            this.clickPositions.push(position);
            console.log("first click");
            console.log(this.clickPositions);
        } else if (this.clickPositions.length === 1) {
            this.resetHighlights();
            console.log(this.clickPositions);
            if (this.turn != this.Squares[position[0]][position[1]].Piece?.color) {
                this.clickPositions.push(position);
                console.log(this.clickPositions);
                if (this.moveResolver) {
                    console.log("move resolver");
                    this.moveResolver({
                        from: this.clickPositions[0],
                        to: this.clickPositions[1],
                    });
                    this.clickPositions = [];
                }
            }
        }
            // this.moveResolver = null;
    }

    public rotateMatrix(matrix: boolean[][]) {
        const n = matrix.length;
        
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        
        // Reverse each row (flip horizontally)
        for (let i = 0; i < n; i++) {
            matrix[i].reverse();
        }
    }
    public resetHighlights() {
        this.Squares.map(a => a.map(b => b.resetColor()));
    }

    public async highlightPossibleMoves(position: [number, number]) {
        const info = await this.pingInfo();
        if (info.color != this.turn) {
            return;
        }

        let cord: StrSquare;

        if (info.color == "b") {    
            cord = (ColumnTranslate[7 - position[0]] + RowTranslate[7 - position[1]]) as StrSquare;
        } else {
            cord = (ColumnTranslate[position[0]] + RowTranslate[position[1]]) as StrSquare;
        }

        let move_array = await this.pingMoves(cord);
        console.log(move_array);
        // if (info.color == 'b') {
        this.rotateMatrix(move_array);
        this.rotateMatrix(move_array); // You can really tell I'm losing my mind here
        this.rotateMatrix(move_array);

        // move_array.map(a => a.reverse());
        // move_array.reverse();
        console.log("omg this is a move_Array: " + move_array)
        let a = '';
        for(let i = 0; i < this.Size; i++) {
            for(let j = 0; j < this.Size; j++) {
                if (move_array[i][j] == true) {
                    a += 0;
                    this.Squares[i][j].setColor();
                } else {
                    a += 1;
                }
            }
            a += '\n';
        }
        console.log(a);
    }

    public async pingMoves(cord: string) : Promise<boolean[][]> {
        // let moves: boolean[][] = 
        let moves: boolean[][] = await fetch(`${window.location.pathname}/moves?square=${cord}`)
        .then(res => res.json());
        return moves;
        // // .then(res => res.json());
        // console.log(moves);
    }

    public async pingInfo() : Promise<Info> {
        let info: Info = await fetch(`${window.location.pathname}/Info`)
        .then(info => info.json());

        return info;
    }
    
    public async clearBoard(): Promise<void> {
        this.Squares.map(a => a.map(async b => await b.Piece?.deleteSprite(this.App)));
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
