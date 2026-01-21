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
