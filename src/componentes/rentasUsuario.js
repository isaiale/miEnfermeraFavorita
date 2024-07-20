import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../autenticar/AuthProvider';
import { RentaDeUsuarios, Rentas, servidor } from '../url/urlSitioWeb';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faFilePdf, faDownload } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de PDF y el ícono de descarga
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal'; // Importa el componente Modal de Bootstrap
import Button from 'react-bootstrap/Button';
import { jsPDF } from 'jspdf';
import JspdfPreview from '../utilidad/JspdfPreview'; // Asegúrate de importar tu componente JspdfPreview correctamente
import logo from '../img/Logo de mi enfermera favorita.jpg';
import '../css/spinner.css';

// Componente para la etiqueta de estado
const EstadoEtiqueta = ({ estado }) => {
  let color;
  switch (estado) {
    case 'pendiente':
      color = 'orange';
      break;
    case 'en curso':
      color = 'blue';
      break;
    case 'completada':
      color = 'green';
      break;
    default:
      color = 'gray';
  }

  return (
    <div style={{
      position: 'absolute',
      top: '5px',
      left: '5px',
      padding: '1px 6px',
      backgroundColor: color,
      color: 'white',
      borderRadius: '5px',
      fontWeight: 'bold',
    }}>
      {estado}
    </div>
  );
};

const RentasUsuarios = () => {
  const [rentas, setRentas] = useState([]);
  const [tiempos, setTiempos] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Número de elementos por página
  const [mostrarDetalles, setMostrarDetalles] = useState({}); // Estado para controlar la visibilidad de los detalles
  const [pdf, setPdf] = useState(null); // Estado para almacenar el PDF generado
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchRentas = async () => {
    if (user && user._id) {
      try {
        const response = await fetch(`${RentaDeUsuarios}${user._id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las rentas');
        }
        const data = await response.json();
        // Ordenar rentas de más reciente a más antiguo
        const sortedData = data.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
        setRentas(sortedData);
        fetchTiempos(sortedData);
        console.log(sortedData);
      } catch (error) {
        console.error('Error al obtener las rentas:', error);
      }
    }
  };

  const fetchTiempos = async (rentas) => {
    try {
      const tiemposData = {};
      for (let renta of rentas) {
        const response = await fetch(`${Rentas}/${renta._id}/tiempo-restante`);
        if (!response.ok) {
          throw new Error(`Error al obtener el tiempo de renta para la renta con ID ${renta._id}`);
        }
        const data = await response.json();
        console.log('respuesta tiempos: ', data);
        tiemposData[renta._id] = data;
      }
      setTiempos(tiemposData);
    } catch (error) {
      console.error('Error al obtener los tiempos de renta:', error.message);
    }
  };

  useEffect(() => {
    fetchRentas(); // Llama a la función para cargar los datos inicialmente
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRentas(); // Vuelve a cargar los datos cada cierto tiempo
    }, 40000); // Intervalo de 40 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [user]);

  if (!rentas || rentas.length === 0) {
    return (
      <div className='mt-5 mb-5'>
        <p className='name-spinner mt-5'>Cargando...</p>
        <div className="spinner mb-5"></div>
      </div>
    );
  }

  // Obtener los elementos actuales de la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rentas.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para alternar la visibilidad de los detalles
  const toggleDetalles = (rentaId) => {
    setMostrarDetalles((prevState) => ({
      ...prevState,
      [rentaId]: !prevState[rentaId]
    }));
  };

  // Función para generar el PDF
  const generarPdf = (renta) => {
    if (!renta || !renta.productoRentaId) {
      console.error('Renta o productoRentaId no definido');
      return;
    }
  
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
      {
        unidad: renta.Cantidad ? renta.Cantidad.toString() : 'N/A',
        descripcion: renta.productoRentaId.nombre ? renta.productoRentaId.nombre : 'N/A',
        importe: renta.productoRentaId.precio !== undefined ? renta.productoRentaId.precio.toString() : 'N/A'
      }
    ];
  
    doc.setFontSize(10);
    items.forEach((item, index) => {
      const y = 100 + (index * 10);
      doc.text(item.unidad, 20, y);
      doc.text(`${item.descripcion} talla ${renta.tallaSeleccionada || 'N/A'}`, 105, y, { align: 'center' });
      doc.text(`$${item.importe} c/u`, 190, y, { align: 'right' });
    });
  
    doc.setFontSize(11); 
    doc.text(`Desposito total por ${renta.Cantidad ? renta.Cantidad.toString() : 'N/A'} producto: $${renta.deposito !== undefined ? renta.deposito.toString() : 'N/A'}`, 190, 130, { align: 'right' });
  
    // Total
    doc.setFontSize(12);
    doc.text(`TOTAL: $${renta.montoPago !== undefined ? renta.montoPago.toString() : 'N/A'}`, 190, 140, { align: 'right' });
  
    // Mensaje del usuario
    doc.setFontSize(10);
    doc.text(`Mensaje del Usuario: ${tiempos[renta._id] ? tiempos[renta._id].mensajeUser : ''}`, 20, 150);
  
    // Estado de Pago y Fecha de Pago
    doc.setFontSize(10);
    doc.text(`Estado de Pago: ${renta.estadoPago || 'N/A'}`, 20, 160);
    doc.text(`Fecha de Pago: ${renta.fechaPago || 'N/A'}`, 20, 170);
  
    // Mensaje de agradecimiento
    doc.setFontSize(10);
    doc.text(`GRACIAS POR SU PREFERENCIA.`, 105, 180, { align: 'center' });
  
    // Dirección de recogida
    doc.setFontSize(10);
    doc.text(`Dirección de recogida: calle C. San Luis Potosi #30, colonia Tahuizan, Huejutla de Reyes, Hgo.`, 20, 190);
  
    // URL
    doc.text('https://mi-enfermera-favorita.vercel.app', 105, 200, { align: 'center' });
  
    setPdf(doc);
    setShowModal(true); // Mostrar el modal al generar el PDF
  };
  
  
  const guardarPdf = () => {
    pdf.save('ticket-de-compra.pdf');
  };

  return (
    <div className="container mt-2">
      <h2 className="mb-2">Rentas del Usuario</h2>
      <div className="row">
        {currentItems.map(renta => (
          <div className="col-md-3 mb-4" key={renta._id}>
            <div className="card h-100 position-relative">
              <div className='card-img'>
                <EstadoEtiqueta estado={renta.estado} />
                <img src={renta.productoRentaId.imagenes[0].url} className="imagen" alt={renta.productoRentaId.nombre} />
              </div>

              <div className="card-body">
                <h5 className="card-title">{renta.Cantidad} {renta.productoRentaId.nombre}</h5>
                <p className="card-text">
                  Tiempo:
                  {renta.estado === 'pendiente' ? (
                    'Aún no inicia el conteo'
                  ) : renta.estado === 'en curso' ? (
                    tiempos[renta._id] ? (
                      <>
                        {`${tiempos[renta._id].diasRestantes}d, ${tiempos[renta._id].horasRestantes}h, ${tiempos[renta._id].minutosRestantes}m`}
                      </>
                    ) : (
                      'Cargando...'
                    )
                  ) : renta.estado === 'completada' ? (
                    'Finalizó'
                  ) : (
                    '0d, 0h, 0m'
                  )}
                </p>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    onClick={() => toggleDetalles(renta._id)}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  />
                  {(renta.estado === 'en curso' || renta.estado === 'pendiente') && (
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      onClick={() => generarPdf(renta)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
                {mostrarDetalles[renta._id] && (
                  <>
                    <p className="card-text">Descripción: {renta.productoRentaId.descripcion}</p>
                    {/* <p className="card-text">Cantidad: {renta.Cantidad}</p> */}
                    <p className="card-text">Talla: {renta.tallaSeleccionada}</p>
                    <p className="card-text">
                      {tiempos[renta._id] ? tiempos[renta._id].mensajeUser : ''}
                    </p>                    
                    <p className="card-text">Hora de Entrega: {renta.horarioRecogida}</p>
                    <p className="card-text">Pago: {renta.estadoPago}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination>
        {Array.from({ length: Math.ceil(rentas.length / itemsPerPage) }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal para mostrar el ticket */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket de Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pdf && (
            <JspdfPreview pdf={pdf} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={guardarPdf}>
            <FontAwesomeIcon icon={faDownload} /> Descargar Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RentasUsuarios;
