/* ─── Smart content generation by service category & keywords ──────────── */

const CATEGORY_PROCESSES = {
  'tax-services-pakistan': [
    'Initial consultation — understand your income sources and tax obligations',
    'Document collection — salary slips, income records, business accounts',
    'Return preparation — accurate calculation with all deductions applied',
    'Client review — confirm figures before submission',
    'FBR IRIS filing & acknowledgement receipt delivery',
  ],
  'provincial-sales-tax': [
    'Registration eligibility check with relevant authority (PRA/SRB/KPRA/BRA)',
    'Document preparation — business registration, NTN, address proof',
    'Online portal filing and registration form submission',
    'Follow-up with provincial authority for approval',
    'STRN certificate issuance and monthly filing setup',
  ],
  'corporate-business-services': [
    'Business structure consultation — Pvt Ltd, SMC, AOP, or sole proprietorship',
    'Document preparation — CNIC, address proof, MOA/AOA drafting',
    'SECP eServices filing and name reservation',
    'Company incorporation and certificate of registration',
    'NTN, bank account guidance, and post-registration compliance setup',
  ],
  'secp-related-services': [
    'Requirement review and SECP portal eligibility check',
    'Document preparation — resolutions, forms, and supporting papers',
    'SECP eServices submission with all required attachments',
    'Status tracking and SECP query resolution',
    'Confirmation certificate or updated company documents delivery',
  ],
  'competition-commission-services': [
    'Initial compliance assessment and CCP exposure review',
    'Scope confirmation and documentation requirements briefing',
    'Preparation of advisory report, submissions, or legal filings',
    'Client review and sign-off on all deliverables',
    'Submission to CCP / implementation support and compliance confirmation',
  ],
  'intellectual-property': [
    'IP eligibility check and trademark/patent availability search',
    'Application preparation — descriptions, class selection, drawings',
    'IPO Pakistan online portal filing and fee submission',
    'Examination tracking, objection handling if required',
    'Certificate of registration delivery and renewal reminder setup',
  ],
  'legal-services': [
    'Scope briefing — understand your legal requirement in detail',
    'Legal drafting — agreements, notices, powers of attorney',
    'Client review and revision rounds until final approval',
    'Attestation, notarisation, or execution as required',
    'Delivery of final signed/stamped legal document',
  ],
  'uae-tax-services': [
    'UAE tax obligation review — VAT, Corporate Tax, Zakat',
    'Document preparation — trade licence, Emirates ID, financial records',
    'FTA portal registration or return filing',
    'Compliance check and regulatory confirmation',
    'Ongoing advisory and next filing deadline setup',
  ],
  'usa-tax-services': [
    'US tax obligation review — federal, state, and LLC requirements',
    'Document collection — SSN/ITIN, formation docs, income statements',
    'IRS registration or return preparation',
    'E-filing with IRS and state authorities',
    'Confirmation and tax ID delivery',
  ],
  'ksa-tax-services': [
    'KSA tax obligation assessment — ZATCA VAT, Corporate Tax, Zakat',
    'Document preparation — CR, VAT certificate, business records',
    'ZATCA portal registration or e-invoicing setup',
    'Filing and compliance confirmation',
    'Ongoing advisory and dual Pakistan–KSA compliance support',
  ],
  'uk-tax-services': [
    'UK tax obligation review — Self Assessment, UTR, VAT',
    'Document collection — passport, NI number, income records',
    'HMRC registration or tax return filing',
    'Submission and HMRC confirmation receipt',
    'Pakistan–UK double taxation advisory and FBR declaration support',
  ],
  'software-it-services': [
    'IT business assessment — structure, income type, and applicable tax regime',
    'Document collection — CNIC, SECP docs, PSEB registration details',
    'Registration or return preparation on FBR Iris / PSEB portal',
    'Client review and confirmation before submission',
    'Filing completion, certificate delivery, and compliance calendar setup',
  ],
  'audit-investigation': [
    'FBR notice review and legal exposure assessment',
    'Response strategy and documentation preparation',
    'Legal reply drafting and client approval',
    'Submission to FBR and query resolution',
    'Audit closure confirmation and future compliance advisory',
  ],
  'overseas-pakistani-tax-services': [
    'Non-resident status review and Pakistan tax obligation assessment',
    'Document collection — NICOP, overseas income proof, property details',
    'ATL activation and FBR Iris profile update',
    'Return filing and wealth statement preparation',
    'TRC certificate application and post-filing compliance advisory',
  ],
  default: [
    'Initial consultation and scope confirmation',
    'Document checklist and collection',
    'Professional preparation and review',
    'Filing, submission, or legal execution',
    'Completion confirmation and delivery',
  ],
};

const CATEGORY_DOCS = {
  'tax-services-pakistan': [
    'CNIC / NICOP (front & back)',
    'Income tax computation / profit & loss summary (if available)',
    'Salary certificate / employment letter',
    'Business registration documents (if applicable)',
    'Previous year tax return copy (if filed)',
    'Property documents or rental agreements (if applicable)',
  ],
  'provincial-sales-tax': [
    'CNIC / NICOP of owner or directors',
    'Business registration certificate / SECP documents',
    'NTN registration certificate',
    'Business address proof (utility bill or lease)',
    'Bank account details and IBAN',
    'Service description or goods category details',
  ],
  'corporate-business-services': [
    'CNIC of all proposed directors / shareholders',
    'Proposed company name (3 options)',
    'Registered office address and utility bill',
    'Memorandum & Articles of Association (we draft)',
    'Director consent letters and Form 21',
    'Initial share structure and paid-up capital details',
  ],
  'secp-related-services': [
    'CNIC of all directors and shareholders',
    'Existing SECP company registration number',
    'Latest Form A and audited financial statements',
    'Board resolution / special resolution (we draft)',
    'Supporting legal documents specific to the service',
    'SECP eServices login credentials',
  ],
  'competition-commission-services': [
    'Company registration documents (SECP / trade licence)',
    'Business operations overview and revenue details',
    'Relevant contracts, agreements, or marketing materials',
    'Existing compliance policies (if any)',
    'CCP notices received (if any)',
    'Sector and market share information',
  ],
  'software-it-services': [
    'CNIC / NICOP of owner or directors',
    'SECP company registration certificate (if company)',
    'FBR NTN certificate (if existing)',
    'PSEB registration certificate (if existing)',
    'Foreign remittance records or platform payment history',
    'Business overview — services offered and client countries',
  ],
  'intellectual-property': [
    'CNIC / passport of applicant or company registration',
    'Brand name, logo, or invention description',
    'Trademark class selection (we advise)',
    'Specimen / sample of the trademark or design',
    'Power of attorney (if filing on behalf of client)',
    'Priority claim documents (for international marks)',
  ],
  'legal-services': [
    'CNIC of all parties involved',
    'Details of the legal matter or agreement scope',
    'Existing contracts or legal documents (if any)',
    'Property documents (for property-related matters)',
    'Court / authority notices received (if applicable)',
    'Corporate documents (for company-related matters)',
  ],
  'uae-tax-services': [
    'UAE Trade Licence copy',
    'Emirates ID / passport of owner or manager',
    'Memorandum of Association (UAE company)',
    'Trade licence and company financial summary',
    'Audited financial statements (for Corporate Tax)',
    'Existing VAT registration certificate (if any)',
  ],
  'usa-tax-services': [
    'SSN or ITIN (for individuals)',
    'LLC / Corporation formation documents',
    'EIN (Employer Identification Number) if existing',
    'W-2 / 1099 income forms or self-employment profit records',
    'W-2 / 1099 forms (for employed individuals)',
    'Previous US tax returns (if filed)',
  ],
  'ksa-tax-services': [
    'Saudi Commercial Registration (CR)',
    'ZATCA VAT registration certificate (if existing)',
    'Iqama / Saudi ID / passport of owner',
    'Company financial statements',
    'Pakistan NTN and FBR filing history',
    'Details of Pakistan–Saudi Arabia transactions',
  ],
  'uk-tax-services': [
    'Passport / National Identity document',
    'National Insurance (NI) number',
    'P60 / P45 / payslips (for salaried)',
    'Self-employment income records / invoices',
    'UK income records, invoices, or employer payslips',
    'Pakistan CNIC and NTN (for dual obligations)',
  ],
  default: [
    'CNIC / NICOP (front & back)',
    'Business or employment details',
    'Existing registration or filing history documents (if any)',
    'Existing registration documents (if any)',
    'Previous correspondence with authority (if any)',
  ],
};

function getServiceProcess(categoryId) {
  return CATEGORY_PROCESSES[categoryId] || CATEGORY_PROCESSES.default;
}

function getServiceDocs(categoryId) {
  return CATEGORY_DOCS[categoryId] || CATEGORY_DOCS.default;
}

const DEFAULT_DELIVERABLES = [
  'Eligibility and requirements checklist',
  'Document review and gap analysis',
  'Preparation and submission support',
  'Status update and next-step guidance',
];

