import { Board } from './Board';
import { Position } from './Utils';
import { Application, Graphics, roundPixelsBit, Sprite, HTMLText } from "pixi.js";

// CAOLANS OLD CODE, MAYBE REUSABLE

// export class Piece
// {
//     protected readonly ID: string;
//     protected Board: Board;

//     public Position: Position;

//     constructor(
//             iswhite : boolean,
//             id: string, 
//             board: Board, 
//             position: Position,
//             type : string,
//     ) {
//         //this.Namespace = namespace, // Namespacing and ID's are so that we can uniquely identify a piece's sprite on the backend without storing it in the engine instance
//         this.ID = id;
//         this.Board = board;
//         this.Position = position;
//     }


//     public getId(): string {
//         return this.ID;
//     }

// }

export class Piece {

    piece : string;   // this is to be changed with a sprite at some point, text for now
    text : HTMLText; // the rendered text 

    protected _isBlack(piece : string) {         // checks if its lowercase(black)
        return piece === piece.toLowerCase() &&
        piece !== piece.toUpperCase();  
    }

    constructor(piece : string) {
        this.piece = piece;

        if (this._isBlack(piece) == false) {
        this.text = new HTMLText({
            text: piece,
            style: {
                fontFamily: 'Arial',
                fontSize: 100,
                fill: 0xFFFFFF,
                align: 'center',
            }
        });
        }
        else {
            this.text = new HTMLText({
                text: piece,
                style: {
                    fontFamily: 'Arial',
                    fontSize: 100,
                    fill: 0x000000,
                    align: 'center',
                }
            });
        }
    } 

    public drawPiece(app: Application, square_size: number, row: number, col: number) {
        
        this.text.x = (square_size * row) + 50;
        this.text.y = square_size * col;

        app.stage.addChild(this.text);
    }

    public ReRender(app: Application) {
        app.stage.addChild(this.text);
    }

}
