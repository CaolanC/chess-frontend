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

type Color = "w" | "b";

interface Info {
    color: Color,
    opponent: string | null
}

interface ID {
    id: string,
    started: boolean
}

interface Status {
    turn: {
        color: Color,
        bool: boolean
    },
    winner: Color | "-"
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
        let id = await this.pingID();

        while (!(id.started)) {
            await this.waitForMessage();
            id = await this.pingID();
        }

        let status = await this.pingStatus();
        let info = await this.pingInfo();

        console.log(status.turn);
        console.log(id)
        console.log(info);

        // for(;;) {
        let board_rep: BoardRep = await fetch(`${window.location.pathname}/board`).then(res => res.json());
        this.Board.PopulateBoard(board_rep);

        if (info.color == "b") { // TODO: Set-up logic, game loop incl moves, highlighting, castling, promotion, checkmate
            this.Board.flip();
            console.log("finna flip");
        };

        this.Board.draw();

        // }
    }

    public async pingInfo() : Promise<Info> {
        let info: Info = await fetch(`${window.location.pathname}/Info`)
        .then(info => info.json());

        return info;
    }
    
    public async pingID() : Promise<ID> {
        let id: ID = await fetch(`${window.location.pathname}/id`)
        .then(id => id.json());

        return id;
    }
    
    public async pingStatus() : Promise<Status> {
        let status = fetch(`${window.location.pathname}/status`)
        .then(res => res.json());

        return status;
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