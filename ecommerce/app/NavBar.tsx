'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-white rounded-lg p-2 group-hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li>
              <Link
                href="/products"
                className="text-white hover:text-indigo-200 font-medium transition-colors duration-200 hover:scale-105 inline-block"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="relative text-white hover:text-indigo-200 font-medium transition-colors duration-200 flex items-center space-x-1 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-6 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Checkout
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none hover:bg-white/10 p-2 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/20">
            <Link
              href="/products"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              href="/checkout"
              className="block bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}