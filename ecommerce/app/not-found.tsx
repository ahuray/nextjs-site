import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="section-padding min-h-[70vh] flex items-center">
      <div className="container-max mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Page Not Found</h1>
          <p className="text-xl text-[var(--secondary)] mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn-primary text-lg px-10 py-4 inline-block">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}