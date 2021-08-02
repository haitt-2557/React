import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sider";
import axiosClient from "../untils/axiosClient";
import { ProductsContext } from "../contexts/context/context";
import { Types } from "../constants/types";
function MainLayout({ children }) {
  const productsContext = useContext(ProductsContext);

  useEffect(() => {
    const getProductInPage = async () => {
      productsContext.dispatch({
        type: Types.SET_IS_LOADING,
      });
      try {
        const payload = {
          _limit: 16,
          _page: 1,
        };
        const resProducts = await axiosClient.get("products");
        const { data } = await axiosClient.get("products", {
          params: payload,
        });
        productsContext.dispatch({
          type: Types.GET_ALL_PRODUCT,
          payload: {
            products: resProducts.data,
            productsInPage: data,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (productsContext.payload.products.length === 0) {
      getProductInPage();
    } // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <SideBar />
      {children}
    </div>
  );
}

export default MainLayout;
