import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  // Find current artwork index
  const currentIndex = images.findIndex((src) => getIdFromSrc(src) === id);

  const imageSrc = currentIndex !== -1 ? images[currentIndex] : undefined;
  const prevImage = currentIndex > 0 ? images[currentIndex - 1] : undefined;
  const nextImage =
    currentIndex < images.length - 1 ? images[currentIndex + 1] : undefined;

  // Animate overlay fade/slide in **every time the artwork ID changes**
  useEffect(() => {
    setVisible(false); // hide immediately
    const frame = requestAnimationFrame(() => setVisible(true)); // fade/slide in
    return () => cancelAnimationFrame(frame);
  }, [id]);

  // Close overlay
  const close = () => {
    setVisible(false);
    setTimeout(() => navigate(-1), 350);
  };

  // Navigate to previous artwork
  const goToPrev = () => {
    if (!prevImage) return;
    const prevId = getIdFromSrc(prevImage);
    if (!prevId) return;

    navigate(`/artwork/${encodeURIComponent(prevId)}`, {
      state: { background: location.state?.background || location },
      replace: true,
    });
  };

  // Navigate to next artwork
  const goToNext = () => {
    if (!nextImage) return;
    const nextId = getIdFromSrc(nextImage);
    if (!nextId) return;

    navigate(`/artwork/${encodeURIComponent(nextId)}`, {
      state: { background: location.state?.background || location },
      replace: true,
    });
  };

  return (
    <div className={`artworkOverlay ${visible ? "visible" : ""}`}>
      {/* Backdrop clicks close overlay */}
      <div className="artworkBackdrop" onClick={close} />

      {/* Render the artwork content */}
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
