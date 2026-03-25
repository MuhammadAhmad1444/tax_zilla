import React from 'react';
import { Helmet } from 'react-helmet';

const IncomeTaxSlabsPlaceholderPage = () => {
  return (
    <>
      <Helmet>
        <title>Income Tax Slabs - PAK TAX Calculator</title>
        <meta name="description" content="Income tax slabs information page (placeholder)." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Income Tax Slabs</h1>
        <p className="mt-4 text-gray-600 font-medium">
          This section will show the 2025-26 income tax slabs. For now, use the calculators on the PakTax “Tax Calculators 2025-2026” page.
        </p>
      </div>
    </>
  );
};

export default IncomeTaxSlabsPlaceholderPage;

