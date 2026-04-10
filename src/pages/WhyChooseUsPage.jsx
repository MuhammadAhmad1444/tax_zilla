import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, FileCheck, Lock, Award, Briefcase } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';

const WhyChooseUsPage = () => {
  const navigate = useNavigate();

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

      <section className="pt-32 pb-20 bg-[var(--color-dark-blue)] text-white text-center dark-section">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Why Choose Tax Zilla?</h1>
          <p className="text-xl text-gray-300">Excellence in every engagement</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-surface p-8"
              >
                <reason.icon size={40} className="text-[var(--color-gold)] mb-4" />
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
             <SectionHeading title="Experience Professional Tax Consultancy" subtitle="Join hundreds of satisfied clients in Pakistan" />
             <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>Book a Consultation</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsPage;