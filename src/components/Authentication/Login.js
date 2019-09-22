import React, { Component } from "react";
import userPlacholder from "../../assets/user-icon.png";
import dots from "../../assets/dots-png-3.png";
import questionMarkTop from "../../assets/question-mark-top-svg.svg";
import "./Login.css";
import Auth from "../../authentication/Auth";

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div style={{ backgroundImage: `url(${dots})` }} className="dots"></div>

        <div className="wrapper">
          <img src={userPlacholder} alt="" />
          <h1>Welcome</h1>

          <form>
            <span>
              <label>Username</label>
              <input type="text" onChange={this.usernameChangeHandler}></input>
            </span>
            <button
              onClick={e => {
                e.preventDefault();
                Auth.login(this.username, () => {
                  this.props.history.push("/questions");
                });
              }}
            >
              Login
            </button>
          </form>
        </div>
        <div className="bottom-line">
          <div
            className="question-mark-line"
            style={{ left: 0, width: "120px" }}
          >
            <div className="question-mark-bottom-part"></div>
            <img alt="" className="question-mark-top" src={questionMarkTop} />
          </div>
          <div
            className="question-mark-line"
            style={{ left: "160px", right: 0 }}
          ></div>
        </div>
      </div>
    );
  }

  usernameChangeHandler = event => {
    if (event.target.value.length < 15) {
      this.username = event.target.value;
    } else {
      alert("Username longer than 10 character!");
    }
  };
}
