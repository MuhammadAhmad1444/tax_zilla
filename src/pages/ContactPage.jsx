import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Mail, Phone, Clock, MapPin, MessageCircle,
  ShieldCheck, Zap, UserCheck, CheckCircle,
  Facebook, Linkedin, Instagram,
} from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';
import SocialMediaLinks from '../components/SocialMediaLinks.jsx';
import Button from '../components/Button.jsx';
import { SITE } from '../data/site.js';
import { usePageMotion, EASE_OUT, VIEWPORT_REVEAL, revealUp, revealLeft, revealRight, revealScale } from '../lib/motion.js';
import { useReducedMotion } from 'framer-motion';

/* ── Shared decorative grid ─────────────────────────── */
const Grid = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage:
        'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />
);

const HERO_STATS = [
  { value: '< 2hrs', label: 'Response Time' },
  { value: 'Free', label: 'Consultation' },
  { value: '24/7', label: 'WhatsApp Support' },
  { value: '997+', label: 'Clients Helped' },
];

const WHY_CONTACT = [
  { icon: ShieldCheck, title: 'Expert Guidance', desc: 'Get clear, professional advice from qualified tax consultants — not generic answers.' },
  { icon: Zap, title: 'Fast Response', desc: 'We respond to all enquiries within 2 hours during business hours. WhatsApp is instant.' },
  { icon: UserCheck, title: 'No Commitment', desc: 'Your first consultation is completely free. Share your requirements, get a clear plan.' },
];

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: 'Call / WhatsApp',
    lines: ['+92 339 9993308', '+92 300 9860279'],
    href: `tel:+923399993308`,
    sub: 'Mon–Sat, 9am–7pm PKT',
  },
  {
    icon: Mail,
    label: 'Email Us',
    lines: ['info@taxzilla.com'],
    href: 'mailto:info@taxzilla.com',
    sub: 'We reply within 2 hours',
  },
  {
    icon: MapPin,
    label: 'Office Address',
    lines: ['7A, Malik Park Main Street', 'Main Canal Road, Mughalpura', 'Lahore, Pakistan'],
    href: 'https://maps.google.com/?q=Tax+Zilla+Consultancy+Lahore',
    sub: 'Walk-ins welcome',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 2:00 PM'],
    href: null,
    sub: 'WhatsApp available 24/7',
  },
];

/* ── Map with loading skeleton ───────────────────────────── */
const MapEmbed = ({ revealScale, reduceMotion }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  return (
    <motion.div
      {...revealScale(0.1, reduceMotion)}
      className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-xl"
      style={{ height: '420px' }}
    >
      {/* Loading overlay — visible until iframe fires onLoad */}
      {!mapLoaded && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
          style={{ background: 'var(--color-surface-muted)' }}
        >
          {/* Skeleton strips */}
          <div className="w-full max-w-xs space-y-3">
            <div className="h-3 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-3 rounded-full bg-gray-200 animate-pulse w-4/5" />
            <div className="h-3 rounded-full bg-gray-200 animate-pulse w-3/5" />
          </div>
          {/* Gold spinner ring */}
          <div className="relative h-14 w-14 mt-1">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-gold)] animate-spin" />
            <MapPin size={18} className="absolute inset-0 m-auto" style={{ color: 'var(--color-gold)' }} />
          </div>
          <p className="text-sm font-semibold text-gray-500">Loading map…</p>
          <p className="text-xs text-gray-400">7A, Malik Park, Lahore</p>
        </div>
      )}

      {/* Google Map iframe — fades in once loaded */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.916362576402!2d74.3725713!3d31.5265217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905001c2957b9%3A0x6b80140226493a7!2sTax%20Zilla%20Consultancy!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0, opacity: mapLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Tax Zilla Consultancy Location — Lahore"
        onLoad={() => setMapLoaded(true)}
      />
    </motion.div>
  );
};

