
# Board Class

The `Board` class represents the chessboard on the client-side, managing the layout of squares and rendering them visually using Pixi.js. It initializes the board with alternating colors, handles rendering, and provides functionality to manage the overall board structure.

## Purpose and Usage

Represents the game board on which pieces move and interact. It's basically an interface for us to interact with that represents the games state.

---

### Fields

A `Board` has the following fields:

```typescript
import { Application, Graphics } from 'pixi.js';
import { Square } from './Square';

export class Board {
    public Container: HTMLElement;
    public readonly Size: number;
    protected DefaultColors: [number, number];
    protected Squares: Square[][];
    protected readonly App: Application = new Application();
}
```

- **Container**: The HTML element that hosts the board (e.g., a div in the DOM). This is where the board's canvas is rendered.

- **Size**: The dimension of the board, representing the number of rows and columns (e.g., 8 for an 8x8 chessboard).

- **DefaultColors**: A tuple representing the two default colors for the squares (e.g., light and dark colors for a chessboard pattern).

- **Squares**: A 2D array of `Square` objects, representing each square on the board.

- **App**: An instance of the Pixi.js `Application` that handles rendering for the board. This is used to manage and display the canvas.

### Methods

#### `constructor(size: number, container: HTMLElement, default_colors: [number, number])`

The constructor initializes a `Board` with a specified size, container, and default colors.

- **Parameters**:
  - `size`: The dimension of the board (e.g., 8 for an 8x8 board).
  - `container`: The HTML element that will host the board.
  - `default_colors`: An array with two colors for the squares.

#### `_EmptyBoard(): Square[][]`

This protected method creates a 2D array of `Square` objects, alternating colors to create the chessboard pattern.

- **Returns**: A 2D array of `Square` objects with alternating colors.

#### `initApp(): Promise<void>`

Initializes the Pixi.js application, setting up the canvas with the specified background color and appending it to the container.

#### `draw(): Promise<void>`

Iterates over all squares and calls their `draw()` method to render them on the board.

- **Functionality**:
  - Calculates the size of each square based on the container dimensions.
  - Loops through each row and column of `Squares` and draws each square.

### Considerations

The `Board` class focuses on visual representation and layout. It initializes and displays the board with alternating colors and manages the drawing of each square.
