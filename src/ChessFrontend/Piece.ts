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

    iswhite : boolean;  // this is to help with the FEN string population
    piece : string;   // this is to be changed with a sprite at some point, text for now
    text : HTMLText; // the rendered text 

    constructor(iswhite : boolean, piece : string) {
        this.iswhite = iswhite;
        this.piece = piece;

        if (iswhite == true) {
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
        
        // Sprite Experiments, TBA 2070
        //const sprite = Sprite.from("/images/pawn-chess-piece-dfa935.png");
        this.text.x = (square_size * row) + 50;
        this.text.y = square_size * col;

        app.stage.addChild(this.text);

    }

    public ReRender(app: Application) {
        app.stage.addChild(this.text);
    }


    // the piece will be spawned in by the board, fed in its position and then drawn using draw()
    // it will be fed in using FEN notation
    // to add: movement...how will that be done, perhaps rerendering the pieces again? easiest option but costly
    // but fuck it no time lads
}
