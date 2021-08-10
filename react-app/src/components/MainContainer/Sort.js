import { TypesSuccess } from "../../constants/types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../untils/axiosClient";

function Sort() {
  const dispatch = useDispatch();
  const { filters, panigations } = useSelector((state) => state.products);

  const handleSort = async (e) => {
    try {
      const orderBy = e.target.value;
      const payload = {
        ...filters,
        _sort: "price",
        _order: orderBy,
      };
      if (!orderBy) {
        delete payload._order;
        delete payload._sort;
      }
      const { data } = await axiosClient.get("products", { params: payload });
      dispatch({
        type: TypesSuccess.SEARCH_PRODUCT_SUCCESS,
        payload: { products: data, filters: payload },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sort__container">
      <span className="sort-infor">
        {panigations?.total} results found in 123ms
      </span>
      <div className="sort-action">
        <span className="mr-2">Sort by</span>
        <select className="ais-sort-by-selector" onChange={handleSort}>
          {" "}
          <option className="ais-sort-by-selector--item" value="">
            Featured
          </option>
          <option className="ais-sort-by-selector--item" value="asc">
            Price asc.
          </option>
          <option className="ais-sort-by-selector--item" value="desc">
            Price desc.
          </option>
        </select>
      </div>
    </div>
  );
}

export default Sort;
