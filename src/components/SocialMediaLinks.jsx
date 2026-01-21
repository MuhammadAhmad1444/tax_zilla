import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialMediaLinks = ({ 
  iconSize = 20, 
  variant = 'footer',
  className = ""
}) => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/people/Tax-Zilla/61585729178210/',
      icon: Facebook
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/111113328/admin/dashboard/',
      icon: Linkedin
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/tax.zilla?igsh=MWh5djJpcWZrc2liNw==',
      icon: Instagram
    }
  ];

  // Define styles based on variant
  const getStyles = () => {
    if (variant === 'contact') {
      return "w-14 h-14 rounded-full bg-[var(--color-dark-blue)] text-white flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-all shadow-md border border-gray-100";
    }
    // Default footer style
    return "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-black transition-all";
  };

  const itemClass = getStyles();

  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClass}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Visit our ${social.name} page`}
        >
          <social.icon size={variant === 'contact' ? 24 : iconSize} />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;