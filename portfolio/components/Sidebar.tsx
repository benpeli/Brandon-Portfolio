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
      href: "#research",
      section: "research"
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
    if (pathname === '/home') {
      e.preventDefault();
      const element = document.getElementById(item.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    window.dispatchEvent(new CustomEvent('sidebarNavigation'));
  };

  return (
    <aside className="fixed left-0 top-2 w-full max-w-screen-lg mx-auto inset-x-0 bg-zinc-800 text-white shadow-lg z-50 py-2 rounded-full">
      <nav className="flex justify-end items-center">
        <ul className="flex space-x-3">
          {links.map((item) => (
            <li key={item.name}>              
              <Link 
                href={item.href}
                className={`px-4 py-2 transition-colors ${
                  pathname === item.href || (pathname === '/home' && item.href.startsWith('#')) ? 'text-gray-400 hover:text-gray-100' : 'text-gray-800 hover:text-white'
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