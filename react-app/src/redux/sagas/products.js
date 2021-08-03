import { Types, TypesSuccess } from "../../constants/types";
import { call, put, takeEvery, takeLeading } from "redux-saga/effects";
import axiosClient from "../../untils/axiosClient";

import {
  clearProductByCategory,
  getProductsByCategory,
} from "../../api/productsApi";

function* getProductInPage() {
  yield put({ type: TypesSuccess.SET_IS_LOADING_SUCCESS });
  try {
    const payload = {
      _limit: 16,
      _page: 1,
    };
    const resProducts = yield axiosClient.get("products");
    const { data } = yield axiosClient.get("products", {
      params: payload,
    });
    yield put({
      type: TypesSuccess.GET_ALL_PRODUCT_SUCCESS,
      payload: {
        products: resProducts.data,
        productsInPage: data,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function* getCategoryLv0({ payload }) {
  const { category, filtersAction } = payload;
  const { products, productsInPage, filters } = yield call(
    getProductsByCategory,
    category.name,
    filtersAction
  );

  yield put({
    type: TypesSuccess.GET_CATEGORIES_LVL_0_SUCCESS,
    payload: { products, productsInPage, category, filters },
  });
}

function* clearCategoryLv0({ payload }) {
  const { filtersAction, category } = payload;
  const { products, productsInPage, filters } = yield call(
    clearProductByCategory,
    filtersAction
  );
  yield put({
    type: TypesSuccess.CLEAR_FILTER_CATEGORIES_LV0_SUCCESS,
    payload: { products, productsInPage, category, filters },
  });
}

function* getCategoryLv1({ payload }) {
  const { filtersAction, category } = payload;
  const { products, productsInPage, filters } = yield call(
    getProductsByCategory,
    category.name,
    filtersAction
  );

  yield put({
    type: TypesSuccess.GET_CATEGORIES_LVL_1_SUCCESS,
    payload: { products, productsInPage, category, filters },
  });
}

function* watchGetCategoryLv1() {
  yield takeLeading(Types.GET_CATEGORIES_LVL_1, getCategoryLv1);
}

function* watchClearCategoryLv0() {
  yield takeLeading(Types.CLEAR_FILTER_CATEGORIES_LV0, clearCategoryLv0);
}

function* watchGetCategoryLv0() {
  yield takeLeading(Types.GET_CATEGORIES_LVL_0, getCategoryLv0);
}

function* watchGetProductsInPage() {
  yield takeEvery(Types.GET_ALL_PRODUCT, getProductInPage);
}

export default [
  watchGetProductsInPage(),
  watchGetCategoryLv0(),
  watchClearCategoryLv0(),
  watchGetCategoryLv1(),
];
