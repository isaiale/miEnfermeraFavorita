import React from 'react';
import james from '../img/james.jpg';
import isai from '../img/isai.jpg'

const Desarrolladores = () => {
  return (
    <div>
        <section className='my-lg-1 my-8'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-10 mb-3'>
                            <h3 className='mb-0'>Informacion</h3>
                        </div>
                    </div>
                    <div className='row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 mb-4'>

                            <div className='col'>
                                <div className='card border-3d'>
                                    <div className='card-body'>
                                        <div className='text-center position-relative'>
                                            <div className='position-absolute top-0 start-0'>
                                                <span className='badge bg-success'>Desarrollador</span>
                                            </div>
                                            <a>
                                                <img src={isai} className='mb-3 img' />
                                            </a>
                                        </div>
                                        <h2 className='fs-6 mb-0'>
                                            <a className='text-inherit text-decoration-none '>Isai Alejandro Flores</a>
                                        </h2>
                                        <div className='text-small mb-0'>
                                            <a className='text-decoration-none text-muted fs-5'><small>20210640</small></a>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mt-2'>
                                            <div>
                                                <span className='text-dark fs-5'>Desarrollador</span>
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col'>
                                <div className='card border-3d'>
                                    <div className='card-body'>
                                        <div className='text-center position-relative'>
                                            <div className='position-absolute top-0 start-0'>
                                                <span className='badge bg-success'>Tester</span>
                                            </div>
                                            <a>
                                                <img src={james} className='mb-3 img' />
                                            </a>
                                        </div>
                                        <h2 className='fs-6 mb-0'>
                                            <a className='text-inherit text-decoration-none '>James Brian Hernández Hernández</a>
                                        </h2>
                                        <div className='text-small mb-0'>
                                            <a className='text-decoration-none text-muted fs-5'><small>20200699</small></a>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mt-2'>
                                            <div>
                                                <span className='text-dark fs-5'>Tester</span>
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Desarrolladores