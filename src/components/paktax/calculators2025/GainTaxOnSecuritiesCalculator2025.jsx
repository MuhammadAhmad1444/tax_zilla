import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney, computeIncomeTaxSlabs2025 } from './taxUtils2025.js';

const PROFILE_OPTIONS = [
  { value: 'on-after-2022-individual-aop', label: 'On or After 01 July 2022 - Individual / AOP' },
  { value: 'before-2022-individual-aop', label: 'Before 01 July 2022 - Individual / AOP' },
  { value: 'companies', label: 'Companies' },
  { value: 'banking-company', label: 'Banking Company' },
  { value: 'small-company', label: 'Small Company' },
  { value: 'future-commodity-pmex', label: 'Future Commodity Contract by Member of Pakistan Mercantile Exchange' },
  { value: 'before-2013-individual-aop', label: 'Before 01 July 2013 - Individual / AOP' },
];

const HOLDING_PERIODS = [
  { value: 'lte-1', label: 'Does not exceed one year' },
  { value: 'gt-1-lte-2', label: 'Exceed one year but does not exceed two years' },
  { value: 'gt-2-lte-3', label: 'Exceed two years but does not exceed three years' },
  { value: 'gt-3-lte-4', label: 'Exceed three years but does not exceed four years' },
  { value: 'gt-4-lte-5', label: 'Exceed four years but does not exceed five years' },
  { value: 'gt-5-lte-6', label: 'Exceed five years but does not exceed six years' },
  { value: 'gt-6', label: 'Exceed six years' },
];

const HOLDING_RATES = {
  'lte-1': 0.15,
  'gt-1-lte-2': 0.125,
  'gt-2-lte-3': 0.10,
  'gt-3-lte-4': 0.075,
  'gt-4-lte-5': 0.05,
  'gt-5-lte-6': 0.025,
  'gt-6': 0.0,
};

export function GainTaxOnSecuritiesCalculator2025() {
  const [gain, setGain] = useState('');
  const [purchaseWindow, setPurchaseWindow] = useState('before-2024-07-01');
  const [profile, setProfile] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('');
  const [isAtl, setIsAtl] = useState('');
  const [result, setResult] = useState(null);

  const shouldShowHolding = useMemo(() => purchaseWindow === 'before-2024-07-01', [purchaseWindow]);

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0 || !profile) {
      setResult(null);
      return;
    }
    let rate = 0.0;
    let tax = 0.0;
    let note = '';

    if (purchaseWindow === 'before-2024-07-01') {
      if (profile !== 'future-commodity-pmex' && !holdingPeriod) {
        setResult(null);
        return;
      }
      if (profile === 'future-commodity-pmex') {
        rate = 0.05;
        tax = g * rate;
      } else {
        rate = HOLDING_RATES[holdingPeriod] ?? 0.0;
        tax = g * rate;
      }

      if (profile !== 'on-after-2022-individual-aop' && profile !== 'future-commodity-pmex') {
        note = 'Rates shown are based on Individual/AOP slabs unless specific tables are provided.';
      }
    } else {
      if (!isAtl) {
        setResult(null);
        return;
      }
      const atlTax = g * 0.15;
      const progressiveTax = computeIncomeTaxSlabs2025(g).totalTax;
      rate = 0.15;
      const atlSelected = isAtl === 'yes';
      tax = atlSelected ? atlTax : Math.max(atlTax, progressiveTax);
      note = atlSelected
        ? 'ATL flat 15% applied for securities acquired on/after 01 July 2024.'
        : 'Non-ATL uses slabs with minimum 15%.';
    }

    setResult({
      gain: g,
      tax,
      rate,
      note,
    });
  };

  return (
    <TaxCalculatorShell title="Capital Gain Securities Tax Calculator Pakistan" subtitle="Latest budget-aligned estimator (2024-2025)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Purchase Date Window</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="purchaseWindow"
                    checked={purchaseWindow === 'before-2024-07-01'}
                    onChange={() => setPurchaseWindow('before-2024-07-01')}
                    className="accent-[var(--color-gold)]"
                  />
                  Securities Purchased Before 30th June 2024
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="purchaseWindow"
                    checked={purchaseWindow === 'on-after-2024-07-01'}
                    onChange={() => setPurchaseWindow('on-after-2024-07-01')}
                    className="accent-[var(--color-gold)]"
                  />
                  Securities Purchased After 01st July 2024
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Financial Profile</label>
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>Select financial profile</option>
                {PROFILE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Holding Period</label>
              <select
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                disabled={!shouldShowHolding}
              >
                <option value="" disabled>Select holding period</option>
                {HOLDING_PERIODS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {!shouldShowHolding && (
                <div className="text-xs text-gray-500 mt-2">
                  For securities purchased after 01 July 2024, ATL status applies the flat rate (holding period not required).
                </div>
              )}
            </div>

            {purchaseWindow === 'on-after-2024-07-01' && (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">ATL Status</label>
                <select
                  value={isAtl}
                  onChange={(e) => setIsAtl(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                >
                  <option value="" disabled>Select ATL status</option>
                  <option value="yes">ATL filer</option>
                  <option value="no">Non-ATL filer</option>
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Capital Gain Amount (PKR)</label>
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
            <ResetButton
              onClick={() => {
                setGain('');
                setProfile('');
                setHoldingPeriod('');
                setIsAtl('');
                setResult(null);
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Tax Breakdown">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Capital Gain</th>
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
              {result.note && <div className="text-xs text-gray-500 mt-3">{result.note}</div>}
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your gain amount, select the purchase window, profile, and holding period, then click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Pakistan Capital Gain Tax on Securities Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            This advanced calculator helps you estimate capital gain tax on securities under the 2024-2025 budget. Input your gain,
            select the purchase window, and choose the holding period to get accurate, real-time results.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">What is the Capital Gain Tax on Securities in Pakistan?</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Capital gains tax on securities applies when you sell financial instruments such as stocks, bonds, or futures at a profit.
            The tax is calculated on the difference between sale proceeds and purchase cost and varies by holding period and acquisition date.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Capital Gain on Securities Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Precision in Tax Planning</div>
              <div className="mt-1">Accurate calculations for holding period and rates.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Time-Saving Efficiency</div>
              <div className="mt-1">Instant estimates without manual work.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Tailored to Securities</div>
              <div className="mt-1">Designed specifically for securities transactions.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Real-Time Scenario Analysis</div>
              <div className="mt-1">Adjust parameters and see results immediately.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Versatile Timeframes</div>
              <div className="mt-1">Short- and long-term holdings are supported.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Compliance Support</div>
              <div className="mt-1">Accurate estimates reduce compliance risk.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of Our Capital Gain on Securities Tax Estimator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Distinguishing Securities Types:</span> Tailored selection for profiles and periods.</li>
            <li><span className="font-bold text-gray-900">Up-to-Date Tax Information:</span> Aligned with recent budget updates.</li>
            <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Quick inputs and instant results.</li>
            <li><span className="font-bold text-gray-900">Instant Real-Time Updates:</span> Adjust inputs and see changes instantly.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out the Capital Gain on Securities Tax Calculator</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter your capital gain amount.</li>
            <li>Select the financial profile and purchase window.</li>
            <li>Choose the holding period (where applicable).</li>
            <li>Click Calculate Tax to view results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Capital Gain on Securities Tax Slabs in Pakistan (2024-2025)</div>
          <div className="text-sm text-gray-700 mb-4">For securities acquired between 01 July 2022 and 30 June 2024.</div>
          <table className="paktax-table">
            <tbody>
              <tr><th className="text-left">Holding period does not exceed 1 year</th><td className="font-bold">15%</td></tr>
              <tr><th className="text-left">Exceeds 1 year but does not exceed 2 years</th><td className="font-bold">12.5%</td></tr>
              <tr><th className="text-left">Exceeds 2 years but does not exceed 3 years</th><td className="font-bold">10%</td></tr>
              <tr><th className="text-left">Exceeds 3 years but does not exceed 4 years</th><td className="font-bold">7.5%</td></tr>
              <tr><th className="text-left">Exceeds 4 years but does not exceed 5 years</th><td className="font-bold">5%</td></tr>
              <tr><th className="text-left">Exceeds 5 years but does not exceed 6 years</th><td className="font-bold">2.5%</td></tr>
              <tr><th className="text-left">Exceeds 6 years</th><td className="font-bold">0%</td></tr>
              <tr><th className="text-left">Future commodity contracts (PMEX members)</th><td className="font-bold">5%</td></tr>
            </tbody>
          </table>
          <div className="text-sm text-gray-700 mt-4">
            For securities acquired on or after 01 July 2024: flat 15% for ATL filers. For non-filers, normal income tax slab rates apply with minimum 15%.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Calculate Gain Tax</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>Capital Gain = Sale Price − Purchase Price</div>
            <div>Gain Tax = Capital Gain × Applicable Tax Rate</div>
            <div className="text-xs text-gray-500">Example: Rs. 50,000 gain at 12.5% = Rs. 6,250 tax.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Gain Tax on Securities Calculator Ensures Security</div>
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
              <div className="font-bold text-gray-900">Is there any tax on inherited property in Pakistan?</div>
              <div className="mt-1">Yes. Capital gains tax applies on sale based on original purchase price and holding period.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Who pays capital gains tax on property sales?</div>
              <div className="mt-1">The seller is responsible for paying the tax.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">How to legally reduce gain tax in Pakistan?</div>
              <div className="mt-1">Longer holding periods reduce tax. Consult a qualified tax adviser for exemptions and reliefs.</div>
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
          <div className="text-xl font-extrabold mb-2">Need Help With Capital Gain Tax Planning?</div>
          <div className="text-sm text-gray-200">Share your gain details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

