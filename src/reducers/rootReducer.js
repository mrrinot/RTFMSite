import { combineReducers } from "redux";
import login from "./login";
import items from "./items";
import invite from "./invite";

export default combineReducers({ login, items, invite });
