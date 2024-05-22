import Sidebar from "@/components/Sidebar/Sidebar";
import EliminaProdotto from "@/components/Admin/EliminaProdotto";

const EliminaPage = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <EliminaProdotto />
    </div>
  );
}

export default EliminaPage;