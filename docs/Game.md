# Game Class

The `Game` class initializes the board and piece registry, managing the overall game state.

### Fields

```typescript
export class Game {
    public readonly Board: Board;
    public readonly Registry: GameStateRegistry;
}
```

- **Board**: The `Board` object representing the game board.
- **Registry**: A `GameStateRegistry` instance that manages available pieces and references the board.

### Methods

#### `constructor(board: Board, pieces: StandardPiece[] = Game.getDefaultSet())`

Initializes a new `Game` with a specified board and an optional array of pieces. If no pieces are provided, it uses a default set.

- **Parameters**:
  - `board`: The `Board` object for the game.
  - `pieces`: An array of `StandardPiece` enums representing the pieces to be used. Defaults to a standard set if not provided.

#### `static getDefaultSet(): StandardPiece[]`

Static method that returns the default set of chess pieces for standard gameplay.

