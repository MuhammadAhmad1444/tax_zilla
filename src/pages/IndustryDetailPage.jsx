import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import {
  ArrowRight, MessageCircle, Phone, CheckCircle, AlertCircle,
  ChevronRight, ShieldCheck, Clock, UserCheck,
} from 'lucide-react';
import Button from '../components/Button.jsx';
import ContactForm from '../components/ContactForm.jsx';
import FAQSection from '../components/FAQSection.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { SITE } from '../data/site.js';
import { getIndustryBySlug, industries } from '../data/industries.js';
import { usePageMotion, EASE_OUT, revealUp, revealLeft, revealRight, revealScale } from '../lib/motion.js';

const Grid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
    }}
  />
);

const IndustryDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();
  const reduceMotion = useReducedMotion();

  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center py-20">
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Industry Not Found</h1>
          <p className="text-[var(--color-text-muted)] mb-8">We couldn't find that industry page. Browse all industries below.</p>
          <Link to="/industries">
            <Button variant="primary">Browse All Industries</Button>
          </Link>
        </div>
      </section>
    );
  }

  const related = industries.filter(i => i.id !== industry.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{industry.title} Tax & Compliance Services — Tax Zilla Consultancy</title>
        <meta name="description" content={`Expert tax, legal, and compliance services for ${industry.title} in Pakistan. ${industry.shortDesc}`} />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32"
        style={{ background: 'var(--color-brand-navy)' }}>
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <Grid />
        <motion.div className="container-custom relative z-10" {...hero}>
          <Breadcrumbs items={[
            { label: 'Industries', href: '/industries' },
            { label: industry.title },
          ]} />
          <div className="text-center max-w-4xl mx-auto mt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6">
              Sector Expertise
            </div>
            <h1 className="px-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}>
              {industry.title} <span className="text-[var(--color-gold)]">Tax & Compliance</span>
            </h1>
            <p className="mt-4 px-2 text-base text-gray-300 sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {industry.desc}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="primary" size="lg" onClick={() => navigate('/contact', { state: { service: `${industry.title} Services` } })}>
                Get Free Consultation
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}>
                <MessageCircle size={18} className="mr-2" /> WhatsApp Us
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Trust Badges ────────────────────────────── */}
      <div className="border-b border-white/10" style={{ background: 'var(--color-brand-navy)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { icon: ShieldCheck, label: 'Compliance-First' },
              { icon: UserCheck, label: 'Sector Expert' },
              { icon: Clock, label: 'Timely Delivery' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="py-5 text-center flex items-center justify-center gap-2">
                <Icon size={16} className="text-[var(--color-gold)]" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Overview: Challenges + Solutions ─────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Industry Challenges &{' '}
              <span className="text-[var(--color-gold)]">How We Solve Them</span>
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-sm">
              We understand the unique tax and compliance hurdles facing {industry.title} businesses — and we have proven solutions for each.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Challenges */}
            <motion.div {...revealLeft(0, reduceMotion)} className="card-surface p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-5">
                <AlertCircle size={20} className="text-orange-400" /> Common Challenges
              </h3>
              <ul className="space-y-3">
                {industry.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-orange-300 mt-2 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div {...revealRight(0, reduceMotion)} className="card-surface p-6 sm:p-8 border-[var(--color-gold)]/20">
              <h3 className="flex items-center gap-2 text-lg font-bold mb-5">
                <CheckCircle size={20} className="text-[var(--color-gold)]" /> Our Solutions
              </h3>
              <ul className="space-y-3">
                {industry.solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Key Services ────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              Services for <span className="text-[var(--color-gold)]">{industry.title}</span>
            </h2>
            <p className="mt-3 text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              Tailored compliance services built around the specific needs of your sector.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industry.services.map((svc, i) => (
              <motion.div key={svc.title} {...revealScale(i * 0.08, reduceMotion)}
                className="group card-surface p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />
                <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all mb-4">
                  <CheckCircle size={18} />
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-[var(--color-gold)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  {svc.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Relevant service links */}
          {industry.relevantServices && (
            <motion.div {...revealUp(0.15, reduceMotion)} className="mt-8 p-5 rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] mb-3">Quick Access — Service Pages</p>
              <div className="flex flex-wrap gap-2">
                {industry.relevantServices.map(({ title, path }) => (
                  <Link key={title} to={path}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/30 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all">
                    {title} <ArrowRight size={11} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Tax Treatments ──────────────────────────── */}
      {industry.taxTreatments && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <motion.div {...revealUp(0, reduceMotion)} className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Key Tax <span className="text-[var(--color-gold)]">Rules & Treatments</span>
                </h2>
                <p className="text-[var(--color-text-muted)] text-sm">
                  FBR-confirmed tax rules that apply specifically to {industry.title} businesses in Pakistan.
                </p>
              </motion.div>

              <div className="space-y-3">
                {industry.taxTreatments.map((rule, i) => (
                  <motion.div key={rule} {...revealUp(i * 0.06, reduceMotion)}
                    className="flex items-start gap-4 rounded-xl border border-gray-100 p-4"
                    style={{ background: 'var(--color-surface-muted)' }}>
                    <div className="h-7 w-7 rounded-full bg-[var(--color-brand-navy)] text-[var(--color-gold)] flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-[var(--color-text)] leading-relaxed">{rule}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Contact Form ────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div {...revealLeft(0, reduceMotion)}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Get a Free{' '}
              <span className="text-[var(--color-gold)]">{industry.title} Consultation</span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
              Share your requirements and our {industry.title} specialist will confirm the right services, timeline, and fees — no commitment required.
            </p>

            <div className="space-y-3">
              <a href={`tel:${SITE.phoneTel}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-[var(--color-gold)] transition-all group">
                <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Call Us</div>
                  <div className="font-bold text-gray-800">{SITE.phone}</div>
                </div>
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 hover:bg-[var(--color-gold)]/10 transition-all group">
                <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)] text-black flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">WhatsApp</div>
                  <div className="font-bold text-gray-800">Chat for Instant Response</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div {...revealRight(0.1, reduceMotion)}>
            <ContactForm defaultService={`${industry.title} Services`} />
          </motion.div>
        </div>
      </section>

      {/* ── FAQs ────────────────────────────────────── */}
      {industry.faqs && (
        <FAQSection
          title={`${industry.title} — Frequently Asked Questions`}
          subtitle={`Common questions from ${industry.title} clients`}
          faqs={industry.faqs}
        />
      )}

      {/* ── Other Industries ────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...revealUp(0, reduceMotion)} className="text-center mb-10">
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
              Explore Other <span className="text-[var(--color-gold)]">Industries</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((ind, i) => (
              <motion.div key={ind.id} {...revealScale(i * 0.08, reduceMotion)}
                className="group card-surface p-5 cursor-pointer"
                onClick={() => navigate(`/industries/${ind.slug}`)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all">
                    <ind.icon size={20} />
                  </div>
                  <h3 className="font-bold text-sm group-hover:text-[var(--color-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {ind.title}
                  </h3>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">{ind.shortDesc}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-gold)]">
                  Explore <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="secondary" onClick={() => navigate('/industries')}>
              View All Industries <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustryDetailPage;
