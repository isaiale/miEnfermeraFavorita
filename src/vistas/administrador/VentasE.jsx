import Sidebar from "../../componentesE/sidebarE";
import VentasE from "../../componentesE/Ventas";
//import DashBoarAdmin from "../../componentesE/DashBoarAdmin";

export const VentasEmpleado = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className="content w-100 overflow-auto ">
          {/* <DashBoarAdmin /> */}
          <VentasE />
        </div>
      </div>
    </div>
  );
};
