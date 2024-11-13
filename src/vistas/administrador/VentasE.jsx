import Sidebar from "../../componentesE/sidebarE";
import VentasE from "../../componentesE/Ventas";

export const VentasEmpleado = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className="content w-100 overflow-auto ">          
          <VentasE />
        </div>
      </div>
    </div>
  );
};
