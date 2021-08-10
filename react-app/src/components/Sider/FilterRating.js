import React, { useState } from "react";
import { showRating } from "../Card/";
import { TypesSuccess } from "../../constants/types";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../untils/axiosClient";

export default function FilterRating() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [index, setIndex] = useState(null);

  const getProductsByRating = async (rating) => {
    const payload = { ...filters, rating_gte: rating };
    const products = await axiosClient.get("products", { params: payload });
    return {
      products: [...products.data],
      filters: payload,
    };
  };

  const handleClickRating = async (i) => {
    dispatch({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });
    try {
      if (i === index) {
        const { products, filters } = await getProductsByRating(1);
        dispatch({
          type: TypesSuccess.FILTER_BY_RATING_SUCCESS,
          payload: { products, filters },
        });
        setIndex(null);
        return;
      }
      const { products, filters } = await getProductsByRating(i);
      dispatch({
        type: TypesSuccess.FILTER_BY_RATING_SUCCESS,
        payload: { products, filters },
      });
      setIndex(i);
    } catch (error) {
      console.log(error);
      setIndex(i);
    }
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
