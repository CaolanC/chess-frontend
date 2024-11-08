# Piece

This represents a piece, client-side. It stores data about the piece, and is a purely visual component. 

Think about this class from multiple perspectives:

- During Play
- Designing a custom piece
- Designing a custom board

Regardless of wether we decide to implement all of this functionality or expand into subclasses, for now a piece should be thought of as the class that holds all of the data we need to show a client an image of a piece. :smile:

---

### Fields

A piece has these fields:

```ts
export class Piece
{
    public Position: Position;
    protected readonly ID: string;
    protected readonly Namespace: string;
    protected readonly ImagePath: string;
    protected Board: Board;
}
```

- **Position:** This is a 2-tuple, which holds a row and a column. It's essentially a coordinate on the board.

- **Namespace:** Why do we need a namespace? Because if custom pieces ever become a thing what happens if a player decides to name a piece "Rook"? Well a "Rook" already exists, as part of the standard set of pieces. We can differentiate them by saying "std-Rook" and "namespace-Rook".

- **ImagePath:** We don't want to store the sprites for pieces on the backend for long, we need them to be stored on the client. This represents where we store it.

- **Board:** This represents a reference to a Board object. Why does a piece need a reference to the board? This might be completely redudant.

We should probabaly determine wether or not we ***actually*** need to store the pieces position and a reference to it's board. It depends entirely on how we implement moves down the line, but from initial thoughts I think we can compress this down some.