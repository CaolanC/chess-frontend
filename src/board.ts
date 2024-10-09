import { Application, Graphics } from 'pixi.js';

export namespace ChessFrontend
{

    enum SquareUIState {
        Selected,
        Highlighted
    }

    type Position = [number, number];

    class Square
    {
        public Position: Position;
        public States: SquareUIState[] = [];
        public Piece: Piece | null = null;

        constructor(
                position: Position,
            )
        {
            this.Position = position;
        }
    }

    export class Board 
    {
        public Size: number;
        public Container: HTMLElement;
        protected Squares: Square[][];
        protected readonly App: Application = new Application();

        constructor(
                size: number,
                // squares: Square[][],
                container: HTMLElement
        ) {
            this.Size = size;
            // this.Squares = squares;
            this.Container = container;
            this.Squares = this._EmptyBoard();
        }

        protected _EmptyBoard(): Square[][] {

            const squares: Square[][] = [];
            for(let i = 0; i < this.Size; i++) {
                squares.push([]);
                for(let j = 0; j < this.Size; j++) {
                    squares[i].push(new Square([i, j]));
                }
            }

            return squares;
        }

        public async initApp(): Promise<void> 
        {
            // Create the PixiJS application and pass in the options directly
            await this.App.init({
                backgroundColor: 0x1099bb,  // Optional background color
                // resizeTo: container,
                width: 600,
                height: 600
            });

            this.Container.appendChild(this.App.canvas);
        }

        public async draw(): Promise<void> {
            const squareSize = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;

            for (let row = 0; row < this.Size; row++) {
                for (let col = 0; col < this.Size; col++) {
                    const square = new Graphics();
                    let color = 0xebeae8;
                    
                    if ((row + col) % 2) {
                        color = 0xc2b4a1;
                    }
                    
                    square.rect(squareSize * row,squareSize * col, squareSize, squareSize).fill(color);
        
                    square.interactive = true;
                    // square.buttonMode = true; // Changes cursor on hover
        
                    // Add event listeners to the square
                    // square.on('pointerdown', () => {
                    //     console.log(`Square clicked: Row ${row}, Col ${col}`);
                    //     square.clear();
                    //     square.fill(0xff1c3e);
                    //     // Add any further actions you want to perform when a square is clicked 
                    // });
                    this.App.stage.addChild(square);
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
            this.Namespace = namespace,
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