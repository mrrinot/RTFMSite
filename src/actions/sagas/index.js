import * as watchLogin from "./login";
import * as watchInvite from "./invite";
import * as watchItems from "./items";

const watchers = { ...watchLogin, ...watchInvite, ...watchItems };
export default watchers;
