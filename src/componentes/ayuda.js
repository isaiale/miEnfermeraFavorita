import React from 'react';

function Ayuda() {
  return (
    <div>      
      <iframe
        src="https://proyectmodel.onrender.com/"
        // title="Predecir diabetes"
        width="100%"
        height="800px"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}

export default Ayuda;

// import React, { useEffect, useRef } from 'react';
// import img from '../img/AdminIsai.jpg';

// const Ayuda = () => {
//   const notificarBtnRef = useRef(null);
//   const verNotificacionBtnRef = useRef(null);

//   useEffect(() => {
//     const notificarBtn = notificarBtnRef.current;
//     const verNotificacionBtn = verNotificacionBtnRef.current;

//     const handleNotificarClick = () => {
//       Notification.requestPermission().then(resultado => {
//         console.log('Respuesta: ', resultado);
//       });
//     };

//     const handleVerNotificacionClick = () => {
//       if (Notification.permission === 'granted') {
//         const notificacion = new Notification('Esta es la notificación', {
//           icon: img,
//           body: 'Tutoriales de js con blackCode'
//         });

//         notificacion.onclick = function () {
//           window.open('http://google.com');
//         };
//       }
//     };

//     if (notificarBtn) {
//       notificarBtn.addEventListener('click', handleNotificarClick);
//     }

//     if (verNotificacionBtn) {
//       verNotificacionBtn.addEventListener('click', handleVerNotificacionClick);
//     }

//     // Cleanup event listeners on component unmount
//     return () => {
//       if (notificarBtn) {
//         notificarBtn.removeEventListener('click', handleNotificarClick);
//       }
//       if (verNotificacionBtn) {
//         verNotificacionBtn.removeEventListener('click', handleVerNotificacionClick);
//       }
//     };
//   }, []);

//   const agregar = () => {
//     alert('boton clickeado');
//   }

//   return (
//     <section className='mt-3 text-center'>
//       <button className='btn btn-success' ref={notificarBtnRef} id="notificar">
//         Notificar...
//       </button>
//       <button className='btn btn-danger' ref={verNotificacionBtnRef} id="vernotificacion">
//         Ver Notificación...
//       </button>      
//     </section>
//   );
// };

// export default Ayuda;

// import React, { useState } from 'react';

// function EmailForm() {
//   const [email, setEmail] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [emailExists, setEmailExists] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Realizar la solicitud a la API para verificar si el correo existe
//       const response = await fetch(`https://disify.com/api/email/${email}`);
//       const data = await response.json();

//       if (data.disposable=== false && data.dns===true) {
//         // Si la propiedad "format" es true, el correo electrónico es válido
//         alert(`Correo electrónico válido.\nDominio: ${data.domain}`);
//         setEmailExists(true);
//       } else {
//         // Si la propiedad "format" es false, el correo electrónico no es válido
//         alert('Correo electrónico inválido.');
//         setEmailExists(false);
//       }

//       setSubmitted(true);
//     } catch (error) {
//       console.error('Error al verificar el correo electrónico:', error);
//     }
//   };

//   return (
//     <div className='m-auto'>
//     <div className='col-md-10 text-center'>
//       <h2>Formulario de Correo prueba</h2>
//       <form onSubmit={handleSubmit}>
//         <label className="mb-2">
//           Correo Electrónico:
//           <input
//           className='text-center'
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Enviar</button>
//       </form>
//       {submitted && emailExists && <p>¡El correo electrónico existe!</p>}
//       {submitted && !emailExists && <p>El correo electrónico no existe.</p>}
//     </div>

//     </div>
//   );
// }

// export default EmailForm;
// import '../css/Slider.css';

// const ProductCard = () => {
//   return (
//     <div className='fadeInColor'>
//       <div style={{ display: 'flex', margin: '0 auto',maxWidth: '1000px' }}>
//         <div style={{margin:'25px', marginRight:'10em', width: '100%'}}>
//           <img
//           src="https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_large.png"
//           alt="AirPods Max"
//           style={{
//             width: '100%',
//             height: '450px',

//           }}
//         />
//         </div>

//         <div style={{margin: 'auto'}}>
//           <h1 style={{ fontSize: '4em', color: '#333', marginBottom: '0.5em', width: '400px' }}>
//             Apple AirPods Max
//           </h1>
//           <p style={{ fontSize: '2em', color: '#666', marginTop: '1px',width: '400px' }}>
//             Wireless Over-Ear Headphones
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import React, { useState, useEffect } from "react";
// import { Card, Container, Row, Col } from "react-bootstrap";
// import imgAccesoriosEnfermeria from "../img/Logo de mi enfermera favorita.jpg";
// import Breadcrumb from "../utilidad/migapan";
// import "../css/colores.css";
// import Swal from "sweetalert2";


// const accesoriosEnfermeria = [
//     {
//         id: 1,
//         nombre: "Accesorio 1",
//         categoria: "Accesorios de Enfermería",
//         precio: "$5.99",
//         imageUrl: imgAccesoriosEnfermeria,
//         tipos: ["Estetoscopio", "Tijeras Médicas", "Reloj de Enfermera"],
//         colores: ["Blanco", "Azul", "Negro"],
//         descuento: "20%",
//     },
//     {
//         id: 2,
//         nombre: "Accesorio 2",
//         categoria: "Accesorios de Enfermería",
//         precio: "$7.99",
//         imageUrl: imgAccesoriosEnfermeria,
//         tipos: ["Gorra de Enfermera", "Linterna Médica"],
//         colores: ["Blanco", "Rosa"],
//         descuento: "no aplica",
//     },
//     {
//         id: 3,
//         nombre: "Accesorio 3",
//         categoria: "Accesorios de Enfermería",
//         precio: "$9.99",
//         imageUrl: imgAccesoriosEnfermeria,
//         tipos: ["Calcetines de Compresión", "Guantes Médicos"],
//         colores: ["Azul", "Morado"],
//         descuento: "15%",
//     },
//     {
//         id: 4,
//         nombre: "Accesorio 4",
//         categoria: "Accesorios de Enfermería",
//         precio: "$12.99",
//         imageUrl: imgAccesoriosEnfermeria,
//         tipos: ["Bolsa de Enfermera"],
//         colores: ["Negro", "Rojo"],
//         descuento: "no aplica",
//     },
// ];

// // function AccesorioEnfermeriaCard({ accesorio }) {
// //   return (
// //     <Col xs={6} lg={3}>
// //       <Card className="mb-4">
// //         {accesorio.descuento !== "no aplica" && (
// //           <div className="position-absolute top-0 start-0">
// //             <span className="badge bg-danger">{accesorio.descuento}</span>
// //           </div>
// //         )}
// //         <Card.Img variant="top" src={accesorio.imageUrl} />
// //         <Card.Body>
// //           <Card.Title>{accesorio.nombre}</Card.Title>
// //           <Card.Text>Categoría: {accesorio.categoria}</Card.Text>
// //           <Card.Text>Tipos: {accesorio.tipos.join(", ")}</Card.Text>
// //           <Card.Text>Colores: {accesorio.colores.join(", ")}</Card.Text>
// //           <Card.Text className="fs-5" style={{ color: "#0171fa" }}>
// //             {accesorio.precio}
// //           </Card.Text>
// //           <button
// //             className="btn color"
// //             style={{ color: "white", background: "#daa232" }}
// //           >
// //             Ver más
// //           </button>
// //         </Card.Body>
// //       </Card>
// //     </Col>
// //   );
// // }

// function Accesorios() {
//     const [data, setData] = useState([]);
//     const [selectedType, setSelectedType] = useState(""); // Estado para el tipo seleccionado
//     const [selectedColor, setSelectedColor] = useState(""); // Estado para el color seleccionado
//     const [priceRange, setPriceRange] = useState([0, 20]); // Rango de precios
//     const minPrice = 0;
//     const maxPrice = 20;

//     const datosProducto = async () => {
//         try {
//             const response = await fetch(Productos);
//             if (!response.ok) {
//                 throw new Error('La respuesta de la red no fue exitosa.')
//             }
//             const jsonData = await response.json();
//             setData(jsonData);
//         } catch (error) {
//             Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
//         }
//     }

//     useEffect(() => {
//         datosProducto();
//     }, [])

//     // Función para aplicar filtros de tipo y color
//     const accesoriosFiltrados = accesoriosEnfermeria.filter((accesorio) => {
//         if (selectedType && !accesorio.tipos.includes(selectedType)) {
//             return false;
//         }
//         if (selectedColor && !accesorio.colores.includes(selectedColor)) {
//             return false;
//         }
//         return true;
//     });

//     const handlePriceRangeChange = (event) => {
//         const value = event.target.value.split(",").map(parseFloat);
//         setPriceRange(value);
//     };

//     return (
//         <Container>
//             <div className="flex container mx-auto justify-center">
//                 <Breadcrumb path={"Ayuda"} />
//             </div>
//             <Row>
//                 <Col lg={3}>
//                     <div className="mb-4">
//                         <h5>Filtrar por Tipo</h5>
//                         <select
//                             className="form-select"
//                         //   onChange={(e) => setSelectedType(e.target.value)}
//                         //   value={selectedType}
//                         >
//                             <option value="">Todos</option>
//                             <option value="Estetoscopio">Estetoscopio</option>
//                             <option value="Tijeras Médicas">Tijeras Médicas</option>
//                             {/* Agrega más tipos según sea necesario */}
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <h5>Filtrar por Color</h5>
//                         <select
//                             className="form-select"
//                         //   onChange={(e) => setSelectedColor(e.target.value)}
//                         //   value={selectedColor}
//                         >
//                             <option value="">Todos</option>
//                             <option value="Blanco">Blanco</option>
//                             <option value="Azul">Azul</option>
//                             {/* Agrega más colores según sea necesario */}
//                         </select>
//                     </div>
//                     <div className="mb-4">
//                         <h5>Filtrar por Precio</h5>
//                         <input
//                             type="range"
//                             min={minPrice}
//                             max={maxPrice}
//                             value={priceRange.join(",")}
//                             className="form-range"
//                         //   onChange={handlePriceRangeChange}
//                         />
//                         <div>
//                             Precios: ${priceRange[0]} - ${priceRange[1]}
//                         </div>
//                     </div>
//                 </Col>
//                 <Col lg={9}>
//                     <Row xs={2} md={4}>
//                         {data.map((accesorios) => (
//                             <div>
//                                 {accesorios.descuento !== 0 && (
//                                 <div className="position-absolute top-0 start-0">
//                                   <span className="badge bg-danger">{accesorios.descuento}</span>
//                                 </div>
//                               )}
//                                 <div className="imgproducto">
//                                 <img src={accesorios.imagenes[0].url} alt=''/>
//                                 </div>
//                                 <div className="descProducto">
//                                     <h4 className="lead">{accesorios.nombre}</h4>
//                                     <p className="lead">$ {accesorios.precio}</p>
//                                     <div className="d-grid mx-auto">
//                                         <button className="btnvermas">Ver más</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Row>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Accesorios;
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Productos } from "../url/urlSitioWeb";
// import img from '../img/enfermera-removebg-preview.png'

