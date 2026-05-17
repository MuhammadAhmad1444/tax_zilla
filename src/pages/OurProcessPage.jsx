import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import {
  MessageSquare, FileText, ClipboardList, Settings,
  CheckCircle, Headphones, ArrowRight, MessageCircle,
  Phone, ShieldCheck, Clock, UserCheck, Award, BadgeCheck,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import { SITE } from '../data/site.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, revealUp, revealLeft, revealRight, revealScale, getStaggerContainer, getStaggerItem } from '../lib/motion.js';

const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />
);

const STEPS = [
  {
    n: '01', icon: MessageSquare,
    title: 'Initial Consultation',
    desc: 'We begin with a thorough discussion to understand your specific tax or legal needs — free of charge. We assess your current status, identify gaps, and recommend the best course of action.',
    detail: 'Available via WhatsApp, phone call, or in-office visit. No commitment required.',
  },
  {
    n: '02', icon: FileText,
    title: 'Document Checklist',
    desc: 'Based on our assessment, we share a precise, tailored checklist of required documents. You know exactly what is needed — no guesswork, no back-and-forth delays.',
    detail: 'Documents shared securely via WhatsApp or email. We verify each document on receipt.',
  },
  {
    n: '03', icon: ClipboardList,
    title: 'Analysis & Planning',
    desc: 'Our experts analyse your financial data to maximise legal tax credits, minimise liability, and ensure full compliance with the Income Tax Ordinance, Sales Tax Act, and Companies Act.',
    detail: 'We identify every applicable deduction and exemption available to your case.',
  },
  {
    n: '04', icon: Settings,
    title: 'Expert Preparation',
    desc: 'We prepare all drafts, forms, and returns with precision — whether it is an FBR income tax return, SECP registration, GST filing, or legal notice response.',
    detail: 'All work is done by qualified tax consultants with sector-specific expertise.',
  },
  {
    n: '05', icon: CheckCircle,
    title: 'Quality Review',
    desc: 'Every filing and document undergoes a mandatory double-check by a senior consultant before submission. This prevents errors, penalties, and future audit risks.',
    detail: 'We maintain a zero-error policy. If we spot an issue, we fix it before you even know.',
  },
  {
    n: '06', icon: BadgeCheck,
    title: 'Submission & Confirmation',
    desc: 'We submit on your behalf through the official FBR Iris, SECP, or relevant portal. You receive the acknowledgement slip, certificate, or confirmation immediately.',
    detail: 'We remain available post-submission for any follow-up queries, notices, or updates.',
  },
];

const GUARANTEES = [
  { icon: ShieldCheck, title: 'Zero-Error Policy', desc: 'Every filing is double-checked by a senior consultant before submission.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We commit to deadlines and proactively update you at every stage.' },
  { icon: UserCheck, title: 'Dedicated Consultant', desc: 'One point of contact from start to finish — no handoffs, no confusion.' },
  { icon: Award, title: '100% Confidential', desc: 'Your financial data is handled with strict professional secrecy.' },
];

