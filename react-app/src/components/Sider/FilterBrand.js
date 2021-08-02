import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/context/context";

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
  const brandsShow = productsContext.payload?.brands?.slice(0, 5);
  const mapListBrand = (data) => {
    return data.map((dataItem, index) => {
      return (
        <div className="block-brand__list" key={index}>
          <input
            className="mr-2"
            type="checkbox"
            defaultChecked={dataItem.checked}
          />
          {`${dataItem.type} (${dataItem.quantity})`}
        </div>
      );
    });
  };

  return <div className="block-brand">{mapListBrand(brandsShow)}</div>;
}

export default FilterBrand;
