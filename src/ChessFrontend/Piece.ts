import { Board } from './Board';
import { Position } from './Utils';
import { Application, Graphics, roundPixelsBit, Sprite, HTMLText, Assets } from "pixi.js";

export class Piece {

    protected readonly image_path: string;
    public readonly color: string;
    protected _sprite!: Sprite;
    protected _sprite_defined: boolean = false;

    constructor(piece : string) {
        this.image_path = '/images/' + piece + '.svg';
        this.color = this._parseColor(piece);
    }

    protected _parseColor(piece: string) : string {
        return piece.toUpperCase() == piece ? 'w' : 'b';
    }

    public getImagePath() : string {
        return this.image_path;
    }

    public async deleteSprite(app: Application) {
        if (this._sprite) {
            console.log("HERE SPRITE " + this._sprite)
            app.stage.removeChild(this._sprite);
            this._sprite.destroy(true);
        }
    }

    public async draw(app: Application, square_size: number, row: number, col: number) {

        try {

            if (this._sprite) {
                console.log("HERE SPRITE " + this._sprite)
                app.stage.removeChild(this._sprite);
                this._sprite.destroy(true);
            }
    
            // Load the texture asynchronously
            const texture = await Assets.load(this.image_path);
    
            const sprite = new Sprite(texture);
    
            // Set the anchor point to the center
            sprite.anchor.set(0.5);
    
            // Position the sprite at the center of the square
            sprite.x = col * square_size + square_size / 2;
            sprite.y = row * square_size + square_size / 2;

            sprite.height = square_size;
            sprite.width = square_size;
            console.log("my sprite" + sprite)
            this._sprite = sprite;
            this._sprite_defined = true;
            console.log("my_ sprite" + this._sprite)
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
