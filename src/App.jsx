import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import WhyChooseUsPage from './pages/WhyChooseUsPage.jsx';
import FAQsPage from './pages/FAQsPage.jsx';
import OurProcessPage from './pages/OurProcessPage.jsx';
import IndustriesPage from './pages/IndustriesPage.jsx';
import ResourcesPage from './pages/ResourcesPage.jsx';
import { 
  IncomeTaxPage, 
  NTNRegistrationPage, 
  SalesTaxPage, 
  CompanyRegistrationPage, 
  BusinessCompliancePage, 
  AuditAssistancePage, 
  FreelancerSMEPage 
} from './pages/ServiceDetails.jsx';
import { 
  PrivacyPolicyPage, 
  TermsConditionsPage, 
  DisclaimerPage 
} from './pages/LegalPages.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
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
            
            {/* Service Routes */}
            <Route path="/services/income-tax" element={<IncomeTaxPage />} />
            <Route path="/services/ntn-registration" element={<NTNRegistrationPage />} />
            <Route path="/services/sales-tax" element={<SalesTaxPage />} />
            <Route path="/services/company-registration" element={<CompanyRegistrationPage />} />
            <Route path="/services/business-compliance" element={<BusinessCompliancePage />} />
            <Route path="/services/audit-assistance" element={<AuditAssistancePage />} />
            <Route path="/services/freelancers-sme" element={<FreelancerSMEPage />} />
            
            {/* Legal Routes */}
            <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/legal/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/legal/disclaimer" element={<DisclaimerPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;