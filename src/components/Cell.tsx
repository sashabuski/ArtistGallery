import { useNavigate, useLocation } from "react-router-dom";

interface CellProps {
  src: string;
  title: string;
  dimension: string;
  medium: string;
  fadeDelay?: number; 
  source: "artwork" | "photo"; 
}

const Cell: React.FC<CellProps> = ({
  src,
  title,
  dimension,
  medium,
  fadeDelay = 0,
  source,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="cell"
      onClick={() =>
        navigate(`/${source}/${title}`, {
          state: { background: location },
        })
      }
      style={{
        opacity: 0, 
        animation: `fadeIn 400ms ease forwards`,
        animationDelay: `${fadeDelay}ms`,
      }}
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
