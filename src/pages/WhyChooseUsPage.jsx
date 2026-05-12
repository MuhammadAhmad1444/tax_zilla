import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Clock, Users, FileCheck, Lock, Award, Briefcase,
  CheckCircle, XCircle, ArrowRight, MessageCircle, Star,
  Zap, Globe, UserCheck, HeartHandshake, PhoneCall,
  TrendingUp, BadgeCheck, ShieldCheck, Sparkles,
  MapPin, Mail, Phone,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import { SITE } from '../data/site.js';
import { usePageMotion, EASE_OUT, revealUp, revealLeft, revealRight, revealScale, getStaggerContainer, getStaggerItem, VIEWPORT_REVEAL } from '../lib/motion.js';

/* ── Grid overlay ─────────────────────────────── */
const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

/* ── Animated counter ─────────────────────────── */
const CountUp = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1800;
        const step = (end / duration) * 16;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
const WhyChooseUsPage = () => {
  const { reduce, hero } = usePageMotion();

  return (
    <>
      <Helmet>
        <title>Why Choose Tax Zilla — Pakistan's Most Trusted Tax & Legal Consultancy</title>
        <meta name="description" content="Discover why 997+ clients across Pakistan, UAE, USA, and Saudi Arabia trust Tax Zilla for FBR compliance, SECP registration, and international tax services. 10+ years of expertise." />
      </Helmet>

      {/* ══ 1. HERO ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36"
        style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.18),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center max-w-4xl mx-auto" {...hero}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6">
            <Sparkles size={11} /> The Tax Zilla Difference
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.55, ease: EASE_OUT }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}>
            Why <span className="text-[var(--color-gold)]">997+ Clients</span><br />
            Trust Tax Zilla
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.5, ease: EASE_OUT }}
            className="text-gray-300 text-base sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            In a market full of generic tax "agents", Tax Zilla operates differently — with qualified consultants, transparent pricing, dedicated case ownership, and a commitment that does not end when your return is filed.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.44, ease: EASE_OUT }}
            className="flex flex-wrap justify-center gap-3">
            <Link to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-lg shadow-[rgba(212,175,55,0.3)]">
              Book Free Consultation <ArrowRight size={16} />
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:border-[var(--color-gold)]/50 transition-all">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ 2. IMPACT NUMBERS ══════════════════════════════ */}
      <section style={{ background: 'var(--color-brand-navy)' }} className="border-y border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { end: 997, suffix: '+', label: 'Satisfied Clients', sub: 'Across 4 countries' },
              { end: 10,  suffix: '+', label: 'Years Experience', sub: 'Deep regulatory expertise' },
              { end: 70,  suffix: '+', label: 'Service Types', sub: 'Tax, legal & corporate' },
              { end: 24,  suffix: '/7', label: 'WhatsApp Support', sub: 'Instant expert access' },
            ].map((s) => (
              <div key={s.label} className="py-7 text-center px-4">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--color-gold)' }}>
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">{s.label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. CORE DIFFERENTIATORS ════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
              What Sets Us Apart
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Not Just Another Tax Agent
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Every aspect of our service is designed around one goal: making compliance effortless, accurate, and stress-free for you.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={getStaggerContainer(reduce, 0.08)} initial="hidden" whileInView="visible" viewport={VIEWPORT_REVEAL}>
            {[
              {
                icon: UserCheck, title: 'Dedicated Case Consultant',
                desc: 'From the moment you engage us, one senior consultant owns your case end-to-end. No handoffs, no confusion — just one expert who knows your complete financial picture.',
                highlight: 'Your expert for life',
              },
              {
                icon: BadgeCheck, title: 'Transparent Pricing — Zero Surprises',
                desc: 'We confirm scope, timeline, and exact fees in writing before starting. No surprise invoices, no upsells mid-way, no hidden government fee markups.',
                highlight: 'Written quote before we start',
              },
              {
                icon: Globe, title: 'Multi-Country Expertise',
                desc: 'We are the rare firm that handles Pakistan FBR, UAE FTA, US IRS, Saudi ZATCA, and UK HMRC — all from one team with cross-border expertise.',
                highlight: 'Pakistan · UAE · USA · KSA · UK',
              },
              {
                icon: Zap, title: 'Fast, Deadline-Driven Delivery',
                desc: 'We track every filing deadline proactively and send reminders before FBR due dates. Your compliance is never at risk because someone forgot.',
                highlight: 'Zero missed deadlines',
              },
              {
                icon: Lock, title: 'Strict Confidentiality',
                desc: 'Your financial data, portal credentials, and business information are handled under strict non-disclosure. We never discuss client matters with third parties.',
                highlight: 'NDA-grade confidentiality',
              },
              {
                icon: HeartHandshake, title: '60-Day Post-Filing Support',
                desc: 'Our engagement does not end when we submit your return. We remain available for FBR queries, notices, or clarifications for 60 days after every filing — at no extra charge.',
                highlight: '60 days included free',
              },
              {
                icon: PhoneCall, title: '24/7 WhatsApp Access',
                desc: 'Tax emergencies do not follow office hours. Our WhatsApp is monitored around the clock for urgent matters — FBR notices, portal issues, or time-sensitive queries.',
                highlight: 'Always reachable',
              },
              {
                icon: ShieldCheck, title: 'FBR Audit Defence Included',
                desc: 'If FBR sends a notice or selects your return for audit, we represent you and handle all correspondence. Clients who file with us are never left alone facing FBR.',
                highlight: 'We represent you before FBR',
              },
              {
                icon: TrendingUp, title: 'Proactive Tax Planning',
                desc: 'We do not just file — we advise. We proactively identify legal ways to reduce your tax liability, optimise business structure, and plan for the coming year.',
                highlight: 'Reduce, not just comply',
              },
            ].map((item, i) => (
              <motion.div key={item.title} variants={getStaggerItem(reduce)}
                className="group relative rounded-2xl border border-gray-100 bg-white p-7 overflow-hidden hover:border-[var(--color-gold)]/40 hover:shadow-xl transition-all duration-300">
                {/* Hover gold bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'var(--color-gold)' }} />

                <div className="mb-5 h-12 w-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)' }}>
                  <item.icon size={22} />
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(212,175,55,0.08)', color: 'var(--color-gold)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <CheckCircle size={9} /> {item.highlight}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 4. COMPETITOR COMPARISON ═══════════════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
              Side-by-Side Comparison
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Tax Zilla vs Typical Tax Agent
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Most tax agents in Pakistan offer the same generic service. Here is how we are different.
            </p>
          </motion.div>

          <motion.div {...revealScale(0.1, reduce)}
            className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border-b border-gray-200 w-2/5">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center bg-[var(--color-brand-navy)] text-[var(--color-gold)] text-xs font-bold uppercase tracking-wider border-b border-white/10 w-[30%]">
                    Tax Zilla ✦
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border-b border-gray-200 w-[30%]">
                    Typical Agent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Dedicated case consultant (not shared)', true, false],
                  ['Written quote before starting work', true, false],
                  ['Multi-country tax expertise (UAE, USA, KSA, UK)', true, false],
                  ['Post-filing support for 60 days', true, false],
                  ['24/7 WhatsApp availability', true, false],
                  ['FBR audit representation included', true, false],
                  ['Proactive deadline reminders', true, false],
                  ['Full remote service — no office visits', true, false],
                  ['Transparent, no hidden fees', true, false],
                  ['International compliance (cross-border advisory)', true, false],
                  ['Qualified professionals on every case', true, 'Sometimes'],
                  ['Returns filed same/next day (standard cases)', true, 'Often delayed'],
                ].map(([feature, us, them], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                    <td className="px-6 py-4 text-[13px] font-medium text-gray-700">{feature}</td>
                    <td className="px-6 py-4 text-center bg-[var(--color-brand-navy)]/5">
                      {us === true
                        ? <CheckCircle size={18} className="mx-auto" style={{ color: 'var(--color-gold)' }} />
                        : <span className="text-[11px] font-semibold text-[var(--color-gold)]">{us}</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {them === false
                        ? <XCircle size={18} className="mx-auto text-red-300" />
                        : <span className="text-[11px] font-medium text-gray-400">{them}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ══ 5. OUR GUARANTEE ═══════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...revealLeft(0, reduce)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-5">
                <Shield size={11} /> Our Promise to You
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                The Tax Zilla<br />
                <span className="text-[var(--color-gold)]">Service Guarantee</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                We stand behind every service we deliver. If you are not satisfied with the quality of our work, we will make it right — no questions asked.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Accuracy Guarantee', desc: 'If we make an error in your FBR filing, we cover the cost of correction and any related penalties caused by our mistake.' },
                  { title: 'On-Time Guarantee', desc: 'We commit to agreed timelines in writing. If we miss a deadline without valid reason, you receive a fee discount on your next service.' },
                  { title: 'Transparency Guarantee', desc: 'The fee quoted is the fee charged. No add-ons, no surprise government fee markups — everything is disclosed upfront in writing.' },
                  { title: 'Confidentiality Guarantee', desc: 'Your financial data is never shared with any third party without your written consent — except where legally required by regulators.' },
                ].map((g) => (
                  <div key={g.title} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-[var(--color-gold)]/30 transition-colors group">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)' }}>
                      <CheckCircle size={17} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm mb-0.5">{g.title}</div>
                      <div className="text-[13px] text-gray-500 leading-relaxed">{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...revealRight(0.1, reduce)} className="relative">
              {/* Big gold quote */}
              <div className="rounded-3xl overflow-hidden relative" style={{ background: 'var(--color-brand-navy)', minHeight: 460 }}>
                <Grid />
                <div className="relative z-10 p-8 sm:p-10 h-full flex flex-col justify-between">
                  <div className="text-6xl font-black leading-none" style={{ color: 'rgba(212,175,55,0.15)', fontFamily: 'var(--font-heading)' }}>"</div>
                  <blockquote className="text-xl sm:text-2xl font-bold text-white leading-relaxed mt-4 mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                    We do not just file your tax return. We become your financial compliance partner — protecting you from penalties, reducing your tax legally, and giving you peace of mind that everything is correct.
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-black text-black" style={{ background: 'var(--color-gold)' }}>TZ</div>
                    <div>
                      <div className="font-bold text-white">Tax Zilla Consultancy</div>
                      <div className="text-xs text-gray-400">Lahore, Pakistan · Est. 2014</div>
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" style={{ color: 'var(--color-gold)' }} />)}
                    <span className="text-xs text-gray-400 ml-2">5.0 from 997+ clients</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 6. EXPERTISE AREAS ═════════════════════════════ */}
      <section className="section-padding relative dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <Grid />
        <div className="container-custom relative z-10">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
              Deep Expertise Across
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Every Tax & Legal Domain
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unlike generalist agents, our team has deep specialists in each area — ensuring expert-level work, not guesswork.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={getStaggerContainer(reduce, 0.07)} initial="hidden" whileInView="visible" viewport={VIEWPORT_REVEAL}>
            {[
              { icon: FileCheck, title: 'FBR Income Tax', areas: ['Individual returns', 'Business tax', 'Corporate tax', 'Wealth statements', 'Advance tax', 'Refund claims'] },
              { icon: TrendingUp, title: 'Sales Tax & GST', areas: ['FBR GST registration', 'Monthly return filing', 'Input/output reconciliation', 'PRA/SRB/KPRA/BRA', 'Refund processing'] },
              { icon: Briefcase, title: 'SECP & Corporate', areas: ['Company incorporation', 'Annual filings', 'Director changes', 'Share transfers', 'Company dissolution'] },
              { icon: Globe, title: 'International Tax', areas: ['UAE VAT & Corporate Tax', 'USA LLC & IRS filing', 'Saudi ZATCA compliance', 'UK Self Assessment', 'Double taxation relief'] },
              { icon: Shield, title: 'FBR Audit & Notices', areas: ['Notice response', 'Audit representation', 'Penalty waivers', 'Section 122 revisional', 'Appellate proceedings'] },
              { icon: Users, title: 'Overseas Pakistanis', areas: ['NTN via NICOP', 'ATL activation abroad', 'Property WHT advisory', 'TRC certificates', 'Remittance guidance'] },
            ].map((area) => (
              <motion.div key={area.title} variants={getStaggerItem(reduce)}
                className="group rounded-2xl border border-white/10 p-6 hover:border-[var(--color-gold)]/40 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--color-gold)' }}>
                    <area.icon size={19} />
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-[var(--color-gold)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    {area.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {area.areas.map(a => (
                    <li key={a} className="flex items-center gap-2 text-[12px] text-gray-400">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-gold)' }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 7. TESTIMONIALS ════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
              <Star size={10} fill="currentColor" /> Client Voices
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              What Our Clients Say
            </h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={getStaggerContainer(reduce, 0.08)} initial="hidden" whileInView="visible" viewport={VIEWPORT_REVEAL}>
            {[
              { name: 'Usman Tariq', role: 'IT Freelancer, Lahore', stars: 5, text: 'Tax Zilla helped me understand Clause 133 and get my NTN sorted in one day. My refund claim was processed in 3 weeks. Best tax service I have used in years.' },
              { name: 'Sana Malik', role: 'Business Owner, Karachi', stars: 5, text: 'I was worried about my FBR audit notice. Their team responded to FBR within 48 hours and the case was closed without any penalty. Absolutely professional.' },
              { name: 'Ahmed Al-Farooq', role: 'Pakistani Expat, Dubai', stars: 5, text: 'I am based in Dubai but my Pakistan property tax was a mess. Tax Zilla sorted my FBR filings remotely. They even handled my UAE corporate tax registration.' },
              { name: 'Bilal Chaudhry', role: 'Pvt Ltd Director, Islamabad', stars: 5, text: 'SECP annual filing, FBR income tax, and WHT statements — all handled by Tax Zilla in one engagement. Clean, transparent, no surprises on fees.' },
              { name: 'Nadia Khan', role: 'Salaried Professional', stars: 5, text: 'I was a non-filer for 5 years and was always scared to start. Tax Zilla guided me through the entire process, got me on ATL, and I saved Rs. 180,000 on my car registration.' },
              { name: 'Rana Asad', role: 'Real Estate Investor', stars: 5, text: 'I sold two properties and was facing massive CGT. They restructured my documentation completely legally and reduced my tax by almost 40%. Worth every penny.' },
            ].map((t) => (
              <motion.div key={t.name} variants={getStaggerItem(reduce)}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 hover:border-[var(--color-gold)]/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={13} fill="var(--color-gold)" style={{ color: 'var(--color-gold)' }} />)}
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
                    style={{ background: 'var(--color-gold)' }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-[11px] text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 8. COUNTRIES SERVED ════════════════════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <motion.div className="text-center mb-10" {...revealUp(0, reduce)}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Serving Clients Across <span className="text-[var(--color-gold)]">4 Countries</span>
            </h2>
            <p className="text-gray-500 text-sm">One firm handling your tax compliance wherever you operate</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { flag: '🇵🇰', country: 'Pakistan', desc: 'FBR · SECP · PRA · SRB · KPRA', color: '#22c55e' },
              { flag: '🇦🇪', country: 'UAE', desc: 'FTA VAT · Corporate Tax · Freezone', color: '#3b82f6' },
              { flag: '🇺🇸', country: 'USA', desc: 'IRS · LLC Registration · ITIN', color: '#ef4444' },
              { flag: '🇸🇦', country: 'Saudi Arabia', desc: 'ZATCA · VAT · FATOORA · Zakat', color: '#f59e0b' },
            ].map((c) => (
              <motion.div key={c.country} {...revealScale(0, reduce)}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center hover:border-[var(--color-gold)]/40 hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{c.flag}</div>
                <div className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{c.country}</div>
                <div className="text-[11px] text-gray-400 leading-relaxed">{c.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. FINAL CTA ═══════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <Grid />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12),_transparent_65%)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...revealUp(0, reduce)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-6">
                Start Today
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Experience the<br />
                <span className="text-[var(--color-gold)]">Tax Zilla Difference?</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
                Your first consultation is completely free. Share your requirements and we will confirm the right services, timeline, and fees — before any commitment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link to="/contact"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-xl shadow-[rgba(212,175,55,0.3)] w-full sm:w-auto justify-center">
                  Book Free Consultation <ArrowRight size={16} />
                </Link>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)] transition-all w-full sm:w-auto justify-center">
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
              {/* Contact row */}
              <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors">
                  <Phone size={12} /> {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors">
                  <Mail size={12} /> {SITE.email}
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} /> Lahore, Pakistan
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsPage;
