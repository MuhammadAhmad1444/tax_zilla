import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, ExternalLink, BookOpen, Search } from 'lucide-react';
import Button from '../components/Button.jsx';
import TaxCalculatorModal from '../components/TaxCalculatorModal.jsx';
import { resources, RESOURCE_CATEGORIES, getResourcesByCategory, getCategories } from '../data/resources.js';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState(RESOURCE_CATEGORIES.ALL);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  
  const filteredResources = getResourcesByCategory(activeTab);
  const categories = getCategories();

  return (
    <>
      <Helmet>
        <title>Resources & Knowledge Base - Tax Zilla Consultancy</title>
        <meta name="description" content="Access free tax guides, compliance checklists, and business resources for Pakistan's legal landscape." />
      </Helmet>

      <section className="pt-32 pb-20 bg-brand-dark text-white relative dark-section">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493882552576-fce827c6161e')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Knowledge Base
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-on-dark-muted">
            Empowering you with the information you need to make informed decisions.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-[var(--color-gold)] text-black shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}s
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="card-surface p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 text-[var(--color-dark-blue)] rounded-lg">
                    {res.type === 'Tool' ? <Search size={24} /> : <BookOpen size={24} />}
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">
                    {res.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 flex-grow">{res.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{res.desc}</p>
                
                {res.isModal ? (
                  <button
                    onClick={() => setIsCalculatorOpen(true)}
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-[var(--color-gold)] hover:text-black transition-all font-medium"
                  >
                    Open Calculator <Search size={16} />
                  </button>
                ) : (
                  <a 
                    href={res.link} 
                    target={res.external ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-[var(--color-gold)] hover:text-black transition-all font-medium"
                  >
                    {res.external ? (
                      <>Access Tool <ExternalLink size={16} /></>
                    ) : (
                      <>Download PDF <Download size={16} /></>
                    )}
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl p-8 md:p-12 text-center bg-brand-dark dark-section relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-overlay opacity-75" />
            <div className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-[var(--color-gold)]/16 blur-3xl" />
            <h3 className="text-2xl font-bold mb-4">Need a Specific Guide?</h3>
            <p className="mb-6 text-on-dark-muted relative z-10">Subscribe to our newsletter to get the latest tax updates delivered to your inbox.</p>
            <div className="max-w-md mx-auto flex gap-2 relative z-10">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-500 border border-white/15 bg-white/95 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/35 focus:border-[var(--color-gold)]"
              />
              <Button variant="primary" size="md">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Calculator Modal */}
      <TaxCalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};

export default ResourcesPage;