import { combineReducers } from "redux";
import login from "./login";
import items from "./items";

export default combineReducers({ login, items });
