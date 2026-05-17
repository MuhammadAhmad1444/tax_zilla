import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Clock,
  UserCheck,
  PhoneCall,
  FileText,
  MapPin,
  Building2,
  Shield,
  Settings,
  Wrench,
  Scale,
  Globe,
  Users,
  CheckCircle,
  User,
  Search,
  TrendingUp,
  FileCheck,
  Landmark,
  Phone,
  Mail,
  Award,
  BadgeCheck,
  ChevronRight,
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import ContactForm from '../components/ContactForm.jsx';
import FAQSection from '../components/FAQSection.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { SITE } from '../data/site.js';
import {
  SERVICE_CATEGORIES,
  getCategoryBySlug,
  getSubserviceBySlug,
  getSubservicesByCategory,
} from '../data/serviceCatalog.js';
import { usePageMotion } from '../lib/motion.js';

const buildCanonical = (path) => `${SITE.domain}${path}`;

const CATEGORY_ICON_MAP = {
  'tax-services-pakistan': FileText,
  'provincial-sales-tax': MapPin,
  'corporate-business-services': Building2,
  'intellectual-property': Shield,
  'software-it-services': Settings,
  'engineering-services': Wrench,
  'legal-services': Scale,
  'visa-immigration-tax-services': Globe,
  'overseas-pakistani-tax-services': Users,
  'certificates-compliance': CheckCircle,
  'individual-tax-services': User,
  'audit-investigation': Search,
  'business-tax-planning': TrendingUp,
  'additional-registrations': FileCheck,
  'uae-tax-services': Globe,
  'high-demand-individual-services': User,
  'usa-tax-services': Landmark,
  'ksa-tax-services': Landmark,
};

const TRUST_STATS = [
  { value: '997+', label: 'Satisfied Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '70+', label: 'Services Offered' },
  { value: '24/7', label: 'WhatsApp Support' },
];

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Compliance-First',
    desc: 'Every filing aligns with FBR, SECP, ZATCA, and all relevant regulatory authorities.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    desc: 'Clear milestones, proactive status updates, and zero missed deadlines.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Consultant',
    desc: 'One expert handles your case from document collection through final confirmation.',
  },
  {
    icon: Award,
    title: 'Transparent Process',
    desc: 'Clear scope, document checklist, and fee breakdown before any work begins.',
  },
];

const PROCESS_ICONS = [PhoneCall, FileText, CheckCircle, BadgeCheck];

const HeroGrid = () => (
  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage:
        'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}
  />
);

