import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail, MessageCircle, Calculator, Building2, Globe, ShieldCheck, FileText, Briefcase, MapPin, Scale, Settings, Wrench, Users, CheckCircle, User, Search, TrendingUp, FileCheck, Landmark, ChevronRight } from 'lucide-react';
import { SERVICE_CATEGORIES, getSubservicesByCategory } from '../data/serviceCatalog.js';
import { SITE } from '../data/site.js';

/* ── Category icon map ─────────────────────────────── */
const CAT_ICONS = {
  'tax-services-pakistan': FileText, 'provincial-sales-tax': MapPin,
  'corporate-business-services': Building2, 'intellectual-property': ShieldCheck,
  'software-it-services': Settings, 'engineering-services': Wrench,
  'legal-services': Scale, 'secp-related-services': Building2,
  'competition-commission-services': Scale, 'visa-immigration-tax-services': Globe,
  'overseas-pakistani-tax-services': Users, 'certificates-compliance': CheckCircle,
  'individual-tax-services': User, 'high-demand-individual-services': User,
  'audit-investigation': Search, 'business-tax-planning': TrendingUp,
  'additional-registrations': FileCheck, 'uae-tax-services': Globe,
  'usa-tax-services': Landmark, 'ksa-tax-services': Landmark, 'uk-tax-services': Globe,
};

