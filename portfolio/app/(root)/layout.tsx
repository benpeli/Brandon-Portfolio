"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import "../globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPreloader, setShowPreloader] = useState(true); 
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setShowPreloader(true);
    
    const timer = setTimeout(() => {
      setShowPreloader(false);
      setContentVisible(true);
      document.body.style.overflow = 'auto';
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
        {showPreloader && <Preloader />}
        <div className={`content-container ${contentVisible ? 'visible' : 'hidden'}`}>
          <main className="flex-1">
            <Sidebar />
            {children}
          </main>
        </div>
    </div>
  );
}