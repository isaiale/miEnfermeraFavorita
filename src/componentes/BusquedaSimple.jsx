import React, { useState } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';
import accesoriosData from "../autenticar/accesorio.json";
import productosData from "../autenticar/productos.json";
import pruebas from "../img/prueba.jpg";

const BusquedaSimple = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAccesorio, setSelectedAccesorio] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShow = (accesorio) => {
    setSelectedAccesorio(accesorio);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedAccesorio(null);
    setShowModal(false);
  };

  // Combinar accesorios y productos en un solo array
  const combinedItems = [...accesoriosData.accesorios, ...productosData.productos];


  const filteredAccesorios = combinedItems.filter((accesorio) =>
    accesorio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar accesorios por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      {searchTerm && filteredAccesorios.length > 0 ? (
        <Row xs={2} md={4}>
          {filteredAccesorios.map((accesorio) => (
            <Col key={accesorio.id}>
              <Card className="mb-4 text-center">
                <img src={pruebas} className="card-img-top" alt={accesorio.name} height="250px" />
                <Card.Body>
                  <h5 className="card-title mb-0">{accesorio.name}</h5>
                  <p className="card-text lead fw-bold">${accesorio.price}</p>
                  <button
                    className="btn"
                    style={{ color: 'white', background: '#daa232' }}
                    onClick={() => handleShow(accesorio)}
                  >
                    Ver más
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          {filteredAccesorios.length === 0
            ? `No se encontraron accesorios para "${searchTerm}"`
            : 'Ingrese un nombre de accesorio para buscar.'}
        </Alert>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAccesorio && selectedAccesorio.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccesorio ? (
            <>
              <div className="col-md-6">
                <img src={pruebas} height="400px" width="400px" alt={selectedAccesorio.name} />
              </div>
              <div className="col-md-5">
                <h4 className="text-uppercase text-black">{selectedAccesorio.category}</h4>
                <h1 className="display-5">{selectedAccesorio.name}</h1>
                <h3 className="display-6 fw-bold my-4">${selectedAccesorio.price}</h3>
                <p className="lead">{selectedAccesorio.descripcion}</p>
                <div className="d-grid mx-auto">
                  <Button variant="" style={{ color: 'white', background: '#daa232' }} className="mb-2">
                    Comprar
                  </Button>
                  <button className="btn btn-outline-dark">Agregar al carrito</button>
                </div>
              </div>
            </>
          ) : (
            <p>No se ha seleccionado ningún accesorio.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BusquedaSimple;
