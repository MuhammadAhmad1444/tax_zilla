import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText, ChevronRight, ShieldCheck, BadgeCheck } from 'lucide-react';
import Button from '../components/Button.jsx';
import { usePageMotion, EASE_OUT } from '../lib/motion.js';

// Breadcrumb Component
const Breadcrumb = ({ items }) => (
  <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
    <Link to="/" className="hover:text-[var(--color-gold)]">Home</Link>
    <ChevronRight size={14} />
    <Link to="/services" className="hover:text-[var(--color-gold)]">Services</Link>
    <ChevronRight size={14} />
    <span className="text-white font-medium">{items}</span>
  </nav>
);

// Reusable Layout for Service Pages
const ServiceLayout = ({ title, description, benefits, process, laws, serviceId, image, packages }) => {
  const navigate = useNavigate();
  const { reduce, hero } = usePageMotion();

  const handleRequest = () => {
    navigate('/contact', { state: { service: serviceId } });
  };

  return (
    <>
      <Helmet>
        <title>{title} - Tax Zilla Consultancy</title>
        <meta name="description" content={description} />
      </Helmet>

      <section className="pt-32 pb-20 bg-brand-dark text-white relative overflow-hidden dark-section">
        {image && (
          <div className="absolute inset-0 opacity-10">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-brand-overlay opacity-75" />
        <motion.div className="container-custom relative z-10" {...hero}>
          <Breadcrumb items={title} />
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
            <motion.p
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.01 : 0.45, ease: EASE_OUT, delay: reduce ? 0 : 0.1 }}
              className="text-xl text-gray-200 leading-relaxed mb-8"
            >
              {description}
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm font-medium text-[var(--color-gold)]"
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.01 : 0.4, ease: EASE_OUT, delay: reduce ? 0 : 0.18 }}
            >
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> 100% Compliant</span>
              <span className="flex items-center gap-1"><BadgeCheck size={16} /> Professional Service</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-dark-blue)]">Service Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our {title} service is meticulously designed to ensure you meet all regulatory requirements under Pakistani law while optimizing your financial position. We navigate the complexities so you can focus on your core business operations.
            </p>
            {packages && packages.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 text-[var(--color-dark-blue)]">Packages We Offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map((pkg, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-[var(--color-gold)] transition-all"
                    >
                      <h4 className="font-semibold text-[var(--color-dark-blue)] mb-1 text-sm md:text-base">
                        {pkg.name}
                      </h4>
                      {pkg.tagline && (
                        <p className="text-[var(--color-gold)] text-xs font-medium mb-1">{pkg.tagline}</p>
                      )}
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                        {pkg.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[var(--color-dark-blue)] mb-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-[var(--color-dark-blue)]">
                <FileText size={20} /> Relevant Legal Framework
              </h3>
              <p className="text-gray-700 italic font-medium">{laws}</p>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-[var(--color-dark-blue)]">Our Execution Process</h3>
            <div className="space-y-6 mb-12">
              {process.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[var(--color-gold)] transition-all">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-dark-blue)] text-[var(--color-gold)] flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-md">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 pt-1 font-medium">{step}</p>
                </div>
              ))}
            </div>
            
            {/* CTA in Content */}
            <div className="bg-[var(--color-gold)]/10 p-8 rounded-xl text-center border border-[var(--color-gold)]">
              <h3 className="text-xl font-bold mb-2">Ready to proceed?</h3>
              <p className="text-gray-600 mb-6">Let our experts handle your {title} requirements today.</p>
              <Button variant="primary" onClick={handleRequest}>Get Started Now</Button>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl h-fit sticky top-24 shadow-lg border-t-4 border-[var(--color-gold)]">
            <h3 className="text-xl font-bold mb-6 text-[var(--color-dark-blue)]">Why Choose This Service?</h3>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[var(--color-gold)] mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full font-bold shadow-lg" onClick={handleRequest}>
              Request Consultation <ArrowRight size={18} className="ml-2" />
            </Button>
            <p className="text-xs text-center text-gray-400 mt-4">
              Secure & Confidential • Expert Review
            </p>
          </div>
        </div>
      </section>
      
      {/* Related Services Suggestions */}
      <section className="py-12 bg-gray-100 border-t border-gray-200">
        <div className="container-custom">
          <h3 className="text-2xl font-bold mb-6">Related Services</h3>
          <div className="flex flex-wrap gap-4">
             <Link to="/services/income-tax" className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:text-[var(--color-gold)] transition-all font-medium">Income Tax</Link>
             <Link to="/services/company-registration" className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:text-[var(--color-gold)] transition-all font-medium">Company Reg.</Link>
             <Link to="/services/sales-tax" className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:text-[var(--color-gold)] transition-all font-medium">Sales Tax</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export const IncomeTaxPage = () => (
  <ServiceLayout
    title="Income Tax Filing"
    serviceId="Income Tax Filing"
    image="https://images.unsplash.com/photo-1554224155-a1487473ffd9"
    description="Professional income tax return filing services for salaried individuals, business owners, and companies in Pakistan."
    laws="Income Tax Ordinance, 2001 & Income Tax Rules, 2002"
    packages={[
      {
        name: 'Annual Income Tax Filing – Salaried',
        tagline: 'Best for fixed-salary employees',
        summary:
          'Based on your annual salary certificate, allowances and deductions. We prepare your return and wealth statement and keep everything compliant.',
      },
      {
        name: 'Annual Income Tax Filing – Sole Proprietor',
        tagline: 'For small business owners and freelancers',
        summary:
          'Covers business accounts, personal expenses, assets and investments so your business and personal profile match in FBR records.',
      },
      {
        name: 'Annual Income Tax Filing – Partnership / Company',
        tagline: 'For registered firms and companies',
        summary:
          'Uses audited or management accounts to prepare complete returns, statements and reconciliations for partners/directors.',
      },
      {
        name: 'Annual Income Tax Filing – NPO / Charitable Trusts',
        tagline: 'Specialized non‑profit compliance',
        summary:
          'Focus on exemption claims, donations and regulatory reporting so your organization stays compliant and donor‑friendly.',
      },
    ]}
    process={[
      "Collection of financial documents and tax deduction certificates.",
      "Computation of taxable income and tax liability.",
      "Preparation of wealth statement and reconciliation.",
      "Submission of return on FBR Iris portal."
    ]}
    benefits={[
      "Avoidance of penalties for late filing",
      "Active Taxpayer List (ATL) status",
      "Reduced withholding tax rates",
      "Complete peace of mind"
    ]}
  />
);

