import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney, computeIncomeTaxSlabs2025 } from './taxUtils2025.js';

const PROPERTY_TYPES = [
  { value: 'open', label: 'Open Plots' },
  { value: 'constructed', label: 'Constructed Property' },
  { value: 'flat', label: 'Flats' },
];

const HOLDING_PERIODS = [
  { value: 'lte-1', label: 'Does not exceed one year' },
  { value: 'gt-1-lte-2', label: 'Exceed one year but does not exceed two years' },
  { value: 'gt-2-lte-3', label: 'Exceed two year but does not exceed three years' },
  { value: 'gt-3-lte-4', label: 'Exceed three year but does not exceed four years' },
  { value: 'gt-4-lte-5', label: 'Exceed four year but does not exceed five years' },
  { value: 'gt-5-lte-6', label: 'Exceed five year but does not exceed six years' },
  { value: 'gt-6', label: 'Exceed six years' },
];

const OLD_REGIME_RATES = {
  open: {
    'lte-1': 0.15,
    'gt-1-lte-2': 0.125,
    'gt-2-lte-3': 0.10,
    'gt-3-lte-4': 0.075,
    'gt-4-lte-5': 0.05,
    'gt-5-lte-6': 0.025,
    'gt-6': 0.0,
  },
  constructed: {
    'lte-1': 0.15,
    'gt-1-lte-2': 0.10,
    'gt-2-lte-3': 0.075,
    'gt-3-lte-4': 0.05,
    'gt-4-lte-5': 0.0,
    'gt-5-lte-6': 0.0,
    'gt-6': 0.0,
  },
  flat: {
    'lte-1': 0.15,
    'gt-1-lte-2': 0.075,
    'gt-2-lte-3': 0.0,
    'gt-3-lte-4': 0.0,
    'gt-4-lte-5': 0.0,
    'gt-5-lte-6': 0.0,
    'gt-6': 0.0,
  },
};

const LEGAL_STATUS_OPTIONS = [
  { value: 'individual-aop', label: 'Individuals & AOPs' },
  { value: 'aop-restricted', label: 'AOP (Restricted)' },
  { value: 'small-company', label: 'Small Company' },
  { value: 'banking-company', label: 'Banking Company' },
  { value: 'other-company', label: 'All Other Companies' },
];

export function GainTaxOnPropertiesCalculator2025() {
  const [gain, setGain] = useState('');
  const [acquiredAfterJuly2024, setAcquiredAfterJuly2024] = useState('yes');
  const [propertyType, setPropertyType] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('');
  const [result, setResult] = useState(null);

  const selectedProperty = useMemo(
    () => PROPERTY_TYPES.find((option) => option.value === propertyType) || null,
    [propertyType]
  );

  const selectedHolding = useMemo(
    () => HOLDING_PERIODS.find((option) => option.value === holdingPeriod) || null,
    [holdingPeriod]
  );

  const getOldRegimeRate = () => {
    return OLD_REGIME_RATES[propertyType]?.[holdingPeriod] ?? 0.0;
  };

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0 || !propertyType || !holdingPeriod) {
      setResult(null);
      return;
    }

    let tax = 0;
    let rate = 0;
    let note = '';
    if (acquiredAfterJuly2024 === 'yes') {
      rate = 0.15;
      tax = g * rate;
      note = 'Post July 1, 2024 regime: flat 15% rate applied.';
    } else {
      rate = getOldRegimeRate();
      tax = g * rate;
      note = 'Pre July 1, 2024 regime based on holding period and property type.';
    }

    setResult({
      gain: g,
      tax,
      rate,
      note,
      propertyType: selectedProperty.label,
      holdingPeriod: selectedHolding.label,
      isAtl: true,
    });
  };

  return (
    <TaxCalculatorShell title="Capital Gain Properties Tax Calculator Pakistan 2025-2026" subtitle="Latest capital gain tax estimator for property">
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
                    checked={acquiredAfterJuly2024 === 'no'}
                    onChange={() => setAcquiredAfterJuly2024('no')}
                    className="accent-[var(--color-gold)]"
                  />
                  Property Bought Before 30th June 2024
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="purchaseWindow"
                    checked={acquiredAfterJuly2024 === 'yes'}
                    onChange={() => setAcquiredAfterJuly2024('yes')}
                    className="accent-[var(--color-gold)]"
                  />
                  Property Bought On or After 1st July 2024
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Enter Capital Gain on Properties (PKR)</label>
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

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="" disabled>Select property type</option>
                {PROPERTY_TYPES.map((option) => (
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
              >
                <option value="" disabled>Select holding period</option>
                {HOLDING_PERIODS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton
              onClick={() => {
                setResult(null);
                setGain('');
                setAcquiredAfterJuly2024('yes');
                setPropertyType('');
                setHoldingPeriod('');
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>

                <option value="" disabled>Select property type</option>
                <option value="" disabled>Select holding period</option>
        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    {acquiredAfterJuly2024 === 'no' && (
                      <>
                        <tr>
                          <th className="text-left">Property Type</th>
                          <td className="font-bold">{result.propertyType}</td>
                        </tr>
                        <tr>
                          <th className="text-left">Holding Period</th>
                          <td className="font-bold">{result.holdingPeriod}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <th className="text-left">Capital Gain on Properties</th>
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
              <div className="text-xs text-gray-500 mt-3">{result.note}</div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your gain and select the correct regime to view results.
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Capital Gain On Properties Tax Calculator</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Our Capital Gain On Properties Tax Calculator helps you estimate the tax implications of property investments in Pakistan.
            Enter your capital gain, select property type, holding period, and tax regime to see real-time results.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">What is the Capital Gain Tax on Properties?</div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Capital gain tax on properties applies to profits from selling immovable property. It is calculated as the difference between
            the purchase price and selling price, and varies by holding period and property type.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Capital Gain on Properties Tax Calculator?</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-gray-900">Precision in Tax Strategy</div>
              <div className="mt-1">Accurate planning by holding period and property type.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Time-Saving Efficiency</div>
              <div className="mt-1">Instant results without manual calculations.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Real Estate Focus</div>
              <div className="mt-1">Designed specifically for property transactions.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Insights for Property Types</div>
              <div className="mt-1">Different slabs for plots, constructed, and flats.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Flexible Timeframes</div>
              <div className="mt-1">Supports short-term and long-term investment goals.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Compliance Support</div>
              <div className="mt-1">Accurate estimates reduce compliance risks.</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Features of Capital Gain on Properties Tax Calculator</div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li><span className="font-bold text-gray-900">Classifying Property Types:</span> Open plots, constructed property, and flats.</li>
            <li><span className="font-bold text-gray-900">Category-Specific Rates:</span> Holding period based slabs for each type.</li>
            <li><span className="font-bold text-gray-900">Up-to-Date Regulations:</span> Aligned with 2025-2026 updates.</li>
            <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Clear inputs and instant results.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Capital Gain on Properties Tax Calculator?</div>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
            <li>Enter your capital gain amount.</li>
            <li>Select the purchase window and property type.</li>
            <li>Choose the holding period or legal status (post July 2024).</li>
            <li>Click Calculate Tax to view results.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">Capital Gain Tax on Properties Slabs (2024-2025)</div>
          <div className="text-sm text-gray-700 mb-4">For property bought before 30th June 2024.</div>
          <table className="paktax-table">
            <thead>
              <tr>
                <th className="text-left">Holding Period</th>
                <th className="text-left">Open Plots</th>
                <th className="text-left">Constructed Property</th>
                <th className="text-left">Flats</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Does not exceed 1 year</td><td>15%</td><td>15%</td><td>15%</td></tr>
              <tr><td>Exceed 1 year but does not exceed 2 years</td><td>12.5%</td><td>10%</td><td>7.5%</td></tr>
              <tr><td>Exceed 2 years but does not exceed 3 years</td><td>10%</td><td>7.5%</td><td>0%</td></tr>
              <tr><td>Exceed 3 years but does not exceed 4 years</td><td>7.5%</td><td>5%</td><td>0%</td></tr>
              <tr><td>Exceed 4 years but does not exceed 5 years</td><td>5%</td><td>0%</td><td>0%</td></tr>
              <tr><td>Exceed 5 years but does not exceed 6 years</td><td>2.5%</td><td>0%</td><td>0%</td></tr>
              <tr><td>Exceed 6 years</td><td>0%</td><td>0%</td><td>0%</td></tr>
            </tbody>
          </table>

          <div className="text-sm text-gray-700 mt-4">
            For property bought on or after 1st July 2024: ATL filers apply flat 15% rate. Non-ATL rates depend on legal status.
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How to Calculate Capital Gains Tax on Real Estate</div>
          <div className="text-sm text-gray-700 space-y-2">
            <div>Capital Gain = Sale Price − (Purchase Price + Allowable Expenses)</div>
            <div>CGT Payable = Capital Gain × Applicable Tax Rate</div>
            <div className="text-xs text-gray-500">Example: Rs. 3,000,000 gain at 10% = Rs. 300,000 tax.</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Capital Gain On Properties Tax Calculator Ensures Security</div>
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
              <div className="font-bold text-gray-900">Who is liable to pay capital gains tax on property sales?</div>
              <div className="mt-1">Anyone who earns a profit from selling property in Pakistan, including individuals and companies.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Can I offset renovation costs or transfer fees from the gain tax?</div>
              <div className="mt-1">Yes. Allowable expenses such as renovation and transfer charges can reduce taxable gain.</div>
            </div>
            <div>
              <div className="font-bold text-gray-900">Is capital gain tax applied to agricultural land?</div>
              <div className="mt-1">Agricultural land is covered under immovable property rules and is taxable on gain.</div>
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
          <div className="text-xl font-extrabold mb-2">Need Help With Property Gain Tax?</div>
          <div className="text-sm text-gray-200">Share your property details and our team can validate the slabs and provide a professional estimate report.</div>
          <div className="mt-4">
            <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
          </div>
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

