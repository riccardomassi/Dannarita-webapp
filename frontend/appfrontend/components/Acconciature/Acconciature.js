import PresentazioneAcconciature from "../PresentazioneAcconciature/PresentazioneAcconciature";
import Servizi from "../Servizi/Servizi";

const Acconciature = () => {
  return (
    <div className="flex flex-col">
      <PresentazioneAcconciature />
      <Servizi />
    </div>
  );
}

export default Acconciature;