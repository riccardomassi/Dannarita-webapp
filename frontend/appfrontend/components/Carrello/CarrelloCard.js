import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { Add, Remove, DeleteForever } from '@mui/icons-material';

const CarrelloCard = ({ product, reload, setReload }) => {
  const [quantita, setQuantita] = useState(product.quantita);

  const addQuantity = (productId, newQuantity) => {
    axiosInstance.put(`cart/update/${productId}/`)
      .then(response => {
        if (response.status === 200) {
          setQuantita(newQuantity);
          setReload(!reload)
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  const subQuantity = (productId, newQuantity) => {
    axiosInstance.delete(`cart/update/${productId}/`)
      .then(response => {
        if (response.status === 200) {
          setQuantita(newQuantity);
          setReload(!reload)
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  const handleIncrease = () => {
    if (quantita <= 5) {
      const newQuantity = quantita + 1;
      addQuantity(product.prodotto.id, newQuantity);
    }
  };

  const handleDecrease = () => {
    if (quantita >= 1) {
      const newQuantity = quantita - 1;
      subQuantity(product.prodotto.id, newQuantity);
    }
  };

  const handleRemove = () => {
    axiosInstance.delete(`cart/remove/${product.prodotto.id}/`)
      .then(response => {
        if (response.status === 200) {
          setReload(!reload)
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  return (
    <div className="rounded overflow-hidden shadow-lg bg-orange-100">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.prodotto.name}</div>
      </div>
      <div className="px-6 py-2 flex justify-between items-center">
        <span className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Price: {product.prodotto.price}
        </span>
        <div className="flex items-center">
          <button onClick={handleDecrease} className="bg-amber-200 rounded-full text-gray-700 mr-2">
            <div className='scale-75'>
              <Remove />
            </div>
          </button>
          <span className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Quantità: {quantita}
          </span>
          <button onClick={handleIncrease} className="bg-amber-200 rounded-full text-gray-700">
            <div className='scale-75'>
              <Add />
            </div>
          </button>
        </div>
        <button onClick={handleRemove} className="bg-red-500 rounded-full text-white">
          <div className='scale-75'>
            <DeleteForever />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CarrelloCard;
