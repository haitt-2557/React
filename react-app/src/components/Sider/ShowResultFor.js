import React, { useContext } from "react";
import { Types } from "../../constants/types";
import { ProductsContext } from "../../contexts/context/context";
import axiosClient from "../../untils/axiosClient";

const mockData = [
  {
    name: "Appliances",
    level: 0,
    isActive: true,
    children: [
      {
        name: "Dishwashers",
        level: 1,
        isActive: true,
        children: [
          {
            name: "Dishwashers 2",
            isActive: true,
            level: 2,
          },
        ],
      },
      {
        name: "item 2",
        isActive: false,
        level: 1,
      },
      {
        name: "item 3",
        isActive: false,
        level: 1,
      },
    ],
  },
  {
    name: "Appliances 2",
    isActive: false,
    level: 0,
  },
];

function ShowResultFor() {
  const productsContext = useContext(ProductsContext);

  const getProductsByCategory = async (category) => {
    const payload = {
      categories_like: category,
    };
    const products = await axiosClient.get("products", {
      params: { ...productsContext.payload.filters, ...payload },
    });
    const productsInPage = await axiosClient.get("products", {
      params: { ...payload, _limit: 16, _page: 1 },
    });
    return {
      products: products?.data,
      productsInPage: productsInPage?.data,
      filters: { ...productsContext.payload?.filters, ...payload },
    };
  };

  const clearProductByCategory = async () => {
    const payload = { ...productsContext.payload.filters };
    delete payload.categories_like;
    const products = await axiosClient.get("products", {
      params: payload,
    });
    const productsInPage = await axiosClient.get("products", {
      params: { ...payload, _limit: 16, _page: 1 },
    });
    return {
      products: products?.data,
      productsInPage: productsInPage?.data,
      filters: { ...payload },
    };
  };

  const handleClickCategory = async (category) => {
    productsContext.dispatch({
      type: Types.SET_IS_LOADING,
    });
    try {
      switch (category.level) {
        case 0: {
          if (category.isActive) {
            const { products, productsInPage, filters } =
              await clearProductByCategory();
            productsContext.dispatch({
              type: Types.CLEAR_FILTER_CATEGORIES_LV0,
              payload: { products, productsInPage, category, filters },
            });
            return;
          }
          const { products, productsInPage, filters } =
            await getProductsByCategory(category.name);

          productsContext.dispatch({
            type: Types.GET_CATEGORIES_LVL_0,
            payload: { products, productsInPage, category, filters },
          });
          return;
        }
        default:
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mapListRefine = (data, margin) => {
    return data.map((dataItem, index) => {
      return (
        <div className={`refine-block__list ml-${margin}`} key={index}>
          <i className="fas fa-angle-right mr-1 fw-4"></i>
          <span
            className={`refine-block__text ${
              dataItem.isActive ? "active" : ""
            }`}
            onClick={() => handleClickCategory(dataItem)}
          >
            {dataItem.name}
          </span>
          {dataItem.children && mapListRefine(dataItem.children, 3)}
        </div>
      );
    });
  };
  return (
    <div className="refine-block">
      {mapListRefine(productsContext.payload?.showResultFor, 0)}
    </div>
  );
}

export default ShowResultFor;
