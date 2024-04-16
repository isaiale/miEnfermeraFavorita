import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../autenticar/AuthProvider';
import { CarritoCompras, Stripe, Productos } from '../url/urlSitioWeb';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import "../css/colores.css";
import '../css/carritoCompras.css'


const CarritoCompra = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const history = useNavigate();
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [dataProductos, setDataProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [showPagar, setShowPagar] = useState(true);

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

    const handleOpenPaymentOptions = () => {
        setShowPaymentOptions(true);
        setShowPagar(false);
    };

    const handleClosePaymentOptions = () => {
        setShowPaymentOptions(false);
        setShowPagar(true);
    };

    const datosCarrito = async () => {
        try {
            const response = await fetch(`${CarritoCompras}/${user._id}`);
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa.')
            }
            const jsonData = await response.json();
            setProductosCarrito(jsonData);
            // console.log(jsonData);
        } catch (error) {
            console.log(error);
        }
    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isAuthenticated) {
                    history('/'); // Utiliza navigate para redirigir
                }
                await datosCarrito();
                datosProducto();
                // Calcula el total solo si hay productos en el carrito
                if (productosCarrito.length > 0) {
                    calculateTotal();
                    setShowPagar(true); // Cambia el estado a true si hay productos en el carrito
                } else {
                    setShowPagar(false); // Cambia el estado a false si el carrito está vacío
                }
            } catch (error) {
                console.error('Error al obtener los datos del carrito:', error);
            }
        };

        fetchData();
    }, [isAuthenticated, history, productosCarrito]);

    if (!isAuthenticated) {
        return null; // Retorna null o un componente de carga mientras se redirige
    }

    const calculateTotal = () => {
        let totalPrice = 0;
        productosCarrito.forEach(product => {
            totalPrice += product.precio * product.cantidad;
        });
        setTotal(totalPrice);
    };

    const manejoDePago = async () => {
        try {
            // Filtrar los productos del carrito para incluir solo aquellos que tienen una cantidad igual o menor a la cantidad disponible en el inventario
            // const productosValidos = productosCarrito.filter(product => product.cantidad <= product.inventario);
    
            // // Verificar si la lista de productos válidos está vacía
            // if (productosValidos.length === 0) {
            //     // Si no hay productos válidos en el carrito, mostrar un mensaje de error
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'No hay productos disponibles',
            //         text: 'No hay productos en tu carrito que estén disponibles en el inventario. Por favor, revisa tu carrito antes de continuar.',
            //         showConfirmButton: true
            //     });
            //     return;
            // }
    
            // Construir el objeto de datos del carrito usando solo los productos válidos
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
                instruction: "El producto se recoje en la tienda"
                // totalneto: total // Agregar el totalneto al objeto de datos
            };
    
            // Enviar la solicitud POST al servidor
            const response = await fetch(Stripe, {
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
            const sessionId = responseData.sessionId;
    
            // Redireccionar a la página de pago con la URL de la sesión de pago
            window.location.href = sessionId;
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

    const renderProducts = () => {
        return productosCarrito.map(product => (
            <div className="d-flex justify-content-between align-items-center mb-2" style={{ border: '0.5px solid #cac6c6', padding: '10px' }}>
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
                    <h2 className="font-semibold text-lg">{product.cantidad} {product.nombre}</h2>
                </div>
                <div className="btn-group ms-5">
                    <button className="btn btn-secondary font-semibold" onClick={() => handleDecreaseQuantity(product)}>-</button>
                    <span className="btn font-semibold">{product.cantidad}</span>
                    <button className="btn btn-secondary font-semibold" onClick={() => handleIncreaseQuantity(product)}>+</button>
                </div>

                <div className="ml-auto font-semibold me-4">${product.precio}</div>
                <div>
                    <FontAwesomeIcon onClick={() => removeProduct(product)} icon={faTrash} />
                </div>
            </div>
        ));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h2>Productos en tu carrito</h2>
                    {renderProducts()}
                </div>
                <div className="col-md-4 mt-5">
                    <div className="card">
                        <div className="card-body d-flex justify-content-between">
                            <h2>Total:</h2><h2>${total}</h2>
                        </div>
                    </div>
                    <div className="d-grid mx-auto">
                        {showPagar && (
                            <button className="btnvermas  font-semibold" onClick={handleOpenPaymentOptions}>
                                Pagar
                            </button>
                        )}
                        {showPaymentOptions && (
                            <>
                                <button className="btnCerrar font-semibold" onClick={handleClosePaymentOptions}>
                                    Cancelar
                                </button>
                                {/* Otros métodos de pago */}
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
                                {/* Otros métodos de pago */}
                            </>
                        )}
                    </div>
                    <div className="card mt-2 text-center mb-3">
                        <span className="ml-auto font-semibold me-4">La entrega del producto será en la tienda.</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CarritoCompra;
