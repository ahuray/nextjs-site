import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <main className="section-padding min-h-[70vh] flex items-center">
      <div className="container-max mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Checkout Coming Soon</h1>
          <p className="text-xl text-[var(--secondary)] mb-10">
            We're working hard to bring you a seamless checkout experience.
            Stay tuned for updates!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary text-lg px-10 py-4">
              Continue Shopping
            </Link>
            <Link href="/cart" className="btn-secondary text-lg px-10 py-4">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}