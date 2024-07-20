import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Modal, Table, InputGroup, FormControl } from 'react-bootstrap';
import { Productos_Renta, img } from "../url/urlSitioWeb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const ProductosRenta = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [imagenes, setImagenes] = useState([]);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);
  const [stock, setStock] = useState('');
  const [deposito, setDeposito] = useState('');
  const [editingProducto, setEditingProducto] = useState(null);

  useEffect(() => {
    fetch(Productos_Renta)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.creadoEn) - new Date(a.creadoEn));
        setProductos(sortedData);
      })
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    clearForm();
  };

  const clearForm = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setDisponible(true);
    setImagenes([]);
    setTallasSeleccionadas([]);
    setStock('');
    setDeposito('');
    setEditingProducto(null);
  };

  const handleTallaChange = (e) => {
    const { value, checked } = e.target;
    setTallasSeleccionadas(prevTallas =>
      checked ? [...prevTallas, value] : prevTallas.filter(talla => talla !== value)
    );
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('imagen', file);
      }

      const response = await fetch(img, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setImagenes(prevImagenes => {
        const updatedImages = [...prevImagenes, { url: data.url, publicId: data.publicId }];
        console.log('Updated Images:', updatedImages);
        return updatedImages;
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const eliminarImagen = async (publicId) => {
    try {
      const response = await fetch(`${img}/${publicId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setImagenes(prevImagenes => prevImagenes.filter(image => image.publicId !== publicId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre,
      descripcion,
      precio,
      disponible,
      imagenes,
      talla: tallasSeleccionadas,
      stock,
      deposito
    };

    if (editingProducto) {
      // Actualizar producto existente
      fetch(`${Productos_Renta}/${editingProducto._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      })
        .then(response => response.json())
        .then(data => {
          const updatedProductos = productos.map(prod =>
            prod._id === data._id ? data : prod
          );
          setProductos(updatedProductos);
          handleCloseModal();
          Swal.fire('Actualizado', 'Producto actualizado correctamente', 'success');
        })
        .catch(error => console.error('Error updating producto:', error));
    } else {
      // Crear nuevo producto
      fetch(Productos_Renta, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      })
        .then(response => response.json())
        .then(data => {
          setProductos([data, ...productos]);
          handleCloseModal();
          Swal.fire('Agregado', 'Producto agregado correctamente', 'success');
        })
        .catch(error => console.error('Error adding producto:', error));
    }
  };

  const handleEdit = (producto) => {
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setDisponible(producto.disponible);
    setImagenes(producto.imagenes);
    setTallasSeleccionadas(Array.isArray(producto.talla) ? producto.talla : [producto.talla]);
    setStock(producto.stock);
    setDeposito(producto.deposito);
    setEditingProducto(producto);
    handleShowModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${Productos_Renta}/${id}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(() => {
            const updatedProductos = productos.filter(prod => prod._id !== id);
            setProductos(updatedProductos);
            Swal.fire('Eliminado', 'Producto eliminado correctamente', 'success');
          })
          .catch(error => console.error('Error deleting producto:', error));
      }
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredProductos = productos.filter(producto =>
    (producto.nombre || '').toLowerCase().includes(search.toLowerCase()) ||
    (producto.descripcion || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>      
      <h3 className='text-center display-6'>Servicio de Renta</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="lead">Total de productos: {productos.length}</p>
        <Button variant="primary" onClick={handleShowModal}>
          Agregar Producto
        </Button>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar productos"
          aria-label="Buscar productos"
          aria-describedby="basic-addon2"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
      <div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Depósito</th>
              <th>Disponibilidad</th>
              <th>Tallas</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map(producto => (
              <tr key={producto._id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>${producto.deposito}</td>
                <td>{producto.disponible ? 'Sí' : 'No'}</td>
                <td>
                  {Array.isArray(producto.talla) ? (
                    ['Ch', 'M', 'G', 'XL'].filter(size => producto.talla.includes(size)).map(size => (
                      <span key={size}>{size}{', '}</span>
                    ))
                  ) : (
                    producto.talla
                  )}
                </td>
                <td>{producto.stock}</td>
                <td>
                  {producto.imagenes.length > 0 && (
                    <img src={producto.imagenes[0].url} alt={producto.nombre} className="img-thumbnail" style={{ maxWidth: '100px' }} />
                  )}
                </td>
                <td>
                  <Button variant="warning" title='Editar' onClick={() => handleEdit(producto)} className="me-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger" title='Eliminar' onClick={() => handleDelete(producto._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProducto ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="descripcion" className="mt-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="precio" className="mt-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="deposito" className="mt-2">
              <Form.Label>Depósito</Form.Label>
              <Form.Control
                type="number"
                value={deposito}
                onChange={(e) => setDeposito(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="disponible" className="mt-2">
              <Form.Check
                type="checkbox"
                label="Disponible"
                checked={disponible}
                onChange={(e) => setDisponible(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="tallas" className="mt-2">
              <Form.Label>Tallas</Form.Label>
              <div>
                {['Ch', 'M', 'G'].map(size => (
                  <Form.Check
                    key={size}
                    inline
                    label={size}
                    type="checkbox"
                    value={size}
                    checked={tallasSeleccionadas.includes(size)}
                    onChange={handleTallaChange}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="stock" className="mt-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="imagenes" className="mt-2">
              <Form.Label>Imágenes</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={uploadImage}
                accept="image/*"
              />
              <div className="mt-2">
                {imagenes.map((imagen, index) => (
                  <div key={index} className="position-relative d-inline-block">
                    <img
                      src={imagen.url}
                      alt={`Imagen ${index}`}
                      className="img-thumbnail"
                      style={{ maxWidth: '100px', marginRight: '10px' }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarImagen(imagen.publicId)}
                      style={{ position: 'absolute', top: '5px', right: '10px' }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                ))}
              </div>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                {editingProducto ? 'Actualizar Producto' : 'Agregar Producto'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductosRenta;
