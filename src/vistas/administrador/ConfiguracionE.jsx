import DashBoarAdmin from "../../componentesE/DashBoarAdmin";
import Sidebar from "../../componentesE/sidebarE";
import ConfiguracionE from "../../componentesE/Configuracion";

export const ConfiguracionEmpleado = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className="content w-100">
          {/* <DashBoarAdmin /> */}
          <ConfiguracionE />
        </div>
      </div>
    </div>
  );
};
