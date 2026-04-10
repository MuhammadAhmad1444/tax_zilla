import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, ClipboardList, Settings, CheckCircle, Headphones } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';

const OurProcessPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Initial Consultation",
      desc: "We begin with a thorough discussion to understand your specific tax or legal needs. We assess your current status and identify the best course of action.",
      icon: MessageSquare,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "Information Gathering",
      desc: "You provide the necessary documents (CNIC, bank statements, bills, etc.). We provide a clear checklist so you know exactly what is needed.",
      icon: FileText,
      color: "from-indigo-400 to-indigo-600"
    },
    {
      id: 3,
      title: "Analysis & Planning",
      desc: "Our experts analyze your financial data to maximize legal tax credits and ensure full compliance with current laws (Income Tax Ordinance/Companies Act).",
      icon: ClipboardList,
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "Execution & Filing",
      desc: "We prepare the drafts, register your company, or file your returns on the FBR/SECP portals. We handle all technical aspects.",
      icon: Settings,
      color: "from-pink-400 to-pink-600"
    },
    {
      id: 5,
      title: "Quality Assurance",
      desc: "Every filing undergoes a double-check by a senior consultant to ensure accuracy and prevent future audit risks.",
      icon: CheckCircle,
      color: "from-red-400 to-red-600"
    },
    {
      id: 6,
      title: "Delivery & Support",
      desc: "We deliver the final proofs (acknowledgment slips, certificates) and remain available for any post-service queries or support.",
      icon: Headphones,
      color: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Process - Tax Zilla Consultancy</title>
        <meta name="description" content="Understand the step-by-step process of working with Tax Zilla. From consultation to delivery, we ensure a smooth, transparent, and professional experience." />
      </Helmet>

      <section className="pt-32 pb-20 bg-[var(--color-dark-blue)] text-white relative overflow-hidden dark-section">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224154-22dec7ec8818')] bg-cover bg-center opacity-20"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Workflow
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            A transparent, streamlined journey designed to give you peace of mind.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading title="How We Work" subtitle="Six simple steps to complete compliance" />

          <div className="relative max-w-5xl mx-auto mt-16">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 w-full">
                    <div className={`bg-white p-8 rounded-xl shadow-lg border-t-4 border-[var(--color-gold)] hover:shadow-2xl transition-all ${
                      index % 2 === 0 ? 'text-left md:text-left' : 'text-left md:text-right'
                    }`}>
                      <h3 className="text-2xl font-bold mb-3 text-[var(--color-dark-blue)]">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl ring-4 ring-white`}>
                      <step.icon size={28} />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 font-bold text-gray-400">
                      Step {step.id}
                    </div>
                  </div>

                  <div className="flex-1 w-full hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden bg-brand-dark dark-section">
            <div className="absolute inset-0 opacity-85 bg-brand-overlay" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--color-gold)]/18 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/40 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-on-dark-muted mb-8">
                Let us handle the complexities while you focus on what you do best.
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/contact')}
                className="px-10 py-4 font-bold text-lg"
              >
                Start Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurProcessPage;