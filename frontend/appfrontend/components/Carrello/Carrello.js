'use client';
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import CarrelloCard from "./CarrelloCard";
import Popup from "../Popup/Popup";

const Carrello = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fetchProducts = () => {
    axiosInstance.get('cart/')
      .then(response => {
        setProducts(response.data.prodotti);
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  const handlePrenotazione = () => {
    axiosInstance.post('reservation/')
      .then(response => {
        if (response.status === 201) {
          setReload(!reload);
          setShowPopup(true);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  const onClose = () => {
    setShowPopup(false);
  }

  return (
    <div className="w-full h-screen bg-amber-50 overflow-y-auto pt-28">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-10 p-4">
        {products.map(product => (
          <CarrelloCard key={product.prodotto.id} product={product} reload={reload} setReload={setReload} />
        ))}
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg flex justify-between items-center">
          <span className="text-lg font-bold text-amber-600">
            Totale: {products.reduce((total, product) => total + product.prodotto.price * product.quantita, 0).toFixed(2)} €
          </span>
          <button
            onClick={() => handlePrenotazione()}
            className="bg-amber-500 text-white py-2 px-4 rounded shadow-lg hover:bg-amber-600 transition duration-200"
          >
            Prenota
          </button>
        </div>
      </div>
      {showPopup &&
        <Popup
          message="Prenotazione effettuata con successo!"
          onClose={onClose}
        />
      }
    </div>
  );
};

export default Carrello;