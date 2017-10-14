import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";
import InvitePage from "./pages/InvitePage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
import ConfirmInvitePage from "./pages/ConfirmInvitePage";

const App = () => (
  <div className="ui container">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <GuestRoute path="/login" component={LoginPage} />
      <UserRoute path="/items" component={ItemPage} />
      <UserRoute exact path="/invite" component={InvitePage} />
      <GuestRoute exact path="/invite/:token" component={ConfirmInvitePage} />

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
