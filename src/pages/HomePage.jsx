import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Building2, TrendingUp, ArrowRight, MessageCircle,
  Phone, ShieldCheck, Clock, UserCheck, Award,
  CheckCircle, Star, Globe, Users, Landmark, MapPin,
  Cpu, Briefcase, Box, Heart, Home, Monitor, Truck,
  Calculator, ChevronDown, Mail, BadgeCheck,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import ClientTestimonials from '../components/ClientTestimonials.jsx';
import { SITE } from '../data/site.js';
import {
  EASE_OUT, VIEWPORT_REVEAL,
  getStaggerContainer, getStaggerItem, getScaleItem,
  fadeUp, revealUp, revealLeft, revealRight, revealScale,
  usePageMotion,
} from '../lib/motion.js';

/* ── Shared decorative grid ─────────────────────────── */
const Grid = ({ opacity = 0.04 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage:
        'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />
);

/* ── Section heading helper ─────────────────────────── */
const SectionHead = ({ eyebrow, title, subtitle, light = false, centered = true }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      {...revealUp(0, reduce)}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${
          light
            ? 'border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
            : 'border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 text-[var(--color-gold-dark)]'
        }`}>
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-gray-900'}`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl ${centered ? 'mx-auto' : ''} text-base leading-relaxed ${light ? 'text-gray-300' : 'text-[var(--color-text-muted)]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

/* ── Animated number counter ────────────────────────── */
const CountUp = ({ target, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setCount(target); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, reduce]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const FEATURED_SERVICES = [
  { title: 'Income Tax Filing', desc: 'FBR-compliant filing for individuals, AOPs, and companies with full slab guidance.', icon: FileText, count: 10, path: '/services/tax-services-pakistan' },
  { title: 'Company Registration', desc: 'SECP incorporation of Pvt Ltd, SMC, LLP, and partnership firms — done in days.', icon: Building2, count: 7, path: '/services/corporate-business-services' },
  { title: 'Sales Tax Services', desc: 'FBR & provincial GST registration, monthly returns, and notice handling.', icon: TrendingUp, count: 6, path: '/services/tax-services-pakistan' },
  { title: 'Freelancer Tax', desc: 'Reduced IT export tax rates, PSEB registration, and foreign income filing.', icon: Users, count: 5, path: '/services/high-demand-individual-services' },
  { title: 'Overseas Pakistani', desc: 'Non-resident filings, ATL activation, property tax, and TRC certificates.', icon: Globe, count: 6, path: '/services/overseas-pakistani-tax-services' },
  { title: 'International Services', desc: 'UAE, USA & Saudi Arabia tax registration, filing, and business setup advisory.', icon: Landmark, count: 19, path: '/services/uae-tax-services' },
];

const WHY_US = [
  { icon: ShieldCheck, title: 'Compliance-First', desc: 'Every service strictly aligned with FBR, SECP, ZATCA, and all applicable authorities.' },
  { icon: Clock, title: 'Timely Delivery', desc: 'Defined milestones, proactive status updates, and zero missed deadlines.' },
  { icon: UserCheck, title: 'Dedicated Expert', desc: 'One consultant owns your case from document collection to final confirmation.' },
  { icon: Award, title: '100% Confidential', desc: 'Your financial data is handled with strict professional secrecy and never shared.' },
];

const IMPACT_STATS = [
  { value: 500, suffix: '+', label: 'Satisfied Clients' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 70, suffix: '+', label: 'Services Offered' },
  { value: 4, suffix: '', label: 'Countries Served' },
  { value: 18, suffix: '', label: 'Tax Calculators' },
  { value: 99, suffix: '%', label: 'Client Retention' },
];

const PROCESS_STEPS = [
  { n: '01', icon: Phone, title: 'Initial Consultation', desc: 'Share your requirements — we assess scope, timeline, and fees. No surprises.' },
  { n: '02', icon: FileText, title: 'Document Gathering', desc: 'We share a precise checklist. You provide documents, we verify everything.' },
  { n: '03', icon: CheckCircle, title: 'Expert Preparation', desc: 'Our consultants prepare and review your filing with full compliance checks.' },
  { n: '04', icon: BadgeCheck, title: 'Submit & Confirm', desc: 'We submit on your behalf and send you confirmation with a copy of all records.' },
];

const CALCULATOR_TILES = [
  { id: 'salary', label: 'Salary Tax Calculator', cat: 'Income Tax' },
  { id: 'freelancer', label: 'Freelancer Tax Calculator', cat: 'Income Tax' },
  { id: 'gain-properties', label: 'Property Gain Tax', cat: 'Capital Gains' },
  { id: 'pta', label: 'PTA Mobile Tax', cat: 'Verification' },
];

const INDUSTRIES = [
  { icon: Cpu, title: 'IT & Technology', path: '/industries' },
  { icon: Briefcase, title: 'Professional Services', path: '/industries' },
  { icon: Box, title: 'Retail & E-commerce', path: '/industries' },
  { icon: Heart, title: 'Healthcare', path: '/industries' },
  { icon: Home, title: 'Real Estate', path: '/industries' },
  { icon: Truck, title: 'Manufacturing', path: '/industries' },
  { icon: Globe, title: 'Exporters', path: '/industries' },
  { icon: Monitor, title: 'Startups & SMEs', path: '/industries' },
];

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
const HomePage = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>Tax Zilla — Trusted Tax & Legal Consultancy in Pakistan</title>
        <meta
          name="description"
          content="Expert tax, legal, and compliance services in Pakistan. FBR filing, company registration, sales tax, overseas Pakistani services, UAE & USA tax. 500+ clients. Based in Lahore."
        />
      </Helmet>

      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        {/* Background layers */}
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_rgba(212,175,55,0.22),_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_100%,_rgba(59,130,246,0.08),_transparent)]" />
        <Grid opacity={0.05} />

        {/* Floating decorative orbs */}
        <motion.div
          className="absolute top-1/4 -left-24 h-72 w-72 rounded-full bg-[var(--color-gold)]/8 blur-3xl"
          animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-24 h-64 w-64 rounded-full bg-blue-500/6 blur-3xl"
          animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative z-10 container-custom px-4 pt-28 pb-16 sm:pt-32 md:pt-36">
          <div className="max-w-5xl mx-auto text-center">

            {/* Badge */}
            <motion.div {...fadeUp(0, reduce)} className="inline-block mb-6">
              <div className="relative overflow-hidden rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-5 py-2 backdrop-blur-sm tz-pill-shimmer">
                <span className="relative z-10 text-[var(--color-gold)] text-[11px] font-bold uppercase tracking-[0.3em] sm:text-xs">
                  Premier Tax & Legal Consultancy · Lahore, Pakistan
                </span>
              </div>
            </motion.div>

            {/* H1 — staggered lines */}
            <motion.div {...fadeUp(0.1, reduce)}>
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Simplify Your
              </h1>
            </motion.div>
            <motion.div {...fadeUp(0.2, reduce)}>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gradient-gold"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Tax & Legal
              </h1>
            </motion.div>
            <motion.div {...fadeUp(0.3, reduce)}>
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Compliance
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.42, reduce)}
              className="mx-auto max-w-2xl text-base font-light leading-relaxed text-gray-300 sm:text-lg md:text-xl mb-10"
            >
              We handle FBR, SECP, provincial, and international tax complexities — so you can focus entirely on growing your business.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.54, reduce)}
              className="flex flex-col justify-center gap-4 sm:flex-row mb-10"
            >
              <Button variant="primary" size="lg" onClick={() => navigate('/contact')} className="w-full font-bold sm:w-auto px-8">
                Book Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
                className="w-full sm:w-auto px-8"
              >
                <MessageCircle size={18} className="mr-2" /> WhatsApp Us
              </Button>
            </motion.div>

            {/* Contact pills */}
            <motion.div {...fadeUp(0.62, reduce)} className="flex flex-wrap justify-center gap-3 mb-14">
              <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold text-white/80 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)] transition-all backdrop-blur-sm">
                <Phone size={12} className="text-[var(--color-gold)]" /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold text-white/80 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)] transition-all backdrop-blur-sm">
                <Mail size={12} className="text-[var(--color-gold)]" /> {SITE.email}
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.7, reduce)}
              className="grid grid-cols-3 gap-4 border-t border-white/10 pt-10 max-w-lg mx-auto"
            >
              {[
                { v: '500+', l: 'Happy Clients' },
                { v: '10+', l: 'Years Experience' },
                { v: '70+', l: 'Services' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--color-gold)]">{s.v}</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} className="text-[var(--color-gold)]/50" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          2. TRUST STRIP
      ══════════════════════════════════════════════ */}
      <div className="relative z-20 -mt-1 border-b border-white/10" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-semibold text-gray-400">
            <span className="text-[var(--color-gold)] uppercase tracking-widest text-[10px]">Trusted across</span>
            {['🇵🇰 Pakistan', '🇦🇪 UAE', '🇺🇸 USA', '🇸🇦 Saudi Arabia'].map((c) => (
              <span key={c} className="text-gray-300">{c}</span>
            ))}
            <span className="hidden sm:inline text-gray-600">·</span>
            <span className="text-gray-300 hidden sm:inline">500+ businesses & individuals</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. FEATURED SERVICES
      ══════════════════════════════════════════════ */}
      <section className="section-padding relative z-20 -mt-1 rounded-t-[2rem] bg-white sm:rounded-t-[2.5rem] md:rounded-t-[3rem]">
        <div className="container-custom">
          <SectionHead
            eyebrow="Our Services"
            title={<>Comprehensive <span className="text-[var(--color-gold)]">Tax & Legal</span> Solutions</>}
            subtitle="From individual tax filing to corporate registration and international compliance — 70+ services, all under one roof."
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={getStaggerContainer(reduce, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REVEAL}
          >
            {FEATURED_SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={getScaleItem(reduce)}
                whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.22, ease: EASE_OUT } }}
                className="group relative card-surface p-6 flex flex-col cursor-pointer overflow-hidden"
                onClick={() => navigate(s.path)}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                    <s.icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{s.count} services</span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-5 flex-grow leading-relaxed">{s.desc}</p>
                <div className="mt-auto flex items-center gap-1 text-sm font-bold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={15} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...revealUp(0.1, reduce)} className="mt-10 text-center">
            <Button variant="secondary" size="lg" onClick={() => navigate('/services')}>
              View All 70+ Services <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. WHY CHOOSE US
      ══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <SectionHead
            eyebrow="Why Tax Zilla"
            title={<>Why 500+ Clients <span className="text-[var(--color-gold)]">Trust Us</span></>}
            subtitle="Our approach is built around your compliance, confidence, and long-term peace of mind."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                {...revealUp(i * 0.1, reduce)}
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

      {/* ══════════════════════════════════════════════
          5. IMPACT NUMBERS (dark)
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-24 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <Grid opacity={0.05} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,_rgba(212,175,55,0.1),_transparent)]" />

        <div className="container-custom relative z-10">
          <SectionHead
            eyebrow="Our Impact"
            title={<>Numbers That <span className="text-[var(--color-gold)]">Speak for Themselves</span></>}
            subtitle="A decade of trusted expertise, hundreds of satisfied clients, and a growing presence across Pakistan and beyond."
            light
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...revealScale(i * 0.08, reduce)}
                className="text-center p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-[var(--color-gold)] mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. OUR PROCESS
      ══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHead
            eyebrow="How It Works"
            title={<>A Process Built for <span className="text-[var(--color-gold)]">Zero Stress</span></>}
            subtitle="From first contact to final confirmation — every step is defined, transparent, and in your hands."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[var(--color-gold)]/20 hidden lg:block" />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                {...revealUp(i * 0.12, reduce)}
                className="relative group text-center"
              >
                <div className="relative z-10 mx-auto mb-5 h-16 w-16 rounded-full flex items-center justify-center border-2 border-[var(--color-gold)]/30 bg-white shadow-md group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)] transition-all duration-300">
                  <step.icon size={24} className="text-[var(--color-gold)] group-hover:text-black transition-colors duration-300" />
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--color-gold)] text-black text-[10px] font-extrabold flex items-center justify-center">
                    {step.n}
                  </div>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...revealUp(0.2, reduce)} className="mt-12 text-center">
            <Button variant="secondary" onClick={() => navigate('/our-process')}>
              See Full Process <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. TAX CALCULATORS TEASER
      ══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <SectionHead
            eyebrow="Free Tools · FY 2025–26"
            title={<>Pakistan Tax <span className="text-[var(--color-gold)]">Calculators</span></>}
            subtitle="17 free professional calculators with official FBR 2025–26 rates. No login, no signup."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {CALCULATOR_TILES.map((calc, i) => (
              <motion.div
                key={calc.id}
                {...revealScale(i * 0.1, reduce)}
                className="group card-surface p-5 cursor-pointer hover:border-[var(--color-gold)]/50 transition-all"
                onClick={() => navigate(`/pakistan-tax-calculators?calc=${calc.id}`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all">
                    <Calculator size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)] bg-[var(--color-gold)]/10 rounded-full px-2 py-0.5">
                    {calc.cat}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {calc.label}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">FY 2025–26 · Free</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[var(--color-gold)]">
                  Try Now <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...revealUp(0.15, reduce)} className="text-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/pakistan-tax-calculators')}>
              <Calculator size={18} className="mr-2" /> Try All 17 Calculators — Free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <ClientTestimonials />
      </section>

      {/* ══════════════════════════════════════════════
          9. INDUSTRIES
      ══════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <SectionHead
            eyebrow="Industries We Serve"
            title={<>Expert Compliance for <span className="text-[var(--color-gold)]">Every Sector</span></>}
            subtitle="Sector-specific knowledge across 8 industries — from IT startups to manufacturing giants."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.title}
                {...revealScale(i * 0.05, reduce)}
                className="group card-surface p-4 text-center cursor-pointer hover:border-[var(--color-gold)]/50 transition-all"
                onClick={() => navigate(ind.path)}
              >
                <div className="mx-auto mb-3 h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                  <ind.icon size={20} />
                </div>
                <p className="text-xs font-bold text-gray-700 group-hover:text-[var(--color-gold)] transition-colors leading-snug">{ind.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...revealUp(0.15, reduce)} className="text-center">
            <Button variant="secondary" onClick={() => navigate('/industries')}>
              Explore Industries <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          10. FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-24 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,_rgba(212,175,55,0.15),_transparent)]" />
        <Grid opacity={0.05} />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left */}
            <motion.div {...revealLeft(0, reduce)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-6">
                Get Started Today
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Ready to Simplify{' '}
                <span className="text-[var(--color-gold)]">Your Compliance?</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">
                Join 500+ businesses and individuals who trust Tax Zilla for FBR filing, company registration, and comprehensive tax advisory — across Pakistan, UAE, USA, and Saudi Arabia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                  Book Free Consultation
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}>
                  <MessageCircle size={18} className="mr-2" /> WhatsApp Now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {['FBR Registered', 'SECP Compliant', '100% Confidential', 'Remote Friendly'].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 rounded-full bg-white/8 border border-white/10 px-3 py-1.5 text-xs text-gray-300 font-medium">
                    <CheckCircle size={12} className="text-[var(--color-gold)]" /> {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact cards */}
            <motion.div {...revealRight(0.1, reduce)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={`tel:${SITE.phoneTel}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all">
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Call / WhatsApp</div>
                  <div className="font-bold text-white text-sm mt-0.5">{SITE.phone}</div>
                </div>
              </a>

              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all">
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Email</div>
                  <div className="font-bold text-white text-sm mt-0.5 break-all">{SITE.email}</div>
                </div>
              </a>

              <Link to="/services" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5 transition-all">
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Explore</div>
                  <div className="font-bold text-white text-sm mt-0.5">All 70+ Services</div>
                </div>
              </Link>

              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 p-5 hover:bg-[var(--color-gold)]/20 transition-all">
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/20 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">WhatsApp</div>
                  <div className="font-bold text-white text-sm mt-0.5">Instant Response</div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
