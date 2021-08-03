import { all } from "@redux-saga/core/effects";
import productsSaga from "./products";

function* rootSaga() {
  yield all([...productsSaga]);
}

export default rootSaga;
