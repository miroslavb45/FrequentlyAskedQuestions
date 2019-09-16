import React, { Component } from "react";
import QuestionsContext from "../../../context/QuestionsContext";

class QuestionView extends Component {
  static contextType = QuestionsContext;
  state = {
    currentQuestion: {}
  };

  render() {
    return (
      <div>
        <p>ID: {this.state.currentQuestion.id}</p>
        <p>Title: {this.state.currentQuestion.title}</p>
        <p>Content. {this.state.currentQuestion.content}</p>
        {/* <p>Author: {this.state.currentQuestion.author.displayName}</p> */}
        <p>Create Date: {this.state.currentQuestion.createDate}</p>
      </div>
    );
  }

  componentDidMount() {
    this.loadQuestion();
  }

  loadQuestion() {
    const id = this.props.match.params.id;
    this.setState({ currentQuestion: this.context.getQuestion(id) });
  }
}

export default QuestionView;
