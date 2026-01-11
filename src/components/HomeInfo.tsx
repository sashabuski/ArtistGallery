import sign from "../assets/sign.png";

const HomeInfo = () => {
  return (
    <>
      <img className="sign" src={sign} alt="Sign" />
      <div className="ArtistName">Robert J. Domino</div>
      <div className="subCaps">Painter & Illustrator - Caen, Normandy</div>
      <span className="homeLinks">Paintings</span>
      <span className="homeLinks">Drawings</span>
      <span className="homeLinks">Sculptures</span>

      <div className="bottomLinksBox">
        <div className="bottomLink">Artist,</div>
        <div className="bottomLink">Journal,</div>
        <div className="bottomLink">About,</div>
        <div className="bottomLink">Video,</div>
        <div className="bottomLink">Archive,</div>
        <div className="bottomLink">Contact</div>
      </div>
      <div className="creditText">
        Copyright © 2026 R.J. Domino. Site by Sasha Buskin.
      </div>
    </>
  );
};

export default HomeInfo;
