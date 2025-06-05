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

export type Rotate = {
  shape: Shape;
  spawnOffset: Point;
}

export type BrickIntance = Rotate & {rotationIndex: number; name: string};

export type Tetromino = {
  name: string;
  rotations: Rotate[];
}

export type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Grid = [
  Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row,
]