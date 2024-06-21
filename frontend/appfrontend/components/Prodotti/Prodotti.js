'use client';
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Banner from "../Banner/Banner";
import axiosInstance from "@/utils/axiosInstance";

const Prodotti = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // Stato per gestire l'ordinamento

  const fetchProducts = () => {
    axiosInstance.get('/')
      .then(response => {
        let sortedProducts = response.data;
        if (sortOrder === "asc") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else {
          sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]); // Rifetch quando l'ordinamento cambia

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="w-full h-screen bg-amber-50 overflow-y-auto pt-28">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-end mb-4 text-black">
          <label htmlFor="sort" className="mr-2">Prezzo:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="border rounded p-2"
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </div>
        <div className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Banner />
    </div>
  );
};

export default Prodotti;
