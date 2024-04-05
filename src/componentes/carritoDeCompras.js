import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../autenticar/AuthProvider';
import { CarritoCompras } from '../url/urlSitioWeb';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const history = useNavigate();
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [total, setTotal] = useState(0);

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
        if (!isAuthenticated) {
            history('/'); // Utiliza navigate para redirigir
        }
        datosCarrito();
        calculateTotal();
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

    const renderProducts = () => { 
        return productosCarrito.map(product => (
            <div key={product._id} className="d-flex justify-content-between align-items-center mb-3">
                {product.imagenes.length > 0 && (
                <img
                    alt="Shirt"
                    className="aspect-square rounded-lg object-cover"
                    height="80"
                    src={product.imagenes[0].url}
                    width="80"
                />
                )}
                <div className="grid gap-1">
                    <h2 className="font-semibold text-lg">{product.cantidad} {product.nombre}</h2>
                </div>
                <div className="ml-auto font-semibold me-4">${product.precio} {product._id}</div>
                <div>
                    <button className="btn btn-danger me-2" onClick={() => removeProduct(product)}>Eliminar</button>  
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
                        <button className="btnvermas">
                            <span className="ml-auto font-semibold me-4">Pagar</span>
                        </button>
                    </div>
                    <div className="card mt-2 text-center mb-2">
                        <span className="ml-auto font-semibold me-4">La entrega del producto será en la tienda.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
