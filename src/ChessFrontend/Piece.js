"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = void 0;
class Piece {
    constructor(namespace, id, board, position, image_path) {
        this.Namespace = namespace, // Namespacing and ID's are so that we can uniquely identify a piece's sprite on the backend without storing it in the engine instance
            this.ID = id;
        this.Board = board;
        this.Position = position;
        this.ImagePath = image_path;
    }
    getNamespace() {
        return this.Namespace;
    }
    getId() {
        return this.ID;
    }
    getImagePath() {
        return this.ImagePath;
    }
}
exports.Piece = Piece;
