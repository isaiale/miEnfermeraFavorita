import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import datosUsuarios from '../autenticar/usuarios.json';
import { AuthContext } from '../autenticar/AuthProvider';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const history = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        // Verificar las credenciales del usuario en los datos importados
        const user = datosUsuarios.usuarios.find((u) => u.correo === email && u.contrasena === password);

        if (user) {
            // Usuario autenticado con éxito
            setError('');
            login(user);
            // Redirigir según el rol del usuario
            if (user.roles.includes("usuario")) {
                history('/');
            } else if (user.roles.includes("administrador")) {
                history('/navbarAdmin');
            } else if (user.roles.includes("gerente")) {
                history('/navbarGerente');
            }
        } else {
            setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center m-3">
                <div className="col-md-5 border">
                    <Form onSubmit={handleSubmit}>
                        <h2 className="mb-4 text-center">Inicio de Sesión</h2>

                        {error && <p className="text-danger">{error}</p>}

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Form.Text
                                className="text-muted"
                                onClick={handleShowPassword}
                                style={{ cursor: 'pointer' }}
                            >
                                {showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                            </Form.Text>
                        </Form.Group>
                        <div className="text-center mt-3 d-grid mx-auto">
                            <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className='text-center m-2'>
                            <Link className=" link-primary">
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
