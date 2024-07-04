'use client';
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Banner from "../Banner/Banner";
import axiosInstance from "@/utils/axiosInstance";

const Prodotti = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);

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
        setFilteredProducts(sortedProducts);
        
        /**
         * To get unique brands from the array of brand names, 
         * use the Set object, which automatically removes duplicate values. 
         * Convert the Set back to an array using the spread operator (...)
         */
        const uniqueBrands = [...new Set(sortedProducts.map(product => product.brand))];
        setBrands(uniqueBrands);
      })
      .catch(error => {
        console.error('Errore durante la chiamata API:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder]);

  useEffect(() => {
    filterProductsByBrand();
  }, [selectedBrand]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const filterProductsByBrand = () => {
    if (selectedBrand) {
      setFilteredProducts(products.filter(product => product.brand === selectedBrand));
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="w-full h-screen bg-amber-50 overflow-y-auto pt-28">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4 text-black">
          <div>
            <label htmlFor="brand" className="mr-2">Marca:</label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={handleBrandChange}
              className="border rounded p-2"
            >
              <option value="">Tutte</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div>
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
        </div>
        <div className="justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Banner />
    </div>
  );
};

export default Prodotti;
