import { Briefcase, Monitor, Truck, Heart, Box, Cpu, Home, Globe } from 'lucide-react';

export const industries = [
  {
    id: 'it-tech',
    icon: Cpu,
    title: 'IT & Technology',
    desc: 'Tax incentives, export documentation, PSEB registrations and cross-border invoicing support for IT companies and freelancers.',
    challenges: [
      'Claiming export incentive documentation',
      'Managing cross-border invoicing and foreign receipts',
      'PSEB registration and renewal complexities'
    ],
    solutions: [
      'Preparation of export refund and duty documentation',
      'Guidance on foreign remittance reporting and invoicing',
      'End-to-end PSEB registration & renewal support'
    ]
  },
  {
    id: 'manufacturing',
    icon: Truck,
    title: 'Manufacturing & Industrial',
    desc: 'GST/PST registrations, sales tax advisory, capitalization and machinery documentation for manufacturers.',
    challenges: [
      'Complex input tax and output tax reconciliation',
      'Documentation for machinery and capital allowance claims',
      'Large-volume sales invoicing and VAT reporting'
    ],
    solutions: [
      'Complete GST reconciliation and filing',
      'Capital allowance calculations and paperwork',
      'Structured invoicing templates and monthly reporting service'
    ]
  },
  {
    id: 'retail-ecommerce',
    icon: Box,
    title: 'Retail & E‑commerce',
    desc: 'Sales tax, online marketplace invoicing, and VAT/PST considerations for retailers and online stores.',
    challenges: [
      'Marketplace seller invoicing and reverse charge rules',
      'Managing multiple province PST requirements',
      'Reconciling high-volume micro-sales'
    ],
    solutions: [
      'Marketplace invoice mapping and tax treatment',
      'Provincial PST registration assistance',
      'Automation-ready reporting templates for reconciliation'
    ]
  },
  {
    id: 'professional-services',
    icon: Briefcase,
    title: 'Professional Services',
    desc: 'Specialized packages for consultants, law firms, accountants and agencies with simplified compliance flows.',
    challenges: [
      'Irregular billing and contract-based income',
      'Professional expense classification',
      'Cross-border client invoicing for consultants'
    ],
    solutions: [
      'Retainer-friendly tax filing processes',
      'Expense categorization and optimization',
      'International invoice guidance and tax positioning'
    ]
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare & Clinics',
    desc: 'Licensing, tax exemptions where applicable, payroll, and professional tax compliance for clinics and hospitals.',
    challenges: [
      'Managing payroll for medical staff and consultants',
      'Navigating exemptions and donor-funded projects',
      'Regulatory licensing alignment with tax filings'
    ],
    solutions: [
      'Payroll structuring and withholding guidance',
      'Exemption eligibility review and documentation',
      'Licensing-to-tax compliance mapping service'
    ]
  },
  {
    id: 'real-estate',
    icon: Home,
    title: 'Real Estate & Construction',
    desc: 'Property related tax advisory, company formation for builders, and compliance for landlords and developers.',
    challenges: [
      'Property transfer taxes and documentation',
      'Tax treatment of rental income vs development income',
      'Builder project accounting and retention issues'
    ],
    solutions: [
      'Property tax compliance and transfer checklists',
      'Structured rental vs development tax planning',
      'Project accounting templates and advisory'
    ]
  },
  {
    id: 'exports',
    icon: Globe,
    title: 'Exporters & Trading',
    desc: 'Documentation for export refunds, SEZ/IT zone advisory and foreign remittance tax guidance.',
    challenges: [
      'Export refund / drawback documentation',
      'SEZ vs regular export tax positioning',
      'Foreign currency repatriation and banking requirements'
    ],
    solutions: [
      'End-to-end export refund preparation',
      'SEZ advisory and tax optimization',
      'Banking-ready remittance documentation support'
    ]
  },
  {
    id: 'startups',
    icon: Monitor,
    title: 'Startups & SMEs',
    desc: 'Lean compliance packages, tax planning, and US company formation guidance for growing startups.',
    challenges: [
      'Choosing an optimal entity and tax-efficient structure',
      'Early-stage payroll and stock/option considerations',
      'Cross-border expansion and US formation questions'
    ],
    solutions: [
      'Entity selection and incorporation advisory',
      'Payroll setup and founder compensation planning',
      'US company formation guidance and EIN assistance'
    ]
  }
];
