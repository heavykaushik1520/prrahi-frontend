import { FileX } from 'lucide-react';
import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineWhatsapp } from "react-icons/md";



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
          padding: '0px 12px 4px 12px',
          fontSize: '44px',
          cursor: 'pointer',
          backgroundColor: '#fa9d1d', 
          color: 'white',
          border: 'none',
          position : 'fixed',
          borderRadius: '8%',
          zIndex : '1000',
          right : '4px',
          bottom : '20%'
         

        }}
      >
        {/* <MdOutlineWhatsapp /> */}

        <FaWhatsapp />
      </button>
    </a>
  );
};

export default WhatsAppRedirectButton;