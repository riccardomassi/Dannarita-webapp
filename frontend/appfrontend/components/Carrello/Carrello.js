'use client';
import { useState, useEffect, use } from "react";
import axiosInstance from "@/utils/axiosInstance";
import CarrelloCard from "./CarrelloCard";
import Popup from "../Popup/Popup";

const Carrello = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Fetch products on mount and reload
  useEffect(() => {
    fetchProducts();
  }, [reload]);

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
          setMessage('Prenotazione effettuata con successo!');
          setShowPopup(true);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
        if (error.response.status === 400) {
          console.log(error.response.data);
          setMessage(error.response.data[0]);
          setShowPopup(true);
        }
      });
  }

  const onClosePopup = () => {
    setShowPopup(false);
  }

  const onCloseDisclaimer = () => {
    setShowDisclaimer(false);
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
        {/* Dismissible Disclaimer */}
        {showDisclaimer && (
          <div className="relative p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800">
            Nota: Ogni utente può effettuare un massimo di 3 prenotazioni alla volta.
            <button
              onClick={onCloseDisclaimer}
              className="absolute top-0 right-0 mt-2 mr-2 bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full hover:bg-yellow-300"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      {showPopup &&
        <Popup
          message={message}
          onClose={onClosePopup}
        />
      }
    </div>
  );
};

export default Carrello;
