interface ArtworkContentProps {
  imageSrc?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const ArtworkContent: React.FC<ArtworkContentProps> = ({
  imageSrc,
  onClose,
  onNext,
  onPrev,
}) => {
  let title = "Untitled";
  let dimension = "";
  let medium = "";

  if (imageSrc) {
    const filename = decodeURIComponent(imageSrc.split("/").pop() || "");
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const parts = nameWithoutExt.split("_");
    title = parts[0] || "Untitled";
    dimension = parts[1] || "";
    medium = parts[2] || "";
  }

  return (
    <div className="artworkPanel">
      <button className="closeButton" onClick={onClose}>
        ×
      </button>

      <div className="artworkContainer">
        {/* Header */}
       
       <div className = "artworkScrollContent">
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

        {/* Image */}
        {imageSrc ? <img src={imageSrc} alt={title} /> : <p>Artwork not found</p>}

        {/* Bottom Panel */}
        <div className="artworkBottomPanel">
          <button className="prevButton" onClick={onPrev}>
            ← Previous
          </button>
          <button className="nextButton" onClick={onNext}>
            Next →
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkContent;
