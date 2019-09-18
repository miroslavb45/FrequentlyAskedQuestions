import React, { Component } from "react";
import QuestionsContext from "../../../context/QuestionsContext";
import Answer from "../Answer/Answer";
import Auth from "../../../authentication/Auth";
import uuidv1 from "uuid/v1";
import { Validations, isEditableByCurrentUser } from "../../../utils/Utils";

class QuestionView extends Component {
  static contextType = QuestionsContext;
  state = {
    currentQuestion: {
      answers: []
    },
    editing: false
  };

  render() {
    const isEditAllowed = isEditableByCurrentUser(
      this.state.currentQuestion.author
    );
    const isAuthorTheActiveUser = this.state.currentQuestion.author === Auth.getActiveUser();

    return (
      <div>
        <h1
          contentEditable={this.state.editing}
          onInput={this.titleChangeHandler}
          suppressContentEditableWarning={true}
        >
          {this.state.currentQuestion.title}
        </h1>

        <p>ID: {this.state.currentQuestion.id}</p>

        <p
          contentEditable={this.state.editing}
          onInput={this.contentChangeHandler}
          suppressContentEditableWarning={true}
        >
          {this.state.currentQuestion.content}
        </p>

        <p>Author: {this.state.currentQuestion.author}</p>
        <p>Create Date: {this.state.currentQuestion.createDate}</p>
        {isEditAllowed ? [
          <button key="editSaveButton" onClick={this.toggleEditingHandler}>
            {this.state.editing ? "Save" : "Edit"}
          </button>, <button key="deleteButton" onClick={this.deleteQuestion}>Delete</button>]
     : null}
    


        <br></br>
        <h1>Answers:</h1>

        {this.state.currentQuestion.answers.map(answer => {
          const isDeleteAllowed = isEditableByCurrentUser(answer.author);
          return (
            <Answer
              key={answer.id}
              id={answer.id}
              isDeleteAllowed={isDeleteAllowed}
              toggleCorrectAnswerButtonVisible={isAuthorTheActiveUser}
              content={answer.content}
              author={answer.author}
              onDelete={this.deleteAnswer}
              onUpdate={this.answerChangeHandler}
              questionId={this.state.currentQuestion.id}
              isCorrect={answer.isCorrect}
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

  titleChangeHandler = event => {
    const newTitle = event.target.innerText;
    this.setState({ newTitle });
  };

  contentChangeHandler = event => {
    const newContent = event.target.innerText;
    this.setState({ newContent });
  };

  toggleEditingHandler = () => {
    if (this.state.editing) {
      const newQuestion = { ...this.state.currentQuestion };
      newQuestion.title =
        this.state.newTitle !== undefined
          ? this.state.newTitle
          : newQuestion.title;
      newQuestion.content =
        this.state.newContent !== undefined
          ? this.state.newContent
          : newQuestion.content;
      this.context.updateQuestion(newQuestion);
      this.setState({
        editing: !this.state.editing,
        currentQuestion: newQuestion
      });
    } else {
      this.setState({ editing: !this.state.editing });
    }
  };

  answerChangeHandler = (answerId, answerContent) => {
    this.context.updateAnswer(
      this.state.currentQuestion.id,
      answerId,
      answerContent
    );
  };
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
    if (
      this.newAnswer &&
      Validations.notStartingWithSpace.test(this.newAnswer.content)
    ) {
      this.context.addNewAnswer(this.newAnswer);
      event.target.reset();
      this.newAnswer = null;
    } else {
      alert("Input validation failed!");
    }
  };

  deleteAnswer = id => {
    this.context.deleteAnswer(id, this.state.currentQuestion.id);
  };

  deleteQuestion = () => {
      this.context.deleteQuestion(this.state.currentQuestion.id);
      this.props.history.push('/questions');
  }
}

export default QuestionView;
