import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/questions">Questions</NavLink>
          </li>
          <li>
            <NavLink to={"/my-questions"}>My Questions</NavLink>
          </li>
          <li>
            <NavLink to={"/new-question"}>Create</NavLink>
          </li>
          <li>
            <NavLink to={"/logout"}>Logout</NavLink>
          </li>
         
        </ul>
      </nav>
    </header>
  );
};

export default Header;
