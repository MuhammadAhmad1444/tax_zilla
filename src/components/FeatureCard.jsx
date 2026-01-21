import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] rounded-full flex items-center justify-center">
          <Icon size={28} className="text-black" />
        </div>
      </div>
      
      <h4 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h4>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;