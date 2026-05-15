import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from './components/ui/toaster.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
// ScrollProgressBar removed
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import WhyChooseUsPage from './pages/WhyChooseUsPage.jsx';
import FAQsPage from './pages/FAQsPage.jsx';
import OurProcessPage from './pages/OurProcessPage.jsx';
import IndustriesPage from './pages/IndustriesPage.jsx';
import IndustryDetailPage from './pages/IndustryDetailPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import PakTaxCalculators2025Page from './pages/PakTaxCalculators2025Page.jsx';
import IncomeTaxSlabsPlaceholderPage from './pages/IncomeTaxSlabsPlaceholderPage.jsx';
import ServiceSlugPage from './pages/ServiceSlugPage.jsx';
import {
  PrivacyPolicyPage,
  TermsConditionsPage,
  DisclaimerPage,
} from './pages/LegalPages.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';

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
