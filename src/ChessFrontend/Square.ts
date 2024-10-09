import { Board } from "./Board";
import { SquareUIState, Position } from "./Utils";
import { Piece } from "./Piece";
import { Application, Graphics } from "pixi.js";

export class Square // Represents a square in the board
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