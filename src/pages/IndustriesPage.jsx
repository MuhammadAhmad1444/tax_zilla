import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { ArrowRight } from 'lucide-react';
import { industries } from '../data/industries.js';

const IndustriesPage = () => {
  const navigate = useNavigate();

  // use industries list from src/data/industries.js

  return (
    <>
      <Helmet>
        <title>Industries We Serve - Tax Zilla Consultancy</title>
        <meta name="description" content="Specialized tax and legal services for Freelancers, Startups, SMEs, and Corporations in Pakistan." />
      </Helmet>

      <section className="pt-32 pb-20 bg-brand-dark text-white relative dark-section overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573165759995-5865a394a1aa')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-brand-overlay opacity-75" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Industries We Serve
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-on-dark-muted">
            Specialized expertise tailored to the unique regulatory challenges of your sector.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading title="Sector Expertise" subtitle="We understand your business language" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-surface overflow-hidden group"
              >
                <div className="p-8 border-b border-gray-100">
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