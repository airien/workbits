import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./home";

import Artister from "./artister";

import Artist from "./artist";

import Info from "./info";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Artister} />
      <Route exact path="/artister" component={Artister} />
      <Route exact path="/info" component={Info} />
      <Route path="/artist/:artistid" component={Artist} />
    </Switch>
  </main>
);

export default Main;
