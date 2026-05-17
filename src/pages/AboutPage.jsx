import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import {
  Shield, Award, CheckCircle,
  MessageCircle, Phone, MapPin, Clock, Users, Mail, ArrowRight,
  ShieldCheck, Zap, UserCheck, Heart, Globe, TrendingUp, Building2, FileText,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import { SITE } from '../data/site.js';
import { usePageMotion, EASE_OUT, revealUp, revealLeft, revealRight, revealScale } from '../lib/motion.js';

const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />
);

const STATS = [
  { value: '997+', label: 'Clients Served' },
  { value: '10+', label: 'Years Experience' },
  { value: '70+', label: 'Services Offered' },
  { value: '4', label: 'Countries Served' },
];

const VALUES = [
  { icon: ShieldCheck, title: 'Compliance-First', desc: 'We never cut corners. Every filing, registration, and advisory is aligned with the latest FBR, SECP, and regulatory requirements.' },
  { icon: Heart, title: 'Client-Centric', desc: 'Your success is our metric. We take time to understand your unique situation before recommending any service or strategy.' },
  { icon: Zap, title: 'Efficiency', desc: 'We respect your time. Clear timelines, proactive updates, and on-time delivery are non-negotiable standards for every engagement.' },
  { icon: Shield, title: 'Confidentiality', desc: 'Your financial and legal data is handled with strict professional secrecy. We maintain the highest data protection standards.' },
];

const EXPERTISE = [
  { icon: FileText, title: 'FBR Income Tax', desc: 'Individual, AOP, and corporate income tax returns, withholding tax compliance, ATL maintenance, and FBR audit representation.' },
  { icon: TrendingUp, title: 'Sales Tax (GST)', desc: 'FBR GST registration, monthly return filing, input/output reconciliation, and refund processing for businesses of all sizes.' },
  { icon: Building2, title: 'SECP & Corporate', desc: 'Company incorporation, annual SECP filings, director registration, share changes, and corporate compliance management.' },
  { icon: Globe, title: 'International Tax', desc: 'UAE VAT/corporate tax, USA LLC registration, Saudi Arabia ZATCA compliance, and Pakistan–UAE–USA double taxation advisory.' },
  { icon: Shield, title: 'Legal Services', desc: 'Trademark registration, copyright, power of attorney, legal notices, agreement drafting, and business legal advisory.' },
  { icon: Users, title: 'Overseas Pakistanis', desc: 'Non-resident tax filing, ATL activation, property transaction tax guidance, TRC certificates, and foreign income advisory.' },
];

const DIFFERENTIATORS = [
  'Proactive compliance management — we remind you before deadlines, not after',
  'Dedicated case consultant from day one — no handoffs or confusion',
  'Transparent pricing with written scope confirmation before any work starts',
  'Fully remote service — no office visits required, everything handled digitally',
  'Dual expertise in tax AND corporate law — both from a single firm',
  'International reach — Pakistan, UAE, USA, and Saudi Arabia compliance',
  'Post-filing support included — we stay available for 60 days after submission',
  '24/7 WhatsApp availability for urgent queries and document requests',
];

