import * as loginCreators from "./login.js";
import * as inviteCreators from "./invite.js";
import * as itemsCreators from "./items.js";

const creators = { ...loginCreators, ...itemsCreators, ...inviteCreators };
export default creators;
