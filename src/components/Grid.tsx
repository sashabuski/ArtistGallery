import React from "react";
import Column from "./Column";
interface GridProps {
  columnRows: number[];
  columnRefs: React.RefObject<HTMLDivElement | null>[];
  columns: number;
}

const Grid: React.FC<GridProps> = ({ columnRows, columnRefs, columns }) => {
  let globalIndex = 0; // tracks which image to use

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {columnRows.map((rows, i) => {
        const startIndex = globalIndex;
        globalIndex += rows; // increment for next column
        return (
          <Column
            key={i}
            columnIndex={i}
            rows={rows}
            startIndex={startIndex}
            ref={columnRefs[i]}
          />
        );
      })}
    </div>
  );
};


export default Grid;
