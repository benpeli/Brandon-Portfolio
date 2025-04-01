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
      href: "/home",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/brandonyee-cs', icon: '/icons/github.png' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/brandon-yee-0b335a284/', icon: '/icons/linkedin.png' },
    { name: 'Medium', url: 'https://medium.com/@brandonyee.nyc5', icon: '/icons/medium.png' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-800 text-white shadow-lg z-50 flex flex-col">
      <div className="p-6 flex flex-col items-center profile-image-container">
        <img
          src="/images/profile-picture.jpeg" 
          alt="Profile Picture" 
          width="150" 
          height="150"
          className={`profileImage mb-2 ${profileVisible ? 'opacity-100' : 'opacity-0'}`}
        />
        <h1 className="text-gray-200 font-bold">Brandon Yee</h1>
        <p className="text-gray-200 mb-6">ML Researcher @ MIT</p>
      </div>
    
      <nav className="mt-6 flex-grow">
        <ul>
          {links.map((item) => (
            <li key={item.name}>              
              <Link 
                href={item.href}
                className={`flex items-center px-6 py-3 hover:bg-zinc-700 transition-colors ${
                  pathname === item.href ? 'bg-zinc-700 border-l-4 border-zinc-200' : ''
                }`}
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('sidebarNavigation'));
                }}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-zinc-700">
        <div className="flex justify-around">
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={link.name}
            >
              <img 
                src={link.icon} 
                alt={`${link.name} icon`}
                width="35"
                height="25"
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;