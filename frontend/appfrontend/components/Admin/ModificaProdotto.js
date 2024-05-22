'use client'
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Popup from "../Popup/Popup";

const ModificaProdotto = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
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

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find(p => p.id === parseInt(productId));
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
    });
  };

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

  const handleAggiornaProdotto = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    axiosInstance.put(`update/${selectedProduct.id}/`, formDataToSend)
      .then(response => {
        if (response.status === 200) {
          setShowPopup(true);
        }
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  }

  const onClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="h-screen w-full ml-72 flex flex-col items-center justify-center text-black bg-amber-50">
      <h1 className="text-3xl font-bold mb-4 mt-28">Modifica Prodotto</h1>
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
            />
          </div>
          <button
            onClick={handleAggiornaProdotto}
            className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
          >
            Aggiorna Prodotto
          </button>
        </div>
      )}
      {showPopup && (
        <Popup message="Prodotto aggiornato con successo!" onClose={onClose} />
      )}
    </div>
  );
}

export default ModificaProdotto;