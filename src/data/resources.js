/**
 * Resource categories for filtering
 */
export const RESOURCE_CATEGORIES = {
  ALL: 'All',
  TAX_GUIDE: 'Tax Guide',
  BUSINESS_GUIDE: 'Business Guide',
  TOOL: 'Tool'
};

/**
 * All available resources with their details and types
 */
export const resources = [
  {
    id: 'income-tax-ordinance',
    title: "Income Tax Ordinance 2001 (Overview)",
    type: "Tax Guide",
    desc: "A simplified breakdown of the key sections of Pakistan's primary income tax law.",
    link: "#",
    external: false
  },
  {
    id: 'atl-check',
    title: "Active Taxpayer List (ATL) Check",
    type: "Tool",
    desc: "Direct link to FBR's portal to check your current ATL status.",
    link: "https://e.fbr.gov.pk/",
    external: true
  },
  {
    id: 'sales-tax-registration',
    title: "Sales Tax Registration Guide",
    type: "Compliance Guide",
    desc: "Step-by-step checklist for registering for Sales Tax (STRN).",
    link: "#",
    external: false
  },
  {
    id: 'starting-business',
    title: "Starting a Business in Pakistan",
    type: "Business Guide",
    desc: "Comprehensive guide covering SECP, FBR, and provincial registrations.",
    link: "#",
    external: false
  },
  {
    id: 'withholding-tax-rates',
    title: "Withholding Tax Rates Card (2025-26)",
    type: "Reference",
    desc: "Quick reference card for common withholding tax rates on services and supplies.",
    link: "#",
    external: false
  },
  {
    id: 'freelancer-tax-benefits',
    title: "Freelancer Tax Benefits",
    type: "Tax Guide",
    desc: "Detailed explanation of Clause 133 and PSEB registration benefits.",
    link: "#",
    external: false
  }
];

/**
 * Get resources filtered by category
 * @param {string} category - Category to filter by (use RESOURCE_CATEGORIES.ALL for all resources)
 * @returns {Array} Filtered resources array
 */
export const getResourcesByCategory = (category) => {
  if (category === RESOURCE_CATEGORIES.ALL) {
    return resources;
  }
  
  // Special handling for 'Guides' category (matches both Tax Guide and Business Guide)
  if (category === 'Guides') {
    return resources.filter(resource => resource.type.includes('Guide'));
  }
  
  // Filter by exact type match or if type includes the category
  return resources.filter(resource => 
    resource.type === category || resource.type.includes(category)
  );
};

/**
 * Get all unique categories for tabs
 * @returns {Array} Array of category names
 */
export const getCategories = () => {
  return Object.values(RESOURCE_CATEGORIES);
};
