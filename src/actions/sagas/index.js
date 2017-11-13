import * as watchAuth from "./auth";
import * as watchInvite from "./invite";
import * as watchItems from "./items";
import * as watchAPI from "./APIKey";

const watchers = { ...watchAuth, ...watchInvite, ...watchItems, ...watchAPI };

export default watchers;
