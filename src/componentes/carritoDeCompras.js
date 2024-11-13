import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../autenticar/AuthProvider';
import { CarritoCompras, Stripe /* Productos */ } from '../url/urlSitioWeb';
import Swal from "sweetalert2";
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTrash, faMoneyBill1Wave, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import "../css/colores.css";
import '../css/carritoCompras.css';
import { BtnRosaIcono } from '../utilidad/botones';


const CarritoCompra = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const history = useNavigate();
    const [productosCarrito, setProductosCarrito] = useState([]);
    // const [dataProductos, setDataProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showPagar, setShowPagar] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // const datosProducto = useCallback(async () => {
    //     try {
    //         const response = await fetch(Productos);
    //         if (!response.ok) {
    //             throw new Error('La respuesta de la red no fue exitosa.');
    //         }
    //         const jsonDataUsuario = await response.json();
    //         setDataProductos(jsonDataUsuario);
    //     } catch (error) {
    //         Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
    //     }
    // }, []);

    const handleOpenPaymentOptions = () => {
        setShowPaymentOptions(true);
        setShowPagar(false);
    };

    const handleClosePaymentOptions = () => {
        setShowPaymentOptions(false);
        setShowPagar(true);
    };

    const datosCarrito = useCallback(async () => {
        try {
            const response = await fetch(`${CarritoCompras}/${user._id}`);
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa.');
            }
            const jsonData = await response.json();
            setProductosCarrito(jsonData);
        } catch (error) {
            console.error('Error al obtener los datos del carrito:', error);
        }
    }, [user._id]);

    const removeProduct = async (product) => {
        // Mostrar confirmación antes de eliminar
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto del carrito de compras.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        // Si el usuario confirma la eliminación, procede a eliminar el producto
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${CarritoCompras}/${user._id}/${product.idProducto}`, {
                    method: 'DELETE'
                });
                console.log(user._id);
                console.log(product.idProducto);
                if (!response.ok) {
                    throw new Error('Error al eliminar el producto del carrito');
                }

                // Elimina el producto del estado
                setProductosCarrito(productosCarrito.filter(item => item._id !== product.idProducto));

                // Vuelve a calcular el total después de eliminar
                calculateTotal();

                // Muestra un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    text: 'El producto se ha eliminado del carrito de compras.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                console.error('Error al eliminar el producto del carrito:', error);
            }
        }
    };
    
    const calculateTotal = useCallback(() => {
        let totalPrice = 0;
        productosCarrito.forEach(product => {
            const precioConDescuento = product.descuento > 0
                ? product.precio * (1 - product.descuento / 100)
                : product.precio;
            totalPrice += precioConDescuento * product.cantidad;
        });
        setTotal(totalPrice);
    }, [productosCarrito]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isAuthenticated) {
                    history('/');
                }
                await datosCarrito();
                // await datosProducto();
                if (productosCarrito.length > 0) {
                    calculateTotal();
                    setShowPagar(true);
                } else {
                    setShowPagar(false);
                }
            } catch (error) {
                console.error('Error al obtener los datos del carrito:', error);
            }
        };
        fetchData();
    }, [isAuthenticated, history, datosCarrito, /* datosProducto */ calculateTotal, productosCarrito.length]);

    if (!isAuthenticated) {
        return null; // Retorna null o un componente de carga mientras se redirige
    }


    const manejoDePago = async () => {
        try {            
            const data = {
                tipoEntrega: "delivery",
                dateselect: new Date().toISOString().split('T')[0],
                productos: productosCarrito,
                datoscliente: {
                    name: user.nombre,
                    paternalLastname: user.apellido,
                    email: user.correo,
                    idUser: user._id
                },
                instruction: "El producto se recoje en la tienda",
                total: total
            };

            // Enviar la solicitud POST al servidor
            const response = await fetch(`${Stripe}/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error al procesar el pago');
            }

            // Obtener la URL de la sesión de pago desde la respuesta
            const responseData = await response.json();
            const sessionUrl = responseData.sessionUrl;

            // Redireccionar a la página de pago con la URL de la sesión de pago
            window.location.href = sessionUrl;
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            // Manejar errores
        }
    };

    const handleIncreaseQuantity = async (product) => {
        const updatedProducts = [...productosCarrito];
        const index = updatedProducts.indexOf(product);
        updatedProducts[index].cantidad += 1;
        setProductosCarrito(updatedProducts);
        await updateQuantity(updatedProducts[index], updatedProducts[index].cantidad);
    };

    const handleDecreaseQuantity = async (product) => {
        const updatedProducts = [...productosCarrito];
        const index = updatedProducts.indexOf(product);
        if (updatedProducts[index].cantidad > 1) {
            updatedProducts[index].cantidad -= 1;
            setProductosCarrito(updatedProducts);
            await updateQuantity(updatedProducts[index], updatedProducts[index].cantidad);
        }
    };

    const updateQuantity = async (product, cantidadP) => {
        try {
            const response = await fetch(`${CarritoCompras}/${user._id}/${product.idProducto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad: cantidadP }),
            });
            const responseData = await response.json(); // Convertir la respuesta a JSON
            console.log('Respuesta del servidor:', responseData); // Mostrar la respuesta en la consola
            if (responseData.mensajeExceso) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cantidad no disponible',
                    showConfirmButton: false,
                    timer: 2000
                });
            }

            if (!response.ok) {
                throw new Error('Error al actualizar la cantidad del producto en el carrito');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito:', error);
        }
    };

    // Función para mostrar el modal de detalles del producto
    const handleShowModal = (product) => {
        setProductoSeleccionado(product); // Guardamos el producto seleccionado
        setShowModal(true); // Mostramos el modal
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false); // Cerramos el modal
    };


    const renderProducts = () => {
        return productosCarrito.map(product => (
            <div
                className="d-flex justify-content-between align-items-center mb-2"
                style={{ border: '0.5px solid #cac6c6', padding: '10px' }}
                key={product.id} // Asegúrate de que cada producto tenga un identificador único
            >
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ cursor: 'pointer', color: 'black' }}
                    onClick={() => handleShowModal(product)}                    
                />
                {product.imagenes.length > 0 && (
                    <img
                        alt="Shirt"
                        className="aspect-square rounded-lg object-cover"
                        height="50"
                        src={product.imagenes[0].url}
                        width="50"
                    />
                )}
                <div className="grid gap-1">
                    <p className="font-semibold text-lg mt-3">{product.cantidad} {product.nombre}</p>
                </div>
                <div className="d-flex align-items-center ms-auto">
                    <div className="btn-group me-2">
                        <button className="btn btn-secondary font-semibold" onClick={() => handleDecreaseQuantity(product)}>-</button>
                        <span className="btn font-semibold">{product.cantidad}</span>
                        <button className="btn btn-secondary font-semibold" onClick={() => handleIncreaseQuantity(product)}>+</button>
                    </div>
                    <div className="font-semibold me-4">${product.precio}</div>
                    <div>
                        <FontAwesomeIcon onClick={() => removeProduct(product)} icon={faTrash} style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </div>
        ));
    };


    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-md-8">
                    <h3 className='text-center display-6'>Productos en tu carrito</h3>
                    {renderProducts()}
                </div>
                <div className="col-md-4 mt-5">
                    <div className="card">
                        <div className="card-body d-flex justify-content-between">
                            <h5 className='font-semibold'>Total: ${total}</h5>
                        </div>
                    </div>
                    <div className="d-grid mx-auto">
                        {showPagar && (
                            <BtnRosaIcono onClick={handleOpenPaymentOptions} nombre='Pagar' icon={faMoneyBill1Wave} />
                        )}
                        {showPaymentOptions && (
                            <>
                                <button className="btnCerrar font-semibold" onClick={handleClosePaymentOptions}>
                                    Cancelar
                                </button>
                            </>
                        )}
                        {showPaymentOptions && (
                            <>
                                <button className="btnPagar font-semibold" onClick={manejoDePago}>
                                    <FontAwesomeIcon icon={faCreditCard} /> Con tarjeta
                                </button>
                                <button className="btnPagar font-semibold">
                                    <i class="fa fa-paypal" aria-hidden="true"></i> Paypal
                                </button>
                            </>
                        )}
                    </div>
                    <div className="card mt-2 text-center mb-3">
                        <span className="ml-auto font-semibold me-4">La entrega del producto será en la tienda.</span>
                    </div>

                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productoSeleccionado && (
                        <div>
                            <h5>{productoSeleccionado.nombre}</h5>
                            <p>{productoSeleccionado.descripcion}</p>
                            {productoSeleccionado.talla && productoSeleccionado.sexo && (
                                <p>Talla {productoSeleccionado.talla} - Sexo {productoSeleccionado.sexo}</p>
                            )}

                            {/* Verificar si el producto tiene descuento */}
                            {productoSeleccionado.descuento > 0 ? (
                                <div>
                                    <p><strong>Precio Original:</strong> <s>${productoSeleccionado.precio.toFixed(2)}</s></p>
                                    {/* Mostrar el precio con descuento */}
                                    <p><strong>Precio con {productoSeleccionado.descuento}% de Descuento:</strong> ${(
                                        productoSeleccionado.precio * (1 - productoSeleccionado.descuento / 100)
                                    ).toFixed(2)}</p>

                                    {/* Mostrar el total por la cantidad de productos con descuento */}
                                    <p><strong>Total por {productoSeleccionado.cantidad} unidades:</strong> ${(
                                        productoSeleccionado.cantidad * productoSeleccionado.precio * (1 - productoSeleccionado.descuento / 100)
                                    ).toFixed(2)}</p>
                                </div>
                            ) : (
                                // Mostrar solo el precio normal si no hay descuento
                                <div>
                                    <p><strong>Precio:</strong> ${productoSeleccionado.precio.toFixed(2)}</p>

                                    {/* Mostrar el total por la cantidad de productos sin descuento */}
                                    <p><strong>Total por {productoSeleccionado.cantidad} unidades:</strong> ${(
                                        productoSeleccionado.cantidad * productoSeleccionado.precio
                                    ).toFixed(2)}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CarritoCompra;
