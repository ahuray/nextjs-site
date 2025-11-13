import NotFoundPage from "@/app/not-found";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/products/' + params.id);
  const product = await response.json();

  if (!product) {
    return <NotFoundPage/>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/products" className="text-gray-500 hover:text-indigo-600 transition-colors">
              Products
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={'/' + product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="bg-white rounded-3xl shadow-lg p-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                  <p className="text-4xl font-bold text-indigo-600">
                    ${product.price}
                  </p>
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">(4.5)</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <Link
                    href="/cart"
                    className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg text-center"
                  >
                    Add to Cart
                  </Link>
                  <Link
                    href="/products"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-colors text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Features */}
                <div className="mt-8 pt-8 border-t space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}