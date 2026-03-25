import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { Droplets, Phone, Shield, Store, Users, Landmark, BriefcaseBusiness, CreditCard, Building2, Wrench, Scale, FileText } from 'lucide-react';
import '../styles/paktax.css';
import {
  SalaryTaxCalculator2025,
  BusinessTaxCalculator2025,
  FreelancerTaxCalculator2025,
  SuperTaxCalculator2025,
  CompanyIncomeTaxCalculator2025,
  GainTaxOnSecuritiesCalculator2025,
  GainTaxOnMutualFundsCalculator2025,
  GainTaxOnPropertiesCalculator2025,
  WithholdingTaxOnIncomeFromPropertiesCalculator2025,
  WithholdingTaxOnBrokerageCommissionCalculator2025,
  BuilderTaxCalculator2025,
  AgriculturalLandPunjabTaxCalculator2025,
  ZakatCalculator2025,
} from '../components/paktax/Calculators2025.jsx';
import { PtaTaxCalculator2025 } from '../components/paktax/calculators2025/PtaTaxCalculator2025.jsx';
import { FbrOnlineVerifications } from '../components/paktax/calculators2025/FbrOnlineVerifications.jsx';
import { SupplyOfGoodsTaxCalculator } from '../components/paktax/calculators2025/SupplyOfGoodsTaxCalculator.jsx';

