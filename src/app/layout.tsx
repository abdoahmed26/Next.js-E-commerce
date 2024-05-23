import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "./NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is Website for E-Commerce",
  icons: {
    icon : './bag-shopping-solid.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <StoreProvider>
            <div className="min-h-screen flex flex-col justify-between">
              <div><Header/></div>
              <div>{children}</div>
              <div><Footer /></div>
            </div>
            <div><Toaster/></div>
          </StoreProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
