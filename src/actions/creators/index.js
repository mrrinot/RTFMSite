import * as authCreators from "./auth";
import * as inviteCreators from "./invite";
import * as itemsCreators from "./items";
import * as APICreators from "./APIKey";
import * as RecipesCreators from "./recipes";

const creators = {
  ...authCreators,
  ...itemsCreators,
  ...inviteCreators,
  ...APICreators,
  ...RecipesCreators,
};
export default creators;
