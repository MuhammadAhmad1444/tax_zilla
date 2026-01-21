import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, BookOpen, Search } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const resources = [
    {
      title: "Income Tax Ordinance 2001 (Overview)",
      type: "Tax Guide",
      desc: "A simplified breakdown of the key sections of Pakistan's primary income tax law.",
      link: "#" 
    },
    {
      title: "Active Taxpayer List (ATL) Check",
      type: "Tool",
      desc: "Direct link to FBR's portal to check your current ATL status.",
      link: "https://e.fbr.gov.pk/",
      external: true
    },
    {
      title: "Sales Tax Registration Guide",
      type: "Compliance Guide",
      desc: "Step-by-step checklist for registering for Sales Tax (STRN).",
      link: "#"
    },
    {
      title: "Starting a Business in Pakistan",
      type: "Business Guide",
      desc: "Comprehensive guide covering SECP, FBR, and provincial registrations.",
      link: "#"
    },
    {
      title: "Withholding Tax Rates Card (2025-26)",
      type: "Reference",
      desc: "Quick reference card for common withholding tax rates on services and supplies.",
      link: "#"
    },
    {
      title: "Freelancer Tax Benefits",
      type: "Tax Guide",
      desc: "Detailed explanation of Clause 133 and PSEB registration benefits.",
      link: "#"
    }
  ];

  const filteredResources = activeTab === 'All' 
    ? resources 
    : resources.filter(r => r.type.includes(activeTab) || (activeTab === 'Guides' && r.type.includes('Guide')));

  return (
    <>
      <Helmet>
        <title>Resources & Knowledge Base - Tax Zilla Consultancy</title>
        <meta name="description" content="Access free tax guides, compliance checklists, and business resources for Pakistan's legal landscape." />
      </Helmet>

      <section className="pt-32 pb-20 bg-[var(--color-dark-blue)] text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493882552576-fce827c6161e')] bg-cover bg-center opacity-15"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Knowledge Base
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Empowering you with the information you need to make informed decisions.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Tax Guide', 'Business Guide', 'Tool'].map(tab => (
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
            {filteredResources.map((res, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col"
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
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-[var(--color-dark-blue)] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Need a Specific Guide?</h3>
            <p className="mb-6 text-gray-300">Subscribe to our newsletter to get the latest tax updates delivered to your inbox.</p>
            <div className="max-w-md mx-auto flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-lg text-black focus:outline-none"
              />
              <Button variant="primary" size="md">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourcesPage;