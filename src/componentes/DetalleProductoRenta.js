import React, { useState, useEffect, useContext } from "react";
import "../css/ProductosE.css";
import { Productos_Renta, Rentas, PagosRentas } from "../url/urlSitioWeb";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from '../autenticar/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../css/spinner.css'

const DetalleProductoRenta = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [count, setCount] = useState(1);
  const { idRentas } = useParams();
  const [producto, setProducto] = useState(null);
  const [selectedTalla, setSelectedTalla] = useState('');
  const [isRenting, setIsRenting] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaRecogida, setHoraRecogida] = useState('');
  const [precioTotal, setPrecioTotal] = useState(0);
  const { isAuthenticated, user } = useContext(AuthContext);
  const history = useNavigate();
  const [errors, setErrors] = useState({
    fechaInicio: '',
    fechaFin: '',
    horaRecogida: ''
  });

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

  const validateDatesAndTime = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    let isValid = true;
    let newErrors = { fechaInicio: '', fechaFin: '', horaRecogida: '' };

    if (fechaInicio < currentDate) {
      newErrors.fechaInicio = 'La fecha de inicio no puede ser una fecha pasada.';
      isValid = false;
    }

    if (fechaFin <= fechaInicio) {
      newErrors.fechaFin = 'La fecha de fin debe ser posterior a la fecha de inicio.';
      isValid = false;
    }

    const [hora, minutos] = horaRecogida.split(':');
    if (hora < 8 || hora > 17 || (hora == 17 && minutos > 0)) {
      newErrors.horaRecogida = 'La hora de recogida debe estar entre las 8:00 AM y las 5:00 PM.';
      // newErrors.horaRecogida = `La hora de recogida (${hora}) isai debe estar entre las 8:00 AM y las 5:00 PM.`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFechaInicioChange = (e) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const value = e.target.value;
    if (value < currentDate) {
      setErrors(prevErrors => ({
        ...prevErrors,
        fechaInicio: 'La fecha de inicio no puede ser una fecha pasada.'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        fechaInicio: ''
      }));
      setFechaInicio(value);
      calcularPrecioTotal(value, fechaFin);
    }
  };

  const handleFechaFinChange = (e) => {
    const value = e.target.value;
    if (value <= fechaInicio) {
      setErrors(prevErrors => ({
        ...prevErrors,
        fechaFin: 'La fecha de fin debe ser posterior a la fecha de inicio.'
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        fechaFin: ''
      }));
      setFechaFin(value);
      calcularPrecioTotal(fechaInicio, value);
    }
  };

  const handleHoraRecogidaChange = (e) => {
    const value = e.target.value;
    const [hora, minutos] = value.split(':');
    if (hora < 8 || hora > 17 || (hora == 17 && minutos > 0)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        horaRecogida: `La hora de recogida debe estar entre las 8:00 AM y las 5:00 PM.`
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        horaRecogida: ''
      }));
      setHoraRecogida(value);
      // console.log(value)
    }
  };

  const calcularPrecioTotal = (inicio, fin) => {
    if (inicio && fin) {
      const fechaInicio = new Date(inicio);
      const fechaFin = new Date(fin);
      const diferenciaDias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);
      setPrecioTotal(diferenciaDias * producto.precio * count);
    }
  };

  const addRenta = async () => {
    if (!selectedTalla) {
      Swal.fire({
        icon: 'error',
        title: 'Selecciona una talla',
        text: 'Por favor selecciona una talla antes de continuar.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    setIsRenting(true);
  };

  const payForProduct = async () => {
    if (!validateDatesAndTime()) {
      return;
    }
    if (isAuthenticated) {
      try {
        // Registrar la renta
        const responseRenta = await fetch(Rentas, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productoRentaId: producto._id,
            usuarioId: user._id, // Reemplazar con el ID del usuario real
            fechaInicio,
            fechaFin,
            horarioRecogida: horaRecogida,
            Cantidad: count,
            tallaSeleccionada: selectedTalla
          })
        });
        const rentaData = await responseRenta.json();
        // console.log(rentaData.message) 
        if (!responseRenta.ok) {
          throw new Error(rentaData.message || 'Error al registrar la renta');
        }

        // Realizar el pago
        // const responsePago = await fetch(PagosRentas, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     rentaId: rentaData._id,
        //     monto: precioTotal,
        //     metodo: 'tarjeta' // Reemplazar con el método de pago seleccionado por el usuario
        //   })
        // });
        // const pagoData = await responsePago.json();

        // if (!responsePago.ok) {
        //   throw new Error(pagoData.message || 'Error al realizar el pago');
        // }

        Swal.fire({
          icon: 'success',
          title: 'Pago realizado',
          text: 'El producto ha sido rentado exitosamente.',
          showConfirmButton: false,
          timer: 1500
        });
        history('/reservarA')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la renta',
          text: error.message,
          showConfirmButton: false,
          timer: 60000
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión o registrate para poder rentar este producto.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const handleTallaClick = (talla) => {
    setSelectedTalla(talla);
  };

  return (
    <div>
      {producto ? (
        <div className="product-container mb-5 mt-4">
          <div className="images-description-wrapper">
            <div className="col-md-5 thumbnails-container">
              {producto.imagenes.map((imagen, idx) => (
                <img
                  key={idx}
                  src={imagen.url}
                  alt="Producto"
                  onClick={() => handleThumbnailClick(imagen.url)}
                />
              ))}
            </div>
            <div className="col-md-6 image-container border">
              <img src={selectedImage} alt="Imagen principal" />
            </div>
          </div>

          <div className="col-md-4 me-5 description-container">
            <div className="me-3">
              {isRenting ? (
                <div>
                  <h3 className="display-4">Rentar {producto.nombre}</h3>
                  <div className="mb-3">
                    <label className="form-label">Fecha de Inicio:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fechaInicio}
                      onChange={handleFechaInicioChange}
                    />
                    {errors.fechaInicio && (
                      <div className="text-danger">{errors.fechaInicio}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fecha de Fin:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={fechaFin}
                      onChange={handleFechaFinChange}
                    />
                    {errors.fechaFin && (
                      <div className="text-danger">{errors.fechaFin}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Hora de Recogida:</label>
                    <input
                      type="time"
                      className="form-control"
                      value={horaRecogida}
                      onChange={handleHoraRecogidaChange}
                    />
                    {errors.horaRecogida && (
                      <div className="text-danger">{errors.horaRecogida}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio Total: ${precioTotal}</label>
                  </div>
                  <button className="comprar" onClick={payForProduct}>Pagar</button>
                </div>
              )
                :
                (
                  <div>
                    <h3 className="display-4">{producto.nombre}</h3>
                    <p className="lead">
                      {producto.descripcion}
                    </p>
                    <h4 className="precio mb-3">${producto.precio}
                      <spam className="lead">
                        ,  por dia.
                      </spam>
                    </h4>
                    <p className={`lead ${producto.stock === 0 ? 'text-danger' : ''}`}>
                      Inventario: {producto.stock === 0 ? 'Agotado' : producto.stock}
                    </p>
                    <div className="mb-3">
                      <h5>Selecciona una talla:</h5>
                      <div>
                        {['Ch', 'M', 'G'].map(talla => (
                          producto.talla.includes(talla) && (
                            <button
                              key={talla}
                              type="button"
                              className={`btn ${selectedTalla === talla ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                              onClick={() => handleTallaClick(talla)}
                            >
                              {talla}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <button
                        type="button"
                        className="btn btn-danger me-1"
                        onClick={() => handleCountChange("decrement")}
                      >
                        -
                      </button>
                      <input
                        id="quantity"
                        className="form-control text-center flex-grow-1"
                        value={count}
                        min="1"
                        type="number"
                        name="quantity"
                      />
                      <button
                        type="button"
                        className="btn btn-success x ms-1"
                        onClick={() => handleCountChange("increment")}
                      >
                        +
                      </button>
                    </div>
                    <button className="agregar_carrito" onClick={addRenta}>Rentar producto</button>
                  </div>
                )}
            </div>
          </div>

        </div>
      ) : (
        <div className='mt-5 mb-5'>
          <p className='name-spinner mt-5'>Cargando...</p>
          <div className="spinner mb-5"></div>
        </div>
      )}
    </div>
  );
};

export default DetalleProductoRenta;
