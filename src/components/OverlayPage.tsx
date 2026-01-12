import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface OverlayPageProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const OverlayPage: React.FC<OverlayPageProps> = ({ title, children, onClose }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      onClose ? onClose() : navigate("/", { replace: true });
    }, 350);
  };

  return (
    <div className={`artworkOverlay ${visible ? "visible" : ""}`}>
      <div className="artworkBackdrop" onClick={close} />
      <div className="artworkPanel">
        <div className="artworkContainer">
          <div className="artworkScrollContent">
            <div className="pageTitle">{title}</div>
            {children}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayPage;
