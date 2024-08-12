import React from 'react';

function Catalog() {
  return (
    <div>      
      <iframe
        src="https://model-recomendacion.onrender.com/catalog"
        title="Catálogo de Productos"
        width="100%"
        height="800px"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}

export default Catalog;






// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/contacto.css';  

// function Contacto() {
//   const [nombre, setNombre] = useState('');
//   const [email, setEmail] = useState('');
//   const [mensaje, setMensaje] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log('Nombre:', nombre);
//     console.log('Email:', email);
//     console.log('Mensaje:', mensaje);

//     alert('Mensaje enviado exitosamente');

//     setNombre('');
//     setEmail('');
//     setMensaje('');
//   };

//   return (
//     <div className='p-5'>
//       <div className="container mt-3 p-5 border">
//         <h2>Contactanos</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="nombre" className="form-label">Nombre:</label>
//             <input
//               type="text"
//               id="nombre"
//               className="form-control"
//               value={nombre}
//               onChange={(e) => setNombre(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email:</label>
//             <input
//               type="email"
//               id="email"
//               className="form-control"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="mensaje" className="form-label">Mensaje:</label>
//             <textarea
//               id="mensaje"
//               className="form-control"
//               value={mensaje}
//               onChange={(e) => setMensaje(e.target.value)}
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className="btn btn-primary">Enviar</button>
//         </form>
//       </div>
//     </div>
   
//   );
// }

// export default Contacto;