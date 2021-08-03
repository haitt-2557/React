import React, { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/context/context";
import { Types } from "../../constants/types";
import axiosClient from "../../untils/axiosClient";

const mockData = [
  {
    type: "Insignia™",
    quantity: 746,
    checked: false,
  },
  {
    type: "Samsung",
    quantity: 746,
    checked: false,
  },
  {
    type: "Metra",
    quantity: 746,
    checked: false,
  },
  {
    type: "HP",
    quantity: 746,
    checked: false,
  },
  {
    type: "Apple",
    quantity: 746,
    checked: true,
  },
];

function FilterBrand() {
  const productsContext = useContext(ProductsContext);
  const [totalProducts, setTotalProducts] = useState([]);
  const brandsShow = productsContext.payload?.brands?.slice(0, 5);
  const [listBrand, setListBrand] = useState([]);

  const getProductsByBrand = async (brand) => {
    const payload = { ...productsContext.payload.filters, brand: brand };
    const products = await axiosClient.get("products", { params: payload });

    setTotalProducts([...totalProducts, ...products.data]);
    return {
      products: [...totalProducts, ...products.data],
      filters: payload,
    };
  };

  const clearBrand = async () => {
    const payload = { ...productsContext.payload.filters };
    const products = await axiosClient.get("products", { params: payload });
    return {
      products: [...products.data],
    };
  };

  const handleFilterBrand = async (typeFilter) => {
    productsContext.dispatch({
      type: Types.SET_IS_LOADING,
    });
    try {
      if (typeFilter.checked) {
        let listBrandChecked = listBrand;
        listBrandChecked.pop();
        const products = productsContext.payload.allProducts.filter(
          (product) => product.brand !== typeFilter.type
        );
        const filters = productsContext.payload.filters;
        if (listBrand.length > 0) {
          filters.brand = listBrand[listBrand.length - 1].brand;
        } else delete filters.brand;
        setListBrand(listBrandChecked);
        setTotalProducts(products);
        if (listBrand.length > 0) {
          productsContext.dispatch({
            type: Types.FILTER_BY_BRAND,
            payload: { products, filters, typeFilter },
          });
        } else {
          const { products } = await clearBrand();
          productsContext.dispatch({
            type: Types.FILTER_BY_TYPE,
            payload: { products, filters, typeFilter },
          });
        }
        return;
      }
      setListBrand([...listBrand, typeFilter]);
      const { products, filters } = await getProductsByBrand(typeFilter.type);
      productsContext.dispatch({
        type: Types.FILTER_BY_BRAND,
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
            checked={dataItem.checked}
            readOnly
          />
          {`${dataItem.type} (${dataItem.quantity})`}
        </div>
      );
    });
  };

  return <div className="block-brand">{mapListBrand(brandsShow)}</div>;
}

export default FilterBrand;
