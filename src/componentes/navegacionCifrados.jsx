import React from 'react';
import { Link } from 'react-router-dom';

function Navegacion() {
    return (
        <div>
            <h2 className='text-center'>Componente de Navegación</h2>
            <div className="container text-center">
                <div className="row">
                    <div className="">
                        <Link className="btn btn-success fs-5 m-4" to="/cesar">Cifrado Cesar</Link>                
                        <Link className="btn btn-success fs-5 m-4" to="/escitala">Cifrado Escítala</Link>
                    </div>                    
                </div>
            </div>
        </div>
    );
}

export default Navegacion;
