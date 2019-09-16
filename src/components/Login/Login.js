import React, { Component } from "react";
import userPlacholder from "../../assets/placeholder-user.png";
import "./Login.css";
import Auth from "../../authentication/Auth";

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="wrapper">
          <img src={userPlacholder} alt="" />
          <h1>Welcome</h1>

          <span>
            <label>Username</label>
            <input type="text" onChange={this.usernameChangeHandler}></input>
          </span>
          <button
            onClick={() => {
              Auth.login(this.username, () => {
                this.props.history.push("/questions");
              });
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  usernameChangeHandler = (event) =>{
      this.username = event.target.value;
  }
}
