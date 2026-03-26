import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { services, SERVICE_CATEGORIES, getServicesByCategory, getCategories } from '../data/services.js';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(SERVICE_CATEGORIES.ALL);

  const filteredServices = getServicesByCategory(activeTab);
  const categories = getCategories();

  return (
    <>
      <Helmet>
        <title>Our Services - Tax Zilla Consultancy</title>
        <meta name="description" content="Comprehensive tax and legal services including Income Tax, Sales Tax, Company Registration, and Audit support in Pakistan." />
      </Helmet>

      <section className="relative pt-32 pb-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-dark-blue)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,128,0.18),_transparent_55%)]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[rgba(255,215,128,0.12)] blur-2xl" />
        <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-black/40 to-transparent" />

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Trusted Advisory Studio
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Professional Services
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Expert solutions for all your tax, compliance, and corporate needs across Pakistan.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container-custom">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all border ${
                  activeTab === category 
                    ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg shadow-[rgba(255,215,128,0.25)]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-100 hover:border-[var(--color-gold)]"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors">
                    <service.icon size={26} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Service</div>
                </div>
                <h3 className="text-2xl font-bold mt-6 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.desc}</p>
                <Button 
                  variant="secondary" 
                  onClick={() => navigate(service.path)}
                  className="w-full"
                >
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-gray-200">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help With Your Tax Compliance?</h2>
          <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>Contact Us Today</Button>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;