'use client'
import { useAuth } from "@/components/AuthContext/AuthContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import CreaProdotto from "@/components/Admin/CreaProdotto";

const CreaPage = () => {
  const { isSuperuser } = useAuth();
  return (
    <div className="flex flex-row">
      <Sidebar isSuperuser={isSuperuser} />
      <CreaProdotto />
    </div>
  );
}

export default CreaPage;