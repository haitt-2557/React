import React from "react";
import { Pagination, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import Sort from "./Sort";
import { TypesSuccess } from "../../constants/types";
import "./style.scss";

function MainContainer() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.products.isLoading);
  const products = useSelector((state) => state.products.products);
  const panigations = useSelector((state) => state.products.panigations);
  const allProducts = useSelector((state) => state.products.allProducts);

  const handleChangePage = async (current, size) => {
    dispatch({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });

    const data = allProducts.slice(current * size - size, current * size);
    dispatch({
      type: TypesSuccess.CHANGE_CURRENT_PAGE_SUCCESS,
      payload: {
        productsInPage: data,
        currentPage: current,
        size: size,
      },
    });
  };

  return (
    <section id="main-content">
      <Sort />
      {isLoading ? (
        <Spin className="spin__antd" size="large" />
      ) : (
        <Row gutter={[8, 8]} className="mt-2">
          {products.length === 0
            ? "Không tìm thấy sản phẩm phù hợp"
            : products?.map((product, index) => {
                return <Card product={product} key={index}></Card>;
              })}
        </Row>
      )}
      <Pagination
        className="mt-4 text-center"
        current={panigations?.currentPage}
        total={panigations?.total}
        defaultPageSize="16"
        pageSizeOptions={["16", "32", "64"]}
        onChange={handleChangePage}
      />
    </section>
  );
}

export default MainContainer;
