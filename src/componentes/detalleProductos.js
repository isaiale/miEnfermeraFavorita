import React, { useState, useEffect, useContext } from "react";
import "../css/ProductosE.css";
import { Productos } from "../url/urlSitioWeb";
import { useParams } from "react-router-dom";
import { AuthContext } from '../autenticar/AuthProvider';
import { CarritoCompras } from '../url/urlSitioWeb';
import Swal from "sweetalert2";
// import { useNavigate } from 'react-router-dom';

const DetalleProducto = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const [count, setCount] = useState(1);
    const { idProductos } = useParams();
    const [producto, setProducto] = useState(null);
    const { isAuthenticated, user } = useContext(AuthContext);
    // const history = useNavigate();

    const fetchProducto = async () => {
        try {
            const response = await fetch(`${Productos}/${idProductos}`);
            if (!response.ok) {
                throw new Error("La respuesta de la red no fue exitosa.");
            }
            const data = await response.json();
            setProducto(data);
            if (data.imagenes.length > 0) {
                setSelectedImage(data.imagenes[0].url);
            }
        } catch (error) {
            console.error("Error al cargar los detalles del producto:", error);
        }
    };

    useEffect(() => {
        fetchProducto();
    }, [idProductos]);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleCountChange = (action) => {
        if (action === "increment") {
            if (count < producto.inventario) {
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
        if (isAuthenticated) {
            try {
                // Verificar si la cantidad seleccionada excede el inventario
                if (count > producto.inventario) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Cantidad no disponible',
                        text: 'La cantidad seleccionada excede la disponibilidad en el inventario.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    return; // Detener la ejecución si la cantidad excede el inventario
                }

                const response = await fetch(CarritoCompras, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usuario: user._id,
                        producto: producto._id,
                        cantidad: count
                    }),
                });
                if (!response.ok) {
                    throw new Error('Error al agregar al carrito');
                }
                // Mostrar mensaje de confirmación
                Swal.fire({
                    icon: 'success',
                    title: 'Agregado al carrito',
                    text: 'El producto se ha agregado al carrito de compras.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                console.error('Error al agregar al carrito:', error);
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Inicia sesión o registrate para poder agregar al carrito de compras.',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };


    return (
        <div>
            {producto ? (
                <div className="product-container ">
                    <div className="images-description-wrapper">
                        <div className="thumbnails-container ">
                            {producto.imagenes.map((imagen, idx) => (
                                <img
                                    key={idx}
                                    src={imagen.url}
                                    alt="Producto"
                                    onClick={() => handleThumbnailClick(imagen.url)}
                                />
                            ))}
                        </div>
                        <div className="image-container border">
                            <img src={selectedImage} alt="Imagen principal" />
                        </div>
                    </div>

                    <div className="description-container">
                        <h3 className="display-4">{producto.nombre}</h3>
                        <p className="lead">
                            {producto.descripcion}
                        </p>
                        <h4 className="precio mb-3">${producto.precio}</h4>
                        <p className="lead">
                            Inventario: {producto.inventario}
                        </p>
                        <div className="contenedor-cantidad mb-3">
                            <button
                                type="button"
                                className="menos"
                                onClick={() => handleCountChange("decrement")}
                            >
                                -
                            </button>
                            <input
                                id="quantity"
                                className=""
                                value={count}
                                min="1"
                                type="text"
                                name="quantity"
                            />
                            <button
                                type="button"
                                className="mas"
                                onClick={() => handleCountChange("increment")}
                            >
                                +
                            </button>
                        </div>
                        <div>
                            <button className="agregar_carrito" onClick={addToCart}>Agregar al carrito</button>
                        </div>
                        {/* <div>
                            <button className="comprar">Comprar ahora</button>
                        </div> */}
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default DetalleProducto;