import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePageMotion, EASE_OUT } from '../lib/motion.js';

/* ── Data ──────────────────────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    name: 'Ahmed Khan',
    role: 'Freelance Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    text: 'Tax Zilla simplified my tax filing completely. As a freelancer receiving foreign remittances, I was confused about exemptions. Their team guided me perfectly and I filed with zero hassle.',
    rating: 5,
    type: 'Freelancer',
  },
  {
    id: 2,
    name: 'Sarah Bilal',
    role: 'CEO, TechStart Solutions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    text: 'Registering my company with SECP seemed daunting until I met Tax Zilla. They handled everything from name reservation to incorporation efficiently. Highly recommended for startups!',
    rating: 5,
    type: 'Startup Founder',
  },
  {
    id: 3,
    name: 'Muhammad Usman',
    role: 'Owner, Al-Fatah Traders',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    text: 'Their audit assistance is top-notch. When I received a notice from FBR, the Tax Zilla consultants represented my case professionally and resolved the issue quickly.',
    rating: 5,
    type: 'SME Owner',
  },
  {
    id: 4,
    name: 'Zainab Malik',
    role: 'Marketing Consultant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    text: "I've used their income tax filing service for 3 years. Always timely, professional, and they keep me updated on the latest tax laws. Absolute peace of mind guaranteed.",
    rating: 5,
    type: 'Individual Taxpayer',
  },
  {
    id: 5,
    name: 'Bilal Ahmed',
    role: 'Director, BuildCorp Pvt Ltd',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    text: 'From annual returns to sales tax filings, Tax Zilla handles our entire corporate compliance portfolio with precision and expertise. They are an indispensable partner.',
    rating: 5,
    type: 'Corporate Client',
  },
  {
    id: 6,
    name: 'Hira Noor',
    role: 'E-commerce Entrepreneur',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    text: 'Setting up sales tax registration for my online store was seamless with Tax Zilla. They explained every step clearly and filed everything on time. Super professional team!',
    rating: 5,
    type: 'E-commerce',
  },
  {
    id: 7,
    name: 'Farhan Siddiqui',
    role: 'CFO, Horizon Industries',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
    text: 'We switched to Tax Zilla for corporate tax work and the difference is night and day. Their FBR knowledge is deep and their response time is outstanding every single time.',
    rating: 5,
    type: 'Corporate CFO',
  },
  {
    id: 8,
    name: 'Ayesha Raza',
    role: 'Overseas Pakistani, UAE',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    text: 'Managing my Pakistan tax obligations from abroad felt impossible before Tax Zilla. Now my NTN is active, returns are filed on time, and I never miss a deadline.',
    rating: 5,
    type: 'Overseas Pakistani',
  },
  {
    id: 9,
    name: 'Kamran Sheikh',
    role: 'Property Developer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    text: 'Capital gains tax on property can be complex. Tax Zilla handled my CGT filing and saved me a significant amount through proper legal exemptions. Outstanding service!',
    rating: 5,
    type: 'Property Investor',
  },
];

const stats = [
  { value: 997, suffix: '+', label: 'Happy Clients' },
  { value: 98,  suffix: '%', label: 'Retention Rate' },
  { value: 15,  suffix: '+', label: 'Years Experience' },
  { value: 24,  suffix: '/7', label: 'Support Available' },
];

/* ── Animated counter ──────────────────────────────────────────── */
function Counter({ value, suffix, reduce }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView || reduce) { setCount(value); return; }
    let cur = 0;
    const step = Math.ceil(value / 55);
    const id = setInterval(() => {
      cur += step;
      if (cur >= value) { setCount(value); clearInterval(id); }
      else setCount(cur);
    }, 22);
    return () => clearInterval(id);
  }, [inView, value, reduce]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

