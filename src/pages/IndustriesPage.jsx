import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import Button from '../components/Button.jsx';
import { SITE } from '../data/site.js';
import { industries } from '../data/industries.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, revealUp, revealLeft, revealRight, revealScale, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />
);

const STATS = [
  { value: '8', label: 'Industries Served' },
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Clients Helped' },
  { value: 'Remote', label: 'Friendly' },
];

const IndustriesPage = () => {
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(null);

  const displayed = activeId ? industries.filter(i => i.id === activeId) : industries;

  return (
    <>
      <Helmet>
        <title>Industries We Serve — Tax Zilla Consultancy</title>
        <meta name="description" content="Sector-specific tax, legal, and compliance services for IT, manufacturing, retail, healthcare, real estate, exporters, startups, and professional services in Pakistan." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36"
        style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.18),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.08 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6"
          >
            Sector-Specific Expertise
          </motion.div>
          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
            className="px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl leading-tight mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Industries We <span className="text-[var(--color-gold)]">Specialise In</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.24 }}
            className="max-w-2xl mx-auto px-2 text-base text-gray-300 sm:text-lg leading-relaxed mb-8"
          >
            Deep sector knowledge means we speak your business language — and solve the real tax challenges your industry faces.
          </motion.p>
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.44, ease: EASE_OUT, delay: reduce ? 0 : 0.32 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a href={`tel:${SITE.phoneTel}`}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/15 transition-all">
              <Phone size={13} className="text-[var(--color-gold)]" /> {SITE.phone}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/15 transition-all">
              <MessageCircle size={13} className="text-[var(--color-gold)]" /> WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ───────────────────────────────── */}
      <div className="border-b border-white/10" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-4 divide-x divide-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="py-5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-[var(--color-gold)]">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Browse ────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Jump to a sector</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
                activeId === null
                  ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-gold)]/50'
              }`}
            >
              All Industries
            </button>
            {industries.map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveId(activeId === ind.id ? null : ind.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeId === ind.id
                    ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-gold)]/50'
                }`}
              >
                <ind.icon size={12} />
                {ind.title.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Cards ───────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom space-y-8">
          {displayed.map((ind, idx) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: EASE_OUT, delay: reduceMotion ? 0 : idx * 0.06 }}
              className="card-surface overflow-hidden group"
            >
              {/* Gold top bar on hover */}
              <div className="h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />

              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300 flex-shrink-0">
                      <ind.icon size={28} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[var(--color-gold)] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}>
                        {ind.title}
                      </h2>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{ind.services.length} specialist services</p>
                    </div>
                  </div>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-gold)] hover:gap-3 transition-all flex-shrink-0"
                  >
                    View Full Details <ArrowRight size={15} />
                  </Link>
                </div>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{ind.desc}</p>
              </div>

              {/* Challenges + Solutions */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Challenges */}
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                      <AlertCircle size={13} className="text-orange-400" /> Common Challenges
                    </h4>
                    <ul className="space-y-2">
                      {ind.challenges.slice(0, 4).map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-300 mt-2 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Solutions */}
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                      <CheckCircle size={13} className="text-[var(--color-gold)]" /> Our Solutions
                    </h4>
                    <ul className="space-y-2">
                      {ind.solutions.slice(0, 4).map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Services + CTA */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
                style={{ background: 'var(--color-surface-muted)' }}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Key Services</p>
                  <div className="flex flex-wrap gap-2">
                    {ind.services.slice(0, 3).map((svc) => (
                      <span key={svc.title}
                        className="rounded-full border border-[var(--color-gold)]/25 bg-[var(--color-gold)]/8 px-3 py-1 text-[11px] font-semibold text-[var(--color-gold)]">
                        {svc.title}
                      </span>
                    ))}
                    {ind.services.length > 3 && (
                      <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold text-gray-500">
                        +{ind.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <Link to={`/industries/${ind.slug}`}>
                    <Button variant="secondary" size="sm">
                      Full Details <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                  <Button variant="primary" size="sm"
                    onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}>
                    <MessageCircle size={14} className="mr-1" /> Consult Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────── */}
      <section className="relative overflow-hidden py-16 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center" {...revealUp(0, reduceMotion)}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Don't See Your Industry?{' '}
            <span className="text-[var(--color-gold)]">We Still Help.</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Tax Zilla serves clients across all sectors. Contact us and we'll tailor a compliance plan specific to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Book Free Consultation
            </Button>
            <Button variant="outline" size="lg"
              onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}>
              <MessageCircle size={18} className="mr-2" /> WhatsApp Now
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default IndustriesPage;
