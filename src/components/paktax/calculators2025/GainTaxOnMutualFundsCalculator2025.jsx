import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

const CATEGORY_OPTIONS = [
  { value: 'ind-aop-stock', label: 'Individual / AOP - Stock Funds', rate: 0.15 },
  { value: 'ind-aop-other', label: 'Individual / AOP - Other Funds', rate: 0.15 },
  { value: 'company-stock', label: 'Companies - Stock Funds', rate: 0.15 },
  { value: 'company-other', label: 'Company - Other Funds', rate: 0.25 },
  { value: 'dividend-less-than-gain', label: 'Dividend receipts of the fund are less than capital gains', rate: 0.125 },
  { value: 'holding-over-6', label: 'Holding period of the security is more than six years', rate: 0.0 },
];

export function GainTaxOnMutualFundsCalculator2025() {
  const [gain, setGain] = useState('');
  const [category, setCategory] = useState('ind-aop-stock');
  const [result, setResult] = useState(null);

  const selectedCategory = useMemo(
    () => CATEGORY_OPTIONS.find((option) => option.value === category) || CATEGORY_OPTIONS[0],
    [category]
  );

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0) {
      setResult(null);
      return;
    }
    const rate = selectedCategory.rate;
    const tax = g * rate;
    setResult({ gain: g, tax, rate });
  };

  return (
    <TaxCalculatorShell title="Gain Tax on Mutual Fund" subtitle="Mutual Fund / CIS / REIT (2025-2026)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Fund Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Enter Capital Gain on Funds (PKR)</label>
              <input
                value={gain}
                onChange={(e) => setGain(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter capital gain amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>
            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setGain(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>
        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Fund Category</th>
                      <td className="font-bold">{selectedCategory.label}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Capital Gain on Funds</th>
                      <td className="font-bold">{formatPKR(result.gain)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Applicable Rate</th>
                      <td className="font-bold">{(result.rate * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                      <th className="text-left">Capital Gain Annual Income Tax</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter gain amount and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Gain Tax on Mutual Fund Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Our gain tax on mutual fund calculator helps you estimate capital gains tax on Mutual Funds, CIS, and REITs in Pakistan.
            Choose the fund category and enter your capital gain to see instant, accurate results aligned with the 2025-2026 budget.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">What Is Capital Gains Tax on Mutual Funds?</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Capital gains tax is a final wealth tax charged when you redeem units of mutual funds, Collective Investment Schemes (CIS),
            or REITs. The deduction is applied at redemption, meaning investors typically do not report it separately in annual returns.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Gain Tax on Mutual Fund Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Accurate Tax Planning</div>
              <div className="mt-1">Avoid manual errors with precise rate selection.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Time Efficiency</div>
              <div className="mt-1">Instant estimates for quicker decisions.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Compliance</div>
              <div className="mt-1">Stay aligned with current tax regulations.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Future Projection</div>
              <div className="mt-1">Estimate tax outcomes for planned investments.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Portfolio Optimization</div>
              <div className="mt-1">Compare scenarios to improve tax efficiency.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Year-End Planning</div>
              <div className="mt-1">Plan redemptions to optimize tax impact.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of the Capital Gain on Mutual Fund Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Accurate Calculation:</span> Covers major fund categories and scenarios.</li>
            <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Clear inputs and readable results.</li>
            <li><span className="font-bold text-gray-900">Real-Time Updates:</span> Immediate results as inputs change.</li>
            <li><span className="font-bold text-gray-900">Up-to-Date Regulations:</span> Aligned with 2025-2026 rules.</li>
            <li><span className="font-bold text-gray-900">Detailed Results:</span> Clear breakdown of gain and tax.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Gain Tax on Mutual Fund Calculator?</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter your capital gain amount.</li>
            <li>Select the investor type and fund category.</li>
            <li>Click Calculate Tax to view results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Gain Tax on Mutual Fund Slabs in Pakistan (2025-2026)</div>
          <table className="paktax-table">
            <tbody>
              <tr><th className="text-left">Individuals / AOP - Stock Funds</th><td className="font-bold">15%</td></tr>
              <tr><th className="text-left">Individuals / AOP - Other Funds (REITs)</th><td className="font-bold">15%</td></tr>
              <tr><th className="text-left">Companies - Stock Funds</th><td className="font-bold">15%</td></tr>
              <tr><th className="text-left">Company - Other Funds (REITs)</th><td className="font-bold">25%</td></tr>
              <tr><th className="text-left">Dividend receipts less than capital gains</th><td className="font-bold">12.5%</td></tr>
              <tr><th className="text-left">Holding period exceeds six years</th><td className="font-bold">0%</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Capital Gain on Mutual Funds Tax Calculator Ensures Security</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>No sensitive personal information is required for calculations.</div>
            <div>All inputs are used only for on-page estimation and are not stored.</div>
            <div>Your privacy is protected and data is not shared with third parties.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">FAQs</div>
          <div className="text-sm text-gray-700 space-y-4">
            <div>
              <div className="font-bold text-gray-900">Are mutual fund capital gains taxed differently for companies?</div>
              <div className="mt-1">Yes. Companies investing in non-stock funds are taxed at 25%, while stock funds are taxed at 15%.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Do you need to pay CGT if your mutual fund is in a loss?</div>
              <div className="mt-1">No. Capital losses can be carried forward to offset future gains if reported in returns.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Can I avoid capital gain tax on mutual funds by investing?</div>
              <div className="mt-1">Holding periods exceeding six years can result in 0% tax under current rules.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Are mutual fund gains taxed differently via Roshan Digital Account?</div>
              <div className="mt-1">Currently, RDA follows the same gain tax rules as regular accounts.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
          <div className="text-sm text-gray-700">
            For inquiries or personalized support, contact our team. We are ready to assist you with compliance guidance and calculations.
          </div>
        </div>


        <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
          <div className="text-xl font-extrabold mb-2">Need Help With Mutual Fund Gain Tax?</div>
          <div className="text-sm text-gray-200">Share your investment details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