// function DetalleProducto() {
//     const { idProductos } = useParams();
//     const [producto, setProducto] = useState(null);

//     useEffect(() => {
//         const fetchProducto = async () => {
//             try {
//                 const response = await fetch(`${Productos}/${idProductos}`);
//                 if (!response.ok) {
//                     throw new Error("La respuesta de la red no fue exitosa.");
//                 }
//                 const data = await response.json();
//                 setProducto(data);
//             } catch (error) {
//                 console.error("Error al cargar los detalles del producto:", error);
//             }
//         };

//         fetchProducto();
//     }, [idProductos]);

//     return (
//         <div>
//             {/* Aquí renderizas los detalles del producto */}
//             {producto ? (
//                 <div>
//                     <h1>Detalles del producto</h1>
//                     <p>Nombre: {producto.nombre}</p>
//                     <p>Precio: {producto.precio}</p>
//                     {producto.imagenes.map((imagen, idx) => (
//                         <div key={idx} className="mt-2">
//                             <img src={imagen.url} alt={`Imagen ${idx}`} className="img-thumbnail" style={{ maxWidth: "100px" }} />
//                         </div>
//                     ))}
//                     {/* Renderiza otros detalles del producto según sea necesario */}
//                 </div>
//             ) : (
//                 <p>Cargando...</p>
//             )}
//             <div className="grid gap-4">
//                 <div className="flex items-center gap-4">
//                     <img
//                         alt="Sneakers"
//                         className="aspect-square rounded-lg object-cover"
//                         height="80"
//                         src={img}
//                         width="80"
//                     />
//                     <div className="grid gap-1">
//                         <h2 className="font-semibold text-lg">Sneakers</h2>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Size: 10.5, Color: White</p>
//                     </div>
//                     <div className="ml-auto font-semibold">$150</div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <img
//                         alt="Backpack"
//                         className="aspect-square rounded-lg object-cover"
//                         height="80"
//                         src={img}
//                         width="80"
//                     />
//                     <div className="grid gap-1">
//                         <h2 className="font-semibold text-lg">Backpack</h2>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Color: Black</p>
//                     </div>
//                     <div className="ml-auto font-semibold">$50</div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <img
//                         alt="Watch"
//                         className="aspect-square rounded-lg object-cover"
//                         height="80"
//                         src={img}
//                         width="80"
//                     />
//                     <div className="grid gap-1">
//                         <h2 className="font-semibold text-lg">Watch</h2>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Color: Silver</p>
//                     </div>
//                     <div className="ml-auto font-semibold">$200</div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <img
//                         alt="Headphones"
//                         className="aspect-square rounded-lg object-cover"
//                         height="80"
//                         src={img}
//                         width="80"
//                     />
//                     <div className="grid gap-1">
//                         <h2 className="font-semibold text-lg">Headphones</h2>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Color: Black</p>
//                     </div>
//                     <div className="ml-auto font-semibold">$100</div>
//                 </div>
// <div className="flex items-center gap-4">
//     <img
//         alt="Shirt"
//         className="aspect-square rounded-lg object-cover"
//         height="80"
//         src={img}
//         width="80"
//     />
//     <div className="grid gap-1">
//         <h2 className="font-semibold text-lg">Shirt</h2>
//         <p className="text-sm text-gray-500 dark:text-gray-400">Size: M, Color: Blue</p>
//     </div>
//     <div className="ml-auto font-semibold">$20</div>
// </div>
//             </div>
//         </div>
//     );
// }

