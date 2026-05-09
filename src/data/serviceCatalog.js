const DEFAULT_DELIVERABLES = [
  'Eligibility and requirements checklist',
  'Document review and gap analysis',
  'Preparation and submission support',
  'Status update and next-step guidance',
];

const DEFAULT_PROCESS = [
  'Discovery and scope confirmation',
  'Document collection and validation',
  'Preparation and review',
  'Submission and confirmation',
];

const buildMetaTitle = (title) => `${title} | Tax Zilla Consultancy`;

const buildMetaDescription = (title, shortDesc) => {
  if (shortDesc) {
    return `${shortDesc} Get expert support from Tax Zilla Consultancy.`;
  }
  return `Professional ${title} service with documentation, filing, and compliance support.`;
};

const buildFaqs = (title) => [
  {
    q: `What documents are required for ${title}?`,
    a: 'We share a tailored checklist after a quick assessment and verify each document before submission.',
  },
  {
    q: `How long does ${title} take?`,
    a: 'Timelines depend on case complexity, but most requests are completed within a few working days.',
  },
  {
    q: 'Can this be handled remotely?',
    a: 'Yes. We handle documentation and updates digitally for clients across Pakistan and overseas.',
  },
  {
    q: 'Do you provide post-filing support?',
    a: 'Yes. We stay available for clarifications, notices, or follow-up requirements.',
  },
  {
    q: 'How do I get started?',
    a: 'Send a quick inquiry and we will confirm scope, timeline, and the first checklist to begin.',
  },
];

const buildCategoryFaqs = (title) => [
  {
    q: `What services are included in ${title}?`,
    a: 'We cover documentation, preparation, filing, and compliance guidance tailored to your needs.',
  },
  {
    q: 'Who is this category best for?',
    a: 'Individuals, businesses, and organizations needing reliable compliance and advisory support.',
  },
  {
    q: 'How do I choose the right service?',
    a: 'Share your requirements and we will recommend the best-fit service with next steps.',
  },
  {
    q: 'Can you handle remote clients?',
    a: 'Yes. We work with clients across Pakistan and overseas using secure digital documentation.',
  },
  {
    q: 'What happens after I submit an inquiry?',
    a: 'We confirm scope, timeline, and required documents before starting the service.',
  },
];

