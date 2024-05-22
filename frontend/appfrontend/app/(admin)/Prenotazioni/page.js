import Prenotazioni from "@/components/Prenotazioni/Prenotazioni";
import Sidebar from "@/components/Sidebar/Sidebar";

const PrenotazioniPage = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Prenotazioni />
    </div>
  );
}

export default PrenotazioniPage;