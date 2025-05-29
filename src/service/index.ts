import { TETROMINOES } from "./constants";
import type { BrickIntance } from "./type";

export const getRandomBrick = (): BrickIntance => {
  
  const nextBrickIndex = Math.floor(Math.random() * TETROMINOES.length);
  const nextBrick = TETROMINOES[nextBrickIndex].rotations[Math.floor(Math.random() * TETROMINOES[nextBrickIndex].rotations.length)];
  console.log("getRandomBrick", nextBrickIndex)
  return {
    ...nextBrick,
    rotationIndex: nextBrickIndex,
    name: TETROMINOES[nextBrickIndex].name,
  };
}