import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const ServiceCard = ({ icon: Icon, title, description, benefits, onLearnMore }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, boxShadow: 'var(--shadow-2xl)' }}
      className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] rounded-full flex items-center justify-center">
          <Icon size={32} className="text-black" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 text-center leading-relaxed">
        {description}
      </p>
      
      {benefits && benefits.length > 0 && (
        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-[var(--color-gold)] mt-1">✓</span>
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className="text-center">
        <Button variant="secondary" size="sm" onClick={onLearnMore}>
          Learn More
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;