import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/context/context";
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
  console.log(productsContext.payload?.types);
  const mapListType = (data) => {
    return data.map((dataItem, index) => {
      return (
        <div className="block-type__list" key={index}>
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

  return (
    <div className="block-type">
      {mapListType(productsContext.payload?.types)}
    </div>
  );
}

export default FilterType;
