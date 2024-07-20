import Sidebargerente from "../../componenteG/SideBarG";
import Inventario from "../../componenteG/InventarioG";

export const InventarioG = () => {
  return (
    <div>
        <div className="flexx">
            <Sidebargerente/>
            <div className="content w-100 overflow-auto pt-24">
                <Inventario/>
            </div>
        </div>
    </div>
  )
}
