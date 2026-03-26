import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

const BUSINESS_CATEGORIES = [
  { value: 'rice', label: 'Sale of rice', atlRate: 0.015, nonAtlRate: 0.03 },
  { value: 'cottonseed', label: 'Sale of cottonseed', atlRate: 0.015, nonAtlRate: 0.03 },
  { value: 'edible-oil', label: 'Sale of edible oil', atlRate: 0.015, nonAtlRate: 0.03 },
  { value: 'cigarettes', label: 'Sale of cigarettes', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'pharma', label: 'Sale of pharma products', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'gold-silver', label: 'Sale of gold & silver', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'fmcg', label: 'Sale of FMCG', atlRate: 0.003, nonAtlRate: null },
  { value: 'fertilizer', label: 'Sale of fertilizer', atlRate: 0.003, nonAtlRate: null },
  { value: 'electronics', label: 'Sale of electronics excluding mobile phones', atlRate: 0.003, nonAtlRate: null },
  { value: 'sugar', label: 'Sale of sugar', atlRate: 0.003, nonAtlRate: null },
  { value: 'cement-steel-edible', label: 'Sale of cement steel & edible oil by distributors', atlRate: 0.003, nonAtlRate: null },
  { value: 'dealers-retailers', label: 'Sales of dealers, sub-dealers, wholesalers & retailers', atlRate: 0.003, nonAtlRate: null },
  { value: 'other-goods-companies', label: 'Sale of other goods by companies including toll manufacturers', atlRate: 0.10, nonAtlRate: 0.20 },
  { value: 'other-goods-aops', label: 'Sale of other goods by AOPs & Individual Including toll manufacturers', atlRate: 0.055, nonAtlRate: 0.11 },
  { value: 'textile', label: 'Sales & supplies by taxpayers in Textile & articles thereof', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'carpets', label: 'Sales & supplies by taxpayers in Carpets', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'leather', label: 'Sales & supplies by taxpayers in Leather & articles thereof', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'artificial-leather', label: 'Sales & supplies by taxpayers in Artificial leather', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'footwear', label: 'Sales & supplies by taxpayers in Footwear', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'surgical', label: 'Sales & supplies by taxpayers in Surgical goods', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'sports', label: 'Sales & supplies by taxpayers in Sports goods', atlRate: 0.01, nonAtlRate: 0.02 },
  { value: 'yarn-traders', label: 'Local supplies by yarn traders to above mentioned sectors', atlRate: 0.005, nonAtlRate: 0.01 },
];

export function SupplyOfGoodsTaxCalculator() {
  const [filerStatus, setFilerStatus] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [result, setResult] = useState(null);

  const selectedCategory = useMemo(
    () => BUSINESS_CATEGORIES.find((c) => c.value === businessCategory),
    [businessCategory]
  );

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualIncome));
    if (income <= 0 || !selectedCategory || !filerStatus) {
      setResult(null);
      return;
    }

    if (income <= 75000) {
      setResult({
        income,
        tax: 0,
        incomeAfterTax: income,
        rate: 0,
        note: 'Supply of Goods tax applies only when annual income exceeds PKR 75,000.',
      });
      return;
    }

    const isAtl = filerStatus === 'atl';
    let rate = isAtl ? selectedCategory.atlRate : selectedCategory.nonAtlRate;
    let note = '';
    if (rate === null || rate === undefined) {
      rate = selectedCategory.atlRate;
      note = 'Non-ATL rate is not specified for this category. ATL rate applied for estimate.';
    }

    const tax = income * rate;
    setResult({
      income,
      tax,
      rate,
      incomeAfterTax: income - tax,
      note,
    });
  };

  return (
    <TaxCalculatorShell
      title="Pakistan Supply of Goods Tax Calculator"
      subtitle="Section 153 withholding tax calculator (2025-2026)"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Filer Status</label>
              <select
                value={filerStatus}
                onChange={(e) => setFilerStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>Select filer status</option>
                <option value="atl">ALT (Active Taxpayer)</option>
                <option value="non-atl">NON-ATL (Non-Active Taxpayer)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Income (Rs)</label>
              <input
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter annual income"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Choose Category</label>
              <select
                value={businessCategory}
                onChange={(e) => setBusinessCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>
                  Select Business Category
                </option>
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton
              onClick={() => {
                setAnnualIncome('');
                setFilerStatus('');
                setBusinessCategory('');
                setResult(null);
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Supply of Goods Tax Results">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Taxable Income</th>
                      <td className="font-bold">{formatPKR(result.income)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Total Tax</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Income After Tax</th>
                      <td className="font-bold">{formatPKR(result.incomeAfterTax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {result.note ? <div className="text-xs text-gray-500 mt-3">{result.note}</div> : null}
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Select filer status, enter annual income, and choose a business category to calculate tax.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Pakistan Supply of Goods Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            This calculator estimates withholding tax on the supply of goods under Section 153 of the Income Tax Ordinance 2001.
            Select ATL status, enter annual income, and choose the business category to get fast, accurate results.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Fill Out the Supply of Goods Tax Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Select your ATL or Non-ATL status.</li>
            <li>Enter the annual income received from supply of goods.</li>
            <li>Choose your business category from the dropdown.</li>
            <li>Click Calculate to see total tax and income after tax.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Supply of Goods Tax Slabs & Latest Updates (2025-2026)</div>
          <div className="text-sm text-gray-700 mb-4">Rates depend on business category and ATL status.</div>
          <table className="paktax-table">
            <thead>
              <tr>
                <th className="text-left">Business Category</th>
                <th className="text-left">ATL Rate</th>
                <th className="text-left">Non-ATL Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Sale of rice, cottonseed, edible oil</td><td>1.50%</td><td>3.00%</td></tr>
              <tr><td>Sale of cigarettes, pharma products, gold & silver</td><td>1.00%</td><td>2.00%</td></tr>
              <tr><td>FMCG, fertilizer, electronics (excl. mobile phones), sugar, cement steel & edible oil by distributors</td><td>0.30%</td><td>N/A</td></tr>
              <tr><td>Sales of dealers, sub-dealers, wholesalers & retailers</td><td>0.30%</td><td>N/A</td></tr>
              <tr><td>Other goods by companies including toll manufacturers</td><td>10%</td><td>20%</td></tr>
              <tr><td>Other goods by AOPs & Individuals including toll manufacturers</td><td>5.50%</td><td>11%</td></tr>
              <tr><td>Textile, carpets, leather, artificial leather, footwear, surgical, sports goods</td><td>1.00%</td><td>2.00%</td></tr>
              <tr><td>Local supplies by yarn traders</td><td>0.50%</td><td>1.00%</td></tr>
            </tbody>
          </table>
          <div className="text-xs text-gray-500 mt-3">Supply of goods tax applies only when annual income exceeds PKR 75,000.</div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Supply of Goods Tax Calculator Ensures Security</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No collection of personal data such as CNIC, NTN, or contact info.</div>
            <div>Secure data transmission using HTTPS/SSL.</div>
            <div>Focus on calculation without registration or storage.</div>
            <div>Regular security updates to protect user confidence.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For any inquiries, assistance, or personalized support, contact our team. We are ready to help you navigate through any challenges.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Supply of Goods WHT?</div>
          <div className="text-sm text-gray-200">Share your business details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

