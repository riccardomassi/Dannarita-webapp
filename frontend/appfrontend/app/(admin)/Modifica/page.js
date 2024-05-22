import Sidebar from "@/components/Sidebar/Sidebar";
import ModificaProdotto from "@/components/Admin/ModificaProdotto";

const ModificaPage = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <ModificaProdotto />
    </div>
  );
}

export default ModificaPage;