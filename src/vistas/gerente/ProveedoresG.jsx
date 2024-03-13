import Sidebargerente from "../../componenteG/SideBarG";
import Proveedores from "../../componenteG/ProveedoresG";

export const ProveedoresG = () => {
  return (
    <div>
        <div className="flexx">
            <Sidebargerente/>
            <div className="content w-100 overflow-auto pt-24">
                <Proveedores/>
            </div>
        </div>
    </div>
  )
}