/* ── Single card ───────────────────────────────────────────────── */
function Card({ t }) {
  return (
    <div
      className="relative flex flex-col h-full rounded-2xl bg-white px-7 py-8 select-none transition-all duration-300"
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 6px 24px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.06)',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(212,175,55,0.18)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06), 0 6px 24px rgba(0,0,0,0.07)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; }}
    >
      {/* Gold top accent */}
      <div
        className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full"
        style={{ background: 'linear-gradient(90deg,var(--color-gold),transparent)' }}
      />

      {/* Big quote watermark */}
      <Quote
        size={44}
        className="mb-3 opacity-[0.08]"
        style={{ color: 'var(--color-gold)' }}
        fill="currentColor"
      />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4" style={{ color: 'var(--color-gold)' }}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" />
        ))}
      </div>

      {/* Text */}
      <p className="flex-grow text-[15px] leading-relaxed text-gray-600 mb-7 italic">
        "{t.text}"
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
        <img
          src={t.image}
          alt={t.name}
          className="h-12 w-12 rounded-full object-cover flex-shrink-0"
          style={{ border: '2px solid var(--color-gold)' }}
          onError={e => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=d4af37&color=fff&size=80`;
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-gray-900 text-sm leading-tight">{t.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{t.role}</p>
        </div>
        <span
          className="flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase"
          style={{ background: 'rgba(212,175,55,0.12)', color: 'var(--color-gold)' }}
        >
          {t.type}
        </span>
      </div>
    </div>
  );
}

/* ── Slide variants ────────────────────────────────────────────── */
const variants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Main component ────────────────────────────────────────────── */
export default function ClientTestimonials() {
  const { reduce } = usePageMotion();
  const [[page, dir], setPage] = useState([0, 0]);
  const [paused, setPaused]   = useState(false);
  const INTERVAL = 4500;

  /* Determine how many cards to show (controlled via CSS, JS just manages index) */
  const [perView, setPerView] = useState(2);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const total = Math.ceil(testimonials.length / perView); // number of "pages"

  const paginate = useCallback((newDir) => {
    setPage(([p]) => [(p + newDir + total) % total, newDir]);
  }, [total]);

  /* Auto-advance */
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => paginate(1), INTERVAL);
    return () => clearInterval(id);
  }, [paused, reduce, paginate]);

  /* Cards for current page */
  const startIdx = page * perView;
  const visible  = testimonials.slice(startIdx, startIdx + perView);

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: '#f8f9fc' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-[0.05]"
        style={{ background: 'var(--color-gold)', filter: 'blur(90px)' }} />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full opacity-[0.04]"
        style={{ background: 'var(--color-gold)', filter: 'blur(70px)' }} />

      <div className="container-custom py-16 sm:py-20 relative z-10">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-14"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: 'var(--color-gold)' }}>Client Stories</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Trusted by hundreds of businesses and individuals across Pakistan.
          </p>
          <div className="mt-5 mx-auto h-1 w-14 rounded-full" style={{ background: 'var(--color-gold)' }} />
        </motion.div>

        {/* ── Carousel ── */}
        <div className="relative max-w-5xl mx-auto">

          {/* Slide window */}
          <div className="overflow-hidden rounded-2xl" style={{ minHeight: 320 }}>
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.div
                key={page}
                custom={dir}
                variants={reduce ? {} : variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid gap-6"
                style={{ gridTemplateColumns: perView === 2 ? '1fr 1fr' : '1fr' }}
              >
                {visible.map((t) => (
                  <Card key={t.id} t={t} />
                ))}
                {/* Filler card if odd number on last page */}
                {perView === 2 && visible.length === 1 && (
                  <div className="rounded-2xl bg-white/40" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next arrows */}
          {[{ dir: -1, Icon: ChevronLeft, side: 'left-0 -translate-x-4 sm:-translate-x-6' },
            { dir:  1, Icon: ChevronRight, side: 'right-0 translate-x-4 sm:translate-x-6' }
          ].map(({ dir: d, Icon, side }) => (
            <button
              key={d}
              type="button"
              onClick={() => paginate(d)}
              className={`absolute top-1/2 -translate-y-1/2 ${side} z-20 hidden sm:flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg text-gray-600 transition-all duration-200 hover:scale-110`}
              style={{ border: '1px solid rgba(0,0,0,0.07)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = ''; }}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

        {/* ── Dots + mobile arrows ── */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {/* Mobile prev */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white shadow text-gray-600"
            style={{ border: '1px solid rgba(0,0,0,0.07)' }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dot indicators */}
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage([i, i > page ? 1 : -1])}
              className="transition-all duration-300 rounded-full"
              style={{
                width:  i === page ? 28 : 8,
                height: 8,
                background: i === page ? 'var(--color-gold)' : 'rgba(0,0,0,0.15)',
              }}
            />
          ))}

          {/* Mobile next */}
          <button
            type="button"
            onClick={() => paginate(1)}
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white shadow text-gray-600"
            style={{ border: '1px solid rgba(0,0,0,0.07)' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress bar (auto-play indicator) */}
        {!paused && !reduce && (
          <div className="mx-auto mt-4 max-w-xs h-[2px] rounded-full overflow-hidden bg-gray-200">
            <motion.div
              key={page}
              className="h-full rounded-full"
              style={{ background: 'var(--color-gold)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
            />
          </div>
        )}

        {/* ── Stats bar ── */}
        <motion.div
          className="mt-14 rounded-2xl px-6 py-10 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-brand-navy) 0%, #0d1b30 100%)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          }}
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-extrabold mb-1"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}>
                <Counter value={s.value} suffix={s.suffix} reduce={reduce} />
              </p>
              <p className="text-xs sm:text-sm font-medium text-white/70 tracking-wide uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
