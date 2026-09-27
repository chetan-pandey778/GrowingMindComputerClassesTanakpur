import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Growing Mind Computer Class - Tanakpur",
  description: "AICT Authorized Study Centre in Tanakpur",
  keywords: "computer class tanakpur, computer training institute",
  icons: {
    icon: "https://yjibyfbbkbyblfsctqko.supabase.co/storage/v1/object/public/images/logo.png",
    apple: "https://yjibyfbbkbyblfsctqko.supabase.co/storage/v1/object/public/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-32 md:pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}