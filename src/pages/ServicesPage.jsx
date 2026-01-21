import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Building2, Scale, Shield, TrendingUp, Briefcase } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: FileText,
      title: 'Income Tax Filing',
      desc: 'Complete income tax return filing for individuals (salaried & business) and companies.',
      path: '/services/income-tax'
    },
    {
      icon: Users,
      title: 'NTN Registration',
      desc: 'Fast-track NTN registration and profile creation on FBR Iris portal.',
      path: '/services/ntn-registration'
    },
    {
      icon: TrendingUp,
      title: 'Sales Tax Services',
      desc: 'Monthly sales tax returns (GST) and PRA/SRB compliance.',
      path: '/services/sales-tax'
    },
    {
      icon: Building2,
      title: 'Company Registration',
      desc: 'Private Limited, SMC, and Partnership registration with SECP.',
      path: '/services/company-registration'
    },
    {
      icon: Scale,
      title: 'Business Compliance',
      desc: 'Form 29, Form A, and annual statutory compliance management.',
      path: '/services/business-compliance'
    },
    {
      icon: Shield,
      title: 'Audit Assistance',
      desc: 'Defense and representation against FBR audit notices and inquiries.',
      path: '/services/audit-assistance'
    },
    {
      icon: Briefcase,
      title: 'Freelancers & SMEs',
      desc: 'Specialized tax packages for freelancers, IT exporters, and startups.',
      path: '/services/freelancers-sme'
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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