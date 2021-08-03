import { Types } from "../../constants/types";

export const getListCategoryLv0 = (category, filters) => {
  return {
    type: Types.GET_CATEGORIES_LVL_0,
    payload: {
      category: category,
      filtersAction: { ...filters },
    },
  };
};

export const actGetListCategoryLv1 = (category, filters) => {
  return {
    type: Types.GET_CATEGORIES_LVL_1,
    payload: {
      category: category,
      filtersAction: { ...filters },
    },
  };
};

export const actClearProductByCategory = (category, filters) => {
  return {
    type: Types.CLEAR_FILTER_CATEGORIES_LV0,
    payload: {
      category: category,
      filtersAction: { ...filters },
    },
  };
};
