import React, { useState, useContext, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import { AuthContext } from '../autenticar/AuthProvider';
import Form from 'react-bootstrap/Form';
import { UrlLoginUsuarios, Subcripcioness } from '../url/urlSitioWeb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import Breadcrumb from '../utilidad/migapan';

const vapidPublicKey = 'BG60RQWPyG2ENxTZGNN0A4gu4iBltktL8X5keD1Qp6d-laxrtViyba3WppAKI-nj1RJZOvvw3s71sNngCxjCSVo';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const [showError, setShowError] = useState(false);

    // useEffect(() => {
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker.register('/service-worker.js')
    //             .then(function (registration) {
    //                 console.log('Service Worker registrado con éxito:', registration);
    //             })
    //             .catch(function (error) {
    //                 console.log('Registro de Service Worker fallido:', error);
    //             });
    //     }
    // }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setShowError(false);

        if (!email || !password) {
            setShowError(true);
            return;
        }

        try {
            console.log('Enviando solicitud de inicio de sesión...');
            const res = await fetch(UrlLoginUsuarios, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email,
                    contraseña: password,
                }),
            });

            if (res.ok) {
                console.log('Inicio de sesión exitoso.');
                const data = await res.json();
                const token = data.token;
                console.log('Token recibido:', token);
                localStorage.setItem('authToken', token);
                const decodedToken = decodeToken(token);
                console.log('Token decodificado:', decodedToken);
                login(decodedToken); // Guardamos el usuario autenticado

                // Después de iniciar sesión, intentamos suscribir a notificaciones push
                // registerPushSubscription(decodedToken._id); // Pasamos el userId

                window.location.href = data.redirect;
            } else {
                const data = await res.json();
                console.log('Error en el inicio de sesión:', data.message);
                Swal.fire({ title: data.message, icon: 'error', timer: 1500 });
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            Swal.fire({ title: 'Error al realizar la solicitud', icon: 'error', timer: 1500 });
        }
    };

    // Función para suscribir al usuario a notificaciones push
    const registerPushSubscription = async (userId) => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Permiso de notificaciones concedido.');
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });

                console.log('Suscripción de notificaciones creada:', subscription);
                await sendSubscriptionToBackend(subscription, userId);
            } else {
                console.log('Permiso de notificaciones denegado.');
            }
        } catch (error) {
            console.error('Error al suscribir al usuario:', error);
        }
    };

    // Función para enviar la suscripción al backend
    const sendSubscriptionToBackend = async (subscription, userId) => {
        try {
            const res = await fetch(Subcripcioness, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    subscription: subscription
                }),
            });

            if (res.ok) {
                console.log('Suscripción enviada y registrada en el servidor.');
            } else {
                console.log('Error al registrar la suscripción en el servidor.');
            }
        } catch (error) {
            console.error('Error al enviar la suscripción al backend:', error);
        }
    };

    // Función para convertir la clave VAPID
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    return (
        <div className="container">
            <div className='flex container mx-auto justify-center'>
                <Breadcrumb path={'Iniciar sesión'} />
            </div>
            <div className="row justify-content-center m-3">
                <div className="col-md-5 border">
                    <Form onSubmit={handleSubmit}>
                        <h2 className="m-2 text-center">Inicio de Sesión</h2>
                        <Form.Group>
                            <Form.Label>Correo Electrónico</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                <input type="email"
                                    id='cajaTextoEmail'
                                    className={`form-control ${showError && !email ? 'is-invalid' : ''}`}
                                    placeholder="Ingresa tu correo electrónico"
                                    aria-describedby="basic-addon1" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {showError && !email && (
                                <Form.Text className="text-danger">
                                    Ingrese su correo.
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="input-group mb-1">
                            <Form.Label className='mt-1'>Contraseña</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Ingresa tu contraseña"
                                    aria-describedby="basic-addon1"
                                    value={password}
                                    id='cajaTextoPassword'
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`form-control ${showError && !password ? 'is-invalid' : ''}`}
                                />
                                <button type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </button>
                            </div>
                            {showError && !password && (
                                <Form.Text className="text-danger">
                                    Ingrese una contraseña.
                                </Form.Text>
                            )}
                        </Form.Group>
                        <div>
                            <div className="text-center m-2 mb-2 d-grid mx-auto">
                                <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>

                        <div className='text-center m-2 mb-3'>
                            <Link className="link-primary" to="/recuperarPassword">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
