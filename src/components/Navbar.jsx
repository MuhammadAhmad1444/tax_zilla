import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, ArrowRight, Phone, Mail, MessageCircle,
  Calculator, Building2, Globe, ShieldCheck, FileText, Briefcase,
  MapPin, Scale, Settings, Wrench, Users, CheckCircle, User, Search,
  TrendingUp, FileCheck, Landmark, ChevronRight,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/serviceCatalog.js';
import { SITE } from '../data/site.js';

/* ─── shared menu style ─────────────────────────────────────── */
const MENU_STYLE = {
  background: 'rgba(8, 20, 30, 0.98)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  borderTop: '2px solid rgba(212,175,55,0.4)',
  borderBottom: '1px solid rgba(212,175,55,0.08)',
  boxShadow: '0 32px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(212,175,55,0.12)',
  zIndex: 40,
};

const GOLD  = '#D4AF37';
const NAVY  = '#0b1c29';

/* ─── reusable sub-components ───────────────────────────────── */
const ColHeader = ({ label }) => (
  <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
    <span className="w-3 h-px flex-shrink-0" style={{ background: GOLD }} />
    <h4
      className="text-[10px] font-bold uppercase tracking-[0.18em]"
      style={{ color: GOLD, fontFamily: 'var(--font-heading)' }}
    >
      {label}
    </h4>
  </div>
);

const MenuLink = ({ to, onClick, children, active }) => (
  <Link
    to={to}
    onClick={onClick}
    className="group flex items-center gap-2.5 px-2 py-1.5 rounded transition-all duration-150 hover:bg-white/[0.04]"
    style={active ? { background: 'rgba(212,175,55,0.08)', borderLeft: `2px solid ${GOLD}`, paddingLeft: '6px' } : {}}
  >
    <span
      className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-150"
      style={{ background: active ? GOLD : 'rgba(255,255,255,0.18)' }}
    />
    <span
      className="text-[11px] leading-snug transition-colors duration-150 group-hover:text-white"
      style={{ color: active ? GOLD : 'rgba(255,255,255,0.55)' }}
    >
      {children}
    </span>
  </Link>
);

