import { Board } from "./Board";
import { SquareUIState, Position, ColumnTranslate, RowTranslate } from "./Utils";
import { Piece } from "./Piece";
import { Application, Graphics, roundPixelsBit, Sprite, HTMLText } from "pixi.js";

export class Square // Represents a square in the board
{
    public Position: Position;
    public States: SquareUIState[] = []; // A list of extensible UI states that the square can take on
    public Piece: Piece | null = null;
    protected DefaultColor: number; // Chessboard colours alternate, this represents what background colour this square has
    protected Graphic: Graphics = new Graphics();
    protected HoverColor: number = 0xAAAAAA;



    constructor(
            position: Position,
            default_color: number
        )
    {
        this.Position = position;
        this.DefaultColor = default_color;
    }

    public addPiece(piece : Piece ) {
        this.Piece = piece;
    }

    public draw( // Squares are responsible for drawing themselves. The board iterates over all squares calling this method.
        app: Application,
        square_size: number,
        row: number,
        col: number,
        piece?: Piece,
    ): void {
        

        this.Graphic.rect(square_size * row, square_size * col, square_size, square_size).fill(this.DefaultColor);
        
        this.Graphic.eventMode = "static";
        app.stage.addChild(this.Graphic);
        

        // hover implementation
        this.Graphic.on("pointermove", (event) => { 
            this.Graphic.rect(square_size * row, square_size * col, square_size, square_size).fill(this.HoverColor);
            app.stage.addChild(this.Graphic);
            piece?.ReRender(app); // also a hack, pieces would randomly dissapear if this isn't here.
        })
        this.Graphic.on("pointerleave", (event) => {
            this.Graphic.rect(square_size * row, square_size * col, square_size, square_size).fill(this.DefaultColor);
            app.stage.addChild(this.Graphic);
            piece?.ReRender(app); // pure hack to get piece to rerender after hover off square
        })
        

        // click implementation
        // the translate arrays help translate our square arrays into movements
        // to be sent to Niall. 

        // I know the indexing is confusing...its 5:30 I aint sure how to fix it
        // but this works

        this.Graphic.on("click", (event) => {
            console.log("row = " + RowTranslate[col]);
            console.log("col = " + ColumnTranslate[row]);
        })

    }
}