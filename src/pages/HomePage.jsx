import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../components/Button.jsx';
import ClientTestimonials from '../components/ClientTestimonials.jsx';
import {
  usePageMotion,
  EASE_OUT,
  VIEWPORT_REVEAL,
  getStaggerContainer,
  getStaggerItem,
} from '../lib/motion.js';

const HomePage = () => {
  const navigate = useNavigate();
  const { reduce, reveal, revealShort } = usePageMotion();

  const services = [
    {
      title: 'Income Tax Filing',
      description: 'Expert filing for individuals & businesses in compliance with Income Tax Ordinance 2001.',
      icon: FileText,
      path: '/services/income-tax',
    },
    {
      title: 'Company Registration',
      description: 'Seamless SECP company incorporation and legal structuring.',
      icon: Building2,
      path: '/services/company-registration',
    },
    {
      title: 'Sales Tax Services',
      description: 'Monthly sales tax returns and GST registration under Sales Tax Act 1990.',
      icon: TrendingUp,
      path: '/services/sales-tax',
    },
  ];

  const processSteps = [
    'Initial Consultation & Assessment',
    'Document Gathering & Verification',
    'Expert Filing & Compliance Check',
  ];

  return (
    <>
      <Helmet>
        <title>Tax Zilla - Reliable Tax & Legal Consultancy in Pakistan</title>
        <meta
          name="description"
          content="Expert tax and legal consultancy in Pakistan. FBR compliance, income tax filing, company registration, and legal advisory services in Lahore."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark-section">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed tz-hero-bg-motion"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1686149115308-bfdb03c8582e)',
          }}
        >
          <div className="absolute inset-0 bg-brand-dark opacity-95" />
          <div className="absolute inset-0 bg-brand-overlay opacity-75" />
        </div>

        <div className="relative z-10 container-custom px-4 pt-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={getStaggerItem(reduce)} className="inline-block mb-4">
              <div className="relative overflow-hidden rounded-full border border-[var(--color-gold)] bg-black/50 px-4 py-1 backdrop-blur-sm tz-pill-shimmer">
                <span className="relative z-10 text-[var(--color-gold)] text-sm font-medium uppercase tracking-widest">
                  Premier Consultancy in Lahore
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={getStaggerItem(reduce)}
              className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Simplify Your <br />
              <span className="text-gradient-gold">Tax & Legal Compliance</span>
            </motion.h1>

            <motion.p
              variants={getStaggerItem(reduce)}
              className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-2xl"
            >
              We handle FBR, SECP, and legal complexities so you can focus on growing your business.
            </motion.p>

            <motion.div
              variants={getStaggerItem(reduce)}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact')}
                className="w-full font-bold sm:w-auto"
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
            </motion.div>

            <motion.div
              variants={getStaggerItem(reduce)}
              className="mt-16 flex flex-wrap justify-center gap-8 border-t border-white/10 pt-8 md:gap-12"
            >
              {[
                { n: '100%', l: 'Confidential' },
                { n: '500+', l: 'Clients' },
                { n: '5+', l: 'Years Exp.' },
              ].map((s) => (
                <div key={s.l} className="text-center opacity-90">
                  <p className="text-2xl font-bold text-white">{s.n}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-400">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro / Services Teaser */}
      <section className="section-padding relative z-20 -mt-10 rounded-t-[3rem] bg-white">
        <div className="container-custom">
          <motion.div {...reveal} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Comprehensive Solutions</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              From individual filing to corporate registration, we cover the full spectrum of Pakistani tax laws.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REVEAL}
          >
            {services.map((service) => (
              <motion.div
                key={service.path}
                variants={getStaggerItem(reduce)}
                whileHover={reduce ? undefined : { y: -8, transition: { duration: 0.25, ease: EASE_OUT } }}
                className="group rounded-xl border border-gray-100 bg-white p-8 shadow-xl transition-shadow duration-300 hover:border-[var(--color-gold)] hover:shadow-2xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-[var(--color-gold)]">
                  <service.icon size={28} className="text-[var(--color-dark-blue)] group-hover:text-black" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="mb-6 text-sm text-gray-600">{service.description}</p>
                <button
                  type="button"
                  onClick={() => navigate(service.path)}
                  className="flex items-center text-sm font-bold text-[var(--color-dark-blue)] transition-all group-hover:gap-2"
                >
                  Learn More <ArrowRight size={16} className="ml-1" />
                </button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...revealShort} className="mt-12 text-center">
            <Button variant="secondary" onClick={() => navigate('/services')}>
              View All Services
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process Section Preview */}
      <section className="relative overflow-hidden bg-brand-dark py-20 text-white dark-section">
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: reduce ? 0.01 : 0.58, ease: EASE_OUT }}
            >
              <h2 className="mb-6 text-3xl font-bold md:text-5xl">Streamlined Process for Maximum Efficiency</h2>
              <p className="mb-8 text-lg text-on-dark-muted">
                We don&apos;t just file papers; we guide you through a proven methodology designed to minimize risk and
                maximize compliance.
              </p>

              <motion.div
                className="space-y-6"
                variants={getStaggerContainer(reduce)}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_REVEAL}
              >
                {processSteps.map((step, i) => (
                  <motion.div key={step} variants={getStaggerItem(reduce)} className="relative z-10 flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] font-bold text-black">
                      {i + 1}
                    </div>
                    <p className="text-lg font-semibold">{step}</p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="relative z-10 mt-10">
                <Button variant="primary" onClick={() => navigate('/our-process')}>
                  See Full Process
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: reduce ? 0.01 : 0.6, ease: EASE_OUT, delay: reduce ? 0 : 0.08 }}
            >
              <div className="absolute inset-0 rotate-3 rounded-2xl bg-[var(--color-gold)] opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1554224155-a1487473ffd9"
                alt="Working on documents"
                className="relative z-10 rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <ClientTestimonials />
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[var(--color-gold)] py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <motion.div
          className="container-custom relative z-10 text-center"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ duration: reduce ? 0.01 : 0.55, ease: EASE_OUT }}
        >
          <h2 className="mb-6 text-3xl font-bold text-black md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Get Compliant?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl font-medium text-black/80">
            Join the growing number of businesses in Pakistan who trust Tax Zilla.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="border-2 border-black bg-transparent px-10 py-4 text-lg text-black hover:bg-black hover:text-[var(--color-gold)]"
              onClick={() => navigate('/contact')}
            >
              Contact Us Now
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;
