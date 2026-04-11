import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { ArrowRight } from 'lucide-react';
import { industries } from '../data/industries.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL } from '../lib/motion.js';

const IndustriesPage = () => {
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();

  // use industries list from src/data/industries.js

  return (
    <>
      <Helmet>
        <title>Industries We Serve - Tax Zilla Consultancy</title>
        <meta name="description" content="Specialized tax and legal services for Freelancers, Startups, SMEs, and Corporations in Pakistan." />
      </Helmet>

      <section className="relative overflow-hidden bg-brand-dark px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573165759995-5865a394a1aa')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-brand-overlay opacity-75" />
        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <h1 className="px-2 text-3xl font-bold mb-6 sm:text-4xl md:text-5xl lg:text-6xl break-words" style={{ fontFamily: 'var(--font-heading)' }}>
            Industries We Serve
          </h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.12 }}
            className="text-xl max-w-3xl mx-auto text-on-dark-muted"
          >
            Specialized expertise tailored to the unique regulatory challenges of your sector.
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading title="Sector Expertise" subtitle="We understand your business language" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, idx) => (
                <motion.div
                key={idx}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_REVEAL}
                transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT, delay: reduce ? 0 : idx * 0.08 }}
                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.22, ease: EASE_OUT } }}
                className="card-surface overflow-hidden group"
              >
                <div className="border-b border-gray-100 p-5 sm:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--color-dark-blue)] rounded-lg text-white group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors">
                      <ind.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold">{ind.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{ind.desc}</p>
                  
                  {(ind.challenges || ind.solutions) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {ind.challenges && (
                        <div>
                          <h4 className="font-bold text-sm text-red-500 mb-2 uppercase tracking-wide">Challenges</h4>
                          <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                            {ind.challenges.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        </div>
                      )}
                      {ind.solutions && (
                        <div>
                          <h4 className="font-bold text-sm text-green-600 mb-2 uppercase tracking-wide">Our Solutions</h4>
                          <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                            {ind.solutions.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-4 bg-gray-50 text-center">
                   <button 
                     onClick={() => navigate('/contact')}
                     className="text-[var(--color-dark-blue)] font-bold flex items-center justify-center gap-2 hover:gap-4 transition-all w-full"
                   >
                     Consult for {ind.title.split('&')[0]} <ArrowRight size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustriesPage;