'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="container-max mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-semibold tracking-tight smooth-transition group-hover:opacity-70">
              <span className="text-[var(--foreground)]">Big Star</span>
              <span className="text-[var(--accent)] ml-1">Collectibles</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/products"
              className={`text-sm font-medium smooth-transition hover:text-[var(--accent)] ${
                isActive('/products') ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
              }`}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className={`text-sm font-medium smooth-transition hover:text-[var(--accent)] ${
                isActive('/cart') ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
              }`}
            >
              Cart
            </Link>
            <Link
              href="/checkout"
              className="btn-primary text-sm px-5 py-2"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}