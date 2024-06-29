import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FavouritesProvider } from "@/modules/Favourites/context/FavouritesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shift",
  description: "Shit search app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FavouritesProvider>
        <body className={inter.className}>{children}</body>
      </FavouritesProvider>
    </html>
  );
}
