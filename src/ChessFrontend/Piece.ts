import { Board } from './Board';
import { Position } from './Utils';

export class Piece
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