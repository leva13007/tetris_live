import { COLS, ROWS, SHAPE_SIZE, TETROMINOES } from "./constants";
import type { BrickIntance, Grid, Point, Row, Shape } from "./type";

export const getRandomBrick = (): BrickIntance => {

  const nextBrickIndex = Math.floor(Math.random() * TETROMINOES.length);
  const nextBrick = TETROMINOES[nextBrickIndex].rotations[Math.floor(Math.random() * TETROMINOES[nextBrickIndex].rotations.length)];
  return {
    ...nextBrick,
    rotationIndex: nextBrickIndex,
    name: TETROMINOES[nextBrickIndex].name,
  };
}

export const getMergedGrid = (grid: Grid, brick: BrickIntance): Grid => {
  const cloneGrid = structuredClone(grid);
  const { shape, spawnOffset } = brick;
  for (let dr = 0; dr < SHAPE_SIZE; dr++) {
    for (let dc = 0; dc < SHAPE_SIZE; dc++) {
      if (shape[dr][dc]) {
        const r = spawnOffset.r + dr;
        const c = spawnOffset.c + dc;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
          cloneGrid[r][c] = 1;
        }
      }
    }
  }

  return cloneGrid;
}

export const hasCollision = (grid: Grid, shape: Shape, nextOffser: Point): boolean => {
  for (let dr = 0; dr < SHAPE_SIZE; dr++) {
    for (let dc = 0; dc < SHAPE_SIZE; dc++) {
      if (shape[dr][dc]) {
        const r = nextOffser.r + dr;
        const c = nextOffser.c + dc;
        if (
          r >= ROWS ||
          c < 0 ||
          c >= COLS ||
          grid[r][c]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export const getNextRotationBrick = (
  name: string,
  rotationIndex: number,
): {
  shape: Shape;
  rotationIndex: number;
} => {
  const tetromino = TETROMINOES.find(t => t.name === name);
  const nextRotationIndex = (rotationIndex + 1) % tetromino!.rotations.length
  return {
    rotationIndex: nextRotationIndex,
    shape: tetromino!.rotations[nextRotationIndex].shape
  }
}

export const rotate = ({
  grid,
  currentBrick,
  setCurrentBrick,
  isGameOver,
  isPause,
}: {
  grid: Grid;
  currentBrick: BrickIntance;
  setCurrentBrick: (brick: BrickIntance) => void;
  isGameOver: boolean;
  isPause: boolean;
}) => {
  if (isGameOver || isPause) return;
  const nextShape = getNextRotationBrick(currentBrick.name, currentBrick.rotationIndex);
  if (hasCollision(grid, nextShape.shape, { r: currentBrick.spawnOffset.r, c: currentBrick.spawnOffset.c })) return;
  setCurrentBrick({
    ...currentBrick,
    shape: nextShape.shape,
    rotationIndex: nextShape.rotationIndex,
  })
}


export const moveSides = ({
  grid,
  currentBrick,
  setCurrentBrick,
  dc,
  isGameOver,
  isPause,
}: {
  grid: Grid;
  currentBrick: BrickIntance;
  setCurrentBrick: (brick: BrickIntance) => void;
  dc: number;
  isGameOver: boolean;
  isPause: boolean;
}) => {
  if (isGameOver || isPause) return;
  const c = currentBrick.spawnOffset.c + dc;
  if (hasCollision(grid, currentBrick.shape, { r: currentBrick.spawnOffset.r, c })) return;
  setCurrentBrick({
    ...currentBrick,
    spawnOffset: {
      r: currentBrick.spawnOffset.r, c
    }
  })
}

export const moveDown = ({
  isGameOver,
  isPause,
  grid,
  currentBrick,
  setCurrentBrick,
  setGrid,
  setScore,
  setLines,
  setNextBrick,
  nextBrick,
  setGameOver,
  setGameMsg,
}: {
  isGameOver: boolean;
  isPause: boolean;
  grid: Grid;
  currentBrick: BrickIntance;
  setCurrentBrick: (brick: BrickIntance) => void;
  setGrid: (grid: Grid) => void;
  setScore: (value: number | ((prev: number) => number)) => void;
  setLines: (value: number | ((prev: number) => number)) => void;
  setNextBrick: (brick: BrickIntance) => void;
  nextBrick: BrickIntance;
  setGameOver: (gameOver: boolean) => void;
  setGameMsg: (msg: string) => void;
}) => {
  if (isGameOver || isPause) return;
  const r = currentBrick.spawnOffset.r + 1;
  if (hasCollision(grid, currentBrick.shape, { r, c: currentBrick.spawnOffset.c })) {
    const mergedGrid = getMergedGrid(grid, currentBrick);
    const { clearedlines, newGrid } = clearLines(mergedGrid);
    setScore(prev => prev + clearedlines * 10)
    setLines(prev => prev + clearedlines);
    setGrid(newGrid);
    setCurrentBrick(nextBrick);
    setNextBrick(getRandomBrick());
    if (hasCollision(grid, nextBrick.shape, nextBrick.spawnOffset)) {
      setGameOver(true);
      setGameMsg("GameOver!");
    }
  } else {
    setCurrentBrick({
      ...currentBrick,
      spawnOffset: {
        r,
        c: currentBrick.spawnOffset.c
      }
    })
  }
}

export const clearLines = (grid: Grid): {
    newGrid: Grid;
    clearedlines: number;
  } => {
    const newGrid = [] as unknown as Grid;
    let clearedlines = 0;

    for (const row of grid) {
      if (row.every(cell => cell === 1)) {
        clearedlines++;
      } else {
        newGrid.push(row);
      }
    }

    while (newGrid.length < ROWS) {
      newGrid.unshift(Array(COLS).fill(0) as Row);
    }

    return {
      newGrid: newGrid,
      clearedlines,
    }
  }