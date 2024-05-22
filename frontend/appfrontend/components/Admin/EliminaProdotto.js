'use client'
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Popup from "../Popup/Popup";

const EliminaProdotto = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopupConferma, setShowPopupConferma] = useState(false);
  const [showPopupEliminato, setShowPopupEliminato] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProducts = () => {
    axiosInstance.get('/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find(p => p.id === parseInt(productId));
    setSelectedProduct(product);
  };

  const onCloseConferma = () => {
    setShowPopupConferma(false);
  };

  const onCloseEliminato = () => {
    setShowPopupEliminato(false);
    setSelectedProduct(null);
  };

  const handleEliminaProdotto = () => {
    setShowPopupConferma(true);
    setMessage(`Sicuro di voler eliminare ${selectedProduct.name}?`);
  };

  const handleConfermaELiminaProdotto = () => {
    axiosInstance.delete(`delete/${selectedProduct.id}/`)
      .then(response => {
        if (response.status === 204) {
          setShowPopupEliminato(true);
          setShowPopupConferma(false);
          setMessage('Prodotto eliminato con successo!');
          fetchProducts();
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }

  return (
    <div className="h-screen w-full ml-72 flex flex-col items-center justify-center text-black bg-amber-50">
      <h1 className="text-3xl font-bold mb-4 mt-28">Elimina Prodotto</h1>
      <select
        className="border border-gray-300 rounded-md p-2 mb-4"
        onChange={handleProductChange}
        defaultValue=""
      >
        <option value="" disabled>Seleziona un prodotto</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <div className="border border-gray-300 rounded-md p-6 overflow-y-auto">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Nome</label>
            <div className="border border-gray-300 rounded-md p-2 w-full">{selectedProduct.name}</div>
            <button
              onClick={handleEliminaProdotto}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
            >
              Elimina
            </button>
          </div>
        </div>
      )}
      {/* Mostra POPUP per conferma eliminazione */
        showPopupConferma && (
          <Popup message={message} onClose={onCloseConferma} showConferma={true} handleConferma={handleConfermaELiminaProdotto} />
        )}
      {/* Mostra POPUP per avvenuta eliminazione */
        showPopupEliminato && (
          <Popup message={message} onClose={onCloseEliminato} />
        )}
    </div>
  );
}

export default EliminaProdotto;