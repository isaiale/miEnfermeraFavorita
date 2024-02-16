import imgLogo from '../img/Logo de mi enfermera favorita.jpg';

export default function Verificacion_correcta() {
    return (
        <div style={{}}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '50px', fontfamily: 'sans-serif', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: '600px', textAlign: 'center', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '10px; box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={imgLogo} style={{ maxWidth: '150px', borderRadius: '50%', margin: '20px auto' }} alt='logo' />
                    </div>
                    <h2 className='m-2'>Tu cuenta ha sido activada con éxito.</h2>
                    <p>Ahora puedes disfrutar de todos los beneficios y servicios que ofrecemos.</p>
                    {/* <a href="http://localhost:300/users/activar-cuenta?token=${token}" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', fontSize: '16px', textDecoration: 'none', margin: '20px' }}>
                        Activar cuenta
                    </a> */}
                </div>
            </div>
        </div>
    )
}
