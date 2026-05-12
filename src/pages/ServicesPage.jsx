import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText, MapPin, Building2, Shield, Settings, Wrench,
  Scale, Globe, Users, CheckCircle, User, Search, TrendingUp,
  FileCheck, Landmark, ArrowRight, MessageCircle, Phone, Mail,
  ShieldCheck, Clock, Award, UserCheck,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import { SERVICE_CATEGORIES, getSubservicesByCategory, SERVICE_SUBSERVICES } from '../data/serviceCatalog.js';
import { SITE } from '../data/site.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const ICON_MAP = {
  'tax-services-pakistan': FileText,
  'provincial-sales-tax': MapPin,
  'corporate-business-services': Building2,
  'intellectual-property': Shield,
  'software-it-services': Settings,
  'engineering-services': Wrench,
  'legal-services': Scale,
  'visa-immigration-tax-services': Globe,
  'overseas-pakistani-tax-services': Users,
  'certificates-compliance': CheckCircle,
  'individual-tax-services': User,
  'high-demand-individual-services': User,
  'audit-investigation': Search,
  'business-tax-planning': TrendingUp,
  'additional-registrations': FileCheck,
  'uae-tax-services': Globe,
  'usa-tax-services': Landmark,
  'ksa-tax-services': Landmark,
};

const AREA_LABELS = {
  'uae-tax-services': 'UAE',
  'usa-tax-services': 'USA',
  'ksa-tax-services': 'Saudi Arabia',
};

/* ── Row 1: Category filters ─────────────────────────── */
const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Services', slugs: [] },
  {
    id: 'tax',
    label: 'Tax & Compliance',
    slugs: [
      'tax-services-pakistan',
      'provincial-sales-tax',
      'individual-tax-services',
      'high-demand-individual-services',
      'certificates-compliance',
      'audit-investigation',
      'business-tax-planning',
    ],
  },
  {
    id: 'corporate',
    label: 'Corporate & Legal',
    slugs: [
      'corporate-business-services',
      'intellectual-property',
      'legal-services',
      'additional-registrations',
      'software-it-services',
      'engineering-services',
    ],
  },
  {
    id: 'international',
    label: 'International',
    slugs: [
      'visa-immigration-tax-services',
      'overseas-pakistani-tax-services',
      'uae-tax-services',
      'usa-tax-services',
      'ksa-tax-services',
      'uk-tax-services',
    ],
  },
];

/* ── Row 2: Country filters ──────────────────────────── */
const COUNTRY_FILTERS = [
  {
    id: 'all-countries', label: 'All Countries', flag: '🌍',
    slugs: [], href: null,
  },
  {
    id: 'pakistan', label: 'Pakistan', flag: '🇵🇰', href: null,
    slugs: [
      'tax-services-pakistan', 'provincial-sales-tax', 'individual-tax-services',
      'high-demand-individual-services', 'certificates-compliance',
      'audit-investigation', 'business-tax-planning', 'corporate-business-services',
      'intellectual-property', 'legal-services', 'additional-registrations',
      'software-it-services', 'engineering-services',
      'visa-immigration-tax-services', 'overseas-pakistani-tax-services',
    ],
  },
  { id: 'uae', label: 'UAE',          flag: '🇦🇪', href: null, slugs: ['uae-tax-services'], categoryId: 'uae-tax-services' },
  { id: 'usa', label: 'USA',          flag: '🇺🇸', href: null, slugs: ['usa-tax-services'], categoryId: 'usa-tax-services' },
  { id: 'ksa', label: 'Saudi Arabia', flag: '🇸🇦', href: null, slugs: ['ksa-tax-services'], categoryId: 'ksa-tax-services' },
  { id: 'uk',  label: 'UK',           flag: '🇬🇧', href: null, slugs: ['uk-tax-services'],  categoryId: 'uk-tax-services'  },
];

const TRUST_STATS = [
  { value: '500+', label: 'Satisfied Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '70+', label: 'Services Offered' },
  { value: '24/7', label: 'WhatsApp Support' },
];

const WHY_US = [
  { icon: ShieldCheck, title: 'Compliance-First', desc: 'Every service aligned with FBR, SECP, ZATCA, and all regulatory bodies.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Clear timelines, proactive updates, and on-time delivery — always.' },
  { icon: UserCheck, title: 'Dedicated Expert', desc: 'One consultant owns your case from documents to final confirmation.' },
  { icon: Award, title: 'Proven Track Record', desc: '500+ satisfied clients across Pakistan, UAE, USA, and Saudi Arabia.' },
];

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

const ServicesPage = () => {
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCountry, setActiveCountry] = useState('all-countries');
  const [searchQuery, setSearchQuery] = useState('');

  const catConfig     = CATEGORY_FILTERS.find((f) => f.id === activeFilter);
  const countryConfig = COUNTRY_FILTERS.find((f) => f.id === activeCountry);

  const q = searchQuery.trim().toLowerCase();

  const visibleCategories = SERVICE_CATEGORIES.filter((c) => {
    const passCategory = activeFilter === 'all' || catConfig?.slugs.includes(c.slug);
    const passCountry  = activeCountry === 'all-countries' || countryConfig?.slugs.includes(c.slug);
    const passSearch   = !q || c.title.toLowerCase().includes(q) || c.shortDesc?.toLowerCase().includes(q);
    return passCategory && passCountry && passSearch;
  });

  return (
    <>
      <Helmet>
        <title>Our Services — Tax Zilla Consultancy</title>
        <meta
          name="description"
          content="Comprehensive tax, corporate, legal, and international compliance services for businesses and individuals across Pakistan, UAE, USA, and Saudi Arabia."
        />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36">
        <div className="absolute inset-0 bg-brand-dark" />
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
            Trusted Advisory Studio
          </motion.div>

          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
            className="px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Professional Services
          </motion.h1>

          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.24 }}
            className="mt-5 max-w-2xl mx-auto px-2 text-base text-gray-300 sm:text-lg leading-relaxed"
          >
            Expert tax, corporate, legal, and international compliance solutions across
            Pakistan, UAE, USA, and Saudi Arabia.
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

      {/* ── Trust Stats ───────────────────────────────── */}
      <div style={{ background: 'var(--color-brand-navy)' }} className="border-b border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-4 divide-x divide-white/10">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="py-5 text-center">
                <div className="text-xl sm:text-2xl font-bold text-[var(--color-gold)]">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter + Grid ─────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          {/* ── Row 1: Category filters ── */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            {CATEGORY_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => { setActiveFilter(filter.id); setActiveCountry('all-countries'); }}
                className={`rounded-full border px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg shadow-[rgba(212,175,55,0.25)]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-brand-navy)]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* ── Row 2: Country filters (smaller) ── */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10">
            {COUNTRY_FILTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => { setActiveCountry(c.id); setActiveFilter('all'); }}
                className={`rounded-full border px-3 py-1 text-[10px] font-semibold transition-all flex items-center gap-1.5 ${
                  activeCountry === c.id
                    ? 'bg-[var(--color-brand-navy)] text-[var(--color-gold)] border-[var(--color-brand-navy)]'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-[var(--color-brand-navy)]/40 hover:text-[var(--color-brand-navy)]'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* ── Search bar ── */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative group">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-gold)] transition-colors pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services — try 'NTN', 'VAT', 'company', 'UK'..."
                className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center text-xs text-gray-400 mt-2">
                {visibleCategories.length === 0
                  ? 'No services found — try a different keyword'
                  : `${visibleCategories.length} service${visibleCategories.length !== 1 ? 's' : ''} match "${searchQuery}"`}
              </p>
            )}
          </div>

          {/* ── Subservice grid (country selected) ── */}
          {countryConfig?.categoryId ? (() => {
            const subs = SERVICE_SUBSERVICES.filter(s =>
              s.categoryId === countryConfig.categoryId &&
              (!q || s.title.toLowerCase().includes(q) || s.shortDesc?.toLowerCase().includes(q))
            );
            return (
              <>
                <div className="text-center mb-8">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Showing <span className="font-bold text-gray-900">{subs.length}</span> services for{' '}
                    <span className="font-bold text-gray-900">{countryConfig.flag} {countryConfig.label}</span>
                  </p>
                </div>
                <motion.div
                  key={activeCountry}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={getStaggerContainer(reduce)}
                  initial="hidden"
                  animate="visible"
                >
                  {subs.map((sub) => (
                    <motion.div
                      key={sub.slug}
                      variants={getStaggerItem(reduce)}
                      whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.2, ease: EASE_OUT } }}
                      className="group relative card-surface p-6 flex flex-col overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/services/${sub.slug}`)}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                      {/* Icon + badge */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                          <FileText size={22} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">
                          Service
                        </span>
                      </div>

                      <h3
                        className="text-base font-bold mb-2 leading-snug group-hover:text-[var(--color-gold)] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {sub.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] mb-5 flex-grow leading-relaxed">
                        {sub.shortDesc}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-sm font-bold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                          View Details <ArrowRight size={13} />
                        </span>
                        <button
                          type="button"
                          aria-label="WhatsApp enquiry"
                          onClick={(e) => { e.stopPropagation(); window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer'); }}
                          className="h-8 w-8 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-all"
                        >
                          <MessageCircle size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            );
          })() : (
          <>
          {/* ── Category grid (default) ── */}
          <div className="text-center mb-8">
            <p className="text-sm text-[var(--color-text-muted)]">
              Showing{' '}
              <span className="font-bold text-gray-900">{visibleCategories.length}</span>{' '}
              service {visibleCategories.length === 1 ? 'category' : 'categories'}
            </p>
          </div>
          <motion.div
            key={activeFilter + activeCountry}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={getStaggerContainer(reduce)}
            initial="hidden"
            animate="visible"
          >
            {visibleCategories.map((category) => {
              const Icon = ICON_MAP[category.slug] || FileText;
              const subCount = getSubservicesByCategory(category.id).length;
              const areaLabel = AREA_LABELS[category.slug];
              return (
                <motion.div
                  key={category.id}
                  variants={getStaggerItem(reduce)}
                  whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.2, ease: EASE_OUT } }}
                  className="group relative card-surface p-6 flex flex-col overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/services/${category.slug}`)}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                  {areaLabel && (
                    <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/25">
                      {areaLabel}
                    </div>
                  )}
                  <div className="mb-5 h-14 w-14 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300 flex-shrink-0">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    {category.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4 flex-grow leading-relaxed">{category.shortDesc}</p>
                  {subCount > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 font-medium">
                      <FileText size={11} className="text-[var(--color-gold)]" />
                      <span>{subCount} service{subCount !== 1 ? 's' : ''} included</span>
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-sm font-bold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                      Explore <ArrowRight size={14} />
                    </span>
                    <button type="button" aria-label="WhatsApp enquiry"
                      onClick={(e) => { e.stopPropagation(); window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer'); }}
                      className="h-8 w-8 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-all"
                    >
                      <MessageCircle size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          </>
          )}
        </div>
      </section>

      {/* ── Why Tax Zilla ─────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Why Clients Choose{' '}
              <span className="text-[var(--color-gold)]">Tax Zilla</span>
            </h2>
            <p className="mt-3 text-[var(--color-text-muted)] max-w-xl mx-auto text-sm sm:text-base">
              Over a decade of trusted expertise in tax, legal, and compliance services across Pakistan and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_REVEAL}
                transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT }}
                className="card-surface p-6 text-center group hover:border-[var(--color-gold)]/40 transition-colors"
              >
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                  <item.icon size={26} />
                </div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark CTA ──────────────────────────────────── */}
      <section
        className="relative py-16 overflow-hidden dark-section"
        style={{ background: 'var(--color-brand-navy)' }}
      >
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <HeroGrid />

        <motion.div
          className="container-custom relative z-10"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left copy */}
            <div>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Not sure which service{' '}
                <span className="text-[var(--color-gold)]">you need?</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-7">
                Talk to a specialist for free. We assess your requirements, recommend
                the right services, and share a clear plan — before any commitment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                  Book Free Consultation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
                >
                  <MessageCircle size={18} className="mr-2" /> WhatsApp Now
                </Button>
              </div>
            </div>

            {/* Right contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all group"
              >
                <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Call / WhatsApp</div>
                  <div className="text-sm font-bold text-white">{SITE.phone}</div>
                </div>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all group"
              >
                <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Email</div>
                  <div className="text-sm font-bold text-white break-all">{SITE.email}</div>
                </div>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:col-span-2 flex items-center justify-center gap-3 rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 p-4 hover:bg-[var(--color-gold)]/20 transition-all"
              >
                <MessageCircle size={18} className="text-[var(--color-gold)]" />
                <span className="text-sm font-bold text-white">Chat on WhatsApp — Instant Response</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ServicesPage;
