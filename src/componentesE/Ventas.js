import React, { useState, useEffect } from 'react';
import { ComprasUsuariosUrl } from '../url/urlSitioWeb';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ComprasUsuariosUrl);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className='text-center display-6'>Ventas registradas</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Fecha de compra</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, indexVenta) => (
            <tr key={indexVenta}>
              <td>{indexVenta++}</td>
              <td>{venta.usuario.nombre}</td>
              <td>{venta.usuario.correo}</td>
              <td>
                <div className="">
                  {venta.productos && venta.productos.map((producto, indexProducto) => (
                    <div key={indexProducto} className="d-flex align-items-center me-3">
                      {producto.producto.imagenes && producto.producto.imagenes.length > 0 && (
                        <img src={producto.producto.imagenes[0].url} alt={producto.producto.nombre} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                      )}                                            
                        <div>Cantidad: {producto.cantidad}</div>&nbsp;
                        <div>{producto.producto.nombre},</div>&nbsp;
                        <div>Precio unitario: ${producto.precioUnitario}</div>
                      
                    </div>
                  ))}
                </div>
              </td>
              <td>${venta.total}</td>
              <td>{new Date(venta.fechaCompra).toLocaleDateString()}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
