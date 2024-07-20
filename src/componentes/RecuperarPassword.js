import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { RecuperarPasswordEmail, VerificarCodigo, NuevaPassword } from '../url/urlSitioWeb';
import ToastMessage from '../utilidad/Toast'; // Toast 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordResetFlow = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [toastColor, setToastColor] = useState('');
  const [showError, setShowError] = useState(false);

  const password = newPassword;

  const passwordValidation = () => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const getPasswordErrorMessage = () => {
    let errorMensaje = 'La contraseña debe tener al menos:';

    if (password.length < 8) {
      errorMensaje += ' 8 caracteres.';
    }

    if (!/[a-z]/.test(password)) {
      errorMensaje += ' Una letra minúscula.';
    }

    if (!/[A-Z]/.test(password)) {
      errorMensaje += ' Una letra mayúscula.';
    }

    if (!/\d/.test(password)) {
      errorMensaje += ' Un número.';
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errorMensaje += ' Un carácter especial (@#$%^&*).';
    }

    return errorMensaje;
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  // Toast
  const showToastMessage = (message, toastColor) => {
    setMessage(message);
    setToastColor(toastColor);
    setShowToast(true);

    // Oculta el Toast después de 5 segundos
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setShowError(true);
      return;
    }

    try {
      if (step === 1) {
        // Enviar correo
        const response = await fetch(RecuperarPasswordEmail, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo: email }),
        });

        if (response.ok) {
          setStep(2);
        } else {
          const data = await response.json();
          showToastMessage(data.message, 'error');
        }
      } else if (step === 2) {
        // Verificar código de verificación
        const response = await fetch(VerificarCodigo, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo: email, verificationCode }),
        });

        if (response.ok) {
          setStep(3);
        } else {
          const data = await response.json();
          showToastMessage(data.message);
        }
      } else if (step === 3) {
        // Restablecer contraseña
        const response = await fetch(NuevaPassword, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo: email, verificationCode, newPassword }),
        });

        if (response.ok) {
          history('/login');
          showToastMessage('Contraseña restablecida correctamente!', 'success');
        } else {
          const data = await response.json();
          setError(data.message);
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const renderProgressCircle = (circleStep) => {
    return (
      <div style={{
        color: step >= circleStep ? 'white' : 'gray',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: step >= circleStep ? 'green' : 'transparent',
        border: `2px solid ${step >= circleStep ? 'green' : 'gray'}`,
      }}>
        <i className="fa fa-check"></i>
      </div>
    );
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          <p>Ingresa tu correo electrónico para restablecer tu contraseña</p>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${showError && !email ? 'is-invalid' : ''}`}
            />
            {showError && !email && (
              <Form.Text className="text-danger">
                Ingrese su correo.
              </Form.Text>
            )}
          </Form.Group>
        </>
      );
    } else if (step === 2) {
      return (
        <>
          <p>Se ha enviado un código de verificación a tu correo electrónico</p>
          <Form.Group controlId="verificationCode">
            <Form.Control
              type="text"
              placeholder="Código de verificación"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Form.Group>
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <p>Ingresa tu nueva contraseña</p>
          <div className="input-group">
            <Form.Group className="input-group" controlId="newPassword">
              <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
              <Form.Control
                className={`form-control ${showError && !newPassword ? 'is-invalid' : ''}`}
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="button"
                className="btn btn-outline-secondary"
                onClick={handlePasswordVisibilityToggle}
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>

            </Form.Group>
            {showError && !newPassword && (
              <Form.Text className="text-danger">
                Ingrese una contraseña.
              </Form.Text>
            )}
            {newPassword && !passwordValidation() && (
              <Form.Text className="text-danger">
                {getPasswordErrorMessage()}
              </Form.Text>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center m-3">
        <div className="col-md-5 border">
          <ToastMessage
            showToast={showToast}
            message={message}
            onClose={() => setShowToast(false)}
            toastColor={toastColor}
          />
          <Form onSubmit={handleSubmit}>
            <h2 className="m-2 text-center">Recuperar Contraseña</h2>
            <div className="col-md-6 offset-md-3 d-flex justify-content-center">
              {renderProgressCircle(1)}
              <div className='mt-3' style={{ borderTop: '2px solid gray', flex: 1 }}></div>
              {renderProgressCircle(2)}
              <div className='mt-3' style={{ borderTop: '2px solid gray', flex: 1 }}></div>
              {renderProgressCircle(3)}
            </div>
            {renderStepContent()}
            <div>
              <div className="text-center mt-3 d-grid mx-auto mb-3">
                <button className="btn" style={{ color: 'white', background: '#daa232' }} type="submit">
                  {step === 1 ? 'Enviar Correo' : step === 2 ? 'Verificar Código' : 'Restablecer Contraseña'}
                </button>
              </div>
            </div>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetFlow;
