import { FileX } from 'lucide-react';
import React from 'react';
import { FaWhatsapp } from "react-icons/fa";


const WhatsAppRedirectButton = () => {
  // Replace '1234567890' with your actual WhatsApp phone number
  // Use the full international format, without any '+' or '00'
  const phoneNumber = '919954022020'; 

  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }} 
    >
      <button 
        style={{
          padding: '10px 20px',
          fontSize: '26px',
          cursor: 'pointer',
          backgroundColor: '#25D366', 
          color: 'white',
          border: 'none',
          position : 'fixed',
          borderRadius: '50%',
          zIndex : '1000',
          right : '0',
          bottom : '50%'
         

        }}
      >
        <FaWhatsapp />
      </button>
    </a>
  );
};

export default WhatsAppRedirectButton;