export const SERVICE_CATEGORIES = [
  {
    id: 'tax-services-pakistan',
    slug: 'tax-services-pakistan',
    title: 'Tax Services Pakistan',
    shortDesc: 'Core income tax, sales tax, and withholding compliance for individuals and businesses.',
    heroEyebrow: 'Core tax services',
    heroSubhead: 'Stay compliant with FBR filings, registrations, and ongoing tax support.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Tax Services Pakistan'),
  },
  {
    id: 'provincial-sales-tax',
    slug: 'provincial-sales-tax',
    title: 'Provincial Sales Tax',
    shortDesc: 'Provincial registrations and monthly filings for PRA, SRB, KPRA, and BRA.',
    heroEyebrow: 'Provincial compliance',
    heroSubhead: 'Get registered and file returns across all provincial sales tax authorities.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Provincial Sales Tax'),
  },
  {
    id: 'corporate-business-services',
    slug: 'corporate-business-services',
    title: 'Corporate & Business Services',
    shortDesc: 'SECP incorporation, annual filings, and corporate compliance support.',
    heroEyebrow: 'Corporate setup',
    heroSubhead: 'Entity formation, statutory filings, and ongoing business compliance.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Corporate & Business Services'),
  },
  {
    id: 'intellectual-property',
    slug: 'intellectual-property',
    title: 'Intellectual Property',
    shortDesc: 'Trademark, copyright, patent, and design registrations with renewals support.',
    heroEyebrow: 'IP protection',
    heroSubhead: 'Secure your brand and creative assets with end-to-end IP services.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Intellectual Property'),
  },
  {
    id: 'software-it-services',
    slug: 'software-it-services',
    title: 'Software & IT Services',
    shortDesc: 'PSEB, freelancer tax filing, and software export advisory for IT businesses.',
    heroEyebrow: 'IT compliance',
    heroSubhead: 'Specialized tax and regulatory services for software and IT exporters.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Software & IT Services'),
  },
  {
    id: 'engineering-services',
    slug: 'engineering-services',
    title: 'Engineering Services',
    shortDesc: 'PEC registrations, contractor compliance, and project tax support.',
    heroEyebrow: 'Engineering compliance',
    heroSubhead: 'Industry-specific registrations and tax services for engineering firms.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Engineering Services'),
  },
  {
    id: 'legal-services',
    slug: 'legal-services',
    title: 'Legal Services',
    shortDesc: 'Corporate legal advisory, contract drafting, and compliance support.',
    heroEyebrow: 'Legal support',
    heroSubhead: 'Clear guidance on contracts, notices, and statutory obligations.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Legal Services'),
  },
  {
    id: 'visa-immigration-tax-services',
    slug: 'visa-immigration-tax-services',
    title: 'Visa & Immigration Tax Services',
    shortDesc: 'Documentation, certificates, and tax compliance support for visa cases.',
    heroEyebrow: 'Visa documentation',
    heroSubhead: 'Tax-aligned documentation for immigration and visa applications.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Visa & Immigration Tax Services'),
  },
  {
    id: 'overseas-pakistani-tax-services',
    slug: 'overseas-pakistani-tax-services',
    title: 'Overseas Pakistani Tax Services',
    shortDesc: 'Non-resident filings, ATL activation, and property income support.',
    heroEyebrow: 'Overseas support',
    heroSubhead: 'Dedicated tax compliance services for overseas Pakistanis.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Overseas Pakistani Tax Services'),
  },
  {
    id: 'certificates-compliance',
    slug: 'certificates-compliance',
    title: 'Certificates & Compliance',
    shortDesc: 'Tax certificates, clearance documents, and compliance confirmations.',
    heroEyebrow: 'Certificates',
    heroSubhead: 'Fast-track essential certificates and compliance documentation.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Certificates & Compliance'),
  },
  {
    id: 'individual-tax-services',
    slug: 'individual-tax-services',
    title: 'Individual Tax Services',
    shortDesc: 'Salaried and business individual filings, wealth statements, and CGT support.',
    heroEyebrow: 'Individual tax',
    heroSubhead: 'Personalized filing support for individuals and family businesses.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Individual Tax Services'),
  },
  {
    id: 'audit-investigation',
    slug: 'audit-investigation',
    title: 'Audit & Investigation',
    shortDesc: 'FBR audit support, notice replies, and internal compliance reviews.',
    heroEyebrow: 'Audit readiness',
    heroSubhead: 'Reduce risk with professional audit support and representation.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Audit & Investigation'),
  },
  {
    id: 'business-tax-planning',
    slug: 'business-tax-planning',
    title: 'Business Tax Planning',
    shortDesc: 'Structured tax planning, optimization, and risk review for businesses.',
    heroEyebrow: 'Tax planning',
    heroSubhead: 'Strategic planning to improve compliance and reduce tax exposure.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Business Tax Planning'),
  },
  {
    id: 'additional-registrations',
    slug: 'additional-registrations',
    title: 'Additional Registrations',
    shortDesc: 'EOBI, PESSI, chamber registrations, and other business formalities.',
    heroEyebrow: 'Additional setups',
    heroSubhead: 'Complete your business registrations beyond tax and SECP.',
    areaServed: 'Pakistan',
    faqs: buildCategoryFaqs('Additional Registrations'),
  },
  {
    id: 'uae-tax-services',
    slug: 'uae-tax-services',
    title: 'UAE Tax Services',
    shortDesc: 'UAE VAT and corporate tax registration, filing, and ESR compliance.',
    heroEyebrow: 'UAE compliance',
    heroSubhead: 'Stay compliant with UAE VAT and corporate tax obligations.',
    areaServed: 'UAE',
    faqs: buildCategoryFaqs('UAE Tax Services'),
  },
  {
    id: 'usa-tax-services',
    slug: 'usa-tax-services',
    title: 'USA Tax Services',
    shortDesc: 'US LLC registrations, EIN, ITIN, and compliance guidance.',
    heroEyebrow: 'USA compliance',
    heroSubhead: 'Start and manage US tax obligations with guided support.',
    areaServed: 'USA',
    faqs: buildCategoryFaqs('USA Tax Services'),
  },
];

