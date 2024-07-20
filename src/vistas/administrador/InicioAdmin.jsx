import React from "react";
import Sidebar from "../../componentesE/sidebarE";
import Home from "../../componentesE/Home";

export const InicioAdmin = () => {
  return (
    <div>
      <div className="flexx">
        <Sidebar />
        <div className=" w-100">
          {/* <DashBoarAdmin /> */}
          <Home />
        </div>
      </div>
    </div>

  );
};
