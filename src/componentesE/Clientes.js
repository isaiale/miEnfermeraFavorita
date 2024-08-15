import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faLockOpen, faLock, faSearch } from "@fortawesome/free-solid-svg-icons";
import '../css/formulario.css';
import { useEffect, useState } from "react";
import { UrlUsuarios, BloquearUsuario, RolUsuario } from "../url/urlSitioWeb";
import Swal from "sweetalert2";
import { validarNombre } from "../utilidad/Validaciones";
import { Pagination } from 'react-bootstrap';

const Clientes = () => {
  const [roles, setRoles] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [idUsuarios, setIdUsuarios] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');
  const [operacionModal, setOperacionModal] = useState(1);
  const [tituloModal, setTituloModal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [buscar, setBuscar] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const datosUsuarios = async () => {
    try {
      const response = await fetch(UrlUsuarios);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.')
      }
      const jsonDataUsuario = await response.json();
      setDataUser(jsonDataUsuario);
    } catch (error) {
      Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
    }
  }

  const rolesUsuario = async () => {
    try {
      const response = await fetch(RolUsuario);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.');
      }
      const dataRoles = await response.json();
      setRoles(dataRoles);
    } catch (error) {
      console.error('Error al obtener roles de usuario:', error);
    }
  };

  useEffect(() => {
    datosUsuarios();
    rolesUsuario();
  }, [])

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
      setIdUsuarios(user._id);
      setNombre(user.nombre);
      setApellido(user.apellido);
      setTelefono(user.numeroTelefono);
      const userRol = roles.find(role => role._id === user.rol[0]._id);
      setRol(userRol ? userRol._id : '');
    }
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500);
  }

  const validar = () => {
    if (!validarNombre(nombre)) {
      Swal.fire({
        title: "Nombre invalido.", icon: "info", timer: 1500, showConfirmButton: false
      });
      return;
    }

    var parametrosAgregarUsuario;
    var parametrosEditarUsuario;

    parametrosAgregarUsuario = {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      contraseña: contraseña,
      numeroTelefono: telefono
    };

    parametrosEditarUsuario = {
      nombre: nombre,
      apellido: apellido,
      numeroTelefono: telefono,
      rol: rol
    }

    if (operacionModal === 1) {
      agregarUsuario(parametrosAgregarUsuario);
    } else {
      editarUsuario(parametrosEditarUsuario, idUsuarios);
    }
  }

  const agregarUsuario = async (parametrosAgregarUsuario) => {
    const response = await fetch(UrlUsuarios, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametrosAgregarUsuario)
    });
    if (response.ok) {
      Swal.fire({ title: "Se agregó correctamente.", icon: "success", timer: 1500, showConfirmButton: false });
      document.getElementById('btncerrar').click();
      datosUsuarios();
    } else {
      const data = await response.json();
      console.log(data.message);
      Swal.fire({
        title: "Error al registrar usuario.", text: "Por favor, intenta nuevamente.", icon: "error", showConfirmButton: false
      });
    }
  };

  const editarUsuario = async (parametrosEditarUsuario, idUsuarios) => {
    const response = await fetch('${UrlUsuarios}/${idUsuarios}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametrosEditarUsuario)
    });
    if (response.ok) {
      Swal.fire({ title: "Se actualizó correctamente.", icon: "success", timer: 1500, showConfirmButton: false });
      document.getElementById('btncerrar').click();
      datosUsuarios();
    } else {
      const data = await response.json();
      console.log(data.error);
      Swal.fire({
        title: "Error al actualizar usuario.", text: "Por favor, intenta nuevamente.", icon: "error", showConfirmButton: false
      });
    }
  }

  const bloquearUsuario = async (user) => {
    const result = await Swal.fire({
      title: 'Seguro que quiere cambiar estado de bloqueo a ' + user.nombre + '?', icon: 'question',
      showCancelButton: true, confirmButtonText: 'Si', cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch('${BloquearUsuario}/${user._id}', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cuentaBloqueada: user.cuentaBloqueada
          })
        });

        if (response.ok) {
          datosUsuarios();
          Swal.fire({
            title: 'Usuario actualizado', text: 'El estado de la cuenta ha sido actualizado correctamente.', timer: 1500, icon: 'success', showConfirmButton: false
          });
        }
      } catch (error) {
        console.error('Error al bloquear usuario:', error);
        Swal.fire({
          title: 'Error', text: 'Ha ocurrido un error al bloquear el usuario.', icon: 'error'
        });
      }
    } else {
      Swal.fire({
        title: "El usuario no fue bloqueado.", icon: "info", timer: 1500, showConfirmButton: false
      });
    }
  };

  const eliminarUsuario = async (user) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar a ' + user.nombre + '?', icon: 'question',
      showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('${UrlUsuarios}/${user._id}', {
          method: 'DELETE',
        });

        if (response.ok) {
          datosUsuarios();
          Swal.fire({
            title: 'Usuario eliminado', text: 'El usuario ha sido eliminado correctamente.', icon: 'success', showConfirmButton: false
          });
        } else {
          throw new Error('Error al eliminar usuario: ' + response.status);
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        Swal.fire({
          title: 'Error', text: 'Ha ocurrido un error al eliminar el usuario.', icon: 'error', showConfirmButton: false
        });
      }
    } else {
      Swal.fire({
        title: "El usuario no fue eliminado.", icon: "info", timer: 1500, showConfirmButton: false
      });
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setBuscar(value);
  }
  const usuariosFiltro = dataUser.filter(user =>
    user.nombre.toLowerCase().includes(buscar) ||
    user.apellido.toLowerCase().includes(buscar) ||
    user.correo.toLowerCase().includes(buscar) ||
    user.numeroTelefono.includes(buscar)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuariosFiltro.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="container-fluid">
        <h3 className='text-center display-6'>Usuarios</h3>
        <div className="row">
          <div className="row mb-2">
            <div className=" mb-2">
              <div className="d-flex mx-auto">
                <div className="text-start">
                  <p className="lead ">Total de usuarios: {dataUser.length}</p>
                </div>
                &nbsp;&nbsp;
                {/* <div className="ms-5 text-center">
                  <button onClick={() => abrirModal(1)} type="button" className="buttonAgregar ms-3" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                    <span className="button__text">Agregar</span>
                    <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                  </button>
                </div> */}
                <div className="ms-auto">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Buscar usuario" value={buscar} onChange={handleSearch} />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                        <th>Rolis</th>
                        <th>Registro</th>
                        <th>Estado</th>
                        <th>Bloqueo</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentItems.map((user, index) => (
                        <tr className="" key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.nombre}</td>
                          <td>{user.apellido}</td>
                          <td>{user.correo}</td>
                          <td>{user.numeroTelefono}</td>
                          <td>{user.rol[0].descripcion}</td>
                          <td>{user.fechaCreado}</td>
                          <td style={{ color: user.estado === "ACTIVO" ? 'green' : 'red' }}>{user.estado}</td>
                          <td>
                            <button className="btn btn-info" onClick={() => bloquearUsuario(user)}>
                              <FontAwesomeIcon icon={user.cuentaBloqueada === false ? faLockOpen : faLock} />
                            </button>
                          </td>
                          <td>
                            <button onClick={() => abrirModal(2, user)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            &nbsp;
                            <button onClick={() => eliminarUsuario(user)} className="btn btn-danger">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            &nbsp;
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
      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
  <Pagination className="justify-content-center">
    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
    {[...Array(Math.ceil(usuariosFiltro.length / itemsPerPage)).keys()].map((number) => (
      <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
        {number + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(usuariosFiltro.length / itemsPerPage)} />
  </Pagination>
</div>

      <div id='modalUsuarios' className="modal fade" data-bs-backdrop="static">
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead fw-bold">{tituloModal}&nbsp;Usuario</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {operacionModal === 1 ?
                      <>
                        <div className="input-container">
                          <input placeholder="Nombre" className="input-field" id="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Nombre:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Apellido" className="input-field" type="text" required onChange={(e) => setApellido(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Apellido:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Telefono" className="input-field" type="number" required onChange={(e) => setTelefono(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Telefono:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Correo Electrónico:" className="input-field" type="email" required onChange={(e) => setCorreo(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Correo Electrónico:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Contraseña" className="input-field" type="password" required onChange={(e) => setContraseña(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Contraseña:</label>
                          <span className="input-highlight"></span>
                        </div>
                      </>
                      :
                      <></>
                    }
                    {operacionModal === 2 ?
                      <>
                        <div className="input-container">
                          <input placeholder="Nombre" className="input-field" id="nombre" type="text" required
                            value={nombre} onChange={(e) => setNombre(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Nombre:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Apellido" className="input-field" type="text" required
                            value={apellido} onChange={(e) => setApellido(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Apellido:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <input placeholder="Telefono" className="input-field" type="number" required
                            value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                          <label htmlFor="input-field" className="input-label">Telefono:</label>
                          <span className="input-highlight"></span>
                        </div>
                        <div className="input-container">
                          <select className="input-field" required value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value="">Selecciona un rol</option>
                            {roles.map((role) => (
                              <option key={role._id} value={role._id}>
                                {role.descripcion}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="input-field" className="input-label">Rol:</label>
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
              <button className="btnFormulario" onClick={() => validar()}>
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

export default Clientes;