import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../autenticar/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ComprasUsuariosUrl } from '../url/urlSitioWeb';

const ComprasUsuario = () => {
    const [ventas, setVentas] = useState([]);
    const { isAuthenticated, user } = useContext(AuthContext);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isAuthenticated) {
                    history('/'); // Utiliza navigate para redirigir
                }
                const response = await fetch(`${ComprasUsuariosUrl}/${user._id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();

                // Filtrar y revertir las ventas que tienen el estado "completado"
                const ventasCompletadas = data
                    .filter(venta => venta.estado === "completado")
                    .reverse();

                setVentas(ventasCompletadas);
                // console.log(ventasCompletadas);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [isAuthenticated, history]);

    if (!isAuthenticated) {
        return null; // Retorna null o un componente de carga mientras se redirige
    }

    return (
        <div className="container">
            <h3 className='text-center display-6'>Compras registradas</h3>
            {ventas.length === 0 && <p className="text-center mt-5 mb-5">No hay compras registradas.</p>}

            {/* Contenedor con scroll usando Bootstrap */}
            <div /* className="scroll-container" */ style={{maxHeight:'600px', overflowY: 'auto', paddingRight:'15px'}}>
                
                <div className="row">
                    {ventas.map((venta, indexVenta) => (
                        <div key={indexVenta} className="col-lg-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-success"> <span className='text-dark'>pago: </span>{venta.estado}</h5>
                                    {/* <p className="card-text">Usuario: {venta.usuario.nombre}</p> */}
                                    {/* <p className="card-text">Correo: {venta.usuario.correo}</p> */}
                                    <p className="card-text">Total: ${venta.total}</p>
                                    <p className="card-text">Fecha de compra: {new Date(venta.fechaCompra).toLocaleDateString()}</p>
                                    <ul className="list-group list-group-flush">
                                        {venta.productos && venta.productos.map((producto, indexProducto) => (
                                            <li key={indexProducto} className="list-group-item">
                                                <div className="d-flex align-items-center">
                                                    <img src={producto.producto.imagenes[0].url} alt={producto.producto.nombre} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                                    <span>{producto.cantidad} {producto.producto.nombre} -- ${producto.precioUnitario} C/U</span>
                                                </div>
                                                <div>
                                                    {/* <span>Cantidad: {producto.cantidad}</span> */}
                                                    {/* <span>Precio unitario: ${producto.precioUnitario}</span> */}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ComprasUsuario;