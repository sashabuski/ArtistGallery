import { useNavigate, useLocation } from "react-router-dom";

interface CellProps {
  src: string;
  title: string;
  dimension: string;
  medium: string;
}

const Cell: React.FC<CellProps> = ({ src, title, dimension, medium }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="cell"
      onClick={() =>
        navigate(`/artwork/${title}`, {
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
