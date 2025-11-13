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
    <main className="section-padding">
      <div className="container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800">
            <Image
              src={'/' + product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="text-sm text-[var(--accent)] font-medium mb-3 uppercase tracking-wide">
                Premium Quality
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {product.name}
              </h1>
              <p className="text-4xl font-semibold mb-8">
                ${product.price}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-lg text-[var(--secondary)] leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="btn-primary text-lg px-8 py-4 flex-1">
                  Add to Cart
                </button>
                <Link href="/products" className="btn-secondary text-lg px-8 py-4 text-center flex-1">
                  Browse More
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--border)]">
              <div className="text-center md:text-left">
                <div className="text-3xl mb-2">🌱</div>
                <p className="text-sm font-medium">100% Organic</p>
                <p className="text-xs text-[var(--secondary)]">Sustainable materials</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl mb-2">♻️</div>
                <p className="text-sm font-medium">Eco-Friendly</p>
                <p className="text-xs text-[var(--secondary)]">PVC-free inks</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl mb-2">✨</div>
                <p className="text-sm font-medium">Premium Quality</p>
                <p className="text-xs text-[var(--secondary)]">Crafted with care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}