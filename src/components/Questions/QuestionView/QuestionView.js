import React, { Component } from "react";
import QuestionsContext from "../../../context/QuestionsContext";
import Answer from "../Answer/Answer";
import Auth from "../../../authentication/Auth";
import uuidv1 from "uuid/v1";
import { Validations, isEditableByCurrentUser } from "../../../utils/Utils";
import "./QuestionView.css";
import answeredIcon from "../../../assets/icons/answered-icon.png";
import userIcon from "../../../assets/icons/user-icon.png";
import dateIcon from "../../../assets/icons/date-icon.png";
import answersIcon from "../../../assets/icons/answers-icon.png";
import deleteIcon from "../../../assets/icons/delete-icon.png";

import editIcon from "../../../assets/icons/edit-icon.png";
import saveIcon from "../../../assets/icons/save-icon.png";
import Editor from "../../Editor/Editor";

class QuestionView extends Component {
  static contextType = QuestionsContext;
  state = {
    currentQuestion: {
      answers: []
    },
    editing: false
  };
  questionEditor = React.createRef();
  answerEditor = React.createRef();

  render() {
    const isEditAllowed = isEditableByCurrentUser(
      this.state.currentQuestion.author
    );
    const isAuthorTheActiveUser =
      this.state.currentQuestion.author === Auth.getActiveUser();

    const isQuestionAnswered =
      this.state.currentQuestion.answers.filter(item => item.isCorrect).length >
      0;
    return (
      <div className="question-view-wrapper">
        <div className="question-wrapper">
          <div
            className="indicator"
            style={isQuestionAnswered ? { backgroundColor: "#33cc33" } : null}
          >
            {isQuestionAnswered ? <img src={answeredIcon} alt=""></img> : null}
          </div>
          <div className="content">
            <h2
              contentEditable={this.state.editing}
              onInput={this.titleChangeHandler}
              suppressContentEditableWarning={true}
            >
              {this.state.currentQuestion.title}
            </h2>
            <div className="contentWrapper">
              <Editor
                theme="bubble"
                ref={this.questionEditor}
                readOnly={!this.state.editing}
                editable={this.state.editing}
                onChange={this.contentChangeHandler}
              ></Editor>
            </div>
            <span className="correct-answer-label">
              {isQuestionAnswered ? "Question answered" : null}
            </span>
            {isEditAllowed ? (
              <div className="labels">
                <div
                  className={this.state.editing ? "save-button" : "edit-button"}
                  onClick={this.toggleEditingHandler}
                >
                  <img src={this.state.editing ? saveIcon : editIcon} alt="" />{" "}
                  <span>{this.state.editing ? "Save" : "Edit"}</span>
                </div>
                <div
                  className="delete-question-button"
                  onClick={this.deleteQuestion}
                >
                  <img src={deleteIcon} alt="" /> <span>Delete</span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="labels">
            <div className="answers-label">
              <img src={answersIcon} alt="" />
              <span>{this.state.currentQuestion.answers.length} Answer</span>
            </div>
            <div className="date-label">
              <img src={dateIcon} alt="" />
              <span>{this.state.currentQuestion.createDate}</span>
            </div>
            <div className="author-label">
              <img src={userIcon} alt="" />
              <span>{this.state.currentQuestion.author}</span>
            </div>
          </div>
        </div>

        <div className="answers-wrapper">
          {this.state.currentQuestion.answers.length > 0 ? (
            <h2>Answers</h2>
          ) : null}
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

          <div className="new-answer-wrapper">
            <div className="new-answer-label-wrapper">
              <h1>New Answer</h1>
            </div>
            <form onSubmit={this.submitNewAnswer}>
              <div className="new-answer-form-wrapper">
                <Editor theme="snow" ref={this.answerEditor}></Editor>
              </div>
              <input
                type="submit"
                value="Add new answer"
                id="add-answer-button"
              />
            </form>
          </div>
        </div>

        {/* <form onSubmit={this.submitNewAnswer}>
          <input type="text" onChange={this.newAnswerInputChangeHandler} />
          <button type="submit">Add new answer</button>
        </form> */}
      </div>
    );
  }

  titleChangeHandler = event => {
    const newTitle = event.target.innerText;
    this.setState({ newTitle });
  };

  contentChangeHandler = content => {
    const newContent = content;
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

    this.setState({ currentQuestion: this.context.getQuestion(id) }, () => {
      this.questionEditor.current.setContent(
        this.state.currentQuestion.content
      );
    });
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
    const content = this.answerEditor.current.state.text;

    if (content && Validations.notStartingWithSpace.test(content)) {
      this.newAnswer = {
        author: Auth.getActiveUser(),
        id: uuidv1(),
        content: content,
        questionId: this.state.currentQuestion.id
      };
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
    this.context.deleteQuestion(this.state.currentQuestion.id, () => {});
    this.props.history.push("/questions");
  };

  getContent = () => {
    return this.state.currentQuestion.content;
  };
}

export default QuestionView;
