import { Piece } from './Piece';
import { Board } from './Board';
import { json } from 'stream/consumers';
import { ColumnTranslate, RowTranslate } from './Utils';

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

type IntMove = [[number, number],[number, number]];

type PieceSymbol = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
type Square = 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' | 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1';

type Move = {
    color: Color;
    from: Square;
    to: Square;
    piece: PieceSymbol;
    captured?: PieceSymbol;
    promotion?: PieceSymbol;
    flags: string;
    san: string;
    lan: string;
    before: string;
    after: string;
};

type AccMove = Pick<Move, "from" | "to">;

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
        // this.Board.draw();
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

        let board_rep: BoardRep = await fetch(`${window.location.pathname}/board`).then(res => res.json());
        console.log(board_rep);
        this.Board.PopulateBoard(board_rep);

        let possible_moves: boolean[][] = await this.pingMoves();

        if (info.color == "w") { // TODO: Set-up logic, game loop incl moves, highlighting, castling, promotion, checkmate
            this.Board.flip();
            console.log("finna flip");
        };

        await this.Board.draw();

        for (;;) {
            status = await this.pingStatus();
            this.Board.turn = status.turn.color;
            if (status.turn.color == info.color) {
                let p_move = await this.Board.awaitMove();
                let from = p_move['from'];
                let to = p_move['to'];
                let from_req = (ColumnTranslate[from[0]] + RowTranslate[from[1]]) as Square;
                let to_req = (ColumnTranslate[to[0]] + RowTranslate[to[1]]) as Square;
                let move: AccMove = {
                    from: from_req,
                    to: to_req
                };
                console.log(move);
                console.log("what");
                this.makeMove(move);
                board_rep = await fetch(`${window.location.pathname}/board`).then(res => res.json());
            } else {
                console.log("oh no");
                await this.waitForMessage();
                board_rep = await fetch(`${window.location.pathname}/board`).then(res => res.json());
            }

            this.Board.PopulateBoard(board_rep);

            if (info.color == "w") { // TODO: Set-up logic, game loop incl moves, highlighting, castling, promotion, checkmate
                this.Board.flip();
                console.log("finna flip");
            };

            await this.Board.draw();
        }
    }

    public async makeMove(move: AccMove) {
        let res =  await fetch(`${window.location.pathname}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(move),
        })
        .then(res => res.json());

        console.log(res);

        return res;
    }

    public async pingMoves() : Promise<boolean[][]> {
        // let moves: boolean[][] = 
        let moves: boolean[][] = await fetch(`${window.location.pathname}/moves?square=${'a1'}`)
        .then(res => res.json());
        return moves;
        // // .then(res => res.json());
        // console.log(moves);
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