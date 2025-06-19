import { memo } from "react";
import type { Row } from "../../service/type";
import { GridCell } from "../GridCell/GridCell";

export const GridRow = memo(({
  i,
  row
}: {
  i: number;
  row: Row
}) => (
  <div key={i} className="grid__row">
    {
      row.map((cell, j) => (
        <GridCell key={`${i} ${j}`} i={i} j={j} cell={cell} />
      ))
    }
  </div>
), (prev: { i: number; row: Row }, current: { i: number; row: Row }) => {
  return prev.row.every((cell, j) => cell === current.row[j]) && prev.i === current.i;
})