const MenuFooter = ({ trustText, badges, viewAllTo, viewAllLabel, onClose }) => (
  <div
    className="py-2.5 px-6 flex items-center justify-between"
    style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
  >
    {badges ? (
      <div className="flex items-center gap-4">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(212,175,55,0.12)' }}
            >
              <Icon size={10} style={{ color: GOLD }} />
            </div>
            <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <span className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>
        {trustText}
      </span>
    )}
    <Link
      to={viewAllTo}
      onClick={onClose}
      className="flex items-center gap-1 text-[10px] font-semibold transition-opacity hover:opacity-80"
      style={{ color: GOLD }}
    >
      {viewAllLabel} <ArrowRight size={9} />
    </Link>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [navBottom, setNavBottom]     = useState(80);

  const location   = useLocation();
  const navigate   = useNavigate();
  const navRef     = useRef(null);
  const taxMenuWrapperRef      = useRef(null);
  const servicesMenuWrapperRef = useRef(null);
  const closeTimerRef          = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  const activeCalc   = searchParams.get('calc');

  /* ── measure navbar height ─────────────────────────────────
     offsetHeight is transform-independent — stays accurate even
     while the entrance animation (translateY) is still running.
     getBoundingClientRect().bottom includes transform offsets
     and can return a wrong value during page-transition animations.
  ─────────────────────────────────────────────────────────── */
  const measure = () => {
    if (navRef.current) {
      setNavBottom(navRef.current.offsetHeight);
    }
  };

  const openMenu = (menu) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    // Re-measure inside rAF so any pending paint/layout is flushed first
    requestAnimationFrame(() => {
      if (navRef.current) setNavBottom(navRef.current.offsetHeight);
    });
    setOpenDropdown(menu);
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  useEffect(() => {
    const onScroll = () => { setIsScrolled(window.scrollY > 20); measure(); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!openDropdown) return;
    const onMouseDown = (e) => {
      if (taxMenuWrapperRef.current?.contains(e.target)) return;
      if (servicesMenuWrapperRef.current?.contains(e.target)) return;
      setOpenDropdown(null);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [openDropdown]);

  /* ── helpers ────────────────────────────────────────────── */
  const isActive = (path) => {
    if (path === '/services')
      return location.pathname === '/services' || location.pathname.startsWith('/services/');
    return location.pathname === path || (path !== '/' && location.pathname === `${path}/`);
  };

  const isTaxActive  = () =>
    location.pathname === '/pakistan-tax-calculators' ||
    location.pathname === '/pakistan-tax-calculators/';

  const isCalcActive = (id) => isTaxActive() && activeCalc === id;

  const navItems = [
    { name: 'Home',     path: '/' },
    { name: 'About',    path: '/about' },
    { name: 'Why Us',   path: '/why-choose-us' },
    { name: 'Process',  path: '/our-process' },
    { name: 'Industries', path: '/industries' },
    { name: 'Services', path: '/services' },
    { name: 'Tax Calculators 2025-2026', path: '/pakistan-tax-calculators' },
    { name: 'Blog',     path: '/blog' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQs',     path: '/faqs' },
    { name: 'Contact',  path: '/contact' },
  ];

  const closeMenu = () => setOpenDropdown(null);

  /* ══ SERVICES MEGA MENU ══════════════════════════════════════ */
  const ServicesMegaMenu = () => createPortal(
    <motion.div
      key="services-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'fixed', top: `${navBottom}px`, left: 0, right: 0, width: '100vw', zIndex: 9999, ...MENU_STYLE }}
      role="menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <div className="container-custom py-5 px-6 flex gap-10">

        {/* ── 4 columns ── */}
        <div className="flex-1 grid grid-cols-4 gap-6">

          {/* Pakistan */}
          <div>
            <ColHeader label="Pakistan" />
            <div className="space-y-0.5">
              {SERVICE_CATEGORIES
                .filter(c => ['tax-services-pakistan','individual-tax-services','certificates-compliance','audit-investigation'].includes(c.slug))
                .map(cat => (
                  <MenuLink key={cat.id} to={`/services/${cat.slug}`} onClick={closeMenu}>
                    {cat.title}
                  </MenuLink>
                ))}
            </div>
          </div>

          {/* Corporate */}
          <div>
            <ColHeader label="Corporate" />
            <div className="space-y-0.5">
              {SERVICE_CATEGORIES
                .filter(c => ['corporate-business-services','secp-related-services','intellectual-property'].includes(c.slug))
                .map(cat => (
                  <MenuLink key={cat.id} to={`/services/${cat.slug}`} onClick={closeMenu}>
                    {cat.title}
                  </MenuLink>
                ))}
            </div>
          </div>

          {/* International */}
          <div>
            <ColHeader label="International" />
            <div className="space-y-0.5">
              {SERVICE_CATEGORIES
                .filter(c => ['uae-tax-services','usa-tax-services','ksa-tax-services','uk-tax-services'].includes(c.slug))
                .map(cat => (
                  <MenuLink key={cat.id} to={`/services/${cat.slug}`} onClick={closeMenu}>
                    {cat.title}
                  </MenuLink>
                ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <ColHeader label="Legal Services" />
            <div className="space-y-0.5">
              {[
                { id: 'l1', to: '/services/legal-services',                         label: 'Legal Services' },
                { id: 'l2', to: '/services/legal-services/criminal-law-services',   label: 'Criminal Law' },
                { id: 'l3', to: '/services/legal-services/civil-law-services',      label: 'Civil Law' },
              ].map(({ id, to, label }) => (
                <MenuLink key={id} to={to} onClick={closeMenu}>{label}</MenuLink>
              ))}
            </div>
          </div>

        </div>

        {/* ── CTA card ── */}
        <div className="w-52 flex-shrink-0">
          <div
            className="p-5 h-full flex flex-col"
            style={{
              border: `1px solid rgba(212,175,55,0.22)`,
              background: 'linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.02) 100%)',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(212,175,55,0.12)' }}
            >
              <CheckCircle size={16} style={{ color: GOLD }} />
            </div>
            <h3
              className="text-sm font-bold text-white mb-2 leading-snug"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Expert Guidance
            </h3>
            <p className="text-[11px] leading-relaxed mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Dedicated tax & legal professionals ready to help you navigate every regulation.
            </p>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="block w-full py-2.5 text-center text-[11px] font-bold tracking-wide transition-opacity hover:opacity-90"
              style={{ background: GOLD, color: NAVY }}
            >
              Free Consultation
            </Link>
          </div>
        </div>

      </div>

      <MenuFooter
        badges={[
          { icon: ShieldCheck, label: 'FBR Registered' },
          { icon: CheckCircle, label: '997+ Clients' },
          { icon: Globe,       label: '3+ Countries' },
          { icon: Users,       label: 'Dedicated Expert' },
        ]}
        viewAllTo="/services"
        viewAllLabel="View All Services"
        onClose={closeMenu}
      />
    </motion.div>,
    document.body
  );

  /* ══ TAX CALCULATORS MEGA MENU ══════════════════════════════ */
  const TaxCalculatorsMegaMenu = () => createPortal(
    <motion.div
      key="tax-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'fixed', top: `${navBottom}px`, left: 0, right: 0, width: '100vw', zIndex: 9999, ...MENU_STYLE }}
      role="menu"
      aria-label="Tax Calculators menu"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Menu header bar */}
      <div
        className="container-custom py-2.5 px-6 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(212,175,55,0.12)', background: 'rgba(0,0,0,0.2)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.12)' }}
          >
            <Calculator size={13} style={{ color: GOLD }} />
          </div>
          <div>
            <h4
              className="text-[11px] font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Tax Calculators 2025–26
            </h4>
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              FBR Official Rates
            </p>
          </div>
        </div>
        <Link
          to="/pakistan-tax-calculators"
          onClick={closeMenu}
          className="flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold transition-opacity hover:opacity-90"
          style={{ background: GOLD, color: NAVY }}
        >
          All Calculators <ArrowRight size={11} />
        </Link>
      </div>

      {/* 3-column grid */}
      <div className="container-custom grid grid-cols-3 gap-0 py-4 px-6">

        {/* Essentials */}
        <div className="pr-6" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <ColHeader label="Essentials" />
          <div className="space-y-0.5">
            {[
              { id: 'pta',           label: 'PTA Tax Calculator' },
              { id: 'zakat',         label: 'Zakat Calculator' },
              { id: 'fbr-online',    label: 'FBR Online Verifications' },
              { id: 'value-added-tax', label: 'Supply of Goods Tax' },
              { id: 'agri-land-punjab', label: 'Agricultural Land Tax' },
            ].map(({ id, label }) => (
              <MenuLink
                key={id}
                to={`/pakistan-tax-calculators?calc=${id}`}
                onClick={closeMenu}
                active={isCalcActive(id)}
              >
                {label}
              </MenuLink>
            ))}
          </div>
        </div>

        {/* Capital Gains */}
        <div className="px-6" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <ColHeader label="Capital Gains" />
          <div className="space-y-0.5">
            {[
              { id: 'gain-securities',              label: 'Gain Tax on Securities' },
              { id: 'gain-mutual-funds',             label: 'Gain Tax on Mutual Funds' },
              { id: 'gain-properties',               label: 'Gain Tax on Properties' },
              { id: 'withholding-income-properties', label: 'Withholding – Properties' },
              { id: 'withholding-brokerage-commission', label: 'Withholding – Brokerage' },
            ].map(({ id, label }) => (
              <MenuLink
                key={id}
                to={`/pakistan-tax-calculators?calc=${id}`}
                onClick={closeMenu}
                active={isCalcActive(id)}
              >
                {label}
              </MenuLink>
            ))}
          </div>
        </div>

        {/* Income & Business */}
        <div className="pl-6">
          <ColHeader label="Income & Business" />
          <div className="space-y-0.5">
            {[
              { id: 'salary',       label: 'Salary Tax Calculator' },
              { id: 'business',     label: 'Business Tax Calculator' },
              { id: 'freelancer',   label: 'Freelancer Tax Calculator' },
              { id: 'super-tax',    label: 'Super Tax on Income' },
              { id: 'company-income', label: 'Company Income Tax' },
              { id: 'builder',      label: 'Builder Tax Calculator' },
              { id: 'developer',    label: 'Developer Tax Calculator' },
            ].map(({ id, label }) => (
              <MenuLink
                key={id}
                to={`/pakistan-tax-calculators?calc=${id}`}
                onClick={closeMenu}
                active={isCalcActive(id)}
              >
                {label}
              </MenuLink>
            ))}
          </div>
        </div>

      </div>

      <MenuFooter
        trustText="Free · Instant · Official FBR Rates"
        viewAllTo="/pakistan-tax-calculators"
        viewAllLabel="All Calculators"
        onClose={closeMenu}
      />
    </motion.div>,
    document.body
  );

  /* ══ RENDER ══════════════════════════════════════════════════ */
  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
        isScrolled ? 'nav-glass-scrolled' : 'nav-glass-top'
      }`}
    >
      {/* Gold top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.55) 25%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.55) 75%, transparent 100%)' }}
      />

      {/* ── Main nav row ── */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between gap-6">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5">
                <img
                  src="/images/brand-mark.png"
                  alt="Tax Zilla"
                  className="object-contain flex-shrink-0"
                  style={{ height: '52px', width: 'auto', maxWidth: '190px' }}
                  loading="eager"
                />
                <span
                  className="text-xl font-bold text-white leading-none"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Tax <span style={{ color: GOLD }}>Zilla</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center gap-4 flex-1 justify-end flex-wrap-0">

              {navItems.map((item) => {
                const isServices = item.path === '/services';
                const isTaxCalc  = item.path === '/pakistan-tax-calculators';
                const hasDropdown = isServices || isTaxCalc;
                const active = isActive(item.path);

                return (
                  <div
                    key={item.path}
                    className="relative"
                    ref={isTaxCalc ? taxMenuWrapperRef : isServices ? servicesMenuWrapperRef : null}
                    onMouseEnter={hasDropdown ? () => openMenu(isServices ? 'services' : 'tax-calculators') : undefined}
                    onMouseLeave={hasDropdown ? scheduleClose : undefined}
                  >
                    {hasDropdown ? (
                      <>
                        <Link
                          to={item.path}
                          onClick={closeMenu}
                          className="flex items-center gap-0.5 group"
                        >
                          <span
                            className="text-[12px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                            style={{ color: active ? GOLD : 'rgba(255,255,255,0.72)' }}
                            onMouseEnter={e => { if (!active) e.target.style.color = '#fff'; }}
                            onMouseLeave={e => { if (!active) e.target.style.color = 'rgba(255,255,255,0.72)'; }}
                          >
                            {item.name}
                          </span>
                          <ChevronDown
                            size={13}
                            className="transition-transform duration-200 ml-0.5"
                            style={{
                              color: 'rgba(212,175,55,0.55)',
                              transform: openDropdown === (isServices ? 'services' : 'tax-calculators') ? 'rotate(180deg)' : 'none',
                            }}
                          />
                        </Link>
                        {active && (
                          <span
                            className="absolute -bottom-1 left-0 right-0 h-px"
                            style={{ background: `rgba(212,175,55,0.5)` }}
                          />
                        )}
                        <AnimatePresence>
                          {openDropdown === (isServices ? 'services' : 'tax-calculators') && (
                            isServices
                              ? <ServicesMegaMenu key="services" />
                              : <TaxCalculatorsMegaMenu key="tax" />
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={item.path} className="relative group">
                        <span
                          className="text-[12px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                          style={{ color: active ? GOLD : 'rgba(255,255,255,0.72)' }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-px origin-left transition-transform duration-300"
                          style={{
                            background: GOLD,
                            transform: active ? 'scaleX(1)' : 'scaleX(0)',
                          }}
                        />
                        {!active && (
                          <span
                            className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            style={{ background: `rgba(212,175,55,0.45)` }}
                          />
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* CTA */}
              <Link
                to="/contact"
                className="ml-2 px-4 py-2 text-[12px] font-bold tracking-wide transition-opacity duration-200 hover:opacity-90 flex-shrink-0 whitespace-nowrap"
                style={{ background: GOLD, color: NAVY, borderRadius: 0 }}
              >
                Free Consultation
              </Link>

            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden min-h-[44px] min-w-[44px] flex-shrink-0 text-white flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>
        </div>
      </div>

      {/* ── Mobile nav ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden absolute left-0 right-0 w-full max-h-[min(88dvh,36rem)] overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(8, 20, 30, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: `1px solid rgba(212,175,55,0.2)`,
            }}
          >
            <div className="container-custom max-h-[inherit] overflow-y-auto overscroll-contain py-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">

              {/* Nav items */}
              <div className="space-y-0.5 mb-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.22, ease: [0.22,1,0.36,1] }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center justify-between min-h-[46px] px-4 py-2.5 text-sm font-medium transition-all duration-200"
                      style={
                        isActive(item.path)
                          ? { background: GOLD, color: NAVY, fontWeight: 700 }
                          : { color: 'rgba(255,255,255,0.75)' }
                      }
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Service categories */}
              <div className="mb-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] px-4 mb-3" style={{ color: GOLD }}>
                  Service Categories
                </p>
                <div className="grid grid-cols-2 gap-0.5">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/services/${cat.slug}`}
                      className="block py-2 px-4 text-[11px] leading-snug transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] px-4 mb-3" style={{ color: GOLD }}>Contact Us</p>
                <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-3 py-2.5 px-4 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <Phone size={13} style={{ color: GOLD, flexShrink: 0 }} />
                  <span className="truncate">{SITE.phone}</span>
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 py-2.5 px-4 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <Mail size={13} style={{ color: GOLD, flexShrink: 0 }} />
                  <span className="truncate">{SITE.email}</span>
                </a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2.5 px-4 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <MessageCircle size={13} style={{ color: GOLD, flexShrink: 0 }} />
                  WhatsApp Now
                </a>
              </div>

              {/* Legal */}
              <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] px-4 mb-2" style={{ color: GOLD }}>Legal</p>
                <Link to="/legal/privacy-policy"    className="block py-2 px-4 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>Privacy Policy</Link>
                <Link to="/legal/terms-conditions"  className="block py-2 px-4 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>Terms &amp; Conditions</Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
