import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import MainNavbar from "./MainNavbar";

const Main = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      history.push("/records");
    }
  }, []);
  return <MainNavbar />;
};

export default Main;
