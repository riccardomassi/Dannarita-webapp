import Carrello from "@/components/Carrello/Carrello"; 
import CheckAuth from "@/components/CheckAuth/CheckAuth"; 

const CarrelloPage = () => {
  return (
  <div>
    <CheckAuth>
      <Carrello />
    </CheckAuth>
  </div>
  );
}

export default CarrelloPage;