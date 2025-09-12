import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { InitialFetch } from '@/components';
import { Toaster } from '@/shadcn/components/ui/sonner';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next15 zustand',
  description: 'Next15 zustand',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.variable}>
      <body className={`${notoSans.variable} antialiased`}>
        <InitialFetch />
        <div id="myportal" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
