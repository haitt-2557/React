import React from "react";
import { TypesSuccess } from "../../constants/types";
import { useDispatch, useSelector } from "react-redux";

import {
  actClearProductByCategory,
  getListCategoryLv0,
  actGetListCategoryLv1,
} from "../../redux/actions/productsAction";

function ShowResultFor() {
  const dispatch = useDispatch();
  const showResultFor = useSelector((state) => state.products.showResultFor);
  const filters = useSelector((state) => state.products.filters);

  const handleClickCategory = async (category) => {
    dispatch({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });
    try {
      switch (category.level) {
        case 0: {
          if (category.isActive) {
            dispatch(actClearProductByCategory(category, filters));
            return;
          }
          dispatch(getListCategoryLv0(category, filters));
          return;
        }
        case 1: {
          dispatch(actGetListCategoryLv1(category, filters));
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
  return <div className="refine-block">{mapListRefine(showResultFor, 0)}</div>;
}

export default ShowResultFor;
