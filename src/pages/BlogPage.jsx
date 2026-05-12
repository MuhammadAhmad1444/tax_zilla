import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Clock, ArrowRight, BookOpen, Tag,
  TrendingUp, Star, ChevronRight, Rss,
} from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedPosts } from '../data/blogPosts.js';
import { usePageMotion, EASE_OUT, getStaggerContainer, getStaggerItem } from '../lib/motion.js';
import { SITE } from '../data/site.js';

const CATEGORY_COLOURS = {
  'income-tax':   { bg: 'bg-blue-50 text-blue-700 border-blue-200',    dot: '#3b82f6' },
  'business':     { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: '#8b5cf6' },
  'freelancer':   { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: '#10b981' },
  'overseas':     { bg: 'bg-orange-50 text-orange-700 border-orange-200', dot: '#f97316' },
  'sales-tax':    { bg: 'bg-rose-50 text-rose-700 border-rose-200',    dot: '#f43f5e' },
  'property':     { bg: 'bg-amber-50 text-amber-700 border-amber-200',  dot: '#f59e0b' },
  'international':{ bg: 'bg-cyan-50 text-cyan-700 border-cyan-200',    dot: '#06b6d4' },
};

const getCatStyle = (cat) => CATEGORY_COLOURS[cat] || { bg: 'bg-gray-100 text-gray-600 border-gray-200', dot: '#6b7280' };
const getCatLabel = (cat) => BLOG_CATEGORIES.find(c => c.id === cat)?.label || cat;

/* ── Shared grid overlay ───────────────────────────────────── */
const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

/* ── Featured hero card ────────────────────────────────────── */
const FeaturedCard = ({ post }) => {
  const cat = getCatStyle(post.category);
  return (
    <Link to={`/blog/${post.slug}`} className="group relative overflow-hidden rounded-3xl flex flex-col justify-end" style={{ minHeight: 480 }}>
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'var(--color-gold)' }} />
      <div className="relative z-10 p-7 sm:p-9">
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.bg}`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.dot }} />
            {getCatLabel(post.category)}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/60">
            <Clock size={11} /> {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-gold)] bg-[var(--color-gold)]/15 px-2 py-0.5 rounded-full border border-[var(--color-gold)]/30">
            <Star size={9} fill="currentColor" /> Featured
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug mb-3 group-hover:text-[var(--color-gold)] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}>
          {post.title}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-5 max-w-2xl line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: 'var(--color-gold)' }}>
              TZ
            </div>
            <div>
              <div className="text-xs font-semibold text-white">{post.author}</div>
              <div className="text-[10px] text-gray-400">{post.date}</div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[var(--color-gold)] text-sm font-bold group-hover:gap-2.5 transition-all">
            Read Article <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

/* ── Standard blog card ────────────────────────────────────── */
const BlogCard = ({ post, index, reduce }) => {
  const cat = getCatStyle(post.category);
  return (
    <motion.div variants={getStaggerItem(reduce)} className="group">
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-[var(--color-gold)]/50 hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Category badge */}
          <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.bg}`}>
            <span className="w-1 h-1 rounded-full" style={{ background: cat.dot }} />
            {getCatLabel(post.category)}
          </span>
          {/* Gold bar on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
            style={{ background: 'var(--color-gold)' }} />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-base font-bold leading-snug mb-2.5 text-gray-900 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2"
            style={{ fontFamily: 'var(--font-heading)' }}>
            {post.title}
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                <Tag size={8} /> {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold text-black" style={{ background: 'var(--color-gold)' }}>
                TZ
              </div>
              <span className="text-[11px] text-gray-400">{post.date}</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--color-gold)]">
              <Clock size={10} /> {post.readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const BlogPage = () => {
  const { reduce, hero } = usePageMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = getFeaturedPosts().slice(0, 2);

  const q = searchQuery.trim().toLowerCase();
  const filtered = useMemo(() =>
    BLOG_POSTS.filter(p => {
      const passCategory = activeCategory === 'all' || p.category === activeCategory;
      const passSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      return passCategory && passSearch;
    }),
    [activeCategory, q]
  );

  const trendingPosts = BLOG_POSTS.slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Tax Blog — Pakistan Tax Guides, FBR Updates & Compliance Tips | Tax Zilla</title>
        <meta name="description" content="Expert articles on Pakistan income tax, FBR filing, company registration, freelancer taxes, overseas Pakistani obligations, and international tax. Updated for 2025–26." />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-2 pb-16 pt-28 dark-section sm:pt-32"
        style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.15),_transparent_55%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 text-center" {...hero}>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/35 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-5"
          >
            <Rss size={11} /> Tax Knowledge Centre
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.52, ease: EASE_OUT }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Pakistan Tax <span className="text-[var(--color-gold)]">Knowledge</span> Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.48, ease: EASE_OUT }}
            className="max-w-2xl mx-auto text-gray-300 text-base sm:text-lg leading-relaxed mb-8"
          >
            Expert guides, FBR updates, and practical tax advice for individuals, businesses, freelancers, and overseas Pakistanis — updated regularly by our tax consultants.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.44, ease: EASE_OUT }}
            className="max-w-lg mx-auto"
          >
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm focus-within:border-[var(--color-gold)]/60 focus-within:bg-white/12 transition-all">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles — tax slabs, freelancer, NTN, property..."
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500 min-w-0"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white text-xs font-bold flex-shrink-0">✕</button>
              )}
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.44, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap justify-center gap-6"
          >
            {[
              { v: `${BLOG_POSTS.length}+`, l: 'Articles' },
              { v: BLOG_CATEGORIES.length - 1, l: 'Categories' },
              { v: 'FY 2025–26', l: 'Latest Rates' },
              { v: 'Weekly', l: 'New Content' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-lg font-bold text-[var(--color-gold)]">{s.v}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Posts ──────────────────────────────── */}
      {!q && activeCategory === 'all' && (
        <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
          <div className="container-custom">
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-[var(--color-gold)]" fill="currentColor" />
                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Featured Articles</h2>
              </div>
              <span className="text-xs text-gray-400 font-medium">Editor's picks</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {featured.map(post => <FeaturedCard key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Main Content + Sidebar ───────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── Left: Articles ── */}
            <div className="flex-1 min-w-0">
              {/* Category pills + search result info */}
              <div className="mb-7">
                <div className="flex flex-wrap gap-2 mb-5">
                  {BLOG_CATEGORIES.map(cat => (
                    <button key={cat.id} type="button"
                      onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                      className={`rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                        activeCategory === cat.id
                          ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-md'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-gold)]/50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {q
                      ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`
                      : `Showing ${filtered.length} article${filtered.length !== 1 ? 's' : ''}`}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <TrendingUp size={11} /> Updated weekly
                  </div>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen size={40} className="mx-auto mb-4 text-gray-200" />
                  <p className="text-gray-400 font-medium">No articles found</p>
                  <p className="text-sm text-gray-300 mt-1">Try a different keyword or category</p>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                    className="mt-4 text-sm font-bold text-[var(--color-gold)] hover:underline">
                    View all articles →
                  </button>
                </div>
              ) : (
                <motion.div
                  key={activeCategory + q}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  variants={getStaggerContainer(reduce, 0.07)}
                  initial="hidden"
                  animate="visible"
                >
                  {filtered.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} reduce={reduce} />
                  ))}
                </motion.div>
              )}
            </div>

            {/* ── Right: Sidebar ── */}
            <aside className="lg:w-72 xl:w-80 flex-shrink-0 space-y-6">

              {/* Trending */}
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2"
                  style={{ background: 'var(--color-brand-navy)' }}>
                  <TrendingUp size={14} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Trending Now</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {trendingPosts.map((post, i) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}
                      className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors group">
                      <span className="text-2xl font-black text-gray-100 flex-shrink-0 leading-none mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-gray-800 leading-snug group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                          <Clock size={9} /> {post.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2"
                  style={{ background: 'var(--color-brand-navy)' }}>
                  <BookOpen size={14} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Categories</span>
                </div>
                <div className="p-3 flex flex-col gap-1">
                  {BLOG_CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                    const count = BLOG_POSTS.filter(p => p.category === cat.id).length;
                    const style = getCatStyle(cat.id);
                    return (
                      <button key={cat.id} type="button"
                        onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: style.dot }} />
                          <span className="text-[12px] font-medium text-gray-700 group-hover:text-[var(--color-brand-navy)]">{cat.label}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.bg}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free Consultation CTA */}
              <div className="rounded-2xl overflow-hidden relative"
                style={{ background: 'var(--color-brand-navy)' }}>
                <Grid />
                <div className="relative z-10 p-6 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={22} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Need Expert Help?
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Our tax consultants are available for a free consultation on any tax matter.
                  </p>
                  <Link to="/contact"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[var(--color-gold)] text-black text-xs font-bold hover:bg-[var(--color-gold-dark)] transition-colors">
                    Book Free Consultation <ArrowRight size={12} />
                  </Link>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-white/15 text-white/80 text-xs font-semibold hover:border-[var(--color-gold)]/40 hover:text-[var(--color-gold)] transition-colors">
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Tags cloud */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2"
                  style={{ background: 'var(--color-brand-navy)' }}>
                  <Tag size={14} style={{ color: 'var(--color-gold)' }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Popular Tags</span>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {[...new Set(BLOG_POSTS.flatMap(p => p.tags))].slice(0, 18).map(tag => (
                    <button key={tag} type="button"
                      onClick={() => { setSearchQuery(tag); setActiveCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ──────────────────────────────── */}
      <section className="relative overflow-hidden py-16 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <Grid />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-gold)] mb-5">
              <Rss size={10} /> Stay Updated
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Get Tax Updates <span className="text-[var(--color-gold)]">Before Anyone Else</span>
            </h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              FBR circulars, tax slab changes, and compliance deadlines — delivered straight to your WhatsApp or email. No spam, only actionable tax intelligence.
            </p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--color-gold)] text-black font-bold text-sm hover:bg-[var(--color-gold-dark)] transition-all shadow-lg shadow-[rgba(212,175,55,0.3)]"
            >
              Join Tax Updates on WhatsApp <ArrowRight size={16} />
            </a>
            <p className="mt-4 text-[11px] text-gray-500">
              Join {SITE.phoneTel && '997+'} taxpayers already receiving our updates · Free · Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
