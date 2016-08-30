Sudoku is a simple game with simple rules. However, solving a Sudoku board is not always easy. In this tutorial, I will walk through a systematic algorithm to solve arbitrary Sudoku boards in **Scala**. You can always view the [full source on GitHub](https://github.com/jswny/SudokuSolver) for reference.

For the first part of this series of tutorials, we will be learning how to **calculate the peers of a coordinate**.

## Calculating Peers

The first step in this process will be to write a simple function which will return the peers of a given coordinate. For this tutorial, we will be using a Sudoku board which starts at the location **(0,0)**, and ends at the location **(8,8)**. 

Let's start by defining a function called `calcPeers` which takes two integer parameters: **a row, and a column**, and returns a **list of integer tuples**. 

```language-scala
def calcPeers(row: Int, col: Int): List[(Int, Int)]
```

Next, in the `calcPeers` method, let's find the individual peers for a location on the board by row and column.

```language-scala
def calcPeers(row: Int, col: Int): List[(Int, Int)] = {
  val rowPeers = 0.to(8).map{ r => (r, col) }
  val colPeers = 0.to(8).map{ c => (row, c) }
}
```

For the row peers, we are taking a range of numbers from 0 to 8, and mapping over them. For each integer in the range, we pass it into a function which creates a tuple using said integer as the row value `r`, and the column value `col` which we passed into the function originally.

Similarly, for the column peers, we do the same thing except we use each integer as the column value `c`, and keep the row value `row` from the function.

For example, using the coordinate `(2, 3)`, would return `rowPeers = Vector((0,3), (1,3), (2,3), (3,3), (4,3), (5,3), (6,3), (7,3), (8,3))`. Similarly, we would get `colPeers = Vector((2,0), (2,1), (2,2), (2,3), (2,4), (2,5), (2,6), (2,7), (2,8))`. Don't worry about `Vector`, we can just consider it equivalent to a list for now.

Next, let's calculate the box peers of the location. That is, the peers which reside in the 3x3 box in which the location `(row, col)` comes from. This is more complicated than calculating the row and column peers because we have to calculate both the row, and column values based on which small sub-board we are working with.

```language-scala
def calcPeers(row: Int, col: Int): List[(Int, Int)] = {
  val rowPeers = 0.to(8).map{ r => (r, col) }
  val colPeers = 0.to(8).map{ c => (row, c) }
  val boxRow = (row / 3) * 3
  val boxCol = (col / 3) * 3
}
```

First, we calculate the row of the box by dividing `row` by 3. This will return either 0, 1, or 2, giving us the box's row. If we think about the 9x9 Sudoku board in terms of 3x3 boxes, we can divide the whole board into a 3x3 board of 3x3 boxes. Therefore, we can take our row in terms of boxes `row / 3` and multiply it by 3 to get the row in terms of the regular board. Multiplying 0, 1, or 2 by 3 will either give us 0, 3, or 6, the three possibilities for rows which begin the 3x3 boxes. We do a similar calculation for the box column, except using `col` this time, resulting in one of the three possible starting columns for the 3x3 boxes `boxCol`. 

For example, using the coordinate **(2,3)**, `boxRow` would be **(2 / 3) * 3**, which simplifies to **0 * 3**, so `boxRow` would be **0**. Then, `boxCol` would be **(3 / 3) * 3**, which simplifies to **1 * 3**, so `boxCol` would be **3**. That gives us a starting location for the box of **(0,3)**. With `boxRow` and `boxCol` calculated, we can proceed to the next step, which is combining these values into a list of peers.

```language-scala
def calcPeers(row: Int, col: Int): List[(Int, Int)] = {
  val rowPeers = 0.to(8).map{ r => (r, col) }
  val colPeers = 0.to(8).map{ c => (row, c) }
  val boxRow = (row / 3) * 3
  val boxCol = (col / 3) * 3
  val boxPeers = boxRow.to(boxRow + 2).flatMap {
    r => boxCol.to(boxCol + 2).map {c => (r,c) }
  }
}
```

In order to find the peers for each box `boxPeers`, we first create a range from `boxRow` to `boxRow + 2`, which results in a range of integers starting at the first row of the appropriate box, and ending in the last row of the box. Similarly `boxCol.to(boxCol + 2)` gives us a range of integers from the first column of the box to the last one. Now, we combine these two concepts to produce the appropriate list of `boxPeers` by flat-mapping over the range of rows. For each row value, we create a list of three coordinates using the secondary range of columns, then `flatMap` flattens this list into the original list.

For example, using **(2,3)**, `boxRow.to(boxRow + 2)` would give us the range (which functions similarly to a list, like a vector does) including **0, 1, and 2**. Then, for each of these values in the range, we generate a new list of tuple coordinates using `boxCol.to(boxCol + 2)`, which would give us the range **3, 4, and 5**. Therefore, we generate the following three vectors:
```language-scala
Vector((0,3), (0,4), (0,5))
Vector((1,3), (1,4), (1,5))
Vector((2,3), (2,4), (2,5))
```
These get automatically flattened by `flatMap` into one large vector:
```language-scala
Vector((0,3), (0,4), (0,5), (1,3), (1,4), (1,5), (2,3), (2,4), (2,5))
```


Finally, we need to merge these three vectors into one large vector.

```language-scala
def calcPeers(row: Int, col: Int): List[(Int, Int)] = {
  val rowPeers = 0.to(8).map{ r => (r, col) }
  val colPeers = 0.to(8).map{ c => (row, c) }
  val boxRow = (row / 3) * 3
  val boxCol = (col / 3) * 3
  val boxPeers = boxRow.to(boxRow + 2).flatMap {
    r => boxCol.to(boxCol + 2).map {c => (r,c) }
  }
  (rowPeers ++ colPeers ++ boxPeers).filterNot {
    case (r,c) => r == row && col == c
  }.toList.distinct
}
```

We simply combine the three vectors into one large vector, except that we use `filterNot` to filter out any tuples which are the same as `(row, col)`. We do this because the coordinate whose peers we are looking for needs to be removed from the result set. Finally, we convert this vector into a list, and apply `.distinct` to it, which ensures each peer is only in the result set once.

In the next tutorial, we will learn how to **parse a Sudoku board from a string**.