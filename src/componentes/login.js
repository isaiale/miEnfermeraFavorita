import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { UrlUsuarios } from '../url/urlSitioWeb';
import { AuthContext } from '../autenticar/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
        fetch(UrlUsuarios)
            .then(response => response.json())
            .then(data => {
                const user = data.find((u) => u.correo === email && u.contraseña === password);
                if (user) {
                    // Usuario autenticado con éxito
                    setError('');
                    login(user);
                    // Redirigir según el rol del usuario
                    if (user.rol.some((r) => r.rol.includes("user"))) {
                        history('/');                        
                    } else if (user.rol.some((r) => r.rol.includes("admin"))) {
                        history('/inicioAdmin');
                    } else if (user.rol.some((r) => r.rol.includes("gerente"))) {
                        history('/inicioGerente');
                    }
                } else {
                    setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
                }
            })


    };

    return (
        <div className="container">
            <div className="row justify-content-center m-3">
                <div className="col-md-5 border">
                    <Form onSubmit={handleSubmit}>
                        <h2 className="m-2 text-center">Inicio de Sesión</h2>

                        {error &&
                            <div className=''>
                                <p className="mt-1 mb-1 alert alert-danger ">{error}</p>
                            </div>
                        }

                        <Form.Group className="" controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                <input type="email" className="form-control" placeholder="Ingresa tu correo electrónico" aria-describedby="basic-addon1" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Form.Label className='mt-3'>Contraseña</Form.Label>
                        </Form.Group>

                        <Form.Group className="input-group mb-3" controlId="password">
                            <span class="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                classname='input-group'
                            />
                            <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </button>
                        </Form.Group>
                        <div className="text-center mt-3 d-grid mx-auto">
                            <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className='text-center m-2'>
                            <Link className="link-primary " to="/recuperarPassword">
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
