import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la redirección

export const ErrorVerificacion = () => {
    const navigate = useNavigate(); // Instancia de useNavigate

    // Función para redirigir al inicio
    const handleRedirect = () => {
        navigate('/'); // Redirige al inicio del sitio
    };

    return (
        <div className='mt-5'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', marginTop: '30px' }}>
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: '60px', color: 'red' }} />
                    </div>
                    <h2 className='display-5 m-1'>Tu cuenta ya está activa.</h2>
                    <p className='lead'>El token que has utilizado para la activación es ahora inválido. Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos. Gracias.</p>
                    
                    <div className='row col-md-4 offset-md-4'>
                        <div className="text-center m-3 mb-3 d-grid mx-auto">
                            {/* Botón actualizado con el nuevo texto y la función para redirigir */}
                            <button 
                                className='btn lead' 
                                style={{ color: 'white', background: 'red' }} 
                                onClick={handleRedirect} // Llama a la función de redirección
                            >
                                Ir al inicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}