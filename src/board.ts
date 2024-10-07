namespace ChessFrontend
{

    class Square
    {

    }

    class Board 
    {
        public Size: number;
        public Board: Square[][];

        constructor(
                size: number,
                board: Square[][]
            ) 
        {
            this.Size = size;
            this.Board = board;
        }
    }

    class Piece
    {
        protected readonly Namespace: string;
        protected readonly ID: string;
        protected Board: Board;

        public Position: [number, number];

        constructor(
                namespace: string, 
                id: string, 
                board: Board, 
                position: [number, number],
                ) 
            {
            this.Namespace = namespace,
            this.ID = id;
            this.Board = board;
            this.Position = position;
        }

        getNamespace(): string {
            return this.Namespace;
        }

        getId(): string {
            return this.ID;
        }
    }
}