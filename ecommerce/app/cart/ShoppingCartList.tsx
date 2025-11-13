'use client';

import { useState } from 'react';
import { Product } from '../product-data';
import Link from 'next/link';
import Image from 'next/image';

export default function ShoppingCartList({ initialCartProducts }: { initialCartProducts: Product[] }) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

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

  const subtotal = cartProducts.reduce((sum, product) => sum + product.price, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (cartProducts.length === 0) {
    return (
      <main className="section-padding">
        <div className="container-max mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Your cart is empty</h1>
            <p className="text-xl text-[var(--secondary)] mb-10">
              Start shopping to add items to your cart
            </p>
            <Link href="/products" className="btn-primary text-lg px-10 py-4 inline-block">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-padding">
      <div className="container-max mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map(product => (
              <div key={product.id} className="card-minimal">
                <div className="flex flex-col sm:flex-row gap-6 p-6">
                  <Link href={`/products/${product.id}`} className="flex-shrink-0">
                    <div className="relative w-full sm:w-32 h-32 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={'/' + product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-grow">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-2xl font-semibold mb-2 hover:text-[var(--accent)] smooth-transition">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[var(--secondary)] mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-semibold">${product.price}</p>
                      <button
                        className="text-sm text-red-500 hover:text-red-700 smooth-transition font-medium"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-minimal sticky top-24">
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold">Order Summary</h2>

                <div className="space-y-3 py-6 border-y border-[var(--border)]">
                  <div className="flex justify-between text-[var(--secondary)]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--secondary)]">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary w-full text-center block">
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="text-center block text-[var(--accent)] hover:opacity-70 smooth-transition font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}