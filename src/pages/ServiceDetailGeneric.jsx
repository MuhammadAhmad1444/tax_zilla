import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { services } from '../data/services.js';
import Button from '../components/Button.jsx';
import { motion } from 'framer-motion';
import { usePageMotion, EASE_OUT } from '../lib/motion.js';

const ServiceDetailGeneric = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();

  const servicePath = `/services/${slug}`;
  const service = services.find(s => s.path === servicePath);

  if (!service) {
    return (
      <div className="container-custom py-20">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <p className="text-gray-600 mb-6">We couldn't find that service. Return to the services list to choose another option.</p>
        <Button onClick={() => navigate('/services')}>View Services</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.title} - Tax Zilla Consultancy</title>
        <meta name="description" content={service.desc} />
      </Helmet>

      <section className="relative overflow-hidden bg-brand-dark px-2 pb-16 pt-28 text-center text-white dark-section sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <motion.div className="container-custom relative z-10" {...hero}>
          <h1 className="px-2 text-3xl font-bold mb-4 sm:text-4xl md:text-5xl break-words" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.12 }}
            className="text-xl text-on-dark-muted"
          >
            {service.desc}
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-dark-blue)]">Service Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.desc}</p>

            <div className="bg-[var(--color-gold)]/10 p-8 rounded-xl text-center border border-[var(--color-gold)]">
              <h3 className="text-xl font-bold mb-2">Ready to proceed?</h3>
              <p className="text-gray-600 mb-6">Let our experts handle your {service.title} requirements today.</p>
              <Button variant="primary" onClick={() => navigate('/contact', { state: { service: service.title } })}>Get Started Now</Button>
            </div>
          </div>

          <aside className="bg-gray-50 p-8 rounded-xl h-fit sticky top-24 shadow-lg border-t-4 border-[var(--color-gold)]">
            <h3 className="text-xl font-bold mb-6 text-[var(--color-dark-blue)]">Why Choose This Service?</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">Professional handling and fast turnaround.</li>
              <li className="flex items-start gap-3">Transparent process and documentation checklist.</li>
              <li className="flex items-start gap-3">Dedicated support until completion.</li>
            </ul>
            <Button variant="primary" className="w-full font-bold" onClick={() => navigate('/contact', { state: { service: service.title } })}>
              Request Consultation
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailGeneric;
