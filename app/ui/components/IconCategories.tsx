'use client';

import { useState } from 'react';

const categories = [
  { id: 1, icon: '🏠', label: 'Apartment' },
  { id: 2, icon: '🛏️', label: 'Studio' },
  { id: 3, icon: '🏢', label: 'Hostel' },
  { id: 4, icon: '🏡', label: 'House' },
  { id: 5, icon: '🚪', label: 'Room' },
  { id: 6, icon: '🎓', label: 'Campus' },
  { id: 7, icon: '📦', label: 'Storage' },
  { id: 8, icon: '💼', label: 'Workspace' },
  { id: 9, icon: '🏋️', label: 'Gym Access' },
];

export default function IconCategories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-center gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex flex-col items-center gap-2 min-w-[70px] transition-all duration-300 group ${
              activeCategory === category.id ? 'scale-110' : ''
            }`}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div
              className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl transition-all duration-300 group-hover:bg-[#1e3a8a] group-hover:shadow-lg group-hover:scale-110 ${
                activeCategory === category.id ? 'bg-[#1e3a8a] shadow-lg' : ''
              }`}
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </span>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}