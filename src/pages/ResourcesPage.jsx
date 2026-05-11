import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Download, ExternalLink, BookOpen, Search, ArrowRight,
  FileText, Briefcase, Wrench, BarChart3, Phone, MessageCircle,
  ShieldCheck, Zap, Lock, RefreshCw,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import TaxCalculatorModal from '../components/TaxCalculatorModal.jsx';
import { RESOURCE_CATEGORIES, getResourcesByCategory, getCategories } from '../data/resources.js';
import { SITE } from '../data/site.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const HeroGrid = () => (
  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage:
        'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

const STATS = [
  { value: '7+', label: 'Free Resources' },
  { value: 'FBR', label: 'Verified Content' },
  { value: '2025–26', label: 'Updated Rates' },
  { value: '100%', label: 'Free Access' },
];

const FEATURES = [
  { icon: FileText, title: 'Tax Guides', desc: 'Plain-language breakdowns of ITO, sales tax, and withholding rules.' },
  { icon: Briefcase, title: 'Business Guides', desc: 'Step-by-step coverage of SECP, NTN, and provincial registrations.' },
  { icon: Wrench, title: 'FBR Tools', desc: 'Direct links to official FBR portals for verification and status checks.' },
  { icon: BarChart3, title: 'Rate Cards', desc: 'Quick-reference withholding tax rates and slab cards for FY 2025–26.' },
];

