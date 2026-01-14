import { useState } from "react";
import ScrollBox from "../components/ScrollBox";
import HomeInfo from "../components/HomeInfo";

const photoRowPresets: Record<number, number[]> = {
  6: [10, 4, 5, 8, 6, 7],
  5: [12, 6, 7, 5, 10],
  4: [17, 5, 10, 8],
  3: [18, 12, 10],
  2: [25, 15],
  1: [40]
};

const artworkRowPresets: Record<number, number[]> = {
  6: [14, 9, 18, 5, 7, 17],
  5: [13, 8, 25, 14, 10],
  4: [26, 9, 21, 14],
  3: [32, 15, 23],
  2: [25, 45],
  1: [70]
};

const Home = () => {
  const [currentGallery, setCurrentGallery] = useState<"photo" | "artwork">("artwork");

  const currentRowPresets =
    currentGallery === "photo" ? photoRowPresets : artworkRowPresets;

  const handleGalleryChange = (gallery: "photo" | "artwork") => {
    if (gallery === currentGallery) return;
    setCurrentGallery(gallery);
  };

  return (
    <>
      <div className="pageLeft">
        <HomeInfo
          currentGallery={currentGallery}
          setCurrentGallery={handleGalleryChange}
        />
      </div>

      <div className="pageRight">
        <ScrollBox
          key={currentGallery}
          source={currentGallery}
          rowPresets={currentRowPresets}
        />
      </div>
    </>
  );
};

export default Home;
