import React, { useState, useEffect } from "react";

function AlertaConexionInternet() {
  const [estaConectado, setEstaConectado] = useState(navigator.onLine);

  useEffect(() => {
    function manejarConexion() {
      setEstaConectado(true);
      alert("¡Conexión a internet restaurada! Puedes continuar utilizando todas las funciones.");
      // Aquí puedes añadir más lógica como refrescar datos desde el servidor
      refrescarDatos();
    }

    function manejarDesconexion() {
      setEstaConectado(false);
      alert("Has perdido la conexión a internet. Algunas funciones pueden no estar disponibles.");
    }

    window.addEventListener('online', manejarConexion);
    window.addEventListener('offline', manejarDesconexion);

    return () => {
      window.removeEventListener('online', manejarConexion);
      window.removeEventListener('offline', manejarDesconexion);
    };
  }, []);

  // Opcionalmente, podrías usar una alerta visual en la UI en lugar de alertas de navegador
  return (
    <div>
      {!estaConectado && (
        <div style={{ color: 'white', textAlign: 'center', marginTop: '20px', padding: '10px', backgroundColor: '#ff4444' }}>
          No estás conectado a internet. Algunas funciones pueden no estar disponibles.
        </div>
      )}
    </div>
  );
}

function refrescarDatos() {
  // Implementa la lógica para recargar los datos necesarios
  console.log("Recargando datos desde el servidor...");
}

export default AlertaConexionInternet;