const TYPE_STYLES = {
  'Tax Guide':      { bg: 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/25', icon: FileText },
  'Business Guide': { bg: 'bg-blue-50 text-blue-600 border border-blue-100', icon: Briefcase },
  'Tool':           { bg: 'bg-emerald-50 text-emerald-600 border border-emerald-100', icon: Wrench },
  'Compliance Guide': { bg: 'bg-purple-50 text-purple-600 border border-purple-100', icon: ShieldCheck },
  'Reference':      { bg: 'bg-orange-50 text-orange-600 border border-orange-100', icon: BarChart3 },
};

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState(RESOURCE_CATEGORIES.ALL);
  const { reduce, hero } = usePageMotion();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredResources = getResourcesByCategory(activeTab);
  const categories = getCategories();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <>
      <Helmet>
        <title>Resources & Knowledge Base — Tax Zilla Consultancy</title>
        <meta
          name="description"
          content="Free tax guides, compliance checklists, FBR tools, and business resources for Pakistan. Updated for FY 2025-26."
        />
      </Helmet>

      {/* ── Hero ────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36"
        style={{ background: 'var(--color-brand-navy)' }}
      >
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.18),_transparent_60%)]" />
        <HeroGrid />

        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.08 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6"
          >
            Knowledge Base & Free Tools
          </motion.div>

          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
            className="px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Resources & Guides
          </motion.h1>

          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.24 }}
            className="mt-5 max-w-2xl mx-auto px-2 text-base text-gray-300 sm:text-lg leading-relaxed"
          >
            Free tax guides, FBR tools, and business resources — verified for FY 2025–26 and available at no cost.
          </motion.p>

          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.44, ease: EASE_OUT, delay: reduce ? 0 : 0.32 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href={`tel:${SITE.phoneTel}`}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/15 transition-all"
            >
              <Phone size={13} className="text-[var(--color-gold)]" />
              {SITE.phone}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/15 transition-all"
            >
              <MessageCircle size={13} className="text-[var(--color-gold)]" />
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ───────────────────────────────── */}
      <div className="border-b border-white/10" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-4 divide-x divide-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="py-5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-[var(--color-gold)]">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What's Inside ───────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What You'll Find Here
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-lg mx-auto">
              Everything organised so you can find what you need quickly.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_REVEAL}
                transition={{ duration: reduce ? 0.01 : 0.4, ease: EASE_OUT }}
                className="card-surface p-5 text-center group hover:border-[var(--color-gold)]/40 transition-colors"
              >
                <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                  <f.icon size={22} />
                </div>
                <h3 className="font-bold text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resources Grid ──────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">

          {/* Filter tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all sm:px-6 ${
                  activeTab === tab
                    ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg shadow-[rgba(212,175,55,0.25)]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-brand-navy)]'
                }`}
              >
                {tab === 'All' ? 'All Resources' : `${tab}s`}
              </button>
            ))}
          </div>

          {/* Count */}
          <div className="text-center mb-8">
            <p className="text-sm text-[var(--color-text-muted)]">
              Showing{' '}
              <span className="font-bold" style={{ color: 'var(--color-brand-navy)' }}>
                {filteredResources.length}
              </span>{' '}
              resource{filteredResources.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Cards */}
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            animate="visible"
          >
            {filteredResources.map((res) => {
              const typeStyle = TYPE_STYLES[res.type] || TYPE_STYLES['Tool'];
              const TypeIcon = typeStyle.icon;

              return (
                <motion.div
                  key={res.id}
                  variants={getStaggerItem(reduce)}
                  whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.2, ease: EASE_OUT } }}
                  className="group relative card-surface flex flex-col p-6 overflow-hidden"
                >
                  {/* Gold top hover bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300 flex-shrink-0">
                      {res.type === 'Tool' ? <Search size={22} /> : <BookOpen size={22} />}
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${typeStyle.bg}`}>
                      <TypeIcon size={10} />
                      {res.type}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[var(--color-gold)] transition-colors leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {res.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed flex-grow">
                    {res.desc}
                  </p>

                  {/* CTA */}
                  {res.isModal ? (
                    <button
                      type="button"
                      onClick={() => setIsCalculatorOpen(true)}
                      className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-sm hover:shadow-md"
                    >
                      Open Calculator <Search size={15} />
                    </button>
                  ) : res.external ? (
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-sm hover:shadow-md"
                    >
                      Access Tool <ExternalLink size={15} />
                    </a>
                  ) : (
                    <a
                      href={res.link}
                      className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-sm hover:shadow-md"
                    >
                      Download PDF <Download size={15} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter CTA ──────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'var(--color-brand-navy)' }}
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_REVEAL}
            transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT }}
          >
            <div className="absolute inset-0 bg-brand-overlay opacity-60" />
            <HeroGrid />

            <div className="relative z-10 p-8 sm:p-12 dark-section">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-5">
                    Newsletter
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Stay updated with{' '}
                    <span className="text-[var(--color-gold)]">Pakistan Tax Changes</span>
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Get FBR updates, new tax slabs, and compliance reminders delivered straight to your inbox. No spam — just what matters.
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    {['FBR Rate Updates', 'New Guides', 'Compliance Alerts', 'Free Resources'].map((tag) => (
                      <span key={tag} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: form */}
                <div>
                  {subscribed ? (
                    <div className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 p-6 text-center">
                      <div className="text-3xl mb-3">✓</div>
                      <h4 className="text-lg font-bold text-white mb-1">You're subscribed!</h4>
                      <p className="text-gray-300 text-sm">We'll send you the latest tax updates.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 transition-all"
                        />
                      </div>
                      <Button type="submit" variant="primary" className="w-full justify-center">
                        Subscribe — It's Free
                      </Button>
                      <p className="text-[10px] text-gray-500 text-center">
                        No spam. Unsubscribe anytime.
                      </p>
                    </form>
                  )}

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 border-t border-white/10" />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">or contact us directly</span>
                    <div className="flex-1 border-t border-white/10" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-[var(--color-gold)]/40 transition-all group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                        <Phone size={14} />
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-wider">Call</div>
                        <div className="text-xs font-bold text-white leading-tight">{SITE.phone}</div>
                      </div>
                    </a>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-[var(--color-gold)]/40 transition-all group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                        <MessageCircle size={14} />
                      </div>
                      <div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-wider">WhatsApp</div>
                        <div className="text-xs font-bold text-white leading-tight">Chat Now</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TaxCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
};

export default ResourcesPage;
