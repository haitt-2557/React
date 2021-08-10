import React from "react";
import { TypesSuccess } from "../../constants/types";
import { useDispatch } from "react-redux";
import axiosClient from "../../untils/axiosClient";

function ButtonClear() {
  const dispatch = useDispatch();
  const getProductInPage = async () => {
    dispatch({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });
    try {
      const payload = {
        _limit: 16,
        _page: 1,
      };
      const resProducts = await axiosClient.get("products");
      const { data } = await axiosClient.get("products", {
        params: payload,
      });
      dispatch({
        type: TypesSuccess.GET_ALL_PRODUCT_SUCCESS,
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