/* ── Grouped categories for left panel ─────────────── */
const MEGA_GROUPS = [
  {
    id: 'pakistan', label: 'Pakistan Tax & Compliance', flag: '🇵🇰',
    slugs: ['tax-services-pakistan','provincial-sales-tax','individual-tax-services',
            'high-demand-individual-services','certificates-compliance',
            'audit-investigation','business-tax-planning'],
  },
  {
    id: 'corporate', label: 'Corporate & Business', flag: '🏢',
    slugs: ['corporate-business-services','secp-related-services',
            'competition-commission-services','intellectual-property',
            'legal-services','additional-registrations',
            'software-it-services','engineering-services'],
  },
  {
    id: 'specialized', label: 'Specialized', flag: '⭐',
    slugs: ['visa-immigration-tax-services','overseas-pakistani-tax-services'],
  },
  {
    id: 'international', label: 'International', flag: '🌍',
    slugs: ['uae-tax-services','usa-tax-services','ksa-tax-services','uk-tax-services'],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [megaCategory, setMegaCategory] = useState('tax-services-pakistan');

  const location = useLocation();
  const navigate  = useNavigate();
  const taxMenuWrapperRef = useRef(null);
  const servicesMenuWrapperRef = useRef(null);
  const closeTimerRef = useRef(null);
  const searchParams = new URLSearchParams(location.search);
  const activeCalc = searchParams.get('calc');

  // Build a fast lookup map: slug → category object
  const categoryBySlug = Object.fromEntries(
    SERVICE_CATEGORIES.map((c) => [c.slug, c])
  );

  const openMenu = (menu) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenDropdown(menu);
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Fallback: close on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const onDocMouseDown = (e) => {
      if (taxMenuWrapperRef.current?.contains(e.target)) return;
      if (servicesMenuWrapperRef.current?.contains(e.target)) return;
      setOpenDropdown(null);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [openDropdown]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Why Us', path: '/why-choose-us' },
    { name: 'Process', path: '/our-process' },
    { name: 'Industries', path: '/industries' },
    { name: 'Services', path: '/services' },
    { name: 'Tax Calculators 2025-2026', path: '/pakistan-tax-calculators' },
    { name: 'Blog', path: '/blog' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/services')
      return location.pathname === '/services' || location.pathname.startsWith('/services/');
    return location.pathname === path || (path !== '/' && location.pathname === `${path}/`);
  };

  const isTaxActive = () =>
    location.pathname === '/pakistan-tax-calculators' ||
    location.pathname === '/pakistan-tax-calculators/';

  const isCalcActive = (id) => isTaxActive() && activeCalc === id;

  // ── Services Mega Menu — compact 2-panel ──────────────────────────────
  const activeCatObj = SERVICE_CATEGORIES.find(c => c.id === megaCategory);
  const activeSubs   = getSubservicesByCategory(megaCategory);
  const MAX_SUBS     = 9;
  const previewSubs  = activeSubs.slice(0, MAX_SUBS);
  const extraCount   = activeSubs.length - MAX_SUBS;

  const ServicesMegaMenu = () => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-[min(720px,calc(100vw-2rem))] bg-white rounded-xl overflow-hidden"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.16)', border: '1px solid rgba(0,0,0,0.08)' }}
      role="menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Top accent */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg,var(--color-gold),var(--color-brand-navy))' }} />

      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100" style={{ background: '#f9fafb' }}>
        <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-gray-400">Our Services</span>
        <Link to="/services" onClick={() => setOpenDropdown(null)}
          className="flex items-center gap-1 text-[10px] font-semibold hover:text-[var(--color-gold)] transition-colors"
          style={{ color: 'var(--color-brand-navy)' }}>
          View All <ArrowRight size={9} />
        </Link>
      </div>

      {/* Two-panel body */}
      <div className="flex" style={{ maxHeight: 340 }}>

        {/* LEFT — category list */}
        <div className="flex-shrink-0 overflow-y-auto py-1.5"
          style={{ width: 195, background: 'var(--color-brand-navy)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          {MEGA_GROUPS.map(g => {
            const cats = SERVICE_CATEGORIES.filter(c => g.slugs.includes(c.id));
            return (
              <div key={g.id}>
                <p className="px-3 pt-3 pb-1 text-[8.5px] font-extrabold uppercase tracking-[0.2em] flex items-center gap-1"
                  style={{ color: 'rgba(212,175,55,0.65)' }}>
                  <span>{g.flag}</span>{g.label}
                </p>
                {cats.map(cat => {
                  const active = megaCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onMouseEnter={() => setMegaCategory(cat.id)}
                      onClick={() => { navigate(`/services/${cat.slug}`); setOpenDropdown(null); }}
                      className="w-full flex items-center gap-2 px-3 py-[5px] text-left transition-colors duration-100"
                      style={active
                        ? { background: 'rgba(212,175,55,0.12)', borderLeft: '2px solid var(--color-gold)' }
                        : { borderLeft: '2px solid transparent' }}
                    >
                      <span className="text-[11px] leading-snug flex-1 truncate font-medium"
                        style={{ color: active ? 'var(--color-gold)' : 'rgba(255,255,255,0.72)' }}>
                        {cat.title}
                      </span>
                      {active && <ChevronRight size={10} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* RIGHT — sub-services */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Category title bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`h-${megaCategory}`}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.22,1,0.36,1] }}
              className="flex items-center gap-2 px-4 py-2 border-b border-gray-100"
              style={{ background: '#fafafa' }}
            >
              {(() => { const Ic = CAT_ICONS[megaCategory] || FileText; return (
                <Ic size={13} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              ); })()}
              <span className="font-bold text-[12px] text-gray-900 flex-1 truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                {activeCatObj?.title}
              </span>
              <span className="text-[9px] font-bold rounded-full px-2 py-0.5 flex-shrink-0"
                style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)' }}>
                {activeSubs.length}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Sub-service links */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`s-${megaCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="grid grid-cols-2 gap-x-2 gap-y-0"
              >
                {previewSubs.map((sub, i) => (
                  <motion.div
                    key={sub.slug}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2, ease: [0.22,1,0.36,1] }}
                  >
                    <Link
                      to={`/services/${sub.slug}`}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-center gap-1.5 py-[5px] px-2 rounded-md transition-colors duration-100 hover:bg-[rgba(212,175,55,0.06)]"
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0 transition-colors group-hover:bg-[var(--color-gold)]"
                        style={{ background: '#d1d5db' }} />
                      <span className="text-[11px] text-gray-700 group-hover:text-[var(--color-gold)] transition-colors leading-snug truncate font-medium">
                        {sub.title}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-3 py-1.5 flex items-center justify-between" style={{ background: '#f9fafb' }}>
            <Link to={`/services/${activeCatObj?.slug}`} onClick={() => setOpenDropdown(null)}
              className="flex items-center gap-1 text-[10px] font-bold hover:text-[var(--color-gold)] transition-colors"
              style={{ color: 'var(--color-brand-navy)' }}>
              {extraCount > 0 && `+${extraCount} more · `}All {activeCatObj?.title} <ArrowRight size={9} />
            </Link>
            <span className="text-[9px] text-gray-400">Hover to browse</span>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-100 px-4 py-1.5 flex items-center gap-2" style={{ background: '#f9fafb' }}>
        <span className="text-[9px] text-gray-400">Need help choosing?</span>
        <Link to="/contact" onClick={() => setOpenDropdown(null)}
          className="text-[9px] font-bold underline underline-offset-2 hover:text-[var(--color-gold)] transition-colors"
          style={{ color: 'var(--color-brand-navy)' }}>
          Talk to an Expert →
        </Link>
      </div>
    </div>
  );

  // ── Tax Calculators Mega Menu ───────────────────────────────────────────
  const TaxCalculatorsMegaMenu = () => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] w-[min(720px,calc(100vw-2rem))] bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden"
      role="menu"
      aria-label="Tax Calculators menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Slim accent bar */}
      <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, var(--color-gold), var(--color-brand-navy))' }} />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-100 bg-gray-50/80">
        <div className="flex items-center gap-2">
          <Calculator size={11} style={{ color: 'var(--color-gold)' }} />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gray-400">Tax Calculators 2025–26</span>
        </div>
        <Link
          to="/pakistan-tax-calculators"
          className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-brand-navy)] hover:text-[var(--color-gold)] transition-colors"
          onClick={() => setOpenDropdown(null)}
        >
          View All <ArrowRight size={10} />
        </Link>
      </div>

      <div className="grid grid-cols-3 divide-x divide-gray-100">
        {/* Column 1 */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-1.5 mb-3">
            <FileText size={11} style={{ color: 'var(--color-gold)' }} />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: 'var(--color-gold)' }}>
              Essentials
            </span>
          </div>
          <div className="flex flex-col gap-0">
            {[
              { id: 'pta', label: 'PTA Tax Calculator' },
              { id: 'zakat', label: 'Zakat Calculator' },
              { id: 'fbr-online', label: 'FBR Online Verifications' },
              { id: 'value-added-tax', label: 'Supply of Goods Tax' },
              { id: 'agri-land-punjab', label: 'Agricultural Land Tax' },
            ].map(({ id, label }) => {
              const active = isCalcActive(id);
              return (
                <Link
                  key={id}
                  to={`/pakistan-tax-calculators?calc=${id}`}
                  className={`group flex items-center gap-1.5 text-[12px] font-medium py-1.5 pl-2 pr-1 rounded-md transition-all duration-150 ${
                    active ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/8 font-semibold' : 'text-gray-600 hover:text-[var(--color-brand-navy)] hover:bg-gray-50'
                  }`}
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className={`w-1 h-1 rounded-full shrink-0 transition-all ${active ? 'bg-[var(--color-gold)]' : 'bg-gray-300 group-hover:bg-[var(--color-gold)]'}`} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 2 */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-1.5 mb-3">
            <FileText size={11} style={{ color: 'var(--color-gold)' }} />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: 'var(--color-gold)' }}>
              Capital Gains
            </span>
          </div>
          <div className="flex flex-col gap-0">
            {[
              { id: 'gain-securities', label: 'Gain Tax on Securities' },
              { id: 'gain-mutual-funds', label: 'Gain Tax on Mutual Funds' },
              { id: 'gain-properties', label: 'Gain Tax on Properties' },
              { id: 'withholding-income-properties', label: 'Withholding – Properties' },
              { id: 'withholding-brokerage-commission', label: 'Withholding – Brokerage' },
            ].map(({ id, label }) => {
              const active = isCalcActive(id);
              return (
                <Link
                  key={id}
                  to={`/pakistan-tax-calculators?calc=${id}`}
                  className={`group flex items-center gap-1.5 text-[12px] font-medium py-1.5 pl-2 pr-1 rounded-md transition-all duration-150 ${
                    active ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/8 font-semibold' : 'text-gray-600 hover:text-[var(--color-brand-navy)] hover:bg-gray-50'
                  }`}
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className={`w-1 h-1 rounded-full shrink-0 transition-all ${active ? 'bg-[var(--color-gold)]' : 'bg-gray-300 group-hover:bg-[var(--color-gold)]'}`} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 3 */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-1.5 mb-3">
            <Briefcase size={11} style={{ color: 'var(--color-gold)' }} />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: 'var(--color-gold)' }}>
              Income & Business
            </span>
          </div>
          <div className="flex flex-col gap-0">
            {[
              { id: 'salary', label: 'Salary Tax Calculator' },
              { id: 'business', label: 'Business Tax Calculator' },
              { id: 'freelancer', label: 'Freelancer Tax Calculator' },
              { id: 'super-tax', label: 'Super Tax on Income' },
              { id: 'company-income', label: 'Company Income Tax' },
              { id: 'builder', label: 'Builder Tax Calculator' },
              { id: 'developer', label: 'Developer Tax Calculator' },
            ].map(({ id, label }) => {
              const active = isCalcActive(id);
              return (
                <Link
                  key={id}
                  to={`/pakistan-tax-calculators?calc=${id}`}
                  className={`group flex items-center gap-1.5 text-[12px] font-medium py-1.5 pl-2 pr-1 rounded-md transition-all duration-150 ${
                    active ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/8 font-semibold' : 'text-gray-600 hover:text-[var(--color-brand-navy)] hover:bg-gray-50'
                  }`}
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className={`w-1 h-1 rounded-full shrink-0 transition-all ${active ? 'bg-[var(--color-gold)]' : 'bg-gray-300 group-hover:bg-[var(--color-gold)]'}`} />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-2.5 flex items-center gap-3">
        <span className="text-[10px] text-gray-400 font-medium">All calculators use official FBR 2025-26 rates.</span>
        <span className="text-[10px] font-bold text-emerald-600">Free &amp; Instant</span>
      </div>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
        isScrolled
          ? 'bg-[var(--color-brand-navy)] shadow-[0_4px_32px_rgba(0,0,0,0.35)]'
          : 'bg-black/90 backdrop-blur-md'
      }`}
    >
      {/* ── Main Nav Row ── */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3 sm:py-3'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">

          {/* Logo + Brand */}
          <Link to="/" className="flex min-w-0 flex-shrink-0 items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex min-w-0 items-center gap-2.5"
            >
              <img
                src="/images/tax-zilla-logo.png"
                alt="Tax Zilla logo"
                className="shrink-0 rounded-full object-cover"
                style={{ width: '40px', height: '40px' }}
                loading="eager"
              />
              <h1
                className="text-xl sm:text-2xl font-bold leading-none"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="text-white">Tax </span>
                <span className="text-gradient-gold">Zilla</span>
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => {
              const isServices = item.path === '/services';
              const isTaxCalc = item.path === '/pakistan-tax-calculators';
              const hasDropdown = isServices || isTaxCalc;

              return (
                <div
                  key={item.path}
                  className="relative"
                  ref={
                    isTaxCalc
                      ? taxMenuWrapperRef
                      : isServices
                      ? servicesMenuWrapperRef
                      : null
                  }
                  onMouseEnter={
                    hasDropdown
                      ? () => openMenu(isServices ? 'services' : 'tax-calculators')
                      : undefined
                  }
                  onMouseLeave={hasDropdown ? scheduleClose : undefined}
                >
                  {hasDropdown ? (
                    <>
                      <Link
                        to={item.path}
                        className="flex items-center"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isActive(item.path)
                              ? 'text-[var(--color-gold)]'
                              : 'text-white hover:text-[var(--color-gold)]'
                          }`}
                        >
                          {item.name}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`ml-1 transition-all duration-200 ${
                            openDropdown === (isServices ? 'services' : 'tax-calculators')
                              ? 'rotate-180 text-[var(--color-gold)]'
                              : 'text-[var(--color-gold)]/60'
                          }`}
                        />
                      </Link>

                      <AnimatePresence>
                        {openDropdown === (isServices ? 'services' : 'tax-calculators') && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                          >
                            {isServices ? <ServicesMegaMenu /> : <TaxCalculatorsMegaMenu />}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={item.path} className="relative group">
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isActive(item.path)
                            ? 'text-[var(--color-gold)]'
                            : 'text-white hover:text-[var(--color-gold)]'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`absolute bottom-[-4px] left-0 w-full h-0.5 bg-[var(--color-gold)] transform origin-left transition-transform duration-300 ${
                          isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden min-h-[44px] min-w-[44px] shrink-0 text-white flex items-center justify-center rounded-lg hover:bg-white/10 hover:text-[var(--color-gold)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      </div>{/* end transition-all wrapper */}

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-brand-solid border-t border-[var(--color-gold)]/20 overflow-hidden absolute left-0 right-0 w-full max-h-[min(85dvh,32rem)] shadow-2xl"
          >
            <div className="container-custom max-h-[inherit] space-y-1 overflow-y-auto overscroll-contain py-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block min-h-[48px] rounded-lg px-4 py-3 text-sm font-medium leading-snug transition-all duration-300 sm:text-base ${
                    isActive(item.path)
                      ? 'bg-[var(--color-gold)] text-black font-semibold'
                      : 'text-white hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-white/10 my-4 pt-4">
                <p className="text-[10px] font-bold text-[var(--color-gold)] px-4 mb-2 uppercase tracking-widest">
                  Service Categories
                </p>
                {SERVICE_CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/services/${category.slug}`}
                    className="block py-2 px-4 text-sm text-gray-300 hover:text-[var(--color-gold)] transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>

              <div className="border-t border-white/10 my-4 pt-4">
                <p className="text-[10px] font-bold text-[var(--color-gold)] px-4 mb-3 uppercase tracking-widest">Contact Us</p>
                <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 py-2 px-4 text-sm text-gray-300 hover:text-[var(--color-gold)] transition-colors">
                  <Phone size={13} className="text-[var(--color-gold)]" /> {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 py-2 px-4 text-sm text-gray-300 hover:text-[var(--color-gold)] transition-colors">
                  <Mail size={13} className="text-[var(--color-gold)]" /> {SITE.email}
                </a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-4 text-sm text-gray-300 hover:text-[var(--color-gold)] transition-colors">
                  <MessageCircle size={13} className="text-[var(--color-gold)]" /> WhatsApp Now
                </a>
              </div>

              <div className="border-t border-white/10 my-4 pt-4">
                <p className="text-[10px] font-bold text-[var(--color-gold)] px-4 mb-2 uppercase tracking-widest">Legal</p>
                <Link to="/legal/privacy-policy" className="block py-2 px-4 text-sm text-gray-300 hover:text-[var(--color-gold)] transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/legal/terms-conditions" className="block py-2 px-4 text-sm text-gray-300 hover:text-[var(--color-gold)] transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
