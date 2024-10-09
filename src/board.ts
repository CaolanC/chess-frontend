import { Application, Graphics } from 'pixi.js';

export namespace ChessFrontend
{

    enum SquareUIState {
        Selected,
        Highlighted
    }

    type Position = [number, number]; // Better explicity typing

    class Square // Represents a square in the board
    {
        public Position: Position;
        public States: SquareUIState[] = []; // A list of extensible UI states that the square can take on
        public Piece: Piece | null = null;
        protected DefaultColor: number; // Chessboard colours alternate, this represents what background colour this square has
        protected Graphic: Graphics = new Graphics();

        constructor(
                position: Position,
                default_color: number
            )
        {
            this.Position = position;
            this.DefaultColor = default_color;
        }

        public draw( // Squares are responsible for drawing themselves. The board iterates over all squares calling this method.
            app: Application,
            square_size: number,
            row: number,
            col: number
        ): void {

            this.Graphic.rect(square_size * row, square_size * col, square_size, square_size).fill(this.DefaultColor);
        
            app.stage.addChild(this.Graphic);
        }
    }

    export class Board 
    {
        public Container: HTMLElement;
        public readonly Size: number;
        protected DefaultColors: [number, number];
        protected Squares: Square[][];
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
                // resizeTo: container,
                width: 600,
                height: 600
            });

            this.Container.appendChild(this.App.canvas);
        }

        public async draw(): Promise<void> { // Iterate over all squares, calling their draw() method.
            const square_size = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;

            for (let row = 0; row < this.Size; row++) {
                for (let col = 0; col < this.Size; col++) {
                    this.Squares[row][col].draw(this.App, square_size, row, col);
                }
            }
        }
    }

    class Piece
    {
        protected readonly Namespace: string;
        protected readonly ID: string;
        protected readonly ImagePath: string;
        protected Board: Board;

        public Position: Position;

        constructor(
                namespace: string, 
                id: string, 
                board: Board, 
                position: Position,
                image_path: string
        ) {
            this.Namespace = namespace, // Namespacing and ID's are so that we can uniquely identify a piece's sprite on the backend without storing it in the engine instance
            this.ID = id;
            this.Board = board;
            this.Position = position;
            this.ImagePath = image_path;
        }

        public getNamespace(): string {
            return this.Namespace;
        }

        public getId(): string {
            return this.ID;
        }

        public getImagePath(): string {
            return this.ImagePath;
        }
    }
}

// square.interactive = true;
// square.buttonMode = true; // Changes cursor on hover

// Add event listeners to the square
// square.on('pointerdown', () => {
//     console.log(`Square clicked: Row ${row}, Col ${col}`);
//     square.clear();
//     square.fill(0xff1c3e);
//     // Add any further actions you want to perform when a square is clicked 
// });