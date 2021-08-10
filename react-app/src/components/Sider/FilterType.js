import React, { useState } from "react";
import { TypesSuccess } from "../../constants/types";
import axiosClient from "../../untils/axiosClient";
import { useDispatch, useSelector } from "react-redux";

function FilterType() {
  const [totalProducts, setTotalProducts] = useState([]);
  const [listType, setListType] = useState([]);
  const { allProducts, types } = useSelector((state) => state.products);
  const filtersStore = useSelector((state) => state.products.filters);
  const dispatch = useDispatch();

  const getProductsByType = async (type) => {
    const payload = { filtersStore, type: type };
    const products = await axiosClient.get("products", { params: payload });
    setTotalProducts([...totalProducts, ...products.data]);
    return {
      products: [...totalProducts, ...products.data],
      filters: payload,
    };
  };

  const clearType = async () => {
    const payload = { filtersStore };
    const products = await axiosClient.get("products", { params: payload });
    return {
      products: [...products.data],
    };
  };

  const handleFilterType = async (typeFilter) => {
    dispatch({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });
    try {
      if (typeFilter.checked) {
        let listTypeChecked = listType;
        listTypeChecked.pop();
        const products = allProducts.filter(
          (product) => product.type !== typeFilter.type
        );
        const filters = filtersStore;
        if (listType.length > 0) {
          filters.type = listType[listType.length - 1].type;
        } else delete filters.type;
        setListType(listTypeChecked);
        setTotalProducts(products);
        if (listType.length > 0) {
          dispatch({
            type: TypesSuccess.FILTER_BY_TYPE_SUCCESS,
            payload: { products, filters, typeFilter },
          });
        } else {
          const { products } = await clearType();
          dispatch({
            type: TypesSuccess.FILTER_BY_TYPE_SUCCESS,
            payload: { products, filters, typeFilter },
          });
        }
        return;
      }
      setListType([...listType, typeFilter]);
      const { products, filters } = await getProductsByType(typeFilter.type);
      dispatch({
        type: TypesSuccess.FILTER_BY_TYPE_SUCCESS,
        payload: { products, filters, typeFilter },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const mapListType = (data) => {
    return data.map((dataItem, index) => {
      return (
        <div
          className="block-type__list"
          key={index}
          onClick={() => handleFilterType(dataItem)}
        >
          {" "}
          <input
            className="mr-2"
            type="checkbox"
            defaultChecked={dataItem.checked}
          />
          {`${dataItem.type} (${dataItem.quantity})`}{" "}
        </div>
      );
    });
  };
  return <div className="block-type">{mapListType(types)}</div>;
}

export default FilterType;
