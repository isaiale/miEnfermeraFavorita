import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import JspdfPreview from '../../utilidad/JspdfPreview'; // Asegúrate de importar tu componente JspdfPreview correctamente
import logo from '../../img/Logo de mi enfermera favorita.jpg';

const TicketDeCompra = () => {
  const [pdf, setPdf] = useState(null);

  const generarPdf = () => {
    const doc = new jsPDF();

    // Agregar logo
    doc.addImage(logo, 'jpg', 92, 20, 30, 30); // Ajusta la posición y el tamaño según sea necesario

    // Título
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('Mi enfermera favorita', 105, 60, { align: 'center' });

    // Descripción
    doc.setFontSize(12);
    doc.text('Ticket de renta de productos.', 105, 70, { align: 'center' });
    doc.text('Huejutla, Hgo.', 105, 75, { align: 'center' });

    // Detalles de compra
    doc.setFontSize(12);
    doc.text('UNID.', 20, 90);
    doc.text('DESCRIPCION', 105, 90, { align: 'center' });
    doc.text('IMPORTE', 190, 90, { align: 'right' });
    doc.setLineWidth(0.5);
    doc.line(10, 92, 200, 92);

    // Datos de compra
    const items = [
      { unidad: '1', descripcion: 'MASAJE', importe: '9,00' },
      { unidad: '1', descripcion: 'CHOCOTERAPIA', importe: '6,00' },
      { unidad: '1', descripcion: 'SPA 1H', importe: '6,00' }
    ];

    doc.setFontSize(10);
    items.forEach((item, index) => {
      const y = 100 + (index * 10);
      doc.text(item.unidad, 20, y);
      doc.text(item.descripcion, 105, y, { align: 'center' });
      doc.text(item.importe, 190, y, { align: 'right' });
    });

    // Total
    doc.setFontSize(12);
    doc.text('TOTAL: 21,00', 190, 140, { align: 'right' });

    // Mensaje de agradecimiento
    doc.setFontSize(10);
    doc.text('GRACIAS POR SU PREFERENCIA.', 105, 150, { align: 'center' });

    // URL
    doc.text('www.zankiu.es', 105, 160, { align: 'center' });

    setPdf(doc);
  };

  const guardarPdf = () => {
    pdf.save('ticket-de-compra.pdf');
  };

  return (
    <div>
      <button onClick={generarPdf}>Generar PDF</button>
      {pdf && (
        <div>
          <JspdfPreview pdf={pdf} />
          <button onClick={guardarPdf}>Descargar Ticket</button>
        </div>
      )}
    </div>
  );
};

export default TicketDeCompra;









// import React from "react";
// import '../../css/productos.css';

// const ProductosE = () => {

// 	return (
// 		<div>
// 			<section class="container-related-products">
// 				<h2>Productos Relacionados</h2>
// 				<div class="card-list-products">
// 					<div class="card">
// 						<div className="discount-icon"><i class="fa fa-ticket"> </i> 4 %</div> {/* Icono de descuento */}
// 						<div class="card-img">
// 							<img class='imagen'
// 								src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
// 								alt="producto-1"
// 							/>
// 						</div>
// 						<div class="info-card">
// 							<div class="text-product">
// 								<h3>Nike - Roshe Run</h3>
// 								<p class="category"><i class="fa fa-solid fa-tag"></i>Footwear, Sneakers</p>
// 							</div>
// 							<div class="price">$85.00</div>
// 						</div>
// 					</div>
// 					<div class="card">
// 						<div class="card-img">
// 							<img className="imagen"
// 								src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
// 								alt="producto-2"
// 							/>
// 						</div>
// 						<div class="info-card">
// 							<div class="text-product">
// 								<h3>Common Projects Achilles</h3>
// 								<p class="category">Footwear, Sneakers</p>
// 							</div>
// 							<div class="price">$255.00</div>
// 						</div>
// 					</div>
// 					<div class="card">
// 						<div class="card-img">
// 							<img className="imagen"
// 								src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
// 								alt="producto-3"
// 							/>
// 						</div>
// 						<div class="info-card">
// 							<div class="text-product">
// 								<h3>Adidas - Boston Super OG</h3>
// 								<p class="category">Footwear, Sneakers</p>
// 							</div>
// 							<div class="price">$105.00</div>
// 						</div>
// 					</div>
// 					<div class="card">
// 						<div className="discount-icon">
// 							4%
// 						</div> {/* Icono de descuento */}
// 						<div class="card-img">
// 							<img className="imagen"
// 								src="https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
// 								alt="producto-4"
// 							/>
// 						</div>
// 						<div class="info-card">
// 							<div class="text-product">
// 								<h3>Common Projects Achilles</h3>
// 								<p class="category">Footwear, Sneakers</p>
// 							</div>
// 							<div class="price">$250.00</div>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		</div>
// 	);
// };

// export default ProductosE;
