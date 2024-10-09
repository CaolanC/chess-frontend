import { Application, Graphics } from 'pixi.js';
import { Square } from './Square';

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