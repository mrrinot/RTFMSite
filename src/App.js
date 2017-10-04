import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router";
import HomePage from "./components/HomePage";
import ItemPage from "./components/ItemPage";

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/items" component={ItemPage} />
  </Switch>
);

export default App;
