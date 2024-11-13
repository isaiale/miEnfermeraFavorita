import React, { useState, useContext } from 'react';
import '../css/satisfaccionUsuario.css';
import { AuthContext } from '../autenticar/AuthProvider';

const SatisfaccionUsuario = ({ onClose }) => {
    const { user } = useContext(AuthContext); // Obtiene el ID del usuario autenticado
    const [selectedRating, setSelectedRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const faces = ['😠', '😞', '😐', '😊', '😄'];

    const handleRatingClick = async (rating) => {
        setSelectedRating(rating);
        setLoading(true);

        try {
            // Enviar calificación a la API
            const response = await fetch('https://back-end-enfermera.vercel.app/api/satisfaccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating,
                    userId: user._id, // Incluye el ID del usuario autenticado
                }),
            });

            if (response.ok) {
                console.log("Calificación registrada con éxito");
                setTimeout(onClose, 2000); // Cierra el componente después de un breve retraso
            } else {
                console.error("Error al registrar la calificación:", response.statusText);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center border rounded p-4 mb-3" style={{ maxWidth: '500px', margin: 'auto', borderColor: '#007bff', borderWidth: '2px' }}>
            <h2>¡Pago completado Gracias por tu compra!</h2>
            <p>Tu satisfacción es importante para nosotros. ¿Qué te pareció tu experiencia de compra?</p>
            <div className="d-flex justify-content-center align-items-center mt-3">
                {faces.map((face, index) => (
                    <button
                        key={index}
                        onClick={() => handleRatingClick(index + 1)}
                        className={`btn btn-outline-${selectedRating === index + 1 ? 'primary' : 'secondary'} mx-1`}
                        style={{ fontSize: '2rem' }}
                        disabled={loading} // Deshabilitar los botones mientras se carga
                    >
                        <span className={`animated-icon-person ${selectedRating === index + 1 ? 'selected-person' : ''}`}>
                            {face}
                        </span>
                    </button>
                ))}
            </div>
            <p className="mt-3">
                {selectedRating ? `¡Gracias por tu feedback!` : 'Por favor, selecciona una carita para calificar.'}
            </p>
            {loading && <p className="text-success">Enviando tu calificación...</p>}
            <button onClick={onClose} className="btn btn-secondary mt-3" disabled={loading}>Cerrar</button>
        </div>
    );
};

export default SatisfaccionUsuario;
