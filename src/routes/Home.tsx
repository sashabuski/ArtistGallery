import ScrollBox from "../components/ScrollBox";

const Home = () => {
  return (
    <>
   
   <div className="pageLeft">
   <div className = "ArtistName">Robert J. Domino</div>
   <div className = "subCaps">Painter & Illustrator - Caen, Normandy</div>
   <div className = "homeLinks">Paintings</div>
   <div className = "homeLinks">Drawings</div>
   <div className = "homeLinks">Sculptures</div>

    <div className = "bottomLinksBox">
    <div className = "bottomLink">Artist,</div>
    <div className = "bottomLink">Journal,</div>
    <div className = "bottomLink">About,</div>
    <div className = "bottomLink">Video,</div>
    <div className = "bottomLink">Archive,</div>
    <div className = "bottomLink">Contact</div>
    </div>
    <div className = "creditText">Copyright © 2026 R.J. Domino. Site by Sasha Buskin</div>
   </div>
    
    <div className="pageRight">
      <ScrollBox />
    </div>
    </>
  );
};

export default Home;