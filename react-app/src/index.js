import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
