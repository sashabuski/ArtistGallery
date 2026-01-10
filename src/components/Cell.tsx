import { useNavigate, useLocation } from "react-router-dom";

interface CellProps {
  src: string;
}

const Cell: React.FC<CellProps> = ({ src }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const filename = decodeURIComponent(src.split("/").pop() || "");
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const [title = "Untitled", dimension = "", medium = ""] =
    nameWithoutExt.split("_");

  return (
    <div
      className="cell"
      onClick={() =>
        navigate(`/artwork/${nameWithoutExt}`, {
          state: { background: location },
        })
      }
    >
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
