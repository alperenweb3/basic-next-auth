'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>
        &copy; 2024{' '}
        <Link target="__blank" href={'https://alperen.co'}>
          Alperen Özkan
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}
