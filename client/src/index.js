import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import axios from "axios";
import dotenv from "dotenv";

import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
