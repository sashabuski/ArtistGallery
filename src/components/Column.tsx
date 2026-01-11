import { forwardRef } from "react";
import Cell from "./Cell";
import artworks from "../data/artworks.json";

const imageModules = import.meta.glob('../assets/ARTWORK/*.{png,jpg,jpeg,svg}', { eager: true });
const imageMap: Record<string, string> = {};
Object.entries(imageModules).forEach(([path, mod]: any) => {
  const filename = path.split("/").pop();
  if (filename) imageMap[filename] = mod.default;
});

interface ColumnProps {
  columnIndex: number;
  rows: number;
  startIndex: number;
}

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ columnIndex, rows, startIndex }, ref) => {
    return (
      <div ref={ref} className={`column col-${columnIndex}`}>
        {Array.from({ length: rows }).map((_, r) => {
          const artIndex = startIndex + r;
          const artwork = artworks[artIndex];
          if (!artwork) return null;
      
          const fileName = artwork.file || artwork.title + ".jpg";
          const src = imageMap[fileName];
          if (!src) {
            console.warn(`Image not found for ${fileName}`);
            return null;
          }

          return (
            <Cell
              key={r}
              src={src}
              title={artwork.title}
              dimension={artwork.dimension}
              medium={artwork.medium}
            />
          );
        })}
      </div>
    );
  }
);

export default Column;
