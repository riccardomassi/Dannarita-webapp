'use client';
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import CarrelloCard from "./CarrelloCard";

const Carrello = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

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
    // Creazione dell'array dei prodotti prenotati da inviare al server
    const prodottiPrenotati = products.map(product => ({
      prodotto_id: product.prodotto.id,  
      quantita: product.quantita 
    }));

    // Creazione dei dati da inviare nella richiesta POST
    const prenotazioneData = {
      prodotti: prodottiPrenotati
    };

    axiosInstance.post('cart/reservation/', null, {
      body : {  
        data: prenotazioneData
      },
    })
      .then(response => {
        if (response.status === 201) {
          setReload(!reload);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  return (
    <div className="w-full h-screen bg-amber-50 overflow-y-auto ">
      <div className="max-w-screen-xl mx-auto flex flex-col mt-28 gap-10 p-4">
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
    </div>
  );
};

export default Carrello;