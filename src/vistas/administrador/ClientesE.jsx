import Sidebar from "../../componentesE/sidebarE";
import ClientesE from "../../componentesE/Clientes";

export const ClientesEmpleado = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className=" w-100">
          <ClientesE />
        </div>
      </div>
    </div>
  );
};
