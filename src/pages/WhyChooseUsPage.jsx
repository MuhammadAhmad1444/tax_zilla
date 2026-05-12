import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Clock, Users, FileCheck, Lock, Award, Briefcase,
  CheckCircle, XCircle, ArrowRight, MessageCircle, Star,
  Zap, Globe, UserCheck, HeartHandshake, PhoneCall,
  TrendingUp, BadgeCheck, ShieldCheck, Sparkles,
  MapPin, Mail, Phone, Play,
} from 'lucide-react';
import { SITE } from '../data/site.js';
import {
  usePageMotion, EASE_OUT, revealUp, revealLeft, revealRight,
  revealScale, getStaggerContainer, getStaggerItem, VIEWPORT_REVEAL,
} from '../lib/motion.js';

/* ── Grid overlay ─────────────────────────── */
const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.045]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

/* ── Animated counter ─────────────────────── */
const CountUp = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = (end / 1800) * 16;
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

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
const WhyChooseUsPage = () => {
  const { reduce, hero } = usePageMotion();

  return (
    <>
      <Helmet>
        <title>Why Choose Tax Zilla — Pakistan's Most Trusted Tax & Legal Consultancy</title>
        <meta name="description" content="Discover why 997+ clients across Pakistan, UAE, USA, and Saudi Arabia trust Tax Zilla. 10+ years of expertise in FBR compliance, SECP, and international tax." />
      </Helmet>

      {/* ══ 1. HERO — FULL IMAGE ══════════════════════════ */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
          alt="Professional tax consultancy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c29]/97 via-[#0b1c29]/85 to-[#0b1c29]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <Grid />

        <motion.div className="container-custom relative z-10 py-32" {...hero}>
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-7 backdrop-blur-sm">
              <Sparkles size={11} /> The Tax Zilla Difference
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.6, ease: EASE_OUT }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Why <span className="text-[var(--color-gold)]">997+</span><br />
              Clients Trust Us
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5, ease: EASE_OUT }}
              className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              In a market full of generic tax agents, Tax Zilla operates differently — qualified consultants, transparent pricing, dedicated case ownership, and commitment that does not end when your return is filed.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.45, ease: EASE_OUT }}
              className="flex flex-wrap gap-4">
              <Link to="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-xl shadow-[rgba(212,175,55,0.35)]">
                Book Free Consultation <ArrowRight size={16} />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:border-[var(--color-gold)]/50 hover:bg-white/10 transition-all">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[var(--color-gold)]" />
        </div>
      </section>

      {/* ══ 2. ANIMATED STATS ════════════════════════════ */}
      <div style={{ background: 'var(--color-brand-navy)' }} className="border-y border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { end: 997, suffix: '+', label: 'Satisfied Clients', sub: 'Across 4 countries' },
              { end: 10,  suffix: '+', label: 'Years Experience', sub: 'Deep regulatory expertise' },
              { end: 70,  suffix: '+', label: 'Service Types',    sub: 'Tax, legal & corporate' },
              { end: 4,   suffix: '',  label: 'Countries Served', sub: 'PK · UAE · USA · KSA' },
            ].map((s) => (
              <div key={s.label} className="py-8 text-center px-4">
                <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>
                  <CountUp end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-white mt-1">{s.label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 3. IMAGE + TEXT — OUR STORY ══════════════════ */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div {...revealLeft(0, reduce)} className="relative">
              <div className="relative rounded-3xl overflow-hidden" style={{ height: 520 }}>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                  alt="Tax Zilla team at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c29]/60 to-transparent" />
                {/* Floating stat card */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-4 backdrop-blur-md border border-white/20"
                  style={{ background: 'rgba(11,28,41,0.85)' }}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-lg font-black text-black flex-shrink-0" style={{ background: 'var(--color-gold)' }}>TZ</div>
                    <div>
                      <div className="text-white font-bold text-sm">Trusted Since 2014</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="var(--color-gold)" style={{ color: 'var(--color-gold)' }} />)}
                        <span className="text-[10px] text-gray-400 ml-1">5.0 · 997+ clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Gold accent block */}
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-2xl -z-10" style={{ background: 'var(--color-gold)', opacity: 0.12 }} />
              <div className="absolute -left-4 -bottom-4 h-20 w-20 rounded-xl -z-10" style={{ background: 'var(--color-brand-navy)', opacity: 0.08 }} />
            </motion.div>

            {/* Text side */}
            <motion.div {...revealRight(0.1, reduce)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-5">
                Who We Are
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Not Just Another<br />
                <span className="text-[var(--color-gold)]">Tax Agent</span>
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Tax Zilla was founded with one belief: tax compliance should be simple, transparent, and stress-free. Over a decade later, we have built a team of qualified consultants, legal advisors, and SECP specialists who handle over 70 service types across Pakistan, UAE, USA, and Saudi Arabia.
              </p>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                We do not just file returns — we become your compliance partner. Every client gets a dedicated consultant, written fee confirmation, and 60 days of post-filing support. Zero hidden charges. Zero surprises.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BadgeCheck, text: 'Qualified Professionals' },
                  { icon: Lock,       text: 'NDA-Grade Confidentiality' },
                  { icon: Zap,        text: 'Zero Missed Deadlines' },
                  { icon: Globe,      text: '4-Country Expertise' },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5 text-sm font-semibold text-gray-700">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)' }}>
                      <f.icon size={15} />
                    </div>
                    {f.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 4. DIFFERENTIATORS — IMAGE CARDS ═════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">What Sets Us Apart</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>9 Reasons Clients Choose<br /><span className="text-[var(--color-gold)]">Tax Zilla</span></h2>
            <p className="text-gray-500 text-base leading-relaxed">Every aspect of our service is designed around one goal: making compliance effortless and accurate.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={getStaggerContainer(reduce, 0.07)} initial="hidden" whileInView="visible" viewport={VIEWPORT_REVEAL}>
            {[
              { icon: UserCheck,    title: 'Dedicated Case Consultant',     badge: 'Your expert for life',           desc: 'One senior consultant owns your case end-to-end. No handoffs, no confusion — just one expert who knows your complete financial picture.',           img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=60' },
              { icon: BadgeCheck,   title: 'Transparent Pricing',           badge: 'Written quote before we start',  desc: 'We confirm scope, timeline, and exact fees in writing before starting. No surprise invoices, no upsells, no hidden government fee markups.',      img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=60' },
              { icon: Globe,        title: 'Multi-Country Expertise',       badge: 'PK · UAE · USA · KSA · UK',      desc: 'The rare firm handling Pakistan FBR, UAE FTA, US IRS, Saudi ZATCA, and UK HMRC — all from one team with genuine cross-border expertise.',           img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=60' },
              { icon: Zap,          title: 'Deadline-Driven Delivery',      badge: 'Zero missed deadlines',          desc: 'We track every filing deadline proactively and send reminders before FBR due dates. Your compliance is never at risk.',                           img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=60' },
              { icon: Lock,         title: 'Strict Confidentiality',        badge: 'NDA-grade protection',           desc: 'Your financial data, portal credentials, and business information are handled under strict non-disclosure — never shared without consent.',         img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=60' },
              { icon: HeartHandshake, title: '60-Day Post-Filing Support',  badge: '60 days included free',          desc: 'Our engagement does not end when we submit your return. Available for FBR queries, notices, or clarifications for 60 days — no extra charge.',    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=60' },
              { icon: PhoneCall,    title: '24/7 WhatsApp Access',          badge: 'Always reachable',               desc: 'Tax emergencies do not follow office hours. Our WhatsApp is monitored around the clock for urgent matters — FBR notices, portal issues, queries.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=60' },
              { icon: ShieldCheck,  title: 'FBR Audit Defence',             badge: 'We represent you before FBR',    desc: 'If FBR selects your return for audit, we represent you and handle all correspondence. Clients who file with us are never left alone facing FBR.',   img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=60' },
              { icon: TrendingUp,   title: 'Proactive Tax Planning',        badge: 'Reduce, not just comply',        desc: 'We do not just file — we advise. We identify legal ways to reduce your tax liability, optimise business structure, and plan for the coming year.',  img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60' },
            ].map((item) => (
              <motion.div key={item.title} variants={getStaggerItem(reduce)}
                className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[var(--color-gold)]/30 transition-all duration-400">
                {/* Image top */}
                <div className="relative overflow-hidden" style={{ height: 160 }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
                  {/* Gold bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'var(--color-gold)' }} />
                  {/* Badge overlay */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(212,175,55,0.9)', color: '#000' }}>
                    <CheckCircle size={8} /> {item.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)' }}>
                      <item.icon size={17} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[var(--color-gold)] transition-colors leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 5. COMPARISON TABLE ══════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div className="text-center mb-12" {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">Side-by-Side</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Tax Zilla vs Typical Agent
            </h2>
            <p className="text-gray-400 text-sm">See exactly how we are different from generic tax agents</p>
          </motion.div>

          <motion.div {...revealScale(0.1, reduce)} className="overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border-b border-gray-100 w-1/2">Feature</th>
                  <th className="px-6 py-5 text-center text-[11px] font-bold uppercase tracking-wider border-b border-white/10 w-1/4" style={{ background: 'var(--color-brand-navy)', color: 'var(--color-gold)' }}>
                    ✦ Tax Zilla
                  </th>
                  <th className="px-6 py-5 text-center text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border-b border-gray-100 w-1/4">Typical Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Dedicated case consultant',                    true,  false],
                  ['Written fee quote before starting',            true,  false],
                  ['Multi-country tax expertise',                  true,  false],
                  ['60-day post-filing support included',          true,  false],
                  ['24/7 WhatsApp availability',                   true,  false],
                  ['FBR audit representation',                     true,  false],
                  ['Proactive deadline reminders',                 true,  false],
                  ['Full remote service — no office visits',       true,  false],
                  ['Zero hidden fees',                             true,  false],
                  ['Cross-border advisory (UAE/USA/KSA/UK)',       true,  false],
                  ['Qualified professionals on every case',        true, 'Sometimes'],
                  ['Same-day / next-day filing (standard cases)',  true, 'Often delayed'],
                ].map(([f, us, them], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4 text-[13px] font-medium text-gray-700">{f}</td>
                    <td className="px-6 py-4 text-center" style={{ background: i % 2 === 0 ? 'rgba(11,28,41,0.03)' : 'rgba(11,28,41,0.05)' }}>
                      {us === true
                        ? <CheckCircle size={19} className="mx-auto" style={{ color: 'var(--color-gold)' }} />
                        : <span className="text-[11px] font-semibold" style={{ color: 'var(--color-gold)' }}>{us}</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {them === false
                        ? <XCircle size={19} className="mx-auto text-red-300" />
                        : <span className="text-[11px] text-gray-400 font-medium">{them}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ══ 6. GUARANTEE + QUOTE IMAGE ════════════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Guarantees */}
            <motion.div {...revealLeft(0, reduce)}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-5">
                <Shield size={11} /> Our Promise
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                The Tax Zilla <span className="text-[var(--color-gold)]">Guarantee</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: FileCheck,  title: 'Accuracy Guarantee',       desc: 'If we make an error in your FBR filing, we cover the cost of correction and any penalties caused by our mistake.' },
                  { icon: Clock,      title: 'On-Time Guarantee',         desc: 'We commit to agreed timelines in writing. Miss a deadline without valid reason — you receive a fee discount.' },
                  { icon: BadgeCheck, title: 'Transparency Guarantee',    desc: 'The fee quoted is the fee charged. No add-ons, no surprise government fee markups — all disclosed upfront in writing.' },
                  { icon: Lock,       title: 'Confidentiality Guarantee', desc: 'Your data is never shared without written consent — except where legally required by regulators.' },
                ].map((g) => (
                  <div key={g.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-gold)]/30 hover:shadow-md transition-all group">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--color-gold)' }}>
                      <g.icon size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm mb-1">{g.title}</div>
                      <div className="text-[13px] text-gray-500 leading-relaxed">{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image + quote card */}
            <motion.div {...revealRight(0.1, reduce)} className="relative">
              <div className="relative rounded-3xl overflow-hidden h-full" style={{ minHeight: 520 }}>
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80"
                  alt="Professional consultation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c29]/95 via-[#0b1c29]/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                  <div className="text-5xl font-black leading-none mb-4" style={{ color: 'rgba(212,175,55,0.25)', fontFamily: 'var(--font-heading)' }}>"</div>
                  <blockquote className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    We do not just file your tax return. We become your financial compliance partner — protecting you, reducing tax legally, and giving you total peace of mind.
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl flex items-center justify-center text-base font-black text-black" style={{ background: 'var(--color-gold)' }}>TZ</div>
                      <div>
                        <div className="font-bold text-white text-sm">Tax Zilla Consultancy</div>
                        <div className="text-[11px] text-gray-400">Lahore, Pakistan · Est. 2014</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--color-gold)" style={{ color: 'var(--color-gold)' }} />)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 7. TESTIMONIALS WITH IMAGES ══════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/25 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)] mb-4">
              <Star size={10} fill="currentColor" /> Real Client Stories
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              What Our Clients Say
            </h2>
            <p className="text-gray-400 text-sm">997+ clients across Pakistan, UAE, USA, and Saudi Arabia</p>
          </motion.div>

          {/* Featured big testimonial */}
          <motion.div {...revealUp(0.05, reduce)} className="relative rounded-3xl overflow-hidden mb-8">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1400&q=80"
              alt="Client testimonial"
              className="w-full object-cover"
              style={{ height: 300 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c29]/95 via-[#0b1c29]/80 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom max-w-2xl">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--color-gold)" style={{ color: 'var(--color-gold)' }} />)}
                </div>
                <blockquote className="text-lg sm:text-2xl font-bold text-white leading-relaxed mb-4 italic" style={{ fontFamily: 'var(--font-heading)' }}>
                  "Tax Zilla handled my UAE corporate tax and Pakistan FBR return in the same month. The cross-border advisory alone saved me 40% in unnecessary taxes."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--color-gold)' }}>AF</div>
                  <div>
                    <div className="font-bold text-white text-sm">Ahmed Al-Farooq</div>
                    <div className="text-[11px] text-gray-400">Business Owner · Dubai & Lahore</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3-col reviews */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5"
            variants={getStaggerContainer(reduce, 0.08)} initial="hidden" whileInView="visible" viewport={VIEWPORT_REVEAL}>
            {[
              { initials: 'UT', name: 'Usman Tariq',    role: 'IT Freelancer, Lahore',   stars: 5, text: 'Tax Zilla explained Clause 133 in 10 minutes, got my NTN in one day, and filed my return with full foreign income disclosure. My refund came in 3 weeks.' },
              { initials: 'SM', name: 'Sana Malik',     role: 'Business Owner, Karachi', stars: 5, text: 'FBR audit notice at 9pm on a Friday. Tax Zilla WhatsApp was active. By Monday they had drafted the full response. Case closed, zero penalty.' },
              { initials: 'BC', name: 'Bilal Chaudhry', role: 'Director, Islamabad',     stars: 5, text: 'SECP filing, FBR income tax, and WHT statements all done in one engagement. Transparent invoice, no surprises. Exactly what I needed.' },
              { initials: 'NK', name: 'Nadia Khan',     role: 'Salaried Professional',   stars: 5, text: 'Non-filer for 5 years, terrified to start. They guided me through everything. Now I am on ATL and saved Rs. 180,000 on my car registration.' },
              { initials: 'RA', name: 'Rana Asad',      role: 'Property Investor',       stars: 5, text: 'Two property sales, significant CGT exposure. Their restructuring — completely legal — reduced my tax by almost 40%. Worth every rupee.' },
              { initials: 'MH', name: 'Maria Hussain',  role: 'Overseas Pakistani, UK',  stars: 5, text: 'Based in London, had no idea about my Pakistan tax obligations. Tax Zilla sorted my FBR return, ATL status, and even my TRC certificate — all remotely.' },
            ].map((t) => (
              <motion.div key={t.name} variants={getStaggerItem(reduce)}
                className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-[var(--color-gold)]/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={12} fill="var(--color-gold)" style={{ color: 'var(--color-gold)' }} />)}
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0" style={{ background: 'var(--color-gold)' }}>
                    {t.initials}
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

      {/* ══ 8. COUNTRIES — IMAGE CARDS ═══════════════════ */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <motion.div className="text-center mb-10" {...revealUp(0, reduce)}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Serving Clients Across <span className="text-[var(--color-gold)]">4 Countries</span>
            </h2>
            <p className="text-gray-500 text-sm">One firm, one team, handling your compliance wherever you operate</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { flag: '🇵🇰', country: 'Pakistan', city: 'Lahore HQ', desc: 'FBR · SECP · PRA · SRB', img: 'https://images.unsplash.com/photo-1567422222572-6d93c6a8a3b5?auto=format&fit=crop&w=600&q=60' },
              { flag: '🇦🇪', country: 'UAE',      city: 'Dubai',    desc: 'FTA VAT · Corporate Tax', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=60' },
              { flag: '🇺🇸', country: 'USA',      city: 'Remote',   desc: 'IRS · LLC · ITIN',        img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=60' },
              { flag: '🇸🇦', country: 'Saudi Arabia', city: 'Riyadh', desc: 'ZATCA · VAT · Zakat',  img: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=600&q=60' },
            ].map((c) => (
              <motion.div key={c.country} {...revealScale(0, reduce)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ height: 220 }}>
                <img src={c.img} alt={c.country} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: 'var(--color-gold)' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="text-2xl mb-1">{c.flag}</div>
                  <div className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{c.country}</div>
                  <div className="text-[10px] text-gray-300">{c.city}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. FINAL CTA — FULL BACKGROUND IMAGE ═════════ */}
      <section className="relative overflow-hidden py-24">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80"
          alt="Professional office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c29]/98 via-[#0b1c29]/92 to-[#0b1c29]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.1),_transparent_60%)]" />
        <Grid />

        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.div {...revealUp(0, reduce)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-6 backdrop-blur-sm">
              Start Today — It is Free
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Ready to Experience the<br />
              <span className="text-[var(--color-gold)]">Tax Zilla Difference?</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-10 leading-relaxed">
              First consultation is completely free. Share your requirements and we will confirm the right services, timeline, and fees — before any commitment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link to="/contact"
                className="flex items-center gap-2 px-9 py-4 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-2xl shadow-[rgba(212,175,55,0.4)] w-full sm:w-auto justify-center">
                Book Free Consultation <ArrowRight size={16} />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-9 py-4 rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:border-[var(--color-gold)]/50 hover:bg-white/10 transition-all w-full sm:w-auto justify-center">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-xs text-gray-500">
              <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors">
                <Phone size={12} /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors">
                <Mail size={12} /> {SITE.email}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} /> 7A Malik Park, Lahore
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsPage;
