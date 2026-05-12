import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock, ArrowLeft, ArrowRight, Tag, Share2,
  MessageCircle, BookOpen, ChevronRight, CheckCircle, AlertCircle,
} from 'lucide-react';
import { getPostBySlug, getRelatedPosts, BLOG_CATEGORIES } from '../data/blogPosts.js';
import { usePageMotion, EASE_OUT } from '../lib/motion.js';
import { SITE } from '../data/site.js';

const getCatLabel = (cat) => BLOG_CATEGORIES.find(c => c.id === cat)?.label || cat;

const CATEGORY_COLOURS = {
  'income-tax':    '#3b82f6',
  'business':      '#8b5cf6',
  'freelancer':    '#10b981',
  'overseas':      '#f97316',
  'sales-tax':     '#f43f5e',
  'property':      '#f59e0b',
  'international': '#06b6d4',
};

const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

/* ── Render structured content blocks ──────────────── */
const renderContent = (content) => {
  if (!content) return null;
  return content.map((block, i) => {
    switch (block.type) {
      case 'intro':
        return <p key={i} className="text-lg text-gray-600 leading-relaxed border-l-4 pl-5 mb-8" style={{ borderColor: 'var(--color-gold)' }}>{block.text}</p>;
      case 'p':
        return <p key={i} className="text-[15px] text-gray-600 leading-relaxed mb-5">{block.text}</p>;
      case 'h2':
        return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{block.text}</h2>;
      case 'h3':
        return <h3 key={i} className="text-lg font-bold text-gray-900 mt-7 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{block.text}</h3>;
      case 'ul':
        return (
          <ul key={i} className="space-y-2.5 mb-6">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2.5 text-[15px] text-gray-600">
                <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={i} className="space-y-3 mb-6">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-[15px] text-gray-600">
                <span className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-black" style={{ background: 'var(--color-gold)' }}>{j + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      case 'table':
        return (
          <div key={i} className="overflow-x-auto mb-8 rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--color-brand-navy)' }}>
                  {block.headers.map((h, j) => (
                    <th key={j} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--color-gold)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {block.rows.map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'callout':
        return (
          <div key={i} className="rounded-xl border p-5 mb-7 flex items-start gap-3"
            style={{ background: 'rgba(212,175,55,0.06)', borderColor: 'rgba(212,175,55,0.3)' }}>
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
            <p className="text-sm text-gray-700 leading-relaxed">{block.text}</p>
          </div>
        );
      case 'divider':
        return <hr key={i} className="my-8 border-gray-100" />;
      default:
        return null;
    }
  });
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { hero } = usePageMotion();

  const post = getPostBySlug(slug);
  const related = post ? getRelatedPosts(post) : [];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-32 text-center">
        <BookOpen size={48} className="mb-4 text-gray-200" />
        <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
        <p className="text-gray-400 mb-6">This article does not exist or may have been moved.</p>
        <Link to="/blog" className="flex items-center gap-2 text-sm font-bold text-[var(--color-gold)] hover:underline">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    );
  }

  const catColor = CATEGORY_COLOURS[post.category] || '#D4AF37';
  const shareUrl = `https://thetaxzilla.com/blog/${post.slug}`;

  return (
    <>
      <Helmet>
        <title>{post.title} | Tax Zilla Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={shareUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-28 pb-0 dark-section" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(212,175,55,0.12),_transparent_60%)]" />
        <Grid />
        <motion.div className="container-custom relative z-10 max-w-4xl" {...hero}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
            <Link to="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-[var(--color-gold)] transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-gray-300 font-medium line-clamp-1 max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{ background: `${catColor}18`, color: catColor, borderColor: `${catColor}40` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }} />
              {getCatLabel(post.category)}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} />{post.readTime}</span>
            <span className="text-xs text-gray-400">{post.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}>
            {post.title}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author + share */}
          <div className="flex items-center justify-between pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'var(--color-gold)' }}>TZ</div>
              <div>
                <div className="text-sm font-semibold text-white">{post.author}</div>
                <div className="text-[11px] text-gray-400">Tax Zilla Consultancy · {post.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-[var(--color-gold)] transition-colors border border-white/10 rounded-full px-3 py-1.5 hover:border-[var(--color-gold)]/40">
                <Share2 size={11} /> Share
              </a>
              <Link to="/blog"
                className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-[var(--color-gold)] transition-colors border border-white/10 rounded-full px-3 py-1.5 hover:border-[var(--color-gold)]/40">
                <ArrowLeft size={11} /> All Articles
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Article Image ── */}
      <div className="w-full" style={{ maxHeight: 440, overflow: 'hidden' }}>
        <img src={post.image} alt={post.title} className="w-full object-cover" style={{ maxHeight: 440 }} />
      </div>

      {/* ── Content + Sidebar ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Article content */}
            <article className="flex-1 min-w-0">
              <div className="prose-custom">
                {renderContent(post.contentBlocks)}
              </div>

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tags:</span>
                  {post.tags.map(tag => (
                    <Link key={tag} to={`/blog?tag=${tag}`}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all">
                      <Tag size={9} /> {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author box */}
              <div className="mt-8 rounded-2xl border border-gray-200 p-6 flex items-start gap-5" style={{ background: 'var(--color-surface-muted)' }}>
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black text-black flex-shrink-0" style={{ background: 'var(--color-gold)' }}>TZ</div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Tax Zilla Consultancy</div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Our team of qualified tax consultants writes all articles based on official FBR circulars, SECP regulations, and practical client experience. All content is reviewed for accuracy and updated regularly.
                  </p>
                  <Link to="/contact" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-gold)] hover:underline">
                    Book a consultation <ArrowRight size={11} />
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-2xl overflow-hidden relative" style={{ background: 'var(--color-brand-navy)' }}>
                <Grid />
                <div className="relative z-10 p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      Need help with this?
                    </h3>
                    <p className="text-sm text-gray-400">Our consultants are available for a free consultation on any topic in this article.</p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Link to="/contact" className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--color-gold)] text-black text-sm font-bold hover:bg-[var(--color-gold-dark)] transition-colors whitespace-nowrap">
                      Free Consultation
                    </Link>
                    <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:border-[var(--color-gold)]/50 transition-colors whitespace-nowrap">
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-64 xl:w-72 flex-shrink-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Table of contents */}
              {post.toc && post.toc.length > 0 && (
                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: 'var(--color-brand-navy)' }}>
                    <BookOpen size={13} style={{ color: 'var(--color-gold)' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">In This Article</span>
                  </div>
                  <ul className="p-4 space-y-1">
                    {post.toc.map((item, i) => (
                      <li key={i}>
                        <a href={`#section-${i}`} className="flex items-center gap-2 text-[12px] text-gray-600 hover:text-[var(--color-gold)] py-1.5 transition-colors group">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[var(--color-gold)] flex-shrink-0 transition-colors" />
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key takeaways */}
              {post.keyTakeaways && (
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.04)' }}>
                  <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                    <CheckCircle size={13} style={{ color: 'var(--color-gold)' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--color-gold)' }}>Key Takeaways</span>
                  </div>
                  <ul className="p-4 space-y-2.5">
                    {post.keyTakeaways.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] text-gray-700">
                        <CheckCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-gold)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related articles */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: 'var(--color-brand-navy)' }}>
                    <BookOpen size={13} style={{ color: 'var(--color-gold)' }} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Related Articles</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {related.map(rp => (
                      <Link key={rp.id} to={`/blog/${rp.slug}`} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors group">
                        <img src={rp.image} alt={rp.title} className="h-12 w-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-gray-800 leading-snug group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">{rp.title}</p>
                          <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><Clock size={9} /> {rp.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Free consult */}
              <div className="rounded-2xl overflow-hidden relative" style={{ background: 'var(--color-brand-navy)' }}>
                <Grid />
                <div className="relative z-10 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] mb-3">Free Consultation</p>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">Have questions about this topic? Our consultants are ready to help.</p>
                  <Link to="/contact" className="block w-full py-2.5 rounded-xl bg-[var(--color-gold)] text-black text-xs font-bold hover:bg-[var(--color-gold-dark)] transition-colors text-center">
                    Talk to a Consultant
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;
