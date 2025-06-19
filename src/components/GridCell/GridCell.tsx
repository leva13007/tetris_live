import { memo } from "react";
import type { Cell } from "../../service/type";

export const GridCell = memo(({
  i,
  j,
  cell
}: {
  i: number;
  j: number;
  cell: Cell;
}) => (
  <div key={`${i} ${j}`} className={`grid__cell ${cell ? 'grid__cell--active' : ''}`}></div>
))