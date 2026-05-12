import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Building2, TrendingUp, ArrowRight, MessageCircle,
  Phone, ShieldCheck, Clock, UserCheck, Award,
  CheckCircle, Star, Globe, Users, Landmark,
  Cpu, Briefcase, Box, Heart, Home, Monitor, Truck,
  Calculator, ChevronDown, Mail, BadgeCheck, Sparkles,
  TrendingDown, Zap,
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

/* ── Gold grid overlay ─────────────────────────────── */
const Grid = ({ opacity = 0.04 }) => (
  <div className="absolute inset-0 pointer-events-none" style={{
    opacity,
    backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
    backgroundSize: '64px 64px',
  }} />
);

/* ── Floating orb ──────────────────────────────────── */
const Orb = ({ className, duration = 8, delay = 0, reduce }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={reduce ? {} : {
      scale: [1, 1.15, 1],
      opacity: [0.35, 0.65, 0.35],
      x: [0, 20, 0],
      y: [0, -15, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ── Animated section heading ──────────────────────── */
const SectionHead = ({ eyebrow, title, subtitle, light = false, centered = true }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div {...revealUp(0, reduce)} className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${
            light
              ? 'border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
              : 'border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 text-[var(--color-gold-dark)]'
          }`}
        >
          {eyebrow}
        </motion.div>
      )}
      <h2 className={`text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-gray-900'}`}
        style={{ fontFamily: 'var(--font-heading)' }}>
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

/* ── Animated counter ──────────────────────────────── */
const CountUp = ({ target, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { setCount(target); return; }
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, reduce]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const FEATURED_SERVICES = [
  { title: 'Income Tax Filing', desc: 'FBR-compliant filing for individuals, AOPs, and companies with full slab guidance.', icon: FileText, count: 10, path: '/services/tax-services-pakistan', color: 'from-amber-500/20 to-yellow-600/5' },
  { title: 'Company Registration', desc: 'SECP incorporation of Pvt Ltd, SMC, LLP, and partnership firms — done in days.', icon: Building2, count: 7, path: '/services/corporate-business-services', color: 'from-blue-500/10 to-indigo-600/5' },
  { title: 'Sales Tax Services', desc: 'FBR & provincial GST registration, monthly returns, and notice handling.', icon: TrendingUp, count: 6, path: '/services/tax-services-pakistan', color: 'from-emerald-500/10 to-teal-600/5' },
  { title: 'Freelancer Tax', desc: 'Reduced IT export tax rates, PSEB registration, and foreign income filing.', icon: Users, count: 5, path: '/services/high-demand-individual-services', color: 'from-purple-500/10 to-violet-600/5' },
  { title: 'Overseas Pakistani', desc: 'Non-resident filings, ATL activation, property tax, and TRC certificates.', icon: Globe, count: 6, path: '/services/overseas-pakistani-tax-services', color: 'from-rose-500/10 to-pink-600/5' },
  { title: 'International Services', desc: 'UAE, USA & Saudi Arabia tax registration, filing, and business setup advisory.', icon: Landmark, count: 19, path: '/services/uae-tax-services', color: 'from-cyan-500/10 to-sky-600/5' },
];

const WHY_US = [
  { icon: ShieldCheck, title: 'Compliance-First', desc: 'Every service strictly aligned with FBR, SECP, ZATCA, and all applicable authorities.' },
  { icon: Clock, title: 'Timely Delivery', desc: 'Defined milestones, proactive status updates, and zero missed deadlines.' },
  { icon: UserCheck, title: 'Dedicated Expert', desc: 'One consultant owns your case from document collection to final confirmation.' },
  { icon: Award, title: '100% Confidential', desc: 'Your financial data is handled with strict professional secrecy and never shared.' },
];

const IMPACT_STATS = [
  { value: 500, suffix: '+', label: 'Satisfied Clients', icon: Users },
  { value: 10, suffix: '+', label: 'Years of Experience', icon: Award },
  { value: 70, suffix: '+', label: 'Services Offered', icon: FileText },
  { value: 4, suffix: '', label: 'Countries Served', icon: Globe },
  { value: 18, suffix: '', label: 'Tax Calculators', icon: Calculator },
  { value: 99, suffix: '%', label: 'Client Retention', icon: Star },
];

const PROCESS_STEPS = [
  { n: '01', icon: Phone, title: 'Initial Consultation', desc: 'Share your requirements — we assess scope, timeline, and fees. No surprises.' },
  { n: '02', icon: FileText, title: 'Document Gathering', desc: 'We share a precise checklist. You provide documents, we verify everything.' },
  { n: '03', icon: CheckCircle, title: 'Expert Preparation', desc: 'Our consultants prepare and review your filing with full compliance checks.' },
  { n: '04', icon: BadgeCheck, title: 'Submit & Confirm', desc: 'We submit on your behalf and send you confirmation with a copy of all records.' },
];

const CALCULATOR_TILES = [
  { id: 'salary', label: 'Salary Tax', cat: 'Income Tax', icon: Users },
  { id: 'freelancer', label: 'Freelancer Tax', cat: 'Income Tax', icon: Zap },
  { id: 'gain-properties', label: 'Property CGT', cat: 'Capital Gains', icon: Home },
  { id: 'pta', label: 'PTA Mobile Tax', cat: 'Verification', icon: Phone },
];

const INDUSTRIES = [
  { icon: Cpu, title: 'IT & Tech' },
  { icon: Briefcase, title: 'Professional' },
  { icon: Box, title: 'E-commerce' },
  { icon: Heart, title: 'Healthcare' },
  { icon: Home, title: 'Real Estate' },
  { icon: Truck, title: 'Manufacturing' },
  { icon: Globe, title: 'Exporters' },
  { icon: Monitor, title: 'Startups' },
];

const SPRING = { type: 'spring', stiffness: 300, damping: 20 };
const SPRING_SOFT = { type: 'spring', stiffness: 200, damping: 22 };

/* ═══════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════ */
const HomePage = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>Tax Zilla — Trusted Tax & Legal Consultancy in Pakistan</title>
        <meta name="description" content="Expert tax, legal, and compliance services in Pakistan. FBR filing, company registration, sales tax, overseas Pakistani services, UAE & USA tax. 500+ clients. Based in Lahore." />
      </Helmet>

      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_rgba(212,175,55,0.24),_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_100%,_rgba(59,130,246,0.08),_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_60%,_rgba(212,175,55,0.06),_transparent)]" />
        <Grid opacity={0.05} />

        {/* Animated orbs */}
        <Orb className="top-1/4 -left-32 h-80 w-80 bg-[var(--color-gold)]/8" duration={9} delay={0} reduce={reduce} />
        <Orb className="bottom-1/4 -right-32 h-72 w-72 bg-blue-500/6" duration={11} delay={2} reduce={reduce} />
        <Orb className="top-3/4 left-1/4 h-48 w-48 bg-[var(--color-gold)]/5" duration={7} delay={4} reduce={reduce} />
        <Orb className="top-1/3 right-1/4 h-32 w-32 bg-purple-500/4" duration={13} delay={1} reduce={reduce} />

        <div className="relative z-10 container-custom px-4 pt-28 pb-16 sm:pt-32 md:pt-36">
          <div className="max-w-5xl mx-auto text-center">

            {/* Animated badge */}
            <motion.div {...fadeUp(0, reduce)} className="inline-block mb-6">
              <motion.div
                whileHover={reduce ? {} : { scale: 1.05 }}
                transition={SPRING}
                className="relative overflow-hidden rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-5 py-2 backdrop-blur-sm tz-pill-shimmer cursor-default"
              >
                <span className="relative z-10 text-[var(--color-gold)] text-[11px] font-bold uppercase tracking-[0.3em] sm:text-xs">
                  ✦ Premier Tax & Legal Consultancy
                </span>
              </motion.div>
            </motion.div>

            {/* H1 — staggered with spring */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: reduce ? 0 : 0.08 }}
            >
              <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Simplify Your
              </h1>
            </motion.div>
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: reduce ? 0 : 0.18 }}
            >
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gradient-gold"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Tax & Legal
              </h1>
            </motion.div>
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: reduce ? 0 : 0.28 }}
            >
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
              From tax filings to complex compliance matters, we manage everything professionally so you stay worry-free.
            </motion.p>

            {/* CTA buttons with spring hover */}
            <motion.div {...fadeUp(0.54, reduce)} className="flex flex-col justify-center gap-4 sm:flex-row mb-10">
              <motion.div whileHover={reduce ? {} : { scale: 1.04 }} whileTap={reduce ? {} : { scale: 0.97 }} transition={SPRING}>
                <Button variant="primary" size="lg" onClick={() => navigate('/contact')} className="w-full font-bold sm:w-auto px-8">
                  Book Free Consultation
                </Button>
              </motion.div>
              <motion.div whileHover={reduce ? {} : { scale: 1.04 }} whileTap={reduce ? {} : { scale: 0.97 }} transition={SPRING}>
                <Button variant="outline" size="lg" onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')} className="w-full sm:w-auto px-8">
                  <MessageCircle size={18} className="mr-2" /> WhatsApp Us
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact pills */}
            <motion.div {...fadeUp(0.62, reduce)} className="flex flex-wrap justify-center gap-3 mb-14">
              {[
                { href: `tel:${SITE.phoneTel}`, icon: Phone, label: SITE.phone },
                { href: `mailto:${SITE.email}`, icon: Mail, label: SITE.email },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={reduce ? {} : { scale: 1.05, borderColor: 'rgba(212,175,55,0.6)' }}
                  transition={SPRING_SOFT}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold text-white/80 hover:text-[var(--color-gold)] transition-colors backdrop-blur-sm"
                >
                  <Icon size={12} className="text-[var(--color-gold)]" /> {label}
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.7, reduce)} className="grid grid-cols-3 gap-4 border-t border-white/10 pt-10 pb-10 max-w-lg mx-auto">
              {[
                { v: '997+', l: 'Happy Clients' },
                { v: '10+', l: 'Yrs Experience' },
                { v: '70+', l: 'Services' },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={reduce ? {} : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.72 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
                  className="text-center"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--color-gold)]">{s.v}</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1">{s.l}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — positioned below stats, no overlap */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
          initial={reduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-[var(--color-gold)]/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          2. TRUST STRIP (marquee-style)
      ══════════════════════════════════════════════ */}
      <div className="relative z-20 -mt-1 border-b border-white/10 overflow-hidden" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-semibold text-gray-400">
            <motion.span
              className="text-[var(--color-gold)] uppercase tracking-widest text-[10px]"
              animate={reduce ? {} : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦ Trusted across
            </motion.span>
            {['🇵🇰 Pakistan', '🇦🇪 UAE', '🇺🇸 USA', '🇸🇦 Saudi Arabia'].map((c, i) => (
              <motion.span
                key={c}
                className="text-gray-300"
                initial={reduce ? {} : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                {c}
              </motion.span>
            ))}
            <span className="hidden sm:inline text-gray-600">·</span>
            <span className="text-gray-300 hidden sm:inline">997+ businesses & individuals</span>
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
            variants={getStaggerContainer(reduce, 0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_REVEAL}
          >
            {FEATURED_SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={getScaleItem(reduce)}
                whileHover={reduce ? undefined : { y: -10, boxShadow: '0 24px 48px rgba(212,175,55,0.18)', transition: SPRING }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="group relative card-surface p-6 flex flex-col cursor-pointer overflow-hidden"
                onClick={() => navigate(s.path)}
              >
                {/* Animated gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Gold top bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-t-xl" />

                <div className="relative z-10 flex items-center justify-between mb-5">
                  <motion.div
                    whileHover={reduce ? {} : { rotate: 8, scale: 1.12 }}
                    transition={SPRING}
                    className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors duration-300"
                  >
                    <s.icon size={24} />
                  </motion.div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 rounded-full px-2 py-0.5">
                    {s.count} services
                  </span>
                </div>
                <h3 className="relative z-10 text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                  {s.title}
                </h3>
                <p className="relative z-10 text-sm text-[var(--color-text-muted)] mb-5 flex-grow leading-relaxed">{s.desc}</p>
                <div className="relative z-10 mt-auto flex items-center gap-1 text-sm font-bold text-[var(--color-gold)] group-hover:gap-3 transition-all duration-300">
                  Explore <ArrowRight size={15} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...revealUp(0.1, reduce)} className="mt-10 text-center">
            <motion.div whileHover={reduce ? {} : { scale: 1.04 }} whileTap={reduce ? {} : { scale: 0.97 }} transition={SPRING} className="inline-block">
              <Button variant="secondary" size="lg" onClick={() => navigate('/services')}>
                View All 70+ Services <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
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
            title={<>Why 997+ Clients <span className="text-[var(--color-gold)]">Trust Us</span></>}
            subtitle="Our approach is built around your compliance, confidence, and long-term peace of mind."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                {...revealScale(i * 0.1, reduce)}
                whileHover={reduce ? undefined : { y: -8, scale: 1.03, boxShadow: '0 16px 40px rgba(212,175,55,0.14)', transition: SPRING }}
                className="card-surface p-6 text-center group cursor-default"
              >
                <motion.div
                  whileHover={reduce ? {} : { rotate: [0, -8, 8, 0], scale: 1.15, transition: { duration: 0.5 } }}
                  className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors duration-300"
                >
                  <item.icon size={26} />
                </motion.div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. IMPACT NUMBERS
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...revealScale(i * 0.07, reduce)}
                whileHover={reduce ? undefined : {
                  scale: 1.08,
                  borderColor: 'rgba(212,175,55,0.5)',
                  background: 'rgba(212,175,55,0.08)',
                  transition: SPRING_SOFT,
                }}
                className="text-center p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-default"
              >
                <motion.div
                  className="mx-auto mb-2 h-9 w-9 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center"
                  whileHover={reduce ? {} : { rotate: 360, transition: { duration: 0.6 } }}
                >
                  <stat.icon size={16} />
                </motion.div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-gold)] mb-1">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
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
            <motion.div
              className="absolute top-8 left-[12.5%] right-[12.5%] h-px hidden lg:block"
              style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3), rgba(212,175,55,0.6), rgba(212,175,55,0.3), transparent)' }}
              initial={reduce ? {} : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={VIEWPORT_REVEAL}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.3 }}
            />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                {...revealUp(i * 0.12, reduce)}
                className="relative group text-center"
              >
                <motion.div
                  className="relative z-10 mx-auto mb-5 h-16 w-16 rounded-full flex items-center justify-center border-2 border-[var(--color-gold)]/30 bg-white shadow-lg"
                  whileHover={reduce ? {} : { scale: 1.1, borderColor: 'var(--color-gold)', rotate: 5, transition: SPRING }}
                >
                  <step.icon size={24} className="text-[var(--color-gold)]" />
                  <motion.div
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[var(--color-gold)] text-black text-[10px] font-extrabold flex items-center justify-center"
                    initial={reduce ? {} : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={VIEWPORT_REVEAL}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {step.n}
                  </motion.div>
                </motion.div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...revealUp(0.2, reduce)} className="mt-12 text-center">
            <motion.div whileHover={reduce ? {} : { scale: 1.04 }} transition={SPRING} className="inline-block">
              <Button variant="secondary" onClick={() => navigate('/our-process')}>
                See Full Process <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
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
                whileHover={reduce ? undefined : {
                  y: -8,
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(212,175,55,0.2)',
                  transition: SPRING,
                }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                className="group card-surface p-5 cursor-pointer overflow-hidden relative"
                onClick={() => navigate(`/pakistan-tax-calculators?calc=${calc.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={reduce ? {} : { rotate: 15, scale: 1.2, transition: SPRING }}
                    className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors"
                  >
                    <calc.icon size={18} />
                  </motion.div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)] bg-[var(--color-gold)]/10 rounded-full px-2 py-0.5">
                    {calc.cat}
                  </span>
                </div>
                <h3 className="relative z-10 font-bold text-sm mb-1 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {calc.label}
                </h3>
                <p className="relative z-10 text-xs text-[var(--color-text-muted)]">FY 2025–26 · Free</p>
                <div className="relative z-10 mt-3 flex items-center gap-1 text-xs font-bold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                  Try Now <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...revealUp(0.15, reduce)} className="text-center">
            <motion.div whileHover={reduce ? {} : { scale: 1.04 }} transition={SPRING} className="inline-block">
              <Button variant="primary" size="lg" onClick={() => navigate('/pakistan-tax-calculators')}>
                <Calculator size={18} className="mr-2" /> Try All 17 Calculators — Free
              </Button>
            </motion.div>
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
                whileHover={reduce ? undefined : {
                  y: -8, scale: 1.08,
                  boxShadow: '0 12px 28px rgba(212,175,55,0.2)',
                  transition: SPRING,
                }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
                className="group card-surface p-4 text-center cursor-pointer"
                onClick={() => navigate('/industries')}
              >
                <motion.div
                  className="mx-auto mb-3 h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors duration-300"
                  whileHover={reduce ? {} : { rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                >
                  <ind.icon size={20} />
                </motion.div>
                <p className="text-xs font-bold text-gray-700 group-hover:text-[var(--color-gold)] transition-colors leading-snug">{ind.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...revealUp(0.15, reduce)} className="text-center">
            <motion.div whileHover={reduce ? {} : { scale: 1.04 }} transition={SPRING} className="inline-block">
              <Button variant="secondary" onClick={() => navigate('/industries')}>
                Explore All Industries <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
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
        <Orb className="top-0 right-0 h-64 w-64 bg-[var(--color-gold)]/6" duration={9} delay={0} reduce={reduce} />
        <Orb className="bottom-0 left-0 h-56 w-56 bg-blue-500/5" duration={11} delay={3} reduce={reduce} />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div {...revealLeft(0, reduce)}>
              <motion.div
                initial={reduce ? {} : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT_REVEAL}
                transition={{ duration: 0.5, type: 'spring', stiffness: 280, damping: 20 }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-6"
              >
                ✦ Get Started Today
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Simplify{' '}
                <span className="text-[var(--color-gold)]">Your Compliance?</span>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">
                Join 997+ businesses and individuals who trust Tax Zilla for FBR filing, company registration, and comprehensive tax advisory across Pakistan, UAE, USA, and Saudi Arabia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.div whileHover={reduce ? {} : { scale: 1.05 }} whileTap={reduce ? {} : { scale: 0.97 }} transition={SPRING}>
                  <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                    Book Free Consultation
                  </Button>
                </motion.div>
                <motion.div whileHover={reduce ? {} : { scale: 1.05 }} whileTap={reduce ? {} : { scale: 0.97 }} transition={SPRING}>
                  <Button variant="outline" size="lg" onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}>
                    <MessageCircle size={18} className="mr-2" /> WhatsApp Now
                  </Button>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-3">
                {['FBR Registered', 'SECP Compliant', '100% Confidential', 'Remote Friendly'].map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={reduce ? {} : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_REVEAL}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    className="flex items-center gap-1.5 rounded-full bg-white/8 border border-white/10 px-3 py-1.5 text-xs text-gray-300 font-medium"
                  >
                    <CheckCircle size={11} className="text-[var(--color-gold)]" /> {badge}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div {...revealRight(0.1, reduce)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Phone, label: 'Call / WhatsApp', value: SITE.phone, href: `tel:${SITE.phoneTel}` },
                { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: FileText, label: 'Explore', value: 'All 70+ Services', href: '/services', internal: true },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Instant Response', href: SITE.whatsapp, external: true, highlight: true },
              ].map((card, i) => {
                const Inner = (
                  <motion.div
                    whileHover={reduce ? {} : { scale: 1.04, transition: SPRING_SOFT }}
                    className={`flex items-center gap-4 rounded-2xl border p-5 transition-all group ${
                      card.highlight
                        ? 'border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 hover:bg-[var(--color-gold)]/20'
                        : 'border-white/10 bg-white/5 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/5'
                    }`}
                  >
                    <motion.div
                      whileHover={reduce ? {} : { rotate: 15, scale: 1.1, transition: SPRING }}
                      className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0"
                    >
                      <card.icon size={20} />
                    </motion.div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{card.label}</div>
                      <div className="font-bold text-white text-sm mt-0.5 break-all">{card.value}</div>
                    </div>
                  </motion.div>
                );

                if (card.internal) return <Link key={card.label} to={card.href}>{Inner}</Link>;
                if (card.external) return <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer">{Inner}</a>;
                return <a key={card.label} href={card.href}>{Inner}</a>;
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
