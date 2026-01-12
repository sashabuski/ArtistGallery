import { forwardRef } from "react";
import Cell from "./Cell";

import artworks from "../data/artworks.json";
import photos from "../data/photos.json";

const artworkModules = import.meta.glob(
  "../assets/ARTWORK/*.{png,jpg,jpeg,svg}",
  { eager: true }
);

const photoModules = import.meta.glob(
  "../assets/PHOTOS/*.{png,jpg,jpeg,svg}",
  { eager: true }
);

const buildImageMap = (modules: Record<string, any>) => {
  const map: Record<string, string> = {};
  Object.entries(modules).forEach(([path, mod]) => {
    const filename = path.split("/").pop();
    if (filename) map[filename] = mod.default;
  });
  return map;
};

const artworkImageMap = buildImageMap(artworkModules);
const photoImageMap = buildImageMap(photoModules);

interface ColumnProps {
  columnIndex: number;
  rows: number;
  startIndex: number;
  source: "artwork" | "photo";
}

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ columnIndex, rows, startIndex, source }, ref) => {
    const data = source === "artwork" ? artworks : photos;
    const imageMap = source === "artwork" ? artworkImageMap : photoImageMap;

    return (
      <div ref={ref} className={`column col-${columnIndex}`}>
        {Array.from({ length: rows }).map((_, r) => {
          const index = startIndex + r;
          const item = data[index];
          if (!item) return null;

          const fileName = item.file || `${item.title}.jpg`;
          const src = imageMap[fileName];

          if (!src) {
            console.warn(`Image not found: ${fileName}`);
            return null;
          }
      
          const fadeDelay = (r + columnIndex) * 50; 

          return (
            <Cell
              key={r}
              src={src}
              title={item.title}
              dimension={item.dimension}
              medium={item.medium}
              fadeDelay={fadeDelay}
              source={source}  
            />
          );
        })}
      </div>
    );
  }
);

export default Column;
