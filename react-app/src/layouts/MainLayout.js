import React from "react";
import Header from "../components/Header";
import SideBar from "../components/Sider";

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <SideBar />
      {children}
    </div>
  );
}

export default MainLayout;
