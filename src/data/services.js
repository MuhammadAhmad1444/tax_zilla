import { FileText, Users, Building2, Scale, Shield, TrendingUp, Briefcase } from 'lucide-react';

/**
 * Service categories for filtering
 */
export const SERVICE_CATEGORIES = {
  ALL: 'All',
  TAX_SERVICES: 'Tax Services',
  CORPORATE_SERVICES: 'Corporate Services',
  ADVISORY_SERVICES: 'Advisory Services'
};

/**
 * All available services with their details and categories
 */
export const services = [
  {
    id: 'income-tax',
    icon: FileText,
    title: 'Income Tax Filing',
    desc: 'Complete income tax return filing for individuals (salaried & business) and companies.',
    path: '/services/income-tax',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'ntn-registration',
    icon: Users,
    title: 'NTN Registration',
    desc: 'Fast-track NTN registration and profile creation on FBR Iris portal.',
    path: '/services/ntn-registration',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'sales-tax',
    icon: TrendingUp,
    title: 'Sales Tax Services',
    desc: 'Monthly sales tax returns (GST) and PRA/SRB compliance.',
    path: '/services/sales-tax',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'company-registration',
    icon: Building2,
    title: 'Company Registration',
    desc: 'Private Limited, SMC, and Partnership registration with SECP.',
    path: '/services/company-registration',
    category: SERVICE_CATEGORIES.CORPORATE_SERVICES
  },
  {
    id: 'business-compliance',
    icon: Scale,
    title: 'Business Compliance',
    desc: 'Form 29, Form A, and annual statutory compliance management.',
    path: '/services/business-compliance',
    category: SERVICE_CATEGORIES.CORPORATE_SERVICES
  },
  {
    id: 'audit-assistance',
    icon: Shield,
    title: 'Audit Assistance',
    desc: 'Defense and representation against FBR audit notices and inquiries.',
    path: '/services/audit-assistance',
    category: SERVICE_CATEGORIES.ADVISORY_SERVICES
  },
  {
    id: 'freelancers-sme',
    icon: Briefcase,
    title: 'Freelancers & SMEs',
    desc: 'Specialized tax packages for freelancers, IT exporters, and startups.',
    path: '/services/freelancers-sme',
    category: SERVICE_CATEGORIES.ADVISORY_SERVICES
  }
  ,
  {
    id: 'ntn-salaried',
    icon: Users,
    title: 'NTN Registration – Salaried',
    desc: 'Quick NTN setup for salaried individuals with minimal documents.',
    path: '/services/ntn-salaried',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'ntn-business',
    icon: Users,
    title: 'NTN Registration – Business',
    desc: 'NTN registration for sole proprietors and small businesses.',
    path: '/services/ntn-business',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'ntn-partnership',
    icon: Users,
    title: 'NTN Registration – Partnership / AOP',
    desc: 'Registration service tailored to partnership firms and AOPs.',
    path: '/services/ntn-partnership',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'ntn-company',
    icon: Users,
    title: 'NTN Registration – Company / NPO',
    desc: 'NTN registration for companies, associations and non‑profits.',
    path: '/services/ntn-company',
    category: SERVICE_CATEGORIES.CORPORATE_SERVICES
  },
  {
    id: 'withholding-quarterly',
    icon: FileText,
    title: 'Quarterly Withholding Statements',
    desc: 'Preparation and submission of quarterly withholding statements.',
    path: '/services/withholding-quarterly',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'annual-salaried',
    icon: FileText,
    title: 'Annual Income Tax Filing – Salaried',
    desc: 'Complete return preparation for salaried employees.',
    path: '/services/annual-salaried',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'annual-proprietor',
    icon: FileText,
    title: 'Annual Income Tax Filing – Sole Proprietor',
    desc: 'Tax filing support for sole proprietors and small traders.',
    path: '/services/annual-proprietor',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'gst-registration',
    icon: TrendingUp,
    title: 'GST / Sales Tax Registration',
    desc: 'Registration and profile setup for GST/Sales Tax on FBR & Provincial portals.',
    path: '/services/gst-registration',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'sales-tax-monthly',
    icon: TrendingUp,
    title: 'Monthly Sales Tax Return Filing',
    desc: 'Accurate monthly compilation and filing of sales tax returns.',
    path: '/services/sales-tax-monthly',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'pst-registration',
    icon: TrendingUp,
    title: 'Provincial Sales Tax (PST) Registration',
    desc: 'Provincial registration and compliance (SRB, PRA and others).',
    path: '/services/pst-registration',
    category: SERVICE_CATEGORIES.TAX_SERVICES
  },
  {
    id: 'private-limited-registration',
    icon: Building2,
    title: 'Private Limited Company Registration',
    desc: 'End‑to‑end SECP incorporation for private limited companies.',
    path: '/services/private-limited-registration',
    category: SERVICE_CATEGORIES.CORPORATE_SERVICES
  },
  {
    id: 'llp-registration',
    icon: Building2,
    title: 'Limited Liability Partnership (LLP) Registration',
    desc: 'LLP registration and documentation support for partner firms.',
    path: '/services/llp-registration',
    category: SERVICE_CATEGORIES.CORPORATE_SERVICES
  }
];

/**
 * Get services filtered by category
 * @param {string} category - Category to filter by (use SERVICE_CATEGORIES.ALL for all services)
 * @returns {Array} Filtered services array
 */
export const getServicesByCategory = (category) => {
  if (category === SERVICE_CATEGORIES.ALL) {
    return services;
  }
  return services.filter(service => service.category === category);
};

/**
 * Get all unique categories
 * @returns {Array} Array of category names
 */
export const getCategories = () => {
  return Object.values(SERVICE_CATEGORIES);
};
