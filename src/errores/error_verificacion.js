import imgLogo from '../img/Logo de mi enfermera favorita.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export const Error_verificacion = () => {
    return (
        <div className='mt-5'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ maxWidth: '600px', textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', marginTop: '30px' }}>
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        {/* <img src={imgLogo} style={{ maxWidth: '150px', borderRadius: '50%', margin: '20px auto' }} alt='logo' /> */}
                        <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: '60px', color: 'red' }} />
                    </div>
                    <h2 className='display-5 m-1'>Tu cuenta ya está activa.</h2>
                    <p className='lead'>El token que has utilizado para la activación es ahora inválido. Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos. Gracias.</p>
                    {/* <a href="http://localhost:300/users/activar-cuenta?token=${token}" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', fontSize: '16px', textDecoration: 'none', margin: '20px' }}>
                        Activar cuenta
                    </a> */}
                    <div className='row col-md-4 offset-md-4'>
                        <div className="text-center m-3 mb-3 d-grid mx-auto">
                            <button className='btn lead' style={{ color: 'white', background: 'red' }} >
                                ¿Necesitas ayuda?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
