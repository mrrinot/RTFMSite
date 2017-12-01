import * as watchAuth from "./auth";
import * as watchInvite from "./invite";
import * as watchItems from "./items";
import * as watchAPI from "./APIKey";
import * as watchRecipes from "./recipes";

const watchers = { ...watchAuth, ...watchInvite, ...watchItems, ...watchAPI, ...watchRecipes };

export default watchers;
