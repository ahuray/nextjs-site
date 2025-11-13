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
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-indigo-100 max-w-2xl">
            Explore our curated collection of premium products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <ProductsList products={products} initialCartProducts={cartProducts} />
      </div>
    </div>
  );
}