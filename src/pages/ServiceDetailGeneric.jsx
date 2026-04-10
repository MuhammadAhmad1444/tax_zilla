import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { services } from '../data/services.js';
import Button from '../components/Button.jsx';
import { motion } from 'framer-motion';

const ServiceDetailGeneric = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

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

      <section className="pt-32 pb-20 bg-[var(--color-dark-blue)] text-white text-center dark-section">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h1>
          <p className="text-xl text-gray-300">{service.desc}</p>
        </div>
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
