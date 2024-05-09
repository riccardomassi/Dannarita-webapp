import Presentazione from "../Presentazione/Presentazione";
import PhotoHome from "../PhotoHome/PhotoHome";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Presentazione />
      <PhotoHome />
    </div>
  );
}  

export default Home;