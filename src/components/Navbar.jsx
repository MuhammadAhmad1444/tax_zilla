import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/serviceCatalog.js';
import { SITE } from '../data/site.js';

// Group service categories into 4 logical columns for the mega-menu
const SERVICES_COLUMNS = [
  {
    heading: 'Pakistan Tax & Compliance',
    slugs: [
      'tax-services-pakistan',
      'provincial-sales-tax',
      'high-demand-individual-services',
      'audit-investigation',
      'business-tax-planning',
      'certificates-compliance',
    ],
  },
  {
    heading: 'Corporate & Business',
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
    heading: 'Specialized Services',
    slugs: [
      'visa-immigration-tax-services',
      'overseas-pakistani-tax-services',
      'individual-tax-services',
    ],
  },
  {
    heading: 'International Services',
    slugs: [
      'uae-tax-services',
      'usa-tax-services',
      'ksa-tax-services',
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'services' | 'tax-calculators' | null

  const location = useLocation();
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
    { name: 'Process', path: '/our-process' },
    { name: 'Industries', path: '/industries' },
    { name: 'Services', path: '/services' },
    { name: 'Tax Calculators 2025-2026', path: '/pakistan-tax-calculators' },
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

  // ── Services Mega Menu ──────────────────────────────────────────────────
  const ServicesMegaMenu = () => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-[min(1020px,calc(100vw-1.25rem))] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
      role="menu"
      aria-label="Services menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100" style={{ background: 'var(--color-brand-navy)' }}>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
          All Services
        </span>
        <Link
          to="/services"
          className="flex items-center gap-1 text-xs font-semibold text-gray-300 hover:text-[var(--color-gold)] transition-colors"
          onClick={() => setOpenDropdown(null)}
        >
          View All <ArrowRight size={12} />
        </Link>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-0 p-2">
        {SERVICES_COLUMNS.map((col) => (
          <div key={col.heading} className="px-3 py-3">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3 pb-2 border-b border-gray-100">
              {col.heading}
            </div>
            <div className="flex flex-col">
              {col.slugs.map((slug) => {
                const cat = categoryBySlug[slug];
                if (!cat) return null;
                return (
                  <Link
                    key={slug}
                    to={`/services/${slug}`}
                    className={`block text-[12.5px] font-semibold py-[7px] px-2 rounded-lg border-b border-gray-50 transition-all group ${
                      location.pathname === `/services/${slug}`
                        ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/8'
                        : 'text-gray-700 hover:text-[var(--color-brand-navy)] hover:bg-[var(--color-gold)]/10 hover:pl-3'
                    }`}
                    onClick={() => setOpenDropdown(null)}
                  >
                    {cat.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Tax Calculators Mega Menu ───────────────────────────────────────────
  const TaxCalculatorsMegaMenu = () => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-[min(980px,calc(100vw-1.25rem))] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
      role="menu"
      aria-label="Tax Calculators 2025-2026 menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Header bar */}
      <div className="px-6 py-3 border-b border-gray-100" style={{ background: 'var(--color-brand-navy)' }}>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
          Pakistan Tax Calculators 2025–26
        </span>
      </div>

      <div className="grid grid-cols-3 gap-0 p-2">
        {/* Column 1 */}
        <div className="px-3 py-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3 pb-2 border-b border-gray-100">
            Verification & Essentials
          </div>
          <div className="flex flex-col">
            {[
              { id: 'pta', label: 'PTA Tax Calculator' },
              { id: 'zakat', label: 'Zakat Calculator' },
              { id: 'fbr-online', label: 'FBR Online Verifications' },
              { id: 'value-added-tax', label: 'Supply of Goods Tax Calculator' },
              { id: 'agri-land-punjab', label: 'Agricultural Land Tax – Punjab' },
            ].map(({ id, label }) => (
              <Link
                key={id}
                to={`/pakistan-tax-calculators?calc=${id}`}
                className={`block text-[12.5px] font-semibold py-[7px] px-2 rounded-lg border-b border-gray-50 transition-all ${
                  isCalcActive(id)
                    ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/8'
                    : 'text-gray-700 hover:text-[var(--color-brand-navy)] hover:bg-[var(--color-gold)]/10 hover:pl-3'
                }`}
                onClick={() => setOpenDropdown(null)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="px-3 py-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3 pb-2 border-b border-gray-100">
            Capital Gains & Withholding
          </div>
          <div className="flex flex-col">
            {[
              { id: 'gain-securities', label: 'Gain Tax on Securities' },
              { id: 'gain-mutual-funds', label: 'Gain Tax on Mutual Funds' },
              { id: 'gain-properties', label: 'Gain Tax on Properties' },
              { id: 'withholding-income-properties', label: 'Withholding Tax – Income from Properties' },
              { id: 'withholding-brokerage-commission', label: 'Withholding Tax – Brokerage & Commission' },
            ].map(({ id, label }) => (
              <Link
                key={id}
                to={`/pakistan-tax-calculators?calc=${id}`}
                className={`block text-[12.5px] font-semibold py-[7px] px-2 rounded-lg border-b border-gray-50 transition-all ${
                  isCalcActive(id)
                    ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/8'
                    : 'text-gray-700 hover:text-[var(--color-brand-navy)] hover:bg-[var(--color-gold)]/10 hover:pl-3'
                }`}
                onClick={() => setOpenDropdown(null)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="px-3 py-3">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-gold)] mb-3 pb-2 border-b border-gray-100">
            Income & Business Calculators
          </div>
          <div className="flex flex-col">
            {[
              { id: 'salary', label: 'Salary Tax Calculator' },
              { id: 'business', label: 'Business Tax Calculator' },
              { id: 'freelancer', label: 'Freelancer Tax Calculator' },
              { id: 'super-tax', label: 'Super Tax on Annual Income' },
              { id: 'company-income', label: 'Company Income Tax Calculator' },
              { id: 'builder', label: 'Builder Tax Calculator' },
              { id: 'developer', label: 'Developer Tax Calculator' },
            ].map(({ id, label }) => (
              <Link
                key={id}
                to={`/pakistan-tax-calculators?calc=${id}`}
                className={`block text-[12.5px] font-semibold py-[7px] px-2 rounded-lg border-b border-gray-50 transition-all ${
                  isCalcActive(id)
                    ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/8'
                    : 'text-gray-700 hover:text-[var(--color-brand-navy)] hover:bg-[var(--color-gold)]/10 hover:pl-3'
                }`}
                onClick={() => setOpenDropdown(null)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
        isScrolled ? 'bg-brand-solid shadow-2xl' : 'bg-black/95 backdrop-blur-md'
      }`}
    >
      {/* ── Main Nav Row ── */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3 sm:py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex min-w-0 flex-shrink-0 items-center gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.03 }} className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                src="/images/tax-zilla-logo.png"
                alt="Tax Zilla logo"
                className="h-8 w-8 shrink-0 rounded-md object-contain bg-white/5 ring-1 ring-white/10 sm:h-9 sm:w-9"
                loading="eager"
              />
              <h1 className="text-xl font-bold sm:text-2xl xl:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
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
