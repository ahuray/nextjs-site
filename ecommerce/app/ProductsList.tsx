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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="product-card"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <Link href={`/products/${product.id}`} className="block">
            <div className="product-card-image">
              <Image
                src={'/' + product.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 smooth-transition-slow"
              />
            </div>
            <div className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-[var(--accent)] smooth-transition">
                {product.name}
              </h2>
              <p className="text-[var(--secondary)] text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                {product.description}
              </p>
              <p className="text-lg md:text-xl font-semibold mb-4">${product.price}</p>
            </div>
          </Link>

          {productIsInCart(product.id) ? (
            <div className="px-4 md:px-6 pb-4 md:pb-6">
              <button
                className="w-full bg-gray-100 dark:bg-gray-800 text-[var(--foreground)] px-6 py-2.5 md:py-3 rounded-full font-medium smooth-transition hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCart(product.id);
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>✓</span>
                  <span>In Cart</span>
                </span>
              </button>
            </div>
          ) : (
            <div className="px-4 md:px-6 pb-4 md:pb-6">
              <button
                className="btn-primary w-full text-sm md:text-base"
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