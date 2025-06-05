import type { Tetromino } from "./type";

export const ROWS = 20;
export const COLS = 10;
export const SHAPE_SIZE = 4;

export const TETROMINOES: Tetromino[] = [
  {
    name: "I",
    rotations: [
      {
        shape: [
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      }
    ]
  },
  {
    name: "O",
    rotations: [
      {
        shape: [
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
    ],
  },
  {
    name: "T",
    rotations: [
      {
        shape: [
          [0, 1, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: -1, c: 3 },
      },
      {
        shape: [
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
    ]
  },
  {
    name: "J",
    rotations: [
      {
        shape: [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [1, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [0, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: -1, c: 3 },
      },
    ]
  },
  {
    name: "L",
    rotations: [
      {
        shape: [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: -1, c: 3 },
      },
      {
        shape: [
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [0, 0, 1, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
    ]
  },
  {
    name: "S",
    rotations: [
      {
        shape: [
          [0, 1, 1, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
    ],
  },
  {
    name: "Z",
    rotations: [
      {
        shape: [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
      {
        shape: [
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 3 },
      },
    ],
  },
]