const DEFAULT_PROCESS = CATEGORY_PROCESSES.default;

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
      id: 'high-demand-individual-services',
      slug: 'high-demand-individual-services',
      title: 'High Demand Individual Services',
      shortDesc: 'High-demand tax filing services for individuals and freelancers.',
      heroEyebrow: 'High demand',
      heroSubhead: 'Fast-track tax solutions for salaried, freelancer, and property related services.',
      areaServed: 'Pakistan',
      faqs: buildCategoryFaqs('High Demand Individual Services'),
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
  {
    id: 'ksa-tax-services',
    slug: 'ksa-tax-services',
    title: 'Saudi Arabia (KSA) Tax & Business Services',
    shortDesc: 'ZATCA VAT, corporate tax, Zakat, e-invoicing, and business setup services for clients in Saudi Arabia.',
    heroEyebrow: 'KSA compliance',
    heroSubhead: 'Expert tax and business services for Saudi Arabia — from ZATCA registration to cross-border Pakistan–KSA advisory.',
    areaServed: 'Saudi Arabia',
    faqs: [
      {
        q: 'What is ZATCA and who needs to register?',
        a: 'ZATCA (Zakat, Tax and Customs Authority) oversees VAT, corporate tax, and customs in Saudi Arabia. Any business exceeding SAR 375,000 in taxable turnover must register for VAT.',
      },
      {
        q: 'Do Pakistani businesses operating in KSA need to file taxes there?',
        a: 'Yes. Foreign companies and branches operating in Saudi Arabia are subject to corporate income tax at 20%, and must comply with ZATCA regulations.',
      },
      {
        q: 'What is the FATOORA e-invoicing system?',
        a: 'FATOORA is Saudi Arabia\'s mandatory e-invoicing system. All VAT-registered businesses must issue compliant electronic invoices and integrate with ZATCA systems.',
      },
      {
        q: 'Can Tax Zilla handle both Pakistan and Saudi Arabia compliance?',
        a: 'Yes. We specialize in cross-border Pakistan–KSA tax advisory, helping clients manage dual obligations including double taxation treaty benefits and foreign income declarations.',
      },
      {
        q: 'How do I get started with KSA tax services?',
        a: 'Send us your details via WhatsApp or the enquiry form. We will assess your requirements, confirm the scope, and begin the registration or filing process.',
      },
    ],
  },
  {
    id: 'competition-commission-services',
    slug: 'competition-commission-services',
    title: 'Competition Commission Services',
    shortDesc: 'CCP compliance, merger approvals, anti-competitive conduct advisory, regulatory representation, and competition law training for businesses across all sectors.',
    heroEyebrow: 'CCP Compliance',
    heroSubhead: 'Comprehensive Competition Commission of Pakistan (CCP) services — from compliance reviews to merger approvals and regulatory defence.',
    areaServed: 'Pakistan',
    faqs: [
      {
        q: 'What is the Competition Commission of Pakistan (CCP)?',
        a: 'The CCP is Pakistan\'s regulatory body that enforces competition law to prevent anti-competitive practices, abuse of dominant position, and deceptive marketing. Non-compliance can result in heavy fines.',
      },
      {
        q: 'Does my business need Competition Law compliance?',
        a: 'Yes, if your business operates in any sector where pricing, distribution, market share, or mergers are involved. CCP scrutinises all sectors including FMCG, real estate, pharmaceuticals, and digital businesses.',
      },
      {
        q: 'What happens when a business receives a CCP notice?',
        a: 'A CCP notice must be responded to within the stipulated timeframe with proper legal documentation. Our team handles notice review, response preparation, and regulatory representation before the CCP.',
      },
      {
        q: 'Is pre-merger notification mandatory?',
        a: 'Yes. Mergers and acquisitions that meet certain thresholds require pre-merger notification filing with the CCP. We assist with filing, documentation, and obtaining merger approval.',
      },
      {
        q: 'Can you train our team on competition law compliance?',
        a: 'Absolutely. We offer in-house training sessions, compliance workshops, and employee awareness programmes tailored to your industry and business size.',
      },
    ],
  },
  {
    id: 'secp-related-services',
    slug: 'secp-related-services',
    title: 'SECP Related Services',
    shortDesc: 'Complete SECP compliance — company registration, annual filings, director changes, share transfers, and corporate restructuring.',
    heroEyebrow: 'SECP Compliance',
    heroSubhead: 'End-to-end SECP services for Private Limited and SMC companies — from incorporation to dissolution and everything in between.',
    areaServed: 'Pakistan',
    faqs: [
      {
        q: 'What is SECP and why do I need to register?',
        a: 'SECP (Securities and Exchange Commission of Pakistan) regulates companies. Every Private Limited (Pvt Ltd) or Single Member Company (SMC) must be registered with SECP to operate legally in Pakistan.',
      },
      {
        q: 'How long does Private Limited Company registration take?',
        a: 'Typically 5–10 working days after all documents are submitted. Name reservation takes 1–2 days.',
      },
      {
        q: 'What is UBO filing and who needs it?',
        a: 'UBO (Ultimate Beneficial Owner) filing is mandatory for all SECP-registered companies. It discloses who ultimately owns or controls the company and must be updated annually.',
      },
      {
        q: 'Can I change a director without visiting SECP offices?',
        a: 'Yes. Director changes, share transfers, and most SECP filings can now be done online through SECP eServices. We handle the entire process remotely.',
      },
      {
        q: 'What is Annual Returns Filing with SECP?',
        a: 'Every registered company must file Form A (Annual Return) and audited financial statements with SECP each year. Late filing attracts penalties. We ensure timely submission.',
      },
    ],
  },
  {
    id: 'uk-tax-services',
    slug: 'uk-tax-services',
    title: 'UK Tax & Business Services',
    shortDesc: 'HMRC Self Assessment, UTR registration, UK company formation, VAT registration, and tax advisory for Pakistanis in the UK.',
    heroEyebrow: 'UK Compliance',
    heroSubhead: 'Expert UK tax services for Pakistanis in the United Kingdom — from HMRC registration to self-assessment filing and company formation.',
    areaServed: 'United Kingdom',
    faqs: [
      {
        q: 'Who needs to file a Self Assessment tax return in the UK?',
        a: 'You must file a Self Assessment if you are self-employed, earn over £100,000, have rental income, or have foreign income. Pakistanis working or running a business in the UK typically need to register with HMRC.',
      },
      {
        q: 'What is a UTR number and how do I get one?',
        a: 'A Unique Taxpayer Reference (UTR) is your personal 10-digit tax reference issued by HMRC. You need it for Self Assessment filing and running a UK business. We handle the full registration process.',
      },
      {
        q: 'Can I register a UK Limited Company from Pakistan?',
        a: 'Yes. UK Limited Companies can be registered remotely through Companies House. We assist with full incorporation, registered office address, and HMRC registration.',
      },
      {
        q: 'Do I need to pay tax in both Pakistan and the UK?',
        a: 'Pakistan and the UK have a Double Taxation Agreement. We advise on how to structure your income to avoid being taxed twice and ensure compliance with both HMRC and FBR.',
      },
      {
        q: 'How do I get started with UK tax services?',
        a: 'Contact us via WhatsApp or our enquiry form. We will assess your UK tax obligations, confirm the scope of work, and provide a clear quote before starting.',
      },
    ],
  },
];

