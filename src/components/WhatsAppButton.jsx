import React from 'react';
import { motion } from 'framer-motion';

/**
 * WhatsApp phone number configuration
 * Format: Country code + number without spaces or special characters
 * Example: +923399993308
 */
const WHATSAPP_PHONE_NUMBER = '+923399993308';

/**
 * WhatsApp Floating Button Component
 * Displays a fixed button at bottom-right corner that opens WhatsApp chat
 */
const WhatsAppButton = () => {
  const handleClick = () => {
    // Format: https://wa.me/PHONENUMBER
    // Remove spaces, dashes, and parentheses from phone number
    const cleanPhoneNumber = WHATSAPP_PHONE_NUMBER.replace(/[\s\-()]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-colors group hover:bg-[#20BA5A] sm:bottom-6 sm:right-6 md:h-16 md:w-16"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.5 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* WhatsApp Icon SVG */}
      <svg
        className="w-8 h-8 md:w-9 md:h-9"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      
      {/* Pulse animation ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-75"
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0.75, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Chat with us on WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></span>
      </span>
    </motion.button>
  );
};

export default WhatsAppButton;
