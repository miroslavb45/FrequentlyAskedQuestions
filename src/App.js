import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import QuestionsRouter from "./components/Questions/QuestionsRouter";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Auth from './authentication/Auth';
import ProtectedRoute from './authentication/ProtectedRoute';



class FrequentlyAskedQuestions extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route path="/login" exact component={Login}/>
          <QuestionsRouter/>
        </div>
      
      </BrowserRouter>
    );
  }
}

export default FrequentlyAskedQuestions;
