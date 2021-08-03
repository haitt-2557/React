import { TypesSuccess } from "../../constants/types";
import {
  getCategories,
  getCategoriesLv1,
  getCategoriesLv2,
} from "../../untils/service";

const initialState = {
  allProducts: [],
  products: [],
  filters: {},
  isFilter: false,
  isLoading: false,
  showResultFor: [],
  types: [],
  brands: [],
  panigations: {
    currentPage: 1,
    total: 1,
    size: 16,
  },
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TypesSuccess.GET_ALL_PRODUCT_SUCCESS: {
      const { categories, types, brands } = getCategories(
        action.payload.products
      );
      state = {
        ...state,
        allProducts: action.payload.products,
        isLoading: false,
        filters: {},
        types: types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.productsInPage,
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.GET_CATEGORIES_LVL_0_SUCCESS: {
      const { categories, types, brands } = getCategoriesLv1(
        action.payload.products,
        state.showResultFor,
        action.payload.category
      );
      state = {
        ...state,
        allProducts: action.payload.products,
        filters: { ...state.filters, ...action.payload.filters },
        isFilter: true,
        isLoading: false,
        types: types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.productsInPage,
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.CLEAR_FILTER_CATEGORIES_LV0_SUCCESS: {
      const { categories, types, brands } = getCategories(
        action.payload.products
      );
      state = {
        ...state,
        allProducts: action.payload.products,
        filters: { ...action.payload.filters },
        isLoading: false,
        types: types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.productsInPage,
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.GET_CATEGORIES_LVL_1_SUCCESS: {
      const { categories, types, brands } = getCategoriesLv2(
        action.payload.products,
        state.showResultFor,
        action.payload.category
      );
      state = {
        ...state,
        allProducts: action.payload.products,
        filters: { ...state.filters, ...action.payload.filters },
        isFilter: true,
        isLoading: false,
        types: types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.productsInPage,
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.FILTER_BY_TYPE_SUCCESS: {
      const { categories, brands } = getCategories(action.payload.products);
      const indexActiveType = state.types.findIndex(
        (type) => type.type === action.payload.typeFilter.type
      );
      state.types[indexActiveType] = {
        ...state.types[indexActiveType],
        checked: !action.payload.typeFilter.checked,
      };
      state = {
        ...state,
        allProducts: action.payload.products,
        filters: { ...action.payload.filters },
        isLoading: false,
        types: state.types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.products.slice(0, 16),
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.FILTER_BY_BRAND_SUCCESS: {
      const { categories, types } = getCategories(action.payload.products);
      const indexActiveType = state.brands.findIndex(
        (brand) => brand.type === action.payload.typeFilter.type
      );
      state.brands[indexActiveType] = {
        ...state.brands[indexActiveType],
        checked: !action.payload.typeFilter.checked,
      };
      state = {
        ...state,
        allProducts: action.payload.products,
        filters: { ...action.payload.filters },
        isLoading: false,
        types: types,
        brands: state.brands,
        showResultFor: categories,
        products: action.payload.products.slice(0, 16),
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.FILTER_BY_RATING_SUCCESS: {
      const { categories, types, brands } = getCategories(
        action.payload.products
      );
      state = {
        ...state,
        allProducts: action.payload.products,
        filters: { ...action.payload.filters },
        isLoading: false,
        types: types,
        brands: brands,
        showResultFor: categories,
        products: action.payload.products.slice(0, 16),
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.SEARCH_PRODUCT_SUCCESS: {
      state = {
        ...state,
        allProducts: action.payload.products,
        filters: { ...action.payload.filters },
        isLoading: false,
        products: action.payload.products.slice(0, 16),
        panigations: {
          currentPage: 1,
          total: action.payload.products?.length,
          size: 16,
        },
      };
      return { ...state };
    }
    case TypesSuccess.CHANGE_CURRENT_PAGE_SUCCESS: {
      state = {
        ...state,
        isLoading: false,
        products: action.payload.productsInPage,
        panigations: {
          ...state.panigations,
          currentPage: action.payload.currentPage,
          size: action.payload.size,
        },
      };
      return state;
    }
    case TypesSuccess.SET_IS_LOADING_SUCCESS: {
      return { ...state, isLoading: true };
    }
    default:
      return state;
  }
};
