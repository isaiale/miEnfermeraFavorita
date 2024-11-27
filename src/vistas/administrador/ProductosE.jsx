import Sidebar from "../../componentesE/sidebarE";
import ProductosE from "../../componentesE/ProductosE";
//import DashBoarAdmin from "../../componentesE/DashBoarAdmin";

export const ProductosEmpleado = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className="content w-100">
          {/* <DashBoarAdmin /> */}
          <ProductosE />
        </div>
      </div>
    </div>
  );
};
