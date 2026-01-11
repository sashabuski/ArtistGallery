import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ArtworkContentProps {
  imageSrc?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  prevTitle?: string;
  nextTitle?: string;
}

const ArtworkContent: React.FC<ArtworkContentProps> = ({
  imageSrc,  
  onNext,
  onPrev,
  prevTitle,
  nextTitle,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  // Scroll to top when navigating
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    scrollToTop();
    onNext?.();
  };

  const handlePrev = () => {
    scrollToTop();
    onPrev?.();
  };

  // Extract artwork metadata from filename
  let title = "Untitled";
  let dimension = "";
  let medium = "";

  if (imageSrc) {
 const filename = decodeURIComponent(imageSrc.split("/").pop() || "");

    let nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

    nameWithoutExt = nameWithoutExt.replace(/-[A-Za-z0-9]{8,}$/, "");

    const parts = nameWithoutExt.split("_");
    title = parts[0] || "Untitled";
    dimension = parts[1] || "";
    medium = parts[2] || "";

    if (dimension) {
    dimension = dimension.replace(/(\d+)/g, '$1"');
    }
  }

  return (
    <>
      {/* Main artwork panel */}
      <div className="artworkPanel">
        <div className="artworkContainer">
          <div className="artworkScrollContent" ref={scrollRef}>
            
            {/* Header */}
            <div className="artworkHeaderContainer">
              <div className="artworkPageTitle">{title}</div>
              {(dimension || medium) && (
                <div className="artworkMeta">
                  {dimension}
                  {dimension && medium && <br />}
                  {medium}
                </div>
              )}
            </div>

            {/* Image with crossfade */}
            <div
              className="artworkImageContainer"
              style={{ position: "relative", width: "100%", minHeight: "400px" }}
            >
              <AnimatePresence mode="wait">
                {imageSrc ? (
                  <motion.img
                    key={imageSrc} 
                    src={imageSrc}
                    alt={title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in" }}
                    onClick={() => setFullscreen(true)}
                  />
                ) : (
                  <motion.p
                    key="not-found"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Artwork not found
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Panel */}
            <div className="artworkBottomPanel">
              <button className="prevButton" onClick={handlePrev} disabled={!onPrev}>
                ← PREVIOUS
                {prevTitle && <div className="navTitle">{prevTitle}</div>}
              </button>

              <button className="nextButton" onClick={handleNext} disabled={!onNext}>
                NEXT →
                {nextTitle && <div className="navTitle">{nextTitle}</div>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay — outside .artworkPanel for true full-screen */}
      <AnimatePresence>
        {fullscreen && imageSrc && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              cursor: "zoom-out",
            }}
            onClick={() => setFullscreen(false)}
          >
            <motion.img
              src={imageSrc}
              alt={title}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{
                width: "100vw",
                height: "100vh",
                objectFit: "contain",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArtworkContent;
