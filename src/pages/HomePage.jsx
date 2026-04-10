import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Building2, Scale, Shield, TrendingUp, DollarSign, Award, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ClientTestimonials from '../components/ClientTestimonials.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Income Tax Filing',
      description: 'Expert filing for individuals & businesses in compliance with Income Tax Ordinance 2001.',
      icon: FileText,
      path: '/services/income-tax'
    },
    {
      title: 'Company Registration',
      description: 'Seamless SECP company incorporation and legal structuring.',
      icon: Building2,
      path: '/services/company-registration'
    },
    {
      title: 'Sales Tax Services',
      description: 'Monthly sales tax returns and GST registration under Sales Tax Act 1990.',
      icon: TrendingUp,
      path: '/services/sales-tax'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tax Zilla - Reliable Tax & Legal Consultancy in Pakistan</title>
        <meta name="description" content="Expert tax and legal consultancy in Pakistan. FBR compliance, income tax filing, company registration, and legal advisory services in Lahore." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark-section">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1686149115308-bfdb03c8582e)' }}
        >
          <div className="absolute inset-0 bg-brand-dark opacity-95" />
          <div className="absolute inset-0 bg-brand-overlay opacity-75" />
        </div>

        <div className="relative z-10 container-custom px-4 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-4 px-4 py-1 border border-[var(--color-gold)] rounded-full bg-black/50 backdrop-blur-sm">
               <span className="text-[var(--color-gold)] font-medium text-sm tracking-widest uppercase">
                 Premier Consultancy in Lahore
               </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Simplify Your <br /> 
              <span className="text-gradient-gold">Tax & Legal Compliance</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              We handle FBR, SECP, and legal complexities so you can focus on growing your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto font-bold"
              >
                Book a Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/services')}
                className="w-full sm:w-auto"
              >
                Explore Services
              </Button>
            </div>

            {/* Trust Badges - Hero Footer */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-12 opacity-80">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Confidential</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Clients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">5+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Years Exp.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro / Services Teaser */}
      <section className="section-padding bg-white relative z-20 -mt-10 rounded-t-[3rem]">
        <div className="container-custom">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Solutions</h2>
             <p className="text-gray-600 max-w-2xl mx-auto">From individual filing to corporate registration, we cover the full spectrum of Pakistani tax laws.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 hover:border-[var(--color-gold)] transition-all group"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--color-gold)] transition-colors">
                  <service.icon size={28} className="text-[var(--color-dark-blue)] group-hover:text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{service.description}</p>
                <button 
                  onClick={() => navigate(service.path)}
                  className="flex items-center text-[var(--color-dark-blue)] font-bold text-sm group-hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight size={16} className="ml-1" />
                </button>
              </motion.div>
            ))}
           </div>
           
           <div className="text-center mt-12">
             <Button variant="secondary" onClick={() => navigate('/services')}>View All Services</Button>
           </div>
        </div>
      </section>

      {/* Process Section Preview */}
      <section className="py-20 bg-brand-dark text-white dark-section relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Streamlined Process for Maximum Efficiency</h2>
              <p className="text-on-dark-muted text-lg mb-8">We don't just file papers; we guide you through a proven methodology designed to minimize risk and maximize compliance.</p>
              
              <div className="space-y-6">
                 {[
                   "Initial Consultation & Assessment",
                   "Document Gathering & Verification",
                   "Expert Filing & Compliance Check"
                 ].map((step, i) => (
                   <div key={i} className="flex items-center gap-4 relative z-10">
                     <div className="w-10 h-10 rounded-full bg-[var(--color-gold)] text-black flex items-center justify-center font-bold">
                       {i+1}
                     </div>
                     <p className="font-semibold text-lg">{step}</p>
                   </div>
                 ))}
              </div>
              
              <div className="mt-10 relative z-10">
                <Button variant="primary" onClick={() => navigate('/our-process')}>See Full Process</Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--color-gold)] rounded-2xl transform rotate-3 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1554224155-a1487473ffd9" 
                alt="Working on documents" 
                className="relative rounded-2xl shadow-2xl z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <ClientTestimonials />
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-gold)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Get Compliant?
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto font-medium">
            Join the growing number of businesses in Pakistan who trust Tax Zilla.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-black hover:text-[var(--color-gold)] border-2 px-10 py-4 text-lg bg-transparent"
              onClick={() => navigate('/contact')}
            >
              Contact Us Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;