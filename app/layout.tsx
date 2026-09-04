import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import AISearchOverlay from '@/components/ai/AISearchOverlay';
import AISkinAssistantDrawer from '@/components/ai/AISkinAssistantDrawer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'SEOUL LABS UK — Korean Beauty, Intelligently Matched',
  description: 'Premium AI-powered Korean skincare e-commerce platform for the UK market. Authentic formulations matched to your exact skin goals with fast UK delivery.',
  openGraph: {
    title: 'SEOUL LABS UK — Korean Beauty, Intelligently Matched',
    description: 'Discover authentic Korean skincare selected around your skin, concerns, and routine.',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="antialiased flex flex-col min-h-screen">
        <ShopProvider>
          <Header />
          <AISearchOverlay />
          <AISkinAssistantDrawer />
          <CartDrawer />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </ShopProvider>
      </body>
    </html>
  );
}
