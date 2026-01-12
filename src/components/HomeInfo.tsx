import sign from "../assets/sign.png";
import { useNavigate } from "react-router-dom";

interface HomeInfoProps {
  currentGallery: "photo" | "artwork";
  setCurrentGallery: (gallery: "photo" | "artwork") => void;
}

const HomeInfo: React.FC<HomeInfoProps> = ({
  currentGallery,
  setCurrentGallery
}) => {
  const navigate = useNavigate();

  return (
    <>
      <img className="sign" src={sign} alt="Sign" />
      <div className="ArtistName">Robert J. Domino</div>
      <div className="subCaps">Painter & Illustrator - Caen, Normandy</div>

<span
  className="homeLinks"
  style={{ color: currentGallery === "artwork" ? "#9D8260" : "#000" }}
  onClick={() => setCurrentGallery("artwork")}
>
  Artwork
</span>
<span
  className="homeLinks"
  style={{ color: currentGallery === "photo" ? "#9D8260" : "#000" }}
  onClick={() => setCurrentGallery("photo")}
>
  Photography
</span>


      <div className="bottomLinksBox">
        <div className="bottomLink" onClick={() => navigate("/about")}>
          Artist,
        </div>
        <div className="bottomLink" onClick={() => navigate("/journal")}>
          Journal,
        </div>
        <div className="bottomLink" onClick={() => navigate("/about")}>
          About,
        </div>
        <div className="bottomLink" onClick={() => navigate("/video")}>
          Video,
        </div>
        <div className="bottomLink" onClick={() => navigate("/archive")}>
          Archive,
        </div>
        <div className="bottomLink" onClick={() => navigate("/contact")}>
          Contact
        </div>
      </div>
      <div className="creditText">
        Copyright © 2026 R.J. Domino. Site by Sasha Buskin.
      </div>
    </>
  );
};

export default HomeInfo;
