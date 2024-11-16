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

interface ID {
    id: string,
    started: boolean
}

type BoardRep = (string | null)[][];

export class Game {

    public readonly Board: Board;
    private room_id: string | undefined;

    constructor(board: Board, pieces: StandardPiece[] = Game.getDefaultSet()) {
        this.Board = board;
        this.Board.initApp();
        this.Board.draw();
    }

    public async startGameLoop() {
        this.room_id = await this.gameReady(); 
        console.log("started");
        const event_source = new EventSource(`${window.location.pathname}/events`);

        // for(;;) {
        let board_rep: BoardRep = await fetch(`${window.location.pathname}/board`).then(res => res.json());
        this.Board.PopulateBoard(board_rep);
        this.Board.draw();

        // }
    }

    public async gameReady() {
        let res: ID;
        while (true) {
            res = await fetch(`${window.location.pathname}/id`)
            .then(res => res.json());
            if (res.started) {
                break;
            }
        }

        return res.id;
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