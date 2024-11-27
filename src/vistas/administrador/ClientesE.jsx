import Sidebar from "../../componentesE/sidebarE";
import ClientesE from "../../componentesE/Clientes";
//import DashBoarAdmin from "../../componentesE/DashBoarAdmin";

export const ClientesEmpleado = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className=" w-100">
          {/* <DashBoarAdmin /> */}
          <ClientesE />
        </div>
      </div>
    </div>
  );
};
