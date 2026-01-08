
interface CellProps {
  src: string;
}

const Cell: React.FC<CellProps> = ({ src }) => {

  const filename = decodeURIComponent(src.split("/").pop() || "");

  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

  const [title = "Untitled", dimension = "", medium = ""] = nameWithoutExt.split("_");

  return (
    <div className="cell">
      <img src={src} alt={title} />
      <div className="overlay">
        <div className="title">{title}</div>
        <div className="details">
          <div id="dimension">{dimension}</div>
          <div id="medium">{medium}</div>
        </div>
      </div>
    </div>
  );
};

export default Cell;