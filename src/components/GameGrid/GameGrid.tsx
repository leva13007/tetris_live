import type { Grid } from "../../service/type"
import { GridRow } from "../GridRow/GridRow"

export const GameGrid = ({
  grid
}: {
  grid: Grid
}) => (
  <>
    {
      grid.map((row, i) => (
        <GridRow key={i} i={i} row={row} />
      ))
    }
  </>
) 