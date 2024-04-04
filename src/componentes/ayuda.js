
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import { Productos, img } from '../url/urlSitioWeb';

const ImageUploader = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = async (event) => {
        const files = event.target.files;
        const formData = new FormData();

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append('imagen', file);
            }

            const response = await fetch(img, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            setImageUrls(prevImageUrls => [...prevImageUrls, { url: data.url, publicId: data.publicId }]);
            console.log(data.url, data.publicId);
        } catch (error) {
            console.error(error.message);
            setErrorMessage(error.message);
        }
    };

    const handleDeleteImage = async (publicId) => {
        try {
            const response = await fetch(`${img}/${publicId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setImageUrls(prevImageUrls => prevImageUrls.filter(image => image.publicId !== publicId));
        } catch (error) {
            console.error(error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Subir Imágenes</h2>
            {imageUrls.length > 0 && (
                imageUrls.map((imagen, index) => (
                    <div>                
                        <img key={index} src={imagen.url} alt={`Imagen ${index}`} style={{ maxWidth: '80px', marginRight: '10px' }} /> 
                        <button className="btn btn-danger" onClick={() => handleDeleteImage(imagen.publicId)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))
            )}
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default ImageUploader;




