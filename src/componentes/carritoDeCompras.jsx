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
            <h4 className='text-dark text-center'>Carrito de Compra</h4>
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
                            <div className='tituloContenidocarrito d-flex justify-content-between me-2 ms-2'>
                                <div>
                                    <p>Subtotal:</p>
                                    <p>Impuestos:</p>
                                    <p>Costos de Envío:</p>
                                    <p>Total:</p>
                                </div>
                                <div>
                                    <p>${resumenPedido.subtotal.toFixed(2)}</p>
                                    <p>${resumenPedido.impuestos.toFixed(2)}</p>
                                    <p>${resumenPedido.costos_envio.toFixed(2)}</p>
                                    <p style={{color:'blue'}}>${resumenPedido.total.toFixed(2)}</p>
                                </div>
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
