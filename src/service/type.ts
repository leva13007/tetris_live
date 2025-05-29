export type Cell = 0 | 1;
export type Point = {
  r: number;
  c: number;
}

type Rotate = {
  shape: [
    [Cell, Cell, Cell, Cell],
    [Cell, Cell, Cell, Cell],
    [Cell, Cell, Cell, Cell],
    [Cell, Cell, Cell, Cell],
  ];
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