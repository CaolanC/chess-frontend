import { Piece } from './Piece';
import { Board } from './Board';

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
        this.FenIDBoard = this._parseFen(fen_string);
    }

    private _parseFen(fen_string: string): string[][] {
        // TODO: Implement the FEN parsing logic here
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
        // Convert StandardPiece array to PieceSetIDs array
        return std_pieces.map(piece => this._stdPieceToPieceId(piece));
    }

    private _stdPieceToPieceId(std_piece: StandardPiece): PieceID {
        // Convert each StandardPiece enum to a corresponding PieceID (assuming a simple mapping here)
        return `piece-${StandardPiece[std_piece]}`; // e.g., "piece-Rook"
    }
}

export class Game {

    public readonly Board: Board;
    public readonly Registry: GameStateRegistry;

    constructor(board: Board, pieces: StandardPiece[] = Game.getDefaultSet()) {
        this.Board = board;
        this.Registry = new GameStateRegistry(this.Board, pieces);
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