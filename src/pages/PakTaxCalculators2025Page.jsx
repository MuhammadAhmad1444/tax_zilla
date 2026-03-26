import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { ValueAddedTaxCalculator } from '../components/paktax/calculators2025/ValueAddedTaxCalculator.jsx';

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
  const contentRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useLayoutEffect(() => {
    const scrollNow = () => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };

    scrollNow();
    const timeoutId = window.setTimeout(scrollNow, 200);

    return () => window.clearTimeout(timeoutId);
  }, [activeId]);

  const goToCalculator = (id) => setSearchParams(id ? { calc: id } : {});
  const backToCalculators = () => setSearchParams({});

  const calculators = useMemo(
    () => [
      {
        id: 'pta',
        title: 'PTA Tax Calculator',
        category: 'Verification',
        icon: Phone,
        image: 'https://images.unsplash.com/photo-1554224155-a1487473ffd9?auto=format&fit=crop&w=900&q=60',
        element: <PtaTaxCalculator2025 />,
      },
      {
        id: 'zakat',
        title: 'Zakat Tax Calculator',
        category: 'Faith & Assets',
        icon: Shield,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=60',
        element: <ZakatCalculator2025 />,
      },
      {
        id: 'fbr-online',
        title: 'FBR Online Verifications',
        category: 'Verification',
        icon: FileText,
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=60',
        element: <FbrOnlineVerifications />,
      },
      {
        id: 'value-added-tax',
        title: 'Supply of Goods Tax Calculator',
        category: 'Withholding',
        icon: CreditCard,
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=60',
        element: <ValueAddedTaxCalculator />,
      },
      {
        id: 'gain-securities',
        title: 'Gain Tax on Securities',
        category: 'Capital Gains',
        icon: Scale,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=60',
        element: <GainTaxOnSecuritiesCalculator2025 />,
      },
      {
        id: 'gain-mutual-funds',
        title: 'Gain Tax on Mutual Funds',
        category: 'Capital Gains',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=60',
        element: <GainTaxOnMutualFundsCalculator2025 />,
      },
      {
        id: 'gain-properties',
        title: 'Gain Tax on Properties',
        category: 'Capital Gains',
        icon: Landmark,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=650&fit=crop',
        element: <GainTaxOnPropertiesCalculator2025 />,
      },
      {
        id: 'withholding-income-properties',
        title: 'Withholding Tax on Income from Properties',
        category: 'Withholding',
        icon: Droplets,
        image: 'https://images.unsplash.com/photo-1493882552576-fce827c6161e?auto=format&fit=crop&w=900&q=60',
        element: <WithholdingTaxOnIncomeFromPropertiesCalculator2025 />,
      },
      {
        id: 'withholding-brokerage-commission',
        title: 'Withholding Tax on Brokerage & Commission',
        category: 'Withholding',
        icon: CreditCard,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=60',
        element: <WithholdingTaxOnBrokerageCommissionCalculator2025 />,
      },
      {
        id: 'salary',
        title: 'Pakistan Salary Tax Calculator',
        category: 'Income Tax',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=650&fit=crop',
        element: <SalaryTaxCalculator2025 />,
      },
      {
        id: 'business',
        title: 'Pakistan Business Tax Calculator',
        category: 'Income Tax',
        icon: BriefcaseBusiness,
        image: 'https://images.unsplash.com/photo-1684393637060-70e50f950aba?auto=format&fit=crop&w=900&q=60',
        element: <BusinessTaxCalculator2025 />,
      },
      {
        id: 'freelancer',
        title: 'Pakistan Freelancer Tax Calculator',
        category: 'Income Tax',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=650&fit=crop',
        element: <FreelancerTaxCalculator2025 />,
      },
      {
        id: 'super-tax',
        title: 'Super Tax on Annual Income',
        category: 'Income Tax',
        icon: Scale,
        image: 'https://images.unsplash.com/photo-1573165759995-5865a394a1aa?auto=format&fit=crop&w=900&q=60',
        element: <SuperTaxCalculator2025 />,
      },
      {
        id: 'company-income',
        title: 'Tax on Annual Income of Companies',
        category: 'Corporate',
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&h=650&fit=crop',
        element: <CompanyIncomeTaxCalculator2025 />,
      },
      {
        id: 'builder',
        title: 'Pakistan Builder Tax Calculator',
        category: 'Construction',
        icon: Wrench,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=60',
        element: <BuilderTaxCalculator2025 variant="builder" />,
      },
      {
        id: 'developer',
        title: 'Pakistan Developer Tax Calculator',
        category: 'Construction',
        icon: Wrench,
        image: 'https://images.unsplash.com/photo-1686149115308-bfdb03c8582e?auto=format&fit=crop&w=900&q=60',
        element: <BuilderTaxCalculator2025 variant="developer" />,
      },
      {
        id: 'agri-land-punjab',
        title: 'Tax on Agricultural Land – Punjab',
        category: 'Agriculture',
        icon: Store,
        image: 'https://images.unsplash.com/photo-1695487562553-c71a77e6c656?auto=format&fit=crop&w=900&q=60',
        element: <AgriculturalLandPunjabTaxCalculator2025 />,
      },
    ],
    []
  );

  const filterTabs = [
    { id: 'All', label: 'All' },
    { id: 'Salary', label: 'Salary' },
    { id: 'Business', label: 'Business' },
    { id: 'Withholding', label: 'Withholding' },
  ];

  const matchesFilter = (calculator) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Salary') return calculator.id === 'salary';
    if (activeFilter === 'Business') return calculator.id === 'business';
    return calculator.category === 'Withholding';
  };

  const visibleCalculators = useMemo(
    () => calculators.filter(matchesFilter),
    [calculators, activeFilter]
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
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all border ${
                  activeFilter === tab.id
                    ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {visibleCalculators.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => goToCalculator(tile.id)}
                aria-label={tile.title}
                className="group paktax-tile focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 text-left"
              >
                <div className="paktax-tile-media">
                  {tile.image ? (
                    <img
                      src={tile.image}
                      alt={tile.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <tile.icon size={28} className="text-[var(--color-gold)]" />
                    </div>
                  )}
                  <div className="paktax-tile-overlay" />
                  <div className="absolute top-4 left-4">
                    <span className="paktax-tile-chip">{tile.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="paktax-tile-icon">
                      <tile.icon size={18} className="text-[var(--color-gold)]" />
                    </div>
                    <div className="text-xs text-gray-400 font-semibold tracking-[0.2em]">2025-26</div>
                  </div>
                  <div className="text-lg font-extrabold text-gray-900 mb-2">
                    {tile.title}
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Instant results, slab guidance, and support-ready outputs.
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
            Choose a calculator to get started. Every tool includes compliance notes and consultation support.
          </div>
        </div>
      );
    }

    if (activeId === 'value-added-tax') {
      return (
        <div>
          <div className="sticky top-[78px] z-30 mb-6 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-4 flex flex-wrap items-center gap-3 justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Tax Calculator</div>
              <div className="text-lg font-extrabold text-gray-900">Supply of Goods Tax Calculator</div>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="paktax-btn paktax-btn-secondary" onClick={backToCalculators}>
                Back to all calculators
              </button>
              <a href="/contact" className="paktax-btn paktax-btn-primary">Get Help</a>
            </div>
          </div>
          <SupplyOfGoodsTaxCalculator />
          <RelatedCalculatorsBlock relatedButtons={relatedButtons} goToCalculator={goToCalculator} />
        </div>
      );
    }

    return (
      <div>
        {activeCalculator ? (
          <>
            <div className="sticky top-[78px] z-30 mb-6 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur p-4 flex flex-wrap items-center gap-3 justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Tax Calculator</div>
                <div className="text-lg font-extrabold text-gray-900">{activeCalculator.title}</div>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="paktax-btn paktax-btn-secondary" onClick={backToCalculators}>
                  Back to all calculators
                </button>
                <a href="/contact" className="paktax-btn paktax-btn-primary">Get Help</a>
              </div>
            </div>
            {activeCalculator.element}
          </>
        ) : (
          renderValueAddedTaxPlaceholder()
        )}
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
        <div className="container-custom" ref={contentRef}>
          <section>{renderMain()}</section>
        </div>
      </main>
    </div>
  );
};

export default PakTaxCalculators2025Page;

