import React from "react";
// import '../../css/productos.css';
import SplashScreen from "../../SplashScreen";

const Prueba = () => {

	return (
		<div>
			<SplashScreen/>
		</div>
		// <div>
		// 	<section class="container-related-products">
		// 		<h2>Productos Relacionados</h2>
		// 		<div class="card-list-products">
		// 			<div class="card">
		// 				<div className="discount-icon"><i class="fa fa-ticket"> </i> 4 %</div> {/* Icono de descuento */}
		// 				<div class="card-img">
		// 					<img class='imagen'
		// 						src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
		// 						alt="producto-1"
		// 					/>
		// 				</div>
		// 				<div class="info-card">
		// 					<div class="text-product">
		// 						<h3>Nike - Roshe Run</h3>
		// 						<p class="category"><i class="fa fa-solid fa-tag"></i>Footwear, Sneakers</p>
		// 					</div>
		// 					<div class="price">$85.00</div>
		// 				</div>
		// 			</div>
		// 			<div class="card">
		// 				<div class="card-img">
		// 					<img className="imagen"
		// 						src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
		// 						alt="producto-2"
		// 					/>
		// 				</div>
		// 				<div class="info-card">
		// 					<div class="text-product">
		// 						<h3>Common Projects Achilles</h3>
		// 						<p class="category">Footwear, Sneakers</p>
		// 					</div>
		// 					<div class="price">$255.00</div>
		// 				</div>
		// 			</div>
		// 			<div class="card">
		// 				<div class="card-img">
		// 					<img className="imagen"
		// 						src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
		// 						alt="producto-3"
		// 					/>
		// 				</div>
		// 				<div class="info-card">
		// 					<div class="text-product">
		// 						<h3>Adidas - Boston Super OG</h3>
		// 						<p class="category">Footwear, Sneakers</p>
		// 					</div>
		// 					<div class="price">$105.00</div>
		// 				</div>
		// 			</div>
		// 			<div class="card">
		// 				<div className="discount-icon">
		// 					4%
		// 				</div> {/* Icono de descuento */}
		// 				<div class="card-img">
		// 					<img className="imagen"
		// 						src="https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
		// 						alt="producto-4"
		// 					/>
		// 				</div>
		// 				<div class="info-card">
		// 					<div class="text-product">
		// 						<h3>Common Projects Achilles</h3>
		// 						<p class="category">Footwear, Sneakers</p>
		// 					</div>
		// 					<div class="price">$250.00</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</section>
		// </div>

	);
};

export default Prueba;



// import React, { useState, useRef, useContext, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { img, UrlUsuarios } from '../../url/urlSitioWeb';
// import { AuthContext } from '../../autenticar/AuthProvider';
// import { useNavigate } from 'react-router-dom';

