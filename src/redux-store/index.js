import { createStore, compose, applyMiddleware } from "redux";
import mainReducer from "./reducers";
import thunk from "redux-thunk";

export default createStore(
  mainReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
