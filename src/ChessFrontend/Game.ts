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
    private readonly event_source = new EventSource(`${window.location.pathname}/events`);

    constructor(board: Board, pieces: StandardPiece[] = Game.getDefaultSet()) {
        this.Board = board;
        this.Board.initApp();
        this.Board.draw();
    }

    public closeEventSource() {
        this.event_source!.close();
    }

    public async startGameLoop() {
        this.Board.initDraw();
        let info = await this.pingInfo();

        while (!(info.started)) {
            await this.waitForMessage();
            info = await this.pingInfo();
        }

        // for(;;) {
        let board_rep: BoardRep = await fetch(`${window.location.pathname}/board`).then(res => res.json());
        this.Board.PopulateBoard(board_rep);
        this.Board.draw();

        // }
    }

    public async pingInfo() : Promise<ID> {
        let res: ID = await fetch(`${window.location.pathname}/id`)
        .then(res => res.json());
        

        return res;
    }

    private async waitForMessage() : Promise<any> {
        return new Promise(
            (resolve, reject) => {

                const onMessage = () => {
                    this.event_source.removeEventListener("message", onMessage);
                    resolve(null);
                }

                const onError = () => {
                    this.event_source.removeEventListener("error", onError);
                    reject(new Error("Problem with event stream."));
                }

                this.event_source.addEventListener("message", onMessage);
                this.event_source.addEventListener("error", onError);
            }
        )
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