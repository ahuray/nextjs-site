import NotFoundPage from "@/app/not-found";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products/' + params.id);
  const product = await response.json();

  if (!product) {
    return <NotFoundPage/>
  }

  return (
    <main className="section-padding animate-fade-in">
      <div className="container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <Image
              src={'/' + product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <div className="animate-slide-up">
              <p className="text-xs md:text-sm text-[var(--accent)] font-semibold mb-2 md:mb-3 uppercase tracking-wider">
                Premium Quality
              </p>
              <h1 className="heading-xl mb-4 md:mb-6">
                {product.name}
              </h1>
              <p className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                ${product.price}
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="heading-md mb-3 md:mb-4">Description</h2>
                <p className="body-md text-[var(--secondary)]">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                <button className="btn-primary text-base md:text-lg px-8 py-3.5 md:py-4 flex-1 shadow-lg">
                  Add to Cart
                </button>
                <Link href="/products" className="btn-secondary text-base md:text-lg px-8 py-3.5 md:py-4 text-center flex-1">
                  Browse More
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-[var(--border)]">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2">🌱</div>
                <p className="text-xs md:text-sm font-semibold mb-1">100% Organic</p>
                <p className="text-[10px] md:text-xs text-[var(--secondary)]">Sustainable</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2">♻️</div>
                <p className="text-xs md:text-sm font-semibold mb-1">Eco-Friendly</p>
                <p className="text-[10px] md:text-xs text-[var(--secondary)]">PVC-free</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-2">✨</div>
                <p className="text-xs md:text-sm font-semibold mb-1">Premium</p>
                <p className="text-[10px] md:text-xs text-[var(--secondary)]">Crafted well</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}