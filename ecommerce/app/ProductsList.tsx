'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "./product-data";

export default function ProductsList({ products, initialCartProducts = [] }: { products: Product[], initialCartProducts: Product[] }) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  async function addToCart(productId: string) {
    setLoadingStates(prev => ({ ...prev, [productId]: true }));
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
        method: 'POST',
        body: JSON.stringify({
          productId,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const updatedCartProducts = await response.json();
      setCartProducts(updatedCartProducts);
    } finally {
      setLoadingStates(prev => ({ ...prev, [productId]: false }));
    }
  }

  async function removeFromCart(productId: string) {
    setLoadingStates(prev => ({ ...prev, [productId]: true }));
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
        method: 'DELETE',
        body: JSON.stringify({
          productId,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const updatedCartProducts = await response.json();
      setCartProducts(updatedCartProducts);
    } finally {
      setLoadingStates(prev => ({ ...prev, [productId]: false }));
    }
  }

  function productIsInCart(productId: string) {
    return cartProducts.some(cp => cp.id === productId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {products.map(product => (
        <div
          key={product.id}
          className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
        >
          <Link href={`/products/${product.id}`}>
            <div className="relative h-56 overflow-hidden bg-gray-100">
              <Image
                src={'/' + product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          <div className="p-5">
            <Link href={`/products/${product.id}`}>
              <h2 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                {product.name}
              </h2>
            </Link>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-indigo-600">${product.price}</p>
              <div className="flex items-center space-x-1 text-yellow-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-sm text-gray-600">4.5</span>
              </div>
            </div>

            {productIsInCart(product.id) ? (
              <button
                disabled={loadingStates[product.id]}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCart(product.id);
                }}
              >
                {loadingStates[product.id] ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>In Cart</span>
                  </>
                )}
              </button>
            ) : (
              <button
                disabled={loadingStates[product.id]}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product.id);
                }}
              >
                {loadingStates[product.id] ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}