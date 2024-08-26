'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SessionProvider>
          <NavBar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
