import { Pagination, Row, Spin } from "antd";
import React, { useContext } from "react";
import Card from "../Card";
import Sort from "./Sort";
import { ProductsContext } from "../../contexts/context/context";
import axiosClient from "../../untils/axiosClient";
import { Types } from "../../constants/types";
import "./style.scss";

function MainContainer() {
  const productsContext = useContext(ProductsContext);

  const handleChangePage = async (current, size) => {
    productsContext.dispatch({
      type: Types.SET_IS_LOADING,
    });
    try {
      const payload = {
        _limit: size,
        _page: current,
      };
      const { data } = await axiosClient.get("products", {
        params: payload,
      });
      productsContext.dispatch({
        type: Types.CHANGE_CURRENT_PAGE,
        payload: {
          productsInPage: data,
          currentPage: current,
          size: size,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="main-content">
      <Sort />
      {productsContext.payload?.isLoading ? (
        <Spin className="spin__antd" size="large" />
      ) : (
        <Row gutter={[8, 8]} className="mt-2">
          {productsContext.payload?.products?.map((product, index) => {
            return <Card product={product} key={index}></Card>;
          })}
        </Row>
      )}
      <Pagination
        className="mt-4 text-center"
        current={productsContext.payload?.panigations?.currentPage}
        total={productsContext.payload?.panigations?.total}
        defaultPageSize="16"
        pageSizeOptions={["16", "32", "64"]}
        onChange={handleChangePage}
      />
    </section>
  );
}

export default MainContainer;
