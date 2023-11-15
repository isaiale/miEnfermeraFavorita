import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar los estilos de Bootstrap
import carrito from '../autenticar/carritoCompras.json';
import imgproduct from '../img/imagenProductoAtuendoss.jpg';
import '../css/carritoCompras.css';

function CarritoDeCompra() {
    // Asegúrate de que estos datos estén disponibles en tu archivo JSON
    const resumenPedido = carrito.resumen_pedido;
    const descuentos = carrito.descuentos;
    const informacionAdicional = carrito.informacion_adicional;

    return (
        <div className="m-3 mt-2 mb-2">
            <h3 className='text-white text-center bg-100'>Carrito de Compra</h3>
            <div className="justify-content-between row">
                <div className="col-md-9">
                    {carrito.carrito.map((item) => (
                        <div key={item.producto.id} className="m-2 tituloContenidocarrito d-flex align-items-center border-3d">
                            <img src={imgproduct} style={{ width: '90px', height: '90px' }} className="m-1 me-2" />
                            <div className="d-flex flex-grow-1 justify-content-between">
                                <p className="mb-0 text-truncate">{item.cantidad} {item.producto.nombre}</p>
                                <p className="mb-0 me-4">Total: ${item.precio_total.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-3">
                    <div className='border-3d'>
                        <div className='m-1'>
                            <h3 className='titulocarritocompra'>Resumen de pedido</h3>
                            <div className='tituloContenidocarrito'>
                                <p>Subtotal: <span className=''> ${resumenPedido.subtotal.toFixed(2)}</span></p>
                                <p>Impuestos: <span className=''> ${resumenPedido.impuestos.toFixed(2)}</span> </p>
                                <p>Costos de Envío: <span className=''> ${resumenPedido.costos_envio.toFixed(2)}</span></p>
                                <p>Total: <span className=''> ${resumenPedido.total.toFixed(2)}</span> </p>
                            </div>

                        </div>
                        <div className='m-1'>
                            <h3 className='titulocarritocompra'>Descuentos</h3>
                            {descuentos.map((descuento) => (
                                <div className='tituloContenidocarrito '>
                                    <p key={descuento.codigo}>${descuento.monto.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className='m-1'>
                            <h3 className='titulocarritocompra'>Información Adicional</h3>
                            <div className='m-3 colorRojoTexto'>
                                <p>Política de cambio {informacionAdicional.politica_cambio} </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CarritoDeCompra;
