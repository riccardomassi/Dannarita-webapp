'use client';
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Banner from "../Banner/Banner";
import axiosInstance from "@/utils/axiosInstance";

const Prodotti = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="w-full h-screen bg-amber-50 overflow-y-auto pt-28">
      <div className="max-w-screen-xl mx-auto justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Banner />
    </div>
  );
};

export default Prodotti;