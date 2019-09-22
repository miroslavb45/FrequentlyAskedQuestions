import React from "react";
import "./Header.css";
import logout from "../../assets/icons/logout.png";
import Auth from "../../authentication/Auth";
import { withRouter } from "react-router-dom";
import searchIcon from "../../assets/icons/search.png";

const Header = props => {
  const searchInputChangeHandler = e => {
    props.onFilterChange(e.target.value);
  };
  return (
    <header id="header">
      <div className="logoText">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="searchBar">
        <input onChange={searchInputChangeHandler}></input>
        <img src={searchIcon} alt="" />
      </div>

      <div className="userInfo">
        <span>Hi, {Auth.getActiveUser()}</span>
        <img
          src={logout}
          alt=""
          onClick={() => {
            props.history.push("/logout");
          }}
        />
      </div>
    </header>
  );
};

export default React.memo(withRouter(Header));
