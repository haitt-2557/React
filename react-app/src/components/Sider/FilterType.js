import React, { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/context/context";
import axiosClient from "../../untils/axiosClient";
import { Types } from "../../constants/types";
const mockData = [
  {
    type: "Trend cases",
    quantity: 12,
    checked: false,
  },
  {
    type: "Ult protection cases",
    quantity: 12,
    checked: false,
  },
  {
    type: "Ink cartridges",
    quantity: 12,
    checked: false,
  },
  {
    type: "Business cases",
    quantity: 12,
    checked: false,
  },
  {
    type: "Connectivity",
    quantity: 12,
    checked: true,
  },
];

function FilterType() {
  const productsContext = useContext(ProductsContext);
  const [totalProducts, setTotalProducts] = useState([]);
  console.log(productsContext.payload?.types);
  const [listType, setListType] = useState([]);

  const getProductsByType = async (type) => {
    const payload = { ...productsContext.payload.filters, type: type };
    const products = await axiosClient.get("products", { params: payload });
    setTotalProducts([...totalProducts, ...products.data]);
    return {
      products: [...totalProducts, ...products.data],
      filters: payload,
    };
  };

  const clearType = async () => {
    const payload = { ...productsContext.payload.filters };
    const products = await axiosClient.get("products", { params: payload });
    setTotalProducts([...products.data]);
    return {
      products: [...products.data],
    };
  };

  const handleFilterType = async (typeFilter) => {
    productsContext.dispatch({
      type: Types.SET_IS_LOADING,
    });
    try {
      if (typeFilter.checked) {
        let listTypeChecked = listType;
        listTypeChecked.pop();
        const products = productsContext.payload.allProducts.filter(
          (product) => product.type !== typeFilter.type
        );
        const filters = productsContext.payload.filters;
        if (listType.length > 0) {
          filters.type = listType[listType.length - 1].type;
        } else delete filters.type;
        setListType(listTypeChecked);
        setTotalProducts(products);
        if (listType.length > 0) {
          productsContext.dispatch({
            type: Types.FILTER_BY_TYPE,
            payload: { products, filters, typeFilter },
          });
        } else {
          const { products } = await clearType();
          productsContext.dispatch({
            type: Types.FILTER_BY_TYPE,
            payload: { products, filters, typeFilter },
          });
        }
        return;
      }
      setListType([...listType, typeFilter]);
      const { products, filters } = await getProductsByType(typeFilter.type);
      productsContext.dispatch({
        type: Types.FILTER_BY_TYPE,
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
            checked={dataItem?.checked}
            readOnly
          />
          {`${dataItem.type} (${dataItem.quantity})`}{" "}
        </div>
      );
    });
  };

  return (
    <div className="block-type">
      {mapListType(productsContext.payload?.types)}
    </div>
  );
}

export default FilterType;
