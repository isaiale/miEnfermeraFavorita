import React, { useState, useEffect } from "react";
import "../css/ProductosE.css";
import { Productos_Renta } from "../url/urlSitioWeb";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetalleProductoRenta = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [count, setCount] = useState(1);
  const { idRentas } = useParams();
  const [producto, setProducto] = useState(null);
  const [selectedTalla, setSelectedTalla] = useState('');

  const fetchProducto = async () => {
    try {
      const response = await fetch(`${Productos_Renta}/${idRentas}`);
      if (!response.ok) {
        throw new Error("La respuesta de la red no fue exitosa.");
      }
      const data = await response.json();
      setProducto(data);
      console.log(data)
      if (data.imagenes.length > 0) {
        setSelectedImage(data.imagenes[0].url);
      }
    } catch (error) {
      console.error("Error al cargar los detalles del producto de renta:", error);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [idRentas]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleCountChange = (action) => {
    if (action === "increment") {
      if (count < producto.stock) {
        setCount(count + 1);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Cantidad máxima alcanzada',
          text: 'La cantidad seleccionada ya alcanzó el límite del inventario.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else if (action === "decrement" && count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = async () => {
    if (!selectedTalla) {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona una talla',
        text: 'Por favor selecciona una talla antes de agregar al carrito.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Agregado al carrito',
      text: 'El producto se ha agregado al carrito de compras.',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleTallaChange = (talla) => {
    setSelectedTalla(talla);
  };

  return (
    <div>
      {producto ? (
        <div className="product-container container">
          <div className="row">
            <div className="col-md-4">
              <div className="thumbnails-container mb-3">
                {producto.imagenes.map((imagen, idx) => (
                  <img
                    key={idx}
                    src={imagen.url}
                    alt="Producto"
                    onClick={() => handleThumbnailClick(imagen.url)}
                    className="img-thumbnail mb-2"
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
              <div className="image-container border">
                <img src={selectedImage} alt="Imagen principal" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-8">
              <div className="description-container">
                <h3 className="display-4">{producto.nombre}</h3>
                <p className="lead">
                  {producto.descripcion}
                </p>
                <h4 className="precio mb-3">${producto.precio}</h4>
                <p className={`lead ${producto.stock === 0 ? 'text-danger' : ''}`}>
                  Inventario: {producto.stock === 0 ? 'Agotado' : producto.stock}
                </p>
                <div className="mb-3">
                  <h5>Selecciona una talla:</h5>
                  {producto.talla.map((talla, idx) => (
                    <div key={idx} className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="tallaOptions"
                        id={`talla-${talla}`}
                        value={talla}
                        onChange={() => handleTallaChange(talla)}
                        checked={selectedTalla === talla}
                      />
                      <label className="form-check-label" htmlFor={`talla-${talla}`}>
                        {talla}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="contenedor-cantidad mb-3 d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-danger menos me-2"
                    onClick={() => handleCountChange("decrement")}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    className="form-control text-center"
                    style={{ maxWidth: '60px' }}
                    value={count}
                    min="1"
                    type="number"
                    name="quantity"
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-success mas ms-2"
                    onClick={() => handleCountChange("increment")}
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-pink w-100" onClick={addToCart}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default DetalleProductoRenta;
