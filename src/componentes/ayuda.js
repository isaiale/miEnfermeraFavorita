import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const AyudaItem = ({ title, description }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="card-container">
        <div className="card my-3 m-1">
          <div className="card-body text-center">
            <h3 className="card-title">{title}</h3>
            <Button variant="primary" onClick={handleShow}>
              Ver Instrucciones
            </Button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ayudaItems = [
  {
    title: "1. Cómo utilizar nuestra plataforma",
    description:
      "Descubre cómo aprovechar al máximo todas las características de nuestra plataforma.",
  },
  {
    title: "2. Problemas de inicio de sesión",
    description:
      "Si tienes dificultades para iniciar sesión, te proporcionamos pasos para solucionar el problema.",
  },
  {
    title: "3. Las preguntas más frecuentes",
    description:
      "Consulta nuestras preguntas frecuentes para obtener respuestas rápidas a tus inquietudes.",
  },
  {
    title: "4. Contacta con nuestro soporte",
    description:
      "Si no encuentras la respuesta que buscas, no dudes en ponerte en contacto con nuestro equipo de soporte.",
  },
];

const Ayuda = () => {
  return (
    <div className="container my-4">
      <h1 className="display-4">Ayuda</h1>
      <p className="lead">
        Bienvenido a la sección de ayuda. Aquí encontrarás información útil para
        resolver tus dudas.
      </p>
      <div className="d-flex">
        {ayudaItems.map((item, index) => (
          <AyudaItem
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Ayuda;