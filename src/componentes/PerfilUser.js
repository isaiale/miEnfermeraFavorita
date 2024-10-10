import React, { useState, useRef, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { img, UrlUsuarios } from '../url/urlSitioWeb';
import { AuthContext } from '../autenticar/AuthProvider';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [username] = useState(user?.nombre || ''); // Se cambia a usar el nombre del usuario
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Asegurarse que 'useEffect' se llama siempre y manejar las condiciones dentro de este.
    if (!isAuthenticated) {
      navigate('/login'); // Redirige al usuario si no está autenticado
    } else if (user) {
      getFotoPerfil(); // Llama a la función para obtener la foto de perfil si hay un usuario
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) {
    return <div>Cargando...</div>; // O muestra un mensaje o un loader hasta que 'user' esté disponible
  }

  const getFotoPerfil = async () => {
    try {
      const response = await fetch(`${UrlUsuarios}/${user._id}/foto`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setFotoPerfil(data.fotoPerfil[0].url); // Almacena la URL de la foto de perfil
      console.log('Foto de perfil obtenida:', data.fotoPerfil[0].url);
    } catch (error) {
      console.error('Error al obtener la foto de perfil:', error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        const fileName = `${username}_${file.name}`;
        console.log(`Imagen guardada como: ${fileName}`);
        uploadImage(e); // Llamar a la función para subir la imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setShowCamera(true);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          streamRef.current = stream;
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara: ', error);
          openFileInput();
        });
    } else {
      openFileInput();
    }
    setShowOptions(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    const fileName = `${username}_captured_image.png`;
    setPreview(imageData);
    console.log(`Imagen capturada guardada como: ${fileName}`);
    stopCamera();

    // Simula un archivo de imagen desde la captura de la cámara y sube la imagen
    const blob = dataURLToBlob(imageData);
    const file = new File([blob], fileName, { type: 'image/png' });
    const simulatedEvent = { target: { files: [file] } };
    uploadImage(simulatedEvent);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const openFileInput = () => {
    document.getElementById('galleryInput').click();
    setShowOptions(false);
  };

  // Función para subir la imagen a la API
  const uploadImage = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.match('image.*')) {
        alert('Solo se permiten archivos de imagen.');
        return;
      }
      formData.append('imagen', file);
    }

    try {
      const response = await fetch(img, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Imagen subida con éxito:', data.url, data.publicId);

      // Actualizamos la foto de perfil del usuario directamente con el resultado de la API
      await actualizar(data.url, data.publicId);
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);
    }
  };

  // Función para actualizar la foto de perfil del usuario
  const actualizar = async (url, publicId) => {
    const response = await fetch(`${UrlUsuarios}/${user._id}/foto`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fotoPerfil: { url, publicId }, // Solo subimos la URL y publicId al campo fotoPerfil
      }),
    });

    if (response.ok) {
      console.log('Se agregó correctamente la foto de perfil.');
      getFotoPerfil(); // Actualiza la foto de perfil después de actualizar
    } else {
      const data = await response.json();
      console.log('Error al actualizar la imagen del usuario', data.error, data.message);
    }
  };

  // Convierte base64 a Blob
  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(';base64,');
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1];
    const buffer = new ArrayBuffer(byteString.length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      view[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeString });
  };

  return (
    <div className="container d-flex justify-content-center align-items-start vh-100">
      <div className="card text-center mt-5 p-4 shadow" style={{ width: '18rem' }}>
        <div className="position-relative mb-3">
          {showCamera ? (
            <>
              <video ref={videoRef} style={{ width: '100%' }}></video>
              <button className="btn btn-primary mt-2" onClick={capturePhoto}>
                Capturar Foto
              </button>
              <button className="btn btn-secondary mt-2" onClick={stopCamera}>
                Cancelar
              </button>
              <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
            </>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                id="galleryInput"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <div
                className="profile-image-container"
                onClick={() => setShowOptions(true)}
                style={{ width: '150px', height: '150px', margin: '0 auto' }}
              >
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    alt="User Avatar"
                    className="card-img-top rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center rounded-circle bg-light"
                    style={{ width: '150px', height: '150px' }}
                  >
                    <span className="text-muted">Agregar foto</span>
                  </div>
                )}
              </div>
            </>
          )}
          {!showCamera && (
            <div
              className="position-absolute"
              style={{
                backgroundColor: 'green',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setShowOptions(true)}
            >
              <span style={{ color: 'white', fontSize: '16px', textAlign: 'center' }}>+</span>
            </div>
          )}
        </div>

        {showOptions && (
          <div className="position-absolute bg-light p-3" style={{ borderRadius: '10px', top: '160px', right: '50px', zIndex: '1' }}>
            <button className="btn btn-secondary mb-2" onClick={openCamera}>
              Tomar Foto
            </button>
            <button className="btn btn-secondary mb-2" onClick={openFileInput}>
              Seleccionar de Archivos
            </button>
            <button className="btn btn-danger" onClick={() => setShowOptions(false)}>
              Cerrar
            </button>
          </div>
        )}

        <div className="card-body">
          <h5 className="card-title">
            {user.nombre}&nbsp;{user.apellido}
          </h5>
          <p className="card-text">{user.correo}</p>
          <p className="card-text">
            <i className="icono fa fa-phone"></i> {user.numeroTelefono}
          </p>
          <p className="card-text">
            <i
              className="icono fa fa-circle"
              style={{ color: user.estado === 'ACTIVO' ? 'green' : 'red' }}
            ></i>{' '}
            {user.estado}
          </p>
          <p className="card-text">
            <i className="icono fa fa-calendar"></i>&nbsp;{user.fechaCreado.split('T')[0]}
          </p>
          {/* <a href="#" className="btn btn-primary">Edit Profile</a> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;



// import React, { useContext, useEffect } from 'react'
// import '../css/perfil.css'
// import { AuthContext } from '../autenticar/AuthProvider';
// import { useNavigate } from 'react-router-dom';


// const PerfilUser = () => {
//     const { isAuthenticated, user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Utiliza un efecto para redirigir al usuario si no está autenticado
//         if (!isAuthenticated) {
//             navigate('/login'); // Utiliza navigate para redirigir
//         }
//     }, [isAuthenticated, navigate]);

//     if (!isAuthenticated) {
//         return null; // Retorna null o un componente de carga mientras se redirige
//     }


//     return (
//         <div>
//             <section className="seccion-perfil-usuario mb-5">
//                 <div className="perfil-usuario-header">
//                     <div className="perfil-usuario-portada">
//                         <div className="perfil-usuario-avatar">
//                             {/* <img src={img} alt="img-avatar"/>  */}
//                             <i className="iconUser fa fa-user"></i>
//                             <div className="boton-avatar" style={{background: user.estado === 'ACTIVO' ? 'green' : 'red'}}>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="perfil-usuario-body">
//                     <div className="perfil-usuario-bio">
//                         <h3 className="titulo lead">
//                             {user.rol === 'User' && 'Usuario'}
//                             {user.rol === 'Admin' && 'Administrador'}
//                             {user.rol === 'Gerente' && 'Gerente'}:&nbsp;{user.nombre}&nbsp;{user.apellido}</h3>
//                         {/* <p className="texto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//                     tempor incididunt ut labore et dolore magna aliqua.</p> */}
//                     </div>
//                     <div className="perfil-usuario-footer">
//                         <ul className="lista-datos">
//                             {/* <li><i className=" fa fa-map-signs"></i>Direccion de usuario:</li> */}
//                             <li><i className="icono fa fa-phone"></i>{user.numeroTelefono}</li>
//                             <li><i class="icono fa fa-envelope"></i>{user.correo}</li>
//                             {/* <li><i className="icono fa fa-building"></i> Cargo</li> */}
//                         </ul>
//                         <ul className="lista-datos">
//                             {/* <li><i className="icono fa fa-map"></i> Ubicacion.</li> */}
//                             {/* <li><i className="icono fa fa-calendar"></i> Fecha nacimiento.</li> */}
//                             <li><i class="icono fa fa-circle" style={{color: user.estado === 'ACTIVO' ? 'green' : 'red'}}></i> {user.estado}</li>
//                             <li><i className="icono fa fa-calendar"></i>{user.fechaCreado.split('T')[0]}</li>
                            
//                         </ul>
//                     </div>
//                     {/* <div className="redes-sociales">
//                 <a href="" className="boton-redes facebook fab fa-facebook-f"><i className="icon-facebook"></i></a>
//                 <a href="" className="boton-redes twitter fab fa-twitter"><i className="icon-twitter"></i></a>
//                 <a href="" className="boton-redes instagram fab fa-instagram"><i className="icon-instagram"></i></a>
//             </div> */}
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default PerfilUser
