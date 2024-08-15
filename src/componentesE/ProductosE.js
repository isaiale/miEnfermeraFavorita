import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import '../css/formulario.css';
import { useEffect, useState } from "react";
import { Productos, img, Estado_Producto, CategoriaProducto } from "../url/urlSitioWeb";
import Swal from "sweetalert2";
import { validarNombre } from "../utilidad/Validaciones";
import { Pagination } from 'react-bootstrap';

const ProductosE = () => {
  const [categoria, setCategoria] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
  const [idProductos, setIdProductos] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [imagenes, setImagenes] = useState([]);
  const [inventario, setInventario] = useState('');
  const [categoriaP, setCategoriaP] = useState('');
  const [estado, setEstado] = useState('');
  const [sexo, setSexo] = useState('');
  const [operacionModal, setOperacionModal] = useState(1);
  const [tituloModal, setTituloModal] = useState('');
  const [buscar, setBuscar] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]); /* tallas seleccionada bien  */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [usuariosFiltro, setUsuariosFiltro] = useState([]);
  const currentItems = usuariosFiltro.slice(indexOfFirstItem, indexOfLastItem);
  const [selectedCategoriaFiltro, setSelectedCategoriaFiltro] = useState(''); // Nuevo estado para el filtro de categoría
  const [tallasDisponibles, setTallasDisponibles] = useState([]); // Estado para las tallas disponibles

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

  const uploadImage = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    // Validación inicial para verificar si todos los archivos son imágenes
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.match('image.*')) {
        alert('Solo se permiten archivos de imagen.');
        return; // Detiene la función si algún archivo no es una imagen
      }
      formData.append('imagen', file);
    }

    try {
      const response = await fetch(img, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setImagenes(prevImageUrls => [...prevImageUrls, { url: data.url, publicId: data.publicId }]);
      console.log(data.url, data.publicId);
    } catch (error) {
      console.error('Error al subir la imagen: ' + error.message);
    }
  };

  // Manejar el cambio de categoría para ajustar las tallas disponibles
  const handleCategoriaChange = (e) => {
    const selectedCategoria = e.target.value;
    setCategoriaP(selectedCategoria);

    // Encuentra la categoría seleccionada
    const categoriaSeleccionada = categoria.find(cat => cat._id === selectedCategoria);
    actualizarTallasDisponibles(categoriaSeleccionada?.nombre, sexo);

    // Limpiar las tallas seleccionadas
    setTallasSeleccionadas([]);
  };

  const handleSexoChange = (e) => {
    const selectedSexo = e.target.value;
    setSexo(selectedSexo);

    // Encuentra la categoría seleccionada
    const categoriaSeleccionada = categoria.find(cat => cat._id === categoriaP);
    actualizarTallasDisponibles(categoriaSeleccionada?.nombre, selectedSexo);

    // Limpiar las tallas seleccionadas
    setTallasSeleccionadas([]);
  };

  const actualizarTallasDisponibles = (categoriaNombre, sexo) => {
    if (categoriaNombre === 'Pantalones') {
      setTallasDisponibles(['28', '30', '32', '34', '36', '38', '40', '42', '44']);
    } else if (categoriaNombre === 'Zapatos') {
      setTallasDisponibles(sexo === 'Mujer' ? ['5', '6', '7', '8', '9', '10'] : ['23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33']);
    } else {
      setTallasDisponibles(['Ch', 'M', 'G', 'XL']);
    }
  };

  const abrirModal = (op, productos) => {
    setIdProductos('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagenes([]);
    setInventario('');
    setDescuento('');
    setCategoriaP('');
    setSexo('');
    setTallasSeleccionadas([]);
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
      setSexo(productos.sexo);
      setTallasSeleccionadas(Array.isArray(productos.talla) ? productos.talla : [productos.talla]);
    }
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500);
  }

  // Para accesorios
  const abrirModalAccesorio = (op, productos) => {
    setIdProductos('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagenes([]);
    setInventario('');
    setDescuento('');
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
    }
    window.setTimeout(function () {
      document.getElementById('nombree').focus();
    }, 500);
  }

  const validarAccesorio = () => {
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
      imagenes: imagenes,
      inventario: inventario,
      descuento: descuento
    };

    if (operacionModal === 1) {
      agregarAccesorios(parametros);
    } else {
      actualizar(parametros, idProductos);
    }
  }

  const validar = () => {
    if (!validarNombre(nombre)) {
      Swal.fire({
        title: "Nombre invalido ingresa solo letras.", icon: "info", timer: 1500, showConfirmButton: false
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
      descuento: descuento,
      talla: tallasSeleccionadas,
      sexo: sexo
    };

    if (operacionModal === 1) {
      agregarProductos(parametros);
    } else {
      actualizar(parametros, idProductos);
    }
  }

  const agregarAccesorios = async (parametros) => {
    const response = await fetch(`${Productos}/accesorios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametros)
    });
    if (response.ok) {
      Swal.fire({ title: "Se agregó correctamente el accesorio.", icon: "success", timer: 1500, showConfirmButton: false });
      document.getElementById('btncerrarA').click();
      datosProducto();
    } else {
      const data = await response.json();
      console.log(data.message);
      Swal.fire({
        title: "Error al registrar.", text: "Por favor, intenta nuevamente.", icon: "error", showConfirmButton: false
      });
    }
  };

  const agregarProductos = async (parametros) => {
    const response = await fetch(Productos, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametros)
    });
    if (response.ok) {
      Swal.fire({ title: "Se agregó correctamente.", icon: "success", timer: 1500, showConfirmButton: false });
      document.getElementById('btncerrar').click();
      datosProducto();
    } else {
      const data = await response.json();
      console.log(data);
      Swal.fire({
        title: "Error al registrar.", text: "Por favor, intenta nuevamente.", icon: "error", showConfirmButton: false
      });
    }
  };

  const actualizar = async (parametros, idProductos) => {
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
      document.getElementById('btncerrarA').click();
      datosProducto();
    } else {
      const data = await response.json();
      console.log(data.error, data.message);
      Swal.fire({
        title: "Error al actualizar usuario.", text: "Por favor, intenta nuevamente.", icon: "error", showConfirmButton: false
      });
    }
  }

  const handleOpenEstadoModal = (productos) => {
    setSelectedProduct(productos);
  };

  const EstadoProducto = async (handleOpenEstadoModal) => {
    try {
      const response = await fetch(`${Estado_Producto}/${handleOpenEstadoModal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estado: estado
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
      Swal.fire({
        title: 'Error', text: 'Ha ocurrido un error al actualizar el estado del producto.', icon: 'error'
      });
    }
  };

  const eliminarUsuario = async (productos) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar a ' + productos.nombre + '?', icon: 'question',
      showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
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
      Swal.fire({
        title: "El producto no fue eliminado.", icon: "info", timer: 1500, showConfirmButton: false
      });
    }
  }

  const eliminarImagen = async (publicId) => {
    try {
      const response = await fetch(`${img}/${publicId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setImagenes(prevImageUrls => prevImageUrls.filter(image => image.publicId !== publicId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value !== undefined && value !== null) {
      const lowerCaseValue = value.toLowerCase();
      setBuscar(lowerCaseValue);
    }
  };

  // Para las tallas
  const tallasSeleccionadasFuncion = (e) => {
    const { value, checked } = e.target;
    setTallasSeleccionadas(prevTallas =>
      checked ? [...prevTallas, value] : prevTallas.filter(talla => talla !== value)
    );
  };

  const handleCategoriaFiltroChange = (e) => {
    setSelectedCategoriaFiltro(e.target.value);
  };

  // Función para manejar el cambio en el campo del nombre.
  const handleNombreChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      setNombre(value);
    }
  };

  // Función para manejar el cambio en el campo del precio.
  const handlePrecioChange = (e) => {
    const value = e.target.value;
    // Esta expresión regular asegura que sólo se acepten números enteros
    if (/^\d*$/.test(value)) {
      setPrecio(value);
    }
  };

  // Función para manejar el cambio en el campo del descuento.
  const handleDescuentoChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDescuento(value);
    }
  };

  // Función para manejar el cambio en el campo del inventario.
  const handleInventarioChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInventario(value);
    }
  };


  useEffect(() => {
    const filtrarProductos = () => {
      let filtro = dataProductos.filter(productos =>
        (productos.nombre && productos.nombre.toLowerCase().includes(buscar)) ||
        (productos.descripcion && productos.descripcion.toLowerCase().includes(buscar)) ||
        (productos.precio && productos.precio.toLowerCase().includes(buscar)) ||
        (productos.inventario && productos.inventario.includes(buscar))
      );

      if (selectedCategoriaFiltro) {
        filtro = filtro.filter(productos => productos.categoria[0]._id === selectedCategoriaFiltro);
      }

      setUsuariosFiltro(filtro);
    };

    filtrarProductos();

  }, [buscar, dataProductos, selectedCategoriaFiltro]);

  return (
    <div>
      <div className="container-fluid">
        <h3 className='text-center display-6'>Productos</h3>
        <div className="row">
          <div className="row mb-2">
            <div className=" mb-2">
              <div className="d-flex mx-auto">
                <div className="text-start">
                  <p className="lead ">Total de productos: {dataProductos.length}</p>
                </div>

                &nbsp;&nbsp;
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opciones
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li ><button className="dropdown-item" onClick={() => abrirModal(1)} data-bs-toggle='modal' data-bs-target='#modalProducto'>Agregar producto.</button></li>
                    <li><button className="dropdown-item" onClick={() => abrirModalAccesorio(1)} data-bs-toggle='modal' data-bs-target='#modalAccesorios'>Agregar Accesorios.</button></li>
                  </ul>
                </div>
                <div className="ms-auto">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Buscar" value={buscar} onChange={handleSearch} />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                <div className="ms-auto">
                  <select className="form-select" value={selectedCategoriaFiltro} onChange={handleCategoriaFiltroChange}>
                    <option value="">Todas las categorías</option>
                    {categoria.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.nombre}</option>
                    ))}
                    <option key='660e8da897d41d20a385ee4f' value='660e8da897d41d20a385ee4f'>Accesorios</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="">
                      <tr >
                        <th>Creado</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th style={{ width: '100px' }}>Imagen</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Categoria</th>
                        <th>Descuento</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {currentItems.map((productos, index) => (
                        <tr className="" key={productos._id}>
                          <td>{productos.creadoEn.split('T')[0]}</td>
                          <td>{productos.nombre}</td>
                          <td>{productos.descripcion}</td>
                          <td>
                            {productos.imagenes.length > 0 && (
                              <div className="mt-2">
                                <img src={productos.imagenes[0].url} alt={`Imagen 1`} className="img-thumbnail" style={{ maxWidth: "100px" }} />
                              </div>
                            )}
                          </td>
                          <td>${productos.precio}</td>
                          <td>{productos.inventario}</td>
                          <td>{productos.categoria[0].nombre}</td>
                          <td>{productos.descuento === 0 ? 'sin descuento' : `%${productos.descuento}`}</td>
                          <td style={{ color: productos.estado === "Activo" ? 'green' : 'red' }}>{productos.estado}</td>
                          <td>
                            {productos.categoria[0].nombre === 'Accesorios' ? (
                              <button onClick={() => abrirModalAccesorio(2, productos)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalAccesorios' title="Editar Accesorio.">
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                            ) : (
                              <button onClick={() => abrirModal(2, productos)} className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalProducto' title="Editar producto.">
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                            )}
                            &nbsp;
                            <button onClick={() => eliminarUsuario(productos)} className="btn btn-danger" title="Eliminar este producto.">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            &nbsp;
                            <button onClick={() => handleOpenEstadoModal(productos)} className="btn btn-info" data-bs-toggle='modal' data-bs-target='#modalProductoEstado' title="Cambiar estado del producto.">
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
      {usuariosFiltro.length > 0 && (
        <div className="ms-5" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Pagination className="ms-5">
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(Math.ceil(usuariosFiltro.length / itemsPerPage)).keys()].map((number) => (
              <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(usuariosFiltro.length / itemsPerPage)} />
          </Pagination>
        </div>
      )}

      <div id='modalProducto' class="modal fade" data-bs-backdrop="static">
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead fw-bold">{tituloModal}&nbsp;producto</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-container">
                      <select placeholder="Categoria" className="input-field" required value={categoriaP} onChange={handleCategoriaChange}>
                        <option value="" disabled selected>Selecciona una categoria</option>
                        {categoria.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.nombre}</option>
                        ))}
                      </select>
                      <label for="input-field" className="input-label">Categoria:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <select placeholder="Categoria" className="input-field" required value={sexo} onChange={handleSexoChange}>
                        <option value="" disabled selected>Selecciona genero</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                      <label for="input-field" className="input-label">Genero:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      {/* <input placeholder="Nombre" className="input-field" id="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} /> */}
                      <input placeholder="Nombre" className="input-field" id="nombre" type="text" required value={nombre} onChange={handleNombreChange}
                      />
                      <label for="input-field" className="input-label">Nombre:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input placeholder="Descripción" className="input-field" type="text" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                      <label for="input-field" className="input-label">Descripción:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      {/* <input placeholder="Precio" className="input-field" type="number" required value={precio} onChange={(e) => setPrecio(e.target.value)} /> */}
                      <input placeholder="Precio" className="input-field" type="text" required value={precio} onChange={handlePrecioChange} />
                      <label for="input-field" className="input-label">Precio:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      {/* <input placeholder="Descuento" className="input-field" type="number" required value={descuento} onChange={(e) => setDescuento(e.target.value)} /> */}
                      <input
                        placeholder="Descuento"
                        className="input-field"
                        type="text"
                        required
                        value={descuento}
                        onChange={handleDescuentoChange}
                      />
                      <label for="input-field" className="input-label">Descuento:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      {/* <input placeholder="Inventario" className="input-field" type="number" required value={inventario} onChange={(e) => setInventario(e.target.value)} /> */}
                      <input
                        placeholder="Inventario"
                        className="input-field"
                        type="text"
                        required
                        value={inventario}
                        onChange={handleInventarioChange}
                      />
                      <label for="input-field" className="input-label">Inventario:</label>
                      <span className="input-highlight"></span>
                    </div>

                    <div className="input-container">
                      <label htmlFor="input-field" className="">
                        Seleccione las tallas o talla:
                      </label>
                      <div className="d-flex">
                        {tallasDisponibles.map(size => (
                          <label key={size} style={{ display: 'inline-block', marginRight: '10px' }}>
                            <input type="checkbox" value={size} checked={tallasSeleccionadas.includes(size)} onChange={tallasSeleccionadasFuncion} />
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="input-container">
                      <input type="file" multiple onChange={uploadImage} accept="image/*" />
                      <span className="input-highlight"></span>
                      <label for="input-field" className="input-label">Imagen:</label>
                      <p>Imágenes seleccionadas:</p>
                      <div className="d-flex">
                        {imagenes.length > 0 && (
                          imagenes.map((imagen, index) => (
                            <div key={index} className="position-relative">
                              <img key={index} src={imagen.url} alt={`Imagen ${index}`} style={{ maxWidth: '80px', marginRight: '10px' }} />
                              <button className="btn btn-danger" onClick={() => eliminarImagen(imagen.publicId)} title="Eliminar esta imagen">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' id='btncerrar'>Cerrar</button>
              <button type='button' className='btn btn-primary' onClick={validar}>{tituloModal}</button>
            </div>
          </div>
        </div>
      </div>
      <div id='modalProductoEstado' class="modal fade" data-bs-backdrop="static">
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead fw-bold">Cambiar Estado del producto</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-container">
                      <select className="input-field" required
                        value={estado} onChange={(e) => setEstado(e.target.value)} >
                        <option value="" disabled selected>Selecciona un estado</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                      <label for="input-field" className="input-label">Estado:</label>
                      <span className="input-highlight"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' id='btncerrarP'>Cerrar</button>
              <button type='button' className='btn btn-primary' onClick={() => EstadoProducto(selectedProduct)}>Cambiar Estado</button>
            </div>
          </div>
        </div>
      </div>
      <div id='modalAccesorios' class="modal fade" data-bs-backdrop="static">
        <div className='modal-dialog modal-fullscreen-sm-down'>
          <div className='modal-content'>
            <div className="modal-header">
              <h1 className="lead fw-bold">{tituloModal}&nbsp;Accesorios</h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-container">
                      {/* <input placeholder="Nombre" className="input-field" id="nombree" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} /> */}
                      <input
                        placeholder="Nombre"
                        className="input-field"
                        id="nombre"
                        type="text"
                        required
                        value={nombre}
                        onChange={handleNombreChange}
                      />
                      <label for="input-field" className="input-label">Nombre:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input placeholder="Descripción" className="input-field" type="text" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                      <label for="input-field" className="input-label">Descripción:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      {/* <input placeholder="Precio" className="input-field" type="number" required value={precio} onChange={(e) => setPrecio(e.target.value)} /> */}
                      <input
                        placeholder="Precio"
                        className="input-field"
                        type="text"
                        required
                        value={precio}
                        onChange={handlePrecioChange}
                      />
                      <label for="input-field" className="input-label">Precio:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      {/* <input placeholder="Es opcional el descuento" className="input-field" type="number" required value={descuento} onChange={(e) => setDescuento(e.target.value)} /> */}
                      <input
                        placeholder="Descuento"
                        className="input-field"
                        type="text"
                        required
                        value={descuento}
                        onChange={handleDescuentoChange}
                      />
                      <label for="input-field" className="input-label">Descuento:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      {/* <input placeholder="Inventario" className="input-field" type="number" required value={inventario} onChange={(e) => setInventario(e.target.value)} /> */}
                      <input
                        placeholder="Inventario"
                        className="input-field"
                        type="text"
                        required
                        value={inventario}
                        onChange={handleInventarioChange}
                      />
                      <label for="input-field" className="input-label">Inventario:</label>
                      <span className="input-highlight"></span>
                    </div>
                    <div className="input-container">
                      <input type="file" multiple onChange={uploadImage} accept="image/*" />
                      <span className="input-highlight"></span>
                      <label for="input-field" className="input-label">Imagen:</label>
                      <p>Imágenes seleccionadas:</p>
                      <div className="d-flex">
                        {imagenes.length > 0 && (
                          imagenes.map((imagen, index) => (
                            <div key={index} className="position-relative">
                              <img key={index} src={imagen.url} alt={`Imagen ${index}`} style={{ maxWidth: '80px', marginRight: '10px' }} />
                              <button className="btn btn-danger" onClick={() => eliminarImagen(imagen.publicId)} title="Eliminar esta imagen">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' id='btncerrarA'>Cerrar</button>
              <button type='button' className='btn btn-primary' onClick={validarAccesorio}>{tituloModal}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductosE;
