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
        protected DefaultColor: number;
        protected Graphic: Graphics = new Graphics();

        constructor(
                position: Position,
                default_color: number
            )
        {
            this.Position = position;
            this.DefaultColor = default_color;
        }

        public draw(
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

        protected _EmptyBoard(): Square[][] {

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
                backgroundColor: 0x1099bb,  // Optional background color
                // resizeTo: container,
                width: 600,
                height: 600
            });

            this.Container.appendChild(this.App.canvas);
        }

        public async draw(): Promise<void> {
            const square_size = Math.min(this.Container.clientWidth, this.Container.clientHeight) / this.Size; //Math.min(this.App.view.width, this.App.view.height) / this.Size;

            for (let row = 0; row < this.Size; row++) {
                for (let col = 0; col < this.Size; col++) {
                    this.Squares[row][col].draw(this.App, square_size, row, col);
                    // square.interactive = true;
                    // square.buttonMode = true; // Changes cursor on hover
        
                    // Add event listeners to the square
                    // square.on('pointerdown', () => {
                    //     console.log(`Square clicked: Row ${row}, Col ${col}`);
                    //     square.clear();
                    //     square.fill(0xff1c3e);
                    //     // Add any further actions you want to perform when a square is clicked 
                    // });
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