export const NTNRegistrationPage = () => (
  <ServiceLayout
    title="NTN Registration"
    serviceId="NTN Registration"
    image="https://images.unsplash.com/photo-1684393637060-70e50f950aba"
    description="Get your National Tax Number (NTN) registered quickly and correctly with FBR."
    laws="Section 181 of Income Tax Ordinance, 2001"
    packages={[
      {
        name: 'NTN Registration – Salaried',
        tagline: 'For individual salary earners',
        summary:
          'Simple NTN registration using CNIC, mobile number, email and basic profile so you can become an active filer.',
      },
      {
        name: 'NTN Registration – Business Individual',
        tagline: 'For sole proprietors and small setups',
        summary:
          'NTN with business profile, business address and activity code for shop owners, consultants and freelancers.',
      },
      {
        name: 'NTN Registration – Partnership / AOP',
        tagline: 'For registered partnership firms',
        summary:
          'Covers principal officer details, partners’ CNICs and office address so your firm is properly reflected with FBR.',
      },
      {
        name: 'NTN Registration – Company / NPO',
        tagline: 'For SECP registered entities',
        summary:
          'We use your incorporation documents and authorizations to obtain NTN for companies, associations and non‑profits.',
      },
    ]}
    process={[
      "Gathering of CNIC and basic information.",
      "Registration on FBR Iris portal.",
      "Profile completion with business details.",
      "Issuance of NTN certificate."
    ]}
    benefits={[
      "Official recognition of business",
      "Essential for opening corporate bank accounts",
      "Requirement for government tenders",
      "First step to becoming a filer"
    ]}
  />
);

