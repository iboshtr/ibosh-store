import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import MobileNav from "@/components/MobileNav";

import OAWhatsApp from "@/components/OAWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import "./../globals.css";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <AnnouncementBar />
            {children}
            <OAWhatsApp phoneNumber="905521679185" />
            <CartDrawer />
            <MobileNav />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
