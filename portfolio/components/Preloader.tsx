"use client";

import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [morphing, setMorphing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    // Start morphing animation after 1.5 seconds
    const morphTimer = setTimeout(() => {
      setMorphing(true);
    }, 1500);
    
    // Complete the loading after 2.5 seconds
    const loadingTimer = setTimeout(() => {
      setCompleted(true);
      
      // Start moving the profile picture after a short delay
      setTimeout(() => {
        setMoving(true);
        
        // After the profile picture moves, show the rest of the content
        setTimeout(() => {
          document.querySelector('.content-container')?.classList.add('visible');
          
          // Finally fade out the preloader background
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }, 1000); // Wait for profile movement animation
      }, 800);
    }, 2500);

    return () => {
      clearTimeout(morphTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className={`fixed inset-0 bg-zinc-900 flex items-center justify-center z-50 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {completed && (
        <img 
          src="/images/profile-picture.jpeg"
          alt="Profile Picture"
          width="150" 
          height="150"
          className={`profileImage rounded-full object-cover ${
            !moving ? 'animate-profileAppear' : 'profile-transition'
          }`}
        />
      )}
      
      {!completed && (
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className={`absolute w-full h-full rounded-full transition-all duration-1500 ${
              morphing ? 'border-[16px] border-blue-500' : 'border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin'
            }`}></div>
            <div className={`absolute w-full h-full rounded-full transition-all duration-1500 ${
              morphing ? 'border-[16px] border-blue-300' : 'border-4 border-t-transparent border-r-blue-300 border-b-transparent border-l-blue-300 animate-spin animation-delay-500'
            }`}></div>
          </div>
          <h2 className="text-white mt-4 text-xl font-bold">Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default Preloader;