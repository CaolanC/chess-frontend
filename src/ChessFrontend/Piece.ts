import { Board } from './Board';
import { Position } from './Utils';
import { Application, Graphics, roundPixelsBit, Sprite, HTMLText, Assets } from "pixi.js";

enum PieceImagePaths {
    WhitePawn = "/images/pawn.svg",
}

export class Piece {

    protected readonly image_path: string;

    constructor(piece : string) {
        this.image_path = '/images/' + piece + '.svg';  // This might seem odd, but the backend serves us a character representing each piece. 
                                                        // I've just named each image to be equal to it's char representation e.g k.svg .
                                                        // Otherwise we have to write a 12 entry switch statement and why bother.
    }

    public getImagePath() : string {
        return this.image_path;
    }

    public async draw(app: Application, square_size: number, row: number, col: number) {
        try {
            // Load the texture asynchronously
            const texture = await Assets.load(this.image_path);
    
            // Create a sprite from the loaded texture
            const sprite = new Sprite(texture);
    
            // Set the anchor point to the center
            sprite.anchor.set(0.5);
    
            // Position the sprite at the center of the square
            sprite.x = col * square_size + square_size / 2;
            sprite.y = row * square_size + square_size / 2;

            sprite.height = square_size;
            sprite.width = square_size;
    
            // Add the sprite to the application's stage
            app.stage.addChild(sprite);
        } catch (error) {
            console.error(`Failed to load texture from ${this.image_path}:`, error);
        }
    }

    public ReRender(app: Application) {
    }

    protected _isBlack(piece : string) {         // checks if its lowercase(black)
        return piece === piece.toLowerCase() &&
        piece !== piece.toUpperCase();  
    }

}

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
