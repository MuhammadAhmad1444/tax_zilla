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
      { id: 'pta', title: 'PTA Tax Calculator', icon: Phone, element: <Placeholder title="PTA Tax Calculator" subtitle="Requires official PTA model-wise rate tables for 2025-26." /> },
      { id: 'zakat', title: 'Zakat Tax Calculator', icon: Shield, element: <ZakatCalculator2025 /> },
      { id: 'fbr-online', title: 'FBR Online Verifications', icon: FileText, element: <Placeholder title="FBR Online Verifications" subtitle="This section is typically a link-based verification tool." /> },
      { id: 'gain-securities', title: 'Gain Tax on Securities', icon: Scale, element: <GainTaxOnSecuritiesCalculator2025 /> },
      { id: 'gain-mutual-funds', title: 'Gain Tax on Mutual Funds', icon: Users, element: <GainTaxOnMutualFundsCalculator2025 /> },
      { id: 'gain-properties', title: 'Gain Tax on Properties', icon: Landmark, element: <GainTaxOnPropertiesCalculator2025 /> },
      { id: 'withholding-income-properties', title: 'Withholding Tax on Income from Properties', icon: Droplets, element: <WithholdingTaxOnIncomeFromPropertiesCalculator2025 /> },
      { id: 'withholding-brokerage-commission', title: 'Withholding Tax on Brokerage & Commission', icon: CreditCard, element: <WithholdingTaxOnBrokerageCommissionCalculator2025 /> },
      { id: 'salary', title: 'Pakistan Salary Tax Calculator', icon: Users, element: <SalaryTaxCalculator2025 /> },
      { id: 'business', title: 'Pakistan Business Tax Calculator', icon: BriefcaseBusiness, element: <BusinessTaxCalculator2025 /> },
      { id: 'freelancer', title: 'Pakistan Freelancer Tax Calculator', icon: Users, element: <FreelancerTaxCalculator2025 /> },
      { id: 'super-tax', title: 'Super Tax on Annual Income', icon: Scale, element: <SuperTaxCalculator2025 /> },
      { id: 'company-income', title: 'Tax on Annual Income of Companies', icon: Building2, element: <CompanyIncomeTaxCalculator2025 /> },
      { id: 'builder', title: 'Pakistan Builder Tax Calculator', icon: Wrench, element: <BuilderTaxCalculator2025 variant="builder" /> },
      { id: 'developer', title: 'Pakistan Developer Tax Calculator', icon: Wrench, element: <BuilderTaxCalculator2025 variant="developer" /> },
      { id: 'agri-land-punjab', title: 'Tax on Agricultural Land – Punjab', icon: Store, element: <AgriculturalLandPunjabTaxCalculator2025 /> },
    ],
    []
  );

  const activeCalculator = useMemo(() => calculators.find((c) => c.id === activeId), [calculators, activeId]);

  const relatedButtons = [
    { id: 'business', label: 'Business Tax' },
    { id: 'value-added-tax', label: 'Value-added Tax' },
    { id: 'builder', label: 'Builder Tax' },
    { id: 'developer', label: 'Developer Tax' },
  ];

  const renderValueAddedTaxPlaceholder = () => (
    <Placeholder title="Value-added Tax" subtitle="Add your VAT/Sales Tax calculator logic and I’ll wire it into the same UI." />
  );

  const renderMain = () => {
    if (!activeId) {
      return (
        <div className="px-2 md:px-0">
          {/* Grid of calculator cards (no background image) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {calculators.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => goToCalculator(tile.id)}
                aria-label={tile.title}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col items-center text-center gap-3 border-t-4 border-[var(--color-gold)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-gold)]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--color-gold)]">
                  <tile.icon size={28} className="text-[var(--color-dark-blue)] transition-colors duration-300 group-hover:text-black" />
                </div>
                <div className="font-extrabold text-[14px] leading-tight text-gray-900 transition-colors duration-300 group-hover:text-[var(--color-gold-dark)]">
                  {tile.title}
                </div>
                {/* Hover affordance line */}
                <div className="text-[11px] text-gray-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Open calculator
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
          <div className="mb-6">
            <button type="button" className="paktax-btn paktax-btn-secondary" onClick={backToCalculators}>
              Back to Calculators
            </button>
          </div>
          {renderValueAddedTaxPlaceholder()}
          <RelatedCalculatorsBlock relatedButtons={relatedButtons} goToCalculator={goToCalculator} />
        </div>
      );
    }

    return (
      <div>
        <div className="mb-6">
          <button type="button" className="paktax-btn paktax-btn-secondary" onClick={backToCalculators}>
            Back to Calculators
          </button>
        </div>
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
      <section className="pt-32 pb-20 bg-[var(--color-dark-blue)] text-white text-center">
        <div className="container-custom">
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

