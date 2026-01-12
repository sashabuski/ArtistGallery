import sign from "../assets/sign.png";
import { useNavigate } from "react-router-dom";
const HomeInfo = () => {

    const navigate = useNavigate();
  return (
    <>
      <img className="sign" src={sign} alt="Sign" />
      <div className="ArtistName">Robert J. Domino</div>
      <div className="subCaps">Painter & Illustrator - Caen, Normandy</div>
    
<span className="homeLinks" onClick={() => navigate("/about")}>Paintings</span>
<span className="homeLinks">Drawings</span>
<span className="homeLinks">Sculptures</span>



      <div className="bottomLinksBox">
         <div className="bottomLink" onClick={() => navigate("/about")}>Artist,</div>
        <div className="bottomLink" onClick={() => navigate("/journal")}>Journal,</div>
        <div className="bottomLink" onClick={() => navigate("/about")}>About,</div>
        <div className="bottomLink" onClick={() => navigate("/video")}>Video,</div>
        <div className="bottomLink" onClick={() => navigate("/archive")}>Archive,</div>
        <div className="bottomLink" onClick={() => navigate("/contact")}>Contact</div>
      </div>
      <div className="creditText">
        Copyright © 2026 R.J. Domino. Site by Sasha Buskin.
      </div>
    </>
  );
};

export default HomeInfo;
