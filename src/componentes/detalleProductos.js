import React, { useState, useEffect, useContext } from "react";
import { Productos } from "../url/urlSitioWeb";
import { useParams } from "react-router-dom";
import { AuthContext } from '../autenticar/AuthProvider';
import { CarritoCompras } from '../url/urlSitioWeb';
import Breadcrumb from "../utilidad/migapan";
import Swal from "sweetalert2";
import '../css/spinner.css';
import "../css/ProductosE.css";

const DetalleProducto = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const [count, setCount] = useState(1);
    const { idProductos } = useParams();
    const [producto, setProducto] = useState(null);
    const { isAuthenticated, user } = useContext(AuthContext);
    const [selectedTalla, setSelectedTalla] = useState(''); // Estado para la talla seleccionada
    const [tallasDisponibles, setTallasDisponibles] = useState([]); // Estado para las tallas disponibles

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
            // Configura las tallas disponibles según la categoría del producto
            if (data.categoria) {
                if (data.categoria.nombre === 'Pantalones') {
                    setTallasDisponibles(['28', '30', '32', '34', '36', '38']);
                } else if (data.categoria.nombre === 'Chalecos') {
                    setTallasDisponibles(['Ch', 'M', 'G', 'XL']);
                } else if (data.categoria.nombre !== 'Accesorios') {
                    setTallasDisponibles(['Ch', 'M', 'G', 'XL']);
                } else {
                    setTallasDisponibles([]);
                }
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

    const handleTallaClick = (talla) => {
        setSelectedTalla(talla);
    };

    const addToCart = async () => {
        if (isAuthenticated) {
            try {
                if (!selectedTalla && tallasDisponibles.length > 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Seleccione una talla',
                        text: 'Por favor, seleccione una talla antes de agregar al carrito.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    return;
                }

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
                        cantidad: count,
                        talla: selectedTalla // Añadir la talla seleccionada al carrito
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
            <div className="flex container mx-auto justify-center">
                <Breadcrumb path='Detalles'/>
            </div>
            {producto ? (
                <div className="product-container mb-5 mt-4">
                    <div className="images-description-wrapper">
                        <div className="thumbnails-container">
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

                    <div className="col-md-4 me-5 description-container">
                        <h3 className="display-4">{producto.nombre}</h3>
                        <p className="lead">{producto.descripcion}</p>
                        <p className="lead"><i class="fa fa-thin fa-user"></i> {producto.sexo}</p> 
                        {/* <p className=""> <i class="fa fa-thin fa-user"></i> {accesorio.sexo}</p> */}
                        <h4 className="precio mb-3">${producto.precio}</h4>
                        <p className={`lead ${producto.inventario === 0 ? 'text-danger' : ''}`}>
                            Inventario: {producto.inventario === 0 ? 'Agotado' : producto.inventario}
                        </p>
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
                                className="btn btn-success mas ms-1"
                                onClick={() => handleCountChange("increment")}
                            >
                                +
                            </button>
                        </div>
                        {tallasDisponibles.length > 0 && (
                            <div className="mb-3">
                                <h5>Selecciona una talla:</h5>
                                <div>
                                    {tallasDisponibles.map(talla => (
                                        <button
                                            key={talla}
                                            type="button"
                                            className={`btn ${selectedTalla === talla ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                                            onClick={() => handleTallaClick(talla)}
                                            disabled={!producto.talla.includes(talla)} // Deshabilitar botón si la talla no está disponible
                                        >
                                            {talla}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <button className="agregar_carrito" onClick={addToCart}>Agregar al carrito</button>
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

export default DetalleProducto;
