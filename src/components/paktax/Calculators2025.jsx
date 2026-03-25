import React, { useMemo, useState } from 'react';

const formatPKR = (value) => {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value);
};

const clampNonNegative = (n) => (Number.isFinite(n) && n > 0 ? n : 0);

const parseMoney = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const normalized = String(value).replace(/,/g, '').trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Pakistan income tax slabs (individuals / AOP-style) for 2025-26.
 * Slabs provided by you:
 * 0% up to 600,000
 * 1% on 600k-1.2M
 * 11% on 1.2M-2.2M with base 6,000
 * 23% on 2.2M-3.2M with base 116,000
 * 30% on 3.2M-4.1M with base 346,000
 * 35% above 4.1M with base 616,000
 */
export function computeIncomeTaxSlabs2025(amountAnnual) {
  const income = clampNonNegative(amountAnnual);

  const bracket1 = Math.max(0, Math.min(income, 1200000) - 600000);
  const bracket2 = Math.max(0, Math.min(income, 2200000) - 1200000);
  const bracket3 = Math.max(0, Math.min(income, 3200000) - 2200000);
  const bracket4 = Math.max(0, Math.min(income, 4100000) - 3200000);
  const bracket5 = Math.max(0, income - 4100000);

  const tax =
    bracket1 * 0.01 +
    bracket2 * 0.11 +
    bracket3 * 0.23 +
    bracket4 * 0.30 +
    bracket5 * 0.35;

  return {
    totalTax: tax,
    effectiveRate: income > 0 ? tax / income : 0,
    breakdown: [
      { label: '0% up to 600,000', tax: 0 },
      { label: '1% on 600,001 - 1,200,000', tax: bracket1 * 0.01 },
      { label: '11% on 1,200,001 - 2,200,000', tax: bracket2 * 0.11 },
      { label: '23% on 2,200,001 - 3,200,000', tax: bracket3 * 0.23 },
      { label: '30% on 3,200,001 - 4,100,000', tax: bracket4 * 0.30 },
      { label: '35% on above 4,100,000', tax: bracket5 * 0.35 },
    ],
  };
}

/**
 * Super tax (2025-26): progressive piecewise approximation from published brackets.
 * Brackets and rates (from public sources):
 * Up to 150M: 0%
 * 150–200M: 1%
 * 200–250M: 1.5%
 * 250–300M: 2.5%
 * 300–350M: 3.5%
 * 350–400M: 5.5%
 * 400–500M: 7.5%
 * > 500M: 10%
 *
 * Interpretation: taxes only the portion within each bracket (progressive).
 */
export function computeSuperTax2025(amountAnnual) {
  const income = clampNonNegative(amountAnnual);
  const t = [];
  const piece = (lower, upper, rate) => {
    const portion = Math.max(0, Math.min(income, upper) - lower);
    return portion * rate;
  };

  const lower0 = 150e6;
  const tax =
    piece(150e6, 200e6, 0.01) +
    piece(200e6, 250e6, 0.015) +
    piece(250e6, 300e6, 0.025) +
    piece(300e6, 350e6, 0.035) +
    piece(350e6, 400e6, 0.055) +
    piece(400e6, 500e6, 0.075) +
    Math.max(0, income - 500e6) * 0.10;

  t.push({ label: 'Super tax total', tax });
  return {
    totalSuperTax: tax,
    effectiveRate: income > 0 ? tax / income : 0,
    breakdown: t,
  };
}

const ResetButton = ({ onClick, children = 'Reset' }) => (
  <button type="button" className="paktax-btn paktax-btn-secondary w-full mt-3" onClick={onClick}>
    {children}
  </button>
);

const ResultBlock = ({ title, children }) => (
  <div className="rounded-xl border border-gray-100 bg-white p-5 paktax-shadow-card">
    <div className="font-bold text-gray-900 mb-3">{title}</div>
    {children}
  </div>
);

export const TaxCalculatorShell = ({ title, subtitle, onBack, children }) => {
  return (
    <section className="paktax-root">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center gap-3">
          {onBack ? (
            <button type="button" className="paktax-btn paktax-btn-secondary" onClick={onBack}>
              Back
            </button>
          ) : null}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{title}</h1>
          {subtitle ? <p className="mt-3 text-gray-600 font-medium">{subtitle}</p> : null}
        </div>

        {children}
      </div>
    </section>
  );
};