const ContactPage = () => {
  const { reduce, hero } = usePageMotion();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>Contact Us — Tax Zilla Consultancy</title>
        <meta
          name="description"
          content="Contact Tax Zilla Consultancy in Lahore. Free tax consultation, FBR filing help, and company registration services. Call: +92 339 9993308. Email: info@taxzilla.com."
        />
      </Helmet>

      {/* ── Hero ────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36"
        style={{ background: 'var(--color-brand-navy)' }}
      >
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
            Free Consultation · No Commitment
          </motion.div>

          <motion.h1
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.52, ease: EASE_OUT, delay: reduce ? 0 : 0.16 }}
            className="px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl leading-tight mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Let's Talk About{' '}
            <span className="text-[var(--color-gold)]">Your Tax Needs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.48, ease: EASE_OUT, delay: reduce ? 0 : 0.24 }}
            className="max-w-2xl mx-auto px-2 text-base text-gray-300 sm:text-lg leading-relaxed mb-10"
          >
            Share your requirements and we will confirm the right services, timeline, and fees — before any commitment.
          </motion.p>

          {/* Quick contact pills */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.44, ease: EASE_OUT, delay: reduce ? 0 : 0.32 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a
              href={`tel:${SITE.phoneTel}`}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/15 transition-all"
            >
              <Phone size={13} className="text-[var(--color-gold)]" /> {SITE.phone}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/15 transition-all"
            >
              <MessageCircle size={13} className="text-[var(--color-gold)]" /> WhatsApp Now
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/15 transition-all"
            >
              <Mail size={13} className="text-[var(--color-gold)]" /> {SITE.email}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ───────────────────────────────── */}
      <div className="border-b border-white/10" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-4 divide-x divide-white/10">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="py-5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-[var(--color-gold)]">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Contact ─────────────────────────────── */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {WHY_CONTACT.map((item, i) => (
              <motion.div
                key={item.title}
                {...revealScale(i * 0.1, reduceMotion)}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-[var(--color-surface-muted)] hover:border-[var(--color-gold)]/30 transition-colors group"
              >
                <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main: Form + Info ───────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">

            {/* Left: Form (wider) */}
            <motion.div className="lg:col-span-3" {...revealLeft(0, reduceMotion)}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">
                  Send an Enquiry
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Book Your Free Consultation
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Fill out the form and we'll get back to you within 2 hours with a complete plan.
                </p>
              </div>
              <ContactForm />
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div className="lg:col-span-2 space-y-4" {...revealRight(0.1, reduceMotion)}>
              <div className="mb-6">
                <h2
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Contact Information
                </h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Reach us by phone, email, WhatsApp, or visit our office.
                </p>
              </div>

              {/* Contact cards */}
              {CONTACT_CARDS.map((card) => {
                const Inner = (
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                      <card.icon size={19} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">{card.label}</div>
                      {card.lines.map((line) => (
                        <div key={line} className="text-sm font-bold text-gray-800 leading-snug">{line}</div>
                      ))}
                      <div className="text-xs text-[var(--color-gold)] mt-1 font-medium">{card.sub}</div>
                    </div>
                  </div>
                );

                return card.href ? (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group block card-surface p-4 hover:border-[var(--color-gold)]/50 hover:bg-white transition-all"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={card.label} className="card-surface p-4">
                    {Inner}
                  </div>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 p-4 hover:bg-[var(--color-gold)]/15 transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)] text-black flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Chat on WhatsApp</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Fastest way to reach us — instant response</div>
                </div>
              </a>

              {/* Social Media */}
              <div className="card-surface p-5">
                <h3 className="font-bold text-sm text-gray-700 mb-4 uppercase tracking-wider text-[10px]">Follow Us</h3>
                <SocialMediaLinks variant="contact" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map Section ─────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-3">
              Our Location
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Visit Our Office in <span className="text-[var(--color-gold)]">Lahore</span>
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              7A, Malik Park Main Street, Main Canal Road, Mughalpura, Lahore, Pakistan
            </p>
          </motion.div>

          <MapEmbed revealScale={revealScale} reduceMotion={reduceMotion} />

          {/* Quick info below map */}
          <motion.div
            {...revealUp(0.15, reduceMotion)}
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Clock, title: 'Mon – Fri', sub: '9:00 AM – 6:00 PM' },
              { icon: Clock, title: 'Saturday', sub: '10:00 AM – 2:00 PM' },
              { icon: MessageCircle, title: 'WhatsApp', sub: 'Available 24/7' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[var(--color-surface-muted)] p-4"
              >
                <div className="h-9 w-9 rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
                  <item.icon size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.title}</div>
                  <div className="text-sm font-bold text-gray-800">{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final WhatsApp CTA ───────────────────────── */}
      <section className="relative overflow-hidden py-16 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />
        <Grid />
        <motion.div
          className="container-custom relative z-10 text-center"
          {...revealUp(0, reduceMotion)}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Prefer to Chat? <span className="text-[var(--color-gold)]">We're on WhatsApp</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Send a quick message and our team will respond instantly. No waiting, no queues — just fast, expert answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
            >
              <MessageCircle size={20} className="mr-2" /> Start WhatsApp Chat
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = `tel:${SITE.phoneTel}`}>
              <Phone size={18} className="mr-2" /> {SITE.phone}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {['Free Consultation', 'No Commitment', 'Expert Advice', 'Instant Response', 'Confidential'].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 rounded-full bg-white/8 border border-white/10 px-3 py-1.5 text-xs text-gray-300 font-medium"
              >
                <CheckCircle size={11} className="text-[var(--color-gold)]" /> {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ContactPage;
