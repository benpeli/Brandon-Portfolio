"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [profileVisible, setProfileVisible] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setProfileVisible(true);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if ((mutation.target as Element).classList.contains('visible')) {
          setProfileVisible(true);
        }
      });
    });

    const contentContainer = document.querySelector('.content-container');
    if (contentContainer) {
      if (contentContainer.classList.contains('visible')) {
        setProfileVisible(true);
      }
      observer.observe(contentContainer, { attributes: true, attributeFilter: ['class'] });
    }

    const handleLoad = () => setProfileVisible(true);
    window.addEventListener('load', handleLoad);

    return () => {
      observer.disconnect();
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const links = [
    {
      name: "Home",
      href: "#home",
      section: "home"
    },
    {
      name: "Research",
      href: "#researchSec",
      section: "researchSec"
    },
    {
      name: "Projects",
      href: "#projects",
      section: "projects"
    },
    {
      name: "Contact",
      href: "#contact",
      section: "contact"
    },
  ];

  const handleNavigation = (e: React.MouseEvent, item: { href: string, section: string }) => {
    e.preventDefault();
    const element = document.getElementById(item.section);
    if (element) {
      const offset = 80;
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Adjust final scroll position to account for the header offset
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY - offset,
          behavior: 'smooth'
        });
      }, 0);
    }
    window.dispatchEvent(new CustomEvent('sidebarNavigation'));
  };

  return (
    <aside className="fixed top-2 left-[32.5%] right-0 w-[60%] bg-zinc-800 text-white shadow-lg z-50 py-2 rounded-full">
      <nav className="flex justify-center items-center">
        <ul className="flex space-x-3">
          {links.map((item) => (
            <li key={item.name}>              
              <Link 
                href={item.href}
                className={`px-4 py-2 transition-colors ${
                  pathname === item.href || (pathname === '/home' && item.href.startsWith('#')) ? 'text-gray-400 hover:text-gray-100' : 'text-gray-400 hover:text-gray-100'
                }`}
                onClick={(e) => handleNavigation(e, item)}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar;