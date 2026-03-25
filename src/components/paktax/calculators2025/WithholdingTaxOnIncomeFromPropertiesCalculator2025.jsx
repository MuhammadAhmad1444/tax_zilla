import React, { useState } from 'react';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function WithholdingTaxOnIncomeFromPropertiesCalculator2025() {
  const [taxpayerType, setTaxpayerType] = useState('individual'); // individual|company
  const [atlStatus, setAtlStatus] = useState('active'); // active|non
  const [annualGrossRent, setAnnualGrossRent] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const rent = clampNonNegative(parseMoney(annualGrossRent));
    if (rent <= 0) {
      setResult(null);
      return;
    }

    let tax = 0;
    if (taxpayerType === 'company') {
      const rate = atlStatus === 'active' ? 0.15 : 0.30;
      tax = rent * rate;
    } else {
      // Individuals and AOPs (annual gross rent)
      if (rent <= 300000) tax = 0;
      else if (rent <= 600000) {
        const excess = rent - 300000;
        tax = excess * (atlStatus === 'active' ? 0.05 : 0.10);
      } else if (rent <= 2000000) {
        const excess = rent - 600000;
        tax =
          (atlStatus === 'active' ? 15000 : 30000) + excess * (atlStatus === 'active' ? 0.10 : 0.20);
      } else {
        const excess = rent - 2000000;
        tax =
          (atlStatus === 'active' ? 155000 : 310000) + excess * (atlStatus === 'active' ? 0.25 : 0.50);
      }
    }

    setResult({ rent, tax });
  };

  return (
    <TaxCalculatorShell title="Withholding Tax on Income from Properties" subtitle="WHT on rental income (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Taxpayer Type</label>
              <select
                value={taxpayerType}
                onChange={(e) => setTaxpayerType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="individual">Individual / AOP</option>
                <option value="company">Company</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">ATL Status (applies to Individual/AOP)</label>
              <select
                value={atlStatus}
                onChange={(e) => setAtlStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="active">Active Taxpayer (ATL)</option>
                <option value="non">Non-Active Taxpayer (Non-ATL)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Gross Rent (PKR)</label>
              <input
                value={annualGrossRent}
                onChange={(e) => setAnnualGrossRent(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter annual gross rent"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setAnnualGrossRent(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>
        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="WHT Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Annual Gross Rent</th>
                      <td className="font-bold">{formatPKR(result.rent)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Withholding Tax Payable</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter annual gross rent and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

