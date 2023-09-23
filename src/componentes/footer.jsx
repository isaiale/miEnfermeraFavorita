import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      Derechos Reservados Mi Enfermera Favorita &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
