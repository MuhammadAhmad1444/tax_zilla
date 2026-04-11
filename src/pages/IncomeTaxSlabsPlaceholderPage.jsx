import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const IncomeTaxSlabsPlaceholderPage = () => {
  return (
    <>
      <Helmet>
        <title>Income Tax Slabs - PAK TAX Calculator</title>
        <meta name="description" content="Income tax slabs information page (placeholder)." />
      </Helmet>
      <section className="bg-gray-50 px-0 pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="container-custom max-w-3xl">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">Income Tax Slabs</h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-gray-600 sm:text-base">
            This section will show the 2025-26 income tax slabs. For now, use the calculators on the PakTax “Tax Calculators 2025-2026” page.
          </p>
          <div className="mt-8">
            <Link
              to="/pakistan-tax-calculators"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[var(--color-gold)] px-6 py-3 text-base font-semibold text-black shadow-lg transition-all duration-300 hover:bg-[var(--color-gold-light)] hover:shadow-lg"
            >
              Open tax calculators
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default IncomeTaxSlabsPlaceholderPage;
