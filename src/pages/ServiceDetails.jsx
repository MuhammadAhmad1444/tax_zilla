import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, FileText, ChevronRight, ShieldCheck, BadgeCheck } from 'lucide-react';
import Button from '../components/Button.jsx';

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
const ServiceLayout = ({ title, description, benefits, process, laws, serviceId, image }) => {
  const navigate = useNavigate();

  const handleRequest = () => {
    navigate('/contact', { state: { service: serviceId } });
  };

  return (
    <>
      <Helmet>
        <title>{title} - Tax Zilla Consultancy</title>
        <meta name="description" content={description} />
      </Helmet>

      <section className="pt-32 pb-20 bg-[var(--color-dark-blue)] text-white relative overflow-hidden">
        {image && (
          <div className="absolute inset-0 opacity-10">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="container-custom relative z-10">
          <Breadcrumb items={title} />
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">{description}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-[var(--color-gold)]">
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> 100% Compliant</span>
              <span className="flex items-center gap-1"><BadgeCheck size={16} /> Professional Service</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-dark-blue)]">Service Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our {title} service is meticulously designed to ensure you meet all regulatory requirements under Pakistani law while optimizing your financial position. We navigate the complexities so you can focus on your core business operations.
            </p>
            
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