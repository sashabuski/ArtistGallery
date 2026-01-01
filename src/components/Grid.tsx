import React from "react";
import Column from "./Column";

interface GridProps {
  columnRows: number[];
  columnRefs: React.RefObject<HTMLDivElement | null>[];
}

const Grid: React.FC<GridProps> = ({ columnRows, columnRefs }) => {
  return (
    <div className="grid">
      {columnRows.map((rows, i) => (
        <Column
          key={i}
          columnIndex={i}
          rows={rows}
          ref={columnRefs[i]}
        />
      ))}
    </div>
  );
};

export default Grid;
