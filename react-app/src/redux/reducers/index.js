import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";

const appReducers = combineReducers({
  products: productsReducer,
});

export default appReducers;
