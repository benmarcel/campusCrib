'use client';

import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'BenFelix',
    role: 'FIRST YEAR STUDENT',
    school: 'DELSU',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    text: 'As a first-year student, I had no idea where to even start looking for accommodation. Campus Crib made the whole process feel manageable. The property listings were super detailed with clear photos, and I could even see the closest bus routes and grocery stores on the site. It\'s an incredibly user-friendly platform that helps you find a place that\'s safe, affordable, and feels right for you.',
  },
  {
    id: 2,
    name: 'Tobi kunle',
    role: 'Final Year Student',
    school: 'UNILAG',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    text: 'I spent so much time on other sites trying to find a good place, but they were either too expensive or too far from campus. Campus Crib\'s search filters were a game-changer. I could set my budget, preferred distance from campus, and all the amenities I needed. I found the perfect place in a week, and it was so easy to contact the landlord directly through the app. It saved me a lot of stress.',
  },
  {
    id: 3,
    name: 'Amaka Nnagi',
    role: '200l STUDENT',
    school: 'UNN',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    text: 'I\'ve used Campus Crib for two years in a row now. What I love most is the transparency. All the prices are upfront, and there are no hidden fees like I\'ve found on other platforms. The verification process also gave me confidence that the properties were legitimate and well-maintained. It\'s the only site I trust when it\'s time to find a new place to live.',
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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 border-b-4 border-t-4 border-accent inline-block py-2">
            What Students say about campus crib
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-lg shadow-md p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                index === currentIndex ? 'ring-2 ring-[#1e3a8a]' : ''
              }`}
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.2}s both`,
              }}
            >
              {/* Profile */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 ring-4 ring-gray-100">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-600 font-semibold">{testimonial.role}</p>
                <p className="text-xs text-gray-500">{testimonial.school}</p>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}