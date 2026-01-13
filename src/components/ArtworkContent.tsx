import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ArtworkContentProps {
  source: "artwork" | "photo";
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
  source,
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
  const [isPortrait, setIsPortrait] = useState(false);
  const [isTallImage, setIsTallImage] = useState(false);

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

  const displayDimension =
    source === "artwork" && dimension
      ? dimension.replace(/(\d+)\s*x\s*(\d+)/, "$1cm x $2cm")
      : dimension;

  useEffect(() => {
    const updateLayout = () => {
      setIsPortrait(isTallImage && window.innerWidth > 1000);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, [isTallImage]);

  return (
    <>
      <div className="artworkPanel">
        <div className={`artworkLayout ${isPortrait ? "portrait" : "landscape"}`}>
          <div className="artworkContainer">
            <div className="artworkScrollContent" ref={scrollRef}>
              <div className="portraitFlex">
                <div className="portraitContainer">
                  <div>
                    <div className="categoryText">
                      {source === "photo" ? "PHOTOGRAPHY" : "ARTWORK"}
                    </div>

                    <div className="artworkHeaderContainer">
                      <div className="pageTitle">{title}</div>
                      {(displayDimension || medium) && (
                        <div className="artworkMeta">
                          {displayDimension}
                          {displayDimension && medium && <br />}
                          {medium}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="artworkImageContainer">
                    <AnimatePresence mode="wait">
                      {imageSrc ? (
                        <motion.img
                          key={imageSrc}
                          src={imageSrc}
                          alt={title}
                          onLoad={(e) => {
                            const img = e.currentTarget;
                            setIsTallImage(
                              img.naturalHeight >= img.naturalWidth * 1.1
                            );
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="artworkImage"
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
                </div>

                <div className="artworkBottomPanel">
                  <button
                    className="prevButton"
                    onClick={handlePrev}
                    disabled={!onPrev}
                  >
                    ← PREVIOUS
                    {prevTitle && <div className="navTitle">{prevTitle}</div>}
                  </button>

                  <button
                    className="nextButton"
                    onClick={handleNext}
                    disabled={!onNext}
                  >
                    NEXT →
                    {nextTitle && <div className="navTitle">{nextTitle}</div>}
                  </button>
                </div>
              </div>
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
            className="fullscreenOverlay"
            onClick={() => setFullscreen(false)}
          >
            <motion.img
              src={imageSrc}
              alt={title}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fullscreenImg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArtworkContent;
