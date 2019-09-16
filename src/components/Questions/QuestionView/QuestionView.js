import React, { Component } from "react";
import QuestionsContext from "../../../context/QuestionsContext";
import Answer from "../Answer/Answer";
import Auth from "../../../authentication/Auth";
import uuidv1 from "uuid/v1";
import Validations from '../../../utils/Utils';

class QuestionView extends Component {
  static contextType = QuestionsContext;
  state = {
    currentQuestion: {
      answers: []
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.currentQuestion.title}</h1>
        <p>ID: {this.state.currentQuestion.id}</p>
        <p>Content. {this.state.currentQuestion.content}</p>
        <p>Author: {this.state.currentQuestion.author}</p>
        <p>Create Date: {this.state.currentQuestion.createDate}</p>

        <br></br>
        <h1>Answers:</h1>

        {this.state.currentQuestion.answers.map(answer => {
          return (
            <Answer
              key={answer.id}
              id={answer.id}
              content={answer.content}
              author={answer.author}
              onDelete={this.deleteAnswer}
            />
          );
        })}
        <br></br>
        <h1>Submit an answer:</h1>
        <form onSubmit={this.submitNewAnswer}>
          <input type="text" onChange={this.newAnswerInputChangeHandler} />
          <button type="submit">Add new answer</button>
        </form>
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

  newAnswerInputChangeHandler = event => {
    this.newAnswer = {
      author: Auth.getActiveUser(),
      id: uuidv1(),
      content: event.target.value,
      questionId: this.state.currentQuestion.id
    };
  };

  submitNewAnswer = event => {
    event.preventDefault();
    if (this.newAnswer && Validations.notStartingWithSpace.test(this.newAnswer.content)) {
      this.context.addNewAnswer(this.newAnswer);
    }else{
        alert("Input validation failed!")
    }
  };

  deleteAnswer = id => {
    this.context.deleteAnswer(id, this.state.currentQuestion.id);
  };
}

export default QuestionView;
