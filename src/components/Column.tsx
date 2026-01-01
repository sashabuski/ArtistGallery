import React, { forwardRef } from "react";
import Cell from "./Cell";

interface ColumnProps {
  columnIndex: number;
  rows: number;
}

/**
 * forwardRef is REQUIRED because ScrollBox
 * needs direct access to the column DOM node
 * for transform updates.
 */
const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ columnIndex, rows }, ref) => {
    return (
      <div ref={ref} className={`column col-${columnIndex}`}>
        {Array.from({ length: rows }).map((_, r) => (
          <Cell
            key={r}
            label={`C${columnIndex + 1} / R${r + 1}`}
          />
        ))}
      </div>
    );
  }
);

export default Column;
