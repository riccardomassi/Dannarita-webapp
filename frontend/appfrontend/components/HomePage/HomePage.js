import Presentazione from "../Presentazione/Presentazione";
import PhotoHome from "../PhotoHome/PhotoHome";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Presentazione />
      <PhotoHome />
    </div>
  );
}  

export default HomePage;