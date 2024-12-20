import { useContext } from "react";
import { AuthContext } from "./autenticar/AuthProvider";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollTop from "./utilidad/ScroollTop";
import AlertaConexionInternet from "./utilidad/AlertaConexionInternet";

import InicioUsuario from './vistas/usuario/inicioUsuario';
import AvisoPrivacida from './vistas/usuario/avisoPrivacidad';
import ReservarA from './vistas/usuario/Reservar';
import { LoginUser } from './vistas/usuario/LoginUser';
import { Producto } from './vistas/usuario/productos';
import RegistroUser from './vistas/usuario/registroUser';
import CarritoCompra from './vistas/usuario/carritoDeCompras';
import PoliticaDeCookies from './vistas/usuario/politicaDeCookies';
import TerminosYCondiciones from './vistas/usuario/terminosYCondiciones';
import Error404 from './errores/error404';
import { ErrorVerificacion } from './errores/error_verificacion';
/* import VerificacionCorrecta from './errores/VerificacionCorrecta'; */
import Cancelado from "./errores/canceled";
import Success from "./errores/success";
import { Accesorioss } from './vistas/usuario/accesorios';
import { Contactos } from './vistas/usuario/contacto';
import RecuperarPasswordd from './vistas/usuario/RecuperarPassword';
import VistaBusquedaSimple from './vistas/usuario/VistaBusquedaSimple';
import VistaBusquedaAvanzada from './vistas/usuario/VistaBusquedaAvanzada';
import Prueba from './vistas/usuario/prueba';
import { Ayuda } from './vistas/usuario/ayuda';
import { Perfil } from "./vistas/usuario/perfil";
import { ProductoDetalle } from "./vistas/usuario/productoDetalle";
import { ProductoDetalleRenta } from "./vistas/usuario/Detalle_ProductoRenta";
import { Compras } from "./vistas/usuario/Compras";
import RentasUsuario from "./vistas/usuario/Rentas";

import { InicioAdmin } from './vistas/administrador/InicioAdmin';
import { VentasEmpleado } from './vistas/administrador/VentasE';
import { ClientesEmpleado } from './vistas/administrador/ClientesE';
import { ProductosEmpleado } from './vistas/administrador/ProductosE';
import { ConfiguracionEmpleado } from './vistas/administrador/ConfiguracionE';
import { RentaProductoo  } from "./vistas/administrador/Renta_producto";

import InicioGerente from './vistas/gerente/InicioGerente';

export default function App() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        <AlertaConexionInternet />
        <ScrollTop />
        <Routes>
          <Route path="/" element={<InicioUsuario />} />
          <Route path="productos/:categoriaId" element={<Producto />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="registroUsuario" element={<RegistroUser />} />
          <Route path="carritoDeCompras" element={<CarritoCompra />} />
          <Route path="politicaDeCookies" element={<PoliticaDeCookies />} />
          <Route path="terminosYcondiciones" element={<TerminosYCondiciones />} />
          <Route path="accesorioss" element={<Accesorioss />} />
          <Route path="contacto" element={<Contactos />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="reservarA" element={<ReservarA />} />
          <Route path='avisoPrivacidad' element={<AvisoPrivacida />} />
          <Route path="recuperarPassword" element={<RecuperarPasswordd />} />
          <Route path="busquedasimple" element={<VistaBusquedaSimple />} />
          <Route path="busquedaAvanzada" element={<VistaBusquedaAvanzada />} />
          <Route path="prueba" element={<Prueba />} />
          <Route path="*" element={<Error404 />} />
          <Route path="error-verificacion" element={<ErrorVerificacion />} />
          <Route path="success" element={<Success />} />
          <Route path="cancelado" element={<Cancelado />} />
          {/* <Route path="verificacion-correcta" element={<VerificacionCorrecta />} /> */}
          <Route path="perfil" element={<Perfil />} />
          <Route path="Compras" element={<Compras />} />
          <Route path="detalle-producto/:idProductos" element={<ProductoDetalle />} />
          <Route path="ProductoDetalleRenta/:idRentas" element={<ProductoDetalleRenta />} />
          <Route path="RentasUser" element={<RentasUsuario />} />
          {/* Routes for Admin */}

          {isAuthenticated !== null && user?.rol === "Admin" && (
            <>
              <Route path='inicioAdmin' element={<InicioAdmin />} />
              <Route path='ventasEmpleado' element={<VentasEmpleado />} />
              <Route path='clientesEmpleado' element={<ClientesEmpleado />} />
              <Route path='productosEmpleado' element={<ProductosEmpleado />} />
              <Route path='configuracionEmpleado' element={<ConfiguracionEmpleado />} />
              <Route path='Renta_productos' element={<RentaProductoo  />} />
            </>
          )}
          {/* Routes for Gerente */}
          {/* <Route path='inicioAdmin' element={<InicioAdmin />} />
              <Route path='ventasEmpleado' element={<VentasEmpleado />} />
              <Route path='clientesEmpleado' element={<ClientesEmpleado />} />
              <Route path='productosEmpleado' element={<ProductosEmpleado />} />
              <Route path='configuracionEmpleado' element={<ConfiguracionEmpleado />} /> */}

          {isAuthenticated !== null && user?.rol === "Gerente" && (
            <>
              <Route path='inicioGerente' element={<InicioGerente />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}