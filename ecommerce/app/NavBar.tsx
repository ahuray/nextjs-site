'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
        scrolled
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-sm'
          : 'bg-white/80 dark:bg-black/80 backdrop-blur-xl'
      } border-b border-[var(--border)]`}>
        <div className="container-max mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group z-50">
              <div className="text-xl md:text-2xl font-semibold tracking-tight smooth-transition group-hover:opacity-70">
                <span className="text-[var(--foreground)]">Big Star</span>
                <span className="text-[var(--accent)] ml-1">Collectibles</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/products"
                className={`text-sm font-medium smooth-transition hover:text-[var(--accent)] relative py-2 ${
                  isActive('/products') ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
                }`}
              >
                Products
                {isActive('/products') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full" />
                )}
              </Link>
              <Link
                href="/cart"
                className={`text-sm font-medium smooth-transition hover:text-[var(--accent)] relative py-2 ${
                  isActive('/cart') ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
                }`}
              >
                Cart
                {isActive('/cart') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full" />
                )}
              </Link>
              <Link
                href="/checkout"
                className="btn-primary text-sm px-6 py-2.5"
              >
                Checkout
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-[var(--foreground)] z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current smooth-transition origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} />
                <span className={`w-full h-0.5 bg-current smooth-transition ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`w-full h-0.5 bg-current smooth-transition origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden smooth-transition ${
        isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute top-16 right-0 bottom-0 w-full sm:w-80 bg-white dark:bg-black smooth-transition transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="flex flex-col p-8 space-y-6">
            <Link
              href="/products"
              className={`text-2xl font-semibold smooth-transition hover:text-[var(--accent)] ${
                isActive('/products') ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
              }`}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className={`text-2xl font-semibold smooth-transition hover:text-[var(--accent)] ${
                isActive('/cart') ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
              }`}
            >
              Cart
            </Link>
            <Link
              href="/checkout"
              className="btn-primary text-lg px-8 py-4 text-center mt-4"
            >
              Checkout
            </Link>
          </nav>
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16 md:h-20" />
    </>
  )
}