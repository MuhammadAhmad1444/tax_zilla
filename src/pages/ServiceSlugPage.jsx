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
  'usa-tax-services': Landmark,
};

const CATEGORY_HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Compliance-first',
    desc: 'Aligned with FBR/SECP rules and documentation best practices.',
  },
  {
    icon: Clock,
    title: 'Clear timelines',
    desc: 'Defined milestones and updates to keep you on track.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated consultant',
    desc: 'One point of contact for documents, updates, and follow-ups.',
  },
];

const SUBSERVICE_HIGHLIGHTS = [
  {
    icon: FileText,
    title: 'Document checklist',
    desc: 'We confirm exactly what is required before starting.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliant filing',
    desc: 'Prepared according to current regulations and requirements.',
  },
  {
    icon: PhoneCall,
    title: 'Ongoing support',
    desc: 'Status updates and follow-ups until completion.',
  },
];

const CategoryPage = ({ category }) => {
  const navigate = useNavigate();
  const { hero } = usePageMotion();
  const subservices = getSubservicesByCategory(category.id);
  const consultPoints = [
    'Dedicated consultant and single point of contact',
    'Clear checklist before we begin',
    'Timely updates and follow-ups',
  ];

  return (
    <>
      <Helmet>
        <title>{`${category.title} | Tax Zilla Consultancy`}</title>
        <meta name="description" content={category.shortDesc} />
        <link rel="canonical" href={buildCanonical(`/services/${category.slug}`)} />
      </Helmet>

      <section className="relative overflow-hidden bg-brand-dark px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <motion.div className="container-custom relative z-10" {...hero}>
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: category.title },
            ]}
          />
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
              {category.heroEyebrow}
            </div>
            <h1 className="mt-6 px-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
              {category.title}
            </h1>
            <p className="mt-4 px-2 text-base text-gray-200 sm:text-lg md:text-xl">
              {category.heroSubhead}
            </p>
          </div>
        </motion.div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title={`Why ${category.title}?`}
            subtitle={category.shortDesc}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORY_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="card-surface p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title={`Services in ${category.title}`}
            subtitle="Choose a service below to view details, requirements, and timelines."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subservices.map((service) => (
              <div key={service.slug} className="group card-surface p-6 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors">
                    <FileText size={26} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Service</div>
                </div>
                <h3 className="text-xl font-bold mt-6 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{service.shortDesc}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/services/${service.slug}`)}
                  className="mt-auto"
                >
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              title="Talk to a Specialist"
              subtitle="Share your requirements and we will confirm the best service plan with pricing and timelines."
              centered={false}
            />
            <ul className="space-y-3 mb-6 text-gray-700">
              {consultPoints.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-[var(--color-gold)] mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Chat on WhatsApp</h3>
              <p className="text-gray-600 mb-4">Instant guidance for quick questions and document checks.</p>
              <Button
                variant="primary"
                onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
                className="w-full justify-center"
              >
                <MessageCircle size={18} className="mr-2" /> WhatsApp Now
              </Button>
            </div>
          </div>
          <ContactForm defaultService={category.title} />
        </div>
      </section>

      <FAQSection title="Frequently Asked Questions" subtitle="Answers to common questions" faqs={category.faqs} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title="Explore Other Categories" subtitle="Continue browsing related services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_CATEGORIES.filter((item) => item.id !== category.id).map((item) => {
              const Icon = CATEGORY_ICON_MAP[item.slug] || FileText;

              return (
                <Link
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  className="group card-surface p-5 flex flex-col hover:border-[var(--color-gold)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Category</span>
                  </div>
                  <div className="mt-5 text-lg font-bold">{item.title}</div>
                  <p className="text-sm text-gray-600 mt-2 mb-4">{item.shortDesc}</p>
                  <span className="mt-auto inline-flex items-center text-sm font-semibold text-[var(--color-gold)]">
                    Explore <ArrowRight size={16} className="ml-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const SubservicePage = ({ service }) => {
  const navigate = useNavigate();
  const { hero } = usePageMotion();
  const category = SERVICE_CATEGORIES.find((item) => item.id === service.categoryId);
  const related = getSubservicesByCategory(service.categoryId).filter((item) => item.slug !== service.slug).slice(0, 3);
  const typicalDocs = [
    'CNIC/NICOP copy',
    'Business or employment details (if applicable)',
    'Bank or transaction summary',
    'Previous filings (if any)',
  ];
  const nextSteps = [
    'Share your requirements',
    'Receive the checklist',
    'We prepare and submit',
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
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
    areaServed: {
      '@type': 'Place',
      name: category?.areaServed || 'Pakistan',
    },
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

      <section className="relative overflow-hidden bg-brand-dark px-2 pb-16 pt-28 text-white dark-section sm:pb-20 sm:pt-32">
        <div className="absolute inset-0 bg-brand-overlay opacity-80" />
        <motion.div className="container-custom relative z-10" {...hero}>
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: category?.title || 'Services', href: category ? `/services/${category.slug}` : '/services' },
              { label: service.title },
            ]}
          />
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="px-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
              {service.title}
            </h1>
            <p className="mt-4 px-2 text-base text-gray-200 sm:text-lg md:text-xl">
              {service.shortDesc}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-medium text-[var(--color-gold)]">
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> Compliance-first</span>
              <span className="flex items-center gap-1"><Clock size={16} /> Clear timelines</span>
              <span className="flex items-center gap-1"><UserCheck size={16} /> Dedicated consultant</span>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="primary" size="lg" onClick={() => navigate('/contact', { state: { service: service.title } })}>
                Request Consultation
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Service Highlights"
            subtitle="Everything you need to move forward with confidence."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBSERVICE_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="card-surface p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <SectionHeading
              title="Service Overview"
              subtitle={service.shortDesc}
              centered={false}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">What We Deliver</h3>
                <ul className="space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle size={18} className="text-[var(--color-gold)] mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold mb-3">Typical Documents</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {typicalDocs.map((doc) => (
                    <li key={doc} className="flex items-start gap-2">
                      <span className="text-[var(--color-gold)]">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Process</h3>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-gold)] text-sm font-bold text-black">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-[var(--color-gold)] bg-[var(--color-gold)]/10 p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Need a clear checklist?</h3>
              <p className="text-gray-600 mb-4">
                Share your details and we will confirm exact requirements for this service.
              </p>
              <Button variant="primary" onClick={() => navigate('/contact', { state: { service: service.title } })}>
                Get Checklist
              </Button>
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-6 h-fit sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold mb-3">Ready to get started?</h3>
            <p className="text-gray-600 mb-5">
              Share your details and we will confirm the exact scope and timeline.
            </p>
            <ul className="space-y-3 mb-6 text-sm text-gray-600">
              {nextSteps.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-[var(--color-gold)] mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="primary"
              className="w-full mb-4"
              onClick={() => navigate('/contact', { state: { service: service.title } })}
            >
              Book a Consultation
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
            >
              WhatsApp Support
            </Button>
          </aside>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              title="Talk to a Consultant"
              subtitle="Get expert advice and a clear plan for your next steps."
              centered={false}
            />
            <div className="rounded-2xl bg-brand-dark text-white p-6 relative overflow-hidden dark-section">
              <div className="absolute inset-0 bg-brand-overlay opacity-70" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">WhatsApp Priority Support</h3>
                <p className="text-on-dark-muted mb-4">
                  Send a quick message for urgent questions or document checks.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open(SITE.whatsapp, '_blank', 'noopener,noreferrer')}
                  className="w-full justify-center"
                >
                  <MessageCircle size={18} className="mr-2" /> Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
          <ContactForm defaultService={service.title} />
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            title="Related Services"
            subtitle="Explore other options in the same category."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <div key={item.slug} className="group card-surface p-6 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors">
                    <FileText size={22} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Service</span>
                </div>
                <h3 className="text-lg font-bold mt-5 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-6">{item.shortDesc}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/services/${item.slug}`)}
                  className="mt-auto"
                >
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="FAQs" subtitle="Common questions about this service" faqs={service.faqs} />
    </>
  );
};

const ServiceNotFound = () => (
  <section className="section-padding bg-white">
    <div className="container-custom text-center">
      <h1 className="text-3xl font-bold mb-4">Service not found</h1>
      <p className="text-gray-600 mb-6">The service you are looking for is not available.</p>
      <Link
        to="/services"
        className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--color-gold)] px-6 py-3 text-base font-semibold text-black shadow-lg transition-all duration-300 hover:bg-[var(--color-gold-light)]"
      >
        Back to Services
      </Link>
    </div>
  </section>
);

const ServiceSlugPage = () => {
  const { slug } = useParams();

  const category = getCategoryBySlug(slug);
  if (category) {
    return <CategoryPage category={category} />;
  }

  const service = getSubserviceBySlug(slug);
  if (service) {
    return <SubservicePage service={service} />;
  }

  return <ServiceNotFound />;
};

export default ServiceSlugPage;