const StatsBanner = () => (
  <div className="bg-[var(--color-brand-navy)] border-b border-white/10">
    <div className="container-custom">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="py-5 text-center">
            <div className="text-2xl font-bold text-[var(--color-gold)]">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-0.5 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactSidebar = ({ serviceName }) => {
  const navigate = useNavigate();
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden h-fit lg:sticky lg:top-24">
      <div className="p-5" style={{ background: 'var(--color-brand-navy)' }}>
        <h3 className="text-lg font-bold text-white mb-1">Free Consultation</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Talk to an expert today — no obligation required.
        </p>
      </div>
      <div className="p-5 space-y-3">
        <Button
          variant="primary"
          className="w-full justify-center"
          onClick={() => navigate('/contact', { state: { service: serviceName } })}
        >
          Book Consultation
        </Button>
        <Button
          variant="secondary"
          className="w-full justify-center"
          onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
        >
          <MessageCircle size={16} className="mr-2" /> WhatsApp Now
        </Button>

        <div className="border-t border-gray-100 pt-4 space-y-3">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="flex items-center gap-3 group"
          >
            <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all">
              <Phone size={16} />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Call / WhatsApp</div>
              <div className="text-sm font-bold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors">
                {SITE.phone}
              </div>
            </div>
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-3 group"
          >
            <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all">
              <Mail size={16} />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Email</div>
              <div className="text-sm font-bold text-gray-800 group-hover:text-[var(--color-gold)] transition-colors break-all">
                {SITE.email}
              </div>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Office</div>
              <div className="text-sm font-bold text-gray-800 leading-snug">
                {SITE.address.addressLocality}, {SITE.address.addressRegion}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
              <Clock size={16} />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Working Hours</div>
              <div className="text-sm font-bold text-gray-800">Mon – Sat, 9am – 7pm PKT</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const CategoryPage = ({ category }) => {
  const navigate = useNavigate();
  const { hero } = usePageMotion();
  const subservices = getSubservicesByCategory(category.id);

  return (
    <>
      <Helmet>
        <title>{`${category.title} | Tax Zilla Consultancy`}</title>
        <meta name="description" content={category.shortDesc} />
        <link rel="canonical" href={buildCanonical(`/services/${category.slug}`)} />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36">
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <HeroGrid />
        <motion.div className="container-custom relative z-10" {...hero}>
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: category.title },
            ]}
          />
          <div className="text-center max-w-4xl mx-auto mt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6">
              {category.heroEyebrow}
            </div>
            <h1
              className="text-3xl font-bold sm:text-5xl md:text-6xl leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {category.title}
            </h1>
            <p className="mt-5 text-base text-gray-300 sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {category.heroSubhead}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact', { state: { service: category.title } })}
              >
                Get Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle size={18} className="mr-2" /> WhatsApp Us
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Stats */}
      <StatsBanner />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title={/services/i.test(category.title) ? category.title : `${category.title} Services`}
            subtitle="Select any service below for detailed requirements, timelines, and expert guidance."
          />
          {subservices.length === 0 ? (
            <div className="text-center py-16 text-[var(--color-text-muted)]">
              <FileText size={40} className="mx-auto mb-4 text-gray-300" />
              <p>Services for this category are being updated. Please contact us directly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subservices.map((service, idx) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="group card-surface p-6 flex flex-col cursor-pointer"
                  onClick={() => navigate(`/services/${service.slug}`)}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                      <FileText size={22} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Service</span>
                  </div>
                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-5 leading-relaxed flex-grow">
                    {service.shortDesc}
                  </p>
                  <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={15} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Tax Zilla */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom">
          <SectionHeading
            title="Why Choose Tax Zilla"
            subtitle="Our approach is built around your compliance, confidence, and long-term peace of mind."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="card-surface p-6 text-center group hover:border-[var(--color-gold)]/40 transition-colors"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all duration-300">
                  <item.icon size={26} />
                </div>
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA Banner */}
      <section className="relative py-16 bg-brand-dark dark-section overflow-hidden">
        <div className="absolute inset-0 bg-brand-overlay opacity-70" />
        <HeroGrid />
        <div className="container-custom relative z-10 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Get Started with{' '}
            <span className="text-[var(--color-gold)]">{category.title}?</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Speak with a specialist today. We confirm requirements, timelines, and fees before any commitment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact', { state: { service: category.title } })}
            >
              Book Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
            >
              <MessageCircle size={18} className="mr-2" /> WhatsApp Now
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              title="Talk to a Specialist"
              subtitle={`Share your ${category.title} requirements and we will confirm a detailed plan with timelines and fees.`}
              centered={false}
            />
            <div className="space-y-3 mb-6">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call / WhatsApp</div>
                  <div className="text-lg font-bold text-gray-800">{SITE.phone}</div>
                </div>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</div>
                  <div className="text-lg font-bold text-gray-800">{SITE.email}</div>
                </div>
              </a>
            </div>
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
            >
              <MessageCircle size={18} className="mr-2" /> Start on WhatsApp
            </Button>
          </div>
          <ContactForm defaultService={category.title} />
        </div>
      </section>

      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about this service category"
        faqs={category.faqs}
      />

    </>
  );
};

