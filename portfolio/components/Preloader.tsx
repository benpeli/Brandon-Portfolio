"use client";

import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [morphing, setMorphing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const morphTimer = setTimeout(() => {
      setMorphing(true);
    }, 4000);
    
    const loadingTimer = setTimeout(() => {
      setCompleted(true);
      
      setTimeout(() => {
        setMoving(true);
        
        setTimeout(() => {
          document.querySelector('.content-container')?.classList.add('visible');
          
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }, 1000);
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