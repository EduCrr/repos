import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Repositorio from "./Pages/Repositorio";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route
          exact
          path="/repositorio/:repositorio"
          component={Repositorio}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}
