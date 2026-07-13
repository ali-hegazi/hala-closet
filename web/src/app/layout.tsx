import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FavouritesProvider } from "@/components/favourites";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hala — Pre-loved fashion, UAE",
    template: "%s · Hala",
  },
  description:
    "Buy and sell pre-loved fashion across the UAE. Designer bags, abayas, sneakers and more — from wardrobes in all seven emirates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <FavouritesProvider>
          <Header />
          <main className="mx-auto min-h-[60vh] w-full max-w-7xl px-4 sm:px-6">
            {children}
          </main>
          <Footer />
        </FavouritesProvider>
      </body>
    </html>
  );
}
