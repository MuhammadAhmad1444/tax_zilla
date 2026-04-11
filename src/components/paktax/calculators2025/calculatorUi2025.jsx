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
    <section className="paktax-root min-w-0">
      <div className="mx-auto max-w-6xl min-w-0 px-3 py-6 sm:px-4 sm:py-8">
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

        <div className="mb-8 text-center">
          <h1 className="break-words text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">{title}</h1>
          {subtitle ? <p className="mt-3 px-1 text-sm font-medium text-gray-600 sm:text-base">{subtitle}</p> : null}
        </div>

        {children}
      </div>
    </section>
  );
};

