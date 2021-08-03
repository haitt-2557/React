import React, { useContext } from "react";
import { Types } from "../../constants/types";
import { ProductsContext } from "../../contexts/context/context";
import axiosClient from "../../untils/axiosClient";

function ButtonClear() {
  const productsContext = useContext(ProductsContext);

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

  return (
    <div className="clear text-center mt-2 mb-2">
      <button className="btn-clear-filter" onClick={getProductInPage}>
        <i className="fas fa-eraser mr-2"></i>
        Clear all filter
      </button>
    </div>
  );
}

export default ButtonClear;
