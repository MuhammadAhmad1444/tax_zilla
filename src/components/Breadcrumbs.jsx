import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1"
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-xs sm:text-sm text-white/55 hover:text-[var(--color-gold)] transition-colors duration-200"
      >
        <Home size={12} strokeWidth={2} />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <ChevronRight
              size={12}
              className="text-white/25 flex-shrink-0"
              strokeWidth={2.5}
            />
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="text-xs sm:text-sm text-white/55 hover:text-[var(--color-gold)] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-xs sm:text-sm font-semibold"
                style={{ color: 'var(--color-gold)' }}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