const RAW_SUBSERVICES = [
  // Tax Services Pakistan
  {
    slug: 'income-tax-return-filing',
    title: 'Income Tax Return Filing',
    categoryId: 'tax-services-pakistan',
    shortDesc: 'Annual income tax return preparation and filing for individuals and businesses.',
  },
  {
    slug: 'ntn-registration',
    title: 'NTN Registration',
    categoryId: 'tax-services-pakistan',
    shortDesc: 'Fast NTN registration and FBR profile setup with complete documentation.',
  },
  {
    slug: 'sales-tax-registration-fbr',
    title: 'Sales Tax Registration (FBR)',
    categoryId: 'tax-services-pakistan',
    shortDesc: 'FBR sales tax registration and onboarding for registered businesses.',
  },
  {
    slug: 'withholding-tax-statements',
    title: 'Withholding Tax Statements',
    categoryId: 'tax-services-pakistan',
    shortDesc: 'Quarterly withholding statements preparation and submission support.',
  },
  {
    slug: 'wealth-statement-preparation',
    title: 'Wealth Statement Preparation',
    categoryId: 'tax-services-pakistan',
    shortDesc: 'Wealth statement and asset reconciliation for accurate filings.',
  },

  // Provincial Sales Tax
  {
    slug: 'pra-registration',
    title: 'PRA Registration',
    categoryId: 'provincial-sales-tax',
    shortDesc: 'Punjab Revenue Authority registration and compliance setup.',
  },
  {
    slug: 'srb-registration',
    title: 'SRB Registration',
    categoryId: 'provincial-sales-tax',
    shortDesc: 'Sindh Revenue Board registration and filing support.',
  },
  {
    slug: 'kpra-registration',
    title: 'KPRA Registration',
    categoryId: 'provincial-sales-tax',
    shortDesc: 'Khyber Pakhtunkhwa Revenue Authority registration assistance.',
  },
  {
    slug: 'bra-registration',
    title: 'BRA Registration',
    categoryId: 'provincial-sales-tax',
    shortDesc: 'Balochistan Revenue Authority registration and compliance setup.',
  },
  {
    slug: 'provincial-sales-tax-returns',
    title: 'Provincial Sales Tax Returns',
    categoryId: 'provincial-sales-tax',
    shortDesc: 'Monthly return filing for PRA, SRB, KPRA, and BRA.',
  },

  // Corporate & Business Services
  {
    slug: 'secp-company-registration',
    title: 'SECP Company Registration',
    categoryId: 'corporate-business-services',
    shortDesc: 'End-to-end SECP incorporation with name reservation and documentation.',
  },
  {
    slug: 'private-limited-company-registration',
    title: 'Private Limited Company Registration',
    categoryId: 'corporate-business-services',
    shortDesc: 'Private limited company incorporation and post-registration support.',
  },
  {
    slug: 'single-member-company-registration',
    title: 'Single Member Company Registration',
    categoryId: 'corporate-business-services',
    shortDesc: 'SMC registration with statutory documentation and compliance guidance.',
  },
  {
    slug: 'llp-registration',
    title: 'LLP Registration',
    categoryId: 'corporate-business-services',
    shortDesc: 'Limited liability partnership registration and compliance setup.',
  },
  {
    slug: 'company-annual-filings',
    title: 'Company Annual Filings',
    categoryId: 'corporate-business-services',
    shortDesc: 'Annual return filing, Form A/Form 29 updates, and SECP compliance.',
  },

  // Intellectual Property
  {
    slug: 'trademark-registration-pakistan',
    title: 'Trademark Registration Pakistan',
    categoryId: 'intellectual-property',
    shortDesc: 'Trademark search, filing, and registration for brand protection.',
  },
  {
    slug: 'trademark-opposition-response',
    title: 'Trademark Opposition and Response',
    categoryId: 'intellectual-property',
    shortDesc: 'Professional handling of trademark objections and opposition replies.',
  },
  {
    slug: 'copyright-registration',
    title: 'Copyright Registration',
    categoryId: 'intellectual-property',
    shortDesc: 'Copyright registration for creative works and software assets.',
  },
  {
    slug: 'patent-filing-pakistan',
    title: 'Patent Filing Pakistan',
    categoryId: 'intellectual-property',
    shortDesc: 'Patent drafting support and filing guidance for inventors and firms.',
  },
  {
    slug: 'industrial-design-registration',
    title: 'Industrial Design Registration',
    categoryId: 'intellectual-property',
    shortDesc: 'Design registration for product shapes, patterns, and visual identity.',
  },

  // Software & IT Services
  {
    slug: 'pseb-registration',
    title: 'PSEB Registration',
    categoryId: 'software-it-services',
    shortDesc: 'PSEB registration for IT companies and software exporters.',
  },
  {
    slug: 'pseb-renewal-annual-returns',
    title: 'PSEB Renewal and Annual Returns',
    categoryId: 'software-it-services',
    shortDesc: 'PSEB renewal support and annual return submissions.',
  },
  {
    slug: 'freelancer-tax-filing',
    title: 'Freelancer Tax Filing',
    categoryId: 'software-it-services',
    shortDesc: 'Tax filings for freelancers with export income and remittance support.',
  },
  {
    slug: 'software-export-tax-advisory',
    title: 'Software Export Tax Advisory',
    categoryId: 'software-it-services',
    shortDesc: 'Export incentive guidance and tax positioning for IT exporters.',
  },
  {
    slug: 'it-company-incorporation',
    title: 'IT Company Incorporation',
    categoryId: 'software-it-services',
    shortDesc: 'Company setup tailored for IT and software businesses.',
  },

  // Engineering Services
  {
    slug: 'pec-registration',
    title: 'PEC Registration',
    categoryId: 'engineering-services',
    shortDesc: 'Pakistan Engineering Council registration and documentation.',
  },
  {
    slug: 'pec-renewal',
    title: 'PEC Renewal',
    categoryId: 'engineering-services',
    shortDesc: 'PEC renewal assistance with compliance review and submissions.',
  },
  {
    slug: 'engineering-firm-ntn',
    title: 'Engineering Firm NTN',
    categoryId: 'engineering-services',
    shortDesc: 'NTN registration for engineering firms and contractors.',
  },
  {
    slug: 'contractor-tax-compliance',
    title: 'Contractor Tax Compliance',
    categoryId: 'engineering-services',
    shortDesc: 'Tax compliance and withholding support for contractors.',
  },
  {
    slug: 'project-withholding-tax',
    title: 'Project Withholding Tax',
    categoryId: 'engineering-services',
    shortDesc: 'Withholding tax review and calculations for engineering projects.',
  },

  // Legal Services
  {
    slug: 'legal-advisory-retainer',
    title: 'Legal Advisory Retainer',
    categoryId: 'legal-services',
    shortDesc: 'Ongoing legal advisory for corporate and commercial matters.',
  },
  {
    slug: 'contract-drafting-review',
    title: 'Contract Drafting and Review',
    categoryId: 'legal-services',
    shortDesc: 'Drafting, review, and negotiation support for contracts.',
  },
  {
    slug: 'legal-notice-reply',
    title: 'Legal Notice Reply',
    categoryId: 'legal-services',
    shortDesc: 'Preparation of legal notice responses and documentation support.',
  },
  {
    slug: 'labor-law-compliance',
    title: 'Labor Law Compliance',
    categoryId: 'legal-services',
    shortDesc: 'Employment law compliance, HR policies, and documentation.',
  },
  {
    slug: 'company-secretarial-services',
    title: 'Company Secretarial Services',
    categoryId: 'legal-services',
    shortDesc: 'Corporate secretarial services and statutory record keeping.',
  },

  // Visa & Immigration Tax Services
  {
    slug: 'tax-residency-certificate',
    title: 'Tax Residency Certificate',
    categoryId: 'visa-immigration-tax-services',
    shortDesc: 'TRC application support and documentation for visa cases.',
  },
  {
    slug: 'visa-income-documentation',
    title: 'Visa Income Documentation',
    categoryId: 'visa-immigration-tax-services',
    shortDesc: 'Income documentation packages for visa and immigration files.',
  },
  {
    slug: 'foreign-remittance-certificate',
    title: 'Foreign Remittance Certificate',
    categoryId: 'visa-immigration-tax-services',
    shortDesc: 'Remittance documentation and supporting certificates.',
  },
  {
    slug: 'source-of-funds-letter',
    title: 'Source of Funds Letter',
    categoryId: 'visa-immigration-tax-services',
    shortDesc: 'Structured source of funds letters with supporting evidence.',
  },
  {
    slug: 'visa-tax-compliance-review',
    title: 'Visa Tax Compliance Review',
    categoryId: 'visa-immigration-tax-services',
    shortDesc: 'Review of tax records to strengthen visa applications.',
  },

  // Overseas Pakistani Tax Services
  {
    slug: 'non-resident-tax-filing',
    title: 'Non-Resident Tax Filing',
    categoryId: 'overseas-pakistani-tax-services',
    shortDesc: 'Tax return filing for non-resident Pakistanis with local income.',
  },
  {
    slug: 'overseas-property-income-filing',
    title: 'Overseas Property Income Filing',
    categoryId: 'overseas-pakistani-tax-services',
    shortDesc: 'Property income reporting and compliance for overseas owners.',
  },
  {
    slug: 'overseas-atl-activation',
    title: 'Overseas ATL Activation',
    categoryId: 'overseas-pakistani-tax-services',
    shortDesc: 'Active Taxpayer List restoration for overseas Pakistanis.',
  },
  {
    slug: 'repatriation-documentation',
    title: 'Repatriation Documentation',
    categoryId: 'overseas-pakistani-tax-services',
    shortDesc: 'Documentation support for repatriation of funds and investments.',
  },
  {
    slug: 'poa-tax-representation',
    title: 'POA Tax Representation',
    categoryId: 'overseas-pakistani-tax-services',
    shortDesc: 'Power of attorney and tax representation support in Pakistan.',
  },

  // Certificates & Compliance
  {
    slug: 'atl-certificate',
    title: 'Active Taxpayer Certificate',
    categoryId: 'certificates-compliance',
    shortDesc: 'ATL certificate issuance and verification support.',
  },
  {
    slug: 'ntn-certificate-download',
    title: 'NTN Certificate Download',
    categoryId: 'certificates-compliance',
    shortDesc: 'NTN certificate retrieval with profile verification.',
  },
  {
    slug: 'tax-clearance-certificate',
    title: 'Tax Clearance Certificate',
    categoryId: 'certificates-compliance',
    shortDesc: 'Tax clearance certificate preparation and submission support.',
  },
  {
    slug: 'sales-tax-certificate',
    title: 'Sales Tax Registration Certificate',
    categoryId: 'certificates-compliance',
    shortDesc: 'Sales tax certificate issuance and compliance checks.',
  },
  {
    slug: 'secp-compliance-certificate',
    title: 'SECP Compliance Certificate',
    categoryId: 'certificates-compliance',
    shortDesc: 'Compliance certificates and status confirmations from SECP.',
  },

  // Individual Tax Services
  {
    slug: 'salaried-tax-return-filing',
    title: 'Salaried Tax Return Filing',
    categoryId: 'individual-tax-services',
    shortDesc: 'Annual tax return filing for salaried individuals.',
  },
  {
    slug: 'sole-proprietor-tax-return',
    title: 'Sole Proprietor Tax Return',
    categoryId: 'individual-tax-services',
    shortDesc: 'Business individual tax return preparation and filing.',
  },
  {
    slug: 'capital-gains-tax-filing',
    title: 'Capital Gains Tax Filing',
    categoryId: 'individual-tax-services',
    shortDesc: 'Capital gains tax reporting for property and securities.',
  },
  {
    slug: 'property-tax-filing',
    title: 'Property Tax Filing',
    categoryId: 'individual-tax-services',
    shortDesc: 'Property income tax filing and compliance support.',
  },
  {
    slug: 'wealth-statement-update',
    title: 'Wealth Statement Update',
    categoryId: 'individual-tax-services',
    shortDesc: 'Annual wealth statement updates and asset reconciliation.',
  },

  // Audit & Investigation
  {
    slug: 'fbr-audit-assistance',
    title: 'FBR Audit Assistance',
    categoryId: 'audit-investigation',
    shortDesc: 'Audit representation and response support for FBR inquiries.',
  },
  {
    slug: 'fbr-notice-reply',
    title: 'FBR Notice Reply',
    categoryId: 'audit-investigation',
    shortDesc: 'Preparation of professional responses to FBR notices.',
  },
  {
    slug: 'audit-representation',
    title: 'Audit Representation',
    categoryId: 'audit-investigation',
    shortDesc: 'Representation during audit proceedings and hearings.',
  },
  {
    slug: 'sales-tax-audit-assistance',
    title: 'Sales Tax Audit Assistance',
    categoryId: 'audit-investigation',
    shortDesc: 'Support for sales tax audit documentation and submissions.',
  },
  {
    slug: 'internal-compliance-review',
    title: 'Internal Compliance Review',
    categoryId: 'audit-investigation',
    shortDesc: 'Internal tax compliance audit to identify risks and gaps.',
  },

  // Business Tax Planning
  {
    slug: 'tax-planning-review',
    title: 'Tax Planning Review',
    categoryId: 'business-tax-planning',
    shortDesc: 'Strategic tax planning to optimize liability and cash flow.',
  },
  {
    slug: 'corporate-tax-optimization',
    title: 'Corporate Tax Optimization',
    categoryId: 'business-tax-planning',
    shortDesc: 'Corporate tax structure review and optimization guidance.',
  },
  {
    slug: 'withholding-tax-planning',
    title: 'Withholding Tax Planning',
    categoryId: 'business-tax-planning',
    shortDesc: 'Withholding tax planning and compliance support.',
  },
  {
    slug: 'business-restructuring-tax',
    title: 'Business Restructuring Tax',
    categoryId: 'business-tax-planning',
    shortDesc: 'Tax impact reviews for mergers, restructuring, and transitions.',
  },
  {
    slug: 'international-tax-planning',
    title: 'International Tax Planning',
    categoryId: 'business-tax-planning',
    shortDesc: 'Cross-border tax planning and compliance guidance.',
  },

  // Additional Registrations
  {
    slug: 'gst-registration',
    title: 'GST Registration',
    categoryId: 'additional-registrations',
    shortDesc: 'GST registration and onboarding support for businesses.',
  },
  {
    slug: 'eobi-registration',
    title: 'EOBI Registration',
    categoryId: 'additional-registrations',
    shortDesc: 'Employee Old-Age Benefits registration and compliance.',
  },
  {
    slug: 'pessi-registration',
    title: 'PESSI Registration',
    categoryId: 'additional-registrations',
    shortDesc: 'Punjab Employees Social Security registration and setup.',
  },
  {
    slug: 'chamber-of-commerce-registration',
    title: 'Chamber of Commerce Registration',
    categoryId: 'additional-registrations',
    shortDesc: 'Chamber membership registration and supporting documentation.',
  },
  {
    slug: 'psw-registration',
    title: 'PSW Registration',
    categoryId: 'additional-registrations',
    shortDesc: 'Pakistan Single Window registration support for traders.',
  },

  // UAE Tax Services
  {
    slug: 'uae-vat-registration',
    title: 'UAE VAT Registration',
    categoryId: 'uae-tax-services',
    shortDesc: 'UAE VAT registration and onboarding for businesses.',
  },
  {
    slug: 'uae-vat-return-filing',
    title: 'UAE VAT Return Filing',
    categoryId: 'uae-tax-services',
    shortDesc: 'UAE VAT return preparation and filing support.',
  },
  {
    slug: 'uae-corporate-tax-registration',
    title: 'UAE Corporate Tax Registration',
    categoryId: 'uae-tax-services',
    shortDesc: 'Corporate tax registration support for UAE entities.',
  },
  {
    slug: 'uae-corporate-tax-return',
    title: 'UAE Corporate Tax Return',
    categoryId: 'uae-tax-services',
    shortDesc: 'Corporate tax return preparation and filing for UAE entities.',
  },
  {
    slug: 'uae-esr-compliance',
    title: 'UAE ESR Compliance',
    categoryId: 'uae-tax-services',
    shortDesc: 'Economic Substance Regulations compliance support.',
  },

  // USA Tax Services
  {
    slug: 'usa-llc-registration',
    title: 'USA LLC Registration',
    categoryId: 'usa-tax-services',
    shortDesc: 'US LLC formation with documentation and compliance guidance.',
  },
  {
    slug: 'usa-ein-application',
    title: 'USA EIN Application',
    categoryId: 'usa-tax-services',
    shortDesc: 'Employer Identification Number application support.',
  },
  {
    slug: 'usa-llc-tax-filing',
    title: 'USA LLC Tax Filing',
    categoryId: 'usa-tax-services',
    shortDesc: 'Tax filing guidance for US LLCs and foreign-owned entities.',
  },
  {
    slug: 'w8ben-w8bene-guidance',
    title: 'W-8BEN / W-8BEN-E Guidance',
    categoryId: 'usa-tax-services',
    shortDesc: 'W-8BEN and W-8BEN-E documentation support.',
  },
  {
    slug: 'usa-itin-application',
    title: 'USA ITIN Application',
    categoryId: 'usa-tax-services',
    shortDesc: 'ITIN application support with document preparation.',
  },
];

export const SERVICE_SUBSERVICES = RAW_SUBSERVICES.map((service) => ({
  ...service,
  metaTitle: service.metaTitle || buildMetaTitle(service.title),
  metaDescription: service.metaDescription || buildMetaDescription(service.title, service.shortDesc),
  deliverables: service.deliverables || DEFAULT_DELIVERABLES,
  process: service.process || DEFAULT_PROCESS,
  faqs: service.faqs || buildFaqs(service.title),
  serviceType: service.serviceType || service.title,
}));

export const CATEGORY_MAP = new Map(SERVICE_CATEGORIES.map((category) => [category.slug, category]));
export const SUBSERVICE_MAP = new Map(SERVICE_SUBSERVICES.map((service) => [service.slug, service]));

export const getCategoryBySlug = (slug) => CATEGORY_MAP.get(slug);
export const getSubserviceBySlug = (slug) => SUBSERVICE_MAP.get(slug);
export const getSubservicesByCategory = (categoryId) =>
  SERVICE_SUBSERVICES.filter((service) => service.categoryId === categoryId);
