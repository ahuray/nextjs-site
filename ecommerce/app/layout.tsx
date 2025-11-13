import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./NavBar";

export const metadata: Metadata = {
  title: "Big Star Collectibles | Premium Eco-Friendly Merchandise",
  description: "Discover our curated collection of premium, eco-friendly merchandise. Sustainably crafted with organic materials and mindful design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
