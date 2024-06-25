import PresentazioneHome from "../PresentazioneHome/PresentazioneHome";
import PhotoHome from "../PhotoHome/PhotoHome";

const Home = () => {
  return (
    <div className="flex flex-col">
      <PresentazioneHome />
      <PhotoHome />
    </div>
  );
}  

export default Home;