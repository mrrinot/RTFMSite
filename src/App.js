import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";

const App = () => (
  <div className="ui container">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <GuestRoute path="/login" component={LoginPage} />
      <UserRoute path="/items" component={ItemPage} />
    </Switch>
  </div>
);

export default App;
