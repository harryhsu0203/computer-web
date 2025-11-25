import '@/app/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Noto_Sans_TC, Orbitron } from 'next/font/google';

const fontSans = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-sans'
});
const fontDisplay = Orbitron({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  display: 'swap',
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: '凱銓科技商行｜電腦/週邊專賣',
  description: '凱銓科技商行｜電腦、筆電、零組件、周邊耗材線上選購',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <body className={`${fontSans.variable} ${fontDisplay.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          <div className="container py-8">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}


