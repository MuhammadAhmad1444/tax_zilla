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

  // ── Services Mega Menu — Full-width horizontal layout ──────────────────
  const ServicesMegaMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 w-screen"
      style={{
        top: isScrolled ? '80px' : '88px',
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.14), 0 1px 0 rgba(212,175,55,0.12)',
        borderBottom: '1px solid rgba(229,231,235,0.8)',
        display: 'block',
        zIndex: 40
      }}
      role="menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Professional Premium Layout */}
      <div className="container-custom py-3 px-6 flex gap-8">
        {/* Left Content - Services Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-6">
            {/* Column 1 - Pakistan */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-100">
                <div className="p-1 rounded-lg bg-red-50">
                  <Globe size={12} className="text-red-600" />
                </div>
                <h4 className="text-xs font-extrabold text-gray-900">Pakistan</h4>
                <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">4</span>
              </div>
              <div className="space-y-1.5">
                {SERVICE_CATEGORIES.filter(c => ['tax-services-pakistan', 'individual-tax-services', 'certificates-compliance', 'audit-investigation'].includes(c.slug)).map((cat) => (
                  <Link key={cat.id} to={`/services/${cat.slug}`} onClick={() => setOpenDropdown(null)} className="group block px-2 py-1.5 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <h5 className="text-[10px] font-semibold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors">{cat.title}</h5>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 - Corporate */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-100">
                <div className="p-1 rounded-lg bg-blue-50">
                  <Briefcase size={12} className="text-blue-600" />
                </div>
                <h4 className="text-xs font-extrabold text-gray-900">Corporate</h4>
                <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">3</span>
              </div>
              <div className="space-y-1.5">
                {SERVICE_CATEGORIES.filter(c => ['corporate-business-services', 'secp-related-services', 'intellectual-property'].includes(c.slug)).map((cat) => (
                  <Link key={cat.id} to={`/services/${cat.slug}`} onClick={() => setOpenDropdown(null)} className="group block px-2 py-1.5 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <h5 className="text-[10px] font-semibold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors">{cat.title}</h5>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 - International */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-100">
                <div className="p-1 rounded-lg bg-green-50">
                  <Globe size={12} className="text-green-600" />
                </div>
                <h4 className="text-xs font-extrabold text-gray-900">International</h4>
                <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">4</span>
              </div>
              <div className="space-y-1.5">
                {SERVICE_CATEGORIES.filter(c => ['uae-tax-services', 'usa-tax-services', 'ksa-tax-services', 'uk-tax-services'].includes(c.slug)).map((cat) => (
                  <Link key={cat.id} to={`/services/${cat.slug}`} onClick={() => setOpenDropdown(null)} className="group block px-2 py-1.5 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <h5 className="text-[10px] font-semibold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors">{cat.title}</h5>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4 - Legal Services (with Criminal & Civil subservices) */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-100">
                <div className="p-1 rounded-lg bg-orange-50">
                  <Scale size={12} className="text-orange-600" />
                </div>
                <h4 className="text-xs font-extrabold text-gray-900">Legal Services</h4>
                <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700">3</span>
              </div>
              <div className="space-y-1.5">
                <Link to="/services/legal-services" onClick={() => setOpenDropdown(null)} className="group block px-2 py-1.5 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <h5 className="text-[10px] font-semibold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors">Legal Services</h5>
                </Link>
                <Link to="/services/legal-services/criminal-law-services" onClick={() => setOpenDropdown(null)} className="group block px-2 py-1.5 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <h5 className="text-[10px] font-semibold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors">Criminal Law Services</h5>
                </Link>
                <Link to="/services/legal-services/civil-law-services" onClick={() => setOpenDropdown(null)} className="group block px-2 py-1.5 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                  <h5 className="text-[10px] font-semibold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors">Civil Law Services</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Professional CTA Card */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-gradient-to-br from-[var(--color-gold)]/20 to-white border border-[var(--color-gold)]/30 p-4 rounded-lg overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(212,175,55,0.15)' }}>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-[var(--color-gold)]/10">
                  <CheckCircle size={13} style={{ color: 'var(--color-gold)' }} />
                </div>
                <span className="text-xs font-extrabold text-[var(--color-gold)] uppercase tracking-wider">Expert Support</span>
              </div>
              <h3 className="text-sm font-extrabold text-gray-900">Professional Guidance</h3>
            </div>
            <p className="text-xs text-gray-700 mb-4 leading-relaxed">
              Get expert assistance from our dedicated tax & legal team
            </p>
            <Link
              to="/contact"
              onClick={() => setOpenDropdown(null)}
              className="block w-full px-4 py-2.5 rounded-lg font-semibold text-white text-xs text-center transition-all hover:shadow-lg"
              style={{ background: 'var(--color-gold)' }}
            >
              Consult Now
            </Link>
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white py-2.5 px-6">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold text-purple-700 bg-purple-100">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Professional Services
            </span>
            <span className="text-[9px] font-medium text-gray-600">•</span>
            <span className="text-[9px] font-medium text-gray-600">Trusted by 997+ Clients</span>
          </div>
          <Link to="/services" onClick={() => setOpenDropdown(null)} className="text-[10px] font-semibold text-[var(--color-gold)] hover:text-gray-900 transition-colors flex items-center gap-1">
            View All Services <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  // ── Tax Calculators Mega Menu ───────────────────────────────────────────
  const TaxCalculatorsMegaMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 w-screen"
      style={{
        top: isScrolled ? '80px' : '88px',
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.14), 0 1px 0 rgba(212,175,55,0.12)',
        borderBottom: '1px solid rgba(229,231,235,0.8)',
        display: 'block',
        zIndex: 40
      }}
      role="menu"
      aria-label="Tax Calculators menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Header */}
      <div className="container-custom py-2.5 px-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-[var(--color-gold)]/10">
            <Calculator size={13} style={{ color: 'var(--color-gold)' }} />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-gray-900">Tax Calculators 2025-26</h4>
            <p className="text-[8px] text-gray-500">FBR Official Rates</p>
          </div>
        </div>
        <Link
          to="/pakistan-tax-calculators"
          className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-semibold text-white rounded transition-all"
          style={{ background: 'var(--color-gold)', hover: { opacity: 0.9 } }}
          onClick={() => setOpenDropdown(null)}
        >
          All <ArrowRight size={11} />
        </Link>
      </div>

      <div className="container-custom grid grid-cols-3 divide-x divide-gray-100 py-3 px-6 gap-0">
        {/* Column 1 - Essentials */}
        <div className="pl-0 pr-6">
          <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-100">
            <div className="p-1 rounded-lg bg-blue-50">
              <FileText size={12} className="text-blue-600" />
            </div>
            <h5 className="text-xs font-extrabold text-gray-900">Essentials</h5>
            <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">5</span>
          </div>
          <div className="space-y-1.5">
            {[
              { id: 'pta', label: 'PTA Tax Calculator', desc: 'Individual tax filing' },
              { id: 'zakat', label: 'Zakat Calculator', desc: 'Zakat computation' },
              { id: 'fbr-online', label: 'FBR Online Verifications', desc: 'Verify NTN & records' },
              { id: 'value-added-tax', label: 'Supply of Goods Tax', desc: 'Sales tax calculation' },
              { id: 'agri-land-punjab', label: 'Agricultural Land Tax', desc: 'Land tax estimation' },
            ].map(({ id, label, desc }) => {
              const active = isCalcActive(id);
              return (
                <Link
                  key={id}
                  to={`/pakistan-tax-calculators?calc=${id}`}
                  className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all ${
                    active ? 'bg-[var(--color-gold)]/12 border border-[var(--color-gold)]/30' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${active ? 'bg-[var(--color-gold)]' : 'bg-gray-300 group-hover:bg-[var(--color-gold)]'}`} />
                  <p className={`text-[10px] font-semibold ${active ? 'text-[var(--color-gold)]' : 'text-gray-800 group-hover:text-[var(--color-gold)]'} transition-colors leading-tight`}>{label}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 2 - Capital Gains */}
        <div className="px-6">
          <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-100">
            <div className="p-1 rounded-lg bg-green-50">
              <TrendingUp size={12} className="text-green-600" />
            </div>
            <h5 className="text-xs font-extrabold text-gray-900">Capital Gains</h5>
            <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">5</span>
          </div>
          <div className="space-y-2">
            {[
              { id: 'gain-securities', label: 'Gain Tax on Securities', desc: 'Stock gains tax' },
              { id: 'gain-mutual-funds', label: 'Gain Tax on Mutual Funds', desc: 'Fund gains tax' },
              { id: 'gain-properties', label: 'Gain Tax on Properties', desc: 'Property gains tax' },
              { id: 'withholding-income-properties', label: 'Withholding – Properties', desc: 'Property withholding' },
              { id: 'withholding-brokerage-commission', label: 'Withholding – Brokerage', desc: 'Broker withholding' },
            ].map(({ id, label, desc }) => {
              const active = isCalcActive(id);
              return (
                <Link
                  key={id}
                  to={`/pakistan-tax-calculators?calc=${id}`}
                  className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all ${
                    active ? 'bg-[var(--color-gold)]/12 border border-[var(--color-gold)]/30' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${active ? 'bg-[var(--color-gold)]' : 'bg-gray-300 group-hover:bg-[var(--color-gold)]'}`} />
                  <p className={`text-[10px] font-semibold ${active ? 'text-[var(--color-gold)]' : 'text-gray-800 group-hover:text-[var(--color-gold)]'} transition-colors leading-tight`}>{label}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 3 - Income & Business */}
        <div className="pl-6 pr-0">
          <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-gray-100">
            <div className="p-1 rounded-lg bg-purple-50">
              <Briefcase size={12} className="text-purple-600" />
            </div>
            <h5 className="text-xs font-extrabold text-gray-900">Income & Business</h5>
            <span className="ml-auto text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">7</span>
          </div>
          <div className="space-y-2">
            {[
              { id: 'salary', label: 'Salary Tax Calculator', desc: 'Salary tax computation' },
              { id: 'business', label: 'Business Tax Calculator', desc: 'Business income tax' },
              { id: 'freelancer', label: 'Freelancer Tax Calculator', desc: 'Freelance income tax' },
              { id: 'super-tax', label: 'Super Tax on Income', desc: 'Super tax calculation' },
              { id: 'company-income', label: 'Company Income Tax', desc: 'Corporate income tax' },
              { id: 'builder', label: 'Builder Tax Calculator', desc: 'Builder taxation' },
              { id: 'developer', label: 'Developer Tax Calculator', desc: 'Developer taxation' },
            ].map(({ id, label, desc }) => {
              const active = isCalcActive(id);
              return (
                <Link
                  key={id}
                  to={`/pakistan-tax-calculators?calc=${id}`}
                  className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all ${
                    active ? 'bg-[var(--color-gold)]/12 border border-[var(--color-gold)]/30' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => setOpenDropdown(null)}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${active ? 'bg-[var(--color-gold)]' : 'bg-gray-300 group-hover:bg-[var(--color-gold)]'}`} />
                  <p className={`text-[10px] font-semibold ${active ? 'text-[var(--color-gold)]' : 'text-gray-800 group-hover:text-[var(--color-gold)]'} transition-colors leading-tight`}>{label}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container-custom border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white py-2 px-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold text-emerald-700 bg-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Free & Instant
          </span>
          <span className="text-[9px] font-medium text-gray-600">•</span>
          <span className="text-[9px] font-medium text-gray-600">Official FBR Rates</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
        isScrolled ? 'nav-glass-scrolled' : 'nav-glass-top'
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
                src="/images/brand-mark.png"
                alt="Tax Zilla logo"
                className="shrink-0 object-contain"
                style={{ height: '64px', width: 'auto', maxWidth: '220px' }}
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
                          isServices ? <ServicesMegaMenu key="services" /> : <TaxCalculatorsMegaMenu key="tax" />
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden absolute left-0 right-0 w-full max-h-[min(88dvh,36rem)] shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden"
            style={{
              background: 'rgba(9, 22, 32, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(212,175,55,0.18)',
            }}
          >
            <div className="container-custom max-h-[inherit] overflow-y-auto overscroll-contain py-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">

              {/* Main nav items */}
              <div className="space-y-0.5 mb-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between min-h-[48px] rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 sm:text-base ${
                        isActive(item.path)
                          ? 'bg-[var(--color-gold)] text-black font-semibold shadow-[0_2px_12px_rgba(212,175,55,0.35)]'
                          : 'text-white/90 hover:bg-white/[0.07] hover:text-[var(--color-gold)]'
                      }`}
                    >
                      {item.name}
                      {isActive(item.path) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Service categories */}
              <div className="border-t border-white/[0.08] pt-4 mb-4">
                <p className="text-[9px] font-black text-[var(--color-gold)] px-4 mb-2.5 uppercase tracking-[0.2em]">
                  Service Categories
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {SERVICE_CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/services/${category.slug}`}
                      className="block py-2 px-4 text-xs text-white/60 hover:text-[var(--color-gold)] hover:bg-white/[0.05] rounded-lg transition-all duration-150 leading-snug"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-white/[0.08] pt-4 mb-4">
                <p className="text-[9px] font-black text-[var(--color-gold)] px-4 mb-2.5 uppercase tracking-[0.2em]">Contact Us</p>
                <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2.5 py-2.5 px-4 text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors rounded-xl hover:bg-white/[0.05]">
                  <Phone size={13} className="text-[var(--color-gold)] flex-shrink-0" />
                  <span className="truncate">{SITE.phone}</span>
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 py-2.5 px-4 text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors rounded-xl hover:bg-white/[0.05]">
                  <Mail size={13} className="text-[var(--color-gold)] flex-shrink-0" />
                  <span className="truncate">{SITE.email}</span>
                </a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 py-2.5 px-4 text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors rounded-xl hover:bg-white/[0.05]">
                  <MessageCircle size={13} className="text-[var(--color-gold)] flex-shrink-0" />
                  WhatsApp Now
                </a>
              </div>

              {/* Legal */}
              <div className="border-t border-white/[0.08] pt-4">
                <p className="text-[9px] font-black text-[var(--color-gold)] px-4 mb-2 uppercase tracking-[0.2em]">Legal</p>
                <Link to="/legal/privacy-policy" className="block py-2 px-4 text-sm text-white/60 hover:text-[var(--color-gold)] transition-colors rounded-xl hover:bg-white/[0.05]">
                  Privacy Policy
                </Link>
                <Link to="/legal/terms-conditions" className="block py-2 px-4 text-sm text-white/60 hover:text-[var(--color-gold)] transition-colors rounded-xl hover:bg-white/[0.05]">
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
