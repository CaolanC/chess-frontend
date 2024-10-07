"use strict";
var ChessFrontend;
(function (ChessFrontend) {
    class Square {
    }
    class Board {
        constructor(size, board) {
            this.Size = size;
            this.Board = board;
        }
    }
    class Piece {
        constructor(namespace, id, board, position) {
            this.Namespace = namespace,
                this.ID = id;
            this.Board = board;
            this.Position = position;
        }
        getNamespace() {
            return this.Namespace;
        }
        getId() {
            return this.ID;
        }
    }
})(ChessFrontend || (ChessFrontend = {}));
