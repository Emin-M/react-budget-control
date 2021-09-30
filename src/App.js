import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Main from "./components/Main";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Categories from "./components/Categories";
import CategoryAdd from "./components/CategoryAdd";
import Records from "./components/Records";
import NotFound from "./components/NotFound";
import RecordAdd from "./components/RecordAdd";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/register" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/category" exact component={Categories} />
        <PrivateRoute path="/newcategory" exact component={CategoryAdd} />
        <PrivateRoute path="/records" exact component={Records} />
        <PrivateRoute path="/newrecord" exact component={RecordAdd} />
        <Route component={NotFound} />
      </Switch>
      <div className="footer">
        <p> Expense Tracker </p>
      </div>
    </div>
  );
};

export default App;
