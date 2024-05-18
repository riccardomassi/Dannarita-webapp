import Prenotazioni from "@/components/Prenotazioni/Prenotazioni";
import CheckAuth from "@/components/CheckAuth/CheckAuth";

const PrenotazioniPage = () => {
  return (
    <div>
      <CheckAuth>
        <Prenotazioni />
      </CheckAuth>
    </div>
  );
}

export default PrenotazioniPage;