import React, { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/context/context";
import { Types } from "../../constants/types";
import axiosClient from "../../untils/axiosClient";
import { showRating } from "../Card/";

export default function FilterRating() {
  const [index, setIndex] = useState(null);
  const productsContext = useContext(ProductsContext);

  const getProductsByRating = async (rating) => {
    const payload = { ...productsContext.payload.filters, rating_gte: rating };
    const products = await axiosClient.get("products", { params: payload });
    return {
      products: [...products.data],
      filters: payload,
    };
  };

  const handleClickRating = async (i) => {
    productsContext.dispatch({
      type: Types.SET_IS_LOADING,
    });
    try {
      if (i === index) {
        const { products, filters } = await getProductsByRating(1);
        productsContext.dispatch({
          type: Types.FILTER_BY_RATING,
          payload: { products, filters },
        });
        setIndex(null);
        return;
      }
      const { products, filters } = await getProductsByRating(i);
      productsContext.dispatch({
        type: Types.FILTER_BY_RATING,
        payload: { products, filters },
      });
      setIndex(i);
    } catch (error) {
      console.log(error);
    }
    setIndex(i);
  };

  const showListFilterRate = () => {
    const result = [];
    for (let i = 4; i > 0; i--) {
      const className = `list-rating ${index === i ? "active" : ""}`;
      result.push(
        <div className={className} onClick={() => handleClickRating(i)} key={i}>
          {showRating(i)}
          <span className="list-rating__text"> & Up number</span>
        </div>
      );
    }
    return result;
  };

  return <div className="rating-block">{showListFilterRate()}</div>;
}
