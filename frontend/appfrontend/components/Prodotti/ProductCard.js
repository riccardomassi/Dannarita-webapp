import React, { useState } from 'react';
import Image from 'next/image';
import axiosInstance from '@/utils/axiosInstance';
import Popup from '../Popup/Popup';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const noImage = '/no-image.jpg'; // Fallback image
  const router = useRouter();

  const addToCart = (productID) => {
    axiosInstance.get('user/')
      .then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          axiosInstance.put(`cart/update/${productID}/`)
            .then(response => {
              if (response.status === 200) {
                setPopupMessage('Prodotto aggiunto al carrello!');
                setShowPopup(true);
              }
            })
            .catch(error => {
              console.error('Errore durante la chiamata API:', error);
              if (error.response.status === 400) {
                setPopupMessage(error.response.data['error']);
              } else {
                setPopupMessage('Errore durante l\'aggiunta del prodotto al carrello.');
              }
              setShowPopup(true);
            });
        } else {
          setIsLoggedIn(false);
          setPopupMessage('Devi eseguire il LOGIN prima!');
          setShowPopup(true);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
        setIsLoggedIn(false);
        setPopupMessage('Devi eseguire il LOGIN prima!');
        setShowPopup(true);
      });
  };

  const onClose = () => {
    setShowPopup(false);
    if (!isLoggedIn) {
      router.push('/Login');
    }
  };

  return (
    <div className="h-[710px] w-[400px] rounded overflow-hidden shadow-lg bg-orange-100">
      <div className="relative h-96 m-2">
        <Image src={product.image ? product.image : noImage} alt={product.name} layout="fill" objectFit="cover" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 py-2 flex justify-between">
        <span className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Price: {product.price} €
        </span>
        <button
          onClick={() => addToCart(product.id)}
          className="inline-block bg-orange-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >
          Aggiungi
        </button>
      </div>
      {showPopup &&
        <Popup
          message={popupMessage}
          onClose={onClose}
        />
      }
    </div>
  );
};

export default ProductCard;