const OurProcessPage = () => {
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>Our Process — Tax Zilla Consultancy</title>
        <meta name="description" content="Discover Tax Zilla's 6-step transparent process — from free initial consultation to final submission. Professional, precise, and stress-free compliance." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36"
        style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.18),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.08 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6"
          >
            Transparent Methodology
          </motion.div>
          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
            className="px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl leading-tight mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our <span className="text-[var(--color-gold)]">6-Step Process</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.24 }}
            className="max-w-2xl mx-auto px-2 text-base text-gray-300 sm:text-lg leading-relaxed mb-8"
          >
            A transparent, streamlined journey from first contact to final confirmation — designed to give you complete peace of mind.
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
              <MessageCircle size={13} className="text-[var(--color-gold)]" /> Start on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ───────────────────────────────── */}
      <div className="border-b border-white/10" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { v: '6', l: 'Clear Steps' },
              { v: 'Free', l: 'First Consultation' },
              { v: '0', l: 'Hidden Fees' },
              { v: '24/7', l: 'Post-Service Support' },
            ].map((s) => (
              <div key={s.l} className="py-5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-[var(--color-gold)]">{s.v}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6 Steps Timeline ────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              How We <span className="text-[var(--color-gold)]">Work With You</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-sm">
              Every step is defined, transparent, and designed to minimise your effort while maximising compliance.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.n}
                  {...revealUp(i * 0.08, reduceMotion)}
                  className="relative flex gap-6 mb-10 last:mb-0"
                >
                  {/* Left number + line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="relative z-10 h-14 w-14 rounded-full flex items-center justify-center border-2 border-[var(--color-gold)]/40 bg-white shadow-lg group-hover:border-[var(--color-gold)]">
                      <span className="text-xs font-extrabold text-[var(--color-gold)]">{step.n}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.4), rgba(212,175,55,0.1))', minHeight: '40px' }} />
                    )}
                  </div>

                  {/* Card */}
                  <div className="flex-1 group card-surface p-5 sm:p-6 mb-4 relative overflow-hidden hover:border-[var(--color-gold)]/40 transition-all">
                    <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[var(--color-gold)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 rounded-l-xl" />

                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300 flex-shrink-0">
                        <step.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">Step {step.n}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">{step.desc}</p>
                        <div className="flex items-start gap-2 rounded-lg bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/15 px-3 py-2">
                          <CheckCircle size={13} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-500 leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Guarantees ───────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              What You Can <span className="text-[var(--color-gold)]">Always Expect</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-lg mx-auto text-sm">
              These are not promises — they are the minimum standards we hold ourselves to on every engagement.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUARANTEES.map((g, i) => (
              <motion.div key={g.title} {...revealScale(i * 0.1, reduceMotion)}
                className="card-surface p-6 text-center group hover:border-[var(--color-gold)]/40 transition-colors">
                <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                  <g.icon size={26} />
                </div>
                <h3 className="font-bold text-base mb-2">{g.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Strip ───────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              Common <span className="text-[var(--color-gold)]">Process Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: 'How long does the process take?', a: 'Timelines vary by service — NTN registration takes 1–2 days, company incorporation 3–5 days, tax returns 2–5 days depending on complexity. We confirm the exact timeline before starting.' },
              { q: 'Can everything be done online?', a: 'Yes. We handle all documentation, filings, and submissions digitally. You never need to visit an FBR or SECP office. Everything is managed remotely via WhatsApp, email, and secure portals.' },
              { q: 'What happens after submission?', a: 'We send you the acknowledgement slip or registration certificate immediately. We remain available for 60 days post-filing for any follow-up queries, notices, or FBR verifications.' },
              { q: 'Is the first consultation really free?', a: 'Yes — completely. We assess your requirements, recommend the right services, and confirm scope and fees before any commitment. No credit card, no deposit required.' },
            ].map((faq, i) => (
              <motion.div key={faq.q} {...revealUp(i * 0.06, reduceMotion)}
                className="card-surface p-5 sm:p-6">
                <h4 className="font-bold text-base mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center text-[10px] font-extrabold flex-shrink-0">Q</span>
                  {faq.q}
                </h4>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed ml-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────── */}
      <section className="relative overflow-hidden py-20 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center" {...revealUp(0, reduceMotion)}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Start <span className="text-[var(--color-gold)]">Step One?</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Book your free consultation today. No documents needed for the first call — just tell us what you need and we'll take it from there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
              Book Free Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}>
              <MessageCircle size={18} className="mr-2" /> WhatsApp Now
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Free First Call', 'No Commitment', '6 Defined Steps', 'Remote Friendly', '24/7 Support'].map(tag => (
              <span key={tag} className="flex items-center gap-1.5 rounded-full bg-white/8 border border-white/10 px-3 py-1.5 text-xs text-gray-300 font-medium">
                <CheckCircle size={11} className="text-[var(--color-gold)]" /> {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default OurProcessPage;
