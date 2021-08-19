import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Main from "./components/Main";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Category from "./components/Category";
import CategoryAdd from "./components/CategoryAdd";
import Records from "./components/Records";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/register" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/category" exact component={Category} />
        <Route path="/newcategory" exact component={CategoryAdd} />
        <Route path="/records" exact component={Records} />
        <Route component={NotFound} />
      </Switch>
      <div className="footer">
        <p> Expense Tracker </p>
      </div>
    </div>
  );
};

export default App;
