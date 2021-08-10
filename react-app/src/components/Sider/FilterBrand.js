import React, { useState } from "react";
import { TypesSuccess } from "../../constants/types";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../untils/axiosClient";

function FilterBrand() {
  const [totalProducts, setTotalProducts] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const dispatch = useDispatch();
  const filtersStore = useSelector((state) => state.products.filters);
  const { brands, allProducts } = useSelector((state) => state.products);
  const brandsShow = brands?.slice(0, 5);

  const getProductsByBrand = async (brand) => {
    const payload = { ...filtersStore, brand: brand };
    const products = await axiosClient.get("products", { params: payload });
    setTotalProducts([...totalProducts, ...products.data]);
    return {
      products: [...totalProducts, ...products.data],
      filters: payload,
    };
  };

  const clearBrand = async () => {
    const payload = { ...filtersStore };
    const products = await axiosClient.get("products", { params: payload });
    return {
      products: [...products.data],
    };
  };

  const handleFilterBrand = async (typeFilter) => {
    dispatch({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });
    try {
      if (typeFilter.checked) {
        let listBrandChecked = listBrand;
        listBrandChecked.pop();
        const products = allProducts.filter(
          (product) => product.brand !== typeFilter.type
        );
        const filters = filtersStore;
        if (listBrand.length > 0) {
          filters.brand = listBrand[listBrand.length - 1].brand;
        } else delete filters.brand;
        setListBrand(listBrandChecked);
        setTotalProducts(products);
        if (listBrand.length > 0) {
          dispatch({
            type: TypesSuccess.FILTER_BY_BRAND_SUCCESS,
            payload: { products, filters, typeFilter },
          });
        } else {
          const { products } = await clearBrand();
          dispatch({
            type: TypesSuccess.FILTER_BY_TYPE_SUCCESS,
            payload: { products, filters, typeFilter },
          });
        }
        return;
      }
      setListBrand([...listBrand, typeFilter]);
      const { products, filters } = await getProductsByBrand(typeFilter.type);
      dispatch({
        type: TypesSuccess.FILTER_BY_BRAND_SUCCESS,
        payload: { products, filters, typeFilter },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const mapListBrand = (data) => {
    return data.map((dataItem, index) => {
      return (
        <div
          className="block-brand__list"
          key={index}
          onClick={() => handleFilterBrand(dataItem)}
        >
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

  return <div className="block-brand">{mapListBrand(brandsShow)}</div>;
}

export default FilterBrand;
