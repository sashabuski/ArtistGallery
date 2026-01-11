import { forwardRef } from "react";
import Cell from "./Cell";

interface ColumnProps {
  columnIndex: number;
  rows: number;
  startIndex: number;
}
const imageModules = import.meta.glob('../assets/ARTWORK/*.{png,jpg,jpeg,svg}', { eager: true });

// Convert to an array of URLs
const images: string[] = Object.values(imageModules).map((module: any) => module.default);


/**
 * forwardRef is REQUIRED because ScrollBox
 * needs direct access to the column DOM node
 * for transform updates.
 */
const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ columnIndex, rows, startIndex }, ref) => {
    return (
      <div ref={ref} className={`column col-${columnIndex}`}>
        {Array.from({ length: rows }).map((_, r) => {
          const imgIndex = startIndex + r; // unique index across all columns
          const src = images[imgIndex];   // no wrapping

          return <Cell key={r} src={src} />;
        })}
      </div>
    );
  }
);

export default Column;