const RAW_SUBSERVICES = [
  // Tax Services Pakistan
  {
    slug: 'income-tax-return-filing',
    title: 'Income Tax Return Filing',
    categoryId: 'tax-services-pakistan',
    shortDesc: 'Complete FBR income tax return filing for salaried individuals, businesspersons, freelancers, companies, and overseas Pakistanis — with full wealth statement and ATL compliance.',
    deliverables: [
      'Salaried Individual Tax Return — salary income, allowances, and employer deductions',
      'Business / Sole Proprietor Return — profit & loss, business expenses, and tax payable',
      'Company Annual Tax Return — corporate income, deductions, and advance tax adjustments',
      'Freelancer Tax Return — foreign platform income with reduced Clause 133 rates',
      'Rental Income Return — rental receipts, deductions, and property tax adjustments',
      'Overseas Pakistani Return — foreign income, remittances, and local asset declarations',
      'Agricultural Income Return — Punjab and other provincial income declarations',
      'AOP (Association of Persons) Return — partnership income distribution and filings',
      'Wealth Statement — complete asset, liability, and net worth reconciliation',
      'ATL status maintenance — ensure Active Taxpayer List inclusion for lower WHT rates',
      'Advance tax computation and challan preparation',
      'Tax refund claim filing where overpayment is identified',
    ],
    typicalDocs: [
      'CNIC / NICOP (front & back)',
      'Salary certificate or Form 16 / payslips (for salaried)',
      'Business accounts or profit & loss summary (for businesspersons)',
      'Foreign platform income records — Payoneer, Wise, PayPal (for freelancers)',
      'Rental agreements and rent receipts (for property income)',
      'Property documents — purchase/sale deeds, valuation (for wealth statement)',
      'Vehicle registration documents (for wealth statement)',
      'Previous year filed return acknowledgement (if already a filer)',
      'NTN number and FBR Iris login credentials',
    ],
    process: [
      'Income assessment — identify all income sources, deductions, and applicable tax slabs',
      'Document collection — salary slips, income records, property details, asset list',
      'Tax computation — accurate calculation of tax payable with all eligible deductions',
      'Wealth statement preparation — assets, liabilities, and net worth reconciliation',
      'FBR Iris return filing, submission, and acknowledgement receipt delivery',
    ],
    faqs: [
      {
        q: 'Who is required to file an income tax return in Pakistan?',
        a: 'Every person with taxable income above the exemption threshold must file a return. Additionally, anyone who owns property, a vehicle, has a business NTN, or has deducted withholding tax should file to maintain ATL status and claim refunds.',
      },
      {
        q: 'What is the deadline for filing income tax returns?',
        a: 'For salaried individuals and AOPs, the deadline is 30th September each year. For companies, it is 31st December. FBR may grant extensions. Late filing attracts penalties under Section 182.',
      },
      {
        q: 'What is the difference between a filer and non-filer?',
        a: 'A filer is someone on FBR\'s Active Taxpayer List (ATL) who has filed their return. Filers pay significantly lower withholding tax on bank transactions, property, vehicles, and contracts. Non-filers pay double or higher rates.',
      },
      {
        q: 'Can freelancers benefit from a lower tax rate?',
        a: 'Yes. IT and freelance exports earning through foreign platforms like Upwork, Fiverr, and Toptal are taxed at a reduced rate under Clause 133 of the Income Tax Ordinance. This is significantly lower than normal tax slabs.',
      },
      {
        q: 'What is a Wealth Statement and is it mandatory?',
        a: 'A Wealth Statement discloses all your assets (property, cash, vehicles, investments) and liabilities. It is mandatory for all individuals whose taxable income exceeds Rs. 500,000 or who own assets. Incorrect wealth statements can trigger FBR notices.',
      },
      {
        q: 'Can I claim a tax refund if too much tax was deducted?',
        a: 'Yes. If excess withholding tax was deducted from your salary, bank transactions, or business payments, you can claim a refund when filing your return. We identify all refund opportunities and file the claim with FBR.',
      },
      {
        q: 'Can overseas Pakistanis file tax returns from abroad?',
        a: 'Yes. Overseas Pakistanis with a NICOP can file returns remotely. If you have property, bank accounts, or any income in Pakistan, filing a return helps avoid higher withholding taxes and keeps your Pakistani assets legally documented.',
      },
    ],
  },
  {
    slug: 'ntn-registration-modification',
    title: 'NTN Registration & Modification',
    categoryId: 'tax-services-pakistan',
    shortDesc: 'Fast-track NTN registration on FBR Iris for salaried individuals, businesses, freelancers, and overseas Pakistanis — with full documentation support and ATL activation.',
    deliverables: [
      'Personal NTN Registration — for salaried individuals and self-employed persons',
      'Sole Proprietor NTN — for shop owners, traders, and small businesses',
      'Partnership Firm NTN — for joint business operations and AOPs',
      'Company NTN Registration — for Pvt Ltd, SMC, and other corporate entities',
      'Freelancer / E-commerce NTN — for Upwork, Fiverr, Amazon, and online sellers',
      'ATL (Active Taxpayer List) activation for lower withholding tax deductions',
      'FBR Iris profile setup and login credentials',
      'NTN Profile Modification — update name, address, business details, or phone',
      'Overseas Pakistani NTN — remote registration for non-residents with NICOP',
      'Tax year and income source configuration on Iris profile',
    ],
    typicalDocs: [
      'CNIC / NICOP (front & back) — for individuals',
      'Mobile number registered on CNIC (for OTP verification)',
      'Email address for FBR Iris account',
      'Latest electricity or gas utility bill (for address proof)',
      'SECP registration certificate (for companies)',
      'Partnership Deed (for partnership firms)',
      'Business address proof — rent agreement or ownership documents',
      'Salary certificate or employment letter (for salaried individuals)',
    ],
    process: [
      'Consultation — confirm taxpayer type (individual, business, freelancer, overseas)',
      'Document collection — CNIC, utility bill, mobile number, and supporting docs',
      'FBR Iris application preparation and eligibility verification',
      'Online submission on FBR Iris portal with all required details',
      'NTN allocation, ATL activation, and Iris login credentials delivery',
    ],
    faqs: [
      {
        q: 'How long does NTN registration take?',
        a: 'NTN registration is typically completed within 1–3 working days after all documents are submitted. In most cases, it can be done the same day.',
      },
      {
        q: 'Is NTN necessary for freelancers and online sellers?',
        a: 'Yes. Freelancers, Upwork/Fiverr earners, and Amazon/e-commerce sellers must register NTN to become compliant taxpayers, avoid higher withholding tax deductions, and benefit from reduced tax rates under Clause 133.',
      },
      {
        q: 'Can overseas Pakistanis register NTN from abroad?',
        a: 'Yes. Overseas Pakistanis with a valid NICOP can register NTN remotely. We handle the entire process online without any requirement to visit Pakistan or FBR offices.',
      },
      {
        q: 'What is the benefit of being on the Active Taxpayer List (ATL)?',
        a: 'Being on the ATL significantly reduces withholding tax rates on bank transactions, property purchases, vehicle registration, and cash withdrawals. Non-filers pay double the withholding rates.',
      },
      {
        q: 'What is NTN Modification and when do I need it?',
        a: 'NTN Modification is required when you need to update your registered name, address, phone number, business type, or add a new income source on your existing FBR Iris profile. We handle all modification requests.',
      },
      {
        q: 'Do I need a separate NTN for my company and personal income?',
        a: 'Yes. Your personal NTN covers individual income. A separately incorporated company (Pvt Ltd or SMC) requires its own company NTN registered with FBR under the corporate entity.',
      },
    ],
  },
  { slug: 'sales-tax-registration-monthly-filing', title: 'Sales Tax Registration & Monthly Filing', categoryId: 'tax-services-pakistan', shortDesc: 'FBR sales tax registration and monthly return filing services.' },
  { slug: 'fbr-notices-audit-handling', title: 'FBR Notices & Audit Handling', categoryId: 'tax-services-pakistan', shortDesc: 'Professional defense and representation for FBR notices and audits.' },
  { slug: 'wealth-statement-asset-reconciliation', title: 'Wealth Statement & Asset Reconciliation', categoryId: 'tax-services-pakistan', shortDesc: 'Accurate wealth statement preparation and asset reconciliation.' },
  { slug: 'tax-planning-advisory', title: 'Tax Planning & Advisory', categoryId: 'tax-services-pakistan', shortDesc: 'Strategic tax planning and advisory to optimize tax liabilities.' },
  { slug: 'atl-compliance', title: 'ATL Compliance', categoryId: 'tax-services-pakistan', shortDesc: 'Active Taxpayer List (ATL) inclusion and compliance maintenance.' },
  { slug: 'tax-refunds-adjustments', title: 'Tax Refunds & Adjustments', categoryId: 'tax-services-pakistan', shortDesc: 'Assistance in processing tax refunds and adjustments with FBR.' },
  { slug: 'late-filing-penalty-handling', title: 'Late Filing & Penalty Handling', categoryId: 'tax-services-pakistan', shortDesc: 'Support for late tax filings and handling penalty waivers.' },
  { slug: 'iris-profile-correction', title: 'IRIS Profile Correction', categoryId: 'tax-services-pakistan', shortDesc: 'Updates and corrections to FBR IRIS profiles and particulars.' },

  // Provincial Sales Tax
  { slug: 'pra-registration', title: 'PRA Registration', categoryId: 'provincial-sales-tax', shortDesc: 'Punjab Revenue Authority (PRA) registration and compliance.' },
  { slug: 'srb-registration', title: 'SRB Registration', categoryId: 'provincial-sales-tax', shortDesc: 'Sindh Revenue Board (SRB) registration and filing support.' },
  { slug: 'kpra-registration', title: 'KPRA Registration', categoryId: 'provincial-sales-tax', shortDesc: 'Khyber Pakhtunkhwa Revenue Authority (KPRA) registration.' },
  { slug: 'bra-registration', title: 'BRA Registration', categoryId: 'provincial-sales-tax', shortDesc: 'Balochistan Revenue Authority (BRA) registration and compliance.' },
  { slug: 'notices-compliance', title: 'Notices & Compliance', categoryId: 'provincial-sales-tax', shortDesc: 'Handling notices and ensuring compliance across provincial tax boards.' },

  // Corporate & Business Services
  { slug: 'secp-company-registration', title: 'SECP Company Registration', categoryId: 'corporate-business-services', shortDesc: 'End-to-end company incorporation and registration with SECP.' },
  { slug: 'partnership-registration', title: 'Partnership Registration', categoryId: 'corporate-business-services', shortDesc: 'Registration of partnership firms and AOPs with the registrar.' },
  { slug: 'business-ntn-registration', title: 'Business NTN Registration', categoryId: 'corporate-business-services', shortDesc: 'NTN registration for sole proprietors, partnerships, and companies.' },
  { slug: 'annual-returns', title: 'Annual Returns', categoryId: 'corporate-business-services', shortDesc: 'Preparation and filing of statutory annual returns with SECP.' },
  { slug: 'chamber-membership', title: 'Chamber Membership', categoryId: 'corporate-business-services', shortDesc: 'Assistance in obtaining membership with the Chamber of Commerce.' },
  { slug: 'business-documentation', title: 'Business Documentation', categoryId: 'corporate-business-services', shortDesc: 'Drafting and preparation of essential business and corporate documents.' },
  { slug: 'business-advisory', title: 'Business Advisory', categoryId: 'corporate-business-services', shortDesc: 'Expert advisory services for business growth, compliance, and strategy.' },

  // Intellectual Property
  { slug: 'trademark-registration', title: 'Trademark Registration', categoryId: 'intellectual-property', shortDesc: 'Trademark search, filing, and registration for brand protection.' },
  { slug: 'copyright-registration', title: 'Copyright Registration', categoryId: 'intellectual-property', shortDesc: 'Copyright registration for creative works and software.' },
  { slug: 'patent-registration', title: 'Patent Registration', categoryId: 'intellectual-property', shortDesc: 'Patent drafting and filing guidance for inventions.' },
  { slug: 'trademark-objection-handling', title: 'Trademark Objection Handling', categoryId: 'intellectual-property', shortDesc: 'Professional handling and reply to trademark objections and oppositions.' },
  { slug: 'trademark-renewal', title: 'Trademark Renewal', categoryId: 'intellectual-property', shortDesc: 'Timely renewal of registered trademarks to maintain protection.' },
  { slug: 'international-trademark', title: 'International Trademark', categoryId: 'intellectual-property', shortDesc: 'Registration of trademarks globally and under international protocols.' },

  // Software & IT Services
  {
    slug: 'pseb-registration',
    title: 'PSEB Registration',
    categoryId: 'software-it-services',
    shortDesc: 'Pakistan Software Export Board (PSEB) registration for IT companies, software houses, and freelancers to access export incentives and benefits.',
    deliverables: [
      'PSEB eligibility assessment for your IT business',
      'Online application preparation on PSEB portal',
      'Document compilation — SECP registration, tax details, CV',
      'Application submission and follow-up with PSEB',
      'PSEB certificate delivery and renewal advisory',
    ],
  },
  {
    slug: 'it-company-setup',
    title: 'IT Company Setup',
    categoryId: 'software-it-services',
    shortDesc: 'Complete corporate setup for IT and software businesses — SECP registration, NTN, PSEB enrollment, and tax compliance from day one.',
    deliverables: [
      'Business structure advisory — Pvt Ltd, SMC, or sole proprietorship',
      'SECP company incorporation with IT-specific MOA/AOA',
      'FBR NTN and income tax registration',
      'PSEB registration for export benefits',
      'Sales tax and withholding tax registration guidance',
    ],
  },
  {
    slug: 'freelancer-ntn-registration',
    title: 'Freelancer NTN Registration',
    categoryId: 'software-it-services',
    shortDesc: 'NTN registration and FBR Iris profile setup for IT freelancers earning from Upwork, Fiverr, Toptal, and other international platforms.',
    deliverables: [
      'FBR NTN registration for freelancer individuals',
      'FBR Iris portal profile setup and activation',
      'ATL (Active Taxpayer List) status activation',
      'Reduced tax rate guidance under Clause 133',
      'PSEB registration for freelance export income benefits',
    ],
  },
  {
    slug: 'freelancer-tax-filing-it',
    title: 'Freelancer Tax Filing',
    categoryId: 'software-it-services',
    shortDesc: 'Annual income tax return filing for IT freelancers with reduced tax rates on foreign platform income under FBR\'s special freelancer regime.',
    deliverables: [
      'Income computation from all foreign platforms',
      'Reduced tax calculation under IT export exemptions',
      'Wealth statement preparation',
      'FBR Iris return filing and submission',
      'Acknowledgement receipt and compliance advisory',
    ],
  },
  {
    slug: 'software-export-registration',
    title: 'Software Export Registration',
    categoryId: 'software-it-services',
    shortDesc: 'Register your software company as an IT exporter with PSEB and FBR to access reduced tax rates, exemptions, and export incentives.',
    deliverables: [
      'Export eligibility review and PSEB documentation',
      'FBR registration as IT exporter',
      'Export invoice and contract templates guidance',
      'Foreign remittance declaration setup',
      'Annual export compliance and renewal advisory',
    ],
  },
  {
    slug: 'it-company-tax-compliance',
    title: 'IT Company Tax Compliance',
    categoryId: 'software-it-services',
    shortDesc: 'Monthly and annual tax compliance for software houses and IT companies — withholding tax, sales tax, income tax returns, and SECP filings.',
    deliverables: [
      'Monthly withholding tax statements (Section 149/165)',
      'FBR income tax return filing for IT company',
      'Sales tax registration and monthly return filing',
      'SECP annual return and Form A filing',
      'Employee salary tax computation and deductions',
    ],
  },
  {
    slug: 'startup-advisory-it',
    title: 'IT Startup Advisory',
    categoryId: 'software-it-services',
    shortDesc: 'End-to-end startup advisory for Pakistani IT companies — structure, registration, tax planning, and compliance roadmap for early-stage businesses.',
    deliverables: [
      'Business structure selection and cost comparison',
      'SECP incorporation and NTN registration',
      'Tax planning for startup phase — minimize early-stage tax',
      'Investor-ready compliance and documentation setup',
      'Ongoing advisory for first 12 months',
    ],
  },
  {
    slug: 'foreign-remittance-declaration',
    title: 'Foreign Remittance Declaration',
    categoryId: 'software-it-services',
    shortDesc: 'Declare and properly account for foreign income received via Payoneer, Wise, PayPal, or bank transfers in your FBR tax return.',
    deliverables: [
      'Foreign income reconciliation from all payment platforms',
      'FBR return preparation with foreign income disclosure',
      'Exchange rate computation and documentation',
      'Avoidance of double taxation advisory',
      'PSEB export income verification documentation',
    ],
  },
  {
    slug: 'it-sector-sales-tax',
    title: 'IT Sector Sales Tax Advisory',
    categoryId: 'software-it-services',
    shortDesc: 'Sales tax registration, exemption advisory, and monthly filing for IT companies selling software, SaaS, or digital services.',
    deliverables: [
      'Sales tax applicability assessment for IT services',
      'FBR and PRA/SRB sales tax registration',
      'Monthly sales tax return preparation and filing',
      'Exemption documentation for exported IT services',
      'Digital services tax compliance guidance',
    ],
  },

  // Engineering Services
  { slug: 'pec-registration', title: 'PEC Registration', categoryId: 'engineering-services', shortDesc: 'Pakistan Engineering Council (PEC) registration for contractors and engineers.' },
  { slug: 'consultancy-firm-registration', title: 'Consultancy Firm Registration', categoryId: 'engineering-services', shortDesc: 'Registration of engineering consultancy firms with relevant authorities.' },
  { slug: 'professional-compliance', title: 'Professional Compliance', categoryId: 'engineering-services', shortDesc: 'Ongoing statutory and tax compliance for engineering professionals.' },

  // Legal Services
  { slug: 'legal-notices', title: 'Legal Notices', categoryId: 'legal-services', shortDesc: 'Drafting and responding to legal notices and formal communications.' },
  { slug: 'agreements-contracts', title: 'Agreements & Contracts', categoryId: 'legal-services', shortDesc: 'Drafting, review, and vetting of commercial agreements and contracts.' },
  { slug: 'power-of-attorney', title: 'Power of Attorney', categoryId: 'legal-services', shortDesc: 'Preparation and registration of General and Special Power of Attorney.' },
  { slug: 'property-documentation', title: 'Property Documentation', categoryId: 'legal-services', shortDesc: 'Legal documentation for real estate, lease, and property transactions.' },
  { slug: 'business-legal-advisory', title: 'Business Legal Advisory', categoryId: 'legal-services', shortDesc: 'Expert legal consultation for corporate and commercial operations.' },
  {
    slug: 'criminal-law-services',
    title: 'Criminal Law Services',
    categoryId: 'legal-services',
    shortDesc: 'Expert criminal defense, case representation, and legal advocacy in criminal matters.',
    deliverables: [
      'FIR review, bail applications, and pre-arrest bail filings',
      'Trial representation in Sessions Courts and High Courts',
      'Appeals, revisions, and writ petitions in superior courts',
      'Legal opinion on criminal exposure, notices, and inquiries',
      'NAB, FIA, and Anti-Corruption case representation',
      'Cyber crime, narcotics, and white-collar criminal defense',
      'Quashment petitions and stay orders where applicable',
    ],
    typicalDocs: [
      'CNIC (front & back) of the accused and complainant',
      'Copy of FIR / complaint / police challan',
      'Bail order, custody record, or arrest memo (if any)',
      'Witness statements and supporting evidence',
      'Previous court orders or proceedings (if matter is sub-judice)',
      'Power of attorney / Wakalat Nama for legal representation',
    ],
    process: [
      'Initial confidential consultation and case strength assessment',
      'Document collection — FIR, evidence, witness particulars',
      'Drafting of bail application, reply, or petition as required',
      'Court filing, hearing representation, and argument preparation',
      'Order procurement, follow-up filings, and case closure advisory',
    ],
    faqs: [
      { q: 'Do you handle pre-arrest bail and post-arrest bail applications?', a: 'Yes. We file pre-arrest bail before anticipated arrest and post-arrest bail in Sessions and High Courts, including urgent applications where custody is involved.' },
      { q: 'Can you represent in NAB and FIA cases?', a: 'Yes. We represent clients in NAB references, FIA inquiries, anti-corruption proceedings, and cyber crime matters before specialized courts and tribunals.' },
      { q: 'What is the typical timeline for a bail order?', a: 'Pre-arrest bail can be heard within 1–3 working days. Post-arrest bail timelines depend on the court schedule and offense category — usually 1–4 weeks.' },
      { q: 'Do you handle appeals against criminal convictions?', a: 'Yes. We file criminal appeals, revisions, and constitutional petitions in High Courts and the Supreme Court of Pakistan against trial court convictions.' },
    ],
  },
  {
    slug: 'civil-law-services',
    title: 'Civil Law Services',
    categoryId: 'legal-services',
    shortDesc: 'Civil litigation, dispute resolution, and property law expertise.',
    deliverables: [
      'Civil suit drafting and filing — recovery, declaration, injunction',
      'Property disputes, partition suits, and title verification',
      'Rent, ejectment, and landlord-tenant matters',
      'Specific performance of contract and damages claims',
      'Family matters — guardianship, succession, dissolution suits',
      'Banking and recovery suits before Banking Courts',
      'Execution proceedings, decree enforcement, and appeals',
    ],
    typicalDocs: [
      'CNIC of plaintiff/defendant and party particulars',
      'Title documents — sale deed, mutation, fard, allotment letter',
      'Agreement / contract / rent deed (if contractual matter)',
      'Previous notices, correspondence, and legal communications',
      'Site map, building plan, or possession proof (for property suits)',
      'Power of attorney / Wakalat Nama for representation',
    ],
    process: [
      'Case assessment — review documents and merits of the claim',
      'Pre-litigation legal notice issuance where appropriate',
      'Plaint drafting, court fee assessment, and filing of suit',
      'Hearings, evidence recording, and final arguments',
      'Decree procurement, execution, or appeal as required',
    ],
    faqs: [
      { q: 'What types of civil suits do you handle?', a: 'We handle declaration, recovery, injunction, specific performance, partition, possession, ejectment, damages, and family suits across civil and family courts in Pakistan.' },
      { q: 'Can you assist with property title verification before purchase?', a: 'Yes. We conduct full title searches at the registrar/revenue office, verify mutation, NOC, and provide a written legal opinion before any property transaction.' },
      { q: 'Do you handle rent and ejectment matters?', a: 'Yes. We represent both landlords and tenants in rent tribunals and civil courts for ejectment, rent fixation, and recovery of arrears.' },
      { q: 'How long does a civil case take in Pakistan?', a: 'Civil suit timelines vary by court load and complexity — typically 1–3 years at trial level. We pursue interim relief (stay/injunction) early to protect client interests.' },
    ],
  },

  // Visa & Immigration Tax Services
  { slug: 'ntn-for-visa-purpose', title: 'NTN for Visa Purpose', categoryId: 'visa-immigration-tax-services', shortDesc: 'NTN registration and tax profile setup specifically for visa applications.' },
  { slug: 'income-proof-documentation', title: 'Income Proof Documentation', categoryId: 'visa-immigration-tax-services', shortDesc: 'Preparation of verified income proof documents for immigration files.' },
  { slug: 'wealth-statement-for-visa', title: 'Wealth Statement for Visa', categoryId: 'visa-immigration-tax-services', shortDesc: 'Wealth statements drafted appropriately for embassy requirements.' },
  { slug: 'filer-status-activation', title: 'Filer Status Activation', categoryId: 'visa-immigration-tax-services', shortDesc: 'Fast-track activation of Active Taxpayer (Filer) status.' },
  { slug: 'bank-statement-support', title: 'Bank Statement Support', categoryId: 'visa-immigration-tax-services', shortDesc: 'Reconciliation and documentation support related to bank statements.' },
  { slug: 'embassy-tax-documents', title: 'Embassy Tax Documents', categoryId: 'visa-immigration-tax-services', shortDesc: 'Preparation of tax compliance certificates requested by embassies.' },

  // Overseas Pakistani Tax Services
  { slug: 'overseas-tax-filing', title: 'Overseas Tax Filing', categoryId: 'overseas-pakistani-tax-services', shortDesc: 'Tax return filing and compliance for non-resident Pakistanis.' },
  { slug: 'section-236c-236k-guidance', title: 'Section 236C & 236K Guidance', categoryId: 'overseas-pakistani-tax-services', shortDesc: 'Guidance on tax deductions for property purchase and sale.' },
  { slug: 'exemption-certificates-overseas', title: 'Exemption Certificates', categoryId: 'overseas-pakistani-tax-services', shortDesc: 'Processing tax exemption certificates for overseas remittances.' },
  { slug: 'foreign-income-advisory', title: 'Foreign Income Advisory', categoryId: 'overseas-pakistani-tax-services', shortDesc: 'Advisory on the taxation of foreign-source income and assets.' },
  { slug: 'double-taxation-support', title: 'Double Taxation Support', categoryId: 'overseas-pakistani-tax-services', shortDesc: 'Relief and compliance under Double Taxation Treaties.' },
  { slug: 'tax-residency-certificate', title: 'Tax Residency Certificate', categoryId: 'overseas-pakistani-tax-services', shortDesc: 'Obtaining Tax Residency Certificates for claiming international tax benefits.' },

  // Certificates & Compliance
  { slug: 'dnfbp-registration', title: 'DNFBP Registration', categoryId: 'certificates-compliance', shortDesc: 'Registration and compliance for Designated Non-Financial Businesses and Professions.' },
  { slug: 'tax-clearance-certificates', title: 'Tax Clearance Certificates', categoryId: 'certificates-compliance', shortDesc: 'Issuance of tax clearance certificates from relevant tax authorities.' },
  { slug: 'atl-status-certificate', title: 'ATL Status Certificate', categoryId: 'certificates-compliance', shortDesc: 'Official certification of Active Taxpayer List (ATL) status.' },
  { slug: 'income-certificates', title: 'Income Certificates', categoryId: 'certificates-compliance', shortDesc: 'Verified income certificates for loans, visas, and other purposes.' },
  { slug: 'exemption-certificates', title: 'Exemption Certificates', categoryId: 'certificates-compliance', shortDesc: 'Processing of specific tax exemption certificates with FBR.' },
  { slug: 'lower-tax-certificates', title: 'Lower Tax Certificates', categoryId: 'certificates-compliance', shortDesc: 'Application for reduced withholding tax rate certificates.' },
  { slug: 'non-resident-certificates', title: 'Non-Resident Certificates', categoryId: 'certificates-compliance', shortDesc: 'Certificates confirming non-resident tax status for individuals.' },

  // High Demand Individual Services
  { slug: 'salaried-tax-filing', title: 'Salaried Tax Filing', categoryId: 'high-demand-individual-services', shortDesc: 'Quick and accurate annual tax return filing for salaried employees.' },
  { slug: 'freelancer-tax-filing', title: 'Freelancer Tax Filing', categoryId: 'high-demand-individual-services', shortDesc: 'Tax filing and compliance solutions tailored for freelancers.' },
  { slug: 'property-capital-gain-tax', title: 'Property Capital Gain Tax', categoryId: 'high-demand-individual-services', shortDesc: 'Calculation and filing of capital gain tax on property sales.' },
  { slug: 'property-tax-advisory', title: 'Property Tax Advisory', categoryId: 'high-demand-individual-services', shortDesc: 'Advisory on provincial property taxes, valuation, and transfers.' },
  { slug: 'vehicle-token-tax-guidance', title: 'Vehicle Token Tax Guidance', categoryId: 'high-demand-individual-services', shortDesc: 'Guidance and processing of vehicle token tax and filer benefits.' },
  { slug: 'non-filer-to-filer', title: 'Non-Filer to Filer', categoryId: 'high-demand-individual-services', shortDesc: 'Complete conversion from non-filer to active taxpayer status.' },
  { slug: 'backlog-tax-filing', title: 'Backlog Tax Filing', categoryId: 'high-demand-individual-services', shortDesc: 'Filing of missed or previous years\' tax returns to clear backlogs.' },

  // Audit & Investigation
  { slug: 'fbr-audit-representation', title: 'FBR Audit Representation', categoryId: 'audit-investigation', shortDesc: 'Professional representation before FBR during tax audits.' },
  { slug: 'investigation-handling', title: 'Investigation Handling', categoryId: 'audit-investigation', shortDesc: 'Management and defense for tax investigations and inquiries.' },
  { slug: 'legal-responses', title: 'Legal Responses', categoryId: 'audit-investigation', shortDesc: 'Drafting of formal legal responses to show-cause notices.' },
  { slug: 'penalty-settlement', title: 'Penalty Settlement', categoryId: 'audit-investigation', shortDesc: 'Negotiation and settlement of tax penalties and default surcharges.' },

  // Business & Tax Planning
  { slug: 'tax-structuring', title: 'Tax Structuring', categoryId: 'business-tax-planning', shortDesc: 'Structuring of business transactions and entities for tax efficiency.' },
  { slug: 'salary-vs-dividend-planning', title: 'Salary vs Dividend Planning', categoryId: 'business-tax-planning', shortDesc: 'Analysis and planning for optimal remuneration extraction from companies.' },
  { slug: 'expense-optimization', title: 'Expense Optimization', categoryId: 'business-tax-planning', shortDesc: 'Review of business expenses to maximize allowable tax deductions.' },
  { slug: 'tax-saving-consultancy', title: 'Tax Saving Consultancy', categoryId: 'business-tax-planning', shortDesc: 'Expert consultancy to identify and implement lawful tax savings.' },

  // Additional Registrations
  { slug: 'ngo-registration', title: 'NGO Registration', categoryId: 'additional-registrations', shortDesc: 'Registration of Non-Governmental Organizations, trusts, and societies.' },
  { slug: 'import-export-license', title: 'Import Export License', categoryId: 'additional-registrations', shortDesc: 'Assistance in obtaining import and export licenses (WeBOC).' },
  { slug: 'psw-registration', title: 'PSW Registration', categoryId: 'additional-registrations', shortDesc: 'Pakistan Single Window (PSW) registration for traders and forwarders.' },
  { slug: 'e-commerce-setup', title: 'E-Commerce Setup', categoryId: 'additional-registrations', shortDesc: 'Legal and tax setup guidance for e-commerce businesses.' },
  { slug: 'pra-srb-registrations', title: 'PRA/SRB Registrations', categoryId: 'additional-registrations', shortDesc: 'Registration with provincial revenue authorities for services.' },
  { slug: 'import-export-ntn', title: 'Import Export NTN', categoryId: 'additional-registrations', shortDesc: 'Addition of import/export business in FBR NTN profile.' },

  // UAE Tax Services
  { slug: 'uae-vat-registration', title: 'UAE VAT Registration', categoryId: 'uae-tax-services', shortDesc: 'UAE Value Added Tax (VAT) registration and onboarding.' },
  { slug: 'corporate-tax-registration', title: 'Corporate Tax Registration', categoryId: 'uae-tax-services', shortDesc: 'Registration for UAE Corporate Tax and compliance setup.' },
  { slug: 'uae-business-setup', title: 'UAE Business Setup', categoryId: 'uae-tax-services', shortDesc: 'Company formation and mainland/freezone business setup in UAE.' },
  { slug: 'uae-tax-advisory', title: 'UAE Tax Advisory', categoryId: 'uae-tax-services', shortDesc: 'Comprehensive tax advisory for businesses operating in the UAE.' },

  // USA Tax Services
  { slug: 'usa-llc-registration', title: 'USA LLC Registration', categoryId: 'usa-tax-services', shortDesc: 'Formation and registration of LLCs in the United States.' },
  { slug: 'ein-itin', title: 'EIN & ITIN', categoryId: 'usa-tax-services', shortDesc: 'Application processing for Employer Identification Number and ITIN.' },
  { slug: 'irs-tax-filing', title: 'IRS Tax Filing', categoryId: 'usa-tax-services', shortDesc: 'Preparation and filing of US federal and state tax returns.' },
  { slug: 'stripe-paypal-guidance', title: 'Stripe/PayPal Guidance', categoryId: 'usa-tax-services', shortDesc: 'Guidance on setting up US-based payment gateways.' },
  { slug: 'non-resident-consultancy', title: 'Non-Resident Consultancy', categoryId: 'usa-tax-services', shortDesc: 'Tax consultancy for non-resident aliens and foreign-owned US LLCs.' },

  // Saudi Arabia (KSA) — ZATCA & Taxation
  { slug: 'zatca-vat-registration', title: 'VAT Registration (ZATCA)', categoryId: 'ksa-tax-services', shortDesc: 'Saudi Arabia VAT registration with the Zakat, Tax and Customs Authority (ZATCA).' },
  { slug: 'ksa-vat-return-filing', title: 'VAT Return Filing & Compliance', categoryId: 'ksa-tax-services', shortDesc: 'Preparation and submission of periodic VAT returns under Saudi ZATCA rules.' },
  { slug: 'ksa-corporate-tax-registration', title: 'Corporate Income Tax (Foreign Companies)', categoryId: 'ksa-tax-services', shortDesc: 'Corporate tax registration and filing for foreign companies operating in Saudi Arabia.' },
  { slug: 'ksa-zakat-filing', title: 'Zakat Calculation & Filing', categoryId: 'ksa-tax-services', shortDesc: 'Annual Zakat calculation and filing for Saudi-owned businesses with ZATCA.' },
  { slug: 'ksa-withholding-tax', title: 'Withholding Tax Advisory & Filing', categoryId: 'ksa-tax-services', shortDesc: 'Advisory and compliance support for Saudi withholding tax on payments to non-residents.' },
  { slug: 'fatoora-einvoicing', title: 'E-Invoicing (FATOORA) Compliance', categoryId: 'ksa-tax-services', shortDesc: 'FATOORA e-invoicing integration and compliance for VAT-registered businesses in KSA.' },
  { slug: 'zatca-audit-notices', title: 'ZATCA Notices, Audit & Penalty Handling', categoryId: 'ksa-tax-services', shortDesc: 'Professional representation and response for ZATCA audits, notices, and penalties.' },

  // Saudi Arabia — Business Setup
  { slug: 'ksa-company-registration', title: 'Company Registration in Saudi Arabia', categoryId: 'ksa-tax-services', shortDesc: 'End-to-end company formation and legal registration for businesses in KSA.' },
  { slug: 'ksa-foreign-branch', title: 'Foreign Company Branch Registration', categoryId: 'ksa-tax-services', shortDesc: 'Registration of a foreign company branch or representative office in Saudi Arabia.' },
  { slug: 'ksa-commercial-registration', title: 'Commercial Registration (CR) Assistance', categoryId: 'ksa-tax-services', shortDesc: 'Obtaining and maintaining the Saudi Commercial Registration (CR) for businesses.' },
  { slug: 'ksa-tax-file-registration', title: 'Tax File Registration with ZATCA', categoryId: 'ksa-tax-services', shortDesc: 'Opening a tax file with ZATCA for newly established companies in Saudi Arabia.' },
  { slug: 'ksa-business-licensing', title: 'Business Licensing & Setup Support', categoryId: 'ksa-tax-services', shortDesc: 'Guidance on sector-specific licenses and regulatory approvals in Saudi Arabia.' },

  // Cross-Border Pakistan–Saudi Services
  { slug: 'saudi-freelancer-tax', title: 'Saudi Freelancers & Contractors Tax Advisory', categoryId: 'ksa-tax-services', shortDesc: 'Tax advisory for Pakistani freelancers and contractors earning from Saudi clients.' },
  { slug: 'pak-ksa-remittance-guidance', title: 'Foreign Income & Remittance Guidance', categoryId: 'ksa-tax-services', shortDesc: 'Tax guidance on remittances from Saudi Arabia to Pakistan and declaration requirements.' },
  { slug: 'pak-ksa-double-taxation', title: 'Double Taxation Advisory (Pakistan–KSA)', categoryId: 'ksa-tax-services', shortDesc: 'Advisory on Pakistan–Saudi Arabia double taxation treaty benefits and relief claims.' },
  { slug: 'ksa-export-services-tax', title: 'Export of Services Tax Structuring', categoryId: 'ksa-tax-services', shortDesc: 'Tax structuring for Pakistani businesses exporting services to Saudi Arabia.' },
  { slug: 'ksa-international-compliance', title: 'Compliance Support for International Clients', categoryId: 'ksa-tax-services', shortDesc: 'Ongoing tax and regulatory compliance support for businesses with Pakistan–KSA operations.' },

  // Competition Commission Services — Competition Law Compliance Group
  { slug: 'competition-law-advisory', title: 'Competition Law Advisory', categoryId: 'competition-commission-services', shortDesc: 'Expert legal guidance on Pakistan\'s Competition Act — understand your obligations, rights, and exposure under CCP regulations.' },
  { slug: 'business-compliance-reviews', title: 'Business Compliance Reviews', categoryId: 'competition-commission-services', shortDesc: 'Full audit of your business operations to assess competition law alignment and identify risks before the CCP does.' },
  { slug: 'anti-competitive-practice-assessment', title: 'Anti-Competitive Practice Assessment', categoryId: 'competition-commission-services', shortDesc: 'Identify and eliminate business practices that may violate competition law — pricing, supply, market sharing, and exclusivity.' },
  { slug: 'corporate-compliance-policies', title: 'Corporate Compliance Policies', categoryId: 'competition-commission-services', shortDesc: 'Draft and implement internal competition compliance frameworks, codes of conduct, and CCP-compliant operational policies.' },
  { slug: 'competition-risk-analysis', title: 'Competition Risk Analysis', categoryId: 'competition-commission-services', shortDesc: 'Sector-specific competition risk assessment identifying areas of CCP exposure and providing a risk mitigation roadmap.' },

  // Competition Commission Services — Merger & Acquisition Group
  { slug: 'pre-merger-notification-filing', title: 'Pre-Merger Notification Filing', categoryId: 'competition-commission-services', shortDesc: 'Timely and accurate pre-merger notification filing with the CCP before completing any merger or acquisition transaction.' },
  { slug: 'merger-approval-consultancy', title: 'Merger Approval Consultancy', categoryId: 'competition-commission-services', shortDesc: 'Strategic guidance through the CCP merger approval process — from initial assessment to final clearance.' },
  { slug: 'acquisition-compliance-assistance', title: 'Acquisition Compliance Assistance', categoryId: 'competition-commission-services', shortDesc: 'Ensure your acquisition meets all CCP regulatory requirements, thresholds, and notification obligations.' },
  { slug: 'transaction-documentation-support', title: 'Transaction Documentation Support', categoryId: 'competition-commission-services', shortDesc: 'Prepare all legal and regulatory documents required for M&A transactions including CCP filings and merger agreements.' },

  // Competition Commission Services — CCP Legal & Regulatory Group
  { slug: 'competition-commission-notices-handling', title: 'Competition Commission Notices Handling', categoryId: 'competition-commission-services', shortDesc: 'Professional management of all CCP notices — review, assessment, strategy, and timely response to keep your business protected.' },
  { slug: 'reply-to-ccp-notices', title: 'Reply to CCP Notices', categoryId: 'competition-commission-services', shortDesc: 'Legally sound, professionally drafted replies to all CCP show-cause notices, enquiry letters, and regulatory correspondence.' },
  { slug: 'regulatory-representation-ccp', title: 'Regulatory Representation', categoryId: 'competition-commission-services', shortDesc: 'Represent your business before the Competition Commission of Pakistan in hearings, enquiries, and formal proceedings.' },
  { slug: 'compliance-documentation-preparation', title: 'Compliance Documentation Preparation', categoryId: 'competition-commission-services', shortDesc: 'Prepare and organise all compliance documentation, submissions, and filings required by CCP regulations.' },
  { slug: 'investigation-support-ccp', title: 'Investigation Support', categoryId: 'competition-commission-services', shortDesc: 'Comprehensive support during CCP investigations — document management, legal defence strategy, and regulatory liaison.' },

  // Competition Commission Services — Anti-Competitive Conduct Group
  { slug: 'cartel-collusion-risk-assessment', title: 'Cartel & Collusion Risk Assessment', categoryId: 'competition-commission-services', shortDesc: 'Identify and mitigate cartel exposure in your industry — assess supplier agreements, pricing coordination, and market-sharing risks.' },
  { slug: 'abuse-of-dominant-position-consultancy', title: 'Abuse of Dominant Position Consultancy', categoryId: 'competition-commission-services', shortDesc: 'Advisory for market-dominant businesses on lawful conduct, fair dealing, and CCP obligations under Section 3 of the Competition Act.' },
  { slug: 'price-fixing-compliance-advisory', title: 'Price Fixing Compliance Advisory', categoryId: 'competition-commission-services', shortDesc: 'Ensure your pricing strategies, resale price maintenance, and pricing communications are fully compliant with competition law.' },
  { slug: 'bid-rigging-compliance', title: 'Bid Rigging Compliance', categoryId: 'competition-commission-services', shortDesc: 'Review tendering processes, procurement policies, and bidding practices to eliminate bid-rigging risks and CCP liability.' },
  { slug: 'distribution-dealer-agreement-review', title: 'Distribution & Dealer Agreement Review', categoryId: 'competition-commission-services', shortDesc: 'Review and redraft distribution, dealership, and franchise agreements to ensure full CCP compliance and market fairness.' },

  // Competition Commission Services — Consumer Protection Group
  { slug: 'misleading-advertisement-review', title: 'Misleading Advertisement Review', categoryId: 'competition-commission-services', shortDesc: 'Audit advertising and marketing materials for deceptive claims, misleading comparisons, and violations of CCP consumer protection rules.' },
  { slug: 'fair-competition-advisory', title: 'Fair Competition Advisory', categoryId: 'competition-commission-services', shortDesc: 'Ensure all promotional, pricing, and sales practices meet CCP standards for fair market competition and honest dealing.' },
  { slug: 'market-practice-compliance', title: 'Market Practice Compliance', categoryId: 'competition-commission-services', shortDesc: 'Review and align sales tactics, market conduct, and commercial practices with CCP\'s fair trade requirements.' },
  { slug: 'consumer-rights-compliance', title: 'Consumer Rights Compliance', categoryId: 'competition-commission-services', shortDesc: 'Align business operations, contracts, and customer communications with consumer rights obligations under CCP regulations.' },

  // Competition Commission Services — Training Group
  { slug: 'competition-law-training', title: 'Competition Law Training', categoryId: 'competition-commission-services', shortDesc: 'In-depth competition law training sessions for management teams on CCP regulations, obligations, and risk avoidance.' },
  { slug: 'compliance-workshops', title: 'Compliance Workshops', categoryId: 'competition-commission-services', shortDesc: 'Interactive compliance workshops that equip your team to identify, avoid, and report competition law violations internally.' },
  { slug: 'employee-awareness-sessions', title: 'Employee Awareness Sessions', categoryId: 'competition-commission-services', shortDesc: 'Accessible staff training on competition law do\'s and don\'ts — designed for all levels from frontline to senior management.' },
  { slug: 'corporate-ethics-compliance-programs', title: 'Corporate Ethics & Compliance Programs', categoryId: 'competition-commission-services', shortDesc: 'Design and implement company-wide ethics and compliance programmes that embed competition law awareness in your culture.' },

  // Competition Commission Services — Sector Specific Group
  { slug: 'real-estate-competition-compliance', title: 'Real Estate Competition Compliance', categoryId: 'competition-commission-services', shortDesc: 'Competition law compliance for real estate businesses — pricing transparency, agency agreements, and market conduct advisory.' },
  { slug: 'ecommerce-competition-advisory', title: 'E-Commerce Competition Advisory', categoryId: 'competition-commission-services', shortDesc: 'Platform rules, algorithm-based pricing, data practices, and marketplace dominance advisory for e-commerce businesses.' },
  { slug: 'pharmaceutical-sector-compliance', title: 'Pharmaceutical Sector Compliance', categoryId: 'competition-commission-services', shortDesc: 'Competition compliance for pharma companies — drug pricing, distribution licensing, exclusivity, and CCP regulatory filings.' },
  { slug: 'fmcg-competition-consultancy', title: 'FMCG Competition Consultancy', categoryId: 'competition-commission-services', shortDesc: 'Competition law guidance for FMCG businesses — trade terms, promotional pricing, retailer agreements, and distribution practices.' },
  { slug: 'digital-business-competition-compliance', title: 'Digital Business Competition Compliance', categoryId: 'competition-commission-services', shortDesc: 'Advisory on platform dominance, data-sharing, algorithm transparency, and digital market competition obligations.' },

  // Competition Commission Services — Documentation & Filing Group
  { slug: 'ccp-legal-drafting', title: 'Legal Drafting', categoryId: 'competition-commission-services', shortDesc: 'Competition law-compliant drafting of contracts, agreements, distribution policies, and corporate governance documents.' },
  { slug: 'competition-compliance-reports', title: 'Compliance Reports', categoryId: 'competition-commission-services', shortDesc: 'Prepare detailed competition law compliance status reports for management, boards, and regulatory authorities.' },
  { slug: 'corporate-responses-submissions', title: 'Corporate Responses & Submissions', categoryId: 'competition-commission-services', shortDesc: 'Draft and submit formal corporate responses, objections, and regulatory submissions to the Competition Commission of Pakistan.' },
  { slug: 'regulatory-filing-assistance', title: 'Regulatory Filing Assistance', categoryId: 'competition-commission-services', shortDesc: 'Ensure all required competition law documents, forms, and notifications are filed with CCP accurately and on time.' },
  { slug: 'policy-drafting-documentation', title: 'Policy Drafting & Documentation', categoryId: 'competition-commission-services', shortDesc: 'Create internal competition compliance policies, codes of conduct, and standard operating procedures aligned with CCP requirements.' },

  // SECP Related Services
  {
    slug: 'private-limited-company-registration',
    title: 'Private Limited Company Registration',
    categoryId: 'secp-related-services',
    shortDesc: 'Full Pvt Ltd company incorporation on SECP eServices — name reservation, MOA/AOA drafting, and certificate of incorporation.',
    deliverables: [
      'Company name availability check & reservation',
      'Memorandum & Articles of Association (MOA/AOA) drafting',
      'SECP eServices registration and submission',
      'Certificate of Incorporation',
      'NTN registration with FBR',
      'Company seal and statutory registers guidance',
    ],
  },
  {
    slug: 'single-member-company-registration',
    title: 'Single Member Company Registration',
    categoryId: 'secp-related-services',
    shortDesc: 'Register a Single Member Company (SMC) with SECP — ideal for sole owners who want limited liability protection.',
    deliverables: [
      'SMC name availability check & reservation',
      'MOA/AOA drafting for single-member structure',
      'SECP eServices filing and approval',
      'Certificate of Incorporation (SMC)',
      'FBR NTN registration for the company',
    ],
  },
  {
    slug: 'change-of-company-name',
    title: 'Change of Company Name',
    categoryId: 'secp-related-services',
    shortDesc: 'Officially change your registered company name with SECP — special resolution, SECP approval, and updated incorporation certificate.',
    deliverables: [
      'Name availability check for new name',
      'Board resolution and special resolution drafting',
      'SECP eServices filing for name change',
      'Updated Certificate of Incorporation',
      'Amended MOA/AOA with new company name',
    ],
  },
  {
    slug: 'ubo-filing',
    title: 'UBO Filing (Ultimate Beneficial Owner)',
    categoryId: 'secp-related-services',
    shortDesc: 'Mandatory UBO declaration filing with SECP — identifying and registering beneficial owners who control 25%+ of the company.',
    deliverables: [
      'UBO identification and eligibility review',
      'Beneficial owner declaration preparation',
      'SECP eServices UBO filing',
      'Annual UBO update if required',
      'Compliance confirmation documentation',
    ],
  },
  {
    slug: 'increase-in-authorized-capital',
    title: 'Increase in Authorized Capital',
    categoryId: 'secp-related-services',
    shortDesc: 'Increase your company\'s authorized share capital through SECP — special resolution, Form 5 filing, and payment of requisite fees.',
    deliverables: [
      'Board and special resolution drafting',
      'Form 5 filing with SECP',
      'SECP fee calculation and payment guidance',
      'Updated MOA reflecting new capital',
      'Confirmation of increased authorized capital',
    ],
  },
  {
    slug: 'director-change-transfer',
    title: 'Director Change / Transfer',
    categoryId: 'secp-related-services',
    shortDesc: 'Add, remove, or change directors in your SECP-registered company — Form 29 filing, consent letters, and board resolutions.',
    deliverables: [
      'Board resolution for director appointment/removal',
      'Director consent letter and CNIC verification',
      'Form 29 filing with SECP eServices',
      'Updated company register of directors',
      'SECP approval confirmation',
    ],
  },
  {
    slug: 'annual-returns-filing',
    title: 'Annual Returns Filing (Form A)',
    categoryId: 'secp-related-services',
    shortDesc: 'Timely filing of SECP Annual Return (Form A) and financial statements to avoid penalties and maintain good standing.',
    deliverables: [
      'Form A preparation and review',
      'Financial statements formatting (if provided)',
      'SECP eServices submission',
      'Annual filing confirmation receipt',
      'Next deadline reminder and compliance calendar',
    ],
  },
  {
    slug: 'company-dissolution-closure',
    title: 'Company Dissolution / Closure',
    categoryId: 'secp-related-services',
    shortDesc: 'Legally wind up and close your SECP-registered company — voluntary winding up, Form 48 filing, and FBR deregistration.',
    deliverables: [
      'Board and special resolution for winding up',
      'Form 48 (Application for Striking Off) preparation',
      'SECP eServices filing for dissolution',
      'FBR NTN deactivation/deregistration',
      'Clearance certificate and closure confirmation',
    ],
  },
  {
    slug: 'share-transfer-documentation',
    title: 'Share Transfer Documentation',
    categoryId: 'secp-related-services',
    shortDesc: 'Transfer shares between shareholders with proper legal documentation — share transfer deed, board approval, and SECP update.',
    deliverables: [
      'Share Transfer Deed drafting',
      'Board resolution approving the transfer',
      'Updated Register of Members',
      'New share certificate issuance',
      'SECP filing update (if required)',
    ],
  },
  {
    slug: 'form-a-form-29-filing',
    title: 'Form A / Form 29 Filing',
    categoryId: 'secp-related-services',
    shortDesc: 'Accurate and timely filing of SECP statutory forms — Form A (Annual Return) and Form 29 (Change in Directors/Officers).',
    deliverables: [
      'Form A / Form 29 preparation and review',
      'Supporting documents checklist and verification',
      'SECP eServices online submission',
      'Filing receipt and acknowledgement',
      'Penalty avoidance guidance and deadlines',
    ],
  },

  // UK Tax Services
  { slug: 'uk-self-assessment', title: 'UK Self Assessment Tax Return', categoryId: 'uk-tax-services', shortDesc: 'HMRC Self Assessment filing for Pakistanis living, working, or running businesses in the UK.' },
  { slug: 'uk-utr-registration', title: 'UTR Number Registration (HMRC)', categoryId: 'uk-tax-services', shortDesc: 'Register with HMRC and obtain your Unique Taxpayer Reference (UTR) number quickly.' },
  { slug: 'uk-company-formation', title: 'UK Limited Company Formation', categoryId: 'uk-tax-services', shortDesc: 'Remote UK company registration via Companies House — including registered office address.' },
  { slug: 'uk-vat-registration', title: 'UK VAT Registration & Returns', categoryId: 'uk-tax-services', shortDesc: 'HMRC VAT registration, quarterly VAT return filing, and Making Tax Digital compliance.' },
  { slug: 'uk-payroll-paye', title: 'UK Payroll & PAYE Setup', categoryId: 'uk-tax-services', shortDesc: 'Employer PAYE registration and payroll management for UK businesses.' },
  { slug: 'uk-double-taxation', title: 'Pakistan–UK Double Taxation Advisory', categoryId: 'uk-tax-services', shortDesc: 'Advice on the Pakistan–UK Double Taxation Agreement to avoid being taxed in both countries.' },
  { slug: 'uk-rental-income-tax', title: 'UK Rental Income Tax Filing', categoryId: 'uk-tax-services', shortDesc: 'Declaration and tax filing for rental income earned from UK properties.' },
  { slug: 'uk-fbr-foreign-income', title: 'FBR Declaration for UK Income', categoryId: 'uk-tax-services', shortDesc: 'Declare UK-sourced income in Pakistan FBR returns and manage foreign income compliance.' },
];

export const SERVICE_SUBSERVICES = RAW_SUBSERVICES.map((service) => ({
  ...service,
  metaTitle: service.metaTitle || buildMetaTitle(service.title),
  metaDescription: service.metaDescription || buildMetaDescription(service.title, service.shortDesc),
  deliverables: service.deliverables || DEFAULT_DELIVERABLES,
  process: service.process || getServiceProcess(service.categoryId),
  typicalDocs: service.typicalDocs || getServiceDocs(service.categoryId),
  faqs: service.faqs || buildFaqs(service.title),
  serviceType: service.serviceType || service.title,
}));

export const CATEGORY_MAP = new Map(SERVICE_CATEGORIES.map((category) => [category.slug, category]));
export const SUBSERVICE_MAP = new Map(SERVICE_SUBSERVICES.map((service) => [service.slug, service]));

export const getCategoryBySlug = (slug) => CATEGORY_MAP.get(slug);
export const getSubserviceBySlug = (slug) => SUBSERVICE_MAP.get(slug);
export const getSubservicesByCategory = (categoryId) =>
  SERVICE_SUBSERVICES.filter((service) => service.categoryId === categoryId);
