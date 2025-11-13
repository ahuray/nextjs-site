'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "./product-data";

export default function ProductsList({ products, initialCartProducts = [] }: { products: Product[], initialCartProducts: Product[] }) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts)

  async function addToCart(productId: string) {
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
  }

  async function removeFromCart(productId: string) {
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
  }

  function productIsInCart(productId: string) {
    return cartProducts.some(cp => cp.id === productId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="card-minimal group">
          <Link href={`/products/${product.id}`} className="block">
            <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={'/' + product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 smooth-transition"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent)] smooth-transition">
                {product.name}
              </h2>
              <p className="text-[var(--secondary)] text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg font-medium mb-4">${product.price}</p>
            </div>
          </Link>

          {productIsInCart(product.id) ? (
            <div className="px-6 pb-6">
              <button
                className="w-full bg-gray-200 dark:bg-gray-700 text-[var(--foreground)] px-6 py-3 rounded-full font-medium smooth-transition hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCart(product.id);
                }}
              >
                Remove from Cart
              </button>
            </div>
          ) : (
            <div className="px-6 pb-6">
              <button
                className="btn-primary w-full"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product.id);
                }}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}