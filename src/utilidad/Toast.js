import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastMessage = ({ showToast, message, onClose, toastColor }) => {
    const tema = {
        success: "¡Éxito!",
        info: "Información",
        warning: "¡Advertencia!",
        error: "Error",
    };

    const iconMap = {
        success: "fa fa-check",
        info: "fa fa-info-circle",
        warning: "fa fa-exclamation-triangle",
        error: "fa fa-times",
    };

    const colorMap = {
        success: { background: 'bg-success', text: 'text-white' },
        info: { background: 'bg-info', text: '' },
        warning: { background: 'bg-warning', text: '' },
        error: { background: 'bg-danger', text: 'text-white' },
    };

    const titulo = tema[toastColor] || 'Error';
    const { background, text } = colorMap[toastColor] || colorMap.error; // Default a error si no coincide con ninguno
    const icon = iconMap[toastColor] || iconMap.error; // Default a error si no coincide con ninguno

    return (
        <Toast
            show={showToast}
            onClose={onClose}
            style={{
                position: 'fixed',  // Cambiado a 'fixed' en lugar de 'absolute'
                top: '15%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '300px',
                zIndex: 1000,
            }}
        >
            <Toast.Header className={`${background} ${text}`}>
                {icon && <div className="fs-5"><i className={`${icon} ml-2`}></i></div>}
                <h5 className="me-auto  mb-0 ms-2"> {titulo}</h5>
            </Toast.Header>
            <Toast.Body className='bg-white'>
                <p className="me-auto lead mb-0 fs-5"> {message}</p>
            </Toast.Body>
        </Toast>

    );
};

export default ToastMessage;
