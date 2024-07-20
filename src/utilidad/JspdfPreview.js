import React from 'react';

const JspdfPreview = ({ pdf }) => {
  if (!pdf) {
    return null;
  }

  // Crear un Blob URL del PDF
  const pdfUrl = URL.createObjectURL(pdf.output('blob'));

  return (
    <iframe src={pdfUrl} width="100%" height="500px" />
  );
};

export default JspdfPreview;
