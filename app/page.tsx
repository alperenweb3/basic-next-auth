'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col">
      <section className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Our Landing Page
          </h1>
          <p className="text-xl mb-8">
            This is a basic landing page with centered text and a navigation
            bar.
          </p>
          <Link
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
