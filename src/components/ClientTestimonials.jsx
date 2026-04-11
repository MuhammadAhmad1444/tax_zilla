import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const testimonials = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Freelance Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    text: "Tax Zilla simplified my tax filing process completely. As a freelancer receiving foreign remittances, I was confused about the exemptions. Their team guided me perfectly, and I filed my returns with zero hassle.",
    rating: 5,
    type: "Freelancer"
  },
  {
    id: 2,
    name: "Sarah Bilal",
    role: "CEO, TechStart Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    text: "Registering my company with SECP seemed daunting until I met the Tax Zilla team. They handled everything from name reservation to incorporation efficiently. Highly recommended for startups!",
    rating: 5,
    type: "Startup Founder"
  },
  {
    id: 3,
    name: "Muhammad Usman",
    role: "Owner, Al-Fatah Traders",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    text: "Their audit assistance service is top-notch. When I received a notice from FBR, I was worried. The Tax Zilla consultants represented my case professionally and resolved the issue quickly.",
    rating: 5,
    type: "SME Owner"
  },
  {
    id: 4,
    name: "Zainab Malik",
    role: "Marketing Consultant",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    text: "I've been using their income tax filing service for 3 years now. They are always timely, professional, and keep me updated on the latest tax laws. Peace of mind guaranteed.",
    rating: 5,
    type: "Individual Taxpayer"
  },
  {
    id: 5,
    name: "Bilal Ahmed",
    role: "Director, BuildCorp Pvt Ltd",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    text: "Comprehensive corporate compliance services. From annual returns to sales tax filings, Tax Zilla handles our entire portfolio with precision and expertise.",
    rating: 5,
    type: "Corporate Client"
  }
];

const ClientTestimonials = () => {
  const { reduce } = usePageMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gray-50 py-16 rounded-3xl relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            What Our Clients Say
          </h2>
          <p className="text-gray-600">Trusted by hundreds of businesses and individuals across Pakistan</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -16 }}
              transition={{ duration: reduce ? 0.01 : 0.35, ease: EASE_OUT }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-[var(--color-gold)]"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm relative">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150?text=User'; // Fallback
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4 text-[var(--color-gold)]">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={20} />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </p>
                  
                  <div>
                    <h4 className="font-bold text-xl text-[var(--color-dark-blue)]">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{testimonials[currentIndex].role}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {testimonials[currentIndex].type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-md hover:bg-[var(--color-gold)] hover:text-white transition-all text-gray-600"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-md hover:bg-[var(--color-gold)] hover:text-white transition-all text-gray-600"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 border-t border-gray-200 pt-12 max-w-5xl mx-auto text-center"
          variants={getStaggerContainer(reduce)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REVEAL}
        >
          {[
            { h: '500+', l: 'Happy Clients' },
            { h: '98%', l: 'Retention Rate' },
            { h: '100%', l: 'Data Privacy' },
            { h: '24/7', l: 'Support' },
          ].map((s) => (
            <motion.div key={s.l} variants={getStaggerItem(reduce)}>
              <h4 className="text-3xl font-bold text-[var(--color-gold)] mb-1">{s.h}</h4>
              <p className="text-sm text-gray-600 font-medium">{s.l}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientTestimonials;