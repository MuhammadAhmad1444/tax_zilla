import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function BuilderTaxCalculator2025({ variant = 'builder' }) {
  const [locationGroup, setLocationGroup] = useState('major'); // major|otherMajor|otherUrban
  const [propertyType, setPropertyType] = useState('residential'); // commercial|residential
  const [areaSqFt, setAreaSqFt] = useState('');
  const [result, setResult] = useState(null);

  const getRates = () => {
    const isMajor = locationGroup === 'major';
    // Based on public summaries: Karachi/Lahore/Islamabad vs other major vs other urban.
    const commercial = 210;
    const residentialBands = isMajor
      ? { upTo750: 20, mid: 40, above: 70 }
      : locationGroup === 'otherMajor'
        ? { upTo750: 15, mid: 35, above: 55 }
        : { upTo750: 10, mid: 25, above: 35 };
    return { commercial, residentialBands };
  };

  const handleCalculate = () => {
    const area = clampNonNegative(parseMoney(areaSqFt));
    if (area <= 0) {
      setResult(null);
      return;
    }
    const { commercial, residentialBands } = getRates();
    let ratePerSqFt = commercial;
    if (propertyType === 'residential') {
      if (area <= 750) ratePerSqFt = residentialBands.upTo750;
      else if (area <= 1500) ratePerSqFt = residentialBands.mid;
      else ratePerSqFt = residentialBands.above;
    }
    const tax = area * ratePerSqFt;
    setResult({ area, ratePerSqFt, tax });
  };

  return (
    <TaxCalculatorShell
      title={variant === 'builder' ? 'Pakistan Builder Tax Calculator' : 'Pakistan Developer Tax Calculator'}
      subtitle="Advance withholding on builders/developers (area-based, 2025-26 simplified)"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Location Group</label>
              <select
                value={locationGroup}
                onChange={(e) => setLocationGroup(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="major">Karachi / Lahore / Islamabad</option>
                <option value="otherMajor">Other Major Cities</option>
                <option value="otherUrban">Other Urban Areas</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Area (Sq Ft)</label>
              <input
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(e.target.value)}
                type="number"
                min="0"
                step="10"
                placeholder="Enter area in sq ft"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setAreaSqFt(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Tax Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Area</th>
                      <td className="font-bold">{result.area.toFixed(2)} sq ft</td>
                    </tr>
                    <tr>
                      <th className="text-left">Rate per Sq Ft</th>
                      <td className="font-bold">{formatPKR(result.ratePerSqFt).replace('PKR', 'Rs.')}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Total Tax Payable</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Select inputs and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

