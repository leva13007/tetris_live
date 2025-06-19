import { memo } from "react";

export const InfoWrapper = memo(({
    label,
    value,
}: {  label: string;
  value: string | number;   
}) => {
  return (
    <div className="game__score info-wrapper">
      <h3 className="text-title">{label}</h3>
      <div className="text-value">{value}</div>
    </div>
  );
})