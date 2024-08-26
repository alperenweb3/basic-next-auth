'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col">
      <section className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            You are unauthorized to see this page
          </h1>
          <p className="text-xl mb-8">Thanks for your understanding.</p>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to home
          </Link>
        </div>
      </section>
    </div>
  );
}
