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
  <div data-testid={`grid-cell-${i}-${j}`} key={`${i} ${j}`} className={`grid__cell ${cell ? 'grid__cell--active' : ''}`}></div>
))