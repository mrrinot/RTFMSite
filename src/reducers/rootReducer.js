import { combineReducers } from "redux";
import login from "./login";
import items from "./items";
import invite from "./invite";
import APIKey from "./APIKey";
import loading from "./loading";
import itemStat from "./itemStat";
import metaData from "./metaData";
import itemDescEffects from "./itemDescEffects";

export default combineReducers({
  login,
  items,
  invite,
  APIKey,
  loading,
  itemStat,
  metaData,
  itemDescEffects,
});
