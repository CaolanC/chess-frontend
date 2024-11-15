import { Piece } from './Piece';
import { Board } from './Board';
import { json } from 'stream/consumers';

type PieceID = string;
type PieceSetIDs = string[];

enum StandardPiece {
    Rook = 1,
    Knight = 2,
    Bishop = 3,
    King = 4,
    Queen = 5,
    Pawn = 6
}

export class Game {

    public readonly Board: Board;

    constructor(board: Board, pieces: StandardPiece[] = Game.getDefaultSet()) {
        this.Board = board;
    }

    public startGameLoop() {
        const event_source = new EventSource('/events');
    }
    
    private static getDefaultSet(): StandardPiece[] {
        return [
            StandardPiece.Rook,
            StandardPiece.Knight,
            StandardPiece.Bishop,
            StandardPiece.Queen,
            StandardPiece.King,
            StandardPiece.Bishop,
            StandardPiece.Knight,
            StandardPiece.Rook,
            StandardPiece.Pawn,
        ];
    }
}

export class Requests {

    constructor(){} // empty constructor

    public async getPieces(): Promise<string[][]> {
        
        let pieces: string[][] = [];
        const url = window.location.href;
    
        const response = await fetch(url + "/board");
        pieces = await response.json();
    
        return pieces;
    }



}