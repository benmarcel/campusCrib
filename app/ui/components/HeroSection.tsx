'use client';

import { useState, useEffect } from 'react';
import { GetAPlace } from './links';
import Image from 'next/image';

const SOCIAL_PROOF_IMAGES = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=64&h=64&q=80", 
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80", 
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=64&h=64&q=80", 
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80",
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col items-center justify-center px-4 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl leading-tight">
          FIND YOUR HOME AWAY FROM HOME
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl">
          Campus Crib makes finding your ideal student accommodation stress-free.
        </p>
        <GetAPlace />

        {/* Trust Badge - Your Original Positioning */}
        <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20">
          <div className="flex -space-x-2">
            {SOCIAL_PROOF_IMAGES.map((src, i) => (
              <div key={i} className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                <Image 
                  src={src} 
                  alt="Student" 
                  fill 
                  className="object-cover"
                />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-[#00d4ff] border-2 border-white flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">+</span>
            </div>
          </div>
          <div className="text-white text-sm">
            Trusted by Over <span className="font-bold">2k+</span> Students
          </div>
        </div>
      </div>
    </section>
  );
}