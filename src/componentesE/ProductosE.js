import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faLockOpen, faLock, faSearch } from "@fortawesome/free-solid-svg-icons";
import '../css/formulario.css';
import { useEffect, useState } from "react";
import { Productos, Estado_Producto, CategoriaProducto, urlCloudinary } from "../url/urlSitioWeb";
import Swal from "sweetalert2";
import { validarNombre } from "../utilidad/Validaciones";

const ProductosE = () => {
  const [categoria, setCategoria] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
  const [idProductos, setIdProductos] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [imagenes, setImagenes] = useState('');
  const [inventario, setInventario] = useState('');
  const [categoriaP, setCategoriaP] = useState('');
  const [estado, setEstado] = useState('');
  const [operacionModal, setOperacionModal] = useState(1);
  const [tituloModal, setTituloModal] = useState('');
  const [buscar, setBuscar] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const datosProducto = async () => {
    try {
      const response = await fetch(Productos);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.')
      }
      const jsonDataUsuario = await response.json();
      setDataProductos(jsonDataUsuario);
    } catch (error) {
      Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
    }
  }

  const catProducto = async () => {
    try {
      const response = await fetch(CategoriaProducto);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.');
      }
      const dataCategoria = await response.json();
      setCategoria(dataCategoria);
    } catch (error) {
      console.error('Error al obtener Categoria:', error);
    }
  };

  useEffect(() => {
    datosProducto();
    catProducto();
  }, [])

