import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Brand constants ─────────────────────────────────────── */
const GOLD   = '#D4AF37';
const NAVY   = '#0b1c29';
const CARD_URL = 'https://thetaxzilla.com/card';

const INFO = {
  firmName:  'Tax Zilla',
  partner:   'Muzaher And Co Legal Advisors',
  tagline:   'Trusted Tax & Legal Consultancy in Pakistan',
  phone:     '+92 339 9993308',
  phoneTel:  '+923399993308',
  email:     'info@taxzilla.com',
  email2:    'taxzilla41@gmail.com',
  website:   'thetaxzilla.com',
  websiteUrl:'https://thetaxzilla.com',
  whatsapp:  'https://wa.me/923399993308',
  address:   '7A Malik Park, Main Canal Road, Mughalpura, Lahore',
  facebook:  'https://www.facebook.com/thetaxzilla',
  instagram: 'https://www.instagram.com/thetaxzilla',
  linkedin:  'https://www.linkedin.com/company/thetaxzilla',
};

/* ── Download vCard ─────────────────────────────────────── */
const downloadVCard = () => {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:Tax Zilla — Muzaher And Co Legal Advisors`,
    `ORG:Tax Zilla;Muzaher And Co Legal Advisors`,
    `TITLE:Tax & Legal Consultancy`,
    `TEL;TYPE=CELL:${INFO.phoneTel}`,
    `TEL;TYPE=WORK:${INFO.phoneTel}`,
    `EMAIL;TYPE=WORK:${INFO.email}`,
    `EMAIL;TYPE=WORK:${INFO.email2}`,
    `URL:${INFO.websiteUrl}`,
    `ADR;TYPE=WORK:;;${INFO.address};;;;PK`,
    `NOTE:${INFO.tagline}`,
    'END:VCARD',
  ].join('\n');
  const blob = new Blob([vcf], { type: 'text/vcard' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = 'TaxZilla.vcf';
  a.click();
  URL.revokeObjectURL(a.href);
};

/* ── Inline SVG icons ───────────────────────────────────── */
const PhoneIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>;
const MailIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const GlobeIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const MapPinIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const WAIcon      = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const FBIcon      = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IGIcon      = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const LIIcon      = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

/* ── Gold divider ────────────────────────────────────────── */
const GoldDivider = ({ my = 6 }) => (
  <div className={`w-full flex items-center gap-3 my-${my}`}>
    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(212,175,55,0.4))` }} />
    <span style={{ color: GOLD, fontSize: '6px' }}>◆</span>
    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, rgba(212,175,55,0.4), transparent)` }} />
  </div>
);

/* ── Contact row ─────────────────────────────────────────── */
const ContactRow = ({ icon, label, value, href, delay }) => (
  <motion.a
    href={href || undefined}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-start gap-3.5 py-2.5 group cursor-pointer"
    style={{ textDecoration: 'none' }}
  >
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
      style={{ background: 'rgba(212,175,55,0.1)', color: GOLD, border: '1px solid rgba(212,175,55,0.2)' }}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: 'rgba(212,175,55,0.55)' }}>{label}</p>
      <p className="text-sm font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.82)', wordBreak: 'break-word' }}>{value}</p>
    </div>
  </motion.a>
);

/* ── Social button ───────────────────────────────────────── */
const SocialBtn = ({ icon, label, href, delay, color }) => (
  <motion.a
    href={href} target="_blank" rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.08, y: -2 }}
    className="flex flex-col items-center gap-1.5 py-3 px-4 rounded-xl transition-all duration-200"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', flex: 1, minWidth: 0 }}
  >
    <div style={{ color: color || GOLD }}>{icon}</div>
    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
  </motion.a>
);

/* ════════════════════════════════════════════════════════════ */
export default function DigitalCardPage() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(CARD_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  /* Prevent body scroll bleed */
  useEffect(() => {
    document.title = 'Tax Zilla — Digital Business Card';
    document.body.style.background = NAVY;
    return () => { document.body.style.background = ''; };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative"
      style={{ background: `radial-gradient(ellipse 120% 60% at 50% -5%, rgba(212,175,55,0.12) 0%, transparent 60%), ${NAVY}` }}>

      {/* ── Subtle grid overlay ── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* ── Ambient orbs ── */}
      <div className="fixed top-[-80px] left-[10%] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="fixed bottom-[-60px] right-[5%] w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      {/* ── Card container ── */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-4 py-8 pb-16">

        {/* ── HEADER: Logo + Name ── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(212,175,55,0.2)', filter: 'blur(16px)', transform: 'scale(1.3)' }}
              />
              <img src="/images/brand-mark.png" alt="Tax Zilla"
                className="relative w-20 h-20 object-contain"
                style={{ filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.35))' }} />
            </div>
          </div>

          {/* Firm name */}
          <h1 className="text-2xl font-extrabold text-white mb-1 leading-tight"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
            Tax <span style={{ color: GOLD }}>Zilla</span>
          </h1>

          {/* Partner line */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-6 flex-shrink-0" style={{ background: 'rgba(212,175,55,0.4)' }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(212,175,55,0.75)' }}>
              Muzaher And Co Legal Advisors
            </p>
            <span className="h-px w-6 flex-shrink-0" style={{ background: 'rgba(212,175,55,0.4)' }} />
          </div>

          {/* Tagline */}
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {INFO.tagline}
          </p>
        </motion.div>

        {/* ── MAIN CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(212,175,55,0.25)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Gold shimmer on card */}
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.06) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
          />
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)' }} />

          <div className="px-5 py-6">

            {/* Contact rows */}
            <ContactRow icon={<PhoneIcon/>}  label="Phone"   value={INFO.phone}    href={`tel:${INFO.phoneTel}`}   delay={0.3} />
            <ContactRow icon={<WAIcon/>}      label="WhatsApp" value="Chat on WhatsApp" href={INFO.whatsapp}        delay={0.38} />
            <ContactRow icon={<MailIcon/>}    label="Email"   value={INFO.email}    href={`mailto:${INFO.email}`}   delay={0.46} />
            <ContactRow icon={<GlobeIcon/>}   label="Website" value={INFO.website}  href={INFO.websiteUrl}          delay={0.54} />
            <ContactRow icon={<MapPinIcon/>}  label="Office"  value={INFO.address}  href={`https://maps.google.com/?q=${encodeURIComponent(INFO.address)}`} delay={0.62} />

            <GoldDivider my={4} />

            {/* Social media */}
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-center mb-3"
              style={{ color: 'rgba(212,175,55,0.5)' }}>Follow Us</p>
            <div className="flex gap-2">
              <SocialBtn icon={<WAIcon/>}  label="WhatsApp" href={INFO.whatsapp}  delay={0.7}  color="#25D366" />
              <SocialBtn icon={<FBIcon/>}  label="Facebook" href={INFO.facebook}  delay={0.76} color="#1877F2" />
              <SocialBtn icon={<IGIcon/>}  label="Instagram" href={INFO.instagram} delay={0.82} color="#E4405F" />
              <SocialBtn icon={<LIIcon/>}  label="LinkedIn" href={INFO.linkedin}  delay={0.88} color="#0A66C2" />
            </div>

          </div>
        </motion.div>

        {/* ── QR CODE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-4 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 100%)',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6) 30%, rgba(212,175,55,0.6) 70%, transparent)' }} />

          <div className="px-5 py-5 flex items-center gap-5">
            {/* QR code */}
            <div className="flex-shrink-0">
              <div className="relative p-1.5 rounded-xl"
                style={{ background: 'white', boxShadow: '0 0 0 1px rgba(212,175,55,0.4), 0 4px 16px rgba(0,0,0,0.3)' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(CARD_URL)}&size=120x120&margin=2`}
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="block rounded-lg"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>

            {/* QR info */}
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: GOLD }}>
                ◆ Digital Card
              </p>
              <p className="text-sm font-bold text-white mb-1 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                Scan to Open
              </p>
              <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Use this QR on your physical visiting card to share all contact info instantly.
              </p>
              <button
                onClick={copyLink}
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{ background: 'rgba(212,175,55,0.12)', color: GOLD, border: '1px solid rgba(212,175,55,0.3)' }}
              >
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="c" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>✓ Copied!</motion.span>
                    : <motion.span key="n" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>Copy Link</motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── SAVE CONTACT button ── */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={downloadVCard}
          className="w-full mt-4 py-4 flex items-center justify-center gap-2.5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${GOLD} 0%, #b8960a 100%)`,
            color: NAVY,
            boxShadow: `0 8px 32px rgba(212,175,55,0.35)`,
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Save to Contacts
        </motion.button>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Tax Zilla · Muzaher And Co Legal Advisors
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>
            Lahore, Pakistan
          </p>
        </motion.div>

      </div>
    </div>
  );
}
