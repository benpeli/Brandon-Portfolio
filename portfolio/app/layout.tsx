import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({ 
  subsets: ['latin'], 
  weight: ['700', '800', '900'],
  variable: '--font-latin'
})

export const metadata: Metadata = {
  title: "Brandon Yee",
  description: "Portfolio website for Brandon Yee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tajawal.className} ${tajawal.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}