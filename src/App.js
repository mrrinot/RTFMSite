import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/items" component={ItemPage} />
  </Switch>
);

export default App;
