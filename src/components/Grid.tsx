import React from "react";
import Column from "./Column";
interface GridProps {
  columnRows: number[];
  columnRefs: React.RefObject<HTMLDivElement | null>[];
  columns: number;
}

const Grid: React.FC<GridProps> = ({ columnRows, columnRefs, columns }) => {
  let globalIndex = 0; 

  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {columnRows.map((rows, i) => {
        const startIndex = globalIndex;
        globalIndex += rows; 
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
