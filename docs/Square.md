
# Square Class

The `Square` class represents a single square on the chessboard in the client-side UI. It stores its position, state, color, and reference to any piece on it. This class is responsible for rendering itself visually and can display different UI states, such as highlights for valid moves.

## Purpose and Usage

Consider the `Square` class in various contexts:
- **During Play**: Displays either a piece or an empty square, with potential visual states for highlighting moves or selections.
- **Custom Board Design**: Allows customization of square colors and UI states, making it flexible for designing custom boards or unique game visuals.

---

### Fields

A `Square` has the following fields:

```typescript
import { Board } from "./Board";
import { SquareUIState, Position } from "./Utils";
import { Piece } from "./Piece";
import { Application, Graphics } from "pixi.js";

export class Square {
    public Position: Position;
    public States: SquareUIState[] = [];
    public Piece: Piece | null = null;
    protected DefaultColor: number;
    protected Graphic: Graphics = new Graphics();
}
```

- **Position**: A 2-tuple (`row`, `col`) that represents the square's location on the board.

- **States**: An array of `SquareUIState` objects that define different UI states for the square, such as highlighting available moves or indicating selection. This allows for extensible visual behavior.

- **Piece**: A reference to a `Piece` object currently on the square or `null` if empty.

- **DefaultColor**: The base color of the square. Squares alternate colors to create a chessboard pattern, typically in light and dark shades.

- **Graphic**: An instance of `Graphics` from Pixi.js, which handles the visual rendering of the square.

### Methods

#### `constructor(position: Position, default_color: number)`

The constructor initializes a `Square` with a given position and default color.

- **Parameters**:
  - `position`: The position of the square on the board, as a `Position` type.
  - `default_color`: The default color assigned to this square.

#### `draw(app: Application, square_size: number, row: number, col: number): void`

The `draw` method renders the square on the board, using Pixi.js to display it at the correct location and size. The board iterates over all squares and calls this method to render each one.

- **Parameters**:
  - `app`: The Pixi.js `Application` instance on which the square will be drawn.
  - `square_size`: The size of each square on the board, in pixels.
  - `row`: The row index of the square on the board.
  - `col`: The column index of the square on the board.

- **Functionality**:
  - This method uses the `Graphics` object to draw a rectangle representing the square. It sets the position and size based on the `square_size`, `row`, and `col` parameters and fills it with the `DefaultColor`.
  - Finally, it adds the square’s `Graphic` to the application's stage, making it visible on the board.

### Considerations

The `Square` class is currently designed for visual representation only, with no responsibility for game logic. Its main purpose is to display pieces and UI states.
