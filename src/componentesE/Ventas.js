import React, { useEffect, useState } from 'react';
import { getPagosRenta } from '../url/UrlVistasAdmin';

const PagosRenta = () => {
  const [pagos, setPagos] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterProduct, setFilterProduct] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const data = await getPagosRenta();
        setPagos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPagos();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleProductFilterChange = (event) => {
    setFilterProduct(event.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredPagos = pagos
    .filter(pago => 
      pago.correoUsuario.toLowerCase().includes(search.toLowerCase()) &&
      (filterProduct === '' || pago.nombreProducto === filterProduct)
    )
    .sort((a, b) => {
      const dateA = new Date(a.fechaPago);
      const dateB = new Date(b.fechaPago);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center display-6">Pagos de Renta</h3>

      <div className="d-flex mx-auto">
        <div className="mb-3">
        <input 
          type="text"
          className="form-control"
          placeholder="Buscar usuario"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-3 ms-auto">
        <select 
          className="form-control"
          value={filterProduct}
          onChange={handleProductFilterChange}
        >
          <option value="">Filtrar por producto</option>
          {Array.from(new Set(pagos.map(pago => pago.nombreProducto)))
            .map(product => (
              <option key={product} value={product}>{product}</option>
          ))}
        </select>
      </div>

      <div className="mb-3 ms-auto">
        <button 
          className="btn btn-primary"
          onClick={handleSortChange}
        >
          Ordenar por fecha {sortOrder === 'asc' ? '↓' : '↑'}
        </button>
      </div>
      </div>      

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Correo Usuario</th>
              <th>Cantidad</th>
              <th>Nombre Producto</th>
              <th>Estado del Pago</th>
              <th>Monto</th>
              <th>Fecha del Pago</th>
            </tr>
          </thead>
          <tbody>
            {filteredPagos.map((pago) => (
              <tr key={pago.id}>
                <td>{pago.correoUsuario}</td>
                <td>{pago.cantidad}</td>
                <td>{pago.nombreProducto}</td>
                <td>{pago.estadoPago}</td>
                <td>{pago.monto}</td>
                <td>{new Date(pago.fechaPago).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagosRenta;





// import React, { useState, useEffect } from 'react';
// import { ComprasUsuariosUrl } from '../url/urlSitioWeb';

// const Ventas = () => {
//   const [ventas, setVentas] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${ComprasUsuariosUrl}/ventas`);
//         if (!response.ok) {
//           throw new Error('Error al obtener los datos');
//         }
//         const data = await response.json();
//         setVentas(data);
//         console.log(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h3 className='text-center display-6'>Ventas registradas</h3>
//       <table className='table'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Usuario</th>
//             <th>Correo</th>
//             <th>Productos</th>
//             <th>Total</th>
//             <th>Fecha de compra</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ventas.map((venta, indexVenta) => (
//             <tr key={indexVenta}>
//               <td>{indexVenta++}</td>
//               <td>{venta.usuario.nombre}</td>
//               <td>{venta.usuario.correo}</td>
//               <td>
//                 <div className="">
//                   {venta.productos && venta.productos.map((producto, indexProducto) => (
//                     <div key={indexProducto} className="d-flex align-items-center me-3">
//                       {producto.producto.imagenes && producto.producto.imagenes.length > 0 && (
//                         <img src={producto.producto.imagenes[0].url} alt={producto.producto.nombre} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                       )}                                            
//                         <div>Cantidad: {producto.cantidad}</div>&nbsp;
//                         <div>{producto.producto.nombre},</div>&nbsp;
//                         <div>Precio unitario: ${producto.precioUnitario}</div>
                      
//                     </div>
//                   ))}
//                 </div>
//               </td>
//               <td>${venta.total}</td>
//               <td>{new Date(venta.fechaCompra).toLocaleDateString()}</td>
//             </tr>
//           ))}

//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Ventas;
