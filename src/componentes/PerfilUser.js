import React, { useContext, useEffect } from 'react'
import '../css/perfil.css'
import { AuthContext } from '../autenticar/AuthProvider'
import { useNavigate } from 'react-router-dom';

const PerfilUser = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Utiliza un efecto para redirigir al usuario si no está autenticado
        if (!isAuthenticated) {
            navigate('/login'); // Utiliza navigate para redirigir
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null; // Retorna null o un componente de carga mientras se redirige
    }
    return (
        <div>
            <section className="seccion-perfil-usuario mb-5">
                <div className="perfil-usuario-header">
                    <div className="perfil-usuario-portada">
                        <div className="perfil-usuario-avatar">
                            {/* <img src={img} alt="img-avatar"/>  */}
                            <i className="iconUser fa fa-user"></i>
                            <div className="boton-avatar" style={{background: user.estado === 'ACTIVO' ? 'green' : 'red'}}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="perfil-usuario-body">
                    <div className="perfil-usuario-bio">
                        <h3 className="titulo lead">
                            {user.rol === 'User' && 'Usuario'}
                            {user.rol === 'Admin' && 'Administrador'}
                            {user.rol === 'Gerente' && 'Gerente'}:&nbsp;{user.nombre}&nbsp;{user.apellido}</h3>
                        {/* <p className="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</p> */}
                    </div>
                    <div className="perfil-usuario-footer">
                        <ul className="lista-datos">
                            {/* <li><i className=" fa fa-map-signs"></i>Direccion de usuario:</li> */}
                            <li><i className="icono fa fa-phone"></i>{user.numeroTelefono}</li>
                            <li><i class="icono fa fa-envelope"></i>{user.correo}</li>
                            {/* <li><i className="icono fa fa-building"></i> Cargo</li> */}
                        </ul>
                        <ul className="lista-datos">
                            {/* <li><i className="icono fa fa-map"></i> Ubicacion.</li> */}
                            {/* <li><i className="icono fa fa-calendar"></i> Fecha nacimiento.</li> */}
                            <li><i class="icono fa fa-circle" style={{color: user.estado === 'ACTIVO' ? 'green' : 'red'}}></i> {user.estado}</li>
                            <li><i className="icono fa fa-calendar"></i>{user.fechaCreado.split('T')[0]}</li>
                            
                        </ul>
                    </div>
                    {/* <div className="redes-sociales">
                <a href="" className="boton-redes facebook fab fa-facebook-f"><i className="icon-facebook"></i></a>
                <a href="" className="boton-redes twitter fab fa-twitter"><i className="icon-twitter"></i></a>
                <a href="" className="boton-redes instagram fab fa-instagram"><i className="icon-instagram"></i></a>
            </div> */}
                </div>
            </section>
        </div>
    )
}

export default PerfilUser
