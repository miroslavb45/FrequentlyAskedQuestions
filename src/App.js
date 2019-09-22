import React, { Component } from "react";
import "./App.css";
import Login from "./components/Authentication/Login";
import Logout from "./components/Authentication/Logout";
import QuestionsRouter from "./components/Questions/QuestionsRouter";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import dots from "./assets/dots-png-3.png";

class FrequentlyAskedQuestions extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage: `url(${dots}), linear-gradient(45deg, #282c2d 0%,#181818 100%)`
        }}
      >
        <BrowserRouter>
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout}></Route>
          <QuestionsRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default FrequentlyAskedQuestions;
