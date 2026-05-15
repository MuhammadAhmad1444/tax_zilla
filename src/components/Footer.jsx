import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, MessageCircle } from 'lucide-react';
import SocialMediaLinks from './SocialMediaLinks';
import { usePageMotion, VIEWPORT_REVEAL, getStaggerContainer, getStaggerItem } from '../lib/motion.js';
import { SERVICE_CATEGORIES } from '../data/serviceCatalog.js';
import { SITE } from '../data/site.js';

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

  const buildCategoryLinks = (slugs) =>
    slugs
      .map((slug) => SERVICE_CATEGORIES.find((category) => category.slug === slug))
      .filter(Boolean);

  return (
    <footer className="bg-brand-solid text-white border-t-4 border-[var(--color-gold)] dark-section">

      <div className="container-custom py-8 md:py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8"
          variants={getStaggerContainer(reduce)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REVEAL}
        >
          {/* Company Info */}
          <motion.div variants={getStaggerItem(reduce)}>
            <div className="mb-4">
              <img
                src="/images/brand-mark.png"
                alt="Tax Zilla logo"
                className="object-contain"
                style={{ height: '48px', width: 'auto', maxWidth: '180px' }}
                loading="lazy"
              />
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Tax Zilla Consultancy is your premier partner for tax and legal solutions in Pakistan. We specialize in FBR compliance, SECP registration, and corporate legal advisory.
            </p>
            <SocialMediaLinks variant="footer" iconSize={18} />
          </motion.div>

          {/* Services */}
          <motion.div variants={getStaggerItem(reduce)}>
            <h4 className="text-sm font-bold text-[var(--color-gold)] mb-5 uppercase tracking-widest">Core Services</h4>
            <ul className="space-y-2.5">
              {buildCategoryLinks(primaryServiceSlugs).map((category) => (
                <li key={category.slug}>
                  <Link to={`/services/${category.slug}`} className="tz-footer-link text-sm">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* International Services */}
          <motion.div variants={getStaggerItem(reduce)}>
            <h4 className="text-sm font-bold text-[var(--color-gold)] mb-5 uppercase tracking-widest">International</h4>
            <ul className="space-y-2.5">
              {buildCategoryLinks(internationalServiceSlugs).map((category) => (
                <li key={category.slug}>
                  <Link to={`/services/${category.slug}`} className="tz-footer-link text-sm">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Calculators */}
          <motion.div variants={getStaggerItem(reduce)}>
            <h4 className="text-sm font-bold text-[var(--color-gold)] mb-5 uppercase tracking-widest">Calculators</h4>
            <ul className="space-y-2.5">
              {[
                { path: 'salary', label: 'Salary Tax Calculator' },
                { path: 'freelancer', label: 'Freelancer Tax Calculator' },
                { path: 'business', label: 'Business Tax Calculator' },
                { path: 'super-tax', label: 'Super Tax Calculator' },
                { path: 'company-income', label: 'Corporate Tax Calculator' },
                { path: 'builder', label: 'Builder Tax Calculator' },
                { path: 'developer', label: 'Developer Tax Calculator' },
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link to={`/pakistan-tax-calculators?calc=${path}`} className="tz-footer-link text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Useful Links */}
          <motion.div variants={getStaggerItem(reduce)}>
            <h4 className="text-sm font-bold text-[var(--color-gold)] mb-5 uppercase tracking-widest">Useful Links</h4>
            <ul className="space-y-2.5">
              {[
                { path: '/services', label: 'Services' },
                { path: '/about', label: 'About Us' },
                { path: '/resources', label: 'Resources' },
                { path: '/contact', label: 'Contact Us' },
                { path: '/faqs', label: 'FAQs' },
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="tz-footer-link text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={getStaggerItem(reduce)}>
            <h4 className="text-lg font-semibold text-[var(--color-gold)] mb-6 font-heading">Contact</h4>
            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="https://maps.google.com/?q=Tax+Zilla+Consultancy+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 group"
                >
                  <MapPin size={15} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white transition-colors leading-snug">
                    7A, Malik Park, Main Canal Road, Mughalpura, Lahore
                  </span>
                </a>
              </li>

              <li>
                <a href="tel:+923399993308" className="flex items-center gap-2.5 group">
                  <Phone size={15} className="text-[var(--color-gold)] flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">+92 339 9993308</span>
                </a>
              </li>

              <li>
                <a href="tel:+923009860279" className="flex items-center gap-2.5 group">
                  <Phone size={15} className="text-[var(--color-gold)] flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">+92 300 9860279</span>
                </a>
              </li>

              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 group">
                  <Mail size={15} className="text-[var(--color-gold)] flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white transition-colors break-all">{SITE.email}</span>
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock size={15} className="text-[var(--color-gold)] mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Mon–Fri: 9:00 AM – 6:00 PM</div>
                  <div>Sat: 10:00 AM – 2:00 PM</div>
                </div>
              </li>

              <li className="pt-1">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--color-gold)] hover:text-[var(--color-gold-light)] font-semibold transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp Chat
                </a>
              </li>

            </ul>
          </motion.div>
        </motion.div>

        {/* Consultation strip */}
        <motion.div
          className="mt-10 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 100%)',
            border: '1px solid rgba(212,175,55,0.18)',
          }}
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_REVEAL}
          transition={{ duration: reduce ? 0.01 : 0.45 }}
        >
          <div className="px-6 py-5 text-center">
            <span className="tz-badge tz-badge-gold mb-3 inline-flex">Free Consultation</span>
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Talk to a specialist today — no commitment required. All services are provided in compliance with Pakistan's Income Tax Ordinance, Sales Tax Act, and Companies Act.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="container-custom flex flex-col items-center justify-between gap-4 px-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {currentYear} Tax Zilla. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs text-center md:text-right">
            All services are provided in accordance with Pakistan laws and FBR regulations.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500 sm:justify-end">
            <Link to="/legal/privacy-policy" className="hover:text-[var(--color-gold)] transition-colors">Privacy</Link>
            <Link to="/legal/terms-conditions" className="hover:text-[var(--color-gold)] transition-colors">Terms</Link>
            <Link to="/legal/disclaimer" className="hover:text-[var(--color-gold)] transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;