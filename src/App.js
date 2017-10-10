import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ItemPage from "./pages/ItemPage";

const App = () => (
  <div className="ui container">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/items" component={ItemPage} />
    </Switch>
  </div>
);

export default App;
