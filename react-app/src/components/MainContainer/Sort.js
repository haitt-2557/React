import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/context/context";

function Sort() {
  const productsContext = useContext(ProductsContext);
  return (
    <div className="sort__container">
      <span className="sort-infor">
        {productsContext.payload?.panigations?.total} results found in 123ms
      </span>{" "}
      <div className="sort-action">
        <span className="mr-2">Sort by</span>
        <select className="ais-sort-by-selector">
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
