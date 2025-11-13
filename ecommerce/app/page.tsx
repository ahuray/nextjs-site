import Image from "next/image";
import Link from "next/link";
import { products } from "./product-data";

export default function Home() {
  // Featured products (first 3)
  const featuredProducts = products.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container-max mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
            Crafted with Care.
            <br />
            <span className="text-[var(--accent)]">Designed for You.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--secondary)] mb-12 max-w-3xl mx-auto text-balance">
            Premium, eco-friendly collectibles made from 100% organic materials.
            Sustainably sourced. Thoughtfully designed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products" className="btn-primary text-lg px-8 py-4">
              Shop Collection
            </Link>
            <Link href="/products" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding">
        <div className="container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collection</h2>
            <p className="text-lg text-[var(--secondary)] max-w-2xl mx-auto">
              Discover our handpicked selection of premium merchandise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="card-minimal group"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={`/${product.imageUrl}`}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-[var(--accent)] smooth-transition">
                    {product.name}
                  </h3>
                  <p className="text-[var(--secondary)] mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-medium">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-secondary px-8 py-3 inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold mb-3">100% Organic</h3>
              <p className="text-[var(--secondary)]">
                All materials sourced from certified organic cotton cooperatives
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-2xl font-semibold mb-3">Eco-Friendly</h3>
              <p className="text-[var(--secondary)]">
                PVC and phthalate-free inks used in all our screen printing
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-[var(--secondary)]">
                Carefully crafted with attention to every detail for lasting quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to start your collection?
          </h2>
          <p className="text-xl text-[var(--secondary)] mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Big Star Collectibles
            for premium, sustainable merchandise.
          </p>
          <Link href="/products" className="btn-primary text-lg px-10 py-4 inline-block">
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  );
}
