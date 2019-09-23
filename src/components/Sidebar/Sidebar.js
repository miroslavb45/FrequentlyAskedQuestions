import React from "react";
import "./Sidebar.css";
import menuIcon from "../../assets/icons/menu-icon.png";
import addNewIcon from "../../assets/icons/new-question.png";
import questionsIcon from "../../assets/icons/questions.png";
import ownQuestionsIcon from "../../assets/icons/own-icon.png";
import { withRouter } from "react-router-dom";

import { NavLink } from "react-router-dom";

const Sidebar = props => {
  const sidebarRef = React.createRef();
  const content = React.createRef();
  const sidebarClosedWidth = "41px";
  const sidebarOpenedWidth = "160px";

  if (props.location.pathname.match(/login/)) return null;

  const toggleSidebar = () => {
    if (
      sidebarRef.current.style.width === sidebarClosedWidth ||
      sidebarRef.current.style.width === ""
    ) {
      sidebarRef.current.style.width = sidebarOpenedWidth;
      content.current.style.marginLeft = sidebarOpenedWidth;
      document.getElementById("header").style.left = sidebarOpenedWidth;
    } else {
      sidebarRef.current.style.width = sidebarClosedWidth;
      content.current.style.marginLeft = sidebarClosedWidth;
      document.getElementById("header").style.left = sidebarClosedWidth;
    }
  };
  return (
    <div className="Sidebar">
      <div ref={sidebarRef} id="mySidebar" className="sidebar">
        <span id="menu" onClick={toggleSidebar}>
          <img alt="" src={menuIcon} />
        </span>

        <NavLink to="/new-question">
          <span>
            <img alt="" src={addNewIcon} />
            <label style={{ top: "3px" }}>New Question</label>
          </span>
        </NavLink>
        <NavLink to="/questions">
          <span>
            <img alt="" src={questionsIcon} />
            <label style={{ top: "1px", marginLeft: "16.6px" }}>
              Questions
            </label>
          </span>
        </NavLink>
        <NavLink to="/my-questions">
          <span>
            <img alt="" src={ownQuestionsIcon} />
            <label style={{ top: "1px", marginLeft: "15px" }}>
              My Questions
            </label>
          </span>
        </NavLink>
      </div>

      <div ref={content} id="main">
        {props.children}
      </div>
    </div>
  );
};

export default React.memo(withRouter(Sidebar));
