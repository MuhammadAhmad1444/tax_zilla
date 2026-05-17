import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

const GOLD  = '#D4AF37';
const GOLD2 = '#b8960a';
const NAVY  = '#04080f';
const CARD_URL = 'https://thetaxzilla.com/card';
const ease  = [0.22, 1, 0.36, 1];

const INFO = {
  phone: '+92 339 9993308', phoneTel: '+923399993308',
  email: 'info@thetaxzilla.com', email2: 'taxzilla41@gmail.com',
  website: 'thetaxzilla.com', websiteUrl: 'https://thetaxzilla.com',
  whatsapp: 'https://wa.me/923399993308',
  address: '7A Malik Park, Main Canal Road, Mughalpura, Lahore',
  facebook:  'https://www.facebook.com/people/Tax-Zilla/61585729178210/',
  instagram: 'https://www.instagram.com/tax.zilla?igsh=MWh5djJpcWZrc2liNw==',
  linkedin:  'https://www.linkedin.com/company/111113328/',
};

/* ── vCard download ──────────────────────────────────────── */
const downloadVCard = () => {
  const vcf = ['BEGIN:VCARD','VERSION:3.0','FN:Tax Zilla — Muzaher And Co Legal Advisors',
    'ORG:Tax Zilla;Muzaher And Co Legal Advisors','TITLE:Tax & Legal Consultancy',
    `TEL;TYPE=CELL:${INFO.phoneTel}`,`EMAIL;TYPE=WORK:${INFO.email}`,
    `EMAIL;TYPE=WORK:${INFO.email2}`,`URL:${INFO.websiteUrl}`,
    `ADR;TYPE=WORK:;;${INFO.address};;;;PK`,
    'NOTE:Trusted Tax & Legal Consultancy in Pakistan','END:VCARD'].join('\n');
  const a = Object.assign(document.createElement('a'),{href:URL.createObjectURL(new Blob([vcf],{type:'text/vcard'})),download:'TaxZilla.vcf'});
  a.click(); URL.revokeObjectURL(a.href);
};

/* ── Floating gold particles ─────────────────────────────── */
const Particles = () => {
  const count = 18;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex:0}}>
      {Array.from({length:count}).map((_,i)=>{
        const x = Math.random()*100;
        const dur = 6+Math.random()*8;
        const delay = Math.random()*8;
        const size = 1.5+Math.random()*2.5;
        return (
          <motion.div key={i}
            style={{ position:'absolute', left:`${x}%`, bottom:-10, width:size, height:size, borderRadius:'50%', background:GOLD, opacity:0 }}
            animate={{ y:[-0,'calc(-100vh - 20px)'], opacity:[0,0.5,0.5,0] }}
            transition={{ duration:dur, delay, repeat:Infinity, ease:'linear', times:[0,0.1,0.9,1] }}
          />
        );
      })}
    </div>
  );
};

/* ── Animated section card ───────────────────────────────── */
const GlassCard = ({children, delay=0, highlight=false, className=''}) => (
  <motion.div
    initial={{opacity:0, y:28, scale:0.97}}
    animate={{opacity:1, y:0, scale:1}}
    transition={{delay, duration:0.55, ease}}
    className={`relative rounded-2xl overflow-hidden ${className}`}
    style={{
      background: highlight
        ? 'linear-gradient(135deg,rgba(212,175,55,0.12) 0%,rgba(212,175,55,0.04) 100%)'
        : 'rgba(255,255,255,0.04)',
      border: highlight ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.08)',
      boxShadow: highlight ? '0 12px 40px rgba(212,175,55,0.08)' : '0 8px 32px rgba(0,0,0,0.3)',
    }}
  >
    {/* Top shimmer bar */}
    <div style={{height:highlight?2:1, background:`linear-gradient(90deg,transparent,${GOLD} 30%,${GOLD} 70%,transparent)`}} />
    {/* Periodic shimmer sweep */}
    <motion.div className="absolute inset-0 pointer-events-none"
      style={{background:'linear-gradient(105deg,transparent 25%,rgba(212,175,55,0.07) 50%,transparent 75%)'}}
      animate={{x:['-100%','200%']}}
      transition={{duration:3.5, repeat:Infinity, ease:'linear', repeatDelay:4+delay*2}}
    />
    {children}
  </motion.div>
);

/* ── Action row (tap target) ─────────────────────────────── */
const ActionRow = ({icon, title, sub, href, delay, accent='rgba(212,175,55,0.12)', iconColor=GOLD}) => (
  <motion.a
    href={href} target={href?.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
    initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}}
    transition={{delay,duration:0.4,ease}}
    whileTap={{scale:0.97, backgroundColor:'rgba(212,175,55,0.06)'}}
    className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors duration-200 group"
    style={{textDecoration:'none'}}
  >
    <motion.div whileHover={{scale:1.12,rotate:5}} transition={{type:'spring',stiffness:400,damping:15}}
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{background:accent,color:iconColor}}>
      {icon}
    </motion.div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-white">{title}</p>
      {sub&&<p className="text-[11px] truncate mt-0.5" style={{color:'rgba(255,255,255,0.38)'}}>{sub}</p>}
    </div>
    <motion.div initial={{x:0}} whileHover={{x:3}} transition={{type:'spring',stiffness:400}}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{width:15,height:15,color:'rgba(255,255,255,0.18)',flexShrink:0}}>
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </motion.div>
  </motion.a>
);

/* ── Social chip ─────────────────────────────────────────── */
const SChip = ({icon, label, href, color, delay}) => (
  <motion.a href={href} target="_blank" rel="noopener noreferrer"
    initial={{opacity:0,scale:0.6,y:12}} animate={{opacity:1,scale:1,y:0}}
    transition={{delay,duration:0.4,ease,type:'spring',stiffness:300,damping:20}}
    whileTap={{scale:0.88}}
    whileHover={{y:-3,boxShadow:`0 8px 20px ${color}30`}}
    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all duration-200 cursor-pointer"
    style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',flex:1,textDecoration:'none'}}>
    <div style={{color}}>{icon}</div>
    <span style={{fontSize:8,fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)'}}>{label}</span>
  </motion.a>
);

/* ── Section header ─────────────────────────────────────── */
const SHead = ({label,delay}) => (
  <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay,duration:0.35}}
    className="flex items-center gap-2.5 px-4 pt-4 pb-2">
    <span style={{fontSize:9,fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(212,175,55,0.55)'}}>{label}</span>
    <div className="flex-1 h-px" style={{background:'linear-gradient(90deg,rgba(212,175,55,0.3),transparent)'}}/>
  </motion.div>
);

/* ── SVG icons ───────────────────────────────────────────── */
const IPhone=()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>;
const IMail=()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IGlobe=()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const IMap=()=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:20,height:20}}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IWA=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const IFB=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IIG=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const ILI=()=><svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;

