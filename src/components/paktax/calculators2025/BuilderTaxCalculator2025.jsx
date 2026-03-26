import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TaxCalculatorShell, ResetButton, ResultBlock } from './calculatorUi2025.jsx';
import { formatPKR, clampNonNegative, parseMoney } from './taxUtils2025.js';

export function BuilderTaxCalculator2025({ variant = 'builder' }) {
  const isDeveloper = variant === 'developer';
  const [propertyType, setPropertyType] = useState(''); // commercial|residential
  const [areaSqFt, setAreaSqFt] = useState('');
  const [taxYear, setTaxYear] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);

  const getRates = () => {
    // Per square yard rates and city lists (List A/B/C)
    const commercial = 210; // Rs. per Sq Yd for commercial (applies across lists)
    const listA = { upTo120: 20, mid: 40, above: 70 };
    const listB = { upTo120: 15, mid: 35, above: 55 };
    const listC = { upTo120: 10, mid: 25, above: 35 };
    return { commercial, listA, listB, listC };
  };

  const handleCalculate = () => {
    const area = clampNonNegative(parseMoney(areaSqFt));
    if (area <= 0 || !taxYear || !propertyType || !city) {
      setResult(null);
      return;
    }
    const rates = getRates();
    let ratePerUnit = rates.commercial;

    const listACities = ['Karachi', 'Lahore', 'Islamabad'];
    const listBCities = ['Hyderabad', 'Sukkur', 'Multan', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Sahiwal', 'Peshawar', 'Mardan', 'Abbottabad'];
    const cityNormalized = (city || '').trim();
    let bands = rates.listC; // default
    if (listACities.includes(cityNormalized)) bands = rates.listA;
    else if (listBCities.includes(cityNormalized)) bands = rates.listB;

    if (propertyType === 'residential') {
      if (area <= 120) ratePerUnit = bands.upTo120;
      else if (area <= 200) ratePerUnit = bands.mid;
      else ratePerUnit = bands.above;
    }

    const tax = area * ratePerUnit;
    setResult({ area, ratePerUnit, tax });
  };

  return (
    <TaxCalculatorShell
      title={variant === 'builder' ? 'Pakistan Builder Tax Calculator' : 'Pakistan Developer Tax Calculator'}
      subtitle={
        isDeveloper
          ? 'Latest developer tax calculator for Pakistan 2025-2026 budget (area-based)'
          : 'Latest builder tax calculator for Pakistan 2024-2025 budget (area-based)'
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="font-bold text-gray-900 mb-4">Inputs</div>

            {isDeveloper || variant === 'builder' ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Tax Year</label>
                  <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white">
                    <option value="" disabled>Select tax year</option>
                    {isDeveloper ? (
                      <>
                        <option value="2025-2026">2025-2026</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2022-2023">2022-2023</option>
                      </>
                    ) : (
                      <>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2023-2024">2023-2024</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                  >
                    <option value="" disabled>Select property type</option>
                    <option value="commercial">Commercial Property</option>
                    <option value="residential">Residential Property</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">City</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white">
                    <option value="" disabled>Select city</option>
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Hyderabad</option>
                    <option>Sukkur</option>
                    <option>Multan</option>
                    <option>Faisalabad</option>
                    <option>Rawalpindi</option>
                    <option>Gujranwala</option>
                    <option>Sahiwal</option>
                    <option>Peshawar</option>
                    <option>Mardan</option>
                    <option>Abbottabad</option>
                    <option>Urban Areas Not Specified Above</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-800 mb-2">Area (Sq Yd)</label>
                  <input
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(e.target.value)}
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Enter area in square yards"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 bg-white"
                  />
                </div>

                <button type="button" className="paktax-btn paktax-btn-primary w-full" onClick={handleCalculate}>
                  Calculate Tax
                </button>
                <ResetButton
                  onClick={() => {
                    setAreaSqFt('');
                    setTaxYear('');
                    setPropertyType('');
                    setCity('');
                    setResult(null);
                  }}
                >
                  Reset
                </ResetButton>
              </>
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ResultBlock title={isDeveloper ? 'Developer Tax Result' : 'Tax Result'}>
              <div className="overflow-x-auto">
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">Area</th>
                      <td className="font-bold">{result.area.toFixed(2)} sq yd</td>
                    </tr>
                    {(isDeveloper || variant === 'builder') && (
                      <tr>
                        <th className="text-left">Tax Year</th>
                        <td className="font-bold">{taxYear}</td>
                      </tr>
                    )}
                    {(isDeveloper || variant === 'builder') && (
                      <tr>
                        <th className="text-left">City</th>
                        <td className="font-bold">{city}</td>
                      </tr>
                    )}
                    <tr>
                      <th className="text-left">Rate per Sq Yd</th>
                      <td className="font-bold">{formatPKR(result.ratePerUnit).replace('PKR', 'Rs.')}</td>
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

      {isDeveloper && (
        <div className="mt-10 space-y-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Developer Tax Calculator?</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="font-bold text-gray-900">Accurate Calculation Assurance</div>
                <div className="mt-1">Precision based on property type, location, and area for dependable estimates.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Time-Saving Efficiency</div>
                <div className="mt-1">Fast calculations reduce manual errors and keep projects on schedule.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Tailored to Property Types</div>
                <div className="mt-1">Commercial and residential slabs are handled independently for accuracy.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Insights Based on Location</div>
                <div className="mt-1">City-specific rates help ensure compliance across regions.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Real-Time Scenario Analysis</div>
                <div className="mt-1">Adjust inputs instantly to compare outcomes as project details change.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Risk Mitigation for Compliance</div>
                <div className="mt-1">Clear slab logic reduces the chance of under- or over-reporting.</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Discover the Features of the Pakistan Developer Tax Estimator</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><span className="font-bold text-gray-900">Distinguishing Property Types:</span> Separate slabs for commercial vs residential projects.</li>
              <li><span className="font-bold text-gray-900">Location-Specific Tax Rates:</span> City selection aligns with List A, List B, or List C categories.</li>
              <li><span className="font-bold text-gray-900">Up-to-Date Tax Information:</span> Based on the latest 2025-2026 budget structure.</li>
              <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Simple inputs with instant results.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Developer Tax Calculator</div>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
              <li>Enter the property area in square yards.</li>
              <li>Select the fiscal year from the dropdown.</li>
              <li>Choose the property type (Commercial or Residential).</li>
              <li>Select the city or urban area to apply the correct slab.</li>
              <li>Click Calculate Tax to view the result instantly.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Developer Income Tax Slabs in Pakistan (2024-2025)</div>
            <div className="text-sm text-gray-700 mb-4">These slab rates are applied per square yard as per city category.</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="font-bold text-gray-900 mb-2">Commercial Plots</div>
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">List A Cities (Karachi, Lahore, Islamabad)</th>
                      <td className="font-bold">Rs. 210 / Sq Yd</td>
                    </tr>
                    <tr>
                      <th className="text-left">List B Cities (Hyderabad, Sukkur, Multan, Faisalabad, Rawalpindi, Gujranwala, Sahiwal, Peshawar, Mardan, Abbottabad)</th>
                      <td className="font-bold">Rs. 210 / Sq Yd</td>
                    </tr>
                    <tr>
                      <th className="text-left">List C Cities (Urban Areas Not Specified Above)</th>
                      <td className="font-bold">Rs. 210 / Sq Yd</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-2">Residential Plots</div>
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">List A Cities</th>
                      <td className="font-bold">Up to 120: Rs. 20, 121-200: Rs. 40, 201+: Rs. 70</td>
                    </tr>
                    <tr>
                      <th className="text-left">List B Cities</th>
                      <td className="font-bold">Up to 120: Rs. 15, 121-200: Rs. 35, 201+: Rs. 55</td>
                    </tr>
                    <tr>
                      <th className="text-left">List C Cities</th>
                      <td className="font-bold">Up to 120: Rs. 10, 121-200: Rs. 25, 201+: Rs. 35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Developer Income Tax Calculator Ensures Security</div>
            <div className="text-sm text-gray-700 space-y-2">
              <div>No sensitive personal information is required for calculations.</div>
              <div>All inputs are used only for on-page estimation and are not stored.</div>
              <div>Your privacy is protected and data is not shared with third parties.</div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
            <div className="text-sm text-gray-700">
              For inquiries or personalized support, contact our team. We are ready to assist you with compliance guidance and calculations.
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Quick Facts (2025-2026)</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">Commercial Rate</div>
                <div className="text-lg font-extrabold text-gray-900 mt-1">Rs. 210 / Sq Yd</div>
                <div className="text-xs text-gray-500 mt-1">Applies across Lists A, B, and C</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">Residential Slabs</div>
                <div className="text-lg font-extrabold text-gray-900 mt-1">Up to 120, 121-200, 201+</div>
                <div className="text-xs text-gray-500 mt-1">Rates vary by city list</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">Area Unit</div>
                <div className="text-lg font-extrabold text-gray-900 mt-1">Square Yard</div>
                <div className="text-xs text-gray-500 mt-1">Use gross project area</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Compliance & Reporting Notes</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><span className="font-bold text-gray-900">City Classification:</span> Lists A, B, and C reflect the published city grouping used for slab application.</li>
              <li><span className="font-bold text-gray-900">Area Basis:</span> Tax is computed on a per square yard basis for developers.</li>
              <li><span className="font-bold text-gray-900">Documentation:</span> Keep project approvals, plans, and land title documents updated for audit readiness.</li>
              <li><span className="font-bold text-gray-900">Professional Review:</span> For mixed-use projects, consult a tax adviser for additional compliance checks.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Related Services</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-bold text-gray-900">Tax Filing Services</div>
                <div className="text-xs text-gray-500 mt-1">End-to-end filing with review</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-bold text-gray-900">Property Valuation</div>
                <div className="text-xs text-gray-500 mt-1">Independent valuation support</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-bold text-gray-900">Legal Consultation</div>
                <div className="text-xs text-gray-500 mt-1">Project structuring guidance</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
            <div className="text-xl font-extrabold mb-2">Need Help with Your Project Estimates?</div>
            <div className="text-sm text-gray-200">Share your project details and our team can validate your inputs and provide a professional estimate report.</div>
            <div className="mt-4">
              <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
            </div>
          </div>
        </div>
      )}

      {!isDeveloper && (
        <div className="mt-10 space-y-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Welcome to the Pakistan Builder Tax Calculator</div>
            <div className="text-sm text-gray-700 leading-relaxed">
              Our Pakistan Builder Tax Calculator is the latest tool for calculating builder taxes in Pakistan for 2024-2025.
              This estimator simplifies tax estimation for commercial and residential properties. Based on the 2024-2025 budget
              presented by the Government of Pakistan, it lets you input property size, location, and type to generate accurate
              tax estimates.
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Why Use the Builder Tax Calculator?</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="font-bold text-gray-900">Precision in Tax Calculation</div>
                <div className="mt-1">Accurate calculations based on property type, location, and area.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Time Efficiency</div>
                <div className="mt-1">Quick results reduce manual work and errors.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Adaptability to Property Types</div>
                <div className="mt-1">Separate calculations for commercial and residential properties.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Location-Specific Insights</div>
                <div className="mt-1">City-based slabs keep your estimates aligned with regulations.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Real-Time Scenario Analysis</div>
                <div className="mt-1">Adjust inputs and see the impact immediately.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Versatility in Timeframes</div>
                <div className="mt-1">Annual insights support short- and long-term planning.</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Mitigation of Compliance Risks</div>
                <div className="mt-1">Accurate slab logic reduces the risk of under- or over-reporting.</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Features of the Pakistan Builder Tax Calculator</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><span className="font-bold text-gray-900">Property Type Differentiation:</span> Separate slabs for commercial and residential properties.</li>
              <li><span className="font-bold text-gray-900">Location-Specific Tax Rates:</span> City selection aligns with List A, List B, or List C categories.</li>
              <li><span className="font-bold text-gray-900">Up-to-Date Information:</span> Based on the latest 2024-2025 budget structure.</li>
              <li><span className="font-bold text-gray-900">User-Friendly Interface:</span> Simple inputs with instant results.</li>
              <li><span className="font-bold text-gray-900">Real-Time Updates:</span> Adjust parameters and see immediate recalculations.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">How To Fill Out This Builder Tax Calculator</div>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
              <li>Choose the tax year (2023-2024 or 2024-2025).</li>
              <li>Select the property type (Commercial or Residential).</li>
              <li>Choose the project location from the city dropdown.</li>
              <li>Enter the property area in square yards.</li>
              <li>Click Calculate Tax to view the result instantly.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Builder Tax Slabs in Pakistan (2024-2025)</div>
            <div className="text-sm text-gray-700 mb-4">These slab rates are applied per square yard as per city category.</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="font-bold text-gray-900 mb-2">Commercial Plots</div>
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">List A Cities (Karachi, Lahore, Islamabad)</th>
                      <td className="font-bold">Rs. 210 / Sq Yd</td>
                    </tr>
                    <tr>
                      <th className="text-left">List B Cities (Hyderabad, Sukkur, Multan, Faisalabad, Rawalpindi, Gujranwala, Sahiwal, Peshawar, Mardan, Abbottabad)</th>
                      <td className="font-bold">Rs. 210 / Sq Yd</td>
                    </tr>
                    <tr>
                      <th className="text-left">List C Cities (Urban Areas Not Specified Above)</th>
                      <td className="font-bold">Rs. 210 / Sq Yd</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-2">Residential Plots</div>
                <table className="paktax-table">
                  <tbody>
                    <tr>
                      <th className="text-left">List A Cities</th>
                      <td className="font-bold">Up to 120: Rs. 20, 121-200: Rs. 40, 201+: Rs. 70</td>
                    </tr>
                    <tr>
                      <th className="text-left">List B Cities</th>
                      <td className="font-bold">Up to 120: Rs. 15, 121-200: Rs. 35, 201+: Rs. 55</td>
                    </tr>
                    <tr>
                      <th className="text-left">List C Cities</th>
                      <td className="font-bold">Up to 120: Rs. 10, 121-200: Rs. 25, 201+: Rs. 35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">How Our Builder Tax Calculator Ensures Security</div>
            <div className="text-sm text-gray-700 space-y-2">
              <div>No sensitive personal information is required for calculations.</div>
              <div>All inputs are used only for on-page estimation and are not stored.</div>
              <div>Your privacy is protected and data is not shared with third parties.</div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Support and Contact Information</div>
            <div className="text-sm text-gray-700">
              For inquiries or personalized support, contact our team. We are ready to assist you with compliance guidance and calculations.
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Quick Facts (2024-2025)</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">Commercial Rate</div>
                <div className="text-lg font-extrabold text-gray-900 mt-1">Rs. 210 / Sq Yd</div>
                <div className="text-xs text-gray-500 mt-1">Applies across Lists A, B, and C</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">Residential Slabs</div>
                <div className="text-lg font-extrabold text-gray-900 mt-1">Up to 120, 121-200, 201+</div>
                <div className="text-xs text-gray-500 mt-1">Rates vary by city list</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">Area Unit</div>
                <div className="text-lg font-extrabold text-gray-900 mt-1">Square Yard</div>
                <div className="text-xs text-gray-500 mt-1">Use gross project area</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Compliance & Reporting Notes</div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><span className="font-bold text-gray-900">City Classification:</span> Lists A, B, and C reflect the published city grouping used for slab application.</li>
              <li><span className="font-bold text-gray-900">Area Basis:</span> Tax is computed on a per square yard basis for builders.</li>
              <li><span className="font-bold text-gray-900">Documentation:</span> Keep project approvals, plans, and land title documents updated for audit readiness.</li>
              <li><span className="font-bold text-gray-900">Professional Review:</span> For mixed-use projects, consult a tax adviser for additional compliance checks.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="text-xl font-extrabold text-gray-900 mb-3">Related Services</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-bold text-gray-900">Tax Filing Services</div>
                <div className="text-xs text-gray-500 mt-1">End-to-end filing with review</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-bold text-gray-900">Property Valuation</div>
                <div className="text-xs text-gray-500 mt-1">Independent valuation support</div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-bold text-gray-900">Legal Consultation</div>
                <div className="text-xs text-gray-500 mt-1">Project structuring guidance</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[var(--color-dark-blue)] text-white p-6">
            <div className="text-xl font-extrabold mb-2">Need Help with Your Builder Tax Estimates?</div>
            <div className="text-sm text-gray-200">Share your project details and our team can validate your inputs and provide a professional estimate report.</div>
            <div className="mt-4">
              <Link to="/contact" className="paktax-btn paktax-btn-primary">Request a Consultation</Link>
            </div>
          </div>
        </div>
      )}
    </TaxCalculatorShell>
  );
}

