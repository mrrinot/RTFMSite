import * as watchLogin from "./login";
import * as watchInvite from "./invite";
import * as watchItems from "./items";
import * as watchAPI from "./APIKey";

const watchers = { ...watchLogin, ...watchInvite, ...watchItems, ...watchAPI };

export default watchers;
