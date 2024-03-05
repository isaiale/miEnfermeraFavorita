import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCircle } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";

const usuarios = [
  {
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

const ProductosE = () => {

  return (
    <div>
      <div className="container-fluid">
        <h3 className='text-center display-6'>Productos</h3>
        <div className="row">
          <div className="row mb-2">
            {/* para agregar botones */}
            <div className="col-md-4 offset-md-4 mb-2">
              <div className="d-grid mx-auto">
                {/* <button className="btn btn-success"> Agregar</button> */}
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {usuarios.map((user, u) => (
                        <tr className="lead">
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
                            <button className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            &nbsp;{/* Sirve para dar un espacio*/}
                            <button className="btn btn-danger me-1">
                              <FontAwesomeIcon icon={faTrash} />
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
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead">Titulo</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div>
                <h1>hola</h1>
              </div>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-success'>
                Guardar
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

export default ProductosE;
