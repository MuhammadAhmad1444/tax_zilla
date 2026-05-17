import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import SocialMediaLinks from './SocialMediaLinks';
import { usePageMotion, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';
import { SERVICE_CATEGORIES } from '../data/serviceCatalog.js';
import { SITE } from '../data/site.js';

/* ─── constants ───────────────────────────────────────── */
const GOLD     = '#D4AF37';
const GOLD_DIM = 'rgba(212,175,55,0.18)';
const BG       = '#070e16';

const ColHeader = ({ label }) => (
  <div className="flex items-center gap-2.5 mb-5">
    <span className="w-1 h-4 flex-shrink-0 rounded-full" style={{ background: GOLD }} />
    <h4
      className="text-[10px] font-bold uppercase tracking-[0.2em]"
      style={{ color: GOLD, fontFamily: 'var(--font-heading)' }}
    >
      {label}
    </h4>
  </div>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-2 text-[13px] leading-snug transition-all duration-200"
      style={{ color: 'rgba(255,255,255,0.48)' }}
      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.48)'; }}
    >
      <span
        className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200 group-hover:bg-gold"
        style={{ background: 'rgba(255,255,255,0.2)' }}
      />
      {children}
    </Link>
  </li>
);

/* ══════════════════════════════════════════════════════════ */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { reduce } = usePageMotion();

  const primaryServiceSlugs = [
    'tax-services-pakistan',
    'provincial-sales-tax',
    'corporate-business-services',
    'intellectual-property',
    'individual-tax-services',
  ];

  const internationalServiceSlugs = [
    'visa-immigration-tax-services',
    'overseas-pakistani-tax-services',
    'software-it-services',
    'uae-tax-services',
    'usa-tax-services',
  ];

  const buildLinks = (slugs) =>
    slugs.map((s) => SERVICE_CATEGORIES.find((c) => c.slug === s)).filter(Boolean);

  return (
    <footer style={{ background: BG, color: '#fff' }}>

      {/* ── Gold top accent ───────────────────────────── */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 25%, rgba(212,175,55,0.95) 50%, rgba(212,175,55,0.5) 75%, transparent 100%)' }}
      />

      {/* ── Brand statement ──────────────────────────── */}
      <motion.div
        className="container-custom pt-14 pb-10"
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_REVEAL}
        transition={{ duration: reduce ? 0.01 : 0.5 }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: 'rgba(212,175,55,0.65)' }}
            >
              Trusted Consultancy Since 2014
            </p>
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: '#fff',
              }}
            >
              Pakistan's Most Trusted{' '}
              <em style={{ color: GOLD, fontStyle: 'italic' }}>Tax &amp; Legal</em>{' '}
              Consultancy
            </h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3 text-[13px] font-bold tracking-wide transition-opacity duration-200 hover:opacity-90 flex-shrink-0"
            style={{ background: GOLD, color: '#070e16', borderRadius: 0 }}
          >
            Free Consultation <ArrowRight size={15} />
          </Link>
        </div>

        {/* Gold rule */}
        <div className="mt-8 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), rgba(212,175,55,0.08) 60%, transparent)' }} />
      </motion.div>


      {/* ── Main grid ────────────────────────────────── */}
      <div className="container-custom pb-14">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-10"
          variants={getStaggerContainer(reduce)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REVEAL}
        >

          {/* ── Brand ── */}
          <motion.div variants={getStaggerItem(reduce)} className="xl:col-span-1">
            <div className="mb-5">
              <img
                src="/images/brand-mark.png"
                alt="Tax Zilla"
                className="object-contain"
                style={{ height: '44px', width: 'auto', maxWidth: '160px' }}
                loading="lazy"
              />
            </div>
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.42)' }}>
              Premier tax &amp; legal consultancy. FBR compliance, SECP registration, and corporate advisory — delivered with precision.
            </p>
            <SocialMediaLinks variant="footer" iconSize={16} />
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold transition-opacity hover:opacity-80"
              style={{ color: GOLD }}
            >
              <MessageCircle size={13} />
              WhatsApp Us Now
            </a>
          </motion.div>

          {/* ── Core Services ── */}
          <motion.div variants={getStaggerItem(reduce)}>
            <ColHeader label="Core Services" />
            <ul className="space-y-2.5">
              {buildLinks(primaryServiceSlugs).map((cat) => (
                <FooterLink key={cat.slug} to={`/services/${cat.slug}`}>
                  {cat.title}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ── International ── */}
          <motion.div variants={getStaggerItem(reduce)}>
            <ColHeader label="International" />
            <ul className="space-y-2.5">
              {buildLinks(internationalServiceSlugs).map((cat) => (
                <FooterLink key={cat.slug} to={`/services/${cat.slug}`}>
                  {cat.title}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ── Calculators ── */}
          <motion.div variants={getStaggerItem(reduce)}>
            <ColHeader label="Tax Calculators" />
            <ul className="space-y-2.5">
              {[
                { path: 'salary',         label: 'Salary Tax' },
                { path: 'freelancer',     label: 'Freelancer Tax' },
                { path: 'business',       label: 'Business Tax' },
                { path: 'super-tax',      label: 'Super Tax' },
                { path: 'company-income', label: 'Corporate Tax' },
                { path: 'gain-properties',label: 'Property Gains Tax' },
                { path: 'builder',        label: 'Builder Tax' },
              ].map(({ path, label }) => (
                <FooterLink key={path} to={`/pakistan-tax-calculators?calc=${path}`}>
                  {label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div variants={getStaggerItem(reduce)}>
            <ColHeader label="Get in Touch" />
            <ul className="space-y-4">

              <li>
                <a
                  href="https://maps.google.com/?q=Tax+Zilla+Consultancy+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(212,175,55,0.1)' }}>
                    <MapPin size={12} style={{ color: GOLD }} />
                  </div>
                  <span className="text-[12px] leading-snug" style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >
                    7A, Malik Park, Main Canal Road,<br />Mughalpura, Lahore
                  </span>
                </a>
              </li>

              <li>
                <a href="tel:+923399993308" className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(212,175,55,0.1)' }}>
                    <Phone size={12} style={{ color: GOLD }} />
                  </div>
                  <span
                    className="text-[12px] transition-colors"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >
                    +92 339 9993308
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <Mail size={12} style={{ color: GOLD }} />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="mailto:info@taxzilla.com" className="text-[12px] break-all transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                    info@taxzilla.com
                  </a>
                  <a href="mailto:taxzilla41@gmail.com" className="text-[12px] break-all transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                    taxzilla41@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <Clock size={12} style={{ color: GOLD }} />
                </div>
                <div className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Mon–Fri: 9:00 AM – 6:00 PM<br />
                  Sat: 10:00 AM – 2:00 PM
                </div>
              </li>

            </ul>
          </motion.div>

        </motion.div>
      </div>

      {/* ── CTA strip ────────────────────────────────── */}
      <motion.div
        className="container-custom pb-12"
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_REVEAL}
        transition={{ duration: reduce ? 0.01 : 0.4 }}
      >
        <div
          className="px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          style={{
            border: `1px solid ${GOLD_DIM}`,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 60%, transparent 100%)',
          }}
        >
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
              style={{ color: 'rgba(212,175,55,0.6)' }}
            >
              No Commitment Required
            </p>
            <p
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}
            >
              Talk to a Tax Specialist Today
            </p>
            <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              All services comply with Pakistan's Income Tax Ordinance, Sales Tax Act &amp; Companies Act.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold transition-all duration-200 hover:opacity-80"
              style={{ border: `1px solid ${GOLD_DIM}`, color: GOLD }}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-[12px] font-bold transition-opacity hover:opacity-90"
              style={{ background: GOLD, color: '#070e16' }}
            >
              Book Now <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar ───────────────────────────────── */}
      <div style={{ background: '#030609', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            {/* Left: copyright */}
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              © {currentYear} <span style={{ color: '#ffffff', fontWeight: 600 }}>Tax Zilla</span>. All rights reserved.
            </p>

            {/* Center: legal */}
            <p className="text-[11px] text-center hidden lg:block" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Regulated under Pakistan's Income Tax Ordinance, Sales Tax Act 1990 &amp; Companies Act 2017
            </p>

            {/* Right: links */}
            <div className="flex items-center gap-5">
              {[
                { to: '/legal/privacy-policy',   label: 'Privacy' },
                { to: '/legal/terms-conditions',  label: 'Terms' },
                { to: '/legal/disclaimer',        label: 'Disclaimer' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[11px] transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {label}
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
