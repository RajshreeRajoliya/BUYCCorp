import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { errorAlert } from "../Components/Reusable";

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((store) => store.auth);

  //this is private route component which means  if auth from redux is false it and user is trying to go to the 
  // the children component of private route and it will redirect back to login page and throw an alert regarding it
  
  if (!auth) {
    errorAlert("Login Now To add New Deals");
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
