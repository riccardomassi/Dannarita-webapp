import Carrello from "@/components/Carrello/Carrello"; 
import { AuthProvider } from "@/components/AuthContext/AuthContext"; 

const CarrelloPage = () => {
  return (
  <div>
    <AuthProvider>
      <Carrello />
    </AuthProvider>
  </div>
  );
}

export default CarrelloPage;