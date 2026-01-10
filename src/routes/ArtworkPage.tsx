import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtworkContent from "../components/ArtworkContent";

const imageModules = import.meta.glob(
  "../assets/ARTWORK/*.{png,jpg,jpeg,svg}",
  { eager: true }
);

const images: string[] = Object.values(imageModules).map(
  (module: any) => module.default
);

const ArtworkPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  const imageSrc = images.find((src) => {
    const filename = decodeURIComponent(src.split("/").pop() || "");
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    return nameWithoutExt === id;
  });

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(() => navigate(-1), 350);
  };

  return (
    <div className={`artworkOverlay ${visible ? "visible" : ""}`}>
      <div className="artworkBackdrop" onClick={close} />

      <ArtworkContent
        imageSrc={imageSrc}
        
        onClose={close}
      />
    </div>
  );
};

export default ArtworkPage;
