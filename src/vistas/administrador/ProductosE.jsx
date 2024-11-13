import Sidebar from "../../componentesE/sidebarE";
import ProductosE from "../../componentesE/ProductosE";

export const ProductosEmpleado = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className="content w-100">          
          <ProductosE />
        </div>
      </div>
    </div>
  );
};
