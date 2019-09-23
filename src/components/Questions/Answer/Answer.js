import React, { Component } from "react";
import { Validations } from "../../../utils/Utils";
import QuestionsContext from "../../../context/QuestionsContext";
import "./Answer.css";
import userIcon from "../../../assets/icons/user-icon.png";
import saveIcon from "../../../assets/icons/save-icon.png";
import deleteIcon from "../../../assets/icons/delete-icon.png";
import editIcon from "../../../assets/icons/edit-icon.png";
import correctAnswerIcon from "../../../assets/icons/correct-answer-icon.png";
import answeredIcon from "../../../assets/icons/answered-icon.png";
import dateIcon from "../../../assets/icons/date-icon.png";

import Editor from "../../Editor/Editor";

class Answer extends Component {
  static contextType = QuestionsContext;
  state = {
    editing: false,
    content: this.props.content
  };

  editor = React.createRef();
  render() {
    return (
      <div>
        <div className="answer-wrapper">
          <div
            className={
              this.props.isCorrect
                ? "answer-indicator correct-answer"
                : "answer-indicator"
            }
          ></div>
          <div className="answer-content">
            <Editor
              value={this.props.content}
              theme="bubble"
              ref={this.editor}
              readOnly={!this.state.editing}
              editable={this.state.editing}
              onChange={this.contentChangeHandler}
            ></Editor>
          </div>
          <div className="answer-labels">
            <div className="author-label">
              <img src={userIcon} alt="" />
              <span>{this.props.author}</span>
            </div>
            <div className="date-label">
              <img src={dateIcon} alt="" />
              <span>{this.props.createDate}</span>
            </div>
            {this.props.toggleCorrectAnswerButtonVisible ||
            this.props.isCorrect ? (
              <div className="label">
                <div
                  className="correct-answer-label"
                  style={
                    !this.props.toggleCorrectAnswerButtonVisible
                      ? { right: 0 }
                      : null
                  }
                  onClick={
                    this.props.toggleCorrectAnswerButtonVisible
                      ? this.toggleCorrectAnswerHandler
                      : null
                  }
                >
                  <img
                    src={
                      this.props.isCorrect ? correctAnswerIcon : answeredIcon
                    }
                    alt=""
                  />
                  <span>
                    {this.props.toggleCorrectAnswerButtonVisible &&
                    !this.props.isCorrect
                      ? "Mark as correct"
                      : "Correct answer"}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
          {this.props.isDeleteAllowed
            ? [
                <div
                  key="edit-button"
                  className={this.state.editing ? "save-button" : "edit-button"}
                  onClick={() => {
                    this.answerUpdateHandler();
                    this.setState({ editing: !this.state.editing });
                  }}
                >
                  <img src={this.state.editing ? saveIcon : editIcon} alt="" />{" "}
                  <span>{this.state.editing ? "Save" : "Edit"}</span>
                </div>,
                <div
                  key="delete-question-button"
                  className="delete-question-button"
                  onClick={() => this.props.onDelete(this.props.id)}
                >
                  <img src={deleteIcon} alt="" /> <span>Delete</span>
                </div>
              ]
            : null}
        </div>
      </div>
    );
  }

  contentChangeHandler = content => {
    this.setState({ newContent: content });
  };

  answerUpdateHandler = () => {
    if (
      this.state.newContent &&
      Validations.notStartingWithSpace.test(this.state.newContent)
    ) {
      this.setState({ content: this.state.newContent });
      this.props.onUpdate(this.props.id, this.state.newContent);
    }
  };
  toggleCorrectAnswerHandler = () => {
    this.context.toggleCorrectAnswer(this.props.id, this.props.questionId);
  };
}

export default Answer;