const SubservicePage = ({ service }) => {
  const navigate = useNavigate();
  const { hero } = usePageMotion();
  const category = SERVICE_CATEGORIES.find((item) => item.id === service.categoryId);
  const related = getSubservicesByCategory(service.categoryId)
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const typicalDocs = service.typicalDocs || [
    'CNIC / NICOP copy (front & back)',
    'Business or employment details',
    'Bank statements (last 3–6 months)',
    'Previous filings or registration documents (if any)',
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.serviceType,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.domain,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.streetAddress,
        addressLocality: SITE.address.addressLocality,
        addressRegion: SITE.address.addressRegion,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.addressCountry,
      },
    },
    areaServed: { '@type': 'Place', name: category?.areaServed || 'Pakistan' },
    url: buildCanonical(`/services/${service.slug}`),
  };

  return (
    <>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={buildCanonical(`/services/${service.slug}`)} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-dark px-2 pb-20 pt-28 text-white dark-section sm:pb-24 sm:pt-36">
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <HeroGrid />
        <motion.div className="container-custom relative z-10" {...hero}>
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              {
                label: category?.title || 'Services',
                href: category ? `/services/${category.slug}` : '/services',
              },
              { label: service.title },
            ]}
          />
          <div className="text-center max-w-4xl mx-auto mt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)] mb-6">
              {category?.title || 'Professional Service'}
            </div>
            <h1
              className="text-3xl font-bold sm:text-5xl md:text-6xl leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {service.title}
            </h1>
            <p className="mt-5 text-base text-gray-300 sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {service.shortDesc}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                { icon: ShieldCheck, label: 'Compliance-First' },
                { icon: Clock, label: 'Timely Delivery' },
                { icon: UserCheck, label: 'Dedicated Expert' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-white/90 text-xs font-medium backdrop-blur-sm"
                >
                  <Icon size={13} className="text-[var(--color-gold)]" /> {label}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/contact', { state: { service: service.title } })}
              >
                Request Free Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle size={18} className="mr-2" /> Chat on WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">

            {/* Left: Main Content */}
            <div className="lg:col-span-2 space-y-10">

              {/* What's Included */}
              <div>
                <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                  What's Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-gray-100 p-4"
                      style={{ background: 'var(--color-surface-muted)' }}
                    >
                      <div className="h-6 w-6 rounded-full bg-[var(--color-gold)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={13} className="text-black" />
                      </div>
                      <span className="text-sm text-[var(--color-text)] font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Required */}
              <div className="rounded-2xl border border-[var(--color-gold)]/25 p-6" style={{ background: 'rgba(212,175,55,0.04)' }}>
                <h2
                  className="text-xl font-bold mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <FileText size={20} className="text-[var(--color-gold)]" />
                  Documents Required
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {typicalDocs.map((doc) => (
                    <div key={doc} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <ChevronRight size={16} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-400 border-t border-[var(--color-gold)]/15 pt-3">
                  Exact requirements vary per case. We share a tailored checklist after a brief assessment.
                </p>
              </div>

              {/* Process Timeline */}
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Our Process
                </h2>
                <div className="space-y-3">
                  {service.process.map((step, index) => {
                    const StepIcon = PROCESS_ICONS[index] || CheckCircle;
                    const isLast = index === service.process.length - 1;
                    return (
                      <div key={step} className="flex items-start gap-4">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div
                            className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm z-10"
                            style={{ background: 'var(--color-brand-navy)', color: 'var(--color-gold)' }}
                          >
                            {index + 1}
                          </div>
                          {!isLast && (
                            <div
                              className="w-px flex-1 mt-1"
                              style={{ height: '20px', background: 'rgba(212,175,55,0.3)' }}
                            />
                          )}
                        </div>
                        <div className="flex-1 rounded-xl border border-gray-100 bg-white p-4 shadow-sm mb-1">
                          <div className="flex items-center gap-2 mb-1">
                            <StepIcon size={14} className="text-[var(--color-gold)]" />
                            <span className="text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-wider">
                              Step {index + 1}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--color-text)] font-medium">{step}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Callout */}
              <div className="relative rounded-2xl overflow-hidden" style={{ background: 'var(--color-brand-navy)' }}>
                <div className="absolute inset-0 bg-brand-overlay opacity-60" />
                <HeroGrid />
                <div className="relative z-10 p-8 text-center">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Need a Personalised Checklist?
                  </h3>
                  <p className="text-gray-300 mb-5 text-sm leading-relaxed">
                    Share your details and we will confirm the exact requirements for{' '}
                    <strong className="text-[var(--color-gold)]">{service.title}</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="primary"
                      onClick={() => navigate('/contact', { state: { service: service.title } })}
                    >
                      Request Checklist
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
                    >
                      <MessageCircle size={16} className="mr-2" /> WhatsApp Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <ContactSidebar serviceName={service.title} />
          </div>
        </div>
      </section>

      {/* Full Enquiry Section */}
      <section className="section-padding" style={{ background: 'var(--color-surface-muted)' }}>
        <div className="container-custom grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              title="Send an Enquiry"
              subtitle={`Tell us about your ${service.title} requirements and we will respond with a full plan.`}
              centered={false}
            />
            <div className="space-y-3">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-[var(--color-gold)] transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Direct Phone</div>
                  <div className="font-bold text-gray-800">{SITE.phone}</div>
                </div>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-[var(--color-gold)] transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Email</div>
                  <div className="font-bold text-gray-800">{SITE.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200">
                <div className="h-12 w-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Office Address</div>
                  <div className="font-bold text-gray-800 text-sm leading-snug">
                    {SITE.address.streetAddress}, {SITE.address.addressLocality}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ContactForm defaultService={service.title} />
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeading
              title="Related Services"
              subtitle={`Other services from ${category?.title || 'this category'} you may also need.`}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <div
                  key={item.slug}
                  className="group card-surface p-6 flex flex-col cursor-pointer"
                  onClick={() => navigate(`/services/${item.slug}`)}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-all">
                      <FileText size={20} />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Related</span>
                  </div>
                  <h3
                    className="text-base font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4 flex-grow leading-relaxed">
                    {item.shortDesc}
                  </p>
                  <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection
        title="Frequently Asked Questions"
        subtitle={`Common questions about ${service.title}`}
        faqs={service.faqs}
      />
    </>
  );
};

const ServiceNotFound = () => (
  <section className="section-padding bg-white">
    <div className="container-custom text-center py-20">
      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
        <Search size={32} className="text-gray-400" />
      </div>
      <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
        Service Not Found
      </h1>
      <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
        The service you are looking for is not available. Browse all our services or contact us directly.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/services"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[var(--color-gold)] px-8 py-3 text-base font-semibold text-black shadow-lg transition-all hover:bg-[var(--color-gold-light)]"
        >
          Browse All Services
        </Link>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-[var(--color-gold)] px-8 py-3 text-base font-semibold text-[var(--color-gold)] transition-all hover:bg-[var(--color-gold)]/10"
        >
          <MessageCircle size={18} className="mr-2" /> WhatsApp Us
        </a>
      </div>
    </div>
  </section>
);

const ServiceSlugPage = () => {
  const { slug } = useParams();

  const category = getCategoryBySlug(slug);
  if (category) return <CategoryPage category={category} />;

  const service = getSubserviceBySlug(slug);
  if (service) return <SubservicePage service={service} />;

  return <ServiceNotFound />;
};

export default ServiceSlugPage;