// const UserProfile = () => {
//   const { isAuthenticated, user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [profileImage, setProfileImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [fotoPerfil, setFotoPerfil] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [showCamera, setShowCamera] = useState(false);
//   const [username] = useState(user.nombre); // Se cambia a usar el nombre del usuario
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   useEffect(() => {
//     // Llamada a la API para obtener la foto de perfil del usuario cuando se monta el componente
//     getFotoPerfil();
//   }, []);

//   useEffect(() => {
//     // Utiliza un efecto para redirigir al usuario si no está autenticado
//     if (!isAuthenticated) {
//       navigate('/login'); // Utiliza navigate para redirigir
//     }
//   }, [isAuthenticated, navigate]);

//   if (!isAuthenticated) {
//     return null; // Retorna null o un componente de carga mientras se redirige
//   }

//   const getFotoPerfil = async () => {
//     try {
//       const response = await fetch(`${UrlUsuarios}/${user._id}/foto`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//       }

//       const data = await response.json();
//       setFotoPerfil(data.fotoPerfil[0].url); // Almacena la URL de la foto de perfil
//       console.log('Foto de perfil obtenida:', data.fotoPerfil[0].url);
//     } catch (error) {
//       console.error('Error al obtener la foto de perfil:', error.message);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//         const fileName = `${username}_${file.name}`;
//         console.log(`Imagen guardada como: ${fileName}`);
//         uploadImage(e);  // Llamar a la función para subir la imagen
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const openCamera = () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       setShowCamera(true);
//       navigator.mediaDevices.getUserMedia({ video: true })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//           streamRef.current = stream;
//         })
//         .catch((error) => {
//           console.error('Error al acceder a la cámara: ', error);
//           openFileInput();
//         });
//     } else {
//       openFileInput();
//     }
//     setShowOptions(false);
//   };

//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL('image/png');
//     const fileName = `${username}_captured_image.png`;
//     setPreview(imageData);
//     console.log(`Imagen capturada guardada como: ${fileName}`);
//     stopCamera();

//     // Simula un archivo de imagen desde la captura de la cámara y sube la imagen
//     const blob = dataURLToBlob(imageData);
//     const file = new File([blob], fileName, { type: 'image/png' });
//     const simulatedEvent = { target: { files: [file] } };
//     uploadImage(simulatedEvent);
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }
//     setShowCamera(false);
//   };

//   const openFileInput = () => {
//     document.getElementById('galleryInput').click();
//     setShowOptions(false);
//   };

//   // Función para subir la imagen a la API
//   const uploadImage = async (e) => {
//     const files = e.target.files;
//     const formData = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       if (!file.type.match('image.*')) {
//         alert('Solo se permiten archivos de imagen.');
//         return;
//       }
//       formData.append('imagen', file);
//     }

//     try {
//       const response = await fetch(img, {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//       }

//       const data = await response.json();
//       console.log('Imagen subida con éxito:', data.url, data.publicId);

//       // Actualizamos la foto de perfil del usuario directamente con el resultado de la API
//       await actualizar(data.url, data.publicId);
//     } catch (error) {
//       console.error('Error al subir la imagen:', error.message);
//     }
//   };

//   // Función para actualizar la foto de perfil del usuario
//   const actualizar = async (url, publicId) => {
//     const response = await fetch(`${UrlUsuarios}/${user._id}/foto`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         fotoPerfil: { url, publicId }  // Solo subimos la URL y publicId al campo fotoPerfil
//       })
//     });

//     if (response.ok) {
//       console.log('Se agregó correctamente la foto de perfil.');
//       getFotoPerfil();
//     } else {
//       const data = await response.json();
//       console.log('Error al actualizar la imagen del usuario', data.error, data.message);
//     }
//   };

//   // Convierte base64 a Blob
//   const dataURLToBlob = (dataURL) => {
//     const parts = dataURL.split(';base64,');
//     const byteString = atob(parts[1]);
//     const mimeString = parts[0].split(':')[1];
//     const buffer = new ArrayBuffer(byteString.length);
//     const view = new Uint8Array(buffer);

//     for (let i = 0; i < byteString.length; i++) {
//       view[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([buffer], { type: mimeString });
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-start vh-100">
//       <div className="card text-center mt-5 p-4 shadow" style={{ width: '18rem' }}>
//         <div className="position-relative mb-3">
//           {showCamera ? (
//             <>
//               <video ref={videoRef} style={{ width: '100%' }}></video>
//               <button className="btn btn-primary mt-2" onClick={capturePhoto}>Capturar Foto</button>
//               <button className="btn btn-secondary mt-2" onClick={stopCamera}>Cancelar</button>
//               <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
//             </>
//           ) : (
//             <>
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="galleryInput"
//                 onChange={handleImageChange}
//                 style={{ display: 'none' }}
//               />
//               <div
//                 className="profile-image-container"
//                 onClick={() => setShowOptions(true)}
//                 style={{ width: '150px', height: '150px', margin: '0 auto' }}
//               >
//                 {fotoPerfil ? (
//                   <img
//                     src={fotoPerfil}
//                     alt="User Avatar"
//                     className="card-img-top rounded-circle"
//                     style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <div className="d-flex justify-content-center align-items-center rounded-circle bg-light" style={{ width: '150px', height: '150px' }}>
//                     <span className="text-muted">Agregar foto</span>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//           {!showCamera && (
//             <div
//               className="position-absolute"
//               style={{
//                 backgroundColor: 'green',
//                 borderRadius: '50%',
//                 width: '30px',
//                 height: '30px',
//                 top: '10px',
//                 right: '10px',
//                 cursor: 'pointer',
//               }}
//               onClick={() => setShowOptions(true)}
//             >
//               <span style={{ color: 'white', fontSize: '16px', textAlign: 'center' }}>+</span>
//             </div>
//           )}
//         </div>

//         {showOptions && (
//           <div className="position-absolute bg-light p-3" style={{ borderRadius: '10px', top: '160px', right: '50px', zIndex: '1' }}>
//             <button className="btn btn-secondary mb-2" onClick={openCamera}>Tomar Foto</button>
//             <button className="btn btn-secondary mb-2" onClick={openFileInput}>Seleccionar de Archivos</button>
//             <button className="btn btn-danger" onClick={() => setShowOptions(false)}>Cerrar</button>
//           </div>
//         )}

//         <div className="card-body">
//           <h5 className="card-title">{user.nombre}&nbsp;{user.apellido}</h5>
//           <p className="card-text">{user.correo}</p>
//           <p className="card-text"><i className="icono fa fa-phone"></i> {user.numeroTelefono}</p>
//           <p className="card-text"><i className="icono fa fa-circle" style={{ color: user.estado === 'ACTIVO' ? 'green' : 'red' }}></i> {user.estado}</p>
//           <p className="card-text"><i className="icono fa fa-calendar"></i>&nbsp;{user.fechaCreado.split('T')[0]}</p>
//           {/* <a href="#" className="btn btn-primary">Edit Profile</a> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';
// import JspdfPreview from '../../utilidad/JspdfPreview'; // Asegúrate de importar tu componente JspdfPreview correctamente
// import logo from '../../img/Logo de mi enfermera favorita.jpg';

// const TicketDeCompra = () => {
//   const [pdf, setPdf] = useState(null);

//   const generarPdf = () => {
//     const doc = new jsPDF();

//     // Agregar logo
//     doc.addImage(logo, 'jpg', 92, 20, 30, 30); // Ajusta la posición y el tamaño según sea necesario

//     // Título
//     doc.setFontSize(16);
//     doc.setTextColor(0);
//     doc.text('Mi enfermera favorita', 105, 60, { align: 'center' });

//     // Descripción
//     doc.setFontSize(12);
//     doc.text('Ticket de renta de productos.', 105, 70, { align: 'center' });
//     doc.text('Huejutla, Hgo.', 105, 75, { align: 'center' });

//     // Detalles de compra
//     doc.setFontSize(12);
//     doc.text('UNID.', 20, 90);
//     doc.text('DESCRIPCION', 105, 90, { align: 'center' });
//     doc.text('IMPORTE', 190, 90, { align: 'right' });
//     doc.setLineWidth(0.5);
//     doc.line(10, 92, 200, 92);

//     // Datos de compra
//     const items = [
//       { unidad: '1', descripcion: 'MASAJE', importe: '9,00' },
//       { unidad: '1', descripcion: 'CHOCOTERAPIA', importe: '6,00' },
//       { unidad: '1', descripcion: 'SPA 1H', importe: '6,00' }
//     ];

//     doc.setFontSize(10);
//     items.forEach((item, index) => {
//       const y = 100 + (index * 10);
//       doc.text(item.unidad, 20, y);
//       doc.text(item.descripcion, 105, y, { align: 'center' });
//       doc.text(item.importe, 190, y, { align: 'right' });
//     });

//     // Total
//     doc.setFontSize(12);
//     doc.text('TOTAL: 21,00', 190, 140, { align: 'right' });

//     // Mensaje de agradecimiento
//     doc.setFontSize(10);
//     doc.text('GRACIAS POR SU PREFERENCIA.', 105, 150, { align: 'center' });

//     // URL
//     doc.text('www.zankiu.es', 105, 160, { align: 'center' });

//     setPdf(doc);
//   };

//   const guardarPdf = () => {
//     pdf.save('ticket-de-compra.pdf');
//   };

//   return (
//     <div>
//       <button onClick={generarPdf}>Generar PDF</button>
//       {pdf && (
//         <div>
//           <JspdfPreview pdf={pdf} />
//           <button onClick={guardarPdf}>Descargar Ticket</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketDeCompra;











// import React, { useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ProfileAdminDashboard = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [nombre, setNombre] = useState('John');
//   const [app, setApp] = useState('Doe');
//   const [apm, setApm] = useState('Smith');
//   const [email, setEmail] = useState('johndoe@example.com');
//   const [password, setPassword] = useState('password123');
//   const [foto, setFoto] = useState('https://i.pinimg.com/564x/48/84/3b/48843b6ea8fead404661af7b00397142.jpg');
//   const [showCamera, setShowCamera] = useState(false); // Para mostrar la cámara
//   const videoRef = useRef(null); // Referencia del video para la cámara
//   const canvasRef = useRef(null); // Para capturar la foto
//   const streamRef = useRef(null); // Referencia para detener el stream

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     // Restablecer valores originales
//     setNombre('John');
//     setApp('Doe');
//     setApm('Smith');
//     setEmail('johndoe@example.com');
//     setPassword('password123');
//     setFoto('https://i.pinimg.com/564x/48/84/3b/48843b6ea8fead404661af7b00397142.jpg');
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Función para abrir la cámara
//   const openCamera = () => {
//     setShowCamera(true);
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         }
//         streamRef.current = stream; // Guardar el stream para detenerlo más tarde
//       })
//       .catch((err) => {
//         console.error(`Error al acceder a la cámara: ${err.message}`);
//       });
//   };

//   // Función para tomar la foto desde la cámara
//   const capturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const context = canvasRef.current.getContext('2d');
//       if (context) {
//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//         const imageData = canvasRef.current.toDataURL('image/jpeg');
//         setFoto(imageData); // Guardar la foto tomada como base64
//       }
//       setShowCamera(false); // Ocultar la cámara
//       stopCamera(); // Detener la cámara después de capturar la foto
//     }
//   };

//   // Función para detener la cámara
//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop()); // Detener todas las pistas del stream
//       streamRef.current = null; // Limpiar la referencia del stream
//     }
//     setShowCamera(false); // Asegurarse de ocultar el feed de la cámara
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-start vh-100">
//       <div className="card text-center mt-5 p-4 shadow" style={{ width: '18rem' }}>
//         <div className="position-relative mb-3">
//           <img
//             className="card-img-top rounded-circle"
//             src={foto}
//             alt="Perfil de administrador"
//             style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//           />

//           {isEditing && (
//             <>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="form-control mt-3"
//               />
//               <button onClick={openCamera} className="btn btn-secondary mt-2">
//                 📷 Tomar foto
//               </button>
//               {showCamera && (
//                 <div className="camera-container mt-3">
//                   <video ref={videoRef} className="video-feed"></video>
//                   <button onClick={capturePhoto} className="btn btn-primary mt-2">
//                     Capturar Foto
//                   </button>
//                   <button onClick={stopCamera} className="btn btn-secondary mt-2">
//                     Cancelar
//                   </button>
//                 </div>
//               )}
//               <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
//             </>
//           )}
//         </div>

//         <div className="card-body">
//           <h5 className="card-title">{nombre} {app} {apm}</h5>
//           <p className="card-text">{email}</p>
//           <p className="card-text">Contraseña: {password}</p>
//         </div>

//         {isEditing ? (
//           <div className="d-flex justify-content-between">
//             <button className="btn btn-success">Guardar</button>
//             <button onClick={handleCancel} className="btn btn-danger">Cancelar</button>
//           </div>
//         ) : (
//           <button onClick={handleEditClick} className="btn btn-primary">Actualizar</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileAdminDashboard;