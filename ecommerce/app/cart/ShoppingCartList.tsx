'use client';

import { useState } from 'react';
import { Product } from '../product-data';
import Link from 'next/link';
import Image from 'next/image';

export default function ShoppingCartList({ initialCartProducts }: { initialCartProducts: Product[] }) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

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

  const total = cartProducts.reduce((sum, product) => sum + parseFloat(product.price), 0);

  if (cartProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-lg p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                    {/* Product Image */}
                    <Link href={`/products/${product.id}`} className="flex-shrink-0">
                      <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={'/' + product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-2xl font-bold text-indigo-600 mb-4">
                          ${product.price}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          disabled={loadingStates[product.id]}
                          onClick={() => removeFromCart(product.id)}
                          className="flex items-center justify-center space-x-2 px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingStates[product.id] ? (
                            <>
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Removing...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Remove</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                  <span>Total</span>
                  <span className="text-indigo-600">${(total * 1.1).toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg text-center"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="block w-full text-center text-indigo-600 hover:text-indigo-800 font-medium py-3 mt-3 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}