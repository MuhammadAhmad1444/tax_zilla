import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, FileCheck, Lock, Award, Briefcase } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const WhyChooseUsPage = () => {
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();

  const reasons = [
    { icon: FileCheck, title: 'Pakistan Law Expertise', desc: 'In-depth knowledge of Income Tax Ordinance 2001 and Sales Tax Act 1990.' },
    { icon: Clock, title: 'Timely Filings', desc: 'We ensure all your returns are filed before deadlines to avoid penalties.' },
    { icon: Lock, title: 'Confidentiality', desc: 'Your financial data is handled with strict security protocols.' },
    { icon: Users, title: 'Client-First Approach', desc: 'Tailored solutions that prioritize your business growth and savings.' },
    { icon: Shield, title: 'FBR Compliance', desc: 'Specialized in handling FBR notices, audits, and compliance matters.' },
    { icon: Briefcase, title: 'Transparent Process', desc: 'Clear communication at every step with no hidden charges.' },
    { icon: Award, title: 'Professional Credentials', desc: 'Qualified team of tax consultants and legal advisors.' }
  ];

  return (
    <>
      <Helmet>
        <title>Why Choose Us - Tax Zilla Consultancy</title>
        <meta name="description" content="Discover why businesses in Pakistan trust Tax Zilla. Expertise, timeliness, and confidentiality are our core values." />
      </Helmet>

      <section className="pt-32 pb-20 bg-brand-dark text-white text-center dark-section relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <motion.div className="container-custom relative z-10" {...hero}>
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Why Choose Tax Zilla?</h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.12 }}
            className="text-xl text-on-dark-muted"
          >
            Excellence in every engagement
          </motion.p>
        </motion.div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REVEAL}
          >
            {reasons.map((reason) => (
              <motion.div 
                key={reason.title}
                variants={getStaggerItem(reduce)}
                whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.22, ease: EASE_OUT } }}
                className="card-surface p-8"
              >
                <reason.icon size={40} className="text-[var(--color-gold)] mb-4" />
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_REVEAL}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT }}
          >
             <SectionHeading title="Experience Professional Tax Consultancy" subtitle="Join hundreds of satisfied clients in Pakistan" />
             <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>Book a Consultation</Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsPage;