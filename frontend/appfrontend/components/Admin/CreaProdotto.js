'use client'
import { useState, useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Popup from "../Popup/Popup";

const CreaProdotto = () => {
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0]
    });
  };

  const handleCreaProdotto = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('price', formData.price);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    axiosInstance.post("create/", formDataToSend)
      .then(response => {
        if (response.status === 201) {
          setShowPopup(true);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }

  const onClose = () => {
    setShowPopup(false);
    setFormData({
      name: '',
      description: '',
      brand: '',
      price: '',
      image: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input value
    }
  };

  return (
    <div className="h-screen w-full ml-72 flex flex-col items-center justify-center text-black bg-amber-50">
      <h1 className="text-3xl font-bold mb-4 mt-28">Crea Prodotto</h1>

      <div className="border border-gray-300 rounded-md p-6 overflow-y-auto">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Nome</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Descrizione</label>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Brand</label>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Prezzo</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Immagine</label>
          <input
            className="border border-gray-300 rounded-md p-2 w-full"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <button
          onClick={handleCreaProdotto}
          className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
        >
          Crea Prodotto
        </button>
      </div>
      {showPopup && (
        <Popup message="Prodotto creato con successo!" onClose={onClose} />
      )}
    </div>
  );
}

export default CreaProdotto;