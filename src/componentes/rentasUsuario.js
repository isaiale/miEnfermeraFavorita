import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../autenticar/AuthProvider';
import { RentaDeUsuarios, TiempoDeRenta } from '../url/urlSitioWeb';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';

const RentasUsuarios = () => {
  const [rentas, setRentas] = useState([]);
  const [tiempos, setTiempos] = useState({});
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Asegúrate de usar la URL correcta de tu servidor
    socket.on('notificacion', (data) => {
      if (data.usuarioId === user._id) {
        Swal.fire({
          title: 'Notificación',
          text: data.mensaje,
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    });

    return () => socket.disconnect();
  }, [user]);

  const fetchRentas = async () => {
    if (user && user._id) {
      try {
        const response = await fetch(`${RentaDeUsuarios}${user._id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las rentas');
        }
        const data = await response.json();
        setRentas(data);
        fetchTiempos(data);
      } catch (error) {
        console.error('Error al obtener las rentas:', error);
      }
    }
  };

  const fetchTiempos = async (rentas) => {
    try {
      const tiemposData = {};
      for (let renta of rentas) {
        const response = await fetch(`${TiempoDeRenta}/${renta._id}/tiempo-restante`);
        if (!response.ok) {
          throw new Error('Error al obtener el tiempo de renta');
        }
        const data = await response.json();
        tiemposData[renta._id] = data;
      }
      setTiempos(tiemposData);
    } catch (error) {
      console.error('Error al obtener los tiempos de renta:', error);
    }
  };

  useEffect(() => {
    fetchRentas(); // Llama a la función para cargar los datos inicialmente
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRentas(); // Vuelve a cargar los datos cada cierto tiempo
    }, 40000); // Intervalo de 40 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [user]);

  if (!user) {
    return <p>Cargando...</p>; // O algún otro mensaje de carga
  }

  return (
    <div className="container mt-2">
      <h2 className="mb-2">Rentas del Usuario</h2>
      <div className="row">
        {rentas.map(renta => (
          <div className="col-md-4 mb-4" key={renta._id}>
            <div className="card h-100">
              <img src={renta.productoRentaId.imagenes[0].url} className="card-img-top" alt={renta.productoRentaId.nombre} />
              <div className="card-body">
                <h5 className="card-title">{renta.productoRentaId.nombre}</h5>
                <p className="card-text">Descripción: {renta.productoRentaId.descripcion}</p>
                <p className="card-text">Cantidad: {renta.Cantidad}</p>
                <p className="card-text">Talla Seleccionada: {renta.tallaSeleccionada}</p>
                <p className="card-text">
                  Tiempo:
                  {tiempos[renta._id] && tiempos[renta._id].diasRestantes !== undefined && tiempos[renta._id].horasRestantes !== undefined && tiempos[renta._id].minutosRestantes !== undefined ? (
                    <>
                      {`${tiempos[renta._id].diasRestantes} días, ${tiempos[renta._id].horasRestantes} horas, ${tiempos[renta._id].minutosRestantes} minutos`}
                    </>
                  ) : (
                    'Aún no comienza el conteo'
                  )}
                </p>
                <p className="card-text">
                  {tiempos[renta._id] ? tiempos[renta._id].mensajeUser : ''}
                </p>
                <p className="card-text">Estado: {renta.estado}</p>
                {/* <p className="card-text">Fecha de Inicio: {new Date(renta.fechaInicio).toLocaleDateString()}</p>
                <p className="card-text">Fecha de Fin: {new Date(renta.fechaFin).toLocaleDateString()}</p> */}
                <p className="card-text">Horario de Entrega: {renta.horarioRecogida}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentasUsuarios;