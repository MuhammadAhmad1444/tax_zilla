import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, DollarSign, TrendingDown, Calendar } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import Button from './Button.jsx';
import { useToast } from './ui/use-toast';

/**
 * Generate tax years from current year down to 2017-2018
 * Format: YYYY-YYYY+1 (e.g., 2025-2026)
 */
const generateTaxYears = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  const startYear = Math.max(currentYear, 2025); // Start from 2025 or current year if later
  
  for (let year = startYear; year >= 2017; year--) {
    years.push(`${year}-${year + 1}`);
  }
  
  return years;
};

const TaxCalculatorModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [year, setYear] = useState('');
  const [salary, setSalary] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const taxYears = generateTaxYears();

  // Set default year to current year (first in list)
  useEffect(() => {
    if (taxYears.length > 0 && !year) {
      setYear(taxYears[0]);
    }
  }, [taxYears, year]);

  const handleCalculate = async () => {
    // Validation
    if (!year) {
      toast({
        title: "Validation Error",
        description: "Please select a tax year.",
      });
      return;
    }

    const salaryValue = parseFloat(salary);
    if (!salary || isNaN(salaryValue) || salaryValue <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid salary amount.",
      });
      return;
    }

    setIsCalculating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `https://secure.befiler.com/befiler_services_prod/salary/tax/calculator?year=${year}&salary=${salaryValue}&yearly=false`
      );

      if (!response.ok) {
        throw new Error('Failed to calculate tax');
      }

      const data = await response.json();

      if (data.code === 1 && data.response) {
        setResult(data.response);
      } else {
        throw new Error(data.message || 'Failed to calculate tax');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while calculating tax. Please try again.');
      toast({
        title: "Calculation Error",
        description: err.message || 'Failed to calculate tax. Please try again.',
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleReset = () => {
    setSalary('');
    setResult(null);
    setError(null);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-50 p-6 md:p-8 focus:outline-none">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[var(--color-gold)]/10 rounded-lg">
                      <Calculator className="text-[var(--color-gold)]" size={24} />
                    </div>
                    <div>
                      <Dialog.Title className="text-2xl font-bold text-[var(--color-dark-blue)]" style={{ fontFamily: 'var(--font-heading)' }}>
                        Salary Tax Calculator
                      </Dialog.Title>
                      <p className="text-sm text-gray-500">Calculate your income tax based on Pakistan tax rates</p>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Form */}
                <div className="space-y-6 mb-6">
                  {/* Year Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2 text-[var(--color-dark-blue)]" />
                      Tax Year *
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-gray-50 text-gray-900 font-medium"
                    >
                      {taxYears.map((taxYear) => (
                        <option key={taxYear} value={taxYear}>
                          {taxYear}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Salary Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign size={16} className="inline mr-2 text-[var(--color-dark-blue)]" />
                      Monthly Salary (PKR) *
                    </label>
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="Enter your monthly salary"
                      min="0"
                      step="1000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/20 outline-none transition-all bg-gray-50 text-gray-900"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter your gross monthly salary before deductions</p>
                  </div>

                  {/* Calculate Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCalculate}
                    disabled={isCalculating || !year || !salary}
                    className="w-full font-bold"
                  >
                    {isCalculating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
                        />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator size={20} className="mr-2" />
                        Calculate Tax
                      </>
                    )}
                  </Button>
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                  >
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Results Display */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-[var(--color-dark-blue)] to-black rounded-xl p-6 text-white">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingDown size={20} />
                        Tax Calculation Results
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Monthly Breakdown */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <p className="text-xs text-gray-300 uppercase tracking-wider mb-2">Monthly</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">Gross Salary:</span>
                              <span className="font-bold text-lg">{formatCurrency(result.monthlySalary)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/20 pt-2">
                              <span className="text-sm text-gray-300">Tax Amount:</span>
                              <span className="font-bold text-lg text-red-300">{formatCurrency(result.monthlyTax)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/20 pt-2">
                              <span className="text-sm text-gray-300">Net Salary:</span>
                              <span className="font-bold text-lg text-[var(--color-gold)]">{formatCurrency(result.monthlySalaryAfterTax)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Yearly Breakdown */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                          <p className="text-xs text-gray-300 uppercase tracking-wider mb-2">Yearly</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-300">Gross Salary:</span>
                              <span className="font-bold text-lg">{formatCurrency(result.yearlySalary)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/20 pt-2">
                              <span className="text-sm text-gray-300">Tax Amount:</span>
                              <span className="font-bold text-lg text-red-300">{formatCurrency(result.yearlyTax)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/20 pt-2">
                              <span className="text-sm text-gray-300">Net Salary:</span>
                              <span className="font-bold text-lg text-[var(--color-gold)]">{formatCurrency(result.yearlySalaryAfterTax)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <Button
                      variant="secondary"
                      onClick={handleReset}
                      className="w-full"
                    >
                      Calculate Again
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TaxCalculatorModal;
