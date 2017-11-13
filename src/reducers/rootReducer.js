import { combineReducers } from "redux";
import auth from "./auth";
import items from "./items";
import invite from "./invite";
import APIKey from "./APIKey";
import itemStat from "./itemStat";
import metaData from "./metaData";
import itemDescEffects from "./itemDescEffects";

export default combineReducers({
  auth,
  items,
  invite,
  APIKey,
  itemStat,
  metaData,
  itemDescEffects,
});
