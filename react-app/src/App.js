import React, { useReducer } from "react";
import MainContainer from "../src/components/MainContainer";
import MainLayout from "../src/layouts/MainLayout";
import { ProductsContext } from "./contexts/context/context";
import { productsReducer } from "./contexts/reducers/productsReducer";

const initialState = {
  products: [],
  allProducts: [],
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

function App() {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  return (
    <div className="App">
      <ProductsContext.Provider value={{ payload: state, dispatch: dispatch }}>
        <MainLayout>
          <MainContainer />
        </MainLayout>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
