import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtworkContent from "../components/ArtworkContent";
import artworks from "../data/artworks.json";

const imageModules = import.meta.glob("../assets/ARTWORK/*.{jpg,png,jpeg,svg}", { eager: true });
const imagesMap: Record<string, string> = {};
for (const path in imageModules) {
  const filename = path.split("/").pop()!;
  imagesMap[filename] = (imageModules[path] as any).default;
}

const ArtworkPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialIndex = artworks.findIndex(
    (art) => art.file.replace(/\.[^/.]+$/, "") === id
  );
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [visible, setVisible] = useState(false);

  const currentArtwork = artworks[currentIndex];
  const prevArtwork = artworks[currentIndex - 1];
  const nextArtwork = artworks[currentIndex + 1];
  const imageSrc = currentArtwork ? imagesMap[currentArtwork.file] : undefined;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (currentArtwork) {
      navigate(
        `/artwork/${currentArtwork.file.replace(/\.[^/.]+$/, "")}`,
        {
          replace: true, 
        }
      );
    }
  }, [currentIndex]);

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      onClose ? onClose() : navigate("/", { replace: true });
    }, 350);
  };

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const goToNext = () => {
    if (currentIndex < artworks.length - 1) setCurrentIndex((i) => i + 1);
  };

  return (
    <div className={`artworkOverlay ${visible ? "visible" : ""}`}>
      <div className="artworkBackdrop" onClick={close} />
      <ArtworkContent
        imageSrc={imageSrc}
        onClose={close}
        onPrev={prevArtwork ? goToPrev : undefined}
        onNext={nextArtwork ? goToNext : undefined}
        prevTitle={prevArtwork?.title}
        nextTitle={nextArtwork?.title}
        title={currentArtwork?.title}
        dimension={currentArtwork?.dimension}
        medium={currentArtwork?.medium}
      />
    </div>
  );
};

export default ArtworkPage;