export const SalesTaxPage = () => (
  <ServiceLayout
    title="Sales Tax Services"
    serviceId="Sales Tax Registration"
    image="https://images.unsplash.com/photo-1554224154-22dec7ec8818"
    description="Comprehensive sales tax registration and monthly return filing for goods and services."
    laws="Sales Tax Act, 1990 & Provincial Sales Tax Acts"
    packages={[
      {
        name: 'GST Registration – Manufacturers',
        tagline: 'For manufacturing units',
        summary:
          'End‑to‑end STRN registration for manufacturers, including premises details, machinery information and utilities.',
      },
      {
        name: 'GST Registration – Traders & Service Providers',
        tagline: 'For non‑manufacturing businesses',
        summary:
          'Registration for wholesalers, retailers and service providers with proper business profiling on FBR portal.',
      },
      {
        name: 'Monthly Sales Tax Return Filing',
        tagline: 'On‑time, accurate compliance',
        summary:
          'Compilation of sales and purchase invoices, input/output tax calculation and filing of monthly returns.',
      },
      {
        name: 'Provincial Sales Tax (PST) Compliance',
        tagline: 'SRB, PRA and other provinces',
        summary:
          'Registration and monthly returns for provincial service tax regimes across Pakistan.',
      },
    ]}
    process={[
      "Registration for STRN (Sales Tax Registration Number).",
      "Monthly compilation of sales and purchase invoices.",
      "Preparation of Annexure A & C.",
      "Filing of monthly sales tax return."
    ]}
    benefits={[
      "Compliance with GST regulations",
      "Avoidance of heavy penalties/surcharges",
      "Input tax adjustment claims",
      "Legal protection for business"
    ]}
  />
);

export const CompanyRegistrationPage = () => (
  <ServiceLayout
    title="Company Registration"
    serviceId="Company Registration"
    image="https://images.unsplash.com/photo-1497366216548-37526070297c"
    description="Incorporate your Private Limited, SMC, or Partnership firm with SECP professionally."
    laws="Companies Act, 2017"
    packages={[
      {
        name: 'Private Limited Company Registration',
        tagline: 'Standard corporate structure',
        summary:
          'Ideal for multi‑shareholder businesses looking for limited liability and professional image.',
      },
      {
        name: 'Single Member Company (SMC) Registration',
        tagline: 'For solo founders',
        summary:
          'A corporate structure for single owners who still want limited liability and SECP recognition.',
      },
      {
        name: 'Partnership / AOP Registration',
        tagline: 'Flexible shared‑ownership model',
        summary:
          'Suitable for two or more partners working together under a registered firm name.',
      },
      {
        name: 'Non‑Profit / NPO Company (Section 42)',
        tagline: 'For charities and social ventures',
        summary:
          'Specialized incorporation for non‑profit objectives with governance and compliance guidance.',
      },
    ]}
    process={[
      "Name availability reservation.",
      "Drafting of Memorandum & Articles of Association.",
      "Filing of incorporation forms with SECP.",
      "Obtaining Certificate of Incorporation."
    ]}
    benefits={[
      "Separate legal entity status",
      "Limited liability protection",
      "Enhanced business credibility",
      "Ease of transferability of shares"
    ]}
  />
);

