import React from "react";
import { Link } from "react-router-dom";
const AnonUser = () => {
  return (
  
      <>
      <li>
        <Link to="/auth/register">Register</Link>
      </li>
      <li>
        <Link to="/auth/Login">Login</Link>
      </li>
     
   </>
  );
};

export default AnonUser;