import Sidebar from "../../componentesE/sidebarE";
import RentaProducto from "../../componentesE/RentaProducto";
//import DashBoarAdmin from "../../componentesE/DashBoarAdmin";

export const RentaProductoo = () => {
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
