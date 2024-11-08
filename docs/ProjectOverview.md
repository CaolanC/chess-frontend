# Project Overview

I thought it would be wise to get some documentation going, seeing as the deadline is coming up and we will likely start to see contributions from people who might have been working on other areas of the project.

I'm not going to go through absolutely everything, but I'm going to highlight the key classes, *how* they work and *what* they do.

I'm going to split this document up into:

---

### Quick Rundown

**Piece** - Holds Metadata, the name of the piece, it's image's location etc.

**Square** - A board square, has a color, a piece (or no piece). Each squares draws itself individually. We need to be able to click on squares to move pieces, drag them, quickly update UI components etc.

**Board** - Our bridge to the dom. It initialises the pixi.js application, and has a grid of squares. We will be able to easily move squares from a to b in the future, without having to update the squares themselves (just swapping their places on the board, maybe removing one of their pieces if it's a capture etc.)

**Game** - Not fully made yet. The original idea was that custom pieces could be held here, and that way maybe we can statically reference their image paths etc.