/* ═══════════════════════════════════════════════════════════ */
export default function DigitalCardPage() {
  const [copied, setCopied] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Tax Zilla — Digital Card';
    document.body.style.background = NAVY;
    return () => { document.body.style.background = ''; };
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(CARD_URL).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div style={{ minHeight:'100vh', background:`radial-gradient(ellipse 160% 60% at 50% -15%,rgba(212,175,55,0.18) 0%,transparent 60%),${NAVY}`, position:'relative' }}>

      {/* Floating particles */}
      <Particles />

      {/* Subtle grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage:'linear-gradient(rgba(212,175,55,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.03) 1px,transparent 1px)',
        backgroundSize:'48px 48px', zIndex:0,
      }}/>

      {/* Ambient glows */}
      <div className="fixed pointer-events-none" style={{top:'-80px',left:'20%',width:'300px',height:'300px',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)',filter:'blur(40px)',zIndex:0}}/>
      <div className="fixed pointer-events-none" style={{bottom:'-60px',right:'10%',width:'250px',height:'250px',borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.05) 0%,transparent 70%)',filter:'blur(40px)',zIndex:0}}/>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto px-4 pt-10 pb-20">

        {/* ══ HERO HEADER ════════════════════════════════════ */}
        <div className="text-center mb-6">

          {/* Animated logo */}
          <motion.div className="flex justify-center mb-5"
            initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}}
            transition={{duration:0.8,ease:[0.34,1.56,0.64,1]}}>
            <div className="relative">
              {/* Outer spinning ring */}
              <motion.div
                animate={{rotate:360}}
                transition={{duration:12,repeat:Infinity,ease:'linear'}}
                style={{position:'absolute',inset:'-12px',borderRadius:'50%',border:'1px solid transparent',
                  backgroundImage:`conic-gradient(${GOLD}60, transparent 30%, transparent 70%, ${GOLD}60)`,
                  backgroundOrigin:'border-box', backgroundClip:'padding-box, border-box',
                  WebkitMask:'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite:'xor',maskComposite:'exclude',
                }}/>
              {/* Pulse glow */}
              <motion.div
                animate={{scale:[1,1.3,1],opacity:[0.4,0.8,0.4]}}
                transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
                style={{position:'absolute',inset:'-8px',borderRadius:'50%',background:`radial-gradient(circle,rgba(212,175,55,0.3) 0%,transparent 70%)`,filter:'blur(8px)'}}/>
              <img src="/images/brand-mark.png" alt="Tax Zilla"
                style={{width:76,height:76,objectFit:'contain',position:'relative',filter:'drop-shadow(0 0 20px rgba(212,175,55,0.45))'}}/>
            </div>
          </motion.div>

          {/* Firm name — letter stagger */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{y:50,opacity:0}} animate={{y:0,opacity:1}}
              transition={{delay:0.3,duration:0.6,ease}}
              style={{fontFamily:'var(--font-heading)',fontSize:28,fontWeight:900,color:'#fff',letterSpacing:'-0.01em',lineHeight:1.1}}>
              Tax <span style={{color:GOLD}}>Zilla</span>
            </motion.h1>
          </div>

          {/* Partner name */}
          <motion.p
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            transition={{delay:0.45,duration:0.5,ease}}
            style={{fontSize:10,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(212,175,55,0.7)',marginBottom:5}}>
            Muzaher And Co Legal Advisors
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{opacity:0}} animate={{opacity:1}}
            transition={{delay:0.55,duration:0.5}}
            style={{fontSize:12,color:'rgba(255,255,255,0.35)',lineHeight:1.5}}>
            Trusted Tax &amp; Legal Consultancy · Lahore
          </motion.p>

          {/* Animated gold divider */}
          <motion.div
            initial={{scaleX:0}} animate={{scaleX:1}}
            transition={{delay:0.65,duration:0.7,ease}}
            className="flex items-center justify-center gap-2.5 mt-4">
            <div style={{width:50,height:1,background:`linear-gradient(90deg,transparent,${GOLD}80)`}}/>
            <motion.span
              initial={{scale:0,rotate:-180}} animate={{scale:1,rotate:0}}
              transition={{delay:0.9,duration:0.4,type:'spring',stiffness:300}}
              style={{color:GOLD,fontSize:6}}>◆</motion.span>
            <div style={{width:50,height:1,background:`linear-gradient(90deg,${GOLD}80,transparent)`}}/>
          </motion.div>
        </div>

        {/* ══ QUICK CALL / WHATSAPP ═══════════════════════════ */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            {href:`tel:${INFO.phoneTel}`,bg:'rgba(212,175,55,0.12)',border:'rgba(212,175,55,0.35)',color:GOLD,icon:<IPhone/>,label:'Call Now',sub:INFO.phone,delay:0.7},
            {href:INFO.whatsapp,bg:'rgba(37,211,102,0.1)',border:'rgba(37,211,102,0.3)',color:'#25D366',icon:<IWA/>,label:'WhatsApp',sub:'Chat now',delay:0.78},
          ].map(b=>(
            <motion.a key={b.label} href={b.href} target={b.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
              initial={{opacity:0,y:20,scale:0.9}} animate={{opacity:1,y:0,scale:1}}
              transition={{delay:b.delay,duration:0.45,ease}}
              whileTap={{scale:0.94}}
              whileHover={{y:-3,boxShadow:`0 12px 28px ${b.color}22`}}
              style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:6,padding:'14px 12px',borderRadius:16,background:b.bg,border:`1px solid ${b.border}`,textDecoration:'none',cursor:'pointer'}}>
              <motion.div animate={{scale:[1,1.08,1]}} transition={{duration:2.5,repeat:Infinity,ease:'easeInOut',delay:b.delay+1}} style={{color:b.color}}>
                {b.icon}
              </motion.div>
              <span style={{fontSize:12,fontWeight:700,color:b.color,lineHeight:1}}>{b.label}</span>
              <span style={{fontSize:10,color:'rgba(255,255,255,0.4)',lineHeight:1}}>{b.sub}</span>
            </motion.a>
          ))}
        </div>

        {/* ══ CONTACT DETAILS ═════════════════════════════════ */}
        <GlassCard delay={0.75} className="mb-4">
          <SHead label="Contact Details" delay={0.8}/>
          <div className="px-2 pb-3 space-y-0.5">
            <ActionRow icon={<IMail/>}  title="Email Us"      sub={INFO.email}    href={`mailto:${INFO.email}`}  delay={0.85}/>
            <ActionRow icon={<IGlobe/>} title="Visit Website" sub={INFO.website}  href={INFO.websiteUrl}          delay={0.9} accent="rgba(96,165,250,0.15)" iconColor="#60a5fa"/>
            <ActionRow icon={<IMap/>}   title="Our Office"    sub={INFO.address}  href={`https://maps.google.com/?q=${encodeURIComponent(INFO.address)}`} delay={0.95} accent="rgba(249,115,22,0.15)" iconColor="#f97316"/>
          </div>
        </GlassCard>

        {/* ══ FOLLOW US ════════════════════════════════════════ */}
        <GlassCard delay={0.95} className="mb-4">
          <SHead label="Follow Us" delay={1.0}/>
          <div className="px-3 pb-4 space-y-2">
            <div className="flex gap-2">
              <SChip icon={<IGlobe/>} label="Website"   href={INFO.websiteUrl} color="#60a5fa" delay={1.02}/>
              <SChip icon={<IFB/>}    label="Facebook"  href={INFO.facebook}   color="#1877F2" delay={1.08}/>
              <SChip icon={<IIG/>}    label="Instagram" href={INFO.instagram}  color="#E4405F" delay={1.14}/>
            </div>
            <div className="flex gap-2">
              <SChip icon={<ILI/>}    label="LinkedIn"  href={INFO.linkedin}   color="#0A66C2" delay={1.18}/>
              <SChip icon={<IWA/>}    label="WhatsApp"  href={INFO.whatsapp}   color="#25D366" delay={1.22}/>
              <div style={{flex:1}}/>
            </div>
          </div>
        </GlassCard>

        {/* ══ QR CODE ══════════════════════════════════════════ */}
        <GlassCard delay={1.1} highlight className="mb-4">
          <div className="flex items-center gap-4 px-4 py-4">
            {/* QR with reveal animation */}
            <motion.div style={{flexShrink:0}}
              initial={{opacity:0,scale:0.7,rotate:-8}} animate={{opacity:1,scale:1,rotate:0}}
              transition={{delay:1.2,duration:0.6,type:'spring',stiffness:200,damping:20}}>
              <div style={{padding:5,borderRadius:14,background:'#fff',boxShadow:`0 0 0 2px ${GOLD}50,0 8px 24px rgba(0,0,0,0.4)`}}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(CARD_URL)}&size=120x120&margin=1`}
                  alt="QR" width={90} height={90} className="block rounded-lg"
                  onLoad={()=>setQrLoaded(true)}
                  style={{opacity:qrLoaded?1:0,transition:'opacity 0.4s'}}/>
              </div>
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.p initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:1.25,duration:0.4}}
                style={{fontSize:9,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:GOLD,marginBottom:4}}>
                ◆ Digital Card
              </motion.p>
              <motion.p initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:1.3,duration:0.4}}
                style={{fontSize:16,fontWeight:900,color:'#fff',fontFamily:'var(--font-heading)',marginBottom:4,lineHeight:1.2}}>
                Scan to Open
              </motion.p>
              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.35,duration:0.4}}
                style={{fontSize:11,color:'rgba(255,255,255,0.36)',lineHeight:1.5,marginBottom:10}}>
                Print on your physical visiting card — clients scan &amp; save instantly.
              </motion.p>
              <motion.button onClick={copyLink}
                initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}
                transition={{delay:1.4,duration:0.3,type:'spring'}}
                whileTap={{scale:0.92}}
                style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:8,background:'rgba(212,175,55,0.1)',color:GOLD,border:`1px solid rgba(212,175,55,0.35)`,fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',cursor:'pointer'}}>
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="c" initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}>✓ Copied!</motion.span>
                    : <motion.span key="n" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}>Copy Link</motion.span>}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </GlassCard>

        {/* ══ SAVE TO CONTACTS ════════════════════════════════ */}
        <motion.button
          initial={{opacity:0,y:20,scale:0.95}} animate={{opacity:1,y:0,scale:1}}
          transition={{delay:1.45,duration:0.5,ease}}
          whileHover={{scale:1.02,boxShadow:`0 16px 40px rgba(212,175,55,0.4)`}}
          whileTap={{scale:0.97}}
          onClick={downloadVCard}
          style={{width:'100%',padding:'16px',display:'flex',alignItems:'center',justifyContent:'center',gap:10,borderRadius:18,
            background:`linear-gradient(135deg,${GOLD} 0%,${GOLD2} 100%)`,color:NAVY,
            fontWeight:800,fontSize:14,letterSpacing:'0.04em',cursor:'pointer',
            boxShadow:`0 8px 28px rgba(212,175,55,0.3),inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}>
          {/* Shimmer on button */}
          <motion.div style={{position:'absolute',inset:0,borderRadius:18,overflow:'hidden',pointerEvents:'none'}}>
            <motion.div
              style={{position:'absolute',inset:0,background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%)'}}
              animate={{x:['-100%','200%']}}
              transition={{duration:2,repeat:Infinity,ease:'linear',repeatDelay:2}}/>
          </motion.div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{width:18,height:18,position:'relative',zIndex:1}}>
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <span style={{position:'relative',zIndex:1}}>Save to Phone Contacts</span>
        </motion.button>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.6,duration:0.5}}
          className="text-center mt-8 space-y-1.5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div style={{width:30,height:1,background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.3))'}}/>
            <span style={{fontSize:6,color:GOLD}}>◆</span>
            <div style={{width:30,height:1,background:'linear-gradient(90deg,rgba(212,175,55,0.3),transparent)'}}/>
          </div>
          <p style={{fontSize:10,color:'rgba(255,255,255,0.18)'}}>© {new Date().getFullYear()} Tax Zilla · Muzaher And Co Legal Advisors</p>
          <a href={INFO.websiteUrl} style={{fontSize:10,color:'rgba(212,175,55,0.45)',textDecoration:'none',display:'block'}}>{INFO.website}</a>
        </motion.div>

      </div>
    </div>
  );
}
