import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArtworkContent from "../components/ArtworkContent";

import artworks from "../data/artworks.json";
import photos from "../data/photos.json";

// STATIC IMPORTS (Vite requires static imports)
const artworkModules = import.meta.glob("../assets/ARTWORK/*.{jpg,png,jpeg,svg}", { eager: true });
const photoModules = import.meta.glob("../assets/PHOTOS/*.{jpg,png,jpeg,svg}", { eager: true });

const buildImageMap = (modules: Record<string, any>) => {
  const map: Record<string, string> = {};
  Object.entries(modules).forEach(([path, mod]) => {
    const filename = path.split("/").pop();
    if (filename) map[filename] = (mod as any).default;
  });
  return map;
};

const artworkImages = buildImageMap(artworkModules);
const photoImages = buildImageMap(photoModules);

interface ArtworkPageProps {
  onClose?: () => void;
  source?: "artwork" | "photo"; // optional prop, default to artwork
}

const ArtworkPage: React.FC<ArtworkPageProps> = ({ onClose, source = "artwork" }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Select data & images based on source
  const data = source === "artwork" ? artworks : photos;
  const imagesMap = source === "artwork" ? artworkImages : photoImages;
  const basePath = source; // for navigate path

  // find initial index based on id from URL
  const initialIndex = data.findIndex(
    (item) => item.file.replace(/\.[^/.]+$/, "") === id
  );

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [visible, setVisible] = useState(false);

  const currentItem = data[currentIndex];
  const prevItem = data[currentIndex - 1];
  const nextItem = data[currentIndex + 1];
  const imageSrc = currentItem ? imagesMap[currentItem.file] : undefined;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // update URL when current item changes
  useEffect(() => {
    if (currentItem) {
      navigate(
        `/${basePath}/${currentItem.file.replace(/\.[^/.]+$/, "")}`,
        { replace: true }
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
    if (currentIndex < data.length - 1) setCurrentIndex((i) => i + 1);
  };

  return (
    <div className={`artworkOverlay ${visible ? "visible" : ""}`}>
      <div className="artworkBackdrop" onClick={close} />
      <ArtworkContent
        source={source} 
        imageSrc={imageSrc}
        onClose={close}
        onPrev={prevItem ? goToPrev : undefined}
        onNext={nextItem ? goToNext : undefined}
        prevTitle={prevItem?.title}
        nextTitle={nextItem?.title}
        title={currentItem?.title}
        dimension={currentItem?.dimension}
        medium={currentItem?.medium}
      />
    </div>
  );
};

export default ArtworkPage;
