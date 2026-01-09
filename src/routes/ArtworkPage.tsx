import { useParams } from "react-router-dom";

const ArtworkPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Artwork {id}</h1>
      {/* load image + metadata here */}
    </div>
  );
};

export default ArtworkPage;