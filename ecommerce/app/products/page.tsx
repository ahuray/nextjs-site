import ProductsList from "../ProductsList";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products');
  const products = await response.json();

  const response2 = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/users/2/cart', {
    cache: 'no-cache',
  });
  const cartProducts = await response2.json();

  return (
    <main className="section-padding animate-fade-in">
      <div className="container-max mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="heading-xl mb-4">Our Collection</h1>
          <p className="body-md text-[var(--secondary)] max-w-2xl mx-auto">
            Premium eco-friendly merchandise crafted with care and designed to last
          </p>
        </div>
        <ProductsList products={products} initialCartProducts={cartProducts} />
      </div>
    </main>
  );
}