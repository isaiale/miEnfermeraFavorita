import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash,faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  },
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
    nombre: 'isai',
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
  const [estadoUser,setEstdoUser]= useState('')

  return (
    <div>
      <div className="container-fluid">
        <h3 className='text-center display-6'>Clientes</h3>
        <div className="row">
          <div className="row mb-2">
            <div className="col-md-4 offset-md-4 mb-2">
              <div className="d-grid mx-auto">
                {/* <h3 className='text-center display-6'>Clientes</h3> */}
                <button className="btn btn-success"> Agregar</button>
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
                          <td style={{color: user.estado === 1 ? 'green':'red'}}><FontAwesomeIcon icon={user.estado===1?faCircle:faCircle} style={{fontSize:'11px'}}/> {user.estado ===1?'ACTIVO':'INACTIVO'}</td>
                          <td>{user.cuentaBloqueada}</td>
                          <td>
                            <button className="btn btn-danger me-1">
                              <FontAwesomeIcon icon={faTrash}/>
                            </button>
                            <button className="btn btn-warning">
                            <FontAwesomeIcon icon={faEdit}/>
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
    </div>
  )
}

export default Clientes
