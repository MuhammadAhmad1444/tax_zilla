import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney, computeIncomeTaxSlabs2025 } from './taxUtils2025.js';

export function GainTaxOnPropertiesCalculator2025() {
  const [gain, setGain] = useState('');
  const [acquiredAfterJuly2024, setAcquiredAfterJuly2024] = useState('yes');
  const [isAtl, setIsAtl] = useState(true);
  const [propertyType, setPropertyType] = useState('open'); // open|constructed|flat
  const [holdingPeriodYears, setHoldingPeriodYears] = useState('1'); // simplified bracket selection
  const [result, setResult] = useState(null);

  const getOldRegimeRate = () => {
    // Sliding scale (from public summaries for pre-July 1 2024 regime)
    const y = clampNonNegative(parseMoney(holdingPeriodYears));
    if (y <= 1) return propertyType === 'flat' ? 0.15 : propertyType === 'constructed' ? 0.15 : 0.15;
    if (y <= 2) {
      if (propertyType === 'flat') return 0.075;
      if (propertyType === 'constructed') return 0.10;
      return 0.125;
    }
    if (y <= 3) {
      if (propertyType === 'flat') return 0.0;
      if (propertyType === 'constructed') return 0.075;
      return 0.10;
    }
    if (y <= 4) {
      if (propertyType === 'flat') return 0.0;
      if (propertyType === 'constructed') return 0.05;
      return 0.075;
    }
    if (y <= 5) {
      if (propertyType === 'flat') return 0.0;
      if (propertyType === 'constructed') return 0.0;
      return 0.05;
    }
    if (y <= 6) {
      if (propertyType === 'open') return 0.025;
      return 0.0;
    }
    return 0.0;
  };

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0) {
      setResult(null);
      return;
    }

    let tax = 0;
    if (acquiredAfterJuly2024 === 'yes') {
      // After July 1, 2024: simplified
      // ATL: flat 15%
      // Non-ATL: minimum 15% and progressive min; approximate with max(15%, slab-based tax)
      const atlTax = g * 0.15;
      const progressiveTax = computeIncomeTaxSlabs2025(g).totalTax;
      tax = isAtl ? atlTax : Math.max(atlTax, progressiveTax);
    } else {
      const rate = getOldRegimeRate();
      tax = g * rate;
    }

    setResult({
      gain: g,
      tax,
      note:
        acquiredAfterJuly2024 === 'yes'
          ? 'Post July 1, 2024 regime (simplified)'
          : 'Pre July 1, 2024 regime (holding-period sliding scale simplified)',
    });
  };

  return (
    <TaxCalculatorShell title="Gain Tax on Properties" subtitle="Capital gains tax on immovable property (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Acquisition Date Regime</label>
              <select
                value={acquiredAfterJuly2024}
                onChange={(e) => setAcquiredAfterJuly2024(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="yes">Acquired on/after 1 July 2024</option>
                <option value="no">Acquired before 1 July 2024</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Gain Amount (PKR)</label>
              <input
                value={gain}
                onChange={(e) => setGain(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter gain amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            {acquiredAfterJuly2024 === 'yes' ? (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">ATL Status</label>
                <select
                  value={isAtl ? 'yes' : 'no'}
                  onChange={(e) => setIsAtl(e.target.value === 'yes')}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                >
                  <option value="yes">ATL filer</option>
                  <option value="no">Non-ATL filer</option>
                </select>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                  >
                    <option value="open">Open plot</option>
                    <option value="constructed">Constructed property</option>
                    <option value="flat">Flat</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Holding Period (years)</label>
                  <input
                    value={holdingPeriodYears}
                    onChange={(e) => setHoldingPeriodYears(e.target.value)}
                    type="number"
                    min="0"
                    step="0.5"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                  />
                </div>
              </>
            )}

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton
              onClick={() => {
                setResult(null);
                setGain('');
                setAcquiredAfterJuly2024('yes');
                setIsAtl(true);
              }}
            >
              Reset
            </ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Gain Amount</th>
                      <td className="font-bold">{formatPKR(result.gain)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Total Capital Gains Tax</th>
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
    </TaxCalculatorShell>
  );
}

