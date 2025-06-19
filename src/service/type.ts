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

export type BrickIntance = Rotate & { rotationIndex: number; name: string };

export type Tetromino = {
  name: string;
  rotations: Rotate[];
}

type Row1 = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
type Row2 = [Cell, Cell, Cell, Cell,];

export type Row = Row1 | Row2;
export type Grid = [
  Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row, Row,
]

export type GameState = {
  isGameOver: boolean;
  grid: Grid;
  currentBrick: BrickIntance;
  nextBrick: BrickIntance;
  score: number;
  lines: number;
  level: number;
  isPause: boolean;
  gameMsg: string;
}