// export default DetalleProducto;


// import React, { useState, useEffect } from 'react';
// import img from '../img/enfermera-removebg-preview.png'

// const ShoppingCart = () => {
//     const [products, setProducts] = useState([
//         { id: 1, name: 'Producto 1', price: 50 },
//         { id: 2, name: 'Producto 2', price: 20 },
//         { id: 3, name: 'Producto 3', price: 30 }
//     ]);
//     const [total, setTotal] = useState(0);

//     const removeProduct = (productId) => {
//         setProducts(products.filter(product => product.id !== productId));
//     };

//     const calculateTotal = () => {
//         let totalPrice = 0;
//         products.forEach(product => {
//             totalPrice += product.price;
//         });
//         setTotal(totalPrice);
//     };

//     useEffect(() => {
//         calculateTotal();
//     }, [products]);

//     const renderProducts = () => {
//         return products.map(product => (
//             <div key={product.id} className="d-flex justify-content-between align-items-center mb-3">
//                 <img
//                     alt="Shirt"
//                     className="aspect-square rounded-lg object-cover"
//                     height="80"
//                     src={img}
//                     width="80"
//                 />
//                 {/* <span>{product.name} - ${product.price}</span> */}
//                 <div className="grid gap-1">
//                     <h2 className="font-semibold text-lg">{product.name}</h2>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Size: M, Color: Blue</p>
//                 </div>
//                 <div className="ml-auto font-semibold me-4">${product.price}</div>
//                 <div>
//                     <button className="btn btn-danger me-2" onClick={() => removeProduct(product.id)}>Eliminar</button>
//                     <button className="btn btn-secondary">Editar</button>
//                 </div>
//             </div>
//         ));
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-8">
//                     <h2>Productos en tu carrito:</h2>
//                     {renderProducts()}
//                 </div>
//                 <div className="col-md-4 mt-5">
//                     <div className="card">
//                         <div className="card-body d-flex justify-content-between">
//                             <h2>Total:</h2><h2>${total}</h2>
//                         </div>
//                     </div>
//                     <div className="d-grid mx-auto">
//                         <button className="btnvermas">
//                             <span className="ml-auto font-semibold me-4">Pagar</span>
//                         </button>
//                     </div>
//                     <div className="card mt-2 text-center mb-2">
//                         <span className="ml-auto font-semibold me-4">La entrega del producto será en la tienda.</span>
//                     </div>
//                 </div>
//             </div>
//             <div className='mt-5 mb-5' style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
//                 <h2>¡El pago se realizó con éxito!</h2>
//                 <p>Gracias por tu compra. </p>
//             </div>
//         </div>
//     );
// };

// export default ShoppingCart;
