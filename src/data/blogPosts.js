export const BLOG_CATEGORIES = [
  { id: 'all',         label: 'All Articles' },
  { id: 'income-tax',  label: 'Income Tax' },
  { id: 'business',    label: 'Business & SECP' },
  { id: 'freelancer',  label: 'Freelancers & IT' },
  { id: 'overseas',    label: 'Overseas Pakistanis' },
  { id: 'sales-tax',   label: 'Sales Tax & GST' },
  { id: 'property',    label: 'Property & CGT' },
  { id: 'international', label: 'International Tax' },
];

export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'income-tax-slabs-2025-26-pakistan',
    title: 'Pakistan Income Tax Slabs 2025–26: Complete Guide for Salaried & Business Individuals',
    excerpt: 'The Finance Act 2025 has revised income tax slabs for salaried persons and business individuals. Here is everything you need to know about the new rates, exemptions, and how to calculate your tax liability for FY 2025–26.',
    category: 'income-tax',
    author: 'Tax Zilla Team',
    date: 'May 10, 2026',
    readTime: '8 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Income Tax', 'FBR', 'Tax Slabs', '2025-26'],
    content: `Pakistan's Finance Act 2025 introduced revised income tax slabs effective from 1 July 2025. Understanding these changes is critical for tax planning.

**Salaried Individuals (FY 2025–26)**
The revised slabs for salaried persons are as follows — income up to Rs. 600,000 remains exempt from tax. Income between Rs. 600,001 and Rs. 1,200,000 is taxed at 5%. Higher income brackets attract progressively higher rates up to 35% for income exceeding Rs. 6,000,000.

**Business Individuals & AOPs**
The tax treatment for business income differs from salary. Business individuals are taxed on their net income after allowable deductions at slab rates starting from 15% for income above Rs. 600,000.

**Key Changes This Year**
The major changes include revised lower slabs for salaried taxpayers, new advance tax provisions, and enhanced withholding obligations for various transactions.

**What You Should Do**
Review your income against the new slabs, ensure your employer is deducting the correct amount, and plan any advance tax payments before the due dates.`,
  },
  {
    id: 2,
    slug: 'freelancer-tax-guide-pakistan-2025',
    title: 'Complete Tax Guide for Pakistani Freelancers in 2025: Upwork, Fiverr & Payoneer',
    excerpt: 'Are you a Pakistani freelancer earning from Upwork, Fiverr, or international clients? This guide covers everything — NTN registration, tax rates under Clause 133, PSEB benefits, and how to legally minimize your tax liability.',
    category: 'freelancer',
    author: 'Tax Zilla Team',
    date: 'May 7, 2026',
    readTime: '10 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    tags: ['Freelancer', 'Clause 133', 'PSEB', 'Upwork', 'Fiverr'],
    content: `Pakistani freelancers are among the most rapidly growing taxpayer segments. Here is a complete breakdown of your tax obligations and benefits.`,
  },
  {
    id: 3,
    slug: 'property-capital-gains-tax-pakistan-2025',
    title: 'Capital Gains Tax on Property in Pakistan 2025–26: Slabs, Holding Period & Filer Rules',
    excerpt: 'Selling a property in Pakistan? Capital Gains Tax depends on your holding period, FBR valuation, and whether you are a filer or non-filer. This guide explains all CGT slabs, Section 236C/236K withholding, and how to minimize your tax.',
    category: 'property',
    author: 'Tax Zilla Team',
    date: 'May 4, 2026',
    readTime: '9 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    tags: ['CGT', 'Property Tax', 'Section 236C', 'Real Estate'],
    content: `Capital Gains Tax on property is one of the most complex areas of Pakistani tax law. Here is what every property buyer and seller must know.`,
  },
  {
    id: 4,
    slug: 'ntn-registration-guide-pakistan',
    title: 'How to Register NTN in Pakistan in 2025: Step-by-Step FBR Iris Guide',
    excerpt: 'NTN registration is the first step to becoming a compliant taxpayer in Pakistan. Whether you are salaried, a business owner, or a freelancer, this step-by-step guide walks you through the entire FBR Iris registration process.',
    category: 'income-tax',
    author: 'Tax Zilla Team',
    date: 'Apr 28, 2026',
    readTime: '7 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    tags: ['NTN', 'FBR Iris', 'Tax Registration', 'ATL'],
    content: `Registering your NTN is simpler than most people think. Here is a complete walkthrough of the FBR Iris portal registration.`,
  },
  {
    id: 5,
    slug: 'secp-company-registration-guide-2025',
    title: 'How to Register a Private Limited Company in Pakistan (SECP) — 2025 Guide',
    excerpt: 'Registering a Pvt Ltd company with SECP is now faster than ever through the eServices portal. This guide covers name reservation, MOA/AOA preparation, incorporation steps, fees, and post-registration compliance.',
    category: 'business',
    author: 'Tax Zilla Team',
    date: 'Apr 22, 2026',
    readTime: '11 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    tags: ['SECP', 'Company Registration', 'Pvt Ltd', 'Corporate'],
    content: `Starting a business in Pakistan? Here is the complete SECP company registration process for 2025.`,
  },
  {
    id: 6,
    slug: 'overseas-pakistani-tax-obligations',
    title: 'Overseas Pakistani Tax Guide: What NRPs Must Know About FBR, Property & Remittances',
    excerpt: 'If you are a Pakistani living abroad, you still have tax obligations in Pakistan — especially for property, bank accounts, and remittances. This guide explains NRP tax rules, ATL requirements, TRC certificates, and how to stay compliant.',
    category: 'overseas',
    author: 'Tax Zilla Team',
    date: 'Apr 15, 2026',
    readTime: '9 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    tags: ['Overseas Pakistani', 'NRP', 'Remittances', 'NICOP'],
    content: `Overseas Pakistanis have unique tax obligations. Here is what every NRP must know about their Pakistan tax responsibilities.`,
  },
  {
    id: 7,
    slug: 'uae-corporate-tax-pakistani-businesses',
    title: 'UAE Corporate Tax 2025: What Pakistani Businesses in Dubai Must Know',
    excerpt: 'The UAE introduced Corporate Tax at 9% for businesses earning over AED 375,000. This guide explains who is liable, how to register with the FTA, how it interacts with Pakistan taxes, and the key compliance deadlines.',
    category: 'international',
    author: 'Tax Zilla Team',
    date: 'Apr 8, 2026',
    readTime: '8 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    tags: ['UAE', 'Corporate Tax', 'FTA', 'Dubai'],
    content: `UAE Corporate Tax is now in effect. Pakistani businesses operating in the UAE need to understand their obligations under this new regime.`,
  },
  {
    id: 8,
    slug: 'sales-tax-registration-fbr-guide',
    title: 'FBR Sales Tax Registration in Pakistan: Who Needs It & How to Register',
    excerpt: 'If your business turnover exceeds Rs. 10 million or you supply taxable goods and services, you are required to register for GST/Sales Tax with FBR. This guide explains the eligibility, process, and monthly filing obligations.',
    category: 'sales-tax',
    author: 'Tax Zilla Team',
    date: 'Mar 30, 2026',
    readTime: '7 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sales Tax', 'GST', 'FBR', 'STRN'],
    content: `Sales Tax registration is mandatory for many businesses in Pakistan. Here is everything you need to know about registering with FBR.`,
  },
  {
    id: 9,
    slug: 'active-taxpayer-list-atl-pakistan',
    title: 'Active Taxpayer List (ATL) Pakistan: How to Check Status & Benefits of Being a Filer',
    excerpt: 'The FBR Active Taxpayer List is updated weekly and determines whether you pay standard or enhanced withholding tax rates. This article explains how to check ATL status, the financial benefits of being a filer, and how to get added.',
    category: 'income-tax',
    author: 'Tax Zilla Team',
    date: 'Mar 22, 2026',
    readTime: '6 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['ATL', 'Filer', 'Non-Filer', 'Withholding Tax'],
    content: `Being on the FBR Active Taxpayer List can save you significant money on every financial transaction. Here is how to check and maintain ATL status.`,
  },
  {
    id: 10,
    slug: 'withholding-tax-rates-2025-26',
    title: 'Pakistan Withholding Tax Rates 2025–26: Complete Reference for Filers & Non-Filers',
    excerpt: 'Withholding tax applies to dozens of transactions in Pakistan — salaries, bank withdrawals, property, vehicles, and more. This reference guide covers all major withholding tax sections and the different rates for filers and non-filers.',
    category: 'income-tax',
    author: 'Tax Zilla Team',
    date: 'Mar 15, 2026',
    readTime: '12 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Withholding Tax', 'WHT', 'Rates', 'Filer'],
    content: `A comprehensive reference for all withholding tax rates applicable in Pakistan for FY 2025–26.`,
  },
];

export const getFeaturedPosts = () => BLOG_POSTS.filter(p => p.featured);
export const getPostsByCategory = (cat) =>
  cat === 'all' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === cat);
export const getPostBySlug = (slug) => BLOG_POSTS.find(p => p.slug === slug);
export const getRelatedPosts = (post, limit = 3) =>
  BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, limit);
