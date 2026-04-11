import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Award, CheckSquare } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const AboutPage = () => {
  const { hero, reduce } = usePageMotion();
  return (
    <>
      <Helmet>
        <title>About Us - Tax Zilla Consultancy Pakistan</title>
        <meta name="description" content="Learn about Tax Zilla Consultancy, a leading tax and legal firm in Lahore, Pakistan. Experts in FBR compliance, SECP registration, and corporate law." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-brand-dark text-white overflow-hidden dark-section">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1695487562553-c71a77e6c656" alt="Office Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.div {...hero}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              About <span className="text-gradient-gold">Tax Zilla</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Professional Tax & Legal Consultancy committed to excellence in Pakistan's corporate landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Firm Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: reduce ? 0.01 : 0.55, ease: EASE_OUT }}
            >
              <h2 className="text-4xl font-bold mb-6 text-[var(--color-dark-blue)]" style={{ fontFamily: 'var(--font-heading)' }}>
                Your Trusted Compliance Partner
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Tax Zilla Consultancy is a premier firm based in Lahore, Pakistan, dedicated to providing top-tier tax and legal solutions. We understand the intricacies of Pakistan's regulatory framework, including the Income Tax Ordinance 2001 and Sales Tax Act 1990.
                </p>
                <p>
                  Our mission is to simplify compliance for individuals and businesses, ensuring they navigate the complex legal landscape with confidence and ease. We pride ourselves on ethical practices, transparency, and a client-centric approach.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={getStaggerContainer(reduce)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_REVEAL}
            >
              <motion.div variants={getStaggerItem(reduce)} className="card-surface p-6 text-center">
                <h3 className="text-4xl font-bold text-[var(--color-gold)] mb-2">100%</h3>
                <p className="font-semibold">Compliance Rate</p>
              </motion.div>
              <motion.div variants={getStaggerItem(reduce)} className="card-surface p-6 text-center">
                <h3 className="text-4xl font-bold text-[var(--color-gold)] mb-2">500+</h3>
                <p className="font-semibold">Clients Served</p>
              </motion.div>
              <motion.div variants={getStaggerItem(reduce)} className="card-surface p-6 text-center">
                <h3 className="text-4xl font-bold text-[var(--color-gold)] mb-2">5+</h3>
                <p className="font-semibold">Years Experience</p>
              </motion.div>
              <motion.div variants={getStaggerItem(reduce)} className="card-surface p-6 text-center">
                <h3 className="text-4xl font-bold text-[var(--color-gold)] mb-2">24/7</h3>
                <p className="font-semibold">Support</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading title="Our Areas of Expertise" subtitle="Comprehensive coverage of Pakistan's legal and tax requirements" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BookOpen}
              title="FBR & SECP Compliance"
              description="Deep understanding of federal and provincial tax laws and corporate regulations."
              delay={0}
            />
             <FeatureCard 
              icon={Shield}
              title="Data Confidentiality"
              description="Strict protocols to ensure your financial and legal data remains secure and private."
              delay={0.08}
            />
             <FeatureCard 
              icon={CheckSquare}
              title="Corporate Filings"
              description="End-to-end management of annual returns, audit reports, and statutory filings."
              delay={0.16}
            />
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="section-padding bg-brand-dark text-white dark-section relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="container-custom">
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Why We Are Different</h2>
            <p className="text-on-dark-muted">Setting the standard for professional consultancy in Pakistan</p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REVEAL}
          >
             {[
               "Proactive Compliance Management",
               "Personalized Legal Strategies",
               "Transparent Pricing Structure",
               "Dedicated Case Managers",
               "Rapid Response Time"
             ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={getStaggerItem(reduce)}
                className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[var(--color-gold)]/35 transition-colors duration-300"
              >
                 <Award className="text-[var(--color-gold)] flex-shrink-0" />
                 <span className="font-semibold">{item}</span>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;