export const BusinessCompliancePage = () => (
  <ServiceLayout
    title="Business Compliance"
    serviceId="Business Compliance"
    image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    description="Ensure your company remains compliant with annual statutory filings and regulations."
    laws="Companies Act, 2017 & relevant SECP Regulations"
    packages={[
      {
        name: 'Annual SECP Compliances',
        tagline: 'Form A, Form 29 and more',
        summary:
          'End‑to‑end handling of yearly corporate filings, registers and resolutions so your company stays in good standing.',
      },
      {
        name: 'Change in Directors / Shareholding',
        tagline: 'Smooth corporate updates',
        summary:
          'Preparation and filing of forms for new directors, resignations and share transfers.',
      },
      {
        name: 'Corporate Secretarial Support',
        tagline: 'For growing companies',
        summary:
          'Ongoing compliance calendar, meeting minutes and advisory for boards and management.',
      },
    ]}
    process={[
      "Review of statutory records.",
      "Filing of Form A (Annual Return).",
      "Filing of Form 29 (Change in Officers).",
      "Maintenance of statutory registers."
    ]}
    benefits={[
      "Avoidance of inactive status",
      "Prevention of fines on directors",
      "Smooth business operations",
      "Good standing with regulators"
    ]}
  />
);

export const AuditAssistancePage = () => (
  <ServiceLayout
    title="Audit Assistance"
    serviceId="Audit Assistance"
    image="https://images.unsplash.com/photo-1589829085413-56de8ae18c73"
    description="Expert representation and defense during FBR tax audits and inquiries."
    laws="Relevant sections of Income Tax & Sales Tax Acts regarding Audit"
    packages={[
      {
        name: 'Income Tax Audit Assistance',
        tagline: 'For individual and corporate cases',
        summary:
          'Review of notices, preparation of reconciliations and representation before tax authorities.',
      },
      {
        name: 'Sales Tax Audit & Refund Support',
        tagline: 'For GST‑registered entities',
        summary:
          'Verification of input/output tax, documentation support and assistance in refund or demand cases.',
      },
      {
        name: 'NPO & Special Entity Audits',
        tagline: 'Specialized sector knowledge',
        summary:
          'Support for audits of non‑profits, trusts and special purpose entities with unique compliance needs.',
      },
    ]}
    process={[
      "Analysis of audit notice.",
      "Preparation of required documentation/evidence.",
      "Representation before the tax officer.",
      "Resolution and order finalization."
    ]}
    benefits={[
      "Professional defense strategy",
      "Reduction of potential demands",
      "Handling of complex legal queries",
      "Stress-free process"
    ]}
  />
);

export const FreelancerSMEPage = () => (
  <ServiceLayout
    title="Freelancer & SME Tax"
    serviceId="Freelancer Tax"
    image="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
    description="Tailored tax solutions for freelancers, IT exporters, and small startups."
    laws="IT Export Tax Exemptions & SME Laws"
    packages={[
      {
        name: 'Freelancer Tax & Compliance',
        tagline: 'For individual service exporters',
        summary:
          'Covers registration, tax returns and basic documentation for freelancers receiving payments from abroad.',
      },
      {
        name: 'PSEB & IT Company Registration',
        tagline: 'For IT and software houses',
        summary:
          'Assistance with PSEB registrations, renewals and related tax positioning for IT/ITeS businesses.',
      },
      {
        name: 'International Company Formation (USA)',
        tagline: 'LLC / Inc. with EIN and bank setup',
        summary:
          'Guidance on forming US entities, obtaining tax IDs and aligning with Pakistani tax requirements.',
      },
      {
        name: 'Startup & SME Tax Planning',
        tagline: 'For growing local businesses',
        summary:
          'Lightweight structures and planning so your startup saves tax while staying fully compliant.',
      },
    ]}
    process={[
      "Registration with PSEB (for IT companies).",
      "Filing of income tax returns with reduced rates.",
      "Consultancy on bringing foreign remittances.",
      "SME registration benefits."
    ]}
    benefits={[
      "Claiming 100% tax credits (where applicable)",
      "Simplified compliance regime",
      "White money declaration",
      "Banking channel regularization"
    ]}
  />
);