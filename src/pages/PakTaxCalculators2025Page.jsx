import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePageMotion, EASE_OUT } from '../lib/motion.js';
import {
  Droplets, Phone, Shield, Store, Users, Landmark, BriefcaseBusiness,
  CreditCard, Building2, Wrench, Scale, FileText,
  ArrowLeft, ArrowRight, ShieldCheck, CheckCircle, MessageCircle,
  Calculator, Star, Mail, Zap, Lock, ChevronRight,
} from 'lucide-react';
import '../styles/paktax.css';
import Button from '../components/Button.jsx';
import { SITE } from '../data/site.js';
import {
  SalaryTaxCalculator2025,
  BusinessTaxCalculator2025,
  FreelancerTaxCalculator2025,
  SuperTaxCalculator2025,
  CompanyIncomeTaxCalculator2025,
  GainTaxOnSecuritiesCalculator2025,
  GainTaxOnMutualFundsCalculator2025,
  GainTaxOnPropertiesCalculator2025,
  WithholdingTaxOnIncomeFromPropertiesCalculator2025,
  WithholdingTaxOnBrokerageCommissionCalculator2025,
  BuilderTaxCalculator2025,
  AgriculturalLandPunjabTaxCalculator2025,
  ZakatCalculator2025,
} from '../components/paktax/Calculators2025.jsx';
import { PtaTaxCalculator2025 } from '../components/paktax/calculators2025/PtaTaxCalculator2025.jsx';
import { FbrOnlineVerifications } from '../components/paktax/calculators2025/FbrOnlineVerifications.jsx';
import { SupplyOfGoodsTaxCalculator } from '../components/paktax/calculators2025/SupplyOfGoodsTaxCalculator.jsx';
import { ValueAddedTaxCalculator } from '../components/paktax/calculators2025/ValueAddedTaxCalculator.jsx';

/* ── Shared decorative grid overlay ─────────────────────── */
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

const HERO_STATS = [
  { value: '17', label: 'Free Calculators' },
  { value: 'FY 2025–26', label: 'Official FBR Rates' },
  { value: '100%', label: 'Free to Use' },
  { value: '24/7', label: 'Expert Support' },
];

const WHY_US = [
  { icon: ShieldCheck, title: 'FBR Official Rates', desc: 'All calculators use the latest FBR income tax slabs and withholding rates for FY 2025–26.' },
  { icon: Zap, title: 'Instant Results', desc: 'Get your tax estimate in seconds — no sign-up, no login, completely free to use.' },
  { icon: Lock, title: 'Private & Secure', desc: 'No data is stored or shared. Your figures stay on your device at all times.' },
  { icon: MessageCircle, title: 'Expert Support', desc: 'Not sure about your calculation? Our consultants are one WhatsApp message away.' },
];

const FILTER_TABS = [
  { id: 'All', label: 'All Calculators', ids: [] },
  { id: 'Income Tax', label: 'Income Tax', ids: ['salary', 'business', 'freelancer', 'super-tax', 'company-income'] },
  { id: 'Capital Gains', label: 'Capital Gains', ids: ['gain-securities', 'gain-mutual-funds', 'gain-properties'] },
  { id: 'Withholding', label: 'Withholding', ids: ['withholding-income-properties', 'withholding-brokerage-commission', 'value-added-tax'] },
  { id: 'Other', label: 'Other', ids: ['pta', 'zakat', 'fbr-online', 'agri-land-punjab', 'builder', 'developer'] },
];

/* ── Related calculator cards ────────────────────────────── */
const RelatedCalculatorsBlock = ({ calculators, currentId, goToCalculator }) => {
  const related = calculators.filter((c) => c.id !== currentId).slice(0, 4);
  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
        Related Calculators
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((calc) => (
          <button
            key={calc.id}
            type="button"
            onClick={() => goToCalculator(calc.id)}
            className="group card-surface p-4 flex items-center gap-3 text-left hover:border-[var(--color-gold)]/50 transition-all"
          >
            <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
              <calc.icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-gray-800 group-hover:text-[var(--color-gold)] transition-colors leading-snug truncate">
                {calc.title}
              </div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                {calc.category} · 2025–26
              </div>
            </div>
            <ArrowRight size={14} className="text-[var(--color-gold)] opacity-0 group-hover:opacity-100 flex-shrink-0 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ── Breadcrumb bar for individual calculator pages ──────── */
const CalculatorBreadcrumb = ({ calculator, onBack }) => (
  <div className="mb-8 rounded-2xl border border-gray-200 bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm">
    {/* Left: breadcrumb trail */}
    <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-gray-500 min-w-0">
      <button
        type="button"
        onClick={onBack}
        className="hover:text-[var(--color-gold)] transition-colors font-medium"
      >
        Tax Calculators
      </button>
      <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
      <span
        className="font-bold text-gray-800 truncate max-w-[200px] sm:max-w-none"
        title={calculator.title}
      >
        {calculator.title}
      </span>
    </nav>

    {/* Right: category badge + back button */}
    <div className="flex items-center gap-3 flex-shrink-0">
      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
        {calculator.category} · FY 2025–26
      </span>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold text-gray-600 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all"
      >
        <ArrowLeft size={13} /> Back
      </button>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════
   Main Page
═══════════════════════════════════════════════════════════ */
const PakTaxCalculators2025Page = () => {
  const { reduce, hero } = usePageMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get('calc');
  const contentRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useLayoutEffect(() => {
    const scrollNow = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    scrollNow();
    const t = window.setTimeout(scrollNow, 200);
    return () => window.clearTimeout(t);
  }, [activeId]);

  const goToCalculator = (id) => setSearchParams(id ? { calc: id } : {});
  const backToCalculators = () => setSearchParams({});

  const calculators = useMemo(
    () => [
      {
        id: 'pta',
        title: 'PTA Tax Calculator',
        category: 'Verification',
        icon: Phone,
        desc: 'Estimate PTA import duty on non-registered mobile phones. Compare Passport vs CNIC rates.',
        image: 'https://images.unsplash.com/photo-1554224155-a1487473ffd9?auto=format&fit=crop&w=900&q=60',
        element: <PtaTaxCalculator2025 />,
      },
      {
        id: 'zakat',
        title: 'Zakat Calculator',
        category: 'Faith & Assets',
        icon: Shield,
        desc: 'Calculate your annual Zakat obligation on savings, gold, silver, and business assets.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=60',
        element: <ZakatCalculator2025 />,
      },
      {
        id: 'fbr-online',
        title: 'FBR Online Verifications',
        category: 'Verification',
        icon: FileText,
        desc: 'Verify NTN, STRN, ATL status, and other FBR registrations directly with official portals.',
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=60',
        element: <FbrOnlineVerifications />,
      },
      {
        id: 'value-added-tax',
        title: 'Supply of Goods Tax Calculator',
        category: 'Withholding',
        icon: CreditCard,
        desc: 'Calculate GST on supply of goods — enter net price, tax amount, or rate to get instant figures.',
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=60',
        element: <SupplyOfGoodsTaxCalculator />,
      },
      {
        id: 'gain-securities',
        title: 'Gain Tax on Securities',
        category: 'Capital Gains',
        icon: Scale,
        desc: 'Calculate capital gains tax on shares and securities based on FBR 2025–26 holding period slabs.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=60',
        element: <GainTaxOnSecuritiesCalculator2025 />,
      },
      {
        id: 'gain-mutual-funds',
        title: 'Gain Tax on Mutual Funds',
        category: 'Capital Gains',
        icon: Users,
        desc: 'Estimate your capital gains tax liability on mutual fund redemptions under FBR rules.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=60',
        element: <GainTaxOnMutualFundsCalculator2025 />,
      },
      {
        id: 'gain-properties',
        title: 'Gain Tax on Properties',
        category: 'Capital Gains',
        icon: Landmark,
        desc: 'Calculate CGT on property sale based on holding period, FBR valuation, and filer status.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=650&fit=crop',
        element: <GainTaxOnPropertiesCalculator2025 />,
      },
      {
        id: 'withholding-income-properties',
        title: 'Withholding Tax on Properties',
        category: 'Withholding',
        icon: Droplets,
        desc: 'Calculate withholding tax on rental income from properties under Section 155 of ITO 2001.',
        image: 'https://images.unsplash.com/photo-1493882552576-fce827c6161e?auto=format&fit=crop&w=900&q=60',
        element: <WithholdingTaxOnIncomeFromPropertiesCalculator2025 />,
      },
      {
        id: 'withholding-brokerage-commission',
        title: 'Withholding Tax on Brokerage & Commission',
        category: 'Withholding',
        icon: CreditCard,
        desc: 'Compute WHT on brokerage and commission payments under Section 233 for filers and non-filers.',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=60',
        element: <WithholdingTaxOnBrokerageCommissionCalculator2025 />,
      },
      {
        id: 'salary',
        title: 'Pakistan Salary Tax Calculator',
        category: 'Income Tax',
        icon: Users,
        desc: 'Calculate monthly and annual income tax on salary with slab breakdowns for FY 2025–26.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=650&fit=crop',
        element: <SalaryTaxCalculator2025 />,
      },
      {
        id: 'business',
        title: 'Pakistan Business Tax Calculator',
        category: 'Income Tax',
        icon: BriefcaseBusiness,
        desc: 'Estimate income tax for sole proprietors and AOPs using official FBR business income slabs.',
        image: 'https://images.unsplash.com/photo-1684393637060-70e50f950aba?auto=format&fit=crop&w=900&q=60',
        element: <BusinessTaxCalculator2025 />,
      },
      {
        id: 'freelancer',
        title: 'Pakistan Freelancer Tax Calculator',
        category: 'Income Tax',
        icon: Users,
        desc: 'Calculate reduced tax on freelance income from Fiverr, Upwork, and other foreign platforms.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=650&fit=crop',
        element: <FreelancerTaxCalculator2025 />,
      },
      {
        id: 'super-tax',
        title: 'Super Tax on Annual Income',
        category: 'Income Tax',
        icon: Scale,
        desc: 'Determine super tax liability on high annual income under Section 4C of the Income Tax Ordinance.',
        image: 'https://images.unsplash.com/photo-1573165759995-5865a394a1aa?auto=format&fit=crop&w=900&q=60',
        element: <SuperTaxCalculator2025 />,
      },
      {
        id: 'company-income',
        title: 'Company Income Tax Calculator',
        category: 'Income Tax',
        icon: Building2,
        desc: 'Compute corporate income tax for private limited, SMC, and public companies at FBR rates.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&h=650&fit=crop',
        element: <CompanyIncomeTaxCalculator2025 />,
      },
      {
        id: 'builder',
        title: 'Pakistan Builder Tax Calculator',
        category: 'Other',
        icon: Wrench,
        desc: 'Calculate fixed tax on builders under Section 7C based on area, city, and project type.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=60',
        element: <BuilderTaxCalculator2025 variant="builder" />,
      },
      {
        id: 'developer',
        title: 'Pakistan Developer Tax Calculator',
        category: 'Other',
        icon: Wrench,
        desc: 'Estimate fixed tax for real estate developers under Section 7D for FY 2025–26.',
        image: 'https://images.unsplash.com/photo-1686149115308-bfdb03c8582e?auto=format&fit=crop&w=900&q=60',
        element: <BuilderTaxCalculator2025 variant="developer" />,
      },
      {
        id: 'agri-land-punjab',
        title: 'Agricultural Land Tax – Punjab',
        category: 'Other',
        icon: Store,
        desc: 'Calculate land tax on agricultural holdings in Punjab based on acreage and valuation.',
        image: 'https://images.unsplash.com/photo-1695487562553-c71a77e6c656?auto=format&fit=crop&w=900&q=60',
        element: <AgriculturalLandPunjabTaxCalculator2025 />,
      },
    ],
    []
  );

  const activeTab = FILTER_TABS.find((t) => t.id === activeFilter);
  const q = searchQuery.trim().toLowerCase();

  const visibleCalculators = useMemo(() => {
    return calculators.filter((c) => {
      const passFilter = activeFilter === 'All' || activeTab?.ids.includes(c.id);
      const passSearch = !q || c.title.toLowerCase().includes(q) || c.desc?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q);
      return passFilter && passSearch;
    });
  }, [calculators, activeFilter, activeTab, q]);

  const activeCalculator = useMemo(
    () => calculators.find((c) => c.id === activeId),
    [calculators, activeId]
  );

  /* ── Grid view (no active calculator) ─── */
  const renderGrid = () => (
    <div>
      {/* ── Category filter pills ── */}
      <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setActiveFilter(tab.id); setSearchQuery(''); }}
            className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all sm:px-5 ${
              activeFilter === tab.id
                ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-lg shadow-[rgba(212,175,55,0.25)]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-brand-navy)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Search bar ── */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm focus-within:border-[var(--color-gold)] focus-within:ring-2 focus-within:ring-[var(--color-gold)]/20 transition-all">
          <Calculator size={16} className="text-gray-400 flex-shrink-0" style={{ minWidth: 16 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculators — try 'salary', 'property', 'zakat'..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 text-xs font-bold"
              aria-label="Clear"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-center text-xs text-gray-400 mt-2">
            {visibleCalculators.length === 0
              ? 'No calculators found — try a different keyword'
              : `${visibleCalculators.length} calculator${visibleCalculators.length !== 1 ? 's' : ''} match "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* Count */}
      {!searchQuery && (
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-bold text-gray-900">{visibleCalculators.length}</span>{' '}
            calculator{visibleCalculators.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleCalculators.map((tile, idx) => (
          <motion.button
            key={tile.id}
            type="button"
            onClick={() => goToCalculator(tile.id)}
            aria-label={tile.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.35 }}
            className="group paktax-tile focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 text-left"
          >
            {/* Image area */}
            <div className="paktax-tile-media">
              {tile.image && (
                <img src={tile.image} alt={tile.title} loading="lazy" />
              )}
              <div className="paktax-tile-overlay" />
              <div className="absolute top-3 left-3">
                <span className="paktax-tile-chip">{tile.category}</span>
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-bold text-white/70 bg-black/30 rounded-full px-2 py-0.5 backdrop-blur-sm">
                2025–26
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="paktax-tile-icon group-hover:bg-[var(--color-gold)] transition-colors duration-300 flex-shrink-0">
                  <tile.icon size={18} className="text-[var(--color-gold)] group-hover:text-black transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 rounded-full px-2 py-0.5">
                  FY 2025–26
                </span>
              </div>
              <div
                className="text-base font-extrabold text-gray-900 mb-2 leading-snug group-hover:text-[var(--color-gold)] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {tile.title}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-4 flex-grow">
                {tile.desc}
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-bold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                  Try Calculator <ArrowRight size={12} />
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400">
                  <CheckCircle size={11} className="text-green-500" /> Free
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Why Use section */}
      <div className="mt-16 mb-2">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            Why Use Our <span className="text-[var(--color-gold)]">Tax Calculators</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-xl mx-auto">
            Built by Pakistani tax professionals. Always updated. Always free.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((item) => (
            <div key={item.title} className="card-surface p-5 text-center group hover:border-[var(--color-gold)]/40 transition-colors">
              <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                <item.icon size={22} />
              </div>
              <h3 className="font-bold text-sm mb-1.5">{item.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Single calculator view ─── */
  const renderCalculator = () => {
    if (!activeCalculator) {
      return (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <Calculator size={40} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Calculator not found. Please select one from the list.</p>
          <button
            type="button"
            onClick={backToCalculators}
            className="mt-4 text-sm font-semibold text-[var(--color-gold)] hover:underline"
          >
            ← Back to all calculators
          </button>
        </div>
      );
    }

    return (
      <div>
        {activeCalculator.element}
        <RelatedCalculatorsBlock
          calculators={calculators}
          currentId={activeCalculator.id}
          goToCalculator={goToCalculator}
        />
      </div>
    );
  };

  return (
    <div className="paktax-root">
      <Helmet>
        <title>
          {activeCalculator
            ? `${activeCalculator.title} | Tax Zilla Consultancy`
            : 'Pakistan Tax Calculators 2025–2026 | Tax Zilla Consultancy'}
        </title>
        <meta
          name="description"
          content={
            activeCalculator
              ? activeCalculator.desc
              : 'Free Pakistan tax calculators for FY 2025-26 — salary, business, freelancer, capital gains, withholding, zakat, PTA, and more. Official FBR rates.'
          }
        />
      </Helmet>

      {/* ── Hero: changes based on whether a calculator is active ── */}
      {activeId && activeCalculator ? (
        /* Sub-page hero — matches service pages exactly */
        <section
          className="relative overflow-hidden px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32"
          style={{ background: 'var(--color-brand-navy)' }}
        >
          <div className="absolute inset-0 bg-brand-overlay opacity-80" />
          <HeroGrid />
          <motion.div className="container-custom relative z-10" {...hero}>
            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-300 sm:text-sm">
              <a href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</a>
              <ChevronRight size={14} className="text-gray-500 flex-shrink-0" />
              <button
                type="button"
                onClick={backToCalculators}
                className="hover:text-[var(--color-gold)] transition-colors"
              >
                Tax Calculators
              </button>
              <ChevronRight size={14} className="text-gray-500 flex-shrink-0" />
              <span className="text-white font-semibold">{activeCalculator.title}</span>
            </nav>

            <div className="text-center max-w-4xl mx-auto">
              {/* Category badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6">
                {activeCalculator.category} · FY 2025–26
              </div>

              {/* Title */}
              <h1
                className="px-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {activeCalculator.title}
              </h1>

              {/* Description */}
              <p className="mt-5 px-2 text-base text-gray-300 sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {activeCalculator.desc}
              </p>
            </div>
          </motion.div>
        </section>
      ) : (
        /* Grid hero */
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
              FY 2025–2026 · Free Online Calculators
            </motion.div>

            <motion.h1
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
              className="px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Pakistan Tax Calculators
            </motion.h1>

            <motion.p
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.24 }}
              className="mt-5 max-w-2xl mx-auto px-2 text-base text-gray-300 sm:text-lg leading-relaxed"
            >
              17 free professional calculators with official FBR 2025–26 rates —
              income tax, capital gains, withholding, zakat, PTA, and more.
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
      )}

      {/* ── Stats Bar — grid page only ────────────────────── */}
      {!activeId && (
        <div className="border-b border-white/10" style={{ background: 'var(--color-brand-navy)' }}>
          <div className="container-custom">
            <div className="grid grid-cols-4 divide-x divide-white/10">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="py-5 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-[var(--color-gold)]">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ─────────────────────────────────── */}
      <main className="section-padding min-w-0 bg-white">
        <div className="container-custom min-w-0" ref={contentRef}>
          {activeId ? renderCalculator() : renderGrid()}
        </div>
      </main>
    </div>
  );
};

export default PakTaxCalculators2025Page;
