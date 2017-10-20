import * as loginCreators from "./login";
import * as inviteCreators from "./invite";
import * as itemsCreators from "./items";
import * as APICreators from "./APIKey";

const creators = {
  ...loginCreators,
  ...itemsCreators,
  ...inviteCreators,
  ...APICreators,
};
export default creators;
