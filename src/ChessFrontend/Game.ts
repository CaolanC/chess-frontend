import { Piece } from './Piece';
import { Board } from './Board';

namespace ChessFrontend 
{

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

export class FenParser {

    public readonly FenIDBoard: string[][];
    
    public constructor(fen_string: string) {
        let new_string: string[][] = this._parseFen(fen_string);

        this.FenIDBoard = new_string;

    }

    private _parseFen(fen_string: string): string[][] {
        let fen: string[][] = [];
        return fen;
    }
}


export class GameStateRegistry {

    public readonly PossiblePieces: PieceSetIDs;
    public readonly Board: Board;

    constructor(board: Board, possible_pieces: StandardPiece[]) {
        this.PossiblePieces = this._stdPiecesToPieceSetIDs(possible_pieces); 
        this.Board = board;
    }

    private _stdPiecesToPieceSetIDs(std_pieces: StandardPiece[]): PieceSetIDs {
         
    }

    private _stdPieceToPieceId(std_piece: StandardPiece): PieceSetIDs {
        
    }

}

export class Game {

    public readonly Board: Board;
    public readonly Registry: GameStateRegistry;

    constructor(board: Board, pieces: StandardPiece[]=this._getDefaultSet()) {
        this.Board = board;
        this.Registry = new GameStateRegistry(this.Board, pieces);
    }

    private _getDefaultSet(): StandardPiece[] {

        let piece_set: StandardPiece[] = [];

        for (let piece in StandardPiece) {
            piece_set.add(piece);
        }

        return piece_set;
        
    }
}

}
