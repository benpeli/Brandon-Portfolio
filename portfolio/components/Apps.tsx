"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface AppLogo {
  name: string;
  logo: string;
  description: string;
}

const Apps: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [position, setPosition] = useState(0);
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const appLogos: AppLogo[] = [
    {
      name: 'MatLab',
      logo: '/icons/matlab.png',
      description: 'MatLab'
    },
    {
      name: 'C++',
      logo: '/icons/c++.png',
      description: 'C++'
    },
    {
      name: 'JavaScript',
      logo: '/icons/javascript.png',
      description: 'JavaScript'
    },
    {
      name: 'Html',
      logo: '/icons/html.png',
      description: 'HTML'
    },
    {
        name: 'Css',
        logo: '/icons/css.png',
        description: 'CSS'
    },
    {
      name: 'Python',
      logo: '/icons/python.png',
      description: 'Python'
    },
  ];

  useEffect(() => {
    const speed = isHovering || isNavigating ? 0 : 0.5; 
    let animationFrameId: number;
    
    const animate = () => {
      setPosition(prevPosition => {
        let newPosition = prevPosition + speed;
        return newPosition;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovering, isNavigating, appLogos.length]);

    useEffect(() => {
    const handleNavigation = () => {
      setIsNavigating(true);
      
      setTimeout(() => {
        setIsNavigating(false);
      }, 100); 
    };
    
    window.addEventListener('sidebarNavigation', handleNavigation);
    
    return () => {
      window.removeEventListener('sidebarNavigation', handleNavigation);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredLogo(null);
  };

  const generateLogos = () => {
    const repeatedLogos = [];
    const repetitions = 25;

    for (let i = 0; i < repetitions; i++) {
      repeatedLogos.push(...appLogos);
    }
    return repeatedLogos;
  }

  return (
    <div 
      className="w-full max-w-2xl mx-auto my-8 overflow-hidden h-28 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      <div className="absolute top-5">
        <div 
          className="flex transition-transform duration-10 ease-linear"
          style={{ transform: `translateX(-${position}px)` }}
        >
          {generateLogos().map((app, idx) => (
            <div 
              key={idx} 
              className="mx-4 flex-shrink-0"
              onMouseEnter={() => setHoveredLogo(idx)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
              <div className="w-14 h-14 relative transition-all duration-300 hover:scale-110">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={app.logo}
                  alt={`${app.name} logo`}
                  className="object-contain"
                />
              </div>
              
              {hoveredLogo === idx && (
                <div className="relative -bottom-3 text-gray-300 text-xs overline decoration-2 rounded text-center z-10">
                  <p>{app.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apps;