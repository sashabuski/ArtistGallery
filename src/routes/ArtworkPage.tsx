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

// Helpers to extract ID and title
const getIdFromSrc = (src?: string) => {
  if (!src) return undefined;
  const filename = decodeURIComponent(src.split("/").pop() || "");
  return filename.replace(/\.[^/.]+$/, "");
};

const getTitleFromSrc = (src?: string) => {
  const id = getIdFromSrc(src);
  return id ? id.split("_")[0] : undefined;
};

const ArtworkPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 👇 Index is now STATE (not route-driven)
  const [currentIndex, setCurrentIndex] = useState(() =>
    images.findIndex((src) => getIdFromSrc(src) === id)
  );

  const [visible, setVisible] = useState(false);

  const imageSrc = images[currentIndex];
  const prevImage = images[currentIndex - 1];
  const nextImage = images[currentIndex + 1];

  // Animate overlay only once on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Close overlay (real navigation)
  const close = () => {
    setVisible(false);
    setTimeout(() => navigate(-1), 350);
  };

  // Prev / Next — NO ROUTING
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div className={`artworkOverlay ${visible ? "visible" : ""}`}>
      {/* Backdrop clicks close overlay */}
      <div className="artworkBackdrop" onClick={close} />

      <ArtworkContent
        imageSrc={imageSrc}
        onClose={close}
        onPrev={prevImage ? goToPrev : undefined}
        onNext={nextImage ? goToNext : undefined}
        prevTitle={getTitleFromSrc(prevImage)}
        nextTitle={getTitleFromSrc(nextImage)}
      />
    </div>
  );
};

export default ArtworkPage;
