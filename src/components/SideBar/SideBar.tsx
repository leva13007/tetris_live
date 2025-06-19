import { memo } from "react"
import type { Shape } from "../../service/type"
import { GridRow } from "../GridRow/GridRow"
import { InfoWrapper } from "../InfoWrapper/InfoWrapper";

export const SideBar = memo(({
  shape,
  score,
  lines,
  level
}: {
  shape: Shape;
  score: number;
  lines: number;
  level: number;
}) => (
  <section className="game__info" data-testid="sidebar">
    <div className="next-brick info-wrapper">
      <h3 className="text-title">Next brick</h3>
      <div className="next-brick__gird game__grid">
        {
          shape.map((row, i) => (
            <GridRow key={i} i={i} row={row} />
          ))
        }
      </div>
    </div>
    <InfoWrapper label="Score" value={score} />
    <InfoWrapper label="Lines" value={lines} />
    <InfoWrapper label="Level" value={level} />
  </section>
))