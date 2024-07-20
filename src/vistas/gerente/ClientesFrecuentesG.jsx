import Sidebargerente from "../../componenteG/SideBarG";
import ClientesF from "../../componenteG/ClientesFrecuentesG";

export const ClientesFrecuentesG = () => {
  return (
    <div>
        <div className="flexx">
            <Sidebargerente/>
            <div className="content w-100 overflow-auto pt-24">
                <ClientesF/>
            </div>
        </div>
    </div>
  )
}
