import ProductCard from "./Card";
import Banner from "../Banner/Banner";

const Prodotti = () => {
  const products = [
    {
      id: 1,
      name: "Piastra per capelli professionale",
      description: "Piastra per capelli professionale con tecnologia avanzata per risultati lisci e lucenti.",
      price: "$50",
      image: "/phon.jpg"
    },
    {
      id: 2,
      name: "Asciugacapelli professionale",
      description: "Asciugacapelli professionale con diverse impostazioni di calore e velocità per asciugature rapide e risultati impeccabili.",
      price: "$40",
      image: "/phon.jpg"
    },
    {
      id: 3,
      name: "Shampoo idratante",
      description: "Shampoo idratante arricchito con oli naturali per capelli sani e morbidi.",
      price: "$15",
      image: "/phon.jpg"
    },
    {
      id: 4,
      name: "Maschera per capelli riparatrice",
      description: "Maschera per capelli riparatrice arricchita con vitamine e proteine per riparare e rinvigorire i capelli danneggiati.",
      price: "$20",
      image: "/phon.jpg"
    },
    {
      id: 5,
      name: "Piastra per capelli professionale",
      description: "Piastra per capelli professionale con tecnologia avanzata per risultati lisci e lucenti.",
      price: "$50",
      image: "/phon.jpg"
    },
    {
      id: 6,
      name: "Asciugacapelli professionale",
      description: "Asciugacapelli professionale con diverse impostazioni di calore e velocità per asciugature rapide e risultati impeccabili.",
      price: "$40",
      image: "/phon.jpg"
    },
    {
      id: 7,
      name: "Shampoo idratante",
      description: "Shampoo idratante arricchito con oli naturali per capelli sani e morbidi.",
      price: "$15",
      image: "/phon.jpg"
    },
    {
      id: 8,
      name: "Maschera per capelli riparatrice",
      description: "Maschera per capelli riparatrice arricchita con vitamine e proteine per riparare e rinvigorire i capelli danneggiati.",
      price: "$20",
      image: "/phon.jpg"
    }
  ];

  return (
    <div className="w-full h-screen bg-amber-50 overflow-y-auto">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Banner />
    </div>
  );
};

export default Prodotti;