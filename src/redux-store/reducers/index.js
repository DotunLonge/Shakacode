import auth from "./auth";
import { combineReducers } from "redux";
import admin from "./admin";
export default combineReducers({
  auth,
  admin
});
