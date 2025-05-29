import type { Tetromino } from "./type";

export const ROWS = 20;
export const COLS = 10;

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
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
          [1, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
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
        spawnOffset: { r: 0, c: 0 },
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
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
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
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [1, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 1, 1, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
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
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 0, 0, 0],
          [1, 1, 1, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 0, 1, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
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
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
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
        spawnOffset: { r: 0, c: 0 },
      },
      {
        shape: [
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
        ],
        spawnOffset: { r: 0, c: 0 },
      },
    ],
  },
]