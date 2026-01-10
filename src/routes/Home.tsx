import ScrollBox from "../components/ScrollBox";
import HomeInfo from "../components/HomeInfo";

const Home = () => {
  return (
    <>
      <div className="pageLeft">
        <HomeInfo />
      </div>

      <div className="pageRight">
        <ScrollBox />
      </div>
    </>
  );
};

export default Home;