// Para subir imagenes
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "uploads");
    // setLoading(true);}
    try {
      const res = await fetch(urlCloudinary, {
        method: "POST",
        body: data,
      });
      const file = await res.json();
      setImagenes(file.secure_url);
    } catch (error) {
      Swal.fire({
        title: "Error al cargar la imagen.", icon: "error", showConfirmButton: false
      });
    }
    // setLoading(false);
  };

  // verificar si es registro o actualizar
  const abrirModal = (op, productos) => {
    setIdProductos('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagenes('');
    setInventario('');
    setDescuento('');
    setCategoriaP('');
    setOperacionModal(op);
    if (op === 1) {
      setTituloModal('Registrar');
    }
    else if (op === 2) {
      setTituloModal('Actualizar');
      setIdProductos(productos._id);
      setNombre(productos.nombre);
      setDescripcion(productos.descripcion);
      setInventario(productos.inventario);
      setPrecio(productos.precio);
      setImagenes(productos.imagenes);
      setDescuento(productos.descuento);
      const catP = categoria.find(categ => categ._id === productos.categoria[0]._id);
      setCategoriaP(catP ? catP._id : '');

    }
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500);
  }

  // Validar el producto
  const validar = () => {
    if (!validarNombre(nombre)) {
      Swal.fire({
        title: "Nombre invalido.", icon: "info", timer: 1500, showConfirmButton: false
      });
      return;
    }

    var parametros;

    parametros = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      categoria: categoriaP,
      imagenes: imagenes,
      inventario: inventario,
      descuento: descuento
    };

    if (operacionModal === 1) {
      agregarUsuario(parametros);
    } else {
      editarUsuario(parametros, idProductos);
    }
  }

  // agregar producto
  const agregarUsuario = async (parametros) => {
    const response = await fetch(Productos, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametros)
    });
    if (response.ok) {
      // Aquí puedes manejar la respuesta exitosa como desees
      Swal.fire({ title: "Se agregó correctamente.", icon: "success", timer: 1500, showConfirmButton: false });
      document.getElementById('btncerrar').click();
      datosProducto();
    } else {
      const data = await response.json();
      console.log(data.message);
      Swal.fire({
        title: "Error al registrar usuario.", text: "Por favor, intenta nuevamente.", icon: "error", showConfirmButton: false
      });
    }
  };

  // Editar producto
  const editarUsuario = async (parametros, idProductos) => {
    const response = await fetch(`${Productos}/${idProductos}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametros)
    });
    if (response.ok) {
      Swal.fire({ title: "Se actualizó correctamente.", icon: "success", timer: 1500, showConfirmButton: false });
      document.getElementById('btncerrar').click();
      datosProducto();
    } else {
      const data = await response.json();
      console.log(data.error);
      Swal.fire({
        title: "Error al actualizar usuario.", text: "Por favor, intenta nuevamente.", icon: "error", showConfirmButton: false
      });
    }
  }
  const handleOpenEstadoModal = (productos) => {
    setSelectedProduct(productos);
  };

  // estado de producto
  const EstadoProducto = async (handleOpenEstadoModal) => { 
    try {
      // Hacer la solicitud a la API para actualizar el estado del producto
      const response = await fetch(`${Estado_Producto}/${handleOpenEstadoModal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: estado // Aquí pasamos el estado seleccionado
        })
      });

      if (response.ok) {        
        datosProducto();
        Swal.fire({
          title: 'Producto actualizado', text: 'El estado del producto ha sido actualizado correctamente.', timer: 1500, icon: 'success', showConfirmButton: false
        });
        document.getElementById('btncerrarP').click();
      }
    } catch (error) {
      console.error('Error al actualizar el estado del producto:', error);
      // Mostrar una alerta de error
      Swal.fire({
        title: 'Error', text: 'Ha ocurrido un error al actualizar el estado del producto.', icon: 'error'
      });
    }
  };


  // Eliminar producto
  const eliminarUsuario = async (productos) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar a ' + productos.nombre + '?', icon: 'question',
      showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        // Realizar la solicitud DELETE a la API para eliminar al usuario
        const response = await fetch(`${Productos}/${productos._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          datosProducto();
          Swal.fire({
            title: 'producto eliminado', text: 'El producto ha sido eliminado correctamente.', icon: 'success', showConfirmButton: false
          });
        } else {
          throw new Error('Error al eliminar producto: ' + response.status);
        }
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        Swal.fire({
          title: 'Error', text: 'Ha ocurrido un error al eliminar el producto.', icon: 'error', showConfirmButton: false
        });
      }
    } else {
      // El usuario canceló la eliminación
      Swal.fire({
        title: "El producto no fue eliminado.", icon: "info", timer: 1500, showConfirmButton: false
      });
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setBuscar(value);
  }
  const usuariosFiltro = dataProductos.filter(productos =>
    productos.nombre.toLowerCase().includes(buscar) ||
    productos.descripcion.toLowerCase().includes(buscar) ||
    productos.precio.toLowerCase().includes(buscar) ||
    productos.inventario.includes(buscar)
  );

  return (
    <div>
      <div className="container-fluid">
        <h3 className='text-center display-6'>Productos</h3>
        <div className="row">
          <div className="row mb-2">
            {/* para agregar botones */}
            <div className=" mb-2">
              <div className="d-flex mx-auto">
                <div className="text-start">
                  <p className="lead ">Total de productos: {dataProductos.length}</p>
                </div>
                &nbsp;&nbsp;
                <div className="ms-5 text-center">
                  <button onClick={() => abrirModal(1)} type="button" className="buttonAgregar ms-3" data-bs-toggle='modal' data-bs-target='#modalProducto'>
                    <span className="button__text">Agregar</span>
                    <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                  </button>
                </div>
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
            {/* Parte de la tabla */}
            <div>
              <div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="">
                      <tr >
                        <th>#</th>
                        <th>Atualizado</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th style={{ width: '110px' }}>Imagen</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Categoria</th>
                        <th>Descuento</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {usuariosFiltro.map((productos, index) => (
                        <tr className="" key={productos._id}>

                          <td>{index + 1}</td>
                          <td>{productos.actualizadoEn.split('T')[0]}</td>
                          <td>{productos.nombre}</td>
                          <td>{productos.descripcion}</td>
                          <td><div className='w-50'><img src={productos.imagenes} className="img-fluid w-100 h-100" alt="Product" /></div></td>
                          <td>${productos.precio}</td>
                          <td>{productos.inventario}</td>
                          <td>{productos.categoria[0].nombre}</td>
                          <td>{productos.descuento === 0 ? 'sin descuento' : `%${productos.descuento}`}</td>
                          <td style={{ color: productos.estado === "Activo" ? 'green' : 'red' }}>{productos.estado}</td>
                          <td>
                            <button onClick={() => abrirModal(2, productos)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalProducto'>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            &nbsp;
                            <button onClick={() => eliminarUsuario(productos)} className="btn btn-danger">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            &nbsp;

                            <button onClick={() => handleOpenEstadoModal(productos)} className="btn btn-info" data-bs-toggle='modal' data-bs-target='#modalProductoEstado'>
                              <FontAwesomeIcon icon={faEdit} />
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
      {/* Parte del Modal */}
      <div id='modalProducto' class="modal fade" data-bs-backdrop="static">
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead fw-bold">{tituloModal}&nbsp;producto</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {/* Parte del  Formulario */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-container">
                      <input placeholder="Nombre" className="input-field" id="nombre" type="text" required
                        value={nombre} onChange={(e) => setNombre(e.target.value)} />
                      <label for="input-field" className="input-label">Nombre:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input placeholder="Descripción" className="input-field" type="text" required
                        value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                      <label for="input-field" className="input-label">Descripción:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input placeholder="Inventario" className="input-field" type="number" required
                        value={inventario} onChange={(e) => setInventario(e.target.value)} />
                      <label for="input-field" className="input-label">Inventario:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input placeholder="Precio:" className="input-field" type="number" required
                        value={precio} onChange={(e) => setPrecio(e.target.value)} />
                      <label for="input-field" className="input-label">Precio:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input placeholder="Descuento opcional:" className="input-field" type="number"
                        value={descuento} onChange={(e) => setDescuento(e.target.value)} />
                      <label for="input-field" className="input-label">Descuento:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input placeholder="Imagenes" className="input-field" type="file" required
                        onChange={uploadImage} />
                      <label for="input-field" className="input-label">Imagenes:</label>
                      <span className="input-highlight"></span>
                      {imagenes && <img src={imagenes} alt="imagen" className="img-thumbnail mb-3" style={{ maxWidth: "100px" }} />}
                    </div>

                    <div className="input-container">
                      <select className="input-field" required value={categoriaP} onChange={(e) => setCategoriaP(e.target.value)}>
                        <option value="">Selecciona una Categoria</option>
                        {categoria.map((categoriaP) => (
                          <option key={categoriaP._id} value={categoriaP._id}>
                            {categoriaP.nombre}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="input-field" className="input-label">Categoria:</label>
                      <span className="input-highlight"></span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button class="btnFormulario" onClick={() => validar()}>
                {tituloModal}
              </button>
              <button id='btncerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id='modalProductoEstado' class="modal fade" data-bs-backdrop="static">
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead fw-bold">Estado de producto</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {/* Parte del  Formulario */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-container">
                      <select className="input-field" required value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="">Selecciona un estado</option>
                        <option value="Activo">Activo</option>
                        <option value="Agotado">Agotado</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                      <label htmlFor="input-field" className="input-label">Categoria:</label>
                      <span className="input-highlight"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button onClick={() => EstadoProducto(selectedProduct)} class="btnFormulario">
                Cambiar
              </button>
              <button id='btncerrarP' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductosE
