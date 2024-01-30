// Toast.js

import React, { useState } from 'react';
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
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '300px',
            }}
        >
            <Toast.Header className={`${background} ${text} `}>
                {icon && <div className="fs-5"><i className={`${icon} ml-2`}></i></div>}
                <h5 className="me-auto  mb-0 ms-2"> {titulo}</h5>
            </Toast.Header>
            <Toast.Body>
                <p className="me-auto lead mb-0 fs-5"> {message}</p>
            </Toast.Body>
        </Toast>
    );
};

const ToastComponent = () => {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [toastColor, setToastColor] = useState('');

    const showToastMessage = (message, toastColor) => {
        setMessage(message);
        setToastColor(toastColor);
        setShowToast(true);

        // Oculta el Toast después de 5 segundos
        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    return (
        <>
            <ToastMessage
                showToast={showToast}
                message={message}
                onClose={() => setShowToast(false)}
                toastColor={toastColor}
            />
            <div className="mb-2">
                <button
                    className="btn btn-success mr-2"
                    onClick={() => showToastMessage(' ¡Éxito!', 'success')}
                >
                    Success
                </button>
                <button
                    className="btn btn-info mr-2"
                    onClick={() => showToastMessage(' Información importante.', 'info')}
                >
                    Informar
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => showToastMessage('¡Advertencia!', 'warning')}
                >
                    Advertencia
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => showToastMessage('¡Error!', 'error')}
                >
                    Error
                </button>
            </div>
        </>
    );
};

export default ToastComponent;
