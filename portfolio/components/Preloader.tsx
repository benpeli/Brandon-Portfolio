"use client";

import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "BRANDON YEE";
  const [typingComplete, setTypingComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 300);
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
        
        setTimeout(() => {
          setFadeOut(true);
          
          setTimeout(() => {
            const contentContainer = document.querySelector('.content-container');
            if (contentContainer) {
              contentContainer.classList.add('visible');
              (contentContainer as HTMLElement).style.opacity = '0';
              (contentContainer as HTMLElement).style.transition = 'opacity 2s ease-in-out';
              
              setTimeout(() => {
(contentContainer as HTMLElement).style.opacity = '1';
              }, 500);
            }
            
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }, 1000);
        }, 1200);
      }
    }, 125);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className={`fixed inset-0 bg-zinc-900 flex items-center justify-center z-50 transition-opacity duration-1000 
      ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
      ${fadeOut ? 'opacity-0' : visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wider">
          {text}
          <span className={`ml-1 inline-block w-2 h-8 md:h-12 bg-white ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
        </h1>
      </div>
    </div>
  );
};

export default Preloader;