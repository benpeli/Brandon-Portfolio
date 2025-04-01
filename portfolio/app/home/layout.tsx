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
  const [showPreloader, setShowPreloader] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visitCounter = localStorage.getItem('visitCounter');
      if (!visitCounter) {
        setShowPreloader(true);
        setContentVisible(false);
        localStorage.setItem('visitCounter', '1');
        
        const timer = setTimeout(() => {
          setShowPreloader(false);
          setContentVisible(true);
          document.body.style.overflow = 'auto';
        }, 4000);
        
        return () => clearTimeout(timer);
      } else {
        setContentVisible(true);
        document.body.style.overflow = 'auto';
      }
    }
  }, []);

  return (
    <div>
        {showPreloader && <Preloader />}
        <div className={`content-container ${contentVisible ? 'visible' : 'hidden'}`}>
          <main className="ml-64 flex-1">
            <Sidebar />
            {children}
          </main>
        </div>
    </div>
  );
}