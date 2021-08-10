import React, { useState } from "react";
import { TypesSuccess } from "../../constants/types";
import axiosClient from "../../untils/axiosClient";
import { useDispatch, useSelector } from "react-redux";

const listPrice = [
  { lable: "≤ 1", value: "1" },
  { lable: "$1 - 80", value: "1-80" },
  { lable: "$80 - 160", value: "80-160" },
  { lable: "$160 - 240", value: "160-240" },
  { lable: "$240 - 1.820", value: "240-1820" },
  { lable: "$1.820 - 3.400", value: "1820-3400" },
  { lable: "$3.400 - 4.980", value: "3400-4980" },
  { lable: "≥ $4.980", value: "4980" },
];

export default function FilterPrice() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [index, setIndex] = useState(null);

  const getProductsByPrice = async (price) => {
    if (price.lable.includes("≤")) {
      const payload = {
        ...filters,
        price_lte: price.value,
      };
      const products = await axiosClient.get("products", { params: payload });
      return {
        products: [...products.data],
        filters: payload,
      };
    } else if (price.lable.includes("≥")) {
      const payload = {
        ...filters,
        price_gte: price.value,
      };
      const products = await axiosClient.get("products", { params: payload });
      return {
        products: [...products.data],
        filters: payload,
      };
    } else {
      const smallValue = price.value.split("-")[0];
      const bigValue = price.value.split("-")[1];
      const payload = {
        ...filters,
        price_gte: smallValue,
        price_lte: bigValue,
      };
      const products = await axiosClient.get("products", { params: payload });
      return {
        products: [...products.data],
        filters: payload,
      };
    }
  };

  const clearFilterProductsByPrice = async () => {
    const payload = {
      price_gte: "0",
    };
    const products = await axiosClient.get("products", { params: payload });
    return {
      products: [...products.data],
      filters: payload,
    };
  };

  const handleSetActive = async (i, price) => {
    dispatch({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });
    try {
      if (i === index) {
        const { products, filters } = await clearFilterProductsByPrice();
        dispatch({
          type: TypesSuccess.FILTER_BY_RATING_SUCCESS,
          payload: { products, filters },
        });
        setIndex(null);
        return;
      }
      const { products, filters } = await getProductsByPrice(price);
      dispatch({
        type: TypesSuccess.FILTER_BY_RATING_SUCCESS,
        payload: { products, filters },
      });
      setIndex(i);
    } catch (error) {
      console.log(error);
    }
    setIndex(i);
  };

  const showListFilterPrice = (listPrice) => {
    return listPrice.map((price, i) => {
      return (
        <div
          className={index === i ? "price-item active" : "price-item"}
          key={i}
          onClick={() => handleSetActive(i, price)}
          data-value={price.value}
        >
          {price.lable}
        </div>
      );
    });
  };
  return <div className="price-block">{showListFilterPrice(listPrice)}</div>;
}
