import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  weight: ['500', '800', '900'],
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
        className={`${orbitron.className} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}