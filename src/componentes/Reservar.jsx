import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import imagenAtuendo from '../img/Logo de mi enfermera favorita.jpg';
import '../css/colores.css';

const atuendosEnfermeria = [
    {
        id: 1,
        nombre: 'Atuendo 1',
        categoria: 'Uniforme de Enfermería',
        costo_atuendo: '200',
        coloresDisponibles: ['Blanco', 'Azul', 'Verde'],
        tallasDisponibles: ['S', 'M', 'L', 'XL'],
        disponibilidad: true,
    },
    {
        id: 2,
        nombre: 'Atuendo 2',
        categoria: 'Uniforme de Enfermería',
        costo_atuendo: '250',
        coloresDisponibles: ['Blanco', 'Rosa'],
        tallasDisponibles: ['M', 'L'],
        disponibilidad: false,
    },
    {
        id: 3,
        nombre: 'Atuendo 3',
        categoria: 'Uniforme de Enfermería',
        costo_atuendo: '300',
        coloresDisponibles: ['Azul', 'Verde'],
        tallasDisponibles: ['S', 'M', 'L', 'XL'],
        disponibilidad: true,
    },
    {
        id: 4,
        nombre: 'Atuendo 4',
        categoria: 'Uniforme de Enfermería',
        costo_atuendo: '350',
        coloresDisponibles: ['Rojo', 'Verde'],
        tallasDisponibles: ['S', 'L', 'XL'],
        disponibilidad: true,
    },
];

function ReservaAtuendoCard({ atuendo, onReservarClick }) {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedTalla, setSelectedTalla] = useState('');

    const handleReservarClick = () => {
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedColor('');
        setSelectedTalla('');
    };

    const handleConfirmReserva = () => {
        if (selectedColor && selectedTalla) {
            // Lógica para manejar la reserva con color y talla seleccionados
            onReservarClick(atuendo.id, selectedColor, selectedTalla);
            handleCloseDetailsModal();
        } else {
            alert('Por favor, selecciona color y talla antes de reservar.');
        }
    };

    return (
        <Col xs={6} lg={3}>
            <Card className="mb-4">
                <Card.Img variant="top" src={imagenAtuendo} />
                <Card.Body>
                    <Card.Title>{atuendo.nombre}</Card.Title>
                    <Card.Text>Categoría: {atuendo.categoria}</Card.Text>
                    <Card.Text className="fs-5" style={{ color: '#0171fa' }}>
                        ${atuendo.costo_atuendo}
                    </Card.Text>
                    <Button
                    variant=''
                        style={{ color:'white', background:'#daa232' }}
                        className="mb-2"
                        disabled={!atuendo.disponibilidad}
                        onClick={handleReservarClick}
                    >
                        Reservar
                    </Button>
                </Card.Body>

                {/* Modal para mostrar detalles y seleccionar color y talla */}
                <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles de {atuendo.nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className='d-block img-fluid w-100' src={imagenAtuendo} />
                        <h5>Categoría: {atuendo.categoria}</h5>

                        <Form.Group controlId="formColor">
                            <Form.Label>Selecciona un color:</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                            >
                                <option value="">Selecciona...</option>
                                {atuendo.coloresDisponibles.map((color) => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formTalla">
                            <Form.Label>Selecciona una talla:</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedTalla}
                                onChange={(e) => setSelectedTalla(e.target.value)}
                            >
                                <option value="">Selecciona...</option>
                                {atuendo.tallasDisponibles.map((talla) => (
                                    <option key={talla} value={talla}>
                                        {talla}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <h5 className='d-flex mb-0'>
                            Costo:
                            <p className="fs-5 ms-2" style={{ color: '#0171fa' }}>
                                ${atuendo.costo_atuendo}
                            </p>
                        </h5>
                        <h5 className='d-flex mt-0'>
                            Deposito de mantenimiento:
                            <p className="ms-2" style={{ color: '#0171fa' }}>
                                $150
                            </p>
                        </h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDetailsModal}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleConfirmReserva}>
                            Reservar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </Col>
    );
}

function ReservaAtuendos() {
    const [reservas, setReservas] = useState([]);

    const handleReservarClick = (atuendoId, color, talla) => {
        // Lógica para manejar la reserva con color y talla seleccionados
        // Por ejemplo, puedes agregar el atuendo a la lista de reservas
        setReservas([...reservas, { id: atuendoId, color, talla }]);
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
                                <li key={index}>
                                    Atuendo {reserva.id}, Color: {reserva.color}, Talla: {reserva.talla}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ReservaAtuendos;
