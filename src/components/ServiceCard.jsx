import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Button from './Button';

const ServiceCard = ({ icon: Icon, title, description, benefits, onLearnMore }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface group flex flex-col overflow-hidden"
    >
      {/* Gold accent top bar */}
      <div
        className="h-1 w-full transition-all duration-500"
        style={{
          background: 'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold-light), var(--color-gold-dark))',
          backgroundSize: '200% 100%',
        }}
      />

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="tz-icon-container tz-icon-container-lg">
            {Icon && (
              <Icon size={26} style={{ color: 'var(--color-gold-dark)' }} strokeWidth={1.8} />
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold mb-3 text-center text-[var(--color-text)]"
          style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-[var(--color-text-muted)] mb-5 text-center text-sm sm:text-base leading-relaxed">
          {description}
        </p>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <ul className="space-y-2 mb-6 flex-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: 'var(--color-gold)' }}
                />
                <span className="leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-auto text-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLearnMore}
            className="group/btn"
          >
            Learn More
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover/btn:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
