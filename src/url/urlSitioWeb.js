export const RolUsuario = "https://back-end-enfermera.vercel.app/api/rol"; // Ruta para rol de usuario
export const UrlUsuarios = "https://back-end-enfermera.vercel.app/api/usuario"; // Ruta para usuarios CRUD
// export const UrlUsuarios = "http://localhost:3000/api/usuario"; // Ruta para actualizar foto de usuarios
export const BloquearUsuario = "https://back-end-enfermera.vercel.app/api/usuario/bloquear" //Bloquear usuario
export const RecuperarPasswordEmail = "https://back-end-enfermera.vercel.app/api/forgot-password"; //Para recuperaciond de contraseñas
export const VerificarCodigo = "https://back-end-enfermera.vercel.app/api/verify-code"; //Para verificar codigo
export const NuevaPassword = "https://back-end-enfermera.vercel.app/api/reset-password"; //Para nueva contraseña
export const UrlLoginUsuarios = "https://back-end-enfermera.vercel.app/api/auth/login";//Para Login de usuarios
// export const UrlLoginUsuarios = "http://localhost:3000/api/auth/login";//Para Login de usuarios

export const Productos = "https://back-end-enfermera.vercel.app/api/productos/productos";//Para productos 
// export const Productos = "http://localhost:3000/api/productos/productos";//Para productos
export const descuentos_productos = 'https://back-end-enfermera.vercel.app/api/productos/descuentos';
// export const descuentos_productos = 'http://localhost:3000/api/productos/descuentos'; 

export const categoria_productos = "https://back-end-enfermera.vercel.app/api/productos/productos/categoria/";
export const img = "https://back-end-enfermera.vercel.app/api/productos/imagenes"; //Para subir imgenes de productos

export const Estado_Producto = "https://back-end-enfermera.vercel.app/api/productos/estado";//Para estado de productos
export const CategoriaProducto = "https://back-end-enfermera.vercel.app/api/categorias/categoria";//Para categoria

export const Api_Validacio_Correo ="https://disify.com/api/email/";//Validacion de correos electronicos 
export const urlCloudinary = "https://api.cloudinary.com/v1_1/droihhnng/image/upload";//imagenes

// ***************************Carrito de compra*********************************************
export const CarritoCompras = "https://back-end-enfermera.vercel.app/api/carrito";//Para Carrito
// export const CarritoCompras = "http://localhost:3000/api/carrito";//Para Carrito
// para Realizar pagos con stripe
export const Stripe = "https://back-end-enfermera.vercel.app/api/stripe";//Para Carrito
// export const Stripe = "http://localhost:3000/api/stripe";//Para Carrito
// export const StripeVerificar = "https://back-end-enfermera.vercel.app/api/stripe/create-checkout-session";
export const ComprasUsuariosUrl = "https://back-end-enfermera.vercel.app/api/detalle";//Para Detalle compra o venta

export const Productos_Renta = "https://back-end-enfermera.vercel.app/api/productos-renta"
export const Productos_Renta_Disponible = "https://back-end-enfermera.vercel.app/api/productos-renta-disponible"
export const Rentas =  "https://back-end-enfermera.vercel.app/api/rentas" //Para checar rentas del producto, CRUD 
export const Pagos_Rentas = "https://back-end-enfermera.vercel.app/api/pagos-renta/renta/"
export const Pagos_Renta_Vista_Admin = "https://back-end-enfermera.vercel.app/api/admin/pagos-renta"
export const Ventas_Vista_Admin = "https://back-end-enfermera.vercel.app/api/ventas-totales"
// export const TiempoDeRenta = "http://localhost:3000/api/rentas"///66837fcbac9a828222b3c180/tiempo-restante de renta
export const RentaDeUsuarios = "https://back-end-enfermera.vercel.app/api/rentas/usuario/"// Para checar la renta de cada usuario 
export const comentarios = "https://back-end-enfermera.vercel.app/api/comentarios"

export const Subcripcioness = "https://back-end-enfermera.vercel.app/api/suscripciones/logeo"
// export const Subcripcioness ="http://localhost:3000/subscribeUsuario/"

// export const Productos_Renta = "https://back-end-enfermera.vercel.app/api/productos-renta"
// export const Rentas =  "http://localhost:3000/api/rentas" //Para checar rentas del producto, CRUD
// export const PagosRentas = "https://back-end-enfermera.vercel.app/api/pagos"
// export const TiempoDeRenta = "https://back-end-enfermera.vercel.app/api/rentas"///66837fcbac9a828222b3c180/tiempo-restante de renta
// export const RentaDeUsuarios = "http://localhost:3000/api/rentas/usuario/"// Para checar la renta de cada usuario
//--------------------------- pago renta ------------------------------------------------------------------------------------------
export const Verificar_Pago = "https://back-end-enfermera.vercel.app/api/rentas/verify-payment/" //verifica si el pago se realizó con exito
export const Pagar_renta = "https://back-end-enfermera.vercel.app/api/rentas/create-checkout-session" //Para el pago de renta
// export const Pagar_renta = "http://localhost:3000/api/rentas/create-checkout-session" //Para el pago de renta
export const pagos_Cancelados_Renta = "https://back-end-enfermera.vercel.app/api/rentas/cancelado/" //verifica si el pago se realizó con exito