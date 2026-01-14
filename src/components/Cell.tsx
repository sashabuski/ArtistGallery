import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

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
  const [loaded, setLoaded] = useState(false);
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
     <img
  className={loaded ? "img-loaded" : ""}
  src={src}
  alt={title}
  onLoad={() => setLoaded(true)}
/>

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
