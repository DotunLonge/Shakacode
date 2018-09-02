import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";

import store from "./redux-store";
import { Provider } from "react-redux";
import { verify } from "./redux-store/action-creators/auth";

store.dispatch(verify());

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