const AboutPage = () => {
  const navigate = useNavigate();
  const { hero, reduce } = usePageMotion();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>About Us — Tax Zilla Consultancy Pakistan</title>
        <meta name="description" content="Tax Zilla Consultancy — Lahore's leading tax and legal firm. 10+ years of expertise in FBR compliance, SECP registration, and international tax advisory. 500+ clients across Pakistan, UAE, USA, and Saudi Arabia." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36"
        style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.2),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.08 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6"
          >
            Premier Tax & Legal Consultancy · Lahore
          </motion.div>
          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
            className="px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl leading-tight mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            About <span className="text-[var(--color-gold)]">Tax Zilla</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.24 }}
            className="max-w-2xl mx-auto px-2 text-base text-gray-300 sm:text-lg leading-relaxed mb-8"
          >
            A decade of trusted expertise in tax, legal, and compliance services — helping 997+ clients across Pakistan, UAE, USA, and Saudi Arabia navigate their regulatory obligations with confidence.
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
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="py-5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-[var(--color-gold)]">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Our Story ───────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div {...revealLeft(0, reduceMotion)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-5">
                Our Story
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Your Trusted <span className="text-[var(--color-gold)]">Compliance Partner</span>
              </h2>
              <div className="space-y-4 text-[var(--color-text-muted)] text-base leading-relaxed">
                <p>
                  Tax Zilla Consultancy was founded with a single purpose: to make Pakistan's complex tax and legal landscape accessible, understandable, and manageable for every business and individual.
                </p>
                <p>
                  Based in Lahore, we serve clients across Pakistan and internationally — from freelancers filing their first return to corporations managing multi-jurisdictional compliance across the UAE, USA, and Saudi Arabia.
                </p>
                <p>
                  Our approach is built on deep regulatory expertise, honest communication, and a genuine commitment to your financial wellbeing. We don't just file returns — we build lasting compliance relationships.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button variant="primary" onClick={() => navigate('/contact')}>
                  Book Free Consultation
                </Button>
                <Button variant="secondary" onClick={() => navigate('/services')}>
                  View All Services
                </Button>
              </div>
            </motion.div>

            <motion.div {...revealRight(0.1, reduceMotion)}
              className="grid grid-cols-2 gap-4">
              {[
                { v: '100%', l: 'Compliance Rate', sub: 'Zero penalties on our filings' },
                { v: '997+', l: 'Clients Served', sub: 'Across 4 countries' },
                { v: '10+', l: 'Years Experience', sub: 'Deep regulatory expertise' },
                { v: '24/7', l: 'WhatsApp Support', sub: 'Always available for you' },
              ].map((s) => (
                <div key={s.l} className="card-surface p-5 sm:p-6 text-center group hover:border-[var(--color-gold)]/40 transition-colors">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-gold)] mb-1">{s.v}</h3>
                  <p className="font-bold text-sm text-gray-800 mb-1">{s.l}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{s.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Mission ─────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <Grid />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Award, title: 'Our Mission', desc: 'To simplify Pakistan\'s complex regulatory landscape for every individual and business — making compliance accessible, affordable, and stress-free.' },
              { icon: Globe, title: 'Our Vision', desc: 'To become the most trusted name in Pakistani tax and legal services, serving clients seamlessly across borders with consistent excellence.' },
              { icon: Heart, title: 'Our Promise', desc: 'We commit to transparency, precision, and proactive service. You will always know what we are doing, why we are doing it, and when it will be done.' },
            ].map((item, i) => (
              <motion.div key={item.title} {...revealScale(i * 0.1, reduceMotion)}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[var(--color-gold)]/30 transition-all">
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center">
                  <item.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Values ──────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Our Core <span className="text-[var(--color-gold)]">Values</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-sm">
              These four principles guide every engagement, every filing, and every client interaction.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} {...revealScale(i * 0.1, reduceMotion)}
                className="card-surface p-6 text-center group hover:border-[var(--color-gold)]/40 transition-colors">
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                  <v.icon size={26} />
                </div>
                <h3 className="font-bold text-base mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Areas of Expertise ──────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Areas of <span className="text-[var(--color-gold)]">Expertise</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-sm">
              Comprehensive coverage of Pakistan's tax laws, corporate regulations, and international compliance requirements.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISE.map((item, i) => (
              <motion.div key={item.title} {...revealScale(i * 0.08, reduceMotion)}
                className="group card-surface p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-bold text-base group-hover:text-[var(--color-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes Us Different ─────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <motion.div {...revealLeft(0, reduceMotion)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-5">
                Why Choose Us
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                What Makes Tax Zilla <span className="text-[var(--color-gold)]">Different</span>
              </h2>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                We set the standard for professional tax and legal consultancy in Pakistan. Here's what you get with Tax Zilla that you won't find elsewhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" onClick={() => navigate('/contact')}>
                  Start Free Consultation
                </Button>
                <Button variant="secondary" onClick={() => navigate('/our-process')}>
                  See Our Process
                </Button>
              </div>
            </motion.div>

            <motion.div {...revealRight(0.1, reduceMotion)} className="space-y-3">
              {DIFFERENTIATORS.map((item, i) => (
                <motion.div key={item} {...revealUp(i * 0.05, reduceMotion)}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-[var(--color-surface-muted)] hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/3 transition-all group">
                  <CheckCircle size={16} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-[var(--color-text)] font-medium leading-snug">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Leadership Team ─────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24" style={{ background: 'var(--color-brand-navy)' }}>
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6) 30%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.6) 70%, transparent)' }} />
        {/* Subtle courthouse bg */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1800&q=50)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        {/* Gold radial glow top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(212,175,55,0.4), transparent 70%)' }} />

        <div className="relative z-10 container-custom">

          {/* Section header */}
          <motion.div {...revealUp(0, reduce)} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: 'var(--color-gold)' }}>
              ✦ Our Leadership
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              The Legal Minds Behind{' '}
              <span style={{ color: 'var(--color-gold)' }}>Tax Zilla</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Seasoned advocates and legal professionals with decades of combined expertise in tax law, corporate law, and High Court practice.
            </p>
          </motion.div>

          {/* 3-column team grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">

            {/* ── Card 1: Owner ── */}
            <motion.div {...revealUp(0, reduce)}>
              <div className="group relative overflow-hidden flex flex-col items-center text-center h-full p-7 sm:p-8"
                style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(212,175,55,0.2)', backdropFilter: 'blur(12px)' }}>
                {/* Top gold reveal line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3))' }} />
                {/* Card hover bg image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&q=50)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                {/* Gavel/scales decorative icon top-right */}
                <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm"
                  style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.25)' }}>
                  Owner
                </div>
                {/* Monogram avatar */}
                <div className="relative mb-5 mt-2">
                  <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center font-extrabold text-xl relative"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 100%)', border: '2px solid rgba(212,175,55,0.45)', color: '#D4AF37', fontFamily: 'var(--font-heading)' }}>
                    CMA
                    {/* Subtle ring */}
                    <div className="absolute inset-[-6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ border: '1px solid rgba(212,175,55,0.2)' }} />
                  </div>
                </div>
                {/* Name */}
                <h3 className="text-white font-bold text-lg leading-snug mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  Chaudhary Muzaher Ali
                </h3>
                {/* Title */}
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#D4AF37' }}>
                  Advocate — High Court
                </p>
                {/* Divider */}
                <div className="w-8 h-px mb-4" style={{ background: 'rgba(212,175,55,0.35)' }} />
                {/* Qualifications */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                  {['BA', 'LLB'].map(q => (
                    <span key={q} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {q}
                    </span>
                  ))}
                </div>
                {/* Experience */}
                <div className="mt-auto w-full pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-5 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
                    <span className="text-[11px] font-semibold" style={{ color: 'rgba(212,175,55,0.75)' }}>20 Years of Legal Practice</span>
                    <span className="w-5 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: CEO ── */}
            <motion.div {...revealUp(0.1, reduce)}>
              <div className="group relative overflow-hidden flex flex-col items-center text-center h-full p-7 sm:p-8"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.35)', backdropFilter: 'blur(12px)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5), #D4AF37, rgba(212,175,55,0.5))' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&q=50)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm"
                  style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.4)' }}>
                  CEO
                </div>
                <div className="relative mb-5 mt-2">
                  <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center font-extrabold text-xl relative"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.07) 100%)', border: '2px solid rgba(212,175,55,0.6)', color: '#D4AF37', fontFamily: 'var(--font-heading)' }}>
                    HMR
                    <div className="absolute inset-[-6px] rounded-full border" style={{ borderColor: 'rgba(212,175,55,0.25)' }} />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg leading-snug mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  Hafiz Muhammad Ahmad Raza
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#D4AF37' }}>
                  Advocate
                </p>
                <div className="w-8 h-px mb-4" style={{ background: 'rgba(212,175,55,0.35)' }} />
                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                  {['BA', 'LLB', 'PGDTLP (PU)'].map(q => (
                    <span key={q} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {q}
                    </span>
                  ))}
                </div>
                <div className="mt-auto w-full pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Tax Law & Corporate Practice
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Card 3: Naveed ── */}
            <motion.div {...revealUp(0.2, reduce)}>
              <div className="group relative overflow-hidden flex flex-col items-center text-center h-full p-7 sm:p-8"
                style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(212,175,55,0.2)', backdropFilter: 'blur(12px)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3))' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&q=50)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm"
                  style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.25)' }}>
                  Advocate
                </div>
                <div className="relative mb-5 mt-2">
                  <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center font-extrabold text-xl relative"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.05) 100%)', border: '2px solid rgba(212,175,55,0.45)', color: '#D4AF37', fontFamily: 'var(--font-heading)' }}>
                    NAC
                    <div className="absolute inset-[-6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ border: '1px solid rgba(212,175,55,0.2)' }} />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg leading-snug mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  Naveed Ahmad Chaudhary
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#D4AF37' }}>
                  Advocate
                </p>
                <div className="w-8 h-px mb-4" style={{ background: 'rgba(212,175,55,0.35)' }} />
                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                  {['MBA', 'LLB'].map(q => (
                    <span key={q} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {q}
                    </span>
                  ))}
                </div>
                <div className="mt-auto w-full pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Business & Legal Advisory
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Office / Location ───────────────────────── */}
      <section className="relative overflow-hidden py-16 lg:py-20" style={{ background: 'var(--color-brand-navy)' }}>
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6) 30%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.6) 70%, transparent)' }} />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.07), transparent 70%)' }} />

        <div className="container-custom relative z-10">

          {/* Header */}
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: 'rgba(212,175,55,0.65)' }}>
              Get In Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Find <em className="not-italic" style={{ color: 'var(--color-gold)' }}>Us</em>
            </h2>
            <div className="w-12 h-px mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)' }} />
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">

            {/* Office */}
            <motion.a
              {...revealUp(0, reduceMotion)}
              href="https://maps.google.com/?q=Tax+Zilla+Consultancy+Lahore"
              target="_blank" rel="noopener noreferrer"
              className="group relative block rounded-xl p-6 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.35)'}
              onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200" style={{ background: 'rgba(212,175,55,0.1)' }}>
                <MapPin size={18} style={{ color: 'var(--color-gold)' }} />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,175,55,0.6)' }}>Office</p>
              <p className="text-sm font-medium text-white leading-relaxed">7A, Malik Park Main Street</p>
              <p className="text-sm text-white/60 leading-relaxed">Main Canal Road, Mughalpura</p>
              <p className="text-sm text-white/60 leading-relaxed">Lahore, Pakistan</p>
              <p className="mt-3 text-[11px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-gold)' }}>
                View on Map <ArrowRight size={11} />
              </p>
            </motion.a>

            {/* Phone */}
            <motion.a
              {...revealUp(0.05, reduceMotion)}
              href={`tel:${SITE.phoneTel}`}
              className="group relative block rounded-xl p-6 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(212,175,55,0.35)'}
              onMouseLeave={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(212,175,55,0.1)' }}>
                <Phone size={18} style={{ color: 'var(--color-gold)' }} />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,175,55,0.6)' }}>Phone / WhatsApp</p>
              <p className="text-sm font-medium text-white">+92 339 9993308</p>
              <p className="text-sm text-white/60 mt-0.5">+92 300 9860279</p>
              <p className="mt-3 text-[11px] font-semibold flex items-center gap-1" style={{ color: 'var(--color-gold)' }}>
                Call Now <ArrowRight size={11} />
              </p>
            </motion.a>

            {/* Email — both addresses */}
            <motion.div
              {...revealUp(0.1, reduceMotion)}
              className="relative rounded-xl p-6"
              style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.18)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(212,175,55,0.12)' }}>
                <Mail size={18} style={{ color: 'var(--color-gold)' }} />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(212,175,55,0.6)' }}>Email</p>
              <a href="mailto:info@taxzilla.com" className="block text-sm font-medium text-white hover:text-yellow-300 transition-colors break-all mb-2">
                info@taxzilla.com
              </a>
              <div className="h-px my-2" style={{ background: 'rgba(212,175,55,0.15)' }} />
              <a href="mailto:taxzilla41@gmail.com" className="block text-sm text-white/60 hover:text-white transition-colors break-all">
                taxzilla41@gmail.com
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div
              {...revealUp(0.15, reduceMotion)}
              className="relative rounded-xl p-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(212,175,55,0.1)' }}>
                <Clock size={18} style={{ color: 'var(--color-gold)' }} />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(212,175,55,0.6)' }}>Working Hours</p>
              <p className="text-sm font-medium text-white">Mon – Fri: 9:00 AM – 6:00 PM</p>
              <p className="text-sm text-white/60 mt-0.5">Sat: 10:00 AM – 2:00 PM</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                WhatsApp 24/7
              </div>
            </motion.div>

          </div>

          {/* Map embed */}
          <motion.div {...revealUp(0.1, reduceMotion)} className="mt-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(212,175,55,0.15)', height: '260px' }}>
            <iframe
              title="Tax Zilla Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.3!2d74.3736!3d31.5497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904dcc5555555%3A0x0!2sMalik+Park+Main+Canal+Road+Mughalpura+Lahore!5e0!3m2!1sen!2spk!4v1"
              width="100%"
              height="260"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────── */}
      <section className="relative overflow-hidden py-20 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center" {...revealUp(0, reduceMotion)}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Work <span className="text-[var(--color-gold)]">With Us?</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Join 997+ businesses and individuals who trust Tax Zilla for accurate, timely, and stress-free tax and legal compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Book Free Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}>
              <MessageCircle size={18} className="mr-2" /> WhatsApp Now
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutPage;
