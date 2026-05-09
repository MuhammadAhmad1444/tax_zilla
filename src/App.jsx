import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import WhyChooseUsPage from './pages/WhyChooseUsPage.jsx';
import FAQsPage from './pages/FAQsPage.jsx';
import OurProcessPage from './pages/OurProcessPage.jsx';
import IndustriesPage from './pages/IndustriesPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import PakTaxCalculators2025Page from './pages/PakTaxCalculators2025Page.jsx';
import IncomeTaxSlabsPlaceholderPage from './pages/IncomeTaxSlabsPlaceholderPage.jsx';
import ServiceSlugPage from './pages/ServiceSlugPage.jsx';
import { 
  PrivacyPolicyPage, 
  TermsConditionsPage, 
  DisclaimerPage 
} from './pages/LegalPages.jsx';

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow min-w-0 w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* New Main Pages */}
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/our-process" element={<OurProcessPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />

          {/* PakTax Calculators */}
          <Route path="/pakistan-tax-calculators" element={<PakTaxCalculators2025Page />} />
          <Route path="/pakistan-tax-calculators/" element={<PakTaxCalculators2025Page />} />
          <Route path="/income-tax-slabs" element={<IncomeTaxSlabsPlaceholderPage />} />

          {/* Legacy service redirects */}
          <Route path="/services/income-tax" element={<Navigate to="/services/income-tax-return-filing" replace />} />
          <Route path="/services/company-registration" element={<Navigate to="/services/secp-company-registration" replace />} />
          <Route path="/services/sales-tax" element={<Navigate to="/services/sales-tax-registration-fbr" replace />} />
          <Route path="/services/business-compliance" element={<Navigate to="/services/company-annual-filings" replace />} />
          <Route path="/services/audit-assistance" element={<Navigate to="/services/fbr-audit-assistance" replace />} />
          <Route path="/services/freelancers-sme" element={<Navigate to="/services/freelancer-tax-filing" replace />} />

          {/* New service category and sub-service routes */}
          <Route path="/services/:slug" element={<ServiceSlugPage />} />

          {/* Legal Routes */}
          <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/legal/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/legal/disclaimer" element={<DisclaimerPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
      <WhatsAppButton />
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
