export type Cell = 0 | 1;
export type Point = {
  r: number;
  c: number;
}

export type Shape = [
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
];

type Rotate = {
  shape: Shape;
  spawnOffset: Point;
}

export type Tetromino = {
  name: string;
  rotations: Rotate[];
}

type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Grid = [
  Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row,
]