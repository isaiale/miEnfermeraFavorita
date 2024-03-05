import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCircle, faClose } from "@fortawesome/free-solid-svg-icons";
import '../css/formulario.css';
import { useState } from "react";

const usuarios = [
  {
    idUsuarios: 1,
    nombre: 'isai',
    apellido: 'Alejandro',
    correo: 'isaialef@gamil.com',
    numeroTelefono: '1234567891',
    rol: 'Usuario',
    fechaCreado: '2024/02/14',
    estado: 2,
    cuentaBloqueada: 'Desbloqueado'
  },
  {
    idUsuarios: 2,
    nombre: 'isa',
    apellido: 'Alejandro',
    correo: 'isaialef@gamil.com',
    numeroTelefono: '1234567891',
    rol: 'Usuario',
    fechaCreado: '2024/02/14',
    estado: 1,
    cuentaBloqueada: 'Desbloqueado'
  }
];

const Clientes = () => {
  const [idUsuarios, setIdUsuarios] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');
  const [cuentaBloqueada, setCuentaBloqueada] = useState('');
  const [operacionModal, setOperacionModal] = useState(1);
  const [tituloModal, setTituloModal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  // verificar si es registro o actualizar
  const abrirModal = (op, user) => {
    setIdUsuarios('');
    setNombre('');
    setApellido('');
    setCorreo('');
    setContraseña('');
    setTelefono('');
    setOperacionModal(op);
    if (op === 1) {
      setTituloModal('Registrar');
    }
    else if (op === 2) {
      setTituloModal('Actualizar');
      setIdUsuarios(user.idUsuarios);
      setNombre(user.nombre);
      setApellido(user.apellido);
      setTelefono(user.numeroTelefono);
      setRol(user.rol)
    }
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500);
  }

  return (
    <div>
      <div className="container-fluid">
        <h3 className='text-center display-6'>Clientes</h3>
        <div className="row">
          <div className="row mb-2">
            {/* para agregar botones */}
            <div className="col-md-4 offset-md-4 mb-2">
              <div className="d-flex mx-auto">
                {/* <button className="btn btn-success"> Agregar</button> */}
                <button onClick={() => abrirModal(1)} type="button" className="buttonAgregar" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                  <span className="button__text">Agregar</span>
                  <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                </button>
                &nbsp;
              </div>
            </div>
            {/* Parte de la tabla */}
            <div>
              <div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="">
                      <tr >
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Rol</th>
                        <th>Registro</th>
                        <th>Estado</th>
                        <th>Bloqueo</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {usuarios.map((user, u) => (
                        <tr className="lead" key={user.idUsuarios}>
                          <td >{u++}</td>
                          <td>{user.nombre}</td>
                          <td>{user.apellido}</td>
                          <td>{user.correo}</td>
                          <td>{user.numeroTelefono}</td>
                          <td>{user.rol}</td>
                          <td>{user.fechaCreado}</td>
                          <td style={{ color: user.estado === 1 ? 'green' : 'red' }}><FontAwesomeIcon icon={user.estado === 1 ? faCircle : faCircle} style={{ fontSize: '11px' }} /> {user.estado === 1 ? 'ACTIVO' : 'INACTIVO'}</td>
                          <td>{user.cuentaBloqueada}</td>
                          <td>
                            <button onClick={() => abrirModal(2, user)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            &nbsp;{/* Sirve para dar un espacio*/}
                            <button className="btn btn-danger">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            &nbsp;{/* Sirve para dar un espacio*/}
                            <button className="btn btn-danger">
                              <FontAwesomeIcon icon={faClose} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Parte del Modal */}
      <div id='modalUsuarios' class="modal fade" data-bs-backdrop="static">
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead fw-bold">{tituloModal}&nbsp;Usuario</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {/* Parte del  Formulario */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {operacionModal === 1 ?
                      <>
                        <div className="input-container">
                          <input placeholder="Nombre" className="input-field" id="nombre" type="text" required
                            value={nombre} onChange={(e) => setNombre(e.target.value)} />
                          <label for="input-field" className="input-label">Nombre:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Apellido" className="input-field" type="text" required
                            onChange={(e) => setApellido(e.target.value)} />
                          <label for="input-field" className="input-label">Apellido:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Telefono" className="input-field" type="number" required
                            onChange={(e) => setTelefono(e.target.value)} />
                          <label for="input-field" className="input-label">Telefono:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Correo Electrónico:" className="input-field" type="email" required
                            onChange={(e) => setCorreo(e.target.value)} />
                          <label for="input-field" className="input-label">Correo Electrónico:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Contraseña" className="input-field" type="password" required
                            onChange={(e) => setContraseña(e.target.value)} />
                          <label for="input-field" className="input-label">Contraseña:</label>
                          <span className="input-highlight"></span>
                        </div>
                      </>
                      :
                      <></>
                      }
                      { operacionModal === 2 ?
                      <>
                        <div className="input-container">
                          <input placeholder="Nombre" className="input-field" id="nombre" type="text" required
                            value={nombre} onChange={(e) => setNombre(e.target.value)} />
                          <label for="input-field" className="input-label">Nombre:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Apellido" className="input-field" type="text" required
                            value={apellido} onChange={(e) => setApellido(e.target.value)} />
                          <label for="input-field" className="input-label">Apellido:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Telefono" className="input-field" type="number" required
                            value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                          <label for="input-field" className="input-label">Telefono:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Rol del Usuario" className="input-field" type="text" required
                            value={rol} onChange={(e) => setRol(e.target.value)} />
                          <label for="input-field" className="input-label">Rol:</label>
                          <span className="input-highlight"></span>
                        </div>
                      </>
                      :
                      <></>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button class="btnFormulario">
                {tituloModal}
              </button>
              <button id='btncerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clientes
