import DashBoarAdmin from "../../componentesE/DashBoarAdmin";
import Sidebar from "../../componentesE/sidebarE";
import RentaProducto from "../../componentesE/RentaProducto";

export const Renta_producto = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className="content w-100">
          {/* <DashBoarAdmin /> */}
          <RentaProducto />
        </div>
      </div>
    </div>
  );
};
