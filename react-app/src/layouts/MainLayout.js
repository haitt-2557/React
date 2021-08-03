import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sider";
import { useDispatch } from "react-redux";
import { Types } from "../constants/types";

function MainLayout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: Types.GET_ALL_PRODUCT });
  }, [dispatch]);

  return (
    <div>
      <Header />
      <SideBar />
      {children}
    </div>
  );
}

export default MainLayout;
