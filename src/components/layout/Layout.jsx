import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-row bg-neutral-100 w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <div className="p-4">{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Layout;
