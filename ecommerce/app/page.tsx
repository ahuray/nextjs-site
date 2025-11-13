import Image from "next/image";
import Link from "next/link";
import { products } from "./product-data";

export default function Home() {
  // Featured products (first 3)
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="animate-fade-in">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black min-h-[80vh] flex items-center">
        <div className="container-max mx-auto text-center">
          <h1 className="heading-hero mb-6 text-balance animate-slide-up">
            Crafted with Care.
            <br />
            <span className="text-[var(--accent)]">Designed for You.</span>
          </h1>
          <p className="body-lg text-[var(--secondary)] mb-12 max-w-3xl mx-auto text-balance">
            Premium, eco-friendly collectibles made from 100% organic materials.
            Sustainably sourced. Thoughtfully designed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products" className="btn-primary text-lg px-10 py-4 w-full sm:w-auto">
              Shop Collection
            </Link>
            <Link href="/products" className="btn-secondary text-lg px-10 py-4 w-full sm:w-auto">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-white dark:bg-black">
        <div className="container-max mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="heading-xl mb-4">Featured Collection</h2>
            <p className="body-md text-[var(--secondary)] max-w-2xl mx-auto">
              Discover our handpicked selection of premium merchandise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="product-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="product-card-image">
                  <Image
                    src={`/${product.imageUrl}`}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 smooth-transition-slow"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="heading-md mb-2 group-hover:text-[var(--accent)] smooth-transition">
                    {product.name}
                  </h3>
                  <p className="text-[var(--secondary)] text-sm md:text-base mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl md:text-2xl font-semibold">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link href="/products" className="btn-secondary px-10 py-3.5 inline-block text-base md:text-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-6 md:p-8 rounded-2xl bg-white dark:bg-black smooth-transition hover:shadow-xl">
              <div className="text-5xl md:text-6xl mb-4 animate-scale-in">🌱</div>
              <h3 className="heading-md mb-3">100% Organic</h3>
              <p className="body-md text-[var(--secondary)]">
                All materials sourced from certified organic cotton cooperatives
              </p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-2xl bg-white dark:bg-black smooth-transition hover:shadow-xl">
              <div className="text-5xl md:text-6xl mb-4 animate-scale-in" style={{ animationDelay: '100ms' }}>♻️</div>
              <h3 className="heading-md mb-3">Eco-Friendly</h3>
              <p className="body-md text-[var(--secondary)]">
                PVC and phthalate-free inks used in all our screen printing
              </p>
            </div>
            <div className="text-center p-6 md:p-8 rounded-2xl bg-white dark:bg-black smooth-transition hover:shadow-xl">
              <div className="text-5xl md:text-6xl mb-4 animate-scale-in" style={{ animationDelay: '200ms' }}>✨</div>
              <h3 className="heading-md mb-3">Premium Quality</h3>
              <p className="body-md text-[var(--secondary)]">
                Carefully crafted with attention to every detail for lasting quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container-max mx-auto text-center">
          <h2 className="heading-xl mb-6">
            Ready to start your collection?
          </h2>
          <p className="body-lg text-[var(--secondary)] mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Big Star Collectibles
            for premium, sustainable merchandise.
          </p>
          <Link href="/products" className="btn-primary text-lg px-12 py-4 inline-block shadow-xl">
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  );
}
