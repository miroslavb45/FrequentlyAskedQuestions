import React, { Component } from "react";
import {Validations} from "../../../utils/Utils";
import QuestionsContext from "../../../context/QuestionsContext";


class Answer extends Component {
  static contextType = QuestionsContext;
  state = {
    editing: false,
    content: this.props.content
  };
  render() {
    return (
      <div>
        <p
          contentEditable={this.state.editing}
          onInput={this.contentChangeHandler}
          suppressContentEditableWarning={true}
        >
          {this.state.content}
        </p>
        <p>{this.props.author}</p>
        <p>{this.props.id}</p>
        {this.props.isDeleteAllowed ? [
            <button key="delteKey" onClick={() => this.props.onDelete(this.props.id)}>
          Delete
        </button>,
        <button key="editKey"
          onClick={() => {
            this.answerUpdateHandler();
            this.setState({ editing: !this.state.editing });
          }}
        >
          {this.state.editing ? "Save" : "Edit"}
        </button>
         ] : (
            null
        )}
        {this.props.toggleCorrectAnswerButtonVisible ? (
           <button onClick={this.toggleCorrectAnswerHandler}>{this.props.isCorrect ? "Unmark" : "Mark as correct"}</button>
        ) : null}
        
      </div>
    );
  }

  contentChangeHandler = event => {
    this.setState({ newContent: event.target.innerText });
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
  } 
}

export default Answer;
