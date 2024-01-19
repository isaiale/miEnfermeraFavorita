import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const RecuperarPassword = () => {
    const [error, setError] = useState('');


  return (
    <div className="container">
            <div className="row justify-content-center m-3">
                <div className="col-md-5 border">
                    <Form>
                        <h2 className="m-2 text-center">Recuperar Contraseña</h2>

                        {error &&
                            <div className=''>
                                <p className="mt-1 mb-1 alert alert-danger ">{error}</p>
                            </div>
                        }

                        <Form.Group className="" controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Ingresa tu correo electrónico" 
                                aria-describedby="basic-addon1"  />
                            </div>
                        </Form.Group>                        
                        <div className="text-center mt-3 d-grid mx-auto">
                            <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                Enviar
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
  )
}

export default RecuperarPassword;