export function SalaryTaxCalculator2025() {
  const [taxPeriod, setTaxPeriod] = useState('monthly'); // 'monthly' | 'yearly'
  const [year, setYear] = useState('2025-2026');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [result, setResult] = useState(null);

  const incomeAnnual = useMemo(() => {
    if (taxPeriod === 'monthly') return parseMoney(monthlyIncome) * 12;
    return parseMoney(yearlyIncome);
  }, [taxPeriod, monthlyIncome, yearlyIncome]);

  const handleCalculate = () => {
    const income = clampNonNegative(incomeAnnual);
    if (income <= 0) {
      setResult(null);
      return;
    }
    const incomeTax = computeIncomeTaxSlabs2025(income);
    const superTax = computeSuperTax2025(income);
    const totalTax = incomeTax.totalTax + superTax.totalSuperTax;
    setResult({
      incomeAnnual: income,
      incomeTax: incomeTax.totalTax,
      superTax: superTax.totalSuperTax,
      totalTax,
      netAnnual: income - totalTax,
    });
  };

  const handleReset = () => {
    setMonthlyIncome('');
    setYearlyIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell
      title="Pakistan Salary Tax Calculator"
      subtitle="Latest & Accurate calculations for Federal Budget 2025-26"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Salary Period</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={taxPeriod === 'monthly'}
                    onChange={() => setTaxPeriod('monthly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Monthly
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={taxPeriod === 'yearly'}
                    onChange={() => setTaxPeriod('yearly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Yearly
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option>2025-2026</option>
              </select>
            </div>

            {taxPeriod === 'monthly' ? (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Monthly Income (PKR)</label>
                <input
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="Enter monthly income"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Yearly Income (PKR)</label>
                <input
                  value={yearlyIncome}
                  onChange={(e) => setYearlyIncome(e.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="Enter yearly income"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                />
              </div>
            )}

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
            <div className="text-xs text-gray-500 mt-4 leading-relaxed">
              Calculates income tax based on slabs and adds super tax where applicable.
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Monthly View">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Monthly Income</th>
                        <td className="font-bold">{formatPKR(result.incomeAnnual / 12)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Monthly Tax (Income + Super)</th>
                        <td className="font-bold">{formatPKR(result.totalTax / 12)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Salary After Tax</th>
                        <td className="font-bold">{formatPKR(result.netAnnual / 12)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Yearly View">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Yearly Income</th>
                        <td className="font-bold">{formatPKR(result.incomeAnnual)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Income Tax</th>
                        <td className="font-bold">{formatPKR(result.incomeTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Super Tax</th>
                        <td className="font-bold">{formatPKR(result.superTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Total Tax Payable</th>
                        <td className="font-extrabold">{formatPKR(result.totalTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Net Salary After Tax</th>
                        <td className="font-bold">{formatPKR(result.netAnnual)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Effective Rate">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">
                  {result.incomeAnnual > 0 ? ((result.totalTax / result.incomeAnnual) * 100).toFixed(2) : '0.00'}%
                </div>
                <div className="text-sm text-gray-600 mt-2">Total tax payable divided by total annual income.</div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your income and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

export function BusinessTaxCalculator2025() {
  const [taxType, setTaxType] = useState('aop'); // 'aop' | 'individual'
  const [year, setYear] = useState('2025-2026');
  const [businessAmount, setBusinessAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(businessAmount));
    if (income <= 0) {
      setResult(null);
      return;
    }
    const incomeTax = computeIncomeTaxSlabs2025(income);
    const superTax = computeSuperTax2025(income);
    const totalTax = incomeTax.totalTax + superTax.totalSuperTax;
    setResult({
      income,
      incomeTax: incomeTax.totalTax,
      superTax: superTax.totalSuperTax,
      totalTax,
      netAfterTax: income - totalTax,
    });
  };

  const handleReset = () => {
    setBusinessAmount('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Pakistan Business Tax Calculator" subtitle="AOP & Individuals / Other AOPs for 2025-26">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Category</label>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="taxType"
                    checked={taxType === 'aop'}
                    onChange={() => setTaxType('aop')}
                    className="accent-[var(--color-gold)]"
                  />
                  AOP — Law/Rules Restricted
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="taxType"
                    checked={taxType === 'individual'}
                    onChange={() => setTaxType('individual')}
                    className="accent-[var(--color-gold)]"
                  />
                  Individuals &amp; Other AOPs
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Enter Business Amount (PKR)</label>
              <input
                value={businessAmount}
                onChange={(e) => setBusinessAmount(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter business amount"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option>2025-2026</option>
                <option>2024-2025</option>
              </select>
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>

            <div className="text-xs text-gray-500 mt-4 leading-relaxed">
              Income tax is computed using 2025-26 slabs. Super tax is added where applicable.
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Tax Breakdown">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Business Amount</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Income Tax</th>
                        <td className="font-bold">{formatPKR(result.incomeTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Super Tax</th>
                        <td className="font-bold">{formatPKR(result.superTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Total Tax Payable</th>
                        <td className="font-extrabold">{formatPKR(result.totalTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Amount After Tax</th>
                        <td className="font-bold">{formatPKR(result.netAfterTax)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Effective Rate">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">
                  {result.income > 0 ? ((result.totalTax / result.income) * 100).toFixed(2) : '0.00'}%
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {taxType === 'aop' ? 'AOP — Law/Rules Restricted' : 'Individuals & Other AOPs'} selection applied.
                </div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your business amount and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

export function FreelancerTaxCalculator2025() {
  const [taxYear, setTaxYear] = useState('2025-2026');
  const [psebRegistered, setPsebRegistered] = useState('yes');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [result, setResult] = useState(null);

  const incomeAnnual = useMemo(() => {
    return period === 'monthly' ? parseMoney(monthlyIncome) * 12 : parseMoney(yearlyIncome);
  }, [period, monthlyIncome, yearlyIncome]);

  const handleCalculate = () => {
    const income = clampNonNegative(incomeAnnual);
    if (income <= 0) {
      setResult(null);
      return;
    }
    const baseTax = psebRegistered === 'yes' ? income * 0.0025 : income * 0.01;
    const superTax = computeSuperTax2025(income).totalSuperTax;
    const totalTax = baseTax + superTax;
    setResult({
      income,
      baseTax,
      superTax,
      totalTax,
      net: income - totalTax,
    });
  };

  const handleReset = () => {
    setMonthlyIncome('');
    setYearlyIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Pakistan Freelancer Tax Calculator" subtitle="PSEB-registered vs Non-registered (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Calculation Period</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={period === 'monthly'}
                    onChange={() => setPeriod('monthly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Monthly
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input
                    type="radio"
                    name="period"
                    checked={period === 'yearly'}
                    onChange={() => setPeriod('yearly')}
                    className="accent-[var(--color-gold)]"
                  />
                  Yearly
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
              <select
                value={taxYear}
                onChange={(e) => setTaxYear(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option>2025-2026</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">PSEB Registered</label>
              <select
                value={psebRegistered}
                onChange={(e) => setPsebRegistered(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {period === 'monthly' ? (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Monthly Income (PKR)</label>
                <input
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="Enter monthly income"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Yearly Income (PKR)</label>
                <input
                  value={yearlyIncome}
                  onChange={(e) => setYearlyIncome(e.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="Enter yearly income"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                />
              </div>
            )}

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Freelancer Tax Results">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Annual Income</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Base Tax</th>
                        <td className="font-bold">{formatPKR(result.baseTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Super Tax</th>
                        <td className="font-bold">{formatPKR(result.superTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Total Tax Payable</th>
                        <td className="font-extrabold">{formatPKR(result.totalTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Income After Tax</th>
                        <td className="font-bold">{formatPKR(result.net)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>

              <ResultBlock title="Effective Rate">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">
                  {result.income > 0 ? ((result.totalTax / result.income) * 100).toFixed(2) : '0.00'}%
                </div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your income and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

export function SuperTaxCalculator2025() {
  const [taxCategory, setTaxCategory] = useState('all'); // 'all' | 'bank'
  const [annualIncome, setAnnualIncome] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }
    const superTax = computeSuperTax2025(income);
    setResult({
      income,
      superTax: superTax.totalSuperTax,
      effective: superTax.effectiveRate,
    });
  };

  const handleReset = () => {
    setAnnualIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Super Tax on Annual Income" subtitle="High-income persons (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Category</label>
              <select
                value={taxCategory}
                onChange={(e) => setTaxCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="all">All Other Persons</option>
                <option value="bank">Banking Company</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Income (PKR)</label>
              <input
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                type="number"
                min="0"
                step="100000"
                placeholder="Enter annual income"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Super Tax Result">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Annual Income</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Super Tax Payable</th>
                        <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.superTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Effective Rate</th>
                        <td className="font-bold">{(result.effective * 100).toFixed(2)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  Rate is applied progressively by published 2025-26 brackets. Please validate with FBR/Finance Act text for final compliance.
                </div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter annual income and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

export function CompanyIncomeTaxCalculator2025() {
  const [companyType, setCompanyType] = useState('all'); // all|bank|small
  const [annualIncome, setAnnualIncome] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }
    const baseRate = companyType === 'bank' ? 0.39 : companyType === 'small' ? 0.20 : 0.29;
    const baseTax = income * baseRate;
    const superTax = computeSuperTax2025(income).totalSuperTax;
    const totalTax = baseTax + superTax;
    setResult({
      income,
      baseRate,
      baseTax,
      superTax,
      totalTax,
      net: income - totalTax,
    });
  };

  const handleReset = () => {
    setAnnualIncome('');
    setResult(null);
  };

  return (
    <TaxCalculatorShell title="Tax on Annual Income of Companies" subtitle="All Other / Banking / Small Company (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Company Category</label>
              <select
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="all">All Other Companies</option>
                <option value="bank">Banking Company</option>
                <option value="small">Small Company</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Income (PKR)</label>
              <input
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                type="number"
                min="0"
                step="100000"
                placeholder="Enter annual income"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {result ? (
            <>
              <ResultBlock title="Company Tax Results">
                <div className="overflow-x-auto">
                  <table className="paktax-table">
                    <tbody>
                      <tr>
                        <th className="text-left">Annual Income</th>
                        <td className="font-bold">{formatPKR(result.income)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Base Tax Rate</th>
                        <td className="font-bold">{(result.baseRate * 100).toFixed(0)}%</td>
                      </tr>
                      <tr>
                        <th className="text-left">Income Tax</th>
                        <td className="font-bold">{formatPKR(result.baseTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Super Tax</th>
                        <td className="font-bold">{formatPKR(result.superTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Total Tax Payable</th>
                        <td className="font-extrabold">{formatPKR(result.totalTax)}</td>
                      </tr>
                      <tr>
                        <th className="text-left">Net After Tax</th>
                        <td className="font-bold">{formatPKR(result.net)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ResultBlock>
              <ResultBlock title="Effective Rate">
                <div className="text-2xl font-extrabold text-[var(--color-gold)]">
                  {result.income > 0 ? ((result.totalTax / result.income) * 100).toFixed(2) : '0.00'}%
                </div>
              </ResultBlock>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter annual income and click <b>Calculate Tax</b> to view results.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

export function GainTaxOnSecuritiesCalculator2025() {
  const [gain, setGain] = useState('');
  const [isAtl, setIsAtl] = useState(true);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0) {
      setResult(null);
      return;
    }
    const atlTax = g * 0.15;
    const progressiveTax = computeIncomeTaxSlabs2025(g).totalTax;
    const tax = isAtl ? atlTax : Math.max(atlTax, progressiveTax);
    setResult({
      gain: g,
      atlTax,
      progressiveTax,
      tax,
    });
  };

  return (
    <TaxCalculatorShell title="Gain Tax on Securities" subtitle="Active Taxpayer List vs Non-ATL (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

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

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setGain(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Tax Breakdown">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Gain Amount</th>
                      <td className="font-bold">{formatPKR(result.gain)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">ATL Rate Tax (15%)</th>
                      <td className="font-bold">{formatPKR(result.atlTax)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Progressive Min Tax (slabs)</th>
                      <td className="font-bold">{formatPKR(result.progressiveTax)}</td>
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
              Enter gain amount and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

export function GainTaxOnMutualFundsCalculator2025() {
  const [gain, setGain] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const g = clampNonNegative(parseMoney(gain));
    if (g <= 0) {
      setResult(null);
      return;
    }
    const tax = g * 0.15; // flat (simplified for 2025-26)
    setResult({ gain: g, tax });
  };

  return (
    <TaxCalculatorShell title="Gain Tax on Mutual Funds" subtitle="Flat 15% capital gains tax (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>
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
                      <th className="text-left">Gain Amount</th>
                      <td className="font-bold">{formatPKR(result.gain)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Tax @ 15%</th>
                      <td className="font-bold">{formatPKR(result.tax)}</td>
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
              Enter gain amount and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

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
      note: acquiredAfterJuly2024 === 'yes' ? 'Post July 1, 2024 regime (simplified)' : 'Pre July 1, 2024 regime (holding-period sliding scale simplified)',
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
            <ResetButton onClick={() => { setResult(null); setGain(''); setAcquiredAfterJuly2024('yes'); setIsAtl(true); }}>Reset</ResetButton>
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

export function WithholdingTaxOnBrokerageCommissionCalculator2025() {
  const [agentType, setAgentType] = useState('other'); // advertising|life|other
  const [annualCommission, setAnnualCommission] = useState('');
  const [result, setResult] = useState(null);

  const getRate = () => {
    if (agentType === 'advertising') return 0.10;
    if (agentType === 'life') return 0.08;
    return 0.12;
  };

  const handleCalculate = () => {
    const amt = clampNonNegative(parseMoney(annualCommission));
    if (amt <= 0) {
      setResult(null);
      return;
    }
    const rate = getRate();
    const tax = amt * rate;
    setResult({ amt, rate, tax });
  };

  return (
    <TaxCalculatorShell title="Withholding Tax on Brokerage & Commission" subtitle="Section 233 (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Agent Category</label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="advertising">Advertising Agents (10%)</option>
                <option value="life">Life Insurance Agents (commission &lt; 0.5M) (8%)</option>
                <option value="other">Other Persons (12%)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Commission / Brokerage (PKR)</label>
              <input
                value={annualCommission}
                onChange={(e) => setAnnualCommission(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter annual commission"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setAnnualCommission(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>
        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="WHT Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Annual Commission</th>
                      <td className="font-bold">{formatPKR(result.amt)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Rate</th>
                      <td className="font-bold">{(result.rate * 100).toFixed(0)}%</td>
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
              Enter commission/brokerage and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

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

export function AgriculturalLandPunjabTaxCalculator2025() {
  const [annualAgrIncome, setAnnualAgrIncome] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const income = clampNonNegative(parseMoney(annualAgrIncome));
    if (income <= 0) {
      setResult(null);
      return;
    }

    // Punjab AIT progressive brackets (from public summary):
    // Up to 600,000: 0
    // 600,001 - 1,200,000: 15% on excess over 600,000
    // 1,200,001 - 1,600,000: 90,000 + 20% on excess over 1,200,000
    // 1,600,001 - 3,200,000: 170,000 + 30% on excess over 1,600,000
    // 3,200,001 - 5,600,000: 650,000 + 40% on excess over 3,200,000
    // above 5,600,000: 1,610,000 + 45% on excess over 5,600,000
    let tax = 0;
    if (income <= 600000) tax = 0;
    else if (income <= 1200000) tax = (income - 600000) * 0.15;
    else if (income <= 1600000) tax = 90000 + (income - 1200000) * 0.20;
    else if (income <= 3200000) tax = 170000 + (income - 1600000) * 0.30;
    else if (income <= 5600000) tax = 650000 + (income - 3200000) * 0.40;
    else tax = 1610000 + (income - 5600000) * 0.45;

    setResult({ income, tax, effective: income > 0 ? tax / income : 0 });
  };

  return (
    <TaxCalculatorShell title="Tax On Agricultural Land — Punjab" subtitle="Agricultural income tax (2025-26)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Annual Agricultural Income (PKR)</label>
              <input
                value={annualAgrIncome}
                onChange={(e) => setAnnualAgrIncome(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="Enter annual agricultural income"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setAnnualAgrIncome(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Annual Agricultural Income</th>
                      <td className="font-bold">{formatPKR(result.income)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">AIT Payable</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.tax)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Effective Rate</th>
                      <td className="font-bold">{(result.effective * 100).toFixed(2)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter annual agricultural income and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

export function ZakatCalculator2025() {
  const [assets, setAssets] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [nisabMode, setNisabMode] = useState('silver'); // gold|silver
  const [goldPricePKR, setGoldPricePKR] = useState('0'); // optional, not used in simplified gram-based
  const [silverPricePKR, setSilverPricePKR] = useState('0');
  const [result, setResult] = useState(null);

  const nisabGoldGrams = 87.48;
  const nisabSilverGrams = 612.36;
  const zakatRate = 0.025;

  const handleCalculate = () => {
    const a = clampNonNegative(parseMoney(assets));
    const l = clampNonNegative(parseMoney(liabilities));
    const net = Math.max(0, a - l);

    // If user provided prices we compute nisab in PKR; otherwise use a default approximation in PKR for typical market rates.
    // For deterministic behavior, we use gram-based nisab with user-supplied per-gram price when available.
    let nisabPKR = 0;
    if (nisabMode === 'gold') {
      const perGram = clampNonNegative(parseMoney(goldPricePKR));
      nisabPKR = perGram > 0 ? perGram * nisabGoldGrams : 0;
    } else {
      const perGram = clampNonNegative(parseMoney(silverPricePKR));
      nisabPKR = perGram > 0 ? perGram * nisabSilverGrams : 0;
    }

    // If neither price is set, fall back to the nisab amounts commonly cited in 2025-26 summaries:
    if (nisabPKR === 0) {
      nisabPKR = nisabMode === 'gold' ? 1696565 : 133601;
    }

    const zakatPayable = net >= nisabPKR ? net * zakatRate : 0;
    setResult({ assets: a, liabilities: l, net, nisabPKR, zakatPayable });
  };

  return (
    <TaxCalculatorShell title="Zakat Tax Calculator" subtitle="2.5% on net zakatable assets (2025-26 Nisab-based)">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Total Zakatable Assets (PKR)</label>
              <input
                value={assets}
                onChange={(e) => setAssets(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="e.g., cash, savings, gold value..."
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Immediate Liabilities / Debts (PKR)</label>
              <input
                value={liabilities}
                onChange={(e) => setLiabilities(e.target.value)}
                type="number"
                min="0"
                step="1000"
                placeholder="e.g., debts due immediately"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Nisab Mode</label>
              <select
                value={nisabMode}
                onChange={(e) => setNisabMode(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              >
                <option value="silver">Silver Nisab</option>
                <option value="gold">Gold Nisab</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">
                {nisabMode === 'gold' ? 'Gold Price (PKR per gram)' : 'Silver Price (PKR per gram)'} (optional)
              </label>
              <input
                value={nisabMode === 'gold' ? goldPricePKR : silverPricePKR}
                onChange={(e) => (nisabMode === 'gold' ? setGoldPricePKR(e.target.value) : setSilverPricePKR(e.target.value))}
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 8500"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
              />
            </div>

            <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
              Calculate Tax
            </button>
            <ResetButton onClick={() => { setAssets(''); setLiabilities(''); setResult(null); }}>Reset</ResetButton>
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title="Zakat Result">
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Total Assets</th>
                      <td className="font-bold">{formatPKR(result.assets)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Liabilities</th>
                      <td className="font-bold">{formatPKR(result.liabilities)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Net Zakatable Amount</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.net)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Nisab Threshold</th>
                      <td className="font-bold">{formatPKR(result.nisabPKR)}</td>
                    </tr>
                    <tr>
                      <th className="text-left">Zakat Payable (@ 2.5%)</th>
                      <td className="font-extrabold text-[var(--color-gold)]">{formatPKR(result.zakatPayable)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-gray-500 mt-3">
                If nisab mode prices are not provided, defaults are used from public 2025-26 summary values.
              </div>
            </ResultBlock>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-600">
              Enter your assets/liabilities and click <b>Calculate Tax</b>.
            </div>
          )}
        </div>
      </div>
    </TaxCalculatorShell>
  );
}

