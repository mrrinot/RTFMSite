import * as authCreators from "./auth";
import * as inviteCreators from "./invite";
import * as itemsCreators from "./items";
import * as APICreators from "./APIKey";

const creators = {
  ...authCreators,
  ...itemsCreators,
  ...inviteCreators,
  ...APICreators,
};
export default creators;