const SidebarLink = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
      active
        ? 'bg-[var(--color-gold)] text-black'
        : 'hover:bg-gray-50 text-gray-800'
    }`}
  >
    {label}
  </button>
);

const Placeholder = ({ title, subtitle }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="text-2xl font-extrabold text-[var(--color-gold)] mb-2">{title}</div>
      {subtitle ? <div className="text-gray-600 font-medium">{subtitle}</div> : null}
      <div className="mt-4 text-sm text-gray-500 leading-relaxed">
        This calculator requires additional official PTA/FBR rate tables or integration. Send the exact rate data (or a screenshot of the existing calculator inputs) and I’ll wire it in with the same UI.
      </div>
    </div>
  );
};

const RelatedCalculatorsBlock = ({ relatedButtons, goToCalculator }) => (
  <div className="mt-10">
    <div className="text-center mb-5">
      <div className="font-extrabold text-gray-900 text-lg">Related Calculators</div>
      <div className="text-sm text-gray-500 mt-1">Quick access shortcuts</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {relatedButtons.map((b) => (
        <button
          key={b.id}
          type="button"
          onClick={() => goToCalculator(b.id)}
          className="w-full bg-[var(--color-gold)] text-black rounded-2xl px-4 py-4 text-center font-extrabold hover:bg-[var(--color-gold-dark)] transition-colors"
        >
          {b.label}
        </button>
      ))}
    </div>
  </div>
);

const PakTaxCalculators2025Page = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get('calc');

  const goToCalculator = (id) => setSearchParams(id ? { calc: id } : {});
  const backToCalculators = () => setSearchParams({});

  const calculators = useMemo(
    () => [
      {
        id: 'pta',
        title: 'PTA Tax Calculator',
        icon: Phone,
        image: 'https://images.unsplash.com/photo-1554224155-a1487473ffd9?auto=format&fit=crop&w=900&q=60',
        element: <PtaTaxCalculator2025 />,
      },
      {
        id: 'zakat',
        title: 'Zakat Tax Calculator',
        icon: Shield,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=60',
        element: <ZakatCalculator2025 />,
      },
      {
        id: 'fbr-online',
        title: 'FBR Online Verifications',
        icon: FileText,
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=60',
        element: <FbrOnlineVerifications />,
      },
      {
        id: 'value-added-tax',
        title: 'Supply of Goods Tax Calculator',
        icon: CreditCard,
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=60',
        element: <SupplyOfGoodsTaxCalculator />,
      },
      {
        id: 'gain-securities',
        title: 'Gain Tax on Securities',
        icon: Scale,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=60',
        element: <GainTaxOnSecuritiesCalculator2025 />,
      },
      {
        id: 'gain-mutual-funds',
        title: 'Gain Tax on Mutual Funds',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=60',
        element: <GainTaxOnMutualFundsCalculator2025 />,
      },
      {
        id: 'gain-properties',
        title: 'Gain Tax on Properties',
        icon: Landmark,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=650&fit=crop',
        element: <GainTaxOnPropertiesCalculator2025 />,
      },
      {
        id: 'withholding-income-properties',
        title: 'Withholding Tax on Income from Properties',
        icon: Droplets,
        image: 'https://images.unsplash.com/photo-1493882552576-fce827c6161e?auto=format&fit=crop&w=900&q=60',
        element: <WithholdingTaxOnIncomeFromPropertiesCalculator2025 />,
      },
      {
        id: 'withholding-brokerage-commission',
        title: 'Withholding Tax on Brokerage & Commission',
        icon: CreditCard,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=60',
        element: <WithholdingTaxOnBrokerageCommissionCalculator2025 />,
      },
      {
        id: 'salary',
        title: 'Pakistan Salary Tax Calculator',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=650&fit=crop',
        element: <SalaryTaxCalculator2025 />,
      },
      {
        id: 'business',
        title: 'Pakistan Business Tax Calculator',
        icon: BriefcaseBusiness,
        image: 'https://images.unsplash.com/photo-1684393637060-70e50f950aba?auto=format&fit=crop&w=900&q=60',
        element: <BusinessTaxCalculator2025 />,
      },
      {
        id: 'freelancer',
        title: 'Pakistan Freelancer Tax Calculator',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=650&fit=crop',
        element: <FreelancerTaxCalculator2025 />,
      },
      {
        id: 'super-tax',
        title: 'Super Tax on Annual Income',
        icon: Scale,
        image: 'https://images.unsplash.com/photo-1573165759995-5865a394a1aa?auto=format&fit=crop&w=900&q=60',
        element: <SuperTaxCalculator2025 />,
      },
      {
        id: 'company-income',
        title: 'Tax on Annual Income of Companies',
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&h=650&fit=crop',
        element: <CompanyIncomeTaxCalculator2025 />,
      },
      {
        id: 'builder',
        title: 'Pakistan Builder Tax Calculator',
        icon: Wrench,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=60',
        element: <BuilderTaxCalculator2025 variant="builder" />,
      },
      {
        id: 'developer',
        title: 'Pakistan Developer Tax Calculator',
        icon: Wrench,
        image: 'https://images.unsplash.com/photo-1686149115308-bfdb03c8582e?auto=format&fit=crop&w=900&q=60',
        element: <BuilderTaxCalculator2025 variant="developer" />,
      },
      {
        id: 'agri-land-punjab',
        title: 'Tax on Agricultural Land – Punjab',
        icon: Store,
        image: 'https://images.unsplash.com/photo-1695487562553-c71a77e6c656?auto=format&fit=crop&w=900&q=60',
        element: <AgriculturalLandPunjabTaxCalculator2025 />,
      },
    ],
    []
  );

  const activeCalculator = useMemo(() => calculators.find((c) => c.id === activeId), [calculators, activeId]);

  const relatedButtons = [
    { id: 'business', label: 'Business Tax' },
    { id: 'value-added-tax', label: 'Supply of Goods Tax' },
    { id: 'builder', label: 'Builder Tax' },
    { id: 'developer', label: 'Developer Tax' },
  ];

  const renderValueAddedTaxPlaceholder = () => (
    <Placeholder
      title="Supply of Goods Tax"
      subtitle="Enter your Net Price, Tax Amount, Gross Price, or Sales Tax Rate to calculate the remaining values."
    />
  );

  const renderMain = () => {
    if (!activeId) {
      return (
        <div className="px-2 md:px-0">
          {/* Grid of calculator tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {calculators.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => goToCalculator(tile.id)}
                aria-label={tile.title}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2"
              >
                <div className="h-44 w-full bg-gray-100">
                  {tile.image ? (
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <tile.icon size={28} className="text-[var(--color-gold)]" />
                    </div>
                  )}
                </div>
                <div className="px-3 py-5 text-center">
                  <div className="font-extrabold text-[14px] leading-tight text-[var(--color-gold)] transition-colors duration-300 group-hover:text-[var(--color-gold-dark)]">
                    {tile.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-gray-500 leading-relaxed">
            Use the cards to open each calculator with instant results.
          </div>
        </div>
      );
    }

    if (activeId === 'value-added-tax') {
      return (
        <div>
          <SupplyOfGoodsTaxCalculator />
          <RelatedCalculatorsBlock relatedButtons={relatedButtons} goToCalculator={goToCalculator} />
        </div>
      );
    }

    return (
      <div>
        {activeCalculator ? activeCalculator.element : renderValueAddedTaxPlaceholder()}
        <RelatedCalculatorsBlock relatedButtons={relatedButtons} goToCalculator={goToCalculator} />
      </div>
    );
  };

  return (
    <div className="paktax-root">
      <Helmet>
        <title>Pakistan Tax Calculators 2025-2026 - PAK TAX Calculator</title>
        <meta name="description" content="Pakistan Tax Calculators 2025-26 for income, capital gains, withholding taxes, and more." />
      </Helmet>

      {/* Match ServicesPage start (hero + theme) */}
      <section className="relative pt-32 pb-20 bg-[var(--color-dark-blue)] text-white text-center overflow-hidden">
        {/* Dull background image (same approach used on other pages) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493882552576-fce827c6161e')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1c29]/80 via-[#0d1f2e]/60 to-black/70" />

        <div className="container-custom relative z-10">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Pakistan Tax Calculators
          </h1>
          <p className="text-xl text-gray-300">
            Tax professional calculators for individuals & businesses across Pakistan
          </p>
        </div>
      </section>

      <main className="section-padding bg-gray-50">
        <div className="container-custom">
          <section>{renderMain()}</section>
        </div>
      </main>
    </div>
  );
};

export default PakTaxCalculators2025Page;

