import { COLS, ROWS, SHAPE_SIZE, TETROMINOES } from "./constants";
import type { BrickIntance, Grid } from "./type";

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
  const { shape, spawnOffset } =brick;
  for(let dr = 0; dr < SHAPE_SIZE; dr++) {
    for(let dc = 0; dc < SHAPE_SIZE; dc++) {
      if(shape[dr][dc]){
        const r = spawnOffset.r + dr;
        const c = spawnOffset.c + dc;
        if(r >= 0 && r < ROWS && c >= 0 && c < COLS){
          cloneGrid[r][c] = 1;
        }
      }
    }
  }

  return cloneGrid;
}