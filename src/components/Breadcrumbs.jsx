import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-300 sm:text-sm">
      <Link to="/" className="hover:text-[var(--color-gold)]">Home</Link>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <ChevronRight size={14} className="text-gray-400" />
          {item.href ? (
            <Link to={item.href} className="hover:text-[var(--color-gold)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
          {index === items.length - 1 ? null : null}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
