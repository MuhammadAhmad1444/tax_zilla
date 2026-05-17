import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from './components/ui/toaster.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

/* ── Lazy-loaded pages (each becomes its own JS chunk) ───────────────── */
const HomePage                      = lazy(() => import('./pages/HomePage.jsx'));
const AboutPage                     = lazy(() => import('./pages/AboutPage.jsx'));
const ServicesPage                  = lazy(() => import('./pages/ServicesPage.jsx'));
const ServiceSlugPage               = lazy(() => import('./pages/ServiceSlugPage.jsx'));
const ContactPage                   = lazy(() => import('./pages/ContactPage.jsx'));
const WhyChooseUsPage               = lazy(() => import('./pages/WhyChooseUsPage.jsx'));
const FAQsPage                      = lazy(() => import('./pages/FAQsPage.jsx'));
const OurProcessPage                = lazy(() => import('./pages/OurProcessPage.jsx'));
const IndustriesPage                = lazy(() => import('./pages/IndustriesPage.jsx'));
const IndustryDetailPage            = lazy(() => import('./pages/IndustryDetailPage.jsx'));
const ResourcesPage                 = lazy(() => import('./pages/ResourcesPage.jsx'));
const PakTaxCalculators2025Page     = lazy(() => import('./pages/PakTaxCalculators2025Page.jsx'));
const IncomeTaxSlabsPlaceholderPage = lazy(() => import('./pages/IncomeTaxSlabsPlaceholderPage.jsx'));
const BlogPage                      = lazy(() => import('./pages/BlogPage.jsx'));
const BlogPostPage                  = lazy(() => import('./pages/BlogPostPage.jsx'));

/* Legal pages — named exports, each wrapped in its own lazy import */
const PrivacyPolicyPage    = lazy(() => import('./pages/LegalPages.jsx').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsConditionsPage  = lazy(() => import('./pages/LegalPages.jsx').then(m => ({ default: m.TermsConditionsPage })));
const DisclaimerPage       = lazy(() => import('./pages/LegalPages.jsx').then(m => ({ default: m.DisclaimerPage })));

/* ── Page loading skeleton ───────────────────────────────────────────── */
const PageLoader = () => (
  <div
    className="flex items-center justify-center"
    style={{ minHeight: '60vh', background: 'var(--color-brand-navy)' }}
  >
    <div className="flex flex-col items-center gap-4">
      {/* Spinning gold ring */}
      <div
        className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
        style={{
          borderTopColor: '#D4AF37',
          borderRightColor: 'rgba(212,175,55,0.25)',
          borderBottomColor: 'rgba(212,175,55,0.25)',
          borderLeftColor: 'rgba(212,175,55,0.25)',
        }}
      />
      <span
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: 'rgba(212,175,55,0.55)' }}
      >
        Loading
      </span>
    </div>
  </div>
);

/* ── Smooth page transition wrapper ─────────────────────────────────── */
const EASE_OUT = [0.22, 1, 0.36, 1];

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.18, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

/* ── Animated route list ─────────────────────────────────────────────── */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/why-choose-us" element={<PageTransition><WhyChooseUsPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />

          <Route path="/faqs" element={<PageTransition><FAQsPage /></PageTransition>} />
          <Route path="/our-process" element={<PageTransition><OurProcessPage /></PageTransition>} />
          <Route path="/industries" element={<PageTransition><IndustriesPage /></PageTransition>} />
          <Route path="/industries/:slug" element={<PageTransition><IndustryDetailPage /></PageTransition>} />
          <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />

          <Route path="/pakistan-tax-calculators" element={<PageTransition><PakTaxCalculators2025Page /></PageTransition>} />
          <Route path="/pakistan-tax-calculators/" element={<PageTransition><PakTaxCalculators2025Page /></PageTransition>} />
          <Route path="/income-tax-slabs" element={<PageTransition><IncomeTaxSlabsPlaceholderPage /></PageTransition>} />

          {/* Legacy redirects */}
          <Route path="/services/income-tax" element={<Navigate to="/services/income-tax-return-filing" replace />} />
          <Route path="/services/company-registration" element={<Navigate to="/services/secp-company-registration" replace />} />
          <Route path="/services/sales-tax" element={<Navigate to="/services/sales-tax-registration-fbr" replace />} />
          <Route path="/services/business-compliance" element={<Navigate to="/services/company-annual-filings" replace />} />
          <Route path="/services/audit-assistance" element={<Navigate to="/services/fbr-audit-assistance" replace />} />
          <Route path="/services/freelancers-sme" element={<Navigate to="/services/freelancer-tax-filing" replace />} />

          <Route path="/services/:slug" element={<PageTransition><ServiceSlugPage /></PageTransition>} />

          <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
          <Route path="/legal/privacy-policy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
          <Route path="/legal/terms-conditions" element={<PageTransition><TermsConditionsPage /></PageTransition>} />
          <Route path="/legal/disclaimer" element={<PageTransition><DisclaimerPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

/* ── App shell ───────────────────────────────────────────────────────── */
function AppShell() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow min-w-0 w-full overflow-x-hidden" style={{ background: 'var(--color-brand-navy)' }}>
        <AnimatedRoutes />
      </main>

      <Footer />
      <Toaster />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
