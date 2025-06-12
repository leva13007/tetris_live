import { COLS, ROWS, SHAPE_SIZE, TETROMINOES } from "./constants";
import type { BrickIntance, GameState, Grid, Point, Row, Shape } from "./type";

export const getRandomBrick = (): BrickIntance => {

  const nextBrickIndex = Math.floor(Math.random() * TETROMINOES.length);
  const nextRotationIndex = Math.floor(Math.random() * TETROMINOES[nextBrickIndex].rotations.length);
  const nextBrick = TETROMINOES[nextBrickIndex].rotations[nextRotationIndex];
  return {
    ...nextBrick,
    rotationIndex: nextRotationIndex,
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
  const nextRotationIndex = (rotationIndex + 1) % tetromino!.rotations.length;
  console.log("nextRotationIndex", rotationIndex, nextRotationIndex);
  return {
    rotationIndex: nextRotationIndex,
    shape: tetromino!.rotations[nextRotationIndex].shape
  }
}

export const rotate = ({
  grid,
  currentBrick,
}: {
  grid: Grid;
  currentBrick: BrickIntance;
}): BrickIntance => {
  const nextShape = getNextRotationBrick(currentBrick.name, currentBrick.rotationIndex);
  if (hasCollision(grid, nextShape.shape, { r: currentBrick.spawnOffset.r, c: currentBrick.spawnOffset.c })) {
    return currentBrick
  }
  return {
    ...currentBrick,
    shape: nextShape.shape,
    rotationIndex: nextShape.rotationIndex,
  }
}


export const moveSides = ({
  grid,
  currentBrick,
  dc,
}: {
  grid: Grid;
  currentBrick: BrickIntance;
  dc: number;
}): BrickIntance => {
  const c = currentBrick.spawnOffset.c + dc;
  if (hasCollision(grid, currentBrick.shape, { r: currentBrick.spawnOffset.r, c })) return currentBrick;
  return {
    ...currentBrick,
    spawnOffset: {
      r: currentBrick.spawnOffset.r, c
    }
  }
}

export const moveDown = ({
  grid,
  currentBrick,
}: {
  grid: Grid;
  currentBrick: BrickIntance;
}) => {
  const r = currentBrick.spawnOffset.r + 1;
  if (hasCollision(grid, currentBrick.shape, { r, c: currentBrick.spawnOffset.c })) {
    return {
      nextBrickMove: currentBrick,
      gotCollision: true,
    }

  }
  return {
    nextBrickMove: {
      ...currentBrick,
      spawnOffset: {
        r,
        c: currentBrick.spawnOffset.c
      }
    },
    gotCollision: false,
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

export const tick = (gameState: GameState): GameState => {
  const movement = moveDown({
    grid: gameState.grid,
    currentBrick: gameState.currentBrick,
  });

  if (!movement.gotCollision) {
    return {
      ...gameState,
      currentBrick: movement.nextBrickMove,
    };
  }

  const mergedGrid = getMergedGrid(gameState.grid, gameState.currentBrick);
  const { clearedlines, newGrid } = clearLines(mergedGrid);
  let isGameOver = false;
  let gameMsg = "";
  if (hasCollision(gameState.grid, gameState.nextBrick.shape, gameState.nextBrick.spawnOffset)) {
    isGameOver = true;
    gameMsg = "GameOver!";
  }

  return {
    ...gameState,
    grid: newGrid,
    currentBrick: gameState.nextBrick,
    nextBrick: getRandomBrick(),
    score: gameState.score + clearedlines * 10,
    lines: gameState.lines + clearedlines,
    level: Math.floor((gameState.lines + clearedlines) / 10) + 1,
    isGameOver,
    gameMsg,
  }
}