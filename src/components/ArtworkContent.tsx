import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ArtworkContentProps {
  imageSrc?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  prevTitle?: string;
  nextTitle?: string;
  title?: string;
  dimension?: string;
  medium?: string;
}

const ArtworkContent: React.FC<ArtworkContentProps> = ({
  imageSrc,
  onNext,
  onPrev,
  prevTitle,
  nextTitle,
  title = "Untitled",
  dimension = "",
  medium = "",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    scrollToTop();
    onNext?.();
  };

  const handlePrev = () => {
    scrollToTop();
    onPrev?.();
  };

  return (
    <>
      <div className="artworkPanel">
        <div className="artworkContainer">
          <div className="artworkScrollContent" ref={scrollRef}>
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

            <div
              className="artworkImageContainer"
              style={{ position: "relative", width: "100%", minHeight: 400 }}
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
                    transition={{ duration: 0.2 }}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      cursor: "zoom-in",
                    }}
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
              style={{ width: "100vw", height: "100vh", objectFit: "contain" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArtworkContent;
