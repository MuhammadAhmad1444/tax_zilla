import React from 'react';

export const ResetButton = ({ onClick, children = 'Reset' }) => (
  <button
    type="button"
    className="paktax-btn paktax-btn-secondary w-full mt-3"
    onClick={onClick}
  >
    {children}
  </button>
);

export const ResultBlock = ({ title, children }) => (
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
            <button
              type="button"
              className="paktax-btn paktax-btn-secondary"
              onClick={onBack}
            >
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

