import React from "react";
import { deleteCookie } from "../../helpers/cookies";
import { Navigate } from "react-router-dom";

const Logout = () => {
    deleteCookie("token");
  return <Navigate to="/" />;
}

export default Logout