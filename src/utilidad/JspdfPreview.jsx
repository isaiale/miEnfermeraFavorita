import React from 'react';

const JspdfPreview = ({ pdf }) => {
  if (!pdf) {
    return null;
  }

  const pdfUrl = URL.createObjectURL(pdf.output('blob'));

  return (
    <iframe 
      src={pdfUrl} 
      width="100%" 
      height="500px" 
      title="Vista previa del PDF" // Agregar título descriptivo
    /> 
  );
};

export default JspdfPreview;
