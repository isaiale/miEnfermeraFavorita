import Sidebargerente from "../../componenteG/SideBarG";
import ComprasA  from "../../componenteG/ComprasG";

export const ComprasG = () => {
  return (
    <div>
        <div className="flexx">
            <Sidebargerente/>
            <div className="content w-100 overflow-auto pt-24">
                <ComprasA/>
            </div>
        </div>
    </div>
  )
}
