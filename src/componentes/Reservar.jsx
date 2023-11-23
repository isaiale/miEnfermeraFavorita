import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import imagenAtuendo from '../img/Logo de mi enfermera favorita.jpg';
import '../css/colores.css';

const atuendosEnfermeria = [
    {
      id: 1,
      nombre: 'Atuendo 1',
      categoria: 'Uniforme de Enfermería',
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Blanco', 'Azul', 'Verde'],
      disponibilidad: true,
    },
    {
      id: 2,
      nombre: 'Atuendo 2',
      categoria: 'Uniforme de Enfermería',
      tallas: ['M', 'L'],
      colores: ['Blanco', 'Rosa'],
      disponibilidad: false,
    },
    {
      id: 3,
      nombre: 'Atuendo 3',
      categoria: 'Uniforme de Enfermería',
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Azul', 'Verde'],
      disponibilidad: true,
    },
    {
      id: 4,
      nombre: 'Atuendo 4',
      categoria: 'Uniforme de Enfermería',
      tallas: ['S', 'L', 'XL'],
      colores: ['Rojo', 'Verde'],
      disponibilidad: true,
    },
  ];

function ReservaAtuendoCard({ atuendo, onReservarClick, onDetallesClick }) {
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleDetallesClick = () => {
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
    };

    return (
        <Col xs={6} lg={3}>
            <Card className="mb-4">
                <Card.Img variant="top" src={imagenAtuendo} />
                <Card.Body>
                    <Card.Title>{atuendo.nombre}</Card.Title>
                    <Card.Text>Categoría: {atuendo.categoria}</Card.Text>
                    <Card.Text>Tallas: {atuendo.tallas.join(', ')}</Card.Text>
                    <Card.Text>Colores: {atuendo.colores.join(', ')}</Card.Text>
                    <Card.Text>
                        Disponibilidad: {atuendo.disponibilidad ? 'Disponible' : 'No disponible'}
                    </Card.Text>
                    <Button variant="" style={{color:'white', background:'#daa232'}} disabled={!atuendo.disponibilidad} onClick={() => onReservarClick(atuendo.id)}>
                        Reservar
                    </Button>
                    <Button variant="info" className="ms-2" onClick={handleDetallesClick}>
                        Detalles
                    </Button>
                </Card.Body>

                {/* Modal para mostrar detalles */}
                <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles del Atuendo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Puedes mostrar más detalles aquí */}
                        <img className='d-block img-fluid w-100' src={imagenAtuendo} />
                        <p>Categoría: {atuendo.categoria}</p>
                        <p>Tallas: {atuendo.tallas.join(', ')}</p>
                        <p>Colores: {atuendo.colores.join(', ')}</p>
                        <p>Disponibilidad: {atuendo.disponibilidad ? 'Disponible' : 'No disponible'}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDetailsModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </Col>
    );
}

function ReservaAtuendos() {
    const [reservas, setReservas] = useState([]);

    const handleReservarClick = (atuendoId) => {
        // Lógica para manejar la reserva
        // Por ejemplo, puedes agregar el atuendo a la lista de reservas
        setReservas([...reservas, atuendoId]);
    };

    return (
        <Container>
            <Row>
                <Col lg={9}>
                    <Row xs={2} md={4}>
                        {atuendosEnfermeria.map((atuendo) => (
                            <ReservaAtuendoCard
                                key={atuendo.id}
                                atuendo={atuendo}
                                onReservarClick={handleReservarClick}
                            />
                        ))}
                    </Row>
                </Col>
                <Col lg={3}>
                    <div className="mb-4">
                        <h5>Reservas</h5>
                        <ul>
                            {reservas.map((reserva, index) => (
                                <li key={index}>Atuendo {reserva}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ReservaAtuendos;
