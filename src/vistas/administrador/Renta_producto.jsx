import Sidebar from "../../componentesE/sidebarE";
import RentaProducto from "../../componentesE/RentaProducto";

export const RentaProductoo = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className="content w-100">          
          <RentaProducto />
        </div>
      </div>
    </div>
  );
};