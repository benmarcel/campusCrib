'use client';

import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Ben Felix',
    role: 'FIRST YEAR STUDENT',
    school: 'DELSU',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    text: "As a first-year student, I had no idea where to even start looking for accommodation. Campus Crib made the whole process feel manageable. The listings were super detailed with clear photos. It's an incredibly user-friendly platform that helps you find a place that's safe and affordable.",
  },
  {
    id: 2,
    name: 'Tobi Kunle',
    role: 'FINAL YEAR STUDENT',
    school: 'UNILAG',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    text: "I spent so much time on other sites, but they were either too expensive or too far from campus. Campus Crib's search filters were a game-changer. I found the perfect place in a week, and it was so easy to contact the landlord directly through the app.",
  },
  {
    id: 3,
    name: 'Amaka Nnagi',
    role: '200L STUDENT',
    school: 'UNN',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    text: "I've used Campus Crib for two years in a row now. What I love most is the transparency. All the prices are upfront, and there are no hidden fees. The verification process gave me confidence that the properties were legitimate. It's the only site I trust.",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#003366] uppercase tracking-tight inline-block relative">
            What Students Say
            <div className="h-1.5 w-full bg-[#00BCD4] absolute -bottom-2 left-0 rounded-full opacity-30" />
          </h2>
          <p className="text-gray-500 mt-6 max-w-xl mx-auto">
            Join thousands of students who found their perfect off-campus crib through our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative bg-white rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl border-2 ${
                index === currentIndex 
                ? 'border-[#00BCD4] shadow-xl -translate-y-2' 
                : 'border-transparent shadow-sm translate-y-0'
              }`}
            >
              {/* Quote Icon Accent */}
              <div className="absolute top-6 right-8 text-[#00BCD4] opacity-20">
                <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.535282 13 -1.017 12.5523 -1.017 12V9C-1.017 7.34315 0.326142 6 2.017 6H8.017C9.67386 6 11.017 7.34315 11.017 9V15C11.017 18.3137 8.33071 21 5.017 21H3.017Z" />
                </svg>
              </div>

              {/* Profile Wrapper */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#00BCD4]/20 ring-offset-2">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#003366]">{testimonial.name}</h3>
                  <p className="text-[10px] font-bold text-[#00BCD4] uppercase tracking-wider">
                    {testimonial.school}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                 <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-6">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-[#003366] hover:bg-[#003366] hover:text-white hover:border-[#003366] transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-xl bg-[#00BCD4] shadow-lg shadow-[#00BCD4]/20 flex items-center justify-center text-[#003366] hover:bg-[#003366] hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}