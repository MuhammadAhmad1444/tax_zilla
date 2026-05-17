import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GOLD     = '#D4AF37';
const GOLD2    = '#c9a227';
const NAVY     = '#060e16';
const CARD_URL = 'https://thetaxzilla.com/card';

const INFO = {
  phone:     '+92 339 9993308',
  phoneTel:  '+923399993308',
  email:     'info@taxzilla.com',
  email2:    'taxzilla41@gmail.com',
  website:   'thetaxzilla.com',
  websiteUrl:'https://thetaxzilla.com',
  whatsapp:  'https://wa.me/923399993308',
  address:   '7A Malik Park, Main Canal Road, Mughalpura, Lahore',
  facebook:  'https://www.facebook.com/people/Tax-Zilla/61585729178210/',
  instagram: 'https://www.instagram.com/tax.zilla?igsh=MWh5djJpcWZrc2liNw==',
  linkedin:  'https://www.linkedin.com/company/111113328/',
};

/* ── vCard download ──────────────────────────────────────── */
const downloadVCard = () => {
  const vcf = [
    'BEGIN:VCARD','VERSION:3.0',
    'FN:Tax Zilla — Muzaher And Co Legal Advisors',
    'ORG:Tax Zilla;Muzaher And Co Legal Advisors',
    'TITLE:Tax & Legal Consultancy',
    `TEL;TYPE=CELL:${INFO.phoneTel}`,
    `EMAIL;TYPE=WORK:${INFO.email}`,
    `EMAIL;TYPE=WORK:${INFO.email2}`,
    `URL:${INFO.websiteUrl}`,
    `ADR;TYPE=WORK:;;${INFO.address};;;;PK`,
    'NOTE:Trusted Tax & Legal Consultancy in Pakistan',
    'END:VCARD',
  ].join('\n');
  const blob = new Blob([vcf], { type: 'text/vcard' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'TaxZilla.vcf';
  a.click();
  URL.revokeObjectURL(a.href);
};

/* ── SVG icons ───────────────────────────────────────────── */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const FBIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const IGIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const LIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const ease = [0.22, 1, 0.36, 1];

/* ── Action button (large tap target) ───────────────────── */
const ActionBtn = ({ icon, title, sub, href, onClick, delay, accent }) => (
  <motion.a
    href={href || undefined}
    onClick={onClick}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4, ease }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-200 active:opacity-80 cursor-pointer"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      textDecoration: 'none',
    }}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: accent ? `${accent}18` : 'rgba(212,175,55,0.12)', color: accent || GOLD }}>
      {icon}
    </div>
    <div className="flex-1 min-w-0 text-left">
      <p className="text-sm font-bold text-white leading-tight">{title}</p>
      {sub && <p className="text-[11px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</p>}
    </div>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </motion.a>
);

/* ── Social chip ─────────────────────────────────────────── */
const SocialChip = ({ icon, label, href, color, delay }) => (
  <motion.a
    href={href} target="_blank" rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3, ease }}
    whileTap={{ scale: 0.93 }}
    className="flex flex-col items-center justify-center gap-1.5 py-3.5 rounded-2xl transition-all duration-200"
    style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      flex: 1,
      textDecoration: 'none',
    }}
  >
    <div style={{ color }}>{icon}</div>
    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</span>
  </motion.a>
);

/* ── Section heading ─────────────────────────────────────── */
const SecHead = ({ label, delay }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="flex items-center gap-2.5 mb-3"
  >
    <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgba(212,175,55,0.55)' }}>{label}</span>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.25), transparent)' }} />
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════ */
export default function DigitalCardPage() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Tax Zilla — Digital Card';
    document.body.style.background = NAVY;
    return () => { document.body.style.background = ''; };
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(CARD_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center" style={{
      background: `radial-gradient(ellipse 140% 50% at 50% -10%, rgba(212,175,55,0.14) 0%, transparent 55%), ${NAVY}`,
    }}>
      {/* Grid texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      <div className="relative z-10 w-full max-w-[420px] px-4 pt-10 pb-16 mx-auto">

        {/* ══ HEADER ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="text-center mb-7"
        >
          {/* Logo with glow */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: 'rgba(212,175,55,0.25)', filter: 'blur(20px)', transform: 'scale(1.5)' }}
              />
              <img src="/images/brand-mark.png" alt="Tax Zilla"
                className="relative w-[72px] h-[72px] object-contain"
                style={{ filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.4))' }} />
            </div>
          </div>

          {/* Name */}
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '6px' }}>
            Tax <span style={{ color: GOLD }}>Zilla</span>
          </h1>

          {/* Sub line */}
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.7)', marginBottom: '6px' }}>
            Muzaher And Co Legal Advisors
          </p>

          {/* Tagline */}
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>
            Trusted Tax &amp; Legal Consultancy · Lahore, Pakistan
          </p>

          {/* Gold rule */}
          <div className="flex items-center justify-center gap-2.5 mt-4">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.5))' }} />
            <span style={{ color: GOLD, fontSize: 6 }}>◆</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,rgba(212,175,55,0.5),transparent)' }} />
          </div>
        </motion.div>

        {/* ══ QUICK ACTIONS (Phone + WhatsApp) ════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease }}
          className="grid grid-cols-2 gap-2.5 mb-4"
        >
          <a href={`tel:${INFO.phoneTel}`}
            className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl transition-all"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', textDecoration:'none' }}>
            <div style={{ color: GOLD }}><PhoneIcon /></div>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD }}>Call Now</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{INFO.phone}</span>
          </a>
          <a href={INFO.whatsapp} target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-2xl transition-all"
            style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', textDecoration:'none' }}>
            <div style={{ color: '#25D366' }}><WAIcon /></div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#25D366' }}>WhatsApp</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>Chat now</span>
          </a>
        </motion.div>

        {/* ══ CONTACT DETAILS ══════════════════════════════════ */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{
          background: 'rgba(255,255,255,0.035)',
          border: '1px solid rgba(255,255,255,0.09)',
        }}>
          {/* Gold top line */}
          <div style={{ height: 2, background: `linear-gradient(90deg,transparent,${GOLD} 30%,${GOLD} 70%,transparent)` }} />

          <div className="px-4 py-4 space-y-1">
            <SecHead label="Contact Details" delay={0.25} />

            <ActionBtn icon={<MailIcon/>}  title="Email Us"         sub={INFO.email}      href={`mailto:${INFO.email}`}  delay={0.28} />
            <ActionBtn icon={<GlobeIcon/>} title="Visit Website"    sub={INFO.website}    href={INFO.websiteUrl}          delay={0.33} accent="#60a5fa" />
            <ActionBtn icon={<MapIcon/>}   title="Our Office"       sub={INFO.address}    href={`https://maps.google.com/?q=${encodeURIComponent(INFO.address)}`} delay={0.38} accent="#f97316" />
          </div>
        </div>

        {/* ══ SOCIAL PLATFORMS ═════════════════════════════════ */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{
          background: 'rgba(255,255,255,0.035)',
          border: '1px solid rgba(255,255,255,0.09)',
        }}>
          <div style={{ height: 2, background: `linear-gradient(90deg,transparent,${GOLD} 30%,${GOLD} 70%,transparent)` }} />

          <div className="px-4 pt-4 pb-4">
            <SecHead label="Follow Us" delay={0.42} />

            {/* Row 1: Website + Facebook + Instagram */}
            <div className="flex gap-2 mb-2">
              <SocialChip icon={<GlobeIcon/>}  label="Website"   href={INFO.websiteUrl} color="#60a5fa"  delay={0.45} />
              <SocialChip icon={<FBIcon/>}      label="Facebook"  href={INFO.facebook}   color="#1877F2"  delay={0.49} />
              <SocialChip icon={<IGIcon/>}      label="Instagram" href={INFO.instagram}  color="#E4405F"  delay={0.53} />
            </div>
            {/* Row 2: LinkedIn + WhatsApp */}
            <div className="flex gap-2">
              <SocialChip icon={<LIIcon/>}  label="LinkedIn"  href={INFO.linkedin}  color="#0A66C2"  delay={0.57} />
              <SocialChip icon={<WAIcon/>}  label="WhatsApp"  href={INFO.whatsapp}  color="#25D366"  delay={0.61} />
              {/* Empty flex spacer to balance */}
              <div style={{ flex: 1 }} />
            </div>
          </div>
        </div>

        {/* ══ QR CODE ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease }}
          className="rounded-2xl overflow-hidden mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.09) 0%, rgba(212,175,55,0.03) 100%)',
            border: '1px solid rgba(212,175,55,0.28)',
          }}
        >
          <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${GOLD} 30%,${GOLD} 70%,transparent)` }} />

          <div className="flex items-center gap-4 px-4 py-4">
            {/* QR */}
            <div style={{ flexShrink: 0 }}>
              <div className="p-1.5 rounded-xl" style={{ background: '#fff', boxShadow: `0 0 0 1.5px ${GOLD}40, 0 6px 20px rgba(0,0,0,0.35)` }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(CARD_URL)}&size=110x110&margin=2`}
                  alt="QR Code"
                  width={90} height={90}
                  className="block rounded-lg"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 4 }}>◆ Digital Card</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)', marginBottom: 4, lineHeight: 1.2 }}>Scan to Open</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', lineHeight: 1.5, marginBottom: 10 }}>
                Print this QR on your physical visiting card. Clients scan → instant digital contact.
              </p>
              <button onClick={copyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                style={{ background: 'rgba(212,175,55,0.1)', color: GOLD, border: `1px solid rgba(212,175,55,0.3)` }}>
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="c" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>✓ Copied!</motion.span>
                    : <motion.span key="n" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Copy Link</motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ══ SAVE TO CONTACTS ═════════════════════════════════ */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.45, ease }}
          whileTap={{ scale: 0.97 }}
          onClick={downloadVCard}
          className="w-full py-4 flex items-center justify-center gap-2.5 rounded-2xl font-bold text-sm tracking-wide"
          style={{
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%)`,
            color: NAVY,
            boxShadow: `0 8px 28px rgba(212,175,55,0.32), 0 2px 0 rgba(255,255,255,0.15) inset`,
          }}
        >
          <SaveIcon />
          Save to Phone Contacts (.vcf)
        </motion.button>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="text-center mt-8 space-y-1"
        >
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>
            © {new Date().getFullYear()} Tax Zilla · Muzaher And Co Legal Advisors
          </p>
          <a href={INFO.websiteUrl} style={{ fontSize: 10, color: 'rgba(212,175,55,0.4)', textDecoration: 'none' }}>
            {INFO.website}
          </a>
        </motion.div>

      </div>
    </div>
  );
}
