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

      <section className="pt-32 pb-20 bg-[var(--color-dark-blue)] text-white text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Our Professional Services</h1>
          <p className="text-xl text-gray-300">Expert solutions for all your tax and corporate needs</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Category Tabs - Matching ResourcesPage styling */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === category 
                    ? 'bg-[var(--color-gold)] text-black shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
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
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all border-t-4 border-[var(--color-gold)]"
              >
                <service.icon size={48} className="text-[var(--color-dark-blue)] mb-6" />
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
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