import React from "react";
import { Switch, Route, Redirect } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ItemsPage from "./pages/ItemsPage";
import InvitePage from "./pages/InvitePage";
import ItemStatPage from "./pages/ItemStatPage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
import ConfirmInvitePage from "./pages/ConfirmInvitePage";
import CreateAPIKeyPage from "./pages/CreateAPIKeyPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => (
  <div className="ui container">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <GuestRoute exact path="/login" component={LoginPage} />
      <GuestRoute exact path="/login/resetPassword/:token" component={ResetPasswordPage} />
      <UserRoute path="/items" component={ItemsPage} />
      <UserRoute path="/itemStat/:itemId" component={ItemStatPage} />
      <UserRoute exact path="/invite" component={InvitePage} />
      <GuestRoute exact path="/invite/:token" component={ConfirmInvitePage} />
      <UserRoute path="/createAPIKey" component={CreateAPIKeyPage} />

      <Route // Always last route. Helps track 404
        render={({ staticContext }) => {
          if (staticContext) {
            staticContext.status = 404;
          }
          return <Redirect push to="/" />;
        }}
      />
    </Switch>
  </div>
);

export default App;
