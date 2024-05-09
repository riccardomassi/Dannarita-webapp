import React from 'react';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  return (
    <div className="h-[600px] w-[400px] mt-28 rounded overflow-hidden shadow-lg bg-orange-100">
      <div className="relative h-96 m-2">
        <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 py-2 flex justify-between">
        <span className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Price: {product.price}</span>
        <button className="inline-block bg-orange-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
