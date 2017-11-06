import React from "react";
import { Switch, Redirect } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ItemsPage from "./pages/ItemsPage";
import InvitePage from "./pages/InvitePage";
import ItemStatPage from "./pages/ItemStatPage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
import LayoutRoute from "./routes/LayoutRoute";
import ConfirmInvitePage from "./pages/ConfirmInvitePage";
import CreateAPIKeyPage from "./pages/CreateAPIKeyPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => (
  <div className="ui container">
    <Switch>
      <LayoutRoute exact path="/" component={HomePage} />
      <GuestRoute exact path="/login" component={LoginPage} />
      <GuestRoute exact path="/login/resetPassword/:token" component={ResetPasswordPage} />
      <UserRoute path="/items" component={ItemsPage} />
      <UserRoute path="/itemStat/:itemId" component={ItemStatPage} />
      <UserRoute exact path="/invite" component={InvitePage} />
      <GuestRoute exact path="/invite/:token" component={ConfirmInvitePage} />
      <UserRoute path="/createAPIKey" component={CreateAPIKeyPage} />
    </Switch>
  </div>
);

export default App;
