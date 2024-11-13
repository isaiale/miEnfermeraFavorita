import React, { useState, useEffect, useContext, useCallback } from "react";
import "../css/ProductosE.css";
import { Productos_Renta, Rentas, Pagar_renta } from "../url/urlSitioWeb";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from '../autenticar/AuthProvider';
// import { useNavigate } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [diferenciaDias, setDiferenciaDias] = useState(0);
  const [deposito, setDeposito] = useState(0);

  // const history = useNavigate();
  const [errors, setErrors] = useState({
    fechaInicio: '',
    fechaFin: '',
    horaRecogida: ''
  });

  const fetchProducto = useCallback(async () => {
    try {
      const response = await fetch(`${Productos_Renta}/${idRentas}`);
      if (!response.ok) {
        throw new Error("La respuesta de la red no fue exitosa.");
      }
      const data = await response.json();
      setProducto(data);
      if (data.imagenes.length > 0) {
        setSelectedImage(data.imagenes[0].url);
      }
    } catch (error) {
      console.error("Error al cargar los detalles del producto de renta:", error);
    }
  },[idRentas]);
  
  useEffect(() => {
    fetchProducto();
  }, );

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
    if (hora < 8 || hora > 17 || (hora === 17 && minutos > 0)) {
      newErrors.horaRecogida = 'La hora de recogida debe estar entre las 8:00 AM y las 5:00 PM.';
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
    if (hora < 8 || hora > 17 || (hora === 17 && minutos > 0)) {
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
    }
  };

  const calcularPrecioTotal = (inicio, fin) => {
    if (inicio && fin) {
      const fechaInicio = new Date(inicio);
      const fechaFin = new Date(fin);
      const dias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);
      setDiferenciaDias(dias);
      const depositoCalculado = count * producto.deposito; 
      setDeposito(depositoCalculado);
      const precioCantidadProducto = producto.precio * count;
      setPrecioTotal((dias * precioCantidadProducto) + depositoCalculado); // Agrega el cargo (depósito)
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
    setCurrentStep(2); // Ir al siguiente paso
  };

  const payForProduct = async () => {
    if (!validateDatesAndTime()) {
      return;
    }
    if (isAuthenticated) {
      setIsLoading(true);
      try {
        const responseRenta = await fetch(Rentas, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productoRentaId: producto._id,
            usuarioId: user._id,
            fechaInicio,
            fechaFin,
            horarioRecogida: horaRecogida,
            Cantidad: count,
            tallaSeleccionada: selectedTalla,
            deposito: deposito
          })
        });
        const rentaData = await responseRenta.json();
        if (!responseRenta.ok) {
          throw new Error(rentaData.message || 'Error al registrar la renta');
        }

        const responsePago = await fetch(Pagar_renta, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usuarioId: user._id,
            rentaId: rentaData.rentaId,
            precioTotal
          })
        });

        const pagoData = await responsePago.json();
        if (!responsePago.ok) {
          throw new Error('Error al realizar el pago');
        }

        const sessionUrl = pagoData.sessionUrl;
        window.location.href = sessionUrl;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la renta',
          text: error.message,
          showConfirmButton: false,
          timer: 60000
        });
      } finally {
        setIsLoading(false);
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

  // Función modificada para incluir validaciones antes de avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep === 1) {
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
    } else if (currentStep === 2) {
      if (!fechaInicio || !fechaFin || !horaRecogida || !validateDatesAndTime()) {
        Swal.fire({
          icon: 'error',
          title: 'Campos incompletos o inválidos',
          text: 'Por favor completa todos los campos correctamente antes de continuar.',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="display-4">{producto.nombre}</h3>
            <p className="lead">{producto.descripcion}</p>
            <h4 className="precio mb-3">${producto.precio}
              <span className="lead">, por día.</span>
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
            <div>
              <button className="btn w-100 " style={{ backgroundColor: '#FF4081', color: 'white', borderRadius: '0px' }} onClick={nextStep}>Siguiente</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="display-4">{producto.nombre}</h3>
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
            <div>
              <button className="btn w-100 mb-1 btn-secondary me-2" style={{ borderRadius: '0px' }} onClick={prevStep}>Anterior</button>
              <button className="btn w-100" style={{ backgroundColor: '#FF4081', color: 'white', borderRadius: '0px' }} onClick={nextStep}>Siguiente</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="display-4">{producto.nombre}</h3>
            <div className="mb-2">
              <label className="form-label lead">Se agregará un cargo de <spam className="text-danger">${producto.deposito}</spam> por producto.</label>
            </div>
            <div className="mb-2">
              <label className="form-label lead">{count} {producto.nombre} de {producto.precio}C/U rentado por {diferenciaDias} dias con desposito de {deposito}</label>
            </div>
            <div className="mb-2">
              <label className="form-label lead">Precio Total: ${precioTotal}</label>
            </div>
            <div className="mb-2">
              <label className="form-label lead">El producto de renta debe recogerse a la hora acordada.</label>
            </div>
            <div className="mb-2">
              <label className="form-label lead">Dirección de recogida: [Dirección de tu tienda]</label>
            </div>
            <div>
              <button className="btn mb-1 w-100 btn-secondary me-2" style={{ borderRadius: '0px' }} onClick={prevStep}>Anterior</button>
              <button className="btn w-100" style={{ backgroundColor: '#FF4081', color: 'white', borderRadius: '0px' }} onClick={payForProduct} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Pagar'}
              </button>
            </div>

          </div>
        );
      default:
        return null;
    }
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
              {isRenting ? renderStepContent() : (
                <div>
                  <h3 className="display-4">{producto.nombre}</h3>
                  <p className="lead">{producto.descripcion}</p>
                  <h4 className="precio mb-3">${producto.precio}
                    <span className="lead">, por día.</span>
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
                  <div>
                    <button className="btn w-100" style={{ backgroundColor: '#FF4081', color: 'white', borderRadius: '0px' }} onClick={addRenta}>Rentar producto</button>
